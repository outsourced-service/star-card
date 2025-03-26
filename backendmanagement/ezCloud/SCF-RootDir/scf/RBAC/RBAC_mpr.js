// RBAC_mpr.js  
// 此文件包含了一系列对menu,per,role的增删改查操作
const { success, fail, callScf, genJwtToken, parseJwtToken, query, getRequest, system } = ezcloud;
const payload = ezcloud.getPayload();
const clientinfo = ezcloud.getClientinfo();
//获取用户token信息
const userInfo = (() => {
	try {
		const userInfo = parseJwtToken(clientinfo?.token ?? '', "manager");
		return getUserInfo(userInfo?.id ?? -1)
	} catch (error) {
		throw fail("用户未登录", 101, getRequest());
	}
})();
//获取传入的变量
const isAccessValidator = true;//权限验证
const {
	model = "menu",// menu, per, role
	operate = "create", //[create, read, update, delete, detail]
	isForceDelete = false, //删除时，传入表示是否为强制删除
	data, //新增、编辑时传入
	data_pk, //编辑、删除、详情时传入
	where,
	order_by,
	page_index = 1,
	page_size = 100,
	fields = "id"
} = payload
if (isAccessValidator && !getAccessValidator()) throw fail("无权限访问", 102, { payload });
// system.is_logs = false; //是否开启日志
return callScf({
	scf_dir: "/",
	scf_name: "curd",
	payload: payload,
})
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
		onInited: ({ gql, viriables }) => { }
	})
	return {
		...info,
		role: info.role.map(item => item.role)
	}
}
// 获取用户角色，用户访问的权限
function getAccessValidator() {
	const role = userInfo.role.map(item => item.name);
	if(role.includes['超级管理员']) return true;
	const per = [{ name: model, type: "DB", operate: operate === 'detail' ? 'create' : operate }];
	const response = callScf({
		scf_dir: "/",
		scf_name: "AccessValidator",
		payload: { role, per },
	})
	const isRole = response.data.role.some(item => item.hasAccess); //角色是否拥有权限
	const isPer = response.data.per.some(item => item.hasAccess); //权限是否拥有权限
	return isRole && isPer
}
