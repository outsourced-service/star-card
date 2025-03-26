import { initRotes } from '../utils';
// 系统管理
export default initRotes({
	path: '/system',
	name: 'system',
	redirect: '/system/account',
	meta: {
		isHide: false,
	}
}, [
	initRotes({
		path: '/system/account',
		name: 'systemAccount',
		component: () => import('/@/views/dynamicRoutes/system/account/index.vue'),
		meta: {
			isHide: false,
			roles: ['admin'],
			icon: 'ele-User',
		},
	}),
	initRotes({
		path: '/system/role',
		name: 'systemRole',
		component: () => import('/@/views/dynamicRoutes/system/role/index.vue'),
		meta: {
			isHide: false,
			roles: ['admin'],
			icon: 'ele-ColdDrink',
		}
	}),
	initRotes({
		path: '/system/menu',
		name: 'systemMenu',
		component: () => import('/@/views/dynamicRoutes/system/menu/index.vue'),
		meta: {
			isHide: false,
			roles: ['admin'],
			icon: 'ele-Menu',
		},
	}),
	initRotes({
		path: '/system/per',
		name: 'systemPer',
		component: () => import('/@/views/dynamicRoutes/system/per/index.vue'),
		meta: {
			// isHide: false,
			roles: ['admin'],
			icon: 'ele-ColdDrink',
		},
	})])