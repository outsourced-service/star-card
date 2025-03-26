// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();
//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MSwiZXhwaXJlc19pbiI6MTczMjQzNDgxNDUwN30=.79V3f3a7TjO0tUBiSFL7FrB0gkYQDEJ95kxfBZe0GeI=",
//     "order_info_pk": 186,
//     "evaluation_insurance_pk": 2,
//     "speed_pk": 1,
//     "sign_pk": 3,
//     "size_pk": 4,
//     "inspection_service_pk": 6,
//     "num": 2,
//     "delivery_name": "顺丰快递",
//     "delivery_number": "12345677",
//     "status": "待下单",
//     "evaluation_notes": "测试",
//     "insure_fee": 10000
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

//验证用户档位信息
if (!payload.evaluation_insurance_pk) {
    return fail("请选择送评档位", -1, getRequest());
}

//1.查询送评订单信息
const [order_info] = ezcloud.query({
    name: `order_info`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload.order_info_pk },

        }
    },
    fields: [`id order_id process_status 
              order_evaluation_insurance{id evaluation_insurance_evaluation_insurance} 
              order_evaluation_insurance_info{id}
              order{id evaluation_evaluation}`]
})
let evaluation_insurance_evaluation_insurance = order_info?.order_evaluation_insurance[0]?.evaluation_insurance_evaluation_insurance

//2.查询/更新测评机构档位信息
const [evaluation_insurance] = ezcloud.query({
    name: `evaluation_insurance`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload.evaluation_insurance_pk },

        },
    },
    fields: ["id name description label_name price is_input"]
})
//更新送评档位信息
let order_evaluation_insurance_pk = ezcloud.mutation({
    name: `update_order_evaluation_insurance`,
    args: {
        where: {
            order_info_order_info: { _eq: payload.order_info_pk }
        },
        _set: {
            name: evaluation_insurance?.name,
            description: evaluation_insurance?.description,
            label_name: evaluation_insurance?.label_name,
            price: evaluation_insurance?.price,
            is_input: evaluation_insurance?.is_input,
            evaluation_insurance_evaluation_insurance: evaluation_insurance?.id
        }
    },
    fields: ["returning{id}"]
})?.returning[0];
if (evaluation_insurance_evaluation_insurance != evaluation_insurance.id) {
    //新选择档位与之前选择档位不一致，删除之前的选项
    ezcloud.mutation({
        name: `delete_order_evaluation_insurance_info`,
        args: {
            where: {
                order_info_order_info: { _eq: payload.order_info_pk }
            },
        },
        fields: ["returning{id}"]
    });
    //新选择档位与之前选择档位不一致，删除之前的订单支付组成明细
    ezcloud.mutation({
        name: `delete_order_info_paydetail`,
        args: {
            where: {
                order_info_order_info: { _eq: payload.order_info_pk },
                type: { _eq: "入账明细" }
            },
        },
        fields: ["returning{id}"]
    });
}
if (!order_evaluation_insurance_pk) {
    //无送评机构档位，添加送评机构档位
    order_evaluation_insurance_pk = ezcloud.mutation({
        name: `insert_order_evaluation_insurance_one`,
        args: {
            object: {
                name: evaluation_insurance.name,
                description: evaluation_insurance.description,
                label_name: evaluation_insurance.label_name,
                price: evaluation_insurance.price,
                is_input: evaluation_insurance.is_input,
                order_info_order_info: payload.order_info_pk,
                evaluation_insurance_evaluation_insurance: evaluation_insurance.id
            },
        },
        fields: ["id"]
    });

}

//添加档位金额记录
if (order_evaluation_insurance_pk) {
    //更新档位记录
    let evaluation_insurance_info_paydetail = update_order_info_paydetail(payload.order_info_pk, "入账明细_档位金额", evaluation_insurance.price * payload?.num)

    if (!evaluation_insurance_info_paydetail?.id) {
        //添加档位记录
        evaluation_insurance_info_paydetail = inc_order_info_paydetail(payload.order_info_pk, "入账明细_档位金额", evaluation_insurance.price * payload?.num)

    }

}


//3.查询送评订单档位选项

//查询送评机构档位速度选项
const [speed] = qr_evaluation_insurance_info(payload.speed_pk)

//  查询送评机构档位签字选项
const [sign] = qr_evaluation_insurance_info(payload.sign_pk)

//  查询送评机构档位尺寸选项
const [size] = qr_evaluation_insurance_info(payload.size_pk)

//  查询送评机构档位验品服务
const [inspection_service] = qr_evaluation_insurance_info(payload.inspection_service_pk)

