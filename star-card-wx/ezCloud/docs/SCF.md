# 云函数开发指南

## 目录
- [基本概念](#基本概念)
- [开发规范](#开发规范)
- [API参考](#api参考)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

ezcloud 云函数是运行在 ezcloud 行为流框架中的纯 JavaScript 代码，本文档将指导您如何开发和使用云函数。

## 基本概念

云函数特点：
- 一段独立的 JavaScript 代码片段
- 内置 ezcloud API、CryptoJS、行为流context
- 支持数据库操作
- 自动支持错误处理
- 提供日志记录

## 开发规范

### 1. 代码结构

```javascript
// @ts-nocheck

// 解构常用的 ezcloud 方法
const {
    success,
    fail,
    query,
    mutation,
    queryGetFirstOne,
    getPayload,
    getClientinfo,
    md5,
    getCallbackBody,
    getCallbackInput,
    aggregate,
    operate,
    genJwtToken,
    parseJwtToken,
    callActionflow,
    callScf,
    fetchApi,
    callThirdapi,
    runGql,
    uploadMedia,
} = ezcloud;

// 业务逻辑处理
const { id } = getPayload();
if (!id) {
    fail("ID不能为空", "参数错误", 1001);
    return;
}

const data = queryGetFirstOne({
    name: "table_name",
    args: { where: { id: { _eq: id } } }
});

if (!data) {
    fail("数据不存在", "查询失败", 1002);
    return;
}

// 返回结果
success({ data });
```

### 2. 内置对象

#### ezcloud 对象
提供了完整的数据操作和工具方法：

```javascript
// 1. 获取请求参数
const payload = getPayload();           // 获取请求参数
const clientInfo = getClientinfo();     // 获取客户端信息
const callbackBody = getCallbackBody(); // 获取回调请求体
const callbackInput = getCallbackInput(); // 获取回调输入参数

// 2. 数据库操作
// 2.1 查询列表
const list = query({                    
    name: "table_name",                // 表名
    args: {                            // 查询参数
        where: { status: { _eq: "active" } },
        order_by: { created_at: ()=>"desc" },
        limit: 10,
        offset: 0
    },
    fields: ["id", "name"]            // 返回字段
});

// 2.2 查询单条
const item = queryGetFirstOne({         
    name: "table_name",
    args: {
        where: { id: { _eq: 1 } }
    },
    fields: ["id", "name"]
});

// 2.3 数据修改
const insertResult = mutation({         
    name: "insert_table_name",         // 插入数据
    args: {
        objects: [{
            name: "test",
            status: "active"
        }]
    },
    fields:["affected_rows"]
});

const updateResult = mutation({         // 更新数据
    name: "update_table_name",
    args: {
        where: { id: { _eq: 1 } },
        _set: {
            status: "inactive"
        }
    },
    fields:["affected_rows"]
});

const deleteResult = mutation({         // 删除数据
    name: "delete_table_name",
    args: {
        where: { id: { _eq: 1 } }
    },
    fields:["affected_rows"]
});

// 2.4 聚合查询
const aggregateResult = aggregate({
    name: "table_name",
    args: {
        where: { status: { _eq: "active" } }
    },
    aggregate_fields: {
        name: "count"                  // 计数
    }
});

const statsResult = aggregate({
    name: "orders",
    args: {
        where: { status: { _eq: "completed" } }
    },
    aggregate_fields: [
        {
            name: "sum",               // 求和
            fields: ["amount"]
        },
        {
            name: "avg",               // 平均值
            fields: ["amount"]
        },
        {
            name: "max",               // 最大值
            fields: ["amount"]
        },
        {
            name: "min",               // 最小值
            fields: ["amount"]
        }
    ]
});

// 2.5 高级查询
const result = operate({                // 自定义查询
    opMethod: "query",                 // 操作类型：query/mutation/subscription
    opName: "customOperation",         // 操作名称
    opArgs: {                          // 操作参数定义
        $var1: "String"
    },
    opFields: [{// 需要批量调用的接口
        name:"user",
        args:{
            where:{
                name:{_eq:()=>"$var1"}
            }
        },
        fields:["id","name"]
    }],         // 返回字段
    variables: {                       // 查询变量
        var1: "value1"
    }
});

// 3. 工具方法
const hash = md5("password");          // MD5加密
const token = genJwtToken({            // 生成JWT
    user_id: 1,
    expires_in: 3600                   // 过期时间(秒)
});
const decoded = parseJwtToken(token);   // 解析JWT

// 4. 流程控制

const scfResult = callScf({            // 调用其他云函数
    scf_name: "function_name",         // 函数名
    scf_dir: "directory_path/",        // 目录
    payload: { param1: "value1" }      // 传入参数
});


const thirdApiResult = callThirdapi(    // 调用配置的第三方API
    "api_name",                        // API名称
    { param1: "value1" },              // 请求参数
    { "Custom-Header": "value" }       // 自定义请求头
);

// 6. GraphQL操作
const gqlResult = runGql({             // 执行GraphQL查询
    gql: `
        query getUser($id: Int!) {
            user(id: $id) {
                id
                name
            }
        }
    `,
    variables: { id: 1 }
});

// 7. 媒体文件
const mediaUrl = uploadMedia({          // 上传媒体文件
    url: "https://example.com/file.jpg"
});

// 8. 响应处理
success({ data: result });             // 成功响应
success(result, "操作成功");           // 成功响应带消息

fail("错误信息");                      // 失败响应
fail("详细错误", "错误标题", 1001);    // 失败响应带错误码
```

### 3. 数据库操作

#### 查询条件
```javascript
// 1. 等值查询
where: { status: { _eq: "active" } }

// 2. 模糊查询
where: { name: { _like: "%test%" } }

// 3. 范围查询
where: { 
    age: { _gt: 18 },            // 大于
    score: { _gte: 60 }          // 大于等于
}

// 4. IN查询
where: { id: { _in: [1, 2, 3] } }

// 5. 复合查询
where: {
    _and: [
        { status: { _eq: "active" } },
        { age: { _gt: 18 } }
    ]
}
```

#### 关联查询
```javascript
// 查询订单及其用户信息
const orders = query({
    name: "order",
    fields: [
        "id",
        "amount",
        {
            name: "user",          // 关联表
            fields: ["id", "name"] // 关联字段
        }
    ]
});
```

#### 排序条件
```javascript
// 1. 单字段排序
const list1 = query({
    name: "users",
    args: {
        order_by: { created_at: ()=>"desc" }  // 降序
    }
});

const list2 = query({
    name: "users",
    args: {
        order_by: { score: ()=>"asc" }  // 升序
    }
});

// 2. 多字段排序
const list3 = query({
    name: "users",
    args: {
        order_by: [
            { priority: ()=>"desc" },  // 先按优先级降序
            { created_at: ()=>"asc" }  // 再按创建时间升序
        ]
    }
});

// 3. 关联表排序
const list4 = query({
    name: "orders",
    args: {
        order_by: {
            user: {                    // 关联表排序
                username: ()=>"asc"
            }
        }
    },
    fields: [
        "id",
        "amount",
        { name: "user", fields: ["username"] }
    ]
});

// 4. 组合查询和排序
const list5 = query({
    name: "products",
    args: {
        where: { 
            status: { _eq: "active" }
        },
        order_by: [
            { price: ()=>"desc" },
            { stock: ()=>"desc" }
        ],
        limit: 10
    }
});
```

### 4. 错误处理

```javascript
// 参数校验
const { id } = getPayload();
if (!id) {
    fail("ID不能为空", "参数错误", 1001);
    return;
}

// 数据校验
const user = queryGetFirstOne({
    name: "user",
    args: { where: { id: { _eq: id } } }
});

if (!user) {
    fail("用户不存在", "查询失败", 1002);
    return;
}

// 业务校验
if (user.status !== "active") {
    fail("用户已禁用", "状态错误", 1003);
    return;
}

success({ user });
```

## 最佳实践

1. 参数校验
```javascript
const { username, password } = getPayload();
if (!username?.trim()) {
    fail("用户名不能为空", "参数错误", 1001);
    return;
}

if (!password?.trim()) {
    fail("密码不能为空", "参数错误", 1002);
    return;
}
```

2. 数据验证
```javascript
const user = queryGetFirstOne({
    name: "user",
    args: { where: { id: { _eq: userId } } }
});

if (!user) {
    fail("数据不存在", "查询失败", 1002);
    return;
}
```

3. 关联查询优化
```javascript
// 只查询需要的字段
const order = queryGetFirstOne({
    name: "order",
    fields: [
        "id",
        "status",
        {
            name: "items",
            fields: ["id", "price"],
            args: {
                limit: 10,
                order_by: { created_at: ()=>"desc" }
            }
        }
    ]
});
```

## 注意事项

1. 代码规范
- 使用 `@ts-nocheck` 跳过类型检查
- 添加必要的注释说明
- 合理组织代码结构

2. 数据库操作
- 合理使用查询条件
- 避免过多的关联查询
- 注意查询性能

3. 错误处理
- 使用 fail 函数直接返回错误
- 不建议使用 try-catch
- 做好参数和数据校验

4. 安全考虑
- 验证输入参数
- 控制数据访问权限
- 敏感数据加密

## API参考

### 常用API速查表

| API 名称 | 说明 | 示例 |
|---------|------|------|
| query | 查询数据列表 | `query({ name: "table", fields: ["id"] })` |
| queryGetFirstOne | 查询单条数据 | `queryGetFirstOne({ name: "table", args: { where: { id: { _eq: 1 } } } })` |
| mutation | 数据修改操作 | `mutation({ name: "insert_table", args: { object: data } })` |
| success | 返回成功结果 | `success({ data })` |
| fail | 返回错误信息 | `fail("错误信息", "错误标题", 1001)` |

## 常见问题

### 1. 性能优化

```javascript
// 推荐：使用 queryGetFirstOne 替代 query 获取单条数据
const user = queryGetFirstOne({
    name: "user",
    args: { where: { id: { _eq: userId } } }
});

// 不推荐：使用 query 获取单条数据
const users = query({
    name: "user",
    args: { 
        where: { id: { _eq: userId } },
        limit: 1
    }
});
const user = users[0];
```

### 2. 错误处理最佳实践

```javascript
// 推荐：使用明确的错误代码和消息
if (!userId) {
    fail("用户ID不能为空", "参数错误", 10001);
    return;
}

// 不推荐：模糊的错误信息
if (!userId) {
    fail("参数错误");
    return;
}
```

### 3. 数据库查询优化

```javascript
// 推荐：只查询需要的字段
const user = queryGetFirstOne({
    name: "user",
    fields: ["id", "name", "email"],
    args: { where: { id: { _eq: userId } } }
});

// 不推荐：查询所有字段
const user = queryGetFirstOne({
    name: "user",
    args: { where: { id: { _eq: userId } } }
});
```

## 开发提示

1. 代码组织
- 将复杂的业务逻辑拆分为多个函数
- 使用有意义的变量名和函数名
- 添加必要的注释说明业务逻辑

2. 安全性
- 所有用户输入都需要验证
- 敏感数据传输时使用加密
- 合理使用权限控制

3. 调试技巧
- 使用 ezcloud.log 输出调试信息
- 合理使用错误码进行问题定位
- 保持代码结构清晰便于调试
