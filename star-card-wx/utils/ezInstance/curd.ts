import { DeleteOptions, Directive, Fields, OperateOptions, QueryOptions, UpdateOptions } from "@/types/ezInstance";
import ezInstance from "./index";
import utils from "./utils";
class CurdService {
    // 定义私有变量
    private name: string;
    private fields: Fields;
    private operate: (options: OperateOptions) => Promise<any>;
    // 构造函数，传入model和fields
    constructor(name: string, fields: Fields) {
        // 如果model和fields没有传入，抛出错误
        if (!name || !fields) {
            throw new Error('model和fields必须传入');
        }
        // 赋值
        this.name = name;
        this.fields = fields;
        this.operate = ezInstance.ezserver.operate;
    }


    // 查询方法，传入查询参数
    private async find(options: {
        pageNumber?: number;
        pageSize?: number;
        args?: Record<string, any>;
        fields?: Fields;
        aggregate_fields?: string;
    }) {
        // 解构查询参数
        const {
            pageNumber = 1,
            pageSize = 10,
            args = {},
            fields = this.fields,
            aggregate_fields = 'count'
        } = options;
        // 调用ezInstance.ezserver.find方法查询
        return await utils.throttleExecution(`find-${this.name}`, async () =>
            await ezInstance.ezserver.find({
                name: this.name,
                args,
                page_number: pageNumber,
                page_size: pageSize,
                fields,
                aggregate_fields,
            })
        )
    }
    // 根据主键查询方法，传入id和fields
    private async queryByPk(id: number, fields: Fields = this.fields, directives?: Array<Directive>) {
        // 调用ezInstance.ezserver.query方法查询
        return await utils.throttleExecution(`queryByPk-${this.name}`, async () =>
            await ezInstance.ezserver.query({
                name: `${this.name}_by_pk`,
                args: { id },
                fields,
                directives,
            })
        )
    }
    private buildUpdateArgs(pkColumnsOrWhere: any, isPkColumns: boolean, _set?: any, _inc?: any) {
        const baseArgs = {
            _set: _set || null,
            _inc: _inc || null
        };
        return isPkColumns
            ? { ...baseArgs, where: pkColumnsOrWhere }
            : { ...baseArgs, pk_columns: { id: pkColumnsOrWhere } };
    }
    private buildDeleteArgs(pkColumnsOrWhere: any, isPkColumns: boolean) {
        return isPkColumns
            ? { where: pkColumnsOrWhere }
            : { id: pkColumnsOrWhere };
    }
    private buildReturnFields(isPkColumns: boolean, fields?: Fields) {
        return isPkColumns
            ? ['affected_rows', fields ? { name: 'returning', fields } : '']
            : (fields || this.fields);
    }
    /**
    * 查询方法，传入查询参数
    * @param options 查询参数
    * @returns 
    */
    public async query(options: QueryOptions = {}) {
        // 解构查询参数
        const { id, limit, offset, fields = this.fields, aggregate_fields = 'count', directives, ...rest } = options;
        // 如果传入id，调用queryByPk方法查询
        if (id) {
            return await this.queryByPk(id, fields, directives);
        }
        // 如果传入limit和offset，调用find方法查询
        if (limit && offset) {
            return await this.find({
                pageNumber: offset,
                pageSize: limit,
                args: rest,
                fields,
                aggregate_fields
            });
        }
        // 调用ezInstance.ezserver.query方法查询
        return await utils.throttleExecution(`query-${this.name}`, async () =>
            await ezInstance.ezserver.query({
                name: this.name,
                args: rest,
                fields,
                directives,
            })
        )
    }
    // 插入方法，传入data和fields
    public async insert(data: any | any[], fields?: Fields) {
        // 判断data是否为数组
        const isArray = Array.isArray(data);
        // 调用operate方法插入
        return await utils.throttleExecution(`insert-${this.name}`, async () =>
            await this.operate({
                opMethod: "mutation",
                opName: `insert_${isArray ? this.name : `${this.name}_one`}`,
                opArgs: isArray ? { objects: data } : { object: data },
                opFields: isArray
                    ? ['affected_rows', fields ? { name: 'returning', fields } : '']
                    : (fields || this.fields),
            })
        )
    }
    // 更新方法，传入options
    public async update(options: UpdateOptions) {
        // 解构options
        const { pk_columns, where, id, _set, _inc, fields } = options;
        // 获取pk_columns或where或id
        const pkColumnsOrWhere = pk_columns || where || id;
        // 如果没有传入更新条件，抛出错误
        if (!pkColumnsOrWhere) {
            throw new Error("更新条件必须传入（pk_columns/where/id）");
        }
        // 如果没有传入_set或_inc，抛出错误
        if (!_set && !_inc) {
            throw new Error("_set 或 _inc 至少需要传入一个");
        }
        // 判断pkColumnsOrWhere是否为对象
        const isPkColumns = typeof pkColumnsOrWhere === 'object';
        // 构建更新参数
        const opArgs = this.buildUpdateArgs(pkColumnsOrWhere, isPkColumns, _set, _inc);
        // 调用operate方法更新
        return await utils.throttleExecution(`update-${this.name}`, async () =>
            await this.operate({
                opMethod: "mutation",
                opName: `update_${isPkColumns ? this.name : `${this.name}_by_pk`}`,
                opArgs,
                opFields: this.buildReturnFields(isPkColumns, fields),
            })
        )
    }
    // 删除方法，传入options和isForceDelete
    public async delete(options: DeleteOptions, isForceDelete = false) {
        // 解构options
        const { pk_columns, where, id, fields } = options;
        // 获取pk_columns或where或id
        const pkColumnsOrWhere = pk_columns || where || id;
        // 如果没有传入删除条件，抛出错误
        if (!pkColumnsOrWhere) {
            throw new Error("删除条件必须传入（pk_columns/where/id）");
        }
        // 如果不是强制删除，调用update方法更新
        if (!isForceDelete) {
            return await this.update({
                ...options,
                _set: { is_deleted: true }
            });
        }
        // 判断pkColumnsOrWhere是否为对象
        const isPkColumns = typeof pkColumnsOrWhere === 'object';
        // 构建删除参数
        const opArgs = this.buildDeleteArgs(pkColumnsOrWhere, isPkColumns);
        // 调用operate方法删除
        return await utils.throttleExecution(`delete-${this.name}`, async () =>
            await this.operate({
                opMethod: "mutation",
                opName: `delete_${isPkColumns ? this.name : `${this.name}_one`}`,
                opArgs,
                opFields: this.buildReturnFields(isPkColumns, fields),
            })
        )
    }
}
// 导出一个默认函数，用于创建CurdService实例
/***
 * const userCurd = createCurd('user', ['id', 'name', 'age']);

// 查询
await userCurd.query({
    limit: 10,
    offset: 0,
    where: { age: { _gt: 18 } }
});

// 插入
await userCurd.insert({ name: '张三', age: 20 });

// 更新
await userCurd.update({
    id: 1,
    _set: { name: '李四' }
});

// 删除
await userCurd.delete({ id: 1 }, true);
 */
export default function createCurd(name: string, fields: Fields) {
    // 返回一个新的CurdService实例，传入name和fields参数
    return new CurdService(name, fields);
}
