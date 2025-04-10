// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();
//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MiwiZXhwaXJlc19pbiI6MTczNjI5OTczOTkxM30=.QOpiQhY9IL00oqLK//n/lWfCbxs2V1ydrPZLZMt2nT4=",
//     "goods_sku_pk": 1,
//     "num": 1
// }


//获取用户token信息
const userInfo = parseJwtToken(payload.token)
const TIME = new Date().getTime();
const sevenDaysLater = TIME + 604800000;
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
    fields: [`id price stock present_score growth_value original_price sales status is_deleted
         goods{id goods_name goods_img_id status}
         goods_sku_attri_spec{id goods_attri_spec_goods_attri_spec goods_attri_spec{id img_id value goods_attri{id type name idx}}}`]
});

// 1.新增订单批次
const order_more = ezcloud.mutation({
    name: "insert_order_one",
    args: {
        object: {
            mode: "商品订单",
            title: "用户商品下单"
        },
    },
    fields: [" id"]
})

let order_pk = order_more.id

//2.查询是否默认地址
const [address] = ezcloud.query({
    name: `address`,
    args: {
        limit: 1,
        where: {
            user_user: { _eq: userInfo.id },
        },
        order_by: { set_default_num: () => "desc_nulls_first" },
    },
    fields: ["id consignee phone province city area address_title address_info address_detail house set_default_num"]
})

let goods_sku_attri_spec = goods_sku?.goods_sku_attri_spec;
let pay_amount = goods_sku?.price * payload?.num
// let total_price = goods_sku?.original_price * payload?.num
// let discount_amount = - (total_price - pay_amount)
// 3.订单生成下单
const order_info = ezcloud.mutation({
    name: `insert_order_info_one`,
    args: {
        object: {
            order_id: generateOrderId("", 0, 3),
            pay_amount: pay_amount,
            total_price: pay_amount,
            deliver_fee: 0,
            discount_amount: 0,
            is_supplementary_payment: false,
            is_select: false,
            stock_status: "库存锁定",
            coupon_status: "优惠券锁定",
            user_user: userInfo.id,
            order_order: order_pk,
            order_time: TIME,
            process_status: "待下单",
            status: "待下单",
            is_deleted: false,
            num: payload?.num,
            is_tips: true,
            estimate_time: sevenDaysLater,
            come_from: "商品下单",
            order_progress: {
                data: [
                    {
                        type: "订单创建->待下单",
                        title: "订单信息创建",
                        content: "订单信息创建",
                        confirm_time: TIME,
                        status: "已完成"
                    }
                ]
            },
            order_address: {
                data: [
                    {
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
                        address_address: address?.id,
                    }
                ]
            },
            order_goods_sku: {
                data: [
                    {
                        goods_name: goods_sku?.goods?.goods_name,
                        goods_img_id: goods_sku?.goods?.goods_img_id,
                        price: goods_sku?.price,
                        orig_price: goods_sku?.original_price,
                        cost_price: goods_sku?.price,
                        num: payload?.num,
                        present_score: goods_sku?.present_score,
                        growth_value: goods_sku?.growth_value,
                        order_goods_attri_spec: {
                            data: goods_sku_attri_spec.reduce((arr, item) => {
                                arr.push({
                                    idx: item?.goods_attri_spec?.goods_attri?.idx,
                                    name: item?.goods_attri_spec?.goods_attri?.name,
                                    value: item?.goods_attri_spec?.value,
                                    img_id: item?.goods_attri_spec?.img_id,
                                })
                                return arr
                            }, [])
                        }
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