//4.更新或添加送评订单档位选项

//送评机构档位速度选项
if (payload.speed_pk != -1) {
    let order_speed = update_order_evaluation_insurance_info(payload.order_info_pk, "速度选项", speed?.name, speed?.description, speed?.type, speed?.cover?.id, speed?.price, speed?.id)

    if (!order_speed?.id) {
        order_speed = inc_order_evaluation_insurance_info(speed?.name, speed?.description, speed?.type, speed?.cover?.id, speed.price, speed?.id, payload.order_info_pk)
    }

    //获取速度选项总金额
    let total_inc_amount = order_speed.price * payload.num
    let deal_type = "入账明细_" + speed.type

    //添加日志记录
    let order_paydetail_speed = update_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)
    if (!order_paydetail_speed?.id) {

        //无订单送评机构档位速度选项,添加速度选项记录
        order_paydetail_speed = inc_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)
    }
} else {
    //-1，删除之前的速度选项
    del_order_evaluation_insurance_info(payload.order_info_pk, "速度选项")

    //删除之前的速度选项的订单支付组成明细
    del_order_info_paydetail(payload.order_info_pk, "入账明细_速度选项")

}

//送评机构档位签字选项
if (payload.sign_pk != -1) {
    let order_sign = update_order_evaluation_insurance_info(payload.order_info_pk, "签字选项", sign?.name, sign?.description, sign?.type, sign?.cover?.id, sign?.price, sign?.id)

    if (!order_sign?.id) {
        order_sign = inc_order_evaluation_insurance_info(sign?.name, sign?.description, sign?.type, sign?.cover?.id, sign?.price, sign?.id, payload.order_info_pk)
    }
    //获取签字选项总金额
    let total_inc_amount = order_sign.price * payload.num
    let deal_type = "入账明细_" + sign.type

    //添加日志记录
    let order_paydetail_sign = update_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)
    if (!order_paydetail_sign?.id) {
        //无订单送评机构档位速度选项,添加速度选项记录
        order_paydetail_sign = inc_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)
    }
} else {
    //-1，删除之前的签字选项
    del_order_evaluation_insurance_info(payload.order_info_pk, "签字选项")

    //删除之前的签字选项的订单支付组成明细
    del_order_info_paydetail(payload.order_info_pk, "入账明细_签字选项")

}

//送评机构档位尺寸选项
if (payload.size_pk != -1) {
    let order_size = update_order_evaluation_insurance_info(payload.order_info_pk, "尺寸选项", size?.name, size?.description, size?.type, size?.cover?.id, size?.price, size?.id)

    if (!order_size?.id) {
        order_size = inc_order_evaluation_insurance_info(size?.name, size?.description, size?.type, size?.cover?.id, size?.price, size?.id, payload.order_info_pk)
    }

    //获取尺寸选项总金额
    let total_inc_amount = order_size.price * payload.num
    let deal_type = "入账明细_" + size.type

    //添加日志记录
    let order_paydetail_size = update_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)
    if (!order_paydetail_size?.id) {
        //无订单送评机构档位尺寸选项,添加尺寸选项记录
        order_paydetail_size = inc_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)
    }
} else {
    //-1，删除之前的尺寸选项
    del_order_evaluation_insurance_info(payload.order_info_pk, "尺寸选项")
    //删除之前的尺寸选项的订单支付组成明细
    del_order_info_paydetail(payload.order_info_pk, "入账明细_尺寸选项")

}

//送评机构档位验品服务
if (payload.inspection_service_pk != -1) {
    let order_inspection_service = update_order_evaluation_insurance_info(payload.order_info_pk, "验品服务", inspection_service?.name, inspection_service?.description, inspection_service?.type, inspection_service?.cover?.id, inspection_service?.price, inspection_service?.id)

    if (!order_inspection_service?.id) {
        order_inspection_service = inc_order_evaluation_insurance_info(inspection_service?.name, inspection_service?.description, inspection_service?.type, inspection_service?.cover?.id, inspection_service?.price, inspection_service?.id, payload.order_info_pk)

    }

    //获取验品服务总金额
    let total_inc_amount = order_inspection_service.price * payload.num
    let deal_type = "入账明细_" + inspection_service.type

    //添加日志记录
    let order_paydetail_inspection_service = update_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)

    if (!order_paydetail_inspection_service?.id) {
        //无订单送评机构档位验品服务,添加验品服务记录
        order_paydetail_inspection_service = inc_order_info_paydetail(payload.order_info_pk, deal_type, total_inc_amount)
    }
} else {
    //-1，删除之前的验品服务
    del_order_evaluation_insurance_info(payload.order_info_pk, "验品服务")
    //删除之前的验品服务的订单支付组成明细
    del_order_info_paydetail(payload.order_info_pk, "入账明细_验品服务")
}

//4.遍历订单数据

//4.1多送优惠（数量优惠，当满足一定数量则打几折）
if (payload?.num > 0) {
    //查询送评机构数量优惠满足等级
    const [evaluation_privilege] = ezcloud.query({
        name: `evaluation_privilege`,
        args: {
            limit: 1,
            where: {
                evaluation_evaluation: { _eq: order_info?.order?.evaluation_evaluation },
                num_limit: { _lte: payload?.num }
            },
            order_by: { num_limit: () => "desc_nulls_last" },
        },
        fields: [`id num_limit num_discount description`]
    })

    //可以优惠金额

    if (!!evaluation_privilege) {
        //计算优惠金额
        let card_amount = (speed.price + sign.price + size.price + inspection_service.price + evaluation_insurance.price) * payload?.num
        let card_discount_amount = Math.round(card_amount * evaluation_privilege.num_discount) - card_amount
        let evaluation_privilege_info_paydetail = update_order_info_paydetail(payload.order_info_pk, "优惠明细_多送优惠", card_discount_amount)

        if (!evaluation_privilege_info_paydetail?.id) {
            //添加档位记录
            evaluation_privilege_info_paydetail = ezcloud.mutation({
                name: `insert_order_info_paydetail_one`,
                args: {
                    object: {
                        type: "优惠明细",
                        inc_amount: card_discount_amount,
                        deal_type: "优惠明细_多送优惠",
                        describe: "优惠明细_多送优惠",
                        order_info_order_info: payload.order_info_pk
                    },
                },
                fields: ["id inc_amount"]
            });
        }
    } else {
        //删除多送优惠明细
        del_order_info_paydetail(payload.order_info_pk, "优惠明细_多送优惠")
    }
}


//包装以及拆壳费用计算
if (payload?.status == "待付款") {

    let packing_amount = payload?.num * 100
    let unpacking_amount = payload?.num * 500

    //添加拆壳费用以及包装费用
    let order_paydetail_packing = update_order_info_paydetail(payload.order_info_pk, "入账明细_包装费用", packing_amount)
    let order_paydetail_unpacking = update_order_info_paydetail(payload.order_info_pk, "入账明细_拆壳费用", unpacking_amount)

    if (!order_paydetail_packing?.id) {
        //无订单送评机构档位验品服务,添加验品服务记录
        order_paydetail_packing = inc_order_info_paydetail(payload.order_info_pk, "入账明细_包装费用", packing_amount)
    }
    if (!order_paydetail_unpacking?.id) {
        //无订单送评机构档位验品服务,添加验品服务记录
        order_paydetail_unpacking = inc_order_info_paydetail(payload.order_info_pk, "入账明细_拆壳费用", unpacking_amount)
    }
}


//4.2投保金额
let insure_amount = parseInt(payload?.insure_fee / 20) || 0

//添加投保金额记录
if (insure_amount <= 0) {

    //无投保金额,删除投保金额记录
    del_order_info_paydetail(payload.order_info_pk, "入账明细_追加投保金额")

} else {

    //有投保金额,添加/更新投保金额记录
    let insure_amount_info_paydetail = update_order_info_paydetail(payload.order_info_pk, "入账明细_追加投保金额", insure_amount)
    if (!insure_amount_info_paydetail?.id) {
        //添加投保金额
        insure_amount_info_paydetail = inc_order_info_paydetail(payload.order_info_pk, "入账明细_追加投保金额", insure_amount)
    }
}


//4.3订单支付组成明细
let total_price_List = order_info_paydetail_list(payload.order_info_pk, "入账明细")

//4.4运费组成明细
let deliver_fee_List = order_info_paydetail_list(payload.order_info_pk, "运费明细")

//4.5优惠组成明细
let discount_amount_List = order_info_paydetail_list(payload.order_info_pk, "优惠明细")


//总支付金额
let total_price = total_price_List.reduce((accumulator, order_info_paydetail) => {
    return accumulator + order_info_paydetail.inc_amount;
}, 0);
//运费金额
let deliver_fee = deliver_fee_List.reduce((accumulator, order_info_paydetail) => {
    return accumulator + order_info_paydetail.inc_amount;
}, 0);

//总优惠金额
let discount_amount = discount_amount_List.reduce((accumulator, order_info_paydetail) => {
    return accumulator + order_info_paydetail.inc_amount;
}, 0);


//实际支付金额
let pay_amount = total_price + deliver_fee + discount_amount

//5.更新用户订单数据

const order_info_tem = ezcloud.mutation({
    name: `update_order_info`,
    args: {
        where: {
            id: { _eq: payload.order_info_pk }
        },
        _set: {
            pay_amount: pay_amount,
            total_price: total_price,
            deliver_fee: deliver_fee,
            discount_amount: discount_amount,
            num: payload.num,
            delivery_name: payload?.delivery_name || "顺丰快递",
            delivery_number: payload?.delivery_number || null,
            process_status: payload?.status === '待付款' || payload?.status === '已提交' ? '已提交' : '待下单',
            evaluation_notes: payload?.evaluation_notes,
            insure_fee: payload?.insure_fee || null,
            insure_amount: insure_amount || null,
        }
    },
    fields: ["returning{id}"]
});

//查询送评订单档位选项
function qr_evaluation_insurance_info(id) {
    let [evaluation_insurance_info] = ezcloud.query({
        name: `evaluation_insurance_info`,
        args: {
            limit: 1,
            where: {
                id: { _eq: id },

            },
        },
        fields: ["id type name cover{id url} price description"]
    });

    return [evaluation_insurance_info]
}

//更新送评订单选项记录
function update_order_evaluation_insurance_info(order_info_pk, type, name, description, type, cover_id, price, id) {
    let order_evaluation_insurance_info = ezcloud.mutation({
        name: `update_order_evaluation_insurance_info`,
        args: {
            where: {
                order_info_order_info: { _eq: order_info_pk },
                type: { _eq: type }
            },
            _set: {
                name: name,
                description: description,
                type: type,
                cover_id: cover_id,
                price: price,
                evaluation_insurance_info_evaluation_insurance_info: id
            }
        },
        fields: ["returning{id price}"]
    })?.returning[0];

    return order_evaluation_insurance_info
}

//添加送评订单选项记录
function inc_order_evaluation_insurance_info(name, description, type, cover_id, price, id, order_info_pk) {
    let order_evaluation_insurance_info = ezcloud.mutation({
        name: `insert_order_evaluation_insurance_info_one`,
        args: {
            object: {
                name: name,
                description: description,
                type: type,
                cover_id: cover_id,
                price: price,
                evaluation_insurance_info_evaluation_insurance_info: id,
                order_info_order_info: order_info_pk
            },
        },
        fields: ["id price"]
    });

    return order_evaluation_insurance_info
}

//删除送评订单选项记录
function del_order_evaluation_insurance_info(id, type) {
    let order_evaluation_insurance_info = ezcloud.mutation({
        name: `delete_order_evaluation_insurance_info`,
        args: {
            where: {
                order_info_order_info: { _eq: id },
                type: { _eq: type }
            },
        },
        fields: ["returning{id}"]
    });

    return order_evaluation_insurance_info
}
//删除订单入账明细记录
function del_order_info_paydetail(id, deal_type) {
    let order_info_paydetail = ezcloud.mutation({
        name: `delete_order_info_paydetail`,
        args: {
            where: {
                order_info_order_info: { _eq: id },
                deal_type: { _eq: deal_type }
            },
        },
        fields: ["returning{id}"]
    });

    return order_info_paydetail
}

//更新订单入账明细记录
function update_order_info_paydetail(order_info_pk, deal_type, inc_amount) {
    let order_info_paydetail = ezcloud.mutation({
        name: `update_order_info_paydetail`,
        args: {
            where: {
                order_info_order_info: { _eq: payload.order_info_pk },
                deal_type: { _eq: deal_type }
            },
            _set: {
                inc_amount: inc_amount,
            }
        },
        fields: ["returning{id inc_amount}"]
    })?.returning[0];

    return order_info_paydetail
}

//添加订单入账明细记录
function inc_order_info_paydetail(order_info_pk, deal_type, inc_amount) {
    let order_paydetail_speed = ezcloud.mutation({
        name: `insert_order_info_paydetail_one`,
        args: {
            object: {
                type: "入账明细",
                inc_amount: inc_amount,
                deal_type: deal_type,
                describe: deal_type,
                order_info_order_info: order_info_pk
            },
        },
        fields: ["id inc_amount"]
    });

    return order_paydetail_speed
}

//查询总明细记录
function order_info_paydetail_list(order_info_pk, type) {
    let order_info_paydetail_List = ezcloud.query({
        name: `order_info_paydetail`,
        args: {
            where: {
                order_info_order_info: { _eq: order_info_pk },
                type: { _eq: type }
            },
        },
        fields: ["id inc_amount"]
    })

    return order_info_paydetail_List
}

return order_info_tem.returning[0]