# 行为流 AF 和 云函数 SCF 的代码块

AF-RootDir 下存放了行为流 AF 的 JS 代码块文件
AF 全局对象 context，这是一个同步代码块环境，内部的所有方法都是同步的

SCF-RootDir 下存放了云函数 SCF 的 JS 代码块文件
SCF 全局对象有 CryptoJS（crypto-js 打包的纯 js 加密库）、context（AF 全局对象）、ezcloud（在 AF 环境下基于 context 封装的全局对象，new Function 创建的时的传参）
SCF 环境主要提供一个 ezcloud 对象便于快速编写后端接口
SCF 环境的构建原理：

```js
try {
	const fn = new Function(
	"ezcloud",
	"context",
	"CryptoJS",
	scf_code
	);
	const result = fn(this, context, CryptoJS);
	return { data: result, code: 0, message: "success" };
} catch (error: any) {
	return { data: null, code: -1, message: error.message };
}
```

根据构建原理可知，SCF 代码块已经全局处理了错误，所以不要在 try catch 中使用 ezcloud.success 和 ezcloud.fail，会出现错误阻断

ezcloud 开发项目时的工作原理： 1.在 ezCloud/SCF-RootDir 下创建新的 JS 文件，编写 SCF 代码块 2.在 ezCloud/AF-RootDir 下创建新的 JS 文件，编写 AF 代码块 3.在 ez.config.json 中配置 project_id,project_type,callback_id 4.运行 ezcloudbase start 启动项目，启动后在浏览器打开 http://localhost:3000，进入 ezcloudbase-playground 5.在 ezcloudbase-playground 中上传部署 SCF-RootDir 下的 JS 文件（每个文件就是一个接口） 6.部署成功后，可在客户端通过 sdk 调用接口（具体参考 ezcloudbase）
7.ezcloudbase 客户端调用接口方式如下：

```js
import EZCloudBase from "ezcloudbase";
const ezserver = new EZCloudBase.ezserver({
  project_id: "xxx",
  project_type: 1,
  callback_id: "xxx",
});
ezserver
  .callScf({
    scf_dir: "xxx", //SCF-RootDir下的文件夹名,如：/
    scf_name: "xxx", //SCF-RootDir下的文件名,如：test
    payload: {
      //请求参数
      xxx: "xxx",
    },
    clientinfo: {
      //客户端信息
      user_token: "xxx", //用户token
    },
  })
  .then((res) => {
    console.log(res); //{contact: "技术反馈联系zach微信：bianzhinet"}
  })
  .catch((err) => {
    console.log(err);
  });
```
