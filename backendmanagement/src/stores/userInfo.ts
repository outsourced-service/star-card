/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { Session } from '/@/utils/storage';
import { ElMessage } from 'element-plus';
import ezInstance from '/@/utils/ezInstance';// 引入ezcloud工具，用于执行数据操作  
const { ezserver } = ezInstance;
import { loginApi, accountApi } from '/@/api/system'; // 引入接口

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 * @methods login 登录
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		// 用户登录获取token
		async login(userInfo: { username: string; password: string; code?: string; }) {
			const result = await loginApi().login(userInfo);
			//获取登录中的信息
			const { ...info } = result;
			// 存储token管理状态
			Session.set('token', info);
			return info.token;
		},
		async verifyToken() {
			try {
				const res = Session.get('token');
				if (!res || !res?.expires_in) throw new Error('token不存在');
				ezserver.setClientinfo({ token: res.token });

				// 验证token是否过期
				if ((res?.expires_in ?? 0) <= Date.now() - 1000 * 60 * 5) {
					const userInfo = Session.get('userInfo');
					const result = await loginApi().refreshToken({
						username: userInfo?.username ?? '-',
					});
					// 存储token管理状态
					Session.set('token', result);
					res.token = result.token;
					ezserver.setClientinfo({ token: res.token });
				}
				return true;
			} catch (error: any) {
				// eslint-disable-next-line no-console
				console.warn(error);
				return false;
			}
		},
		async verifyUserInfo() {
			// 1.获取用户信息
			const userInfo = Session.get('userInfo');
			// 2.验证用户信息是否有效,无效则重写获取
			if (userInfo && (userInfo?.expires_in ?? 0) > Date.now()) return this.userInfos = userInfo;
			return await this.getApiUserInfo();
		},

		async setUserInfos(isreload = false) {
			// return this.mockUserInfo()
			// 1.验证token是否有效 && 验证用户信息是否有效
			if (await this.verifyToken() && await this.verifyUserInfo()) return true;
			else return this.clear(isreload);
		},
		async getApiUserInfo() {
			return await accountApi().reads().then((manager) => {
				this.userInfos = {
					...manager,
					expires_in: Date.now() + 60000 * 30,
					time: Date.now(),
					userName: manager.nickname,
					photo: manager.avatar.url,
					roles: manager.manager_role.map((res: { name: any; }) => res?.name),
					authBtnList: [...manager.manager_role.reduce((set: any, item: any) => {
						item?.role_per?.forEach((element: any) => {
							set.add(element.per.name);
						});
						return set
					}, new Set([]))],
				}
				// 存储用户信息到浏览器缓存
				Session.set('userInfo', this.userInfos);
				// 用户名称
				Cookies.set('userName', manager.nickname);
				return manager
			}).catch((err) => {
				// eslint-disable-next-line no-console
				console.warn(err)
				return false;
			});
		},
		async setRoutes() {
			// 获取路由管理状态
			let routes = Session.get('routes');
			if (!routes || (routes?.expires_in ?? 0) < Date.now()) {
				// eslint-disable-next-line no-unused-vars
				const data = await accountApi().routes().catch((e: any) => {
					return false;
				})
				// 没有路由信息，重新获取
				routes = {
					expires_in: Date.now() + 60000 * 30,
					data: data ?? [],
				};
				// 存储route管理状态
				Session.set('routes', routes);
			}
			return routes.data;
		},
		// 模拟接口数据
		// https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
		async mockUserInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
					// 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
					const userName = Cookies.get('userName');
					// 模拟数据
					let defaultRoles: Array<string> = [];
					let defaultAuthBtnList: Array<string> = [];
					// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					let adminRoles: Array<string> = ['admin'];
					// admin 按钮权限标识
					let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
					// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					let testRoles: Array<string> = ['common'];
					// test 按钮权限标识
					let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
					// 不同用户模拟不同的用户权限
					if (userName === 'admin') {
						defaultRoles = adminRoles;
						defaultAuthBtnList = adminAuthBtnList;
					} else {
						defaultRoles = testRoles;
						defaultAuthBtnList = testAuthBtnList;
					}
					// 用户信息模拟数据
					const userInfos = {
						userName: userName,
						photo:
							userName === 'admin'
								? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
								: 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						time: Date.now(),
						expires_in: Date.now() + 60000 * 30, // 30分钟
						roles: defaultRoles,
						authBtnList: defaultAuthBtnList,
					};
					Session.set('userInfo', userInfos);
					this.userInfos = userInfos;
					resolve(userInfos);
				}, 0);
			});
		},
		// 退出登录
		clear(isreload = false) {
			// 清除缓存/token等
			Session.clear();
			// 使用 reload 时，不需要调用 resetRoute() 重置路由
			isreload && window.location.reload();
			return ElMessage.warning('登录已过期，请重新登录');
		},
	},
});
