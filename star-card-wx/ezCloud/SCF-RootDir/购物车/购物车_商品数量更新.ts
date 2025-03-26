// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();

//is_add值为"更新"、"变更"
//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MiwiZXhwaXJlc19pbiI6MTczNjI5OTczOTkxM30=.QOpiQhY9IL00oqLK//n/lWfCbxs2V1ydrPZLZMt2nT4=",
//     "cart_pk": 1,
//     "num": 1,
//     "is_add": "更新"
// }

//验证用户token信息
const userInfo = parseJwtToken(payload.token)
if (!userInfo?.id) {
    return fail("未查询到用户,请传入正确的token", -1, getRequest());
}

//查询购物车信息
let [cart] = ezcloud.query({
    name: `cart`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload?.cart_pk },
        },
    },
    fields: ["id is_selected num"]
});

//库存已删除验证
if (!cart?.id) {
    return fail("购物车查询商品失败，请刷新页面", -1, getRequest());
}

//当传入值不等于0时，重计算购物车数量
let num = cart?.num

if (payload?.num !== 0) {
    num = payload?.is_add === "更新" ? payload?.num : cart?.num + payload?.num
}


if (payload?.num == 0 || num == 0) {
    //删除购物车信息
    let cart = ezcloud.mutation({
        name: `delete_cart`,
        args: {
            where: {
                id: { _eq: payload?.cart_pk },
            },
        },
        fields: ["returning{id}"]
    });

    return cart

} else {
    //更新购物车信息
    let cart = ezcloud.mutation({
        name: `update_cart`,
        args: {
            where: {
                id: { _eq: payload?.cart_pk },
            },
            _set: {
                num: num,
            }
        },
        fields: ["returning{id }"]
    })?.returning[0];

    return cart
}
