// import { initUnified } from './../unified';
import ezInstance from '/@/utils/ezInstance';// 引入ezcloud工具，用于执行数据操作  
import { Fields } from 'ezcloudbase/dist/types/ezcloud';
const { api } = ezInstance
const systemApi = {
	useRolePermissionApi: (params: useRolePermissionParams, config?: object) => {
		return api('/system/RBAC/', 'setMenuAndPermissions', params, config);
	},
	accountApi: (params: accountParams, config?: object) => {
		return api('/system/RBAC/', 'account', params, config);
	},
	loginApi: (params: LoginParams, config?: object) => {
		return api('/system/RBAC/', 'login', params, config);
	},
	mprApi: (params: mprParams | curd, config?: object) => {
		return api('/system/RBAC/', 'mpr', params, config);
	}
}
// 导出一个名为account的函数
export const accountApi = () => ({
	// 注册
	register: (payload: accountParamsRegister) => systemApi.accountApi({ operate: 'register', ...payload }),
	// 修改
	update: (payload: accountParamsRegister) => systemApi.accountApi({ operate: 'update', ...payload }),
	// 注销
	logout: (manager_pk: number | string) => systemApi.accountApi({ operate: 'logout', manager_pk }),
	// 查询
	reads: (field?: Fields) => systemApi.accountApi({ operate: 'reads', fields: field }),
	// 列表
	list: (param: {
		field?: Fields,
		page_index?: number,
		page_size?: number,
		where?: object,
		[key: string]: any
	}) => systemApi.accountApi({ operate: 'list', ...param }),
	// 重置密码
	resetPassword: (manager_pk: number | string) => systemApi.accountApi({ operate: 'resetPassword', manager_pk }),
	// 激活
	reactivation: (manager_pk: number | string) => systemApi.accountApi({ operate: 'reactivation', manager_pk }),
	// 修改密码
	updatePassword: (payload: accountParams) => systemApi.accountApi({ operate: 'updatePassword', ...payload }),
	// 获取路由
	routes: () => systemApi.accountApi({ operate: 'routes' }),
})

// 导出一个mprApi函数，根据传入的model参数，返回一个对象，该对象包含inc、del、set、get方法
export const mprApi = (model: 'menu' | 'per' | 'role') => ({
	// 创建数据
	inc: (data: { [key: string]: any }, fields?: Fields, config?: object) => systemApi.mprApi({ model, operate: 'create', data, fields }, config),
	// 删除数据
	del: (ID: number | string, isForceDelete: boolean = false, fields?: Fields, config?: object) => systemApi.mprApi({ model, operate: 'delete', data_pk: ID, isForceDelete, fields }, config),
	// 更新数据
	set: (ID: number | string, data: { [key: string]: any }, fields?: Fields, config?: object) => systemApi.mprApi({ model, operate: 'update', data_pk: ID, data, fields }, config),
	// 获取数据
	get: (curd: curd, config?: object) => systemApi.mprApi({ ...curd, model, operate: 'read' }, config),
	// 如果model为role，则添加setMenuAndPermissions方法
	setMenuAndPermissions: model === 'role' ? systemApi.useRolePermissionApi : () => new Promise(() => { })
})

export const loginApi = () => ({
	login: (params: { username: string, password: string, code?: string }, config?: object) => systemApi.loginApi(params, config),
	refreshToken: (params: any, config?: object) => systemApi.loginApi({
		...params,
		operate: 'refreshToken'
	}, config),
})