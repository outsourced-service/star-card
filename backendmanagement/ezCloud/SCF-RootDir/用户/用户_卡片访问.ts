// @ts-nocheck
const { success, callScf, genJwtToken, parseJwtToken, getRequest, mutation, query, fail } = ezcloud;
const payload = ezcloud.getPayload();
//payload入参示例
//name值="收藏"、"分享"、"浏览"

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbCI6InVzZXIiLCJpZCI6MiwiZXhwaXJlc19pbiI6MTczODgyOTc4NTY0OX0=.WpPWnBbaOuAz0I/emlKiZ/Dmqe/g4HGvIPKJynEmAKU=",
//     "type": "访问用户",
//     "name": "收藏",
//     "order_scoring_annex_pk": 1,
//     "user_card_pk": 1,
//     "user_cardcabinet_pk": 1,
//     "
// 
//  ": 1
// }

//验证用户token信息
const userInfo = parseJwtToken(payload.token)
const TIME = new Date().getTime();
if (!userInfo?.id) {
    return fail("未查询到用户,请传入正确的token", -1, getRequest());
}

//返回值id
let user_visit_item = {}
if (payload.type == "访问评级卡信息") {
    //查询访问评级卡信息
    let user_visit_list = qr_user_visit(payload.type, userInfo?.id, payload.order_scoring_annex_pk)

    if (!user_visit_list?.id) {
        //添加访问评级卡信息
        let user_visit_tem = inc_user_visit(payload.type, userInfo?.id, true, 0, 1, TIME, payload.order_scoring_annex_pk)
        user_visit_item = user_visit_tem

    } else {
        //分享次数计算
        let share_times = payload?.name === '分享' ? ++user_visit_list.share_times : user_visit_list.share_times
        let is_collect = payload?.name === '收藏' ? !user_visit_list.is_collect : user_visit_list.is_collect
        let visit_times = payload?.name === '浏览' ? ++user_visit_list.visit_times : user_visit_list.visit_times
        let last_visit_time = payload?.name === '浏览' ? TIME : user_visit_list.last_visit_time

        //更新访问评级卡信息
        let user_visit_tem = update_user_visit(payload.type, userInfo?.id, is_collect, share_times, visit_times, TIME, payload.order_scoring_annex_pk)
        user_visit_item = user_visit_tem
    }

} else if (payload.type == "访问卡柜") {
    //查询访问卡柜
    let user_visit_list = qr_user_visit_cardcabinet(payload.type, userInfo?.id, payload.user_cardcabinet_pk)

    if (!user_visit_list?.id) {
        //添加访问卡柜
        let user_visit_tem = inc_user_visit_cardcabinet(payload.type, userInfo?.id, true, 0, 1, TIME, payload.user_cardcabinet_pk)
        user_visit_item = user_visit_tem

    } else {
        //分享次数计算
        let share_times = payload?.name === '分享' ? ++user_visit_list.share_times : user_visit_list.share_times
        let is_collect = payload?.name === '收藏' ? !user_visit_list.is_collect : user_visit_list.is_collect
        let visit_times = payload?.name === '浏览' ? ++user_visit_list.visit_times : user_visit_list.visit_times
        let last_visit_time = payload?.name === '浏览' ? TIME : user_visit_list.last_visit_time

        //更新访问卡柜
        let user_visit_tem = update_user_visit_cardcabinet(payload.type, userInfo?.id, is_collect, share_times, visit_times, TIME, payload.user_cardcabinet_pk)
        user_visit_item = user_visit_tem

    }

} else if (payload.type == "访问卡片") {
    //查询访问卡片
    let user_visit_list = qr_user_visit_card(payload.type, userInfo?.id, payload.user_card_pk)

    if (!user_visit_list?.id) {
        //添加访问卡片
        let user_visit_tem = inc_user_visit_card(payload.type, userInfo?.id, true, 0, 1, TIME, payload.user_card_pk)
        user_visit_item = user_visit_tem

    } else {
        //分享次数计算
        let share_times = payload?.name === '分享' ? ++user_visit_list.share_times : user_visit_list.share_times
        let is_collect = payload?.name === '收藏' ? !user_visit_list.is_collect : user_visit_list.is_collect
        let visit_times = payload?.name === '浏览' ? ++user_visit_list.visit_times : user_visit_list.visit_times
        let last_visit_time = payload?.name === '浏览' ? TIME : user_visit_list.last_visit_time

        //更新访问卡片
        let user_visit_tem = update_user_visit_card(payload.type, userInfo?.id, is_collect, share_times, visit_times, TIME, payload.user_card_pk)
        user_visit_item = user_visit_tem

    }

} else if (payload.type == "访问用户") {
    //查询访问用户
    let user_visit_list = qr_user_visit_user(payload.type, userInfo?.id, payload.user_visited_pk)

    if (!user_visit_list?.id) {
        //添加访问用户
        let user_visit_tem = inc_user_visit_user(payload.type, userInfo?.id, true, 0, 1, TIME, payload.user_visited_pk, TIME)
        user_visit_item = user_visit_tem

    } else {
        //分享次数计算
        let share_times = payload?.name === '分享' ? ++user_visit_list.share_times : user_visit_list.share_times
        let is_collect = payload?.name === '收藏' ? !user_visit_list.is_collect : user_visit_list.is_collect
        let visit_times = payload?.name === '浏览' ? ++user_visit_list.visit_times : user_visit_list.visit_times
        let last_visit_time = payload?.name === '浏览' ? TIME : user_visit_list.last_visit_time
        let start_visit_time = payload?.name === '浏览' ? user_visit_list.start_visit_time : user_visit_list.last_visit_time

        //更新访问用户
        let user_visit_tem = update_user_visit_user(payload.type, userInfo?.id, is_collect, share_times, visit_times, TIME, payload.user_visited_pk, start_visit_time)
        user_visit_item = user_visit_tem

    }

}

//查询评级卡信息访问记录
function qr_user_visit(type, user_id, order_scoring_annex_pk) {
    let [user_visit] = ezcloud.query({
        name: `user_visit`,
        args: {
            limit: 1,
            where: {
                user_user: { _eq: user_id },
                type: { _eq: type },
                order_scoring_annex_order_scoring_annex: { _eq: order_scoring_annex_pk }
            },
        },
        fields: ["id type is_collect share_times visit_times last_visit_time"]
    });

    return user_visit
}

//更新评级卡信息访问记录
function update_user_visit(type, user_id, is_collect, share_times, visit_times, last_visit_time, order_scoring_annex_pk) {
    let user_visit = ezcloud.mutation({
        name: `update_user_visit`,
        args: {
            where: {
                _and: [
                    { user_user: { _eq: user_id } },
                    { type: { _eq: type } },
                    { order_scoring_annex_order_scoring_annex: { _eq: order_scoring_annex_pk } }
                ]
            },
            _set: {
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time

            }
        },
        fields: ["returning{id}"]
    });

    return user_visit
}

//添加评级卡信息访问记录
function inc_user_visit(type, user_id, is_collect, share_times, visit_times, last_visit_time, order_scoring_annex_pk) {
    let user_visit = ezcloud.mutation({
        name: `insert_user_visit_one`,
        args: {
            object: {
                type: type,
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time,
                order_scoring_annex_order_scoring_annex: order_scoring_annex_pk,
                user_user: user_id
            },
        },
        fields: ["id"]
    });

    return user_visit
}
//查询访问卡柜记录
function qr_user_visit_cardcabinet(type, user_id, user_cardcabinet_pk) {
    let [user_visit] = ezcloud.query({
        name: `user_visit`,
        args: {
            limit: 1,
            where: {
                user_user: { _eq: user_id },
                type: { _eq: type },
                user_cardcabinet_user_cardcabinet: { _eq: user_cardcabinet_pk }
            },
        },
        fields: ["id type is_collect share_times visit_times last_visit_time"]
    });

    return user_visit
}

//更新访问卡柜记录
function update_user_visit_cardcabinet(type, user_id, is_collect, share_times, visit_times, last_visit_time, user_cardcabinet_pk) {
    let user_visit = ezcloud.mutation({
        name: `update_user_visit`,
        args: {
            where: {
                _and: [
                    { user_user: { _eq: user_id } },
                    { type: { _eq: type } },
                    { user_cardcabinet_user_cardcabinet: { _eq: user_cardcabinet_pk } }
                ]
            },
            _set: {
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time

            }
        },
        fields: ["returning{id}"]
    });

    return user_visit
}

//添加访问卡柜记录
function inc_user_visit_cardcabinet(type, user_id, is_collect, share_times, visit_times, last_visit_time, user_cardcabinet_pk) {
    let user_visit = ezcloud.mutation({
        name: `insert_user_visit_one`,
        args: {
            object: {
                type: type,
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time,
                user_cardcabinet_user_cardcabinet: user_cardcabinet_pk,
                user_user: user_id
            },
        },
        fields: ["id"]
    });

    return user_visit
}
//查询访问卡片记录
function qr_user_visit_card(type, user_id, user_card_pk) {
    let [user_visit] = ezcloud.query({
        name: `user_visit`,
        args: {
            limit: 1,
            where: {
                user_user: { _eq: user_id },
                type: { _eq: type },
                user_card_user_card: { _eq: user_card_pk }
            },
        },
        fields: ["id type is_collect share_times visit_times last_visit_time"]
    });

    return user_visit
}

//更新访问卡片记录
function update_user_visit_card(type, user_id, is_collect, share_times, visit_times, last_visit_time, user_card_pk) {
    let user_visit = ezcloud.mutation({
        name: `update_user_visit`,
        args: {
            where: {
                _and: [
                    { user_user: { _eq: user_id } },
                    { type: { _eq: type } },
                    { user_card_user_card: { _eq: user_card_pk } }
                ]
            },
            _set: {
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time

            }
        },
        fields: ["returning{id}"]
    });

    return user_visit
}

//添加访问卡片记录
function inc_user_visit_card(type, user_id, is_collect, share_times, visit_times, last_visit_time, user_card_pk) {
    let user_visit = ezcloud.mutation({
        name: `insert_user_visit_one`,
        args: {
            object: {
                type: type,
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time,
                user_card_user_card: user_card_pk,
                user_user: user_id
            },
        },
        fields: ["id"]
    });

    return user_visit
}
//查询访问用户记录
function qr_user_visit_user(type, user_id, user_visited_pk) {
    let [user_visit] = ezcloud.query({
        name: `user_visit`,
        args: {
            limit: 1,
            where: {
                user_user: { _eq: user_id },
                type: { _eq: type },
                user_visited_user: { _eq: user_visited_pk }
            },
        },
        fields: ["id type is_collect share_times visit_times last_visit_time start_visit_time"]
    });

    return user_visit
}

//更新访问用户记录
function update_user_visit_user(type, user_id, is_collect, share_times, visit_times, last_visit_time, user_visited_pk, start_visit_time) {
    let user_visit = ezcloud.mutation({
        name: `update_user_visit`,
        args: {
            where: {
                _and: [
                    { user_user: { _eq: user_id } },
                    { type: { _eq: type } },
                    { user_visited_user: { _eq: user_visited_pk } }
                ]
            },
            _set: {
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time,
                start_visit_time: start_visit_time

            }
        },
        fields: ["returning{id}"]
    });

    return user_visit
}

//添加访问用户记录
function inc_user_visit_user(type, user_id, is_collect, share_times, visit_times, last_visit_time, user_visited_pk, start_visit_time) {
    let user_visit = ezcloud.mutation({
        name: `insert_user_visit_one`,
        args: {
            object: {
                type: type,
                is_collect: is_collect,
                share_times: share_times,
                visit_times: visit_times,
                last_visit_time: last_visit_time,
                user_visited_user: user_visited_pk,
                user_user: user_id,
                start_visit_time: start_visit_time
            },
        },
        fields: ["id"]
    });

    return user_visit
}


return user_visit_item