// @ts-nocheck
// AccessValidator.js  
/**
 * @description: AccessValidator.js
 * @author: 钟
 * @date: 2022-08-18 14:36:27
 * @version: V1.0.0
 * {
    "scf_dir": "/",
    "scf_name": "AccessValidator",
    "payload": {
        "per": [
            { "name": "RBAC_角色设置菜单和权限", "type": "API" },
            { "name": "user表", "type": "DB", "operate": "create" },
            { "name": "user表", "type": "DB", "operate": "read" },
            { "name": "user表", "type": "DB", "operate": "update" },
            { "name": "user表", "type": "DB", "operate": "delete" }
        ],
        "role": ["admin", "user"]
    },
    "clientinfo": {
        "token": ""
    }
}
 */
// 此文件包含了一系列用于验证用户访问权限的函数，包括数据库访问和API接口访问的验证。  
const { success, fail, callScf, genJwtToken, parseJwtToken, query, getRequest } = ezcloud;
const payload = ezcloud.getPayload();
const clientinfo = ezcloud.getClientinfo();
//获取用户token信息
const userInfo = (() => {
    try {
        return parseJwtToken(clientinfo?.token ?? '', "manager");
    } catch (error) {
        throw fail("用户未登录", 101, getRequest());
    }
})();
//获取用户权限和角色
const { per = [], role = [] } = payload;
per.forEach(item => (typeof item === 'string' ? item = { name: item } : item)); //将字符串转换为对象
//1.查询上方所有权限是否在用户角色中
const response = ezcloud.operate({
    opMethod: `query`,
    opName: "accessValidator",
    opFields: [{
        name: "per",
        args: {
            limit: per.length,
            where: {
                name: { _in: per.map(item => item?.name ?? '') },
                is_active: { _eq: true },
                role_per: { role: { manager_role: { manager_manager: { _eq: userInfo?.id ?? 0 } } } }
            },
        },
        fields: ["id", "name", "type", "is_active", "describe", "is_create_active", "is_read_active", "is_update_active", "is_delete_active"],
        onInited: ({ gql, viriables }) => { }
    }, {
        name: "role",
        args: {
            limit: role.length,
            where: {
                name: { _in: role.map(item => (typeof item === 'string' ? item : item?.name ?? '')) },
                is_active: { _eq: true },
                manager_role: { manager_manager: { _eq: userInfo?.id ?? 0 } }
            },
        },
        fields: ["id", "name", "describe", "is_active"],
        onInited: ({ gql, viriables }) => { }
    }],
    variables: {},// 变量数据
    onInited: ({ gql, viriables }) => { }
})?.response ?? {};
//2.进行判断判断是否有权限
const hasAccess = {
    per: per.map(item => {
        return {
            hasAccess: response.per.some(per => {
                // 基本名称和类型检查  
                if (per.name !== item.name || (item?.type ?? 'API') !== per.type) return false;
                // 如果不是DB类型，则直接返回true，因为其他类型不需要进一步的操作检查  
                if (per.type !== 'DB') return true;
                // 检查具体的操作权限  
                const operationProperty = `is_${(item?.operate ?? 'unknown')}_active`;
                if (per[operationProperty]) return true;
                return false;
            }),
            per: item
        }
    }),
    role: role.map(item => {
        return {
            hasAccess: response.role.some(role => role.name === item),
            role: item
        }
    })
};
// 获取用户角色，用户访问的权限
return success(hasAccess)