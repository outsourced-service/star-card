// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();


//payload入参示例
// {
//     "order_info_pk": 1,
//     "pay_amount": 1
// }

const TIME = new Date().getTime();
// 1.查询原订单信息
const [order_info_tem] = ezcloud.query({
    name: `order_info`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload?.order_info_pk }
        },
    },
    fields: ["id order_id user_user num text_status status order_scoring_annex{id img_id card_code card_category card_sign card_year current_score max_score content}"]
})

//验证用户档位信息
if (!order_info_tem?.id) {
    return fail("订单信息查询失败", -1, getRequest());
}

let order_number = generateOrderId("", 0, 3)//定义订单编号

// 2.新增补款订单
const order_info = ezcloud.mutation({
    name: `insert_order_info_one`,
    args: {
        object: {
            order_id: order_info_tem?.order_id,
            order_info_id: order_number,
            pay_amount: payload?.pay_amount,
            total_price: payload?.pay_amount,
            discount_amount: 0,
            deliver_fee: 0,
            order_time: TIME,
            come_from: "送评下单",
            num: order_info_tem?.num,
            is_supplementary_payment: true,
            is_select: false,
            is_deleted: false,
            is_tips: true,
            stock_status: "库存锁定",
            coupon_status: "优惠券锁定",
            text_status: order_info_tem?.text_status,
            user_user: order_info_tem?.user_user,
            process_status: "待付款",
            status: order_info_tem?.status,
            inviteparent_order_info: order_info_tem?.id,
            order_scoring_annex: {
                data: [
                    {
                        img_id: order_info_tem?.order_scoring_annex?.img_id,
                        card_code: order_info_tem?.order_scoring_annex?.card_code,
                        card_category: order_info_tem?.order_scoring_annex?.card_category,
                        card_sign: order_info_tem?.order_scoring_annex?.card_sign,
                        card_year: order_info_tem?.order_scoring_annex?.card_year,
                        category_score: order_info_tem?.order_scoring_annex?.category_score,
                        sign_score: order_info_tem?.order_scoring_annex?.sign_score,
                        current_score: order_info_tem?.order_scoring_annex?.current_score,
                        max_score: order_info_tem?.order_scoring_annex?.max_score,
                        content: order_info_tem?.order_scoring_annex?.content,
                    }
                ]
            },
            order_info_paydetail: {
                data: [
                    {
                        type: "入账明细",
                        inc_amount: payload?.pay_amount,
                        deal_type: "入账明细_补款费用",
                        describe: "入账明细_补款费用",
                    }
                ]
            }
        },
    },
    fields: ["id"]
})

// 生成订单号
function generateOrderId(prefix = 'P', index = 0, num = 4) {
    const datetime = new Date().getTime()//.toISOString().slice(0, 19).replace(/[-:.T]/g, '');
    const randomSerial = Math.floor(Math.random() * (num ** 10)).toString().padStart(num, '0');
    const number = index.toString().padStart(2, '0');
    return `${prefix}${datetime}${randomSerial}`;
}
return ezcloud.success(order_info);


