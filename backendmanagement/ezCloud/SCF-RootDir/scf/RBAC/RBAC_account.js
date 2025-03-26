// RBAC_account.js  
// 此文件包含了一系列对用户的操作
const { success, fail, callScf, genJwtToken, parseJwtToken, md5, getRequest } = ezcloud;
const payload = ezcloud.getPayload();
const clientinfo = ezcloud.getClientinfo();
//获取用户token信息
const userInfo = (() => {
    try {
        const userInfo = parseJwtToken(clientinfo?.token ?? '', "manager");
        return getUserInfo(userInfo?.id ?? -1)
    } catch (error) {
        throw fail("用户未登录", 101, getRequest());
    }
})();
//根据操作类型，执行不同的操作
switch (payload.operate) {
    //注册后台用户
    case "register": return register();
    //修改基本信息
    case "update": return update();
    //注销用户
    case "logout": return logout();
    //读取用户信息
    case "reads": return reads();
    //重置用户密码
    case "resetPassword": return resetPassword();
    //重新激活账号
    case "reactivation": return reactivation();
    // 修改当前密码
    case "updatePassword": return updatePassword();
    default:
        return fail("操作类型错误", 102, { payload });
}

//查询用户信息,包含用户角色
function getUserInfo(ID) {
    const [info] = query({
        name: "manager",
        args: {
            limit: 1,
            where: { id: { _eq: ID } },
        },
        fields: ["id password", 'role:manager_role{role{id name}}'],
        onInited: ({ gql, viriables }) => { }
    })
    return {
        ...info,
        role: info.role.map(item => item.role)
    }
}
// 获取用户角色，用户访问的权限
function getAccessValidator() {
    const role = userInfo.role.map(item => item.name);
    if (role.includes['超级管理员']) return true;
    const per = [{ name: model, type: "DB", operate: operate === 'detail' ? 'create' : operate }];
    const response = callScf({
        scf_dir: "/",
        scf_name: "AccessValidator",
        payload: { role, per },
    })
    const isRole = response.data.role.some(item => item.hasAccess); //角色是否拥有权限
    const isPer = response.data.per.some(item => item.hasAccess); //权限是否拥有权限
    return isRole && isPer
}
//注册后台用户
function register() {
    const { username, password, phone, nickname, avatar_id, other = {} } = payload;
    const role_pk = payload?.role_pk ? (Array.isArray(payload?.role_pk) ? payload?.role_pk : [payload?.role_pk]) : null;
    if (!username || !password || !phone || !nickname || role_pk.length == 0) return fail("请填写所有信息后进行注册!", 103, { payload });
    //1.查找用户名是否出现重复是就返回提示
    const response = query({
        name: `manager`,
        args: {
            limit: 1,
            where: { username: { _eq: username } },
        },
        fields: ["id"]
    })
    if (response.length > 0) return fail("用户名已存在，请更换!", 104, { payload });
    const userINFO = ezcloud.mutation({
        name: "insert_user_one",
        args: {
            object: {
                username,
                password: ezcloud.md5(password),
                phone,
                nickname,
                avatar_id,
                is_deleted: false,
                ...(role_pk ? {
                    manager_role: {
                        data: role_pk.map(res => {
                            return { role_role: res }
                        })
                    }
                } : {}),
                ...other
            }
        },
        fields: ["id", "nickname"],
    });
    return ezcloud.success(userINFO, '注册成功')
}
// 注销后台用户
function logout() {
    const response = ezcloud.mutation({
        name: "update_manager_by_pk",
        args: {
            pk_columns: { id: manager_pk },
            _set: { is_deleted: true }
        },
        fields: ["id"],
    });
    return ezcloud.success(response, '注销成功')
}
// 激活已注销用户
function reactivation() {
    const response = ezcloud.mutation({
        name: "update_manager_by_pk",
        args: {
            pk_columns: { id: manager_pk },
            _set: { is_deleted: false }
        },
        fields: ["id"],
    });
    return ezcloud.success(response, '激活成功')
}
// 设置后台用户角色
function setRole(manager_pk = 0, role_pk_list = []) {
    if (!role_pk_list?.length) return fail("用户设置角色失败，至少需要传入一种角色！", 105, { payload });
    const role = query({
        name: `role`,
        args: { where: { id: { _in: role_pk_list } } },
        fields: ["id"]
    })
    if (role?.length < role_pk_list?.length) return fail("传入的角色当中，有不存在的角色，请检查后再试！", 105, { payload });
    const mutation_GQL = [];
    //先删除数据在进行添加
    //2.删除用户角色
    mutation_GQL.push({
        name: "delete_manager_role",
        args: { where: { manager_manager: { _eq: manager_pk } } }
    });
    //3.重新添加用户角色
    mutation_GQL.push({
        name: "insert_manager_role",
        args: {
            objects: role_pk_list.map(item => ({ manager_manager: manager_pk, role_role: item }))
        }
    });
    //执行指令并返回结果
    return batch_mutation(mutation_GQL);
}
// 修改后台用户信息
function update() {
    const { manager_pk = 0, username, password, phone, nickname, avatar_id, other = {} } = payload;
    const role_pk = payload?.role_pk ? (Array.isArray(payload?.role_pk) ? payload?.role_pk : [payload?.role_pk]) : null;
    if (!manager_pk || !phone || !nickname || role_pk.length == 0) return fail("请填写所有信息后进行注册!", 103, { payload });
    //1.判断是否为本人,如果是跳过权限检测
    if (manager_pk != manager?.id && !getAccessValidator()) return fail("您没有权限修改用户信息", 102, { payload });
    //2.查找用户名是否出现重复是就返回提示
    const managerList = query({
        name: `manager`,
        args: {
            limit: 1,
            where: {
                id: { _neq: manager_pk },
                username: { _eq: username },
            },
        },
        fields: ["id"]
    })
    if (managerList.length > 0) return fail("用户名已存在，请更换!", 104, { payload });
    //3.查找本人的账户是否已登记
    const [manager] = query({
        name: `manager`,
        args: {
            limit: 1,
            where: { id: { _eq: manager_pk } },
        },
        fields: ["id username password"]
    })
    //4.判断传入值是否传入，传入保存没有传入就不保存
    const _set = other || {};
    if ((manager_pk === userInfo.id || !manager.username) && (username && password)) {
        _set[`username`] = username;
        _set[`password`] = md5(password);
    }
    if (nickname) _set[`nickname`] = nickname;
    if (avatar_id) _set[`avatar_id`] = avatar_id;
    if (phone) _set[`phone`] = phone;
    //5.修改用户信息
    const response = {
        manager_pk: mutation_GQL.push({
            name: "update_manager_by_pk",
            args: {
                pk_columns: { id: manager_pk },
                _set
            },
            fields: ["id"]
        })?.id,
        update_role: Array.isArray(role_pk) ? setRole(manager_pk, role_pk) : null
    }
    return ezcloud.success(response, "修改成功");
}
// 重置密码
function resetPassword() {
    const { manager_pk = 0 } = payload;
    if (!manager_pk) return fail("请填写所有信息后进行注册!", 103, { payload });
    //1.判断是否为本人,如果是跳过权限检测
    if (manager_pk != manager?.id && !getAccessValidator()) return fail("您没有权限修改用户信息", 102, { payload });
    //3.查找本人的账户是否已登记
    const [manager] = query({
        name: `manager`,
        args: {
            limit: 1,
            where: { id: { _eq: manager_pk } },
        },
        fields: ["id password phone"]
    })
    const res = mutation({  //执行指令
        operation: "update_manager_by_pk",
        args: {
            pk_columns: { id: manager_pk },
            _set: { password: md5(md5(manager_by_pk.phone.slice(-6))) }
        },
        fields: ["id"]
    });
    return ezcloud.success(res, "重置成功，新密码为手机后六位");
}
//查询用户详情
function reads() {
    const manager_pk = userInfo.id;
    const fields = payload?.fields ? (Array.isArray(payload?.fields) ? payload?.fields : [payload?.fields]) : [];
    const fieldsUser = "id username phone avatar{id url} is_deleted nickname";//查询的字段
    const fieldsMenu = "id idx name icon{id url} path menu_parent_menu attach_data";
    const getMenu = (getMenuFunction = "") => ({
        name: `menu_children`,
        args: {
            order_by: { idx: () => "asc_nulls_last" },
            where: {
                role_menu: {
                    role: { manager_role: { manager_manager: { _eq: manager_pk } } }
                }
            }
        },
        fields: [fieldsMenu, getMenuFunction]
    })
    const userInfo = query([{
        name: `manager_by_pk`,
        args: { id: manager_pk },
        fields: [fieldsUser, ...fields, {
            action_name: "manager_role",
            fields: ["id", {
                action_name: "role",
                fields: ["id", "name", "describe", {
                    action_name: "role_per",
                    fields: ["id", "per{id name describe}"]
                }]
            }],
        }]
    }, {
        name: `menu`,
        args: {
            where: {
                menu_parent_menu: { _is_null: true },
                role_menu: {
                    role: { manager_role: { manager_manager: { _eq: manager_pk } } }
                }
            }
        },
        fields: [fieldsMenu,
            getMenu(getMenu(getMenu())) //此处需要套娃才会查到自己绑定自己的数据
        ]
    }]);
    return ezcloud.success({
        manager_pk: manager_pk,
        menu_list: userInfo?.menu,
        manager: userInfo?.manager?.reduce((object, item) => {
            return {
                ...item,
                manager_role: item.manager_role.map(res => res.role)
            }
        }, {})
    }, "查询成功");
}
// 修改当前密码
function updatePassword() {
    const manager_pk = userInfo.id;
    const password = userInfo.password;
    const { old_password, new_password } = payload;
    if (md5(old_password) !== password) return ezcloud.fail("旧密码错误", 114);
    if (old_password === new_password) return ezcloud.fail("新密码不能与旧密码相同", 114);
    const update = update({
        name: `manager`,
        args: { where: { id: manager_pk } },
        _set: { password: md5(new_password) }
    });
    return ezcloud.success(update, "修改成功");
}