// @ts-nocheck
const { getPayload, parseJwtToken, getClientinfo, callScf, fail, getRequest } = ezcloud;
const { user_pk } = parseJwtToken(getClientinfo().user_token);

/**
 * 字段枚举值配置
 * 定义不同实体类型的字段可选值和类型校验
 */

const SHARE = {
    status: { // 草稿/已发布
        type: 'string',
        validate: (value) => ['DRAFT', 'PUBLISHED'].includes(value),
        format: (value) => {
            if (value === 'DRAFT') {
                return { status: 'DRAFT' }
            } else if (value === 'PUBLISHED') {
                return {
                    status: "PUBLISHED",
                    release_time: new Date().getTime(),
                }
            }
        },
        fields: ['status'],
        callback: (value) => { }
    },
    is_deleted: [true] // 删除标记
}

const fieldEnums = {
    works: {
        ...SHARE
    },
    service: {
        ...SHARE
    },
    posts: {
        ...SHARE,
        is_show: [true, false], // 显示/隐藏
    },
    reviews: {
        is_show: [true, false], // 显示/隐藏
        is_deleted: [true] // 删除标记
    },
    a_order: {
        time_appointment: {
            type: 'date',
            validate: (value) => {
                try {
                    return !isNaN(new Date(value).getTime());
                } catch (e) {
                    return false;
                }
            },
            transform: (value) => new Date(value).getTime(),
            callback: (order) => { }
        },
        appointment_time: {
            type: 'array<date>',
            validate: (value) => {
                const status = value[0];
                const ends = value[1];
                try {
                    const start = new Date(status);
                    const end = new Date(ends);
                    return !isNaN(start.getTime()) && !isNaN(end.getTime());
                } catch (e) {
                    return false;
                }
            },
            transform: (value) => value.map(v => new Date(v).getTime()),
            format: (value) => ({ appointment_start: value[0], appointment_end: value[1] }),
            fields: ['appointment_start', 'appointment_end'],
            callback: (order) => { }
        }
    }
};

/**
 * 修改指定表的字段值
 * @param {string} model - 表名
 * @param {number} modelID - 主键ID
 * @param {string} field - 要修改的字段
 * @param {any} value - 修改的值
 * @returns {Object} 修改结果
 */
const { model = "", modelID = 0, field = "", value: val = null } = getPayload();
let value = val;
// 参数校验
if (!model || !modelID || !field) {
    return fail(getRequest(), "缺少必要参数: model、modelID和field", 1001);
}

// 检查字段配置
const fieldConfig = fieldEnums[model]?.[field];
if (fieldConfig) {
    // 如果是数组,则为枚举值校验
    if (Array.isArray(fieldConfig)) {
        if (!fieldConfig.includes(value)) {
            return fail(getRequest(), `${field}字段的值必须是: ${fieldConfig.join(', ')}`, 1002);
        }
    }
    // 如果是对象,则为类型校验
    else if (typeof fieldConfig === 'object') {
        if (!fieldConfig.validate(value)) {
            return fail(getRequest(), `${field}字段的值必须是${fieldConfig.type}类型`, 1002);
        }
        value = fieldConfig?.transform?.(value) ?? value;
    }
} else {
    return fail(getRequest(), `字段不存在: ${model}.${field}`, 1002);
}

// 直接修改字段值
const result = ezcloud.mutation({
    name: `update_${model}_by_pk`,
    args: {
        pk_columns: { id: modelID },
        _set: (typeof fieldConfig === 'object' && fieldConfig.format) ? fieldConfig.format(value) : { [field]: value }
    },
    fields: ["id", ...(fieldConfig.fields || [field])]
});

// 如果配置了回调函数,则执行回调
if (fieldConfig.callback && typeof fieldConfig.callback === 'function') {
    fieldConfig.callback(result);
}

// 返回结果
if (!result?.id) return fail(getRequest(), "修改失败", 1003);
return result;
