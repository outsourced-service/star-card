import { RouteRecordRaw } from 'vue-router';
// import { storeToRefs } from 'pinia';
import pinia from '/@/stores/index';
import { useUserInfo } from '/@/stores/userInfo';
import { useRequestOldRoutes } from '/@/stores/requestOldRoutes';
import { Session } from '/@/utils/storage';
import { NextLoading } from '/@/utils/loading';
import { dynamicRoutes, notFoundAndNoPower } from '/@/router/route';
import { formatTwoStageRoutes, formatFlatteningRoutes, router } from '/@/router/index';
import { useRoutesList } from '/@/stores/routesList';
import { useTagsViewRoutes } from '/@/stores/tagsViewRoutes';

// 后端控制路由

/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const layouModules: any = import.meta.glob('../layout/routerView/*.{vue,tsx}');
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}');
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layouModules }, { ...viewsModules });

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method NextLoading 界面 loading 动画开始执行
 * @method useUserInfo().setUserInfos() 触发初始化用户信息 pinia
 * @method useRequestOldRoutes().setRequestOldRoutes() 存储接口原始路由（未处理component），根据需求选择使用
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initBackEndControlRoutes() {
	// 界面 loading 动画开始执行
	if (window.nextLoading === undefined) NextLoading.start();
	// 无 token 停止执行下一步
	if (!Session.get('token')) return false;
	// 触发初始化用户信息 pinia
	// https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
	await useUserInfo().setUserInfos();
	// 获取路由菜单数据
	const routes = await getBackEndControlRoutes();
	// 无登录权限时，添加判断
	// https://gitee.com/lyt-top/vue-next-admin/issues/I64HVO
	if (routes.length <= 0) return Promise.resolve(true);
	// 存储接口原始路由（未处理component），根据需求选择使用
	useRequestOldRoutes().setRequestOldRoutes(JSON.parse(JSON.stringify(routes)));
	// 处理路由（component），替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
	// dynamicRoutes[0].children = await backEndComponent(routes); // 将路由文件路径转成组件对象
	dynamicRoutes[0].children = routes;
	// 验证并修正路由对象中的 redirect 属性，防止动态路由跳转 404
	validateRedirect(dynamicRoutes);
	// 添加动态路由
	await setAddRoute();
	// 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
	setFilterMenuAndCacheTagsViewRoutes();
}

/**
 * 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export async function setFilterMenuAndCacheTagsViewRoutes() {
	const storesRoutesList = useRoutesList(pinia);
	storesRoutesList.setRoutesList(dynamicRoutes[0].children as any);
	setCacheTagsViewRoutes();
}

/**
 * 缓存多级嵌套数组处理后的一维数组
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function setCacheTagsViewRoutes() {
	const storesTagsView = useTagsViewRoutes(pinia);
	storesTagsView.setTagsViewRoutes(formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))[0].children);
}

/**
 * 处理路由格式及添加捕获所有路由或 404 Not found 路由
 * @description 替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
export function setFilterRouteEnd() {
	let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes));
	// notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
	// 关联问题 No match found for location with path 'xxx'
	filterRouteEnd[0].children = [...filterRouteEnd[0].children, ...notFoundAndNoPower];
	return filterRouteEnd;
}

/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（/@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute() {
	await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
}

/**
 * 请求后端路由菜单接口
 * @description isRequestRoutes 为 true，则开启后端控制路由
 * @returns 返回后端路由菜单数据
 */
export async function getBackEndControlRoutes() {
	// 如果没有开启后端控制路由，则不执行此方法
	const route = await useUserInfo().setRoutes()
	if (!route) return [];
	return routeResolution(route, dynamicRoutes[0].children)
}

/**
 * 菜单解析
 * @param children_menu 后端获取的菜单列表
 * @param route dynamicRoutes（/@/router/route）第一个顶级 children 的路由
 * @returns 返回处理成函数后的 RouteRecordRaw
 */
function routeResolution(children_menu: Array<Object> = [], route: Array<RouteRecordRaw> = []): Array<RouteRecordRaw> {
	//如果请求的菜单没有数据中止回调
	if (children_menu.length < 1) return [];
	//循环菜单数据,获取到每一个菜单的配置
	return children_menu.map((item: any) => {
		const children: any = route.find((child: any) => child.path === item.path);
		if (!children) return null;
		children.children = routeResolution(item.children_menu, children?.children ?? []);
		return children
	}).filter((item: any) => item);
}

/**
 * 重新请求后端路由菜单接口
 * @description 用于菜单管理界面刷新菜单（未进行测试）
 * @description 路径：/src/views/system/menu/component/addMenu.vue
 */
export async function setBackEndControlRefreshRoutes() {
	await getBackEndControlRoutes();
}

/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes: any) {
	if (!routes) return;
	return routes.map((item: any) => {
		if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component as string);
		item.children && backEndComponent(item.children);
		return item;
	});
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
	const keys = Object.keys(dynamicViewsModules);
	const matchKeys = keys.filter((key) => {
		const k = key.replace(/..\/views|../, '');
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
	});
	if (matchKeys?.length === 1) {
		const matchKey = matchKeys[0];
		return dynamicViewsModules[matchKey];
	}
	if (matchKeys?.length > 1) {
		return false;
	}
}

/**
 * 验证并修正路由对象中的 redirect 属性。
 * @param routes 路由对象数组
 * @returns 修正后的路由对象数组
 */
const validateRedirect = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
	const updatedRoutes: RouteRecordRaw[] = routes;
	/**
	 * 递归函数，用于更新每个路由对象的 redirect 属性。
	 * @param route 当前处理的路由对象
	 */
	function updateRedirect(route: RouteRecordRaw): void {
		if (route.children && route.redirect) {
			const childPaths = route.children.map(child => child.path);
			if (!childPaths.includes(route.redirect as string)) {
				route.redirect = route.children.length > 0 ? route.children[0].path : undefined;
			}
		}
		route.children && route.children.forEach(child => updateRedirect(child));
	}
	updatedRoutes.forEach(route => updateRedirect(route));
	return updatedRoutes;
};