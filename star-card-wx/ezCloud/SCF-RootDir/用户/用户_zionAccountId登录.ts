// @ts-nocheck
const { query, mutation, genJwtToken, request, success, fail, md5, getRequest } = ezcloud;
const payload = ezcloud.getPayload();
isRegisterAuto = payload.isRegisterAut || true
isRegisterMobileRequired = payload.isRegisterMobileRequired || false
// 1.判断是否存在账号
const [user_acc] = ezcloud.query({
	name: `user_acc`,
	args: {
		limit: 1,
		where: {
			type: { _eq: "zionAccountId登录" },
			acc_val: { _eq: payload.account_pk + "" }
		},
		order_by: { id: () => "desc" },
	},
	fields: ["user{id}"]
})

let user = user_acc?.user;
if (!user?.id && !isRegisterAuto) {
	return fail("失败, 账户不存在", -1, getRequest());
}

// 2 不存在则自动注册
if (!user?.id && isRegisterAuto) {

	const [account] = ezcloud.query({
		name: `account`,
		args: {
			limit: 1,
			where: {
				id: {
					_eq: payload.account_pk || 0
				}
			}
		},
		fields: ["id username password profile_image_id"]
	})

	if (!payload.account_pk) {
		return fail("登录失败，请检查用户名和密码后再试", -1, getRequest());
	}

	// 如果不强制要求注册时提供手机号，则直接注册
	if (!isRegisterMobileRequired) {
		const username = generateUserId('u_', new Date().getTime(), 2)
		const user_tmp = ezcloud.mutation({
			name: `insert_user_one`,
			args: {
				object: {
					username,
					nickname: account?.username || username,
					password: account?.password,
					avatar_id: account?.profile_image_id,
					score: 0,
					growth_value: 0,
					role: "个人用户",
					is_authentication: false,
					is_personal: false,
					is_recommend: false,
					user_acc: {
						data: [{
							type: "zionAccountId登录",
							acc_val: payload.account_pk + ""
						}]
					}
				},
			},
			fields: ["id"]
		})
		if (!user_tmp) {
			return fail("注册失败", -1, getRequest());
		}
		user = user_tmp;
	} else {
		// 注册两种登录方式：1.zionAccountId登录 2.手机验证码登录

		// 手机号和验证码校验

		const mobileVdtRes = ezcloud.callScf({
			scf_dir: "/用户/ ",
			scf_name: "系统_手机验证码校验",
			payload: {
				mobile,
				mobileCode
			}
		})

		if (mobileVdtRes?.code !== 0) {
			return setReturn(mobileVdtRes.data, "失败", mobileVdtRes.msg)
		}
		// 查询用户信息
		const [user_tmp] = ezcloud.query({
			name: `user`,
			args: {
				limit: 1,
				where: {
					mobile: {
						_eq: mobile + ""
					}
				},
				order_by: { id: () => "desc" },
			},
			fields: ["id"]
		})

		if (user_tmp?.id) {
			// 用户已存在则直接为该用户新增登录方式
			const [user_acc_tmp] = ezcloud.mutation({
				name: `insert_user_acc_one`,
				args: {
					object: {
						user_user: user_tmp.id,
						type: "zionAccountId登录",
						acc_val: payload.account_pk + ""
					}
				},
				fields: ["id"]
			})

			if (!user_acc_tmp) {
				return fail("注册异常", -1, getRequest());
			}
			user = user_tmp;

		} else {
			const username = generateUserId('u_', new Date().getTime(), 2)
			// 新增用户和登录方式
			const [user_tmp] = ezcloud.mutation({
				name: `insert_user_one`,
				args: {
					object: {
						username,
						nickname: account?.username || username,
						password: account?.password,
						avatar_id: account?.profile_image_id,
						score: 0,
						growth_value: 0,
						role: "个人用户",
						is_authentication: false,
						is_personal: false,
						is_recommend: false,
						mobile,
						user_acc: {
							data: [{
								type: "zionAccountId登录",
								acc_val: payload.account_pk + ""
							}, {
								type: "手机验证码登录",
								acc_val: mobile + ""
							}]
						}
					}
				},
				fields: ["id"]
			})


			if (!user_tmp) {
				return fail("注册失败", -1, getRequest());
			}
			user = user_tmp;
		}
	}
}
if (!user?.id) {
	return fail("登录失败", -1, getRequest());
}
// 更新该账户绑定的已登录用户
const result = ezcloud.mutation({
	name: `update_account_by_pk`,
	args: {
		pk_columns: { id: payload.account_pk },
		_set: { user_user: user.id }
	},
	fields: ["id"]
});

// 生成用户ID
function generateUserId(prefix = 'U', index = 0, num = 2) {
	// 获取当前时间戳（格式化为 YYYYMMDDHHMMSS）
	const datetime = new Date().toISOString().slice(0, 19).replace(/[-:.T]/g, '');

	// 生成随机序列（长度为 num 的随机数字）
	const randomSerial = Math.floor(Math.random() * (10 ** num)).toString().padStart(num, '0');

	// 将索引转换为两位数的字符串
	const number = index.toString().padStart(2, '0');

	// 定义字符集
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	// 将时间戳、索引和随机序列拼接成一个字符串
	const identifier = `${datetime}${number}${randomSerial}`;

	// 将 identifier 转换为 Base62 编码
	let code = '';
	let base62Value = BigInt(identifier); // 直接将字符串转换为 BigInt
	while (base62Value > 0n) { // 使用 0n 表示 BigInt 的零值
		const remainder = base62Value % 62n; // 使用 62n 表示 62 的 BigInt 类型
		code = alphabet[remainder] + code;
		base62Value = base62Value / 62n; // 使用 62n 表示 62 的 BigInt 类型
	}

	return `${prefix}${code}`;
}

return {
	user_pk: user.id,
	token: genJwtToken({
		model: "user",
		id: user.id
	})
}