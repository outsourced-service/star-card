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
	token: {"userToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImV4cGlyZXNfaW4iOjE3NDM1MDcxNDk1Nzd9.nLS+w287J1Z6/iB4vSUxln8WcRpfcMPYU3l6pLZNTQw=","userID":37,"expires_in":1743507150354,"jwtToken":"eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTAwMDAwMDAwMDAwMDAxMCIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsInNlbGYiXX0sInplcm8iOnt9LCJyb2xlcyI6WyJzZWxmIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDAwMDAwMDAwMDAwMDEwIiwiZGVmYXVsdFJvbGUiOiJ1c2VyIiwiZXhwIjoxNzc1MDM1OTQ5LCJpc3MiOiIxMDAwMDAwMDAwMDAwMDAwIiwiaWF0IjoxNzQzNDk5OTQ5fQ.EkXia2WgY6V2gYnUFvFVwmGJ2OJca-_6f6WpjUtC1z4"}, // 保存token
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
		throw new Error(error)
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