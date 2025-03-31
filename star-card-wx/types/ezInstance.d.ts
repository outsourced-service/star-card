
declare interface Ezcloudbase {
    project_id?: string; // 项目ID  
    project_type?: "functorz" | "momen"; // 项目类型  
    endpoint_url?: string; // 服务端点URL  
    headers?: object; // 请求头  
    callback_url?: string; // 回调URL  
    clientinfo?: object; // 自定义配置  
    callback_id?: string; // 回调ID  
}
// 定义API调用配置接口  
declare interface ApiConfig {
    isReqLoading?: Boolean; // 是否显示加载动画  
    isErrorToast?: Boolean; // 是否在出错时显示Toast  
    isDebug?: Boolean; // 是否开启调试  
    attach_data?: object; // 附加数据  
    loadingText?: string; // 请求文本
}
/** @public */
export type Directive = {
    name: string;
    args?: Record<string, any>;
};
export type Field = {
    alias?: string;
    name: string;
    args?: Record<string, any>;
    directives?: Array<Directive>;
    fields?: Fields;
};
export type Fields = string | Field | Array<Fields>;
interface QueryOptions {
    id?: number;
    limit?: number;
    offset?: number;
    where?: Record<string, any>;
    fields?: Fields;
    aggregate_fields?: string;
    directives?: Array<Directive>;
}
interface UpdateOptions {
    pk_columns?: string | number;
    where?: Record<string, any>;
    id?: string | number;
    _set?: Record<string, any>;
    _inc?: Record<string, any>;
    fields?: Fields;
}
interface DeleteOptions {
    pk_columns?: string | number;
    where?: Record<string, any>;
    id?: string | number;
    fields?: Fields;
}
interface OperateOptions {
    opMethod: 'query' | 'mutation';
    opName: string;
    opArgs: Record<string, any>;
    opFields: Fields;
}