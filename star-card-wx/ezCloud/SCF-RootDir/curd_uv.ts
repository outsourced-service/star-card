// @ts-nocheck
const { getPayload, queryGetFirstOne, mutation, parseJwtToken, getClientinfo } = ezcloud;
const { user_pk } = parseJwtToken(getClientinfo().user_token);

const {
    model = "user", // 访问的表名
    modelID = 1, // 访问的主键ID
    operate = "SWITCH", // SWITCH:开关 COUNT:计数 TIME:时间 VISIT:访问 SET:修改
    keyFields = "is_like", // 操作的字段
    value = null, // 修改的值

    modelMe = "user", // 我所在的表名
    modelMeID = null, // 我所在的主键ID
    _set = {}, // 其他需要修改的字段
    _inc = {}, // 其他需要增加计数的字段
    _ins = {}, // 新增数据初始值
    fields = [], // 查询字段
    relationship = null // 关系表  
} = getPayload();

// 参数校验
if (!model || !modelID) throw new Error("缺少必要参数: model或modelID");
if (!["SWITCH", "COUNT", "TIME", "VISIT", "SET"].includes(operate)) {
    throw new Error("operate参数错误,可选值: SWITCH(开关),COUNT(计数),TIME(时间),VISIT(访问),SET(修改)");
}

const TIME = new Date().getTime();
const MODEL = `${model}_uv`; // UV表名
const RELATIONSHIP = relationship || {
    [`${model}_${model}`]: modelID,
    [`${modelMe}_${modelMe}`]: modelMeID || user_pk,
};
const FIELDS = ["id", ...(Array.isArray(fields) ? fields : [fields]), keyFields];

// 构建新增数据对象
const uv_ins = {
    ..._ins,
    visit_count: 1,
    last_visit_time: TIME,
};
// 查询或新增UV记录
const uv_query = get_uv();
// 根据操作类型更新数据
switch (operate) {
    case 'SWITCH':
        _set[keyFields] = !uv_query[keyFields];
        break;
    case 'COUNT':
        _inc[keyFields] = 1;
        break;
    case 'TIME':
        _set[keyFields] = TIME;
        break;
    case 'VISIT':
        _inc.visit_count = 1;
        _set.last_visit_time = TIME;
        break;
    case 'SET':
        if (value === null) throw new Error("SET操作需要传入value值");
        _set[keyFields] = value;
        break;
    default:
        throw new Error("未知的操作类型");
}

// 更新UV记录
const result = ezcloud.mutation({
    name: `update_${MODEL}_by_pk`,
    args: {
        pk_columns: { id: uv_query.id },
        _set,
        _inc
    },
    fields: FIELDS
});

return ezcloud.success(result);
/**
 * 查询或新增UV记录
 * @returns {Object} UV记录
 */
function get_uv() {
    // 查询现有记录
    const [result] = modelID ? ezcloud.query({
        name: MODEL,
        args: {
            limit: 1,
            where: Object.keys(RELATIONSHIP).reduce((obj, key) => ({
                ...obj,
                [key]: { _eq: RELATIONSHIP[key] }
            }), {})
        },
        fields: FIELDS
    }) : [];

    // 存在则返回,否则新增
    if (result?.id) return result;

    return ezcloud.mutation({
        name: `insert_${MODEL}_one`,
        args: {
            object: {
                ...uv_ins,
                ...RELATIONSHIP
            }
        },
        fields: FIELDS
    });
}
