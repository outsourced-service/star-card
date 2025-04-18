import { getCode } from "./index";
import ezInstance from "@/utils/ezInstance";
import { LocalSync } from "@/utils/storage"
const { ezserver, ezclient, toast } = ezInstance;

// 配置ezserver信息
const apiInitConfig = (token : wxMiniLoginResponse) => {
	// 验证是否已经初始化
	const clientinfoEzserver = ezserver.getClientinfo();
	const headersEzserver = ezserver.getHeaders();

	const headersEzclient = ezclient.getHeaders();

	// 设置客户端信息
	!clientinfoEzserver?.user_token && token?.userToken && ezserver.setClientinfo({ token: token?.userToken });

	// 设置请求头
	!headersEzserver?.Authorization && token?.jwtToken && ezserver.setHeaders({ Authorization: `Bearer ${token.jwtToken}` })
	!headersEzclient?.Authorization && token?.jwtToken && ezclient.setHeaders({ Authorization: `Bearer ${token.jwtToken}` })

	return token
}

// 验证token是否过期,过期则重新获取
const getToken = async (userToken ?: wxMiniLoginResponse, payload ?: wxMiniLoginRequest) => {
	// 获取token
	const token = userToken || LocalSync.get("token");
	// 验证token是否过期
	if (token && Date.now() < token?.expires_in) return apiInitConfig(token)

	console.log(token);
	

	// 获取code
	const wxCode = await getCode();
	return await ezserver.callScf({
		scf_dir: "/login/",
		scf_name: "wxMiniLogin",
		payload: {
			...payload,
			code: wxCode,
		}
	}).then((res : wxMiniLoginResponse) => {
		const token = {
			...res,
			expires_in: Date.now() + res.expires_in * 1000
		}
		// 存储token
		LocalSync.set("token", token);
		return apiInitConfig(token)
	}).catch(() => {
		toast("微信登录失败，请重试")
		throw new Error("微信登录失败，请重试")
	})
}

const value : any = {
	isRequesting: false, // 请求状态标志
	token: {"userToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImV4cGlyZXNfaW4iOjE3NDQ4NjcyMDcyNTV9.vpVhsyxfKSOmYbGCjNNK95DSAKJ/UCggr9ris04yYVs=","userID":3,"expires_in":1844867209925,"jwtToken":"eyJhbGciOiJIUzI1NiJ9.eyJkZWZhdWx0Um9sZSI6InVzZXIiLCJaRVJPX1VTRVJfSUQiOiIxMDAwMDAwMDAwMDAwMDEwIiwicm9sZXMiOlsidXNlciIsInNlbGYiXSwiemVybyI6e30sImhhc3VyYV9jbGFpbXMiOnsieC1oYXN1cmEtdXNlci1pZCI6IjEwMDAwMDAwMDAwMDAwMTAiLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJzZWxmIiwidXNlciJdfSwiZXhwIjoxNzc2Mzk2MDA3LCJpc3MiOiIxMDAwMDAwMDAwMDAwMDAwIiwiaWF0IjoxNzQ0ODYwMDA3fQ.rNw9D_r-TkHVlTTEyFzJsOaIpV5Z7vhYclV6NwjCo0M"}, // 保存token
	pendingPromise: <any>null, // 存储请求的Promise
}
export async function wxMiniLogin(payload ?: wxMiniLoginRequest) {
	// 如果已经有请求在进行中的pendingPromise，则直接返回pendingPromise
	if (value.isRequesting && value.pendingPromise) return value.pendingPromise;
	// 设置请求状态
	value.isRequesting = true;
	// 获取token
	// 创建一个新的Promise
	const promise = getToken(value.token, payload).then((token : wxMiniLoginResponse) => {
		value.token = token;
		return token;
	}).catch(error => {
		value.pendingPromise = null;
		toast("微信登录失败，请重试")
		throw error
	}).finally(() => {
		value.isRequesting = false;
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