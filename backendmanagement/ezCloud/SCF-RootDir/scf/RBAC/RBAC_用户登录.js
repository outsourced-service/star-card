const {
	success,
	fail,
	callScf,
	genJwtToken,
	parseJwtToken,
	md5,
	getRequest,
	setClientinfo,
	getClientinfo
} = ezcloud;
const payload = ezcloud.getPayload();

import ezInstance from "@/utils/ezInstance";
const {
	ezserver
} = ezInstance;

login()
const fieldsMenu = "id idx name icon{id url} path menu_parent_menu attach_data";
const getMenu = (getMenuFunction = "") => ({
	name: `menu_children`,
	args: {
		order_by: {
			idx: () => "asc_nulls_last"
		},
		where: {
			role_menu: {
				role: {
					manager_role: {
						manager_manager: {
							_eq: manager_pk
						}
					}
				}
			}
		}
	},
	fields: [fieldsMenu, getMenuFunction]
})

// 用户登录
function login() {
	const {
		username,
		password
	} = payload;
	if (!username || !password) return fail("用户名和密码不能为空", 103, {
		payload
	});

	const user = ezcloud.query({
		name: "manager",
		args: {
			limit: 1,
			where: {
				username: {
					_eq: username
				}
			},
		},
		fields: ["id", "password", getMenu(getMenu(getMenu())) //此处需要套娃才会查到自己绑定自己的数据]
	});

	if (!user || user.length === 0) return fail("用户不存在", 104, {
		payload
	});
	if (md5(password) !== user[0].password) return fail("密码错误", 105, {
		payload
	});

	// 生成JWT令牌
	const token = genJwtToken({
		id: user[0].id,
		username: username
	});

	// 获取当前客户端信息
	const clientinfo = ezserver.getClientinfo();

	// 更新客户端信息
	clientinfo.token = token;

	// 设置客户端信息
	ezserver.setClientinfo(clientinfo, true)

	return success({
		token: token,
		user: getUserInfo(user[0].id)
	}, "登录成功");
}

// 查询用户信息,包含用户角色
function getUserInfo(ID) {
	const [info] = ezcloud.query({
		name: "manager",
		args: {
			limit: 1,
			where: {
				id: {
					_eq: ID
				}
			},
		},
		fields: ["id password", 'role:manager_role{role{id name}}'],
		onInited: ({
			gql,
			variables
		}) => {}
	});
	return {
		...info,
		role: info.role.map(item => item.role)
	};
}