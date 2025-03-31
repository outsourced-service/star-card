import { wxMiniLogin } from "./wxMiniLogin";
// 获取登录code
export async function getCode(provider: "weixin" | "qq" | "sinaweibo" | "xiaomi" | "apple" | "univerify" = 'weixin') {
	return await new Promise((resolve, reject) => {
		return uni.login({
			provider,
			success: (res: any) => {
				if (res.code) return resolve(res.code);
				return reject(res);
			},
			fail(err: any) {
				return reject(err);
			},
		});
	}).then((code) => code).catch((e) => { console.warn(e); throw e });
}

export const login = async () => await wxMiniLogin();