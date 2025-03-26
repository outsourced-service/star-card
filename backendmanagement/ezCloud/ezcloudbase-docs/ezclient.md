客户端使用ezclient
```js
// 场景一：项目中import
import ezcloudbase from "ezcloudbase";
const ezclient = new ezcloudbase.EzClient({
  // 配置方式一：
  project_id: "", // 项目ID，可在项目链接中获取
  project_type: "FUNCTORZ", // 项目类型 1.FUNCTORZ 2.MOMEN 默认为FUNCTORZ

  // 配置方式二：
  endpoint_url: "", // 直接配置graphql端点URL
});


// 场景二： 浏览器中CDN直接引入 
<script src="https://cdn.jsdelivr.net/npm/ezcloudbase/dist/ezcloudbase.umd.js"></script>
<script>
  const ezclient = new ezcloudbase.EzClient({
    // 配置方式一：
    project_id: "", // 项目ID，可在项目链接中获取
    project_type: "FUNCTORZ", // 项目类型 1.FUNCTORZ 2.MOMEN 默认为FUNCTORZ

    // 配置方式二：
    endpoint_url:"", // 直接配置graphql端点URL
  });
</script>

```
接口列表：
##### `ezclient.runGql`（运行 gql 参数 1：如下 参数 2：自定义配置）

- `gql` graphql 查询语句
- `variables` 变量数据

```javascript
// 执行 gql 查询
ezclient
  .runGql({
    gql: `
    query {
      ez_system(where:{id:{_gt:0}},limit:1) {
        id
        name
      }
    }
  `,
    variables: {},
  })
  .then((res) => {
    console.log(res);
  });
```

##### `ezclient.operate`（gql 调用引擎）

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

```javascript
// 执行 gql
ezclient
  .operate({
    opMethod: "query",
    opName: "ez_system",
    opArgs: {},
    opFields: [
      {
        name: "ez_system",
        fields: ["id", "name"],
        args: {
          where: {
            id: {
              _gt: 0,
            },
          },
          limit: 1,
        },
      },
    ],
    variables: {},
  })
  .then((res) => {
    console.log(res);
  });
```

##### `ezclient.query`（所有的查询操作）

- `opMethod` 操作方法固定为 query
- `opName` 操作名称
- `opArgs` 变量定义，key 为变量名，value 为变量类型
- `variables` 变量数据
- `directives` 指令，如：[{ name: "include", args: { if: true } }]
- `name` 查询名称
- `args` 查询参数
- `fields` 查询字段
- `onInited` 初始化后回调函数

##### `ezclient.mutation`（所有的变更操作）

- `opMethod` 操作方法固定为 mutation
- `opName` 操作名称
- `opArgs` 变量定义，key 为变量名，value 为变量类型
- `variables` 变量数据
- `directives` 指令，如：[{ name: "include", args: { if: true } }]
- `name` 查询名称
- `args` 查询参数
- `fields` 查询字段
- `onInited` 初始化后回调函数

##### `ezclient.callActionflow`（调用行为流）

- `actionFlowId` 行为流 ID
- `versionId` 必传，行为流版本号
- `args` 行为流入参

##### `ezclient.setHeaders` （配置的请求 headers）

##### `ezclient.getHeaders` （获取配置的请求 headers）

##### `ezclient.setConfig` （设置配置，参数 1：如下 参数 2：isOverWrite）

- `project_id` 项目 ID，可在项目链接中获取
- `project_type` 项目类型 1.FUNCTORZ 2.MOMEN 默认为 FUNCTORZ
- `editor_token` 编辑器 token
- `editor_token_expires_in` 编辑器 token 过期时间
- `project_token` 项目 token
- `project_token_expires_in` 项目 token 过期时间
- `endpoint_url` 直接配置 graphql 端点 URL，配置此项将忽略 project_id 和 project_type

##### `ezclient.getConfig` （获取配置）

##### `ezclient.uploadImage` （上传，参数 1：{name:"",path:""}或文件流，参数 2：onReady 回调函数）

##### `ezclient.uploadFile`（上传，参数 1：{name:"",path:""}或文件流，参数 2：onReady 回调函数）

##### `ezclient.uploadVideo` （上传，参数 1：{name:"",path:""}或文件流，参数 2：onReady 回调函数）
