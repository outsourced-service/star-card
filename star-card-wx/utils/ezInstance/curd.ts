import { ApiConfig, DeleteOptions, Directive, Fields, OperateOptions, QueryOptions, UpdateOptions } from "@/types/ezInstance";
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
 *   where: { status: { _eq 'inactive'} }
 * });
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
        this.operate = ezInstance.ezclient.operate;
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

    // 定义一个异步方法execute，用于执行操作
    private async execute(operation: string, opMethod: 'query' | 'mutation' = 'query', opName: string, opFields: Fields, apiConfig?: ApiConfig) {
        return await utils.request(`${operation}-${this.name}`, () => this.operate({
            opMethod,
            opName,
            opArgs: {},
            opFields,
        }).then(({ response }) => {
            if (Array.isArray(opFields)) return response;
            return response[opName]
        }), apiConfig)
    }

    /**
     * 主键查询
     */
    private async queryByPk(id: number, fields: Fields = this.fields, alias: string = this.name, isOpFields: boolean = false, apiConfig?: ApiConfig) {
        const opMethod = 'query'
        const opFields = { alias, name: `${this.name}_by_pk`, args: { id }, fields };
        if (isOpFields) return opFields
        else return await this.execute("queryByPk", opMethod, alias, opFields, apiConfig)
    }

    /**
     * 分页查询
     */
    private async find(options: any, alias: string = this.name, isOpFields: boolean = false, apiConfig?: ApiConfig) {
        const {
            offset = 1,
            limit = 10,
            args = {},
            fields = this.fields,
            aggregate_fields = 'count'
        } = options
        const opMethod = 'query'
        const opFields = {
            alias,
            name: this.name,
            args: {
                limit: limit,
                offset: (offset - 1) * limit,
                ...args
            },
            fields: [fields, { name: 'aggregate', args, fields: aggregate_fields }]
        }
        if (isOpFields) return opFields
        else return await this.execute("find", opMethod, alias, opFields, apiConfig) || []
    }

    private async executeQuery(options: any, isOpFields: boolean = false, apiConfig?: ApiConfig) {
        const { id, alias = this.name, limit, offset, fields = this.fields, aggregate_fields = 'count', ...rest } = options;
        
        if (id) return await this.queryByPk(id, fields, alias, isOpFields, apiConfig);

        if (limit && offset) return await this.find({
            offset,
            limit,
            args: rest,
            fields,
            aggregate_fields
        }, alias, isOpFields, apiConfig);

        const opMethod = 'query'
        const opFields = { alias, name: this.name, args: { limit, offset, ...rest }, fields };

        if (isOpFields) return opFields
        return await this.execute("query", opMethod, alias, opFields, apiConfig);
    }

    /**
     * 查询数据
     */
    public async query(options: QueryOptions = {}, apiConfig?: ApiConfig) {
        if (!Array.isArray(options)) return await this.executeQuery(options, false, apiConfig);
        const opMethod = 'query'
        const opName = 'batch_query'
        const opFields = await Promise.all(options.map(async item => await this.executeQuery(item, true, apiConfig)));
        return await this.execute("query", opMethod, opName, opFields, apiConfig);
    }

    /**
     * 插入数据
     */
    public async insert(data: any | any[], fields?: Fields, apiConfig?: ApiConfig) {
        const isArray = Array.isArray(data);
        return await utils.request(
            this.getThrottleKey('insert'),
            () => this.operate({
                opMethod: "mutation",
                opName: `insert_${isArray ? this.name : `${this.name}_one`}`,
                opArgs: isArray ? { objects: data } : { object: data },
                opFields: isArray
                    ? ['affected_rows', fields ? { name: 'returning', fields } : '']
                    : (fields || this.fields),
            }),
            apiConfig
        );
    }

    /**
     * 更新数据
     */
    public async update(options: UpdateOptions, apiConfig?: ApiConfig) {
        const { pk_columns, where, id, _set, _inc, fields } = options;
        const pkColumnsOrWhere = pk_columns || where || id;

        this.validateUpdateParams(pkColumnsOrWhere, _set, _inc);

        const isPkColumns = typeof pkColumnsOrWhere === 'object';
        const opArgs = this.buildUpdateArgs(pkColumnsOrWhere, isPkColumns, _set, _inc);

        return await utils.request(
            this.getThrottleKey('update'),
            () => this.operate({
                opMethod: "mutation",
                opName: `update_${isPkColumns ? this.name : `${this.name}_by_pk`}`,
                opArgs,
                opFields: this.buildReturnFields(isPkColumns, fields),
            }),
            apiConfig
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
    public async delete(options: DeleteOptions, isForceDelete = false, apiConfig?: ApiConfig) {
        const { pk_columns, where, id, fields } = options;
        const pkColumnsOrWhere = pk_columns || where || id;

        if (!pkColumnsOrWhere) {
            throw new Error("删除条件必须传入（pk_columns/where/id）");
        }

        if (!isForceDelete) {
            return await this.update({
                ...options,
                _set: { is_deleted: true }
            }, apiConfig);
        }

        const isPkColumns = typeof pkColumnsOrWhere === 'object';
        return await utils.request(
            this.getThrottleKey('delete'),
            () => this.operate({
                opMethod: "mutation",
                opName: `delete_${isPkColumns ? this.name : `${this.name}_one`}`,
                opArgs: this.buildDeleteArgs(pkColumnsOrWhere, isPkColumns),
                opFields: this.buildReturnFields(isPkColumns, fields),
            }),
            apiConfig
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
}