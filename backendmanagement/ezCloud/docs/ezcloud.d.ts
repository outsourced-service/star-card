/**
 * 声明全局变量
 */
declare global {
	/** ezcloud 全局对象 */
	const ezcloud: ezcloud;
	/** context 全局对象 */
	const context: context;
}

/**
 * 聚合查询类型定义
 */
declare type Aggregate = OperateInput & {
	/** 操作名称 */
	name: string;
	/** 操作参数 */
	args?: Record<string, any>;
	/** 聚合字段 */
	aggregate_fields?: Fields | "count" | {
		/** 平均值 */
		name: "avg";
		fields: Fields;
	} | {
		/** 求和 */
		name: "sum";
		fields: Fields;
	} | {
		/** 最大值 */
		name: "max";
		fields: Fields;
	} | {
		/** 最小值 */
		name: "min";
		fields: Fields;
	} | {
		/** 计数 */
		name: "count";
		args?: {
			columns: any;
			distinct?: boolean;
		};
		fields: Fields;
	};
};

/**
 * context 接口定义
 */
export declare interface context {
	/** 获取输入参数 */
	getArg: (inputArgName: string | "fz_callback_body" | "fz_payment_callback_input") => any;
	/** 设置返回值 */
	setReturn: (outputArgName: any, value: any) => any;
	/** 上传媒体文件 */
	uploadMedia: (url: string, headers?: any) => any;
	/** 执行 GraphQL 查询 */
	runGql: (operationName: string | null | undefined, gql: string, variables: object, permission: {
		role: string | "admin";
	}) => any;
	/** 调用第三方 API */
	callThirdPartyApi: (operationId: string, args: object) => any;
	/** 调用行为流 */
	callActionFlow: (actionFlowId: string, versionId: number | null, args: any) => any;
	/** 获取序列下一个值 */
	getSeqNextValue: (seqName: string, createIfNotExists?: boolean) => any;
	/** 重置序列值 */
	resetSeqValue: (seqName: string, value: number) => any;
	/** 获取微信小程序 access token */
	getWechatMiniAppAccessToken: () => string;
	/** 发送邮件 */
	sendEmail: (toAddress: string, subject: string, fromAlias: string, textBody: string, htmlBody: string) => any;
	/** 记录日志 */
	log: (msg: string, isError: boolean) => any;
	/** 记录错误 */
	error: (msg: string, isError: boolean) => any;
	/** 抛出异常 */
	throwException: (errorType: string, errorMsg: string) => any;
	/** 计算 token 数量 */
	countTokens: (model: string, content: string) => any;
	/** AI 对话补全 */
	chatCompletion: (prompt: string) => string;
	/** 直接上传媒体文件 */
	uploadMediaDirectly: (url: string) => any;
	/** 获取 SSO 账号 ID */
	getSsoAccountId: () => null | number;
	/** 获取 SSO 用户信息 */
	getSsoUserInfo: () => any;
	/** 生成 RSA 签名 */
	generateRSASignature: (privateKey: string, data: any, signatureType: string | "SHA256withRSA") => string;
	/** 验证 RSA 签名 */
	validateRSASignature: (publicKey: string, data: any, sign: string, signatureType: string | "SHA256withRSA") => any;
}

/**
 * 指令类型定义
 */
declare type Directive = {
	/** 指令名称 */
	name: string;
	/** 指令参数 */
	args?: Record<string, any>;
};

/**
 * ezcloud 接口定义
 */
