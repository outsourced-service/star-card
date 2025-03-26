import { initRotes } from '../utils';
// 运营管理
export default initRotes({
    path: '/order',
    name: 'order',
    redirect: '/order/sendReview',
    meta: {
        isHide: false,
    }
}, [
    initRotes({
        path: '/order/sendReview',
        name: 'sendReviewOrder',
        component: () => import('/@/views/dynamicRoutes/order/send_review/index.vue'),
        meta: {
            isHide: false,
            roles: ['admin'],
            icon: '',
        },
    }),
    initRotes({
        path: '/order/shoppingMall',
        name: 'shoppingMallOrder',
        component: () => import('/@/views/dynamicRoutes/order/shopping_mall/index.vue'),
        meta: {
            isHide: false,
        }
    })])