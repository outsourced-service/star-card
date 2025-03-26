
declare interface Ezcloudbase {
  project_id?: string; // 项目ID  
  project_type?: "functorz" | "momen"; // 项目类型  
  endpoint_url?: string; // 服务端点URL  
  headers?: object; // 请求头  
  callback_url?: string; // 回调URL  
  clientinfo?: object; // 自定义配置  
  callback_id?: string; // 回调ID  
}
// 定义API调用配置接口  
declare interface ApiConfig {
	isReqLoading?: Boolean; // 是否显示加载动画  
	isErrorToast?: Boolean; // 是否在出错时显示Toast  
	isDebug?: Boolean; // 是否开启调试  
	attach_data?: object; // 附加数据  
  text?: string; // 请求文本
}

// richTextProcessing.d.ts
declare module '/@/utils/richTextProcessing' {
  export function replaceVideoAndImage(html: string): Promise<string>;
}

// ezInstance.d.ts
declare module '/@/utils/ezInstance' {
  export const ezclient: any;
}
