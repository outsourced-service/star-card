import { initRotes } from '../utils';
// 运营管理
export default initRotes({
    path: '/operation',
    name: 'operation',
    redirect: '/operation/account',
    meta: {
        isHide: false,
    }
}, [
    initRotes({
        path: '/operation/banner',
        name: 'operationBanner',
        component: () => import('/@/views/dynamicRoutes/operation/banner/index.vue'),
        meta: {
            isHide: false,
            roles: ['admin'],
            icon: '',
        },
    }),
    initRotes({
        path: '/operation/resource',
        name: 'operationResource',
        component: () => import('/@/views/dynamicRoutes/operation/resource/index.vue'),
        meta: {
            isHide: false,
            roles: ['admin'],
            icon: '',
        }
    })])