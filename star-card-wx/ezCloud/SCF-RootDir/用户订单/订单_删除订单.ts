const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();
//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MSwiZXhwaXJlc19pbiI6MTczMjQzNDgxNDUwN30=.79V3f3a7TjO0tUBiSFL7FrB0gkYQDEJ95kxfBZe0GeI=",
//     "order_info_pk": 109
// }

//验证用户token信息
const userInfo = parseJwtToken(payload.token)
if (!userInfo?.id) {
    return fail("未查询到用户,请传入正确的token", -1, getRequest());
}
//验证订单信息
if (!payload.order_info_pk) {
    return fail("请传入order_info_pk", -1, getRequest());
}
//5.删除用户订单数据
const order_info_tem = ezcloud.mutation({
    name: `update_order_info`,
    args: {
        where: {
            id: { _eq: payload.order_info_pk }
        },
        _set: {
            is_deleted: true
        }
    },
    fields: ["returning{id}"]
});

return order_info_tem.returning[0]