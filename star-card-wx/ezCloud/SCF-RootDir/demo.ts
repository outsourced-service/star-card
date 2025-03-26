// @ts-nocheck

/**
 * 数据模型说明：
 * 
 * 1. user 表 - 用户信息
 * {
 *   id: bigint          // 用户ID，主键
 *   username: string    // 用户名，唯一
 *   password: string    // 密码，MD5加密存储
 *   role: string        // 用户角色：admin-管理员 | user-普通用户
 *   status: string      // 账号状态：active-正常 | disabled-禁用
 *   created_at: string  // 创建时间
 *   updated_at: string  // 更新时间
 * }
 * 
 * 2. login_log 表 - 登录日志
 * {
 *   id: bigint          // 日志ID，主键
 *   user_user: bigint   // 关联用户ID，外键 -> user.id， 关联字段自动生成规则：关联关系名称_关联表名
 *   login_time: string  // 登录时间，ISO格式
 *   ip: string         // 登录IP地址
 *   device: string     // 登录设备信息
 *   created_at: string  // 创建时间
 *   
 *   // 关联关系，自动生成
 *   user: {
 *     id: bigint        // 关联的用户ID
 *     username: string  // 用户名
 *     role: string      // 用户角色
 *   }
 * }
 * 
 * 关联关系说明：
 * - 在zion中选中user表，关联目标表选中login_log表，建立一对多的关联关系，目标表中关系名填入user，当前表中关系名填入login_log，即可在login_log表中生成user_user字段
 * - 关联后会在 login_log 表中自动生成 user_user 字段,同时也可以从user表中获取关联的login_log表信息
 * - 查询 login_log 时可以通过 user关联关系 获取关联的用户信息
 */

const {
	success,
	fail,
	queryGetFirstOne,
	mutation,
	getPayload,
	getClientinfo,
	md5,
	genJwtToken
} = ezcloud;

// 1. 获取请求参数并校验
const { username, password } = getPayload() || {};
if (!username?.trim() || !password?.trim()) {
	fail("用户名和密码不能为空", "参数错误", 1001);
	return;
}

// 2. 查询用户
const user = queryGetFirstOne({
	name: "user",
	args: {
		where: {
			username: { _eq: username.trim() },
			password: { _eq: md5(password.trim()) }
		}
	},
	fields: [
		"id", 
		"username", 
		"role", 
		"status",
		{
			name: "login_log",
			fields: ["login_time", "ip"],
			args: {
				limit: 5,
				order_by: { login_time: ()=>"desc" }
			}
		}
	]
});

// 3. 验证用户状态
if (!user) {
	fail("用户名或密码错误", "认证失败", 1002);
	return;
}

if (user.status !== "active") {
	fail("账号已被禁用", "认证失败", 1003);
	return;
}

// 4. 生成 token 和记录登录日志
const token = genJwtToken({
	user_id: user.id,
	role: user.role,
	expires_in: 7 * 24 * 60 * 60 // 7天过期
});

const clientInfo = getClientinfo();
mutation({
	name: "insert_login_log",
	args: {
		object: {
			user_user: user.id, // 使用正确的关联字段名
			login_time: new Date().toISOString(),
			ip: clientInfo.ip,
			device: clientInfo.device
		}
	}
});

// 5. 返回结果
success({
	token,
	userInfo: {
		id: user.id,
		username: user.username,
		role: user.role,
		lastLogins: user.login_log // 最近5次登录记录
	}
});