export declare interface ezcloud {
	/** 获取请求信息 */
	getRequest: () => GetRequestResult;
	/** 控制台日志 */
	clog: (data: any) => void;
	/** 获取响应信息 */
	getResponse: () => any;
	/** 获取云函数信息 */
	getScf: () => GetScfResult;
	/** 获取系统信息 */
	getSystem: () => GetSystemResult;
	/** 获取请求负载 */
	getPayload: () => any;
	/** 获取客户端信息 */
	getClientinfo: () => any;
	/** 获取回调体 */
	getCallbackBody: () => any;
	/** 获取回调输入 */
	getCallbackInput: () => any;
	/** 
	 * 分页查找数据
	 * @param {FindInput} inputs 查找输入
	 * @returns {FindResult} 查找结果
	 */
	find: (inputs: FindInput) => FindResult;
	/** 执行操作 */
	operate: (inputs: OperateInput) => OperateResult;
	/** 查询数据 */
	query: (inputs: QueryInput) => Array<any>;
	/** 修改数据 */
	mutation: (inputs: MutationInput) => {
		[key: string]: any;
	};
	/** 聚合查询 */
	aggregate: (inputs: Aggregate) => {
		min: any;
		avg: any;
		max: any;
		sum: any;
		count: string;
		[key: string]: any;
	};
	/** 获取查询结果第一条 */
	queryGetFirstOne: (inputs: QueryGetFirstOne) => {
		[key: string]: any;
	};
	/** 获取修改结果第一条 */
	mutationGetFirstOne: (inputs: MutationGetFirstOne) => any;
	/** 生成 JWT token */
	genJwtToken: (data?: {
		expires_in?: number;
		[key: string]: any;
	}, secret?: string) => string;
	/** 解析 JWT token */
	parseJwtToken: (token?: string, secret?: string) => {
		expires_in: number;
		[key: string]: any;
	};
	/**
	 * MD5加密
	 * @param {*} str 需要加密的字符串
	 * @param {*} bit 加密方式，1.32a 2.32A 16a 16A
	 * @returns 加密后的字符串
	 */
	md5: (str?: any, bit?: string) => string;
	/** 调用云函数
	 * @param {string} scf_name 云函数名称，案例：feedback
	 * @param {object} payload 请求参数
	 * @param {string} scf_dir 云函数目录，默认：/ , 案例：/photographer/innerFn/
	 */
	callScf: ({ scf_name, payload, scf_dir, }: {
		scf_name?: string | undefined;
		payload?: {} | undefined;
		scf_dir?: string | undefined;
	}) => {
		code: number;
		msg: string;
		data: any;
		[key: string]: any;
	};
	/** 发起 HTTP 请求 */
	fetchApi: ({ url, method, headers, data, }: {
		url?: string | undefined;
		method?: string | undefined;
		headers?: null | undefined;
		data?: {} | undefined;
	}) => any;
	/** 上传媒体文件 */
	uploadMedia: ({ url }: {
		url?: string | undefined;
	}) => any;
	/** 调用第三方 API */
	callThirdapi: (thirdapi_name?: string, data?: any, headers?: any) => any;
	/** 执行 GraphQL 查询 */
	runGql: (Input: RunGqlInput) => any;
	/** 返回成功结果 */
	success: (data?: any, msg?: string) => void;
	/** 返回失败结果 */
	fail: (data?: any, msg?: string, code?: number) => void;
}

/**
 * 字段类型定义
 */
declare type Field = {
	/** 字段别名 */
	alias?: string;
	/** 字段名称 */
	name: string;
	/** 字段参数 */
	args?: Record<string, any>;
	/** 字段指令 */
	directives?: Array<Directive>;
	/** 子字段 */
	fields?: Fields;
};

/** 字段类型 */
declare type Fields = string | Field | Array<Fields>;

/**
 * 查找输入类型定义
 */
declare type FindInput = OperateInput & {
	/** 操作名称 */
	name: string;
	/** 操作参数 */
	args?: Record<string, any>;
	/** 页码 */
	page_number?: number;
	/** 每页大小 */
	page_size?: number;
	/** 查询字段 */
	fields?: Fields;
	/** 聚合字段 */
	aggregate_fields?: Fields;
};

/**
 * 查找结果类型定义
 */
declare type FindResult = {
	/** 数据列表 */
	datas: Array<any>;
	/** 聚合结果 */
	aggregate: Record<string, any>;
};

