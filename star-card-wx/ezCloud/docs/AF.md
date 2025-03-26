# 行为流代码块开发指南

行为流代码块是一段运行在 Zion 平台上的 JavaScript 代码，用于处理业务逻辑。本文档将指导您如何开发和使用行为流代码块。

## 基本概念

行为流代码块：
- 是一段独立的 JavaScript 代码
- 通过输入参数接收数据
- 通过返回值输出数据
- 可以调用内置 API

## 开发规范

### 1. 代码结构

```javascript

// 获取输入参数
const param1 = context.getArg("param1");

// 业务逻辑处理
// ...

// 设置返回值
context.setReturn("result", value);
```

### 2. 内置对象

#### context 对象
主要用于参数传递和流程控制：

```javascript
// 参数操作
const data = context.getArg("paramName");           // 获取输入参数
context.setReturn("returnName", value);             // 设置返回值
context.error("errorKey", "错误信息", true);        // 抛出错误并中断执行

// 行为流调用
const result = context.callActionFlow(              // 调用其他行为流
    "actionFlowId",                                // 行为流ID
    null,                                          // 版本号(null表示最新版本)
    args                                           // 传入参数
);

// 数据库操作
const result = context.runGql(                      // 执行GraphQL查询
    "operationName",                               // 操作名称
    gqlString,                                     // GraphQL查询语句
    variables,                                     // 变量
    { role: "admin" }                             // 权限配置
);

// 第三方API调用
const apiResult = context.callThirdPartyApi(        // 调用第三方API
    "operationId",                                 // 操作ID
    args                                           // 参数
);

// 其他工具方法
context.sendEmail(toAddress, subject, fromAlias, textBody, htmlBody);  // 发送邮件

```

### 3. 错误处理

推荐使用 try-catch 进行错误处理：

```javascript
try {
    // 业务逻辑
    const result = context.runGql("query", gql, variables);
    context.setReturn("result",result);
} catch (error) {
    context.error("error",`操作失败: ${error.message}`);
    
}
```

## 开发模版

```javascript
// @ts-nocheck

/**
 * 输入参数
 * @param {string[]} keys 参数名称列表
 * @param {string} keys[].key1 输入参数1
 * @param {string} keys[].key2 输入参数2
 */
function getArgs(keys=["key1","key2"]){
    const args = {};
    keys.forEach(key => {
        args[key] = context.getArg(key);
    });
    return args;
}

/**
 * 设置返回值
 * @param {Object} outputs 返回值对象
 * @param {string} outputs.output1 输出结果1
 * @param {string} outputs.output2 输出结果2
 */
function setReturns(outputs){
    Object.keys(outputs).forEach(key => {
        context.setReturn(key,outputs[key]);
    });
}

/**
 * 主函数入口
 */
function main(args){
    if (!args.key1) {
        throw new Error("key1 is required");
    }
    if (!args.key2) {
        throw new Error("key2 is required");
    }
    return {
        output1:args.key1,
        output2:args.key2
    }
}


// 调用
try{
    const args = getArgs();
    const returns = main(args);
    setReturns(returns);
}catch(error){
    context.error("error",`操作失败: ${error.message}`,true);
}

```
### 案例

#### 1. 购物车下单

```javascript
/**
 * 购物车下单参数
 * @param {string[]} keys 参数名称列表
 * @returns {Object} 参数对象
 */
function getOrderArgs(keys = ["userId", "cartItems"]) {
    const args = {};
    keys.forEach(key => {
        args[key] = context.getArg(key);
    });
    return args;
}

/**
 * 设置订单返回值
 * @param {Object} outputs 返回值对象
 */
function setOrderReturns(outputs) {
    Object.keys(outputs).forEach(key => {
        context.setReturn(key, outputs[key]);
    });
}

/**
 * 校验库存
 * @param {Array} cartItems 购物车商品列表
 */
function checkStock(cartItems) {
    const gql = `
        query checkStock($productIds: [String!]!) {
            products(where: { id_in: $productIds }) {
                id
                stock
            }
        }
    `;
    
    const productIds = cartItems.map(item => item.productId);
    const result = context.runGql("checkStock", gql, { productIds });
    
    const products = result.products || [];
    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product || product.stock < item.quantity) {
            throw new Error(`商品 ${item.productId} 库存不足`);
        }
    });
}

/**
 * 创建订单记录
 * @param {Object} args 订单参数
 * @returns {Object} 订单信息
 */
function createOrderRecord(args) {
    const gql = `
        mutation createOrder($input: CreateOrderInput!) {
            createOrder(data: $input) {
                id
                totalAmount
                status
            }
        }
    `;
    
    const result = context.runGql("createOrder", gql, {
        input: {
            userId: args.userId,
            items: args.cartItems,
            status: "PENDING"
        }
    });
    
    return result.createOrder;
}

/**
 * 扣减库存
 * @param {Array} cartItems 购物车商品列表
 */
function reduceStock(cartItems) {
    const gql = `
        mutation reduceStock($items: [ReduceStockInput!]!) {
            reduceStock(items: $items)
        }
    `;
    
    const items = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));
    
    context.runGql("reduceStock", gql, { items });
}

/**
 * 生成支付信息
 * @param {string} orderId 订单ID
 * @returns {Object} 支付信息
 */
function generatePayment(orderId) {
    const result = context.callThirdPartyApi("generatePayment", {
        orderId,
        channel: "WECHAT"
    });
    
    return result;
}

/**
 * 创建订单主函数
 * @param {Object} args 订单参数
 * @returns {Object} 订单结果
 */
function createOrder(args) {
    // 参数校验
    if (!args.userId) {
        throw new Error("用户ID不能为空");
    }
    if (!Array.isArray(args.cartItems) || args.cartItems.length === 0) {
        throw new Error("购物车不能为空");
    }
    
    // 1. 校验库存
    checkStock(args.cartItems);
    
    // 2. 创建订单
    const order = createOrderRecord(args);
    
    // 3. 扣减库存
    reduceStock(args.cartItems);
    
    // 4. 生成支付信息
    const payment = generatePayment(order.id);
    
    return {
        orderId: order.id,
        totalAmount: payment.amount,
        status: order.status,
        paymentInfo: payment
    };
}

// 执行入口
try {
    const args = getOrderArgs();
    const result = createOrder(args);
    setOrderReturns(result);
} catch (error) {
    context.error("orderError", `下单失败: ${error.message}`, true);
}

#### 2. 更多示例正在补充中...





