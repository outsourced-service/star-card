import { login } from "@/api/login/index";

// 需要拦截的路由方法
const routeMethods = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']

// 白名单页面（不需要验证token的页面）
const whiteList:string[] = [
	'/pages/login/index',
	'/pages/register/index'
]

export default routeMethods.map(method => ({
	options: method,
	overload: {
		async invoke(args: { url: string }) {
			// 获取要跳转的页面路径
			const url = args.url.split('?')[0]
			// 白名单直接放行
			if (whiteList.includes(url)) return args;
			try {
				// 非白名单页面，验证token
				await login()
			} catch (e) {
				console.error('Token验证失败:', e)
			}

			// token验证通过，继续原本的跳转
			return args
		},
		fail(err: any) {
			console.error('路由跳转失败:', err)
			return false
		}
	}
}))