/** 请求结果类型定义 */
declare type GetRequestResult = Request_2;

/** 云函数结果类型定义 */
declare type GetScfResult = Scf;

/** 系统结果类型定义 */
declare type GetSystemResult = System;

/**
 * Mutation 获取第一条结果类型定义
 */
declare type MutationGetFirstOne = OperateInput & {
	/** 操作名称 */
	name: string;
	/** 操作参数 */
	args?: Record<string, any>;
	/** 操作指令 */
	directives?: Array<Directive>;
	/** 返回字段 */
	returning_fields?: Fields;
};

/**
 * Mutation 输入类型定义
 */
declare type MutationInput = OperateInput & {
	/** 操作名称 */
	name: string;
	/** 操作参数 */
	args?: Record<string, any>;
	/** 操作指令 */
	directives?: Array<Directive>;
	/** 操作字段 */
	fields?: Fields;
};

/**
 * 操作输入类型定义
 */
declare type OperateInput = {
	/** 操作方法 */
	opMethod?: "query" | "mutation" | "subscription";
	/** 操作名称 */
	opName?: string;
	/** 操作参数 */
	opArgs?: {
		[key: string]: any;
	};
	/** 操作字段 */
	opFields?: Fields;
	/** 变量 */
	variables?: {
		[key: string]: any;
	};
	/** 初始化回调 */
	onInited?: (data: any) => void;
	/** 消息回调 */
	onMessage?: (message: any, error: any) => void;
};

/**
 * 操作结果类型定义
 */
declare type OperateResult = {
	/** GraphQL 查询语句 */
	gql: string;
	/** 变量 */
	variables: {
		[key: string]: any;
	};
	/** 响应结果 */
	response?: any;
};

/** Query 获取第一条结果类型定义 */
declare type QueryGetFirstOne = QueryInput;

/**
 * Query 输入类型定义
 */
declare type QueryInput = OperateInput & {
	/** 操作名称 */
	name: string;
	/** 操作参数 */
	args?: Record<string, any>;
	/** 操作指令 */
	directives?: Array<Directive>;
	/** 查询字段 */
	fields?: Fields;
};

/**
 * 请求类型定义
 */
declare type Request_2 = {
	/** 云函数名称 */
	scf_name: string;
	/** 云函数目录 */
	scf_dir?: string;
	/** 请求负载 */
	payload?: any;
	/** 客户端信息 */
	clientinfo?: any;
	/** 回调体 */
	callback_body?: any;
	/** 回调输入 */
	callback_input?: any;
};

/**
 * GraphQL 运行输入类型定义
 */
declare type RunGqlInput = {
	/** GraphQL 查询语句 */
	gql: string;
	/** 变量 */
	variables?: {
		[key: string]: any;
	};
	/** 消息回调 */
	onMessage?: (message: any, error?: any) => void;
};

/**
 * 云函数类型定义
 */
declare type Scf = {
	/** 云函数配置 */
	scf_config: any;
	/** 云函数目录 */
	scf_dir: string;
	/** 云函数名称 */
	scf_name: string;
	/** 云函数代码 */
	scf_code: string;
	/** 云函数实例 */
	scf_fn: any;
	/** 参数 */
	parameters: any;
	/** 返回值 */
	returns: any;
	/** 描述 */
	description: any;
};

/**
 * 系统类型定义
 */
declare type System = {
	/** 系统名称 */
	name: string;
	/** 是否记录日志 */
	is_logs: boolean;
	/** 是否开发者认证 */
	is_developer_auth: boolean;
	/** 前置中间件代码 */
	pre_middelware_code: string;
	/** 后置中间件代码 */
	post_middelware_code: string;
	/** 全局配置 */
	global_config: any;
	/** 第三方 API ID */
	thirdapi_id: string;
	/** 行为流 ID */
	af_id: string;
	/** 行为流版本 */
	af_version: number | null;
};

export { }