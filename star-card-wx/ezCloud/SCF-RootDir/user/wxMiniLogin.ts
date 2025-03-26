// @ts-nocheck
const {
	getPayload,
	fetchApi,
	query,
	mutation,
	getSystem,
	fail,
	success,
	genJwtToken,
	parseJwtToken

} = ezcloud;

const {
	user_token,
	code = ""
} = getPayload();

let user_pk
if (user_token) {
	user_pk = parseJwtToken(user_token)?.user_pk
}

if (!user_pk) {

	const {
		app_id,
		app_secret
	} = getSystem()?.global_config?.wx_mini_config || {};


	if (!code) {
		return fail(`code 不能为空`)
	}

	if (!app_id || !app_secret) {
		return fail(`app_id 或 app_secret 未配置`)
	}

	const result = fetchApi({
		url: `https://api.weixin.qq.com/sns/jscode2session?appid=${app_id}&secret=${app_secret}&js_code=${code}&grant_type=authorization_code`,
	})

	const openid = result?.data?.openid;
	if (!openid) {
		return fail(result, `openid 获取失败`, 402)
	}

	let [user] = query({
		name: "user",
		args: {
			where: {
				wx_mini_openid: {
					_eq: openid
				},
			},
			limit: 1
		},
		fields: `id`
	});

	if (!user) {
		// 新增用户表数据
		user = mutation({
			name: "insert_user_one",
			args: {
				object: {
					wx_mini_openid: openid,
					other_data: result?.data ?? {}
				}
			},
			fields: `id`
		})
	}
	user_pk = user?.id;
}

// 
const expires_in = Date.now() + 1000 * 60 * 30;
const jwt_token = genJwtToken({
	expires_in,
	user_pk
})


user = query({
	name: `user`,
	args: {
		where: {
			id: {
				_eq: user_pk
			}
		},
		limit: 1
	},
	fields: `id username nickname `
})?.[0]

return {
	user_token: jwt_token,
	expires_in,
	user
}