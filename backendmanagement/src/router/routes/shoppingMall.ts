import { initRotes } from '../utils';
// 商城管理
export default initRotes({
    path: '/shoppingMall',
    name: 'shoppingMall',
    redirect: '/products',
    meta: {
        isHide: false,
        icon: 'ele-ShoppingBag',
    }
}, [
    // 产品分类路由
    initRotes({
        path: '/products/categories',
        name: 'productCategories',
        component: () => import('/@/views/dynamicRoutes/products/categories/index.vue'),
        meta: {
            isHide: false,
            icon: 'ele-Folder',
        }
    }),
    // 商品标签路由
    initRotes({
        path: '/products/tags',
        name: 'productTags',
        component: () => import('/@/views/dynamicRoutes/products/tags/index.vue'),
        meta: {
            isHide: false,
            icon: 'ele-CollectionTag',
        }
    }),
    // 商品路由
    initRotes({
        path: '/products',
        name: 'products',
        component: () => import('/@/views/dynamicRoutes/products/index.vue'),
        meta: {
            isHide: false,
            icon: 'ele-Goods',
        }
    }),
    // 商品详情路由
    initRotes({
        path: '/products/:id',
        name: 'productDetail',
        component: () => import('/@/views/dynamicRoutes/products/detail/index.vue'),
        meta: {
            isHide: true, // 可以根据需要设置是否不在菜单中显示
            icon: 'ele-GoodsFilled'
        }
    }),
]);