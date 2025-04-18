// RBAC_login.js  
// 此文件主要通过账户密码进行登录
const { success, fail, callScf, genJwtToken, parseJwtToken, md5, getRequest } = ezcloud;
const payload = ezcloud.getPayload();
const clientinfo = ezcloud.getClientinfo();
const expires_in = new Date().getTime() + (7200 * 1000); // 2小时

//根据操作类型，执行不同的操作
switch (payload.operate) {
    case "refreshToken": return refreshToken();
    // 默认通过账户和密码进行登录
    default: return login();
}

// 使用账户和密码换取token。如果用户不存在，则返回错误信息
function login(WHERE) {
    const { username, password } = payload;
    const where = WHERE || {
        username: { _eq: username },
        password: { _eq: md5(password) },
        // is_deleted: { _eq: false },
    }
    //获取用户信息
    const [manager] = ezcloud.query({
        name: "manager",
        args: {
            limit: 1,
            where: where,
        },
        fields: ["id is_deleted"]
    })
    if (!manager) {
        if (WHERE) return fail("登录已过期，请重新登录", 114);
        return fail("登录失败，请检查用户名和密码后再试", 114);
    }
    if (manager.is_deleted) return fail("用户不存在", 114);
    const menuList = getMenu(manager.id);
    const token = genJwtToken({ id: manager.id, expires_in: expires_in }, 'manager');
    ezcloud.mutation({
        operation: "update_manager_by_pk",
        args: { pk_columns: { id: manager.id }, _set: { token: token } },
        fields: ["id"]
    })
    return success({
        token,
        expires_in,
        manager_pk: manager?.id,
        menuList: menuList
    }, "登录成功")
}

// 获取菜单
function getMenu(manager_pk = 0) {
    const fieldsMenu = "id idx name icon{id url} path parent_menu attach_data";
    const role_menu = { role: { manager_role: { manager_manager: { _eq: manager_pk } } } }
    const getMenu = (getMenuFunction = "") => ({
        name: `children_menu`,
        args: {
            order_by: { idx: () => "asc_nulls_last" },
            where: { role_menu }
        },
        fields: [fieldsMenu, getMenuFunction]
    })
    return ezcloud.query({
        name: `menu`,
        args: {
            where: {
                parent_menu: { _is_null: true },
                role_menu
            },
            order_by: { idx: () => "asc_nulls_last" },
        },
        fields: [fieldsMenu,
            getMenu(getMenu(getMenu())) //此处需要套娃才会查到自己绑定自己的数据
        ]
    })
}

//使用用户username和token换取新的token
function refreshToken() {
    const { username } = payload;
    const { token } = clientinfo;
    const userInfo = parseJwtToken(token ?? '', "manager");
    return login({
        id: { _eq: userInfo.id },
        username: { _eq: username },
        token: { _eq: token }
    })
}