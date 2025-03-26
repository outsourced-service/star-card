import { RouteRecordRaw } from 'vue-router';
import { merge } from 'lodash';

const defaultRoute: RouteRecordRaw = {
	path: '/pages/:name',
	name: 'pages',
	component: null,
	redirect: '',
	children: [],
	meta: {
		title: 'message.router',
		isLink: '',
		isHide: true,
		isKeepAlive: false,
		isAffix: false,
		isIframe: false,
		roles: ['admin'],
		icon: 'ele-User',
	},
};


// 初始化路由
export const initRotes = (customRoute: Partial<RouteRecordRaw>, children?: Array<RouteRecordRaw>): RouteRecordRaw => {
	// 解构赋值，将customRoute中的meta属性提取出来，其他属性赋值给routeRecordRaw
	const { meta, ...routeRecordRaw } = customRoute;
	// 返回合并后的路由记录
	return merge({}, defaultRoute, {
		// 将routeRecordRaw中的属性赋值给路由记录
		...routeRecordRaw,
		// 将children属性赋值给路由记录，如果children为空，则赋值为空数组
		children: children || [],
		// 将meta属性赋值给路由记录，将defaultRoute中的meta属性与customRoute中的meta属性合并
		meta: {
			...defaultRoute.meta,
			// 将路由记录的name属性转换为字符串，并将其作为title属性的值
			title: `message.router.${String(routeRecordRaw.name || defaultRoute.name)}`,
			// 将customRoute中的meta属性赋值给路由记录的meta属性
			...meta
		},
	});
};