// @ts-nocheck
const { setReturn, query, mutation, callScf } = ezcloud;
const { getArg } = context;

// 1.取出数据并验证
const callback = getArg('fz_payment_callback_input');

// 2.计算密钥并解密

// 3.取出paymentId, out_trade_no格式："wechat_0_7" 
const paymentId = convertWechatCallbackToFzPaymentId(callback?.out_trade_no);
const transaction_id = callback?.transaction_id;

if (callback?.result_code !== "SUCCESS" || callback?.return_code !== "SUCCESS" || !paymentId || !transaction_id) {
    return setReturn({ callback }, "失败", "支付回调验证失败");
}

// 4.查询支付订单状态
const { fz_payment_by_pk: fz_payment_one } = query({
    name: "fz_payment_by_pk",
    args: {
        id: paymentId
    },
    fields: `id status order_id account_id transaction_id`
});

if (fz_payment_one?.status === "SUCCESSFUL") return setReturn({ callback, fz_payment_one }, "成功", "支付已完成");

if (fz_payment_one?.status !== "PENDING") return setReturn({ callback, fz_payment_one }, "失败", "支付状态异常");

// 5.更新fz_payment数据表状态
const { update_fz_payment_by_pk: fz_payment } = mutation({
    name: "update_fz_payment_by_pk",
    args: {
        pk_columns: {
            id: paymentId
        },
        _set: {
            status: "SUCCESSFUL",
            transaction_id
        }
    },
    fields: ["id", "status", "transaction_id", "grand_total_value", "order_id", "account_id"]
});

// 6.调用订单执行处理
const actionRes = callScf({
    scf_name: "paymentCallback",
    scf_dir: "/",
    payload: {
        order_id: fz_payment?.order_id,
        payment_id: fz_payment?.id,
        transaction_id: fz_payment?.transaction_id,
    }
});

// 7.返回最终结果
return actionRes;

function convertWechatCallbackToFzPaymentId(outTradeNo) {
    const BASE_WECHAT_PAYMENT_ID = 8000000000000000;
    return BASE_WECHAT_PAYMENT_ID + Number(outTradeNo.slice(outTradeNo.lastIndexOf('_') + 1));
}
