declare interface resultList {
	list: [];
	total_size: number;
}

declare interface LoginParams {
	username?: string;
	password?: string;
	code?: string;
	mobile?: string;
	token?: string;
	operate?: string;
}

declare interface mprParams {
	model: 'menu' | 'per' | 'role',
	operate: 'create' | 'read' | 'update' | 'delete' | 'detail',
}

declare interface accountParams {
	operate?: 'register' | 'update' | 'logout' | 'reads' | 'list' | 'resetPassword' | 'reactivation' | 'updatePassword' | 'routes',
	fields?: Fields,
	manager_pk?: number | string,
	other?: { [key]: any }; // 其他参数
}

declare interface accountParamsRegister {
	username: string;
	password: string;
	mobile: string;
	avatar_id: number;
	role_pk?: number;
	other?: { [key]: any };
}


declare interface useRolePermissionParams {
	role_pk: number;
	menu_pk_list?: number[];
	per_pk_list?: number[];
}


declare interface curd {
	model?: string;
	operate?: 'read' | 'detail' | 'create' | 'update' | 'delete';
	isForceDelete?: boolean;
	data?: { [key]: any };
	data_pk?: number | string;
	where?: { [key]: any };
	order_by?: { [key]: any };
	page_index?: number;
	page_size?: number;
	fields?: Fields;
	variables?: { [key]: any };
	mode?: 'manager' | 'user';
	aggregate?: string[];
}