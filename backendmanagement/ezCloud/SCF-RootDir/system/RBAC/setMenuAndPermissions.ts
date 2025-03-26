// @ts-nocheck
const { query, request, success, fail } = ezcloud;
const { role_pk = 0, menu_pk_list = [], per_pk_list = [] } = request.payload;
//1.验证角色是否存在
const role = query({
    name: `role`,
    args: {
        where: { id: { _eq: role_pk } },
    },
    fields: ["id"]
})
if (role.length < 1) return fail("角色不存在，请先创建角色后调用!", 110, request.payload);
//先删除数据在进行添加
const mutation_GQL = [];
//2.菜单数据添加
//需要判断是否传入只有传入了才会添加
if (menu_pk_list?.length > 0) {
    //2.1删除菜单
    mutation_GQL.push({
        name: "delete_role_menu",
        args: {
            where: { role_role: { _eq: role_pk } },
        },
        fields: "affected_rows returning{id}"
    });
    //2.2重新添加菜单
    mutation_GQL.push({
        name: "insert_role_menu",
        args: {
            objects: menu_pk_list.map(item => {
                return {
                    role_role: role_pk,
                    menu_menu: item
                }
            })
        },
        fields: "affected_rows returning{id}"
    })
}
//3.权限数据添加
//需要判断是否传入只有传入了才会添加
if (per_pk_list?.length > 0) {
    //3.1删除权限
    mutation_GQL.push({
        name: "delete_role_per",
        args: {
            where: { role_role: { _eq: role_pk } },
        },
        fields: "affected_rows returning{id}"
    });
    //3.2重新添加权限
    mutation_GQL.push({
        name: "insert_role_per",
        args: {
            objects: per_pk_list.map(item => {
                return {
                    role_role: role_pk,
                    per_per: item
                }
            })
        },
        fields: "affected_rows returning{id}"
    })
}
//判断并返回相应结果
if (mutation_GQL.length < 1) return fail("角色设置菜单和权限失败，至少需要传入一种权限或菜单！", 111, request.payload)
ezcloud.operate({
    opMethod: `mutation`,
    opName: "mutation_sum",
    opFields: mutation_GQL,
    variables: {},// 变量数据
    // onInited: ({ gql, viriables }) => { }
})?.response ?? {};
return success({ role_pk: role_pk, }, "角色设置菜单和权限成功!")