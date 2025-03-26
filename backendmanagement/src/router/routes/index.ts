import { initRotes } from '../utils';
import operations from "./operations"
import system from "./system"
import order from "./order"
import shoppingMall from "./shoppingMall";

export default [
    initRotes({
        path: '/user',
        name: 'user',
        component: () => import('/@/views/dynamicRoutes/user/index.vue'),
        meta: {
            isHide: false,
            roles: ['admin', 'common'],
            icon: 'ele-UserFilled',
        },
    }),
    shoppingMall,
    order,
    initRotes({
        path: '/sendForEvaluation/institution',
        name: 'sendForEvaluationInstitution',
        component: () => import('/@/views/dynamicRoutes/sendForEvaluation/institution/index.vue'),
        meta: {
            isHide: false,
            roles: ['admin', 'common'],
            icon: 'ele-OfficeBuilding',
        },
    }),
	initRotes({
	    path: '/cardLibrary',
	    name: 'cardLibrary',
	    component: () => import('/@/views/dynamicRoutes/cardLibrary/index.vue'),
	    meta: {
	        isHide: false,
	        roles: ['admin', 'common'],
	        icon: 'ele-Coin',
	    },
	}),
	// 商品详情路由
	initRotes({
	    path: '/cardLibrary/:id',
	    name: 'cardLibraryDetail',
	    component: () => import('/@/views/dynamicRoutes/cardLibrary/detail/index.vue'),
	    meta: {
	        isHide: true, // 可以根据需要设置是否不在菜单中显示
	        icon: 'ele-GoodsFilled'
	    }
	}),
	initRotes({
	    path: '/coupon',
	    name: 'coupon',
	    component: () => import('/@/views/dynamicRoutes/coupon/index.vue'),
	    meta: {
	        isHide: false,
	        roles: ['admin', 'common'],
	        icon: 'ele-Coin',
	    },
	}),
	initRotes({
	    path: '/viplevel',
	    name: 'viplevel',
	    component: () => import('/@/views/dynamicRoutes/viplevel/index.vue'),
	    meta: {
	        isHide: false,
	        roles: ['admin', 'common'],
	        icon: 'ele-Coin',
	    },
	}),
    system,
    operations
]