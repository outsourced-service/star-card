

### 客户端使用ezserver调ezcloud框架代理的服务

#### 使用

```javascript
// JS中使用
import ezcloudbase from "ezcloudbase";
const ezserver = new ezcloudbase.EzServer({
  // 配置方式一：
  project_id: "xxxxR9Bxxxx", // 项目ID，可在项目链接中获取
  project_type: "FUNCTORZ", // 项目类型 1.FUNCTORZ 2.MOMEN 默认为FUNCTORZ
  callback_id: "xxxx0dcf-c32d-4e80-8e26-870559ddxxxx", // 回调ID，行为流框架ezcloud中获取

  // 配置方式二：
  callback_url:"", // 直接配置回调链接
});
```

```html
<!-- 或者浏览器中直接引入使用 -->
<script src="https://cdn.jsdelivr.net/npm/ezcloudbase/dist/ezcloudbase.umd.js"></script>
<script>
  const ezserver = new ezcloudbase.EzServer({
    // 配置方式一：
    project_id: "xxxxR9Bxxxx", // 项目ID，可在项目链接中获取
    project_type: "FUNCTORZ", // 项目类型 1.FUNCTORZ 2.MOMEN 默认为FUNCTORZ
    callback_id: "xxxx0dcf-c32d-4e80-8e26-870559ddxxxx", // 回调ID，行为流框架ezcloud中获取

    // 配置方式二：
    callback_url:
      "", // 直接配置回调链接
  });
</script>
```

#### ezserver 接口列表

##### `ezserver.runGql`（运行 gql 参数 1：如下 参数 2：自定义 config）

- `gql` graphql 查询语句
- `variables` 变量数据

##### `ezserver.operate`（所有的 gql 接口操作）

- `opMethod` 操作方法 1.query 2.mutation 3.subscription
- `opName` 操作名称
- `opArgs` 变量定义，key 为变量名，value 为变量类型
- `opFields` 查询哪些字段
  - `alias` 字段别名
  - `name` 字段名
  - `directives` 指令，如：
  - `args` 字段参数
  - `fields` 字段下级子字段
- `variables` 变量数据
- `onInited` 初始化后回调函数

##### `ezserver.query`（所有的查询操作）

- `opMethod` 操作方法固定为 query
- `opName` 操作名称
- `opArgs` 变量定义，key 为变量名，value 为变量类型
- `variables` 变量数据
- `directives` 指令，如：[{ name: "include", args: { if: true } }]
- `name` 查询名称
- `args` 查询参数
- `fields` 查询字段
- `onInited` 初始化后回调函数

##### `ezserver.mutation`（所有的变更操作）

- `opMethod` 操作方法固定为 mutation
- `opName` 操作名称
- `opArgs` 变量定义，key 为变量名，value 为变量类型
- `variables` 变量数据
- `directives` 指令，如：[{ name: "include", args: { if: true } }]
- `name` 查询名称
- `args` 查询参数
- `fields` 查询字段
- `onInited` 初始化后回调函数


##### `ezserver.callScf`（调用云函数）

- `scf_dir` 操作目录
- `scf_name` 云函数名称
- `payload` 云函数入参

##### `ezserver.fetchApi`（代理第三方 API 请求）

- `url` 请求 url
- `method` 请求方法
- `data` 入参
- `headers` 请求头

##### `ezserver.setClientinfo` （客户端配置，参数 1：clientinfo 参数 2：isOverWrite; 注：clientinfo 中的 developer_token 已被系统占用，业务逻辑中请勿重复使用）

##### `ezserver.getClientinfo`（客户端配置行为,无参数）

##### `ezserver.setConfig`（设置配置）

- `project_id` 项目 ID，可在项目链接中获取
- `project_type` 项目类型 1.FUNCTORZ 2.MOMEN 默认为 FUNCTORZ
- `developer_token` 开发者 token
- `developer_token_expires_in` 开发者 token 过期时间
- `callback_id` ezcloud 行为流框架回调 id
- `callback_url` 直接配置 回调链接，配置此项将忽略 project_id 和 project_type

##### `ezserver.getConfig` （获取配置）

