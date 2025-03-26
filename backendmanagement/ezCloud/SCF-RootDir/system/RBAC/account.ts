// @ts-nocheck
// RBAC_account.js  
// 此文件包含了一系列对用户的操作
const { callScf, parseJwtToken, md5, fail, query, mutation, getClientinfo } = ezcloud;
const payload = ezcloud.getPayload();
//获取用户token信息
const USERINFO = (() => {
    try {
        const userInfo = parseJwtToken(getClientinfo()?.token ?? '', "manager");
        return getUserInfo(userInfo?.id ?? -1)
    } catch (error) {
        throw fail("token无效，请重新登录", 101, { error });
    }
})();
const fieldsUser = "id manager_id username mobile avatar{id url} is_deleted nickname";//查询的字段
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
    //获取用户列表
    case "list": return list();
    //重置用户密码
    case "resetPassword": return resetPassword();
    //重新激活账号
    case "reactivation": return reactivation();
    // 修改当前密码
    case "updatePassword": return updatePassword();
    // 获取菜单信息
    case "routes": return getRoutes();
    default:
        return fail("操作类型错误", 102, { payload });
}

//查询用户信息,包含用户角色
function getUserInfo(ID) {
    const [info] = ezcloud.query({
        name: "manager",
        args: {
            limit: 1,
            where: { id: { _eq: ID } },
        },
        fields: ["id username mobile password avatar{id url} is_deleted ", 'role:manager_role{role{id name}}'],
        // onInited: ({ gql, viriables }) => { }
    })
    return {
        ...info,
        role: info.role.map(item => item.role)
    }
}
// 获取用户角色，用户访问的权限
function getAccessValidator(operate) {
    const role = USERINFO.role.map(item => item.name);
    if (role.includes['SuperAdministrator']) return true;
    const per = [{ name: 'manager', type: "DB", operate: operate === 'detail' ? 'read' : operate }];
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
    const { username, password, mobile, nickname, avatar_id, other = {} } = payload;
    const role_pk = payload?.role_pk ? (Array.isArray(payload?.role_pk) ? payload?.role_pk : [payload?.role_pk]) : null;
    if (!username || !password || !mobile || !nickname || role_pk.length == 0) return fail("请填写所有信息后进行注册!", 103, { payload });
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
        name: "insert_manager_one",
        args: {
            object: {
                manager_id: generateUserId(),
                username,
                password: ezcloud.md5(password),
                mobile,
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
    const { manager_pk = 0 } = payload;
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
    const { manager_pk = 0 } = payload;
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
        args: { where: { manager_manager: { _eq: manager_pk } } },
        fields: ["affected_rows"]
    });
    //3.重新添加用户角色
    mutation_GQL.push({
        name: "insert_manager_role",
        args: {
            objects: role_pk_list.map(item => ({ manager_manager: manager_pk, role_role: item }))
        },
        fields: ["affected_rows"]
    });
    //执行指令并返回结果
    return ezcloud.operate({
        opMethod: `mutation`,
        opName: "updateRole",
        opFields: mutation_GQL,
        variables: {},// 变量数据
    })?.response ?? {};
}
// 修改后台用户信息
function update() {
    const { manager_pk = 0, username, password, mobile, nickname, avatar_id, other = {} } = payload;
    const role_pk = payload?.role_pk ? (Array.isArray(payload?.role_pk) ? payload?.role_pk : [payload?.role_pk]) : null;
    if (!manager_pk || !mobile || !nickname || role_pk.length == 0) return fail("请填写所有信息后进行注册!", 103, { payload });
    //1.判断是否为本人,如果是跳过权限检测
    // if (manager_pk != USERINFO?.id && !getAccessValidator('update')) return fail("您没有权限修改用户信息", 102, { payload });
    //2.查找用户名是否出现重复是就返回提示
    const managerList = username ? query({
        name: `manager`,
        args: {
            limit: 1,
            where: {
                id: { _neq: manager_pk },
                username: { _eq: username },
            },
        },
        fields: ["id"]
    }) : [];
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
    if ((manager_pk === USERINFO.id || !manager.username) && (username && password)) {
        _set[`username`] = username;
        _set[`password`] = md5(password);
    }
    if (nickname) _set[`nickname`] = nickname;
    if (avatar_id) _set[`avatar_id`] = avatar_id;
    if (mobile) _set[`mobile`] = mobile;
    //5.修改用户信息
    const response = {
        manager_pk: ezcloud.mutation({
            name: "update_manager_by_pk",
            args: {
                pk_columns: { id: manager_pk },
                _set
            },
            fields: ["id"]
        }),
        update_role: Array.isArray(role_pk) ? setRole(manager_pk, role_pk) : null
    }
    return ezcloud.success(response, "修改成功");
}
// 重置密码
function resetPassword() {
    const { manager_pk = 0 } = payload;
    if (!manager_pk) return fail("请填写所有信息后进行注册!", 103, { payload });
    //1.判断是否为本人,如果是跳过权限检测
    // if (manager_pk != USERINFO?.id && !getAccessValidator()) return fail("您没有权限修改用户信息", 102, { payload });
    //3.查找本人的账户是否已登记
    const [manager] = query({
        name: `manager`,
        args: {
            limit: 1,
            where: { id: { _eq: manager_pk } },
        },
        fields: ["id password mobile"]
    })
    if (!manager) return fail("用户不存在", 105, { payload });
    const res = mutation({  //执行指令
        name: "update_manager_by_pk",
        args: {
            pk_columns: { id: manager_pk },
            _set: { password: md5(md5(manager.mobile.slice(-6))) }
        },
        fields: ["id"]
    });
    return ezcloud.success(res, "重置成功，新密码为手机后六位");
}
//查询用户详情
function reads() {
    const manager_pk = USERINFO.id;
    const fields = payload?.fields ? (Array.isArray(payload?.fields) ? payload?.fields : [payload?.fields]) : [];
    return ezcloud.query({
        alias: "manager",
        name: `manager_by_pk`,
        args: { id: manager_pk },
        fields: [fieldsUser, ...fields, {
            name: "manager_role",
            fields: ["id", {
                name: "role",
                fields: ["id", "name", "describe", {
                    name: "role_per",
                    fields: ["id", "per{id name describe}"]
                }]
            }],
        }]
    })
}
// 用户列表
function list() {
    const { page_index = 1, page_size = 100, where = {}, order_by, ...rest } = payload;
    const fields = payload?.fields ? (Array.isArray(payload?.fields) ? payload?.fields : [payload?.fields]) : [];
    const _and = {
        id: { _neq: USERINFO.id },
        is_deleted: { _eq: false },
        manager_id: { _neq: "SUPER_ADMINISTRATOR" }
    }
    if (where._and) where._and.push(_and);
    else where._and = [_and]
    const { response: reslut } = ezcloud.operate({
        opMethod: "query",
        opName: "manager",
        opFields: [{
            name: `manager`,
            args: {
                order_by: order_by || { id: () => "desc_nulls_last" },
                offset: (page_index - 1) * page_size,
                limit: page_size,
                where,
            },
            fields: [fieldsUser, ...fields, {
                name: "manager_role",
                fields: ["id role { id name describe }"],
            }],
        }, {
            name: `manager_aggregate`,
            args: { where },
            fields: ["aggregate{ count }"]
        }]
    })
    return {
        list: reslut.manager,
        total_size: reslut["manager_aggregate"].aggregate.count
    }
}
// 修改当前密码
function updatePassword() {
    const manager_pk = USERINFO.id;
    const password = USERINFO.password;
    const old_password = md5(payload.old_password);
    const new_password = md5(payload.new_password);
    if (new_password === password) return ezcloud.fail("新密码不能与旧密码相同", 114);
    if (old_password !== password) return ezcloud.fail("旧密码错误", 114);
    const update = update({
        name: `manager`,
        args: { where: { id: manager_pk } },
        _set: { password: md5(new_password) }
    });
    return ezcloud.success(update, "修改成功");
}
// 生成用户ID
function generateUserId(prefix = 'uu', index = 0, num = 2) {
    // 获取当前时间戳（格式化为 YYYYMMDDHHMMSS）
    const datetime = new Date().toISOString().slice(0, 19).replace(/[-:.T]/g, '');

    // 生成随机序列（长度为 num 的随机数字）
    const randomSerial = Math.floor(Math.random() * (10 ** num)).toString().padStart(num, '0');

    // 将索引转换为两位数的字符串
    const number = index.toString().padStart(2, '0');

    // 定义字符集
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // 将时间戳、索引和随机序列拼接成一个字符串
    const identifier = `${datetime}${number}${randomSerial}`;

    // 将 identifier 转换为 Base62 编码
    let code = '';
    let base62Value = BigInt(identifier); // 直接将字符串转换为 BigInt
    while (base62Value > 0n) { // 使用 0n 表示 BigInt 的零值
        const remainder = base62Value % 62n; // 使用 62n 表示 62 的 BigInt 类型
        code = alphabet[remainder] + code;
        base62Value = base62Value / 62n; // 使用 62n 表示 62 的 BigInt 类型
    }

    return `${prefix}${code}`;
}

// 获取路由列表
function getRoutes() {
    const fieldsMenu = "id idx name icon{id url} path meta component";
    //套娃指令，因为不知道有几层，因此需要手动编写
    const getMenu = (getMenuFunction = "") => ({
        name: `children_menu`,
        args: {
            order_by: { idx: () => "asc_nulls_last" },
            where: {
                role_menu: {
                    role: { manager_role: { manager_manager: { _eq: USERINFO.id } } }
                }
            }
        },
        fields: [fieldsMenu, getMenuFunction]
    })
    return ezcloud.query({
        name: `menu`,
        args: {
            order_by: { idx: () => "asc_nulls_last" },
            where: {
                parent_menu: { _is_null: true },
                role_menu: {
                    role: { manager_role: { manager_manager: { _eq: USERINFO.id } } }
                }
            }
        },
        fields: [fieldsMenu,
            getMenu(getMenu(getMenu())) //此处需要套娃才会查到自己绑定自己的数据
        ]
    })
}