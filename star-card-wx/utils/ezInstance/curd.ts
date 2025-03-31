import { DeleteOptions, Directive, Fields, OperateOptions, QueryOptions, UpdateOptions } from "@/types/ezInstance";
import ezInstance from "./index";
import utils from "./utils";

/**
 * CRUD 服务类
 * @example
 * ```typescript
 * // 创建实例
 * const userCurd = createCurd('user', ['id', 'name', 'age']);
 * 
 * // 基础查询
 * await userCurd.query({ id: 1 });
 * 
 * // 分页查询
 * await userCurd.query({
 *   limit: 10,
 *   offset: 0,
 *   where: { age: { _gt: 18 } },
 *   fields: ['id', 'name', 'age'],
 *   aggregate_fields: 'count'
 * });
 * 
 * // 单条插入
 * await userCurd.insert({ 
 *   name: '张三', 
 *   age: 20 
 * });
 * 
 * // 批量插入
 * await userCurd.insert([
 *   { name: '张三', age: 20 },
 *   { name: '李四', age: 21 }
 * ]);
 * 
 * // 更新 - 通过ID
 * await userCurd.update({
 *   id: 1,
 *   _set: { name: '李四' }
 * });
 * 
 * // 更新 - 通过条件
 * await userCurd.update({
 *   where: { age: { _lt: 18 } },
 *   _set: { status: 'minor' }
 * });
 * 
 * // 更新 - 计数器
 * await userCurd.update({
 *   id: 1,
 *   _inc: { view_count: 1 }
 * });
 * 
 * // 软删除
 * await userCurd.delete({ id: 1 });
 * 
 * // 硬删除
 * await userCurd.delete({ id: 1 }, true);
 * 
 * // 批量删除
 * await userCurd.delete({
 *   where: { status: 'inactive' }
 * }, true);
 * ```
 */
export default class CurdService {
    private readonly name: string;
    private readonly fields: Fields;
    private readonly operate: (options: OperateOptions) => Promise<any>;

    constructor(name: string, fields: Fields) {
        this.validateConstructorParams(name, fields);
        this.name = name;
        this.fields = fields;
        this.operate = ezInstance.ezserver.operate;
    }

    /**
     * 验证构造函数参数
     */
    private validateConstructorParams(name: string, fields: Fields): void {
        if (!name || !fields) {
            throw new Error('name和fields为必填项');
        }
    }

    /**
     * 生成节流执行的key
     */
    private getThrottleKey(operation: string): string {
        return `${operation}-${this.name}`;
    }

    /**
     * 分页查询
     */
    private async find({
        pageNumber = 1,
        pageSize = 10,
        args = {},
        fields = this.fields,
        aggregate_fields = 'count'
    }: {
        pageNumber?: number;
        pageSize?: number;
        args?: Record<string, any>;
        fields?: Fields;
        aggregate_fields?: string;
    }) {
        return await utils.throttleExecution(
            this.getThrottleKey('find'),
            () => ezInstance.ezserver.find({
                name: this.name,
                args,
                page_number: pageNumber,
                page_size: pageSize,
                fields,
                aggregate_fields,
            })
        );
    }

    /**
     * 主键查询
     */
    private async queryByPk(id: number, fields: Fields = this.fields, directives?: Array<Directive>) {
        return await utils.throttleExecution(
            this.getThrottleKey('queryByPk'),
            () => ezInstance.ezserver.query({
                name: `${this.name}_by_pk`,
                args: { id },
                fields,
                directives,
            })
        );
    }

    /**
     * 构建更新参数
     */
    private buildUpdateArgs(pkColumnsOrWhere: any, isPkColumns: boolean, _set?: any, _inc?: any) {
        const baseArgs = {
            _set: _set || null,
            _inc: _inc || null
        };
        return isPkColumns
            ? { ...baseArgs, where: pkColumnsOrWhere }
            : { ...baseArgs, pk_columns: { id: pkColumnsOrWhere } };
    }

