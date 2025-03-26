const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();

//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MSwiZXhwaXJlc19pbiI6MTczMjQzNDgxNDUwN30=.79V3f3a7TjO0tUBiSFL7FrB0gkYQDEJ95kxfBZe0GeI=",
//     "order_info_pk": 1,
//     "address_pk": 1
// }

//验证用户token信息
const userInfo = parseJwtToken(payload.token)
if (!userInfo?.id) {
    return fail("未查询到用户,请传入正确的token", -1, getRequest());
}

if (!payload.address_pk) {
    return fail("请传入address_pk", -1, getRequest());
}
if (!payload.order_info_pk) {
    return fail("请传入order_info_pk", -1, getRequest());
}
const TIME = new Date().getTime();
//1.查询订单信息
const [order_info] = ezcloud.query({
    name: `order_info`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload.order_info_pk },
        },
    },
    fields: ["id process_status order_address{id}"]
})
if (!order_info.id) {
    return fail("未查询到订单", -1, getRequest());
}

//2.传入地址address_pk，查询地址信息
const [address] = ezcloud.query({
    name: `address`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload.address_pk },

        },
    },
    fields: ["id consignee phone province city area address_title address_info address_detail house set_default_num"]
})

if (!address?.id) {
    return fail("未查询到地址信息", -1, getRequest());
}
//更新寄回地址
const order_address = ezcloud.mutation({
    name: `insert_order_address_one`,
    args: {
        object: {
            consignee: address?.consignee,
            phone: address?.phone,
            province: address?.province,
            city: address?.city,
            area: address?.area,
            address_title: address?.address_title,
            address_info: address?.address_info,
            address_detail: address?.address_detail,
            house: address?.house,
            set_default_num: TIME,
            order_info_order_info: order_info?.id,
            address_address: address?.id
        },
    },
    fields: ["id"]
});

return order_address
