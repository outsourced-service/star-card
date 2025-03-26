// @ts-nocheck
/**
 * 修改相册信息
 */
const { getPayload, parseJwtToken, getClientinfo, queryGetFirstOne, mutation, fail } = ezcloud;
// const { user_pk } = parseJwtToken(getClientinfo().user_token);
// 获取参数
const { order_id, delivery_info } = getPayload();
// 查询订单信息
const order = queryGetFirstOne({
    name: "a_order",
    args: {
        where: { id: { _eq: order_id } }
    },
    fields: [`id photographer_photographer`, {
        name: "album",
        fields: "id title content cover_id"
    }]
});
// 修改相册的信息
return mutation({
    name: "update_album_by_pk",
    args: {
        pk_columns: { id: order.album[0].id },
        _set:{
            title: delivery_info.title,
            content: delivery_info.content,
            cover_id: delivery_info.cover_id,
        }
    },
    fields: "id title content cover_id"
})