    /**
     * 构建删除参数
     */
    private buildDeleteArgs(pkColumnsOrWhere: any, isPkColumns: boolean) {
        return isPkColumns
            ? { where: pkColumnsOrWhere }
            : { id: pkColumnsOrWhere };
    }

    /**
     * 构建返回字段
     */
    private buildReturnFields(isPkColumns: boolean, fields?: Fields) {
        return isPkColumns
            ? ['affected_rows', fields ? { name: 'returning', fields } : '']
            : (fields || this.fields);
    }

    /**
     * 查询数据
     */
    public async query(options: QueryOptions = {}) {
        const { id, limit, offset, fields = this.fields, aggregate_fields = 'count', directives, ...rest } = options;

        if (id) {
            return await this.queryByPk(id, fields, directives);
        }

        if (limit && offset) {
            return await this.find({
                pageNumber: offset,
                pageSize: limit,
                args: rest,
                fields,
                aggregate_fields
            });
        }

        return await utils.throttleExecution(
            this.getThrottleKey('query'),
            () => ezInstance.ezserver.query({
                name: this.name,
                args: rest,
                fields,
                directives,
            })
        );
    }

    /**
     * 插入数据
     */
    public async insert(data: any | any[], fields?: Fields) {
        const isArray = Array.isArray(data);
        return await utils.throttleExecution(
            this.getThrottleKey('insert'),
            () => this.operate({
                opMethod: "mutation",
                opName: `insert_${isArray ? this.name : `${this.name}_one`}`,
                opArgs: isArray ? { objects: data } : { object: data },
                opFields: isArray
                    ? ['affected_rows', fields ? { name: 'returning', fields } : '']
                    : (fields || this.fields),
            })
        );
    }

    /**
     * 更新数据
     */
    public async update(options: UpdateOptions) {
        const { pk_columns, where, id, _set, _inc, fields } = options;
        const pkColumnsOrWhere = pk_columns || where || id;

        this.validateUpdateParams(pkColumnsOrWhere, _set, _inc);

        const isPkColumns = typeof pkColumnsOrWhere === 'object';
        const opArgs = this.buildUpdateArgs(pkColumnsOrWhere, isPkColumns, _set, _inc);

        return await utils.throttleExecution(
            this.getThrottleKey('update'),
            () => this.operate({
                opMethod: "mutation",
                opName: `update_${isPkColumns ? this.name : `${this.name}_by_pk`}`,
                opArgs,
                opFields: this.buildReturnFields(isPkColumns, fields),
            })
        );
    }

    /**
     * 验证更新参数
     */
    private validateUpdateParams(pkColumnsOrWhere: any, _set?: any, _inc?: any): void {
        if (!pkColumnsOrWhere) {
            throw new Error("更新条件必须传入（pk_columns/where/id）");
        }
        if (!_set && !_inc) {
            throw new Error("_set 或 _inc 至少需要传入一个");
        }
    }

    /**
     * 删除数据
     */
    public async delete(options: DeleteOptions, isForceDelete = false) {
        const { pk_columns, where, id, fields } = options;
        const pkColumnsOrWhere = pk_columns || where || id;

        if (!pkColumnsOrWhere) {
            throw new Error("删除条件必须传入（pk_columns/where/id）");
        }

        if (!isForceDelete) {
            return await this.update({
                ...options,
                _set: { is_deleted: true }
            });
        }

        const isPkColumns = typeof pkColumnsOrWhere === 'object';
        return await utils.throttleExecution(
            this.getThrottleKey('delete'),
            () => this.operate({
                opMethod: "mutation",
                opName: `delete_${isPkColumns ? this.name : `${this.name}_one`}`,
                opArgs: this.buildDeleteArgs(pkColumnsOrWhere, isPkColumns),
                opFields: this.buildReturnFields(isPkColumns, fields),
            })
        );
    }
}