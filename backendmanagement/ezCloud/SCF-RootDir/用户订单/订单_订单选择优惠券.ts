// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();
//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MSwiZXhwaXJlc19pbiI6MTczMjQzNDgxNDUwN30=.79V3f3a7TjO0tUBiSFL7FrB0gkYQDEJ95kxfBZe0GeI=",
//     "order_info_pk": 166,
//     "user_coupon_pk": 1
// }

//验证用户token信息
const userInfo = parseJwtToken(payload.token)
const TIME = new Date().getTime();
if (!userInfo?.id) {
    return fail("未查询到用户,请传入正确的token", -1, getRequest());
}
//验证订单信息
if (!payload.order_info_pk) {
    return fail("请传入order_info_pk", -1, getRequest());
}


//1.查询选择优惠券信息
const [user_coupon] = ezcloud.query({
    name: `user_coupon`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload.user_coupon_pk },

        },
    },
    fields: [`id start_time exp_time describe status user_coupon_status order_info_order_info
        order_info_paydetail{id order_info_order_info}
        coupon{show_name type amount_cny min_price_cny discount_rate max_use_limit} 
        `]
})

//验证优惠券是否可以使用
if (user_coupon.user_coupon_status != "启用") {
    return fail("该优惠券无法使用", -1, getRequest());
}

//验证优惠券是否已被使用
if (user_coupon.status == "已使用") {
    return fail("该优惠券已被使用", -1, getRequest());
}

//验证优惠券是否未到使用时间
if (user_coupon.start_time >= TIME) {
    return fail("该优惠券未到使用时间", -1, getRequest());
}

//验证优惠券是否已过期
if (user_coupon.exp_time <= TIME) {
    return fail("该优惠券已过期", -1, getRequest());
}

let item = {}
//查询当前选中订单数据
const [order_info] = ezcloud.query({
    name: `order_info`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload.order_info_pk },

        },
    },
    fields: [`id order_id total_price user_coupon{id}`]
})


//优惠券存在锁定记录
if (user_coupon?.order_info_paydetail.length > 0) {

    //1.查询已被锁定优惠券记录，即取消优惠券
    let order_info_order_info = user_coupon?.order_info_order_info
    //1.1删除优惠券之前选中记录
    let del_order_info_paydetail = ezcloud.mutation({
        name: `delete_order_info_paydetail`,
        args: {
            where: {
                user_coupon_user_coupon: { _eq: payload.user_coupon_pk }
            },
        },
        fields: ["returning{id order_info_order_info}"]
    });
    //2.循环计算被优惠券锁定的订单计算
    let array = del_order_info_paydetail?.returning
    let itmes = array.map(value => value.order_info_order_info);
    // 使用 for 循环遍历数组
    for (let i = 0; i < itmes.length; i++) {
        let order_record = update(itmes[i], 0)
    };
}

//添加优惠券,绑定新订单

if (payload.order_info_pk != user_coupon?.order_info_order_info) {
    // 3.订单锁定优惠券

    //3.1 根据优惠券类型计算优惠金额
    let coupon_amount = 0
    if (user_coupon?.coupon?.type == "折扣券") {
        //折扣优惠券计算优惠金额
        coupon_amount = Math.round(order_info?.total_price * user_coupon?.coupon?.discount_rate) - order_info?.total_price
    } else {
        coupon_amount = -user_coupon?.coupon?.amount_cny
    }
    //添加优惠明细记录
    let order_info_paydetail = ezcloud.mutation({
        name: `insert_order_info_paydetail_one`,
        args: {
            object: {
                type: "优惠明细",
                inc_amount: coupon_amount,
                deal_type: "优惠明细_使用优惠券",
                describe: "优惠明细_使用优惠券",
                order_info_order_info: payload.order_info_pk,
                user_coupon_user_coupon: payload.user_coupon_pk
            },
        },
        fields: ["id inc_amount"]
    });
    let order = update(payload.order_info_pk, coupon_amount)
    item = { "coupon_amount": coupon_amount, "user_coupon": payload.user_coupon_pk, "order_info_pk": payload.order_info_pk }
}

//更新优惠券
ezcloud.mutation({
    name: `update_user_coupon`,
    args: {
        where: {
            id: { _eq: payload.user_coupon_pk }
        },
        _set: {
            status: !item?.coupon_amount ? "未使用" : "订单锁定中",
            order_info_order_info: !item?.coupon_amount ? null : payload.order_info_pk
        }
    },
    fields: ["returning{id}"]
});

//计算即更新订单函数
function update(order_info_pk, coupon_amount) {
    //1.1订单支付组成明细
    let total_price_List = ezcloud.query({
        name: `order_info_paydetail`,
        args: {
            where: {
                order_info_order_info: { _eq: order_info_pk },
                type: { _eq: "入账明细" }
            },
        },
        fields: ["id inc_amount"]
    })

    //1.2已被锁定运费组成明细
    let deliver_fee_List = ezcloud.query({
        name: `order_info_paydetail`,
        args: {
            where: {
                order_info_order_info: { _eq: order_info_pk },
                type: { _eq: "运费明细" }
            },
        },
        fields: ["id inc_amount"]
    })
    //1.3已被锁定优惠组成明细
    let discount_amount_List = ezcloud.query({
        name: `order_info_paydetail`,
        args: {
            where: {
                order_info_order_info: { _eq: order_info_pk },
                type: { _eq: "优惠明细" }
            },
        },
        fields: ["id inc_amount"]
    })
    //已被锁定总支付金额
    let total_price = total_price_List.reduce((accumulator, order_info_paydetail) => {
        return accumulator + order_info_paydetail.inc_amount;
    }, 0);
    //已被锁定运费金额
    let deliver_fee = deliver_fee_List.reduce((accumulator, order_info_paydetail) => {
        return accumulator + order_info_paydetail.inc_amount;
    }, 0);

    //已被锁定总优惠金额
    let discount_amount = discount_amount_List.reduce((accumulator, order_info_paydetail) => {
        return accumulator + order_info_paydetail.inc_amount;
    }, 0);

    //已被锁定实际支付金额
    let pay_amount = total_price + deliver_fee + discount_amount
    //更新已被锁定订单，即订单取消优惠券绑定
    let order_info = ezcloud.mutation({
        name: `update_order_info`,
        args: {
            where: {
                id: { _eq: order_info_pk }
            },
            _set: {
                pay_amount: pay_amount,
                total_price: total_price,
                deliver_fee: deliver_fee,
                discount_amount: discount_amount,
                coupon_amount: coupon_amount || null
            }
        },
        fields: ["returning{id}"]
    })?.[0];
    return order_info_pk
}

return item