// @ts-nocheck
const { getPayload, parseJwtToken, getClientinfo, callScf, fail, getRequest, queryGetFirstOne, mutationGetFirstOne } = ezcloud;
const { user_pk } = parseJwtToken(getClientinfo().user_token);
/**
 * 访问者操作配置表
 * 定义不同实体类型(用户/帖子/作品等)的访问操作配置
 */
const visitorConfig = {
    // 用户访问配置
    user: {
        model: "user", // 表名
        pkField: "user_id", // 主键
        defaultField: "is_follow", // 默认操作
        fields: {
            is_follow: { type: "SWITCH", desc: "关注", default: false, isMessage: true },
            is_block: { type: "SWITCH", desc: "拉黑", default: false, isMessage: true },
            visit_count: { type: "VISIT", desc: "访问", default: 1 }
        },
        getFields: [""],
        // 用户关系映射
        relationship: payload => ({
            user_origin_user: payload.user_id, // 被访问用户
            user_user: user_pk // 访问用户
        })
    },
    // 帖子配置
    posts: {
        model: "posts",
        pkField: "posts_pk",
        defaultField: "is_liked",
        getFields: ["posts{photographer{user_user}}"],
        userID: (payload) => payload.posts.photographer.user_user,
        fields: {
            is_liked: { type: "SWITCH", desc: "点赞", default: false, isMessage: true },
            is_favorite: { type: "SWITCH", desc: "收藏", default: false, isMessage: true },
            share_count: { type: "COUNT", desc: "分享", default: 0 },
            visit_count: { type: "VISIT", desc: "访问", default: 1 }
        }
    },
    // 摄影师配置
    photographer: {
        model: "photographer",
        pkField: "photographer_pk",
        defaultField: "is_follow",
        getFields: ["photographer{user_user}"],
        userID: (payload) => payload.photographer.user_user,
        fields: {
            is_liked: { type: "SWITCH", desc: "点赞", default: false, isMessage: true },
            is_favorite: { type: "SWITCH", desc: "收藏", default: false, isMessage: true },
            share_count: { type: "COUNT", desc: "分享", default: 0 },
            visit_count: { type: "VISIT", desc: "访问", default: 1 }
        }
    },
    // 作品配置
    works: {
        model: "works",
        pkField: "works_pk",
        defaultField: "is_liked",
        getFields: ["works{photographer{user_user}}"],
        userID: (payload) => payload.works.photographer.user_user,
        fields: {
            is_liked: { type: "SWITCH", desc: "点赞", default: false, isMessage: true },
            is_favorite: { type: "SWITCH", desc: "收藏", default: false, isMessage: true },
            share_count: { type: "COUNT", desc: "分享", default: 0 },
            visit_count: { type: "VISIT", desc: "访问", default: 1 }
        }
    },
    // 服务配置
    service: {
        model: "service",
        pkField: "service_pk",
        defaultField: "is_liked",
        getFields: ["service{photographer{user_user}}"],
        userID: (payload) => payload.service.photographer.user_user,
        fields: {
            is_liked: { type: "SWITCH", desc: "点赞", default: false, isMessage: true },
            is_favorite: { type: "SWITCH", desc: "收藏", default: false, isMessage: true },
            share_count: { type: "COUNT", desc: "分享", default: 0 },
            visit_count: { type: "VISIT", desc: "访问", default: 1, isBrowseLog: true }
        }
    }
};

/**
 * 处理访问者操作
 * @param {string} type - 访问类型(user/posts/photographer/works/service)
 * @returns {Object} 操作结果
 * @throws {Error} 参数错误或操作失败时抛出
 */
function handleVisitor(type = "") {
    // 获取配置
    const config = visitorConfig[type];
    if (!config) {
        return fail(getRequest(), `无效的type: ${Object.keys(visitorConfig).join(", ")}`, 1001);
    }

    // 获取参数
    const payload = getPayload();
    const pkValue = payload[config.pkField] || 0;
    const field = payload.field || config.defaultField;

    // 校验参数
    if (!pkValue) return fail(getRequest(), `缺少${config.pkField}`, 1002);
    if (!config.fields[field]) {
        return fail(getRequest(), `无效的field: ${Object.entries(config.fields)
            .map(([k, v]) => `${k}(${v.desc})`)
            .join(", ")}`, 1003);
    }

    // 调用UV处理
    const result = callScf({
        scf_dir: "/",
        scf_name: "curd_uv",
        payload: {
            model: config.model,
            modelID: pkValue,
            operate: config.fields[field].type,
            keyFields: field,
            modelMe: "user",
            modelMeID: user_pk,
            fields: config.getFields,
            _ins: Object.fromEntries(
                Object.keys(config.fields).map(k => [k, config.fields[k].default])
            ),
            ...(config.relationship ? { relationship: config.relationship(payload) } : {})
        }
    });

    if (result.code !== 0) return fail(result, result.msg || "操作失败", 1004);

    // 发送消息通知
    if (config.fields[field]?.isMessage && result.data[field]) {
        const messageConfig = {
            is_liked: {
                action_type: 'LIKE',
                title: '收到新的点赞',
                content: '有人点赞了你的内容'
            },
            is_favorite: {
                action_type: type === 'photographer' ? 'FOLLOW' : 'FAVORITE',
                title: type === 'photographer' ? '收到新的关注' : '收到新的收藏',
                content: type === 'photographer' ? '有人关注了你' : '有人收藏了你的内容'
            },
            is_follow: {
                action_type: 'FOLLOW',
                title: '收到新的关注',
                content: '有人关注了你'
            }
        };
        const sendMessage = {
            scf_dir: "/message/",
            scf_name: "sendMessage",
            payload: {
                receiver_id: config.userID(result.data),//被访问用户ID
                message_type: 'SOCIAL',
                action_type: messageConfig[field].action_type,
                content_type: type.toUpperCase(),
                content_id: pkValue,
                title: messageConfig[field].title,
                content: messageConfig[field].content,
                event_data: {
                    user_id: user_pk,
                    content_type: type,
                    content_id: pkValue
                }
            }
        }
        callScf(sendMessage);
    }
    // 记录访问日志
    let BrowseLog = null;
    if (config.fields[field]?.isBrowseLog) {
        const nowTime = new Date(); // 获取当前时间
        const _lt = new Date(nowTime.getFullYear(), nowTime.getMonth() + 1, nowTime.getDate() + 1);
        const _gte = new Date(nowTime.getFullYear(), nowTime.getMonth() + 1, nowTime.getDate());
        BrowseLog = queryGetFirstOne({
            name: "user_browse",
            args: {
                where: {
                    updated_at: {
                        _lt: _lt.getTime(),
                        _gte: _gte.getTime(),
                    },
                    [`${config.model}_${config.model}`]: { _eq: pkValue },
                }
            },
            fields: ["id updated_at ", `${config.model}_${config.model}`]
        })
        if (BrowseLog) {
            BrowseLog = mutationGetFirstOne({
                name: "update_user_browse",
                args: {
                    where: {
                        id: { _eq: BrowseLog.id }
                    },
                    _set: {
                        updated_at: nowTime.getTime(),
                    }
                },
                returning_fields: ["id updated_at ", `${config.model}_${config.model}`]
            })
        } else {
            BrowseLog = mutationGetFirstOne({
                name: "insert_user_browse",
                args: {
                    objects: [{
                        user_user: user_pk,
                        [`${config.model}_${config.model}`]: pkValue,
                    }]
                },
                returning_fields: ["id updated_at ", `${config.model}_${config.model}`]
            })
        }
    }


    const { _stack, ...data } = result.data;
    return {
        ...data,
        ...(BrowseLog ? { browseLog: BrowseLog } : {})
    };
}

/**
 * 统一访问入口
 * 处理用户/帖子/摄影师/作品/服务的访问操作
 * @example
 * visitor() // 关注用户: {type: "user", user_id: 1, field: "is_follow"}
 * visitor() // 点赞帖子: {type: "posts", posts_pk: 1, field: "is_liked"}
 * visitor() // 收藏作品: {type: "works", works_pk: 1, field: "is_favorite"}
 */
return handleVisitor(getPayload().type);