declare const uni : any;
import ezInstance from "@/utils/ezInstance";
import { LocalSync } from "@/utils/storage"
const { api, ezserver, apiInit, ezclient } = ezInstance;

// 获取wxcode
export async function getCode(provider : String = 'weixin') {
	return await new Promise(async (resolve, reject) => {
		return await uni.login({
			provider,
			success: (res : any) => {
				if (res.code) return resolve(res.code);
				return reject(res);
			},
			fail(err : any) {
				return reject(err);
			},
		});
	}).then((code) => code).catch((e) => { return ""; });
}

//获取token
export async function getToken(userToken : any) {
	// 获取token
	const token = userToken || LocalSync.get("token");
	// 判断他token是否过期,如果过期重新请求
	if (token?.code && token?.ExpireTime > Date.now()) return token;
	else {
		await headers()
		LocalSync.remove("token");
		const wxCode = await getCode();
		return await ezserver.callScf({
			scf_dir: "/user/",
			scf_name: "wxMiniLogin",
			payload: {
				// user_token: token?.code ?? '',
				code: wxCode,
			},
		}).then(result => {
			const token = {
				ExpireTime: result.expires_in,
				code: result?.user_token
			}
			LocalSync.set("token", token);
			LocalSync.set('loginTime', Date.now());
			return token
		})
	}
}
const value = {
	isRequesting: false, // 请求状态标志
	token: null, // 保存token
	pendingPromise: <any>null, // 存储请求的Promise
}
export async function wxMiniLogin(userToken ?: string) {
	// 如果已经有请求在进行中的pendingPromise，则直接返回pendingPromise
	if (value.isRequesting && value.pendingPromise) return value.pendingPromise;
	// 设置请求状态
	value.isRequesting = true;
	//开启延时
	apiInit(true);
	// 获取token
	// 创建一个新的Promise
	const promise = getToken(userToken ? {
		ExpireTime: Date.now() + 1000 * 60 * 30,
		code: userToken
	} : null).then(result => {
		ezserver.setClientinfo({ user_token: result?.code });
		return result
	}).catch(error => {
		value.pendingPromise = null;
		throw new Error(`获取用户信息失败: ${error.message}`);
	}).finally(() => {
		value.isRequesting = false;
		apiInit(false);
	})
	// 如果存在旧的pendingPromise，使用Promise.race来确保只处理第一个请求的结果
	if (value.pendingPromise) {
		value.pendingPromise = Promise.race([value.pendingPromise, promise]);
	} else {
		value.pendingPromise = promise;
	}
	// 返回新的Promise
	return value.pendingPromise;
}

export async function headers() {
	const getHeaders = ezserver.getHeaders()
	if (!getHeaders?.authorization) {
		const { jwt } = await ezclient.mutation({
			name: "loginWithWechatMiniApp",
			args: {
				code: await getCode(),
				createIfNotExists: true // 如果用户不存在，则创建新用户
			},
			fields: `account{ email id permissionRoles phoneNumber profileImageUrl roles{ id name } thirdPartyInfo{ provider userInfo{ name openId type unionId } } username } jwt{ token }` // 查询字段，包括账户信息和jwt token
		})
		console.log(jwt);
		ezserver.setHeaders({
			authorization: jwt?.token ?? ''
		})
	}
}