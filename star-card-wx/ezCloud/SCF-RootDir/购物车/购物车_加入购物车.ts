// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();

//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MiwiZXhwaXJlc19pbiI6MTczNjI5OTczOTkxM30=.QOpiQhY9IL00oqLK//n/lWfCbxs2V1ydrPZLZMt2nT4=",
//     "goods_sku_pk": 1,
//     "num": 1
// }

//验证用户token信息
const userInfo = parseJwtToken(payload.token)
if (!userInfo?.id) {
    return fail("未查询到用户,请传入正确的token", -1, getRequest());
}

//查询sku信息
let [goods_sku] = ezcloud.query({
    name: `goods_sku`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload?.goods_sku_pk },

        },
    },
    fields: ["id price stock present_score sales status is_deleted goods{id status}"]
});
//库存已删除验证
if (goods_sku?.is_deleted == true) {
    return fail("该库存已下架", -1, getRequest());
}
//库存已下架验证
if (goods_sku?.status != "展示中") {
    return fail("该货物已下架", -1, getRequest());
}
//商品已下架验证
if (goods_sku?.goods?.status != "展示中") {
    return fail("该商品已下架", -1, getRequest());
}

//查询购物车是否存在sku
let [cart_list] = ezcloud.query({
    name: `cart`,
    args: {
        limit: 1,
        where: {
            user_user: { _eq: userInfo?.id },
            goods_sku_goods_sku: { _eq: payload?.goods_sku_pk }
        },
    },
    fields: ["id num is_selected"]
});
//购物车信息
let is_selected = cart_list?.is_selected || true
let num = cart_list?.num + payload?.num
let cart = {}
//库存数据判断
if (num > goods_sku.stock) {
    return fail("已超出该商品库存", -1, getRequest());
}

if (!cart_list?.id) {
    //添加至购物车
    let cart_tem = ezcloud.mutation({
        name: `insert_cart_one`,
        args: {
            object: {
                is_selected: is_selected,
                num: payload?.num,
                user_user: userInfo?.id,
                goods_sku_goods_sku: payload?.goods_sku_pk
            },
        },
        fields: ["id"]
    });

    cart = cart_tem
} else {
    //更新购物车
    let cart_tem = ezcloud.mutation({
        name: `update_cart`,
        args: {
            where: {
                user_user: { _eq: userInfo?.id },
                goods_sku_goods_sku: { _eq: payload?.goods_sku_pk }
            },
            _set: {
                num: num,
            }
        },
        fields: ["returning{id }"]
    })?.returning[0];

    cart = cart_tem
}

return cart