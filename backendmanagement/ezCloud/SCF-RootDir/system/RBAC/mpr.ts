/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// RBAC_mpr.js  
// 此文件包含了一系列对menu,per,role的增删改查操作
const { callScf, parseJwtToken, query, getRequest, fail } = ezcloud;
const payload = ezcloud.getPayload();
const clientinfo = ezcloud.getClientinfo();
//获取用户token信息

//获取传入的变量
const isAccessValidator = false;//权限验证
const {
	model = "menu",// menu, per, role
	operate = "create", //[create, read, update, delete, detail]
	isForceDelete = false, //删除时，传入表示是否为强制删除
	data, //新增、编辑时传入
	data_pk, //编辑、删除、详情时传入
	where = {},
	order_by,
	page_index = 1,
	page_size = 100,
	variables,
	mode = 'manager',
	aggregate = ["count"], //聚合查询
} = payload
const menuFields = "id idx name icon{id url}path parent_menu meta is_active";//查询的字段
const fieldsMap = {
	role: ["id name describe is_active",
		{
			alias: "menu",
			name: "role_menu",
			fields: ["id menu{id idx name icon{id url}path parent_menu meta}"],
		}, {
			alias: "per",
			name: "role_per",
			fields: ["id per{id name describe}"],
		}, {
			alias: "manager_role",
			name: "manager_role_aggregate",
			fields: ["aggregate{count}"],
		}],
	menu: [menuFields, roleMenu(),
		getMenu(getMenu(getMenu()))//此处需要套娃才会查到自己绑定自己的数据
	],
	per: ["id", "name", "describe", roleMenu()]
}
const _and = {
	is_active: { _eq: true }
}
if (where._and) where._and.push(_and)
else where._and = [_and]

if (['detail', 'read'].includes(operate)) {
	payload.fields = payload.fields || fieldsMap[model] || 'id';
	if (model === 'menu') where.parent_menu = { _is_null: true }
	else if (model === 'role') {
		// _and.name = { _neq: 'SuperAdministrator' };
		if (where._and) where._and.push(_and)
		else where._and = [_and]
	}
} else {
	payload.fields = payload.fields || 'id';
}
if (isAccessValidator && !getAccessValidator()) throw fail("无权限访问", 102, { payload });
// system.is_logs = false; //是否开启日志
const { data: response, msg, code } = callScf({
	scf_dir: "/",
	scf_name: "curd",
	payload: payload,
})
if (code == -1) return fail(msg, code, response);
if (model === 'role' && ['detail', 'read'].includes(operate)) return formatRole(response);
return response;
//查询用户信息,包含用户角色
function getUserInfo(ID) {
	const [info] = query({
		name: "manager",
		args: {
			limit: 1,
			where: {
				id: { _eq: ID },
				_or: [{ is_deleted: { _eq: false } }, { is_deleted: { _is_null: true } }]
			},
		},
		fields: ["id", 'role:manager_role{role{id name}}'],
		// onInited: ({ gql, viriables }) => { }
	})
	return {
		...info,
		role: info.role.map(item => item.role)
	}
}
// 获取用户角色，用户访问的权限
function getAccessValidator() {
	const userInfo = (() => {
		try {
			const userInfo = parseJwtToken(clientinfo?.token ?? '', "manager");
			return getUserInfo(userInfo?.id ?? -1)
		} catch (error) {
			throw fail("token无效，请重新登录", 101);
		}
	})();
	const role = userInfo.role.map(item => item.name);
	if (role.includes['SuperAdministrator']) return true;
	const per = [{ name: model, type: "DB", operate: operate === 'detail' ? 'read' : operate }];
	const response = callScf({
		scf_dir: "/",
		scf_name: "AccessValidator",
		payload: { role, per },
	})
	const isRole = response.data.role.some(item => item.hasAccess); //角色是否拥有权限
	const isPer = response.data.per.some(item => item.hasAccess); //权限是否拥有权限
	return isRole && isPer
}
//套娃指令，因为不知道有几层，因此需要手动编写
function getMenu(getMenuFunction = "") {
	return {
		name: `children_menu`,
		args: {
			order_by: { __QUOTOFF__: { idx: "asc_nulls_last" } },
		},
		fields: [menuFields, roleMenu(),
			getMenuFunction]
	}
}
function roleMenu() {
	return data_pk ? {
		name: "role_per",
		args: { where: { role_role: { _eq: data_pk } } },
		fields: ["id"],
	} : ''
}
function formatRole(response) {
	return {
		...response,
		list: response.list.map(res => {
			return {
				...res,
				menu: res.menu.map(res => res.menu),
				per: res.per.map(res => res.per),
			}
		})
	}
}