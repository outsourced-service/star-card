// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();


//payload入参示例
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MiwiZXhwaXJlc19pbiI6MTczODgyOTc4NTY0OX0=.WpPWnBbaOuAz0I/emlKiZ/Dmqe/g4HGvIPKJynEmAKU=",
//     "evaluation_pk": 1
// }


//获取用户token信息
const userInfo = parseJwtToken(payload.token)
const TIME = new Date().getTime();
const sevenDaysLater = TIME + 604800000;
if (!userInfo?.id) {
    return fail("未查询到用户,请传入正确的token", -1, getRequest());
}
if (!payload.evaluation_pk) {
    return fail("请传入evaluation_pk", -1, getRequest());
}
// 1.查询机构信息
const [evaluation] = ezcloud.query({
    name: `evaluation`,
    args: {
        limit: 1,
        where: {
            id: { _eq: payload.evaluation_pk }
        },
    },
    fields: ["id name exp_time order_title"]
})
if (!evaluation?.id) {
    return fail("未查寻到机构", -1, getRequest());
}
// 2.查询订单批次
const [order_tmp] = ezcloud.query({
    name: `order`,
    args: {
        limit: 1,
        where: {
            evaluation_evaluation: { _eq: payload.evaluation_pk },
            mode: { _eq: "送评订单" },
            title: { _eq: evaluation.order_title },
            exp_time: { _eq: evaluation.exp_time }
        },
    },
    fields: ["id"]
})
let order_pk = order_tmp?.id

if (!order_tmp?.id) {
    //订单批次为空，新增批次
    const order_more = ezcloud.mutation({
        name: "insert_order_one",
        args: {
            object: {
                mode: "送评订单",
                title: evaluation.order_title,
                exp_time: evaluation.exp_time,
                evaluation_name: evaluation.name,
                evaluation_evaluation: evaluation.id
            },
        },
        fields: [" id"]
    })
    order_pk = order_more.id
}

//1.查询是否默认地址
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


let order_number = generateOrderId("", 0, 3)//定义订单编号

// 2.订单生成下单
const order_info = ezcloud.mutation({
    name: `insert_order_info_one`,
    args: {
        object: {
            order_id: order_number,
            order_info_id: order_number,
            order_time: TIME,
            estimate_time: sevenDaysLater,
            come_from: "送评下单",
            num: 0,
            delivery_name: "顺丰快递",
            is_supplementary_payment: false,
            is_select: false,
            is_deleted: false,
            is_tips: false,
            stock_status: "库存锁定",
            coupon_status: "优惠券锁定",
            user_user: userInfo.id,
            order_order: order_pk,
            text_status: "订单创建，待用户寄出",
            process_status: "待下单",
            status: "未入库",
            order_progress: {
                data: [
                    {
                        type: "待下单->待寄出",
                        title: "订单创建，待用户寄出",
                        confirm_time: TIME,
                        status: "进行中"
                    },
                    {
                        type: "待寄出->已寄出",
                        title: "用户已寄出",
                        status: "待开始"
                    },
                    {
                        type: "已寄出->已签收",
                        title: "订单创建，待用户寄出",
                        status: "待开始"
                    },
                    {
                        type: "已签收->订单准备中",
                        title: "已拆包入库，订单准备中",
                        status: "待开始"
                    },
                    {
                        type: "订单准备中->待发车",
                        title: "已完成验品,待发车",
                        status: "待开始"
                    },
                    {
                        type: "待发车->已发车",
                        title: "已发车, 待抵达评级机构",
                        content: "一般将在2-5天内抵达",
                        status: "待开始"
                    },
                    {
                        type: "已发车->抵达机构",
                        title: "抵达机构 Arrived",
                        status: "待开始"
                    },
                    {
                        type: "抵达机构->信息核对中",
                        title: "信息核对中 Research&ID",
                        status: "待开始"
                    },
                    {
                        type: "信息核对中->评分中",
                        title: "评分中 Grading",
                        status: "待开始"
                    },
                    {
                        type: "评分中->封装中",
                        title: "封装中 Assembly",
                        status: "待开始"
                    },
                    {
                        type: "封装中->已出分",
                        title: "已出分, 待机构寄回 Shipping",
                        status: "待开始"
                    },
                    {
                        type: "已出分->机构已寄出",
                        title: "机构已寄出 Shipped",
                        content: "一般将在5-10天内抵达",
                        status: "待开始"
                    },
                    {
                        type: "机构已寄出->打包中",
                        title: "抵达星卡仓库, 打包中",
                        content: "我们将尽量在1-3工作日内发出",
                        status: "待开始"
                    },
                    {
                        type: "打包中->已寄回",
                        title: "已寄回玩家",
                        status: "待开始"
                    },
                    {
                        type: "已寄回->已完成",
                        title: "玩家已签收，订单完成",
                        status: "待开始"
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


