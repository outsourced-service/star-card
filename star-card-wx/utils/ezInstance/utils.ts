import { ApiConfig } from "@/types/ezInstance";

// 定制请求loading和错误toast的代码
const utils = {
	showLoading: uni.showLoading, // 显示加载动画
	hideLoading: uni.hideLoading, // 隐藏加载动画
	showToast: uni.showToast, // 显示Toast提示
	hideToast: uni.hideToast, // 隐藏Toast提示
};

// 显示Toast提示
function toast(errMsg = "出错啦", icon = "none") {
	let msg = typeof errMsg === "object" ? JSON.stringify(errMsg) : errMsg;
	const timer = setTimeout(() => {
		utils.showToast &&
			utils.showToast(<any>{
				title: msg,
				icon,

				content: errMsg,
				type: icon,
				duration: 1500,
			});
		clearTimeout(timer);
	}, 0);
}


// 定义一个异步函数loop，参数isApiInited默认为false
async function loop(isApiInited = false, time = 50) : Promise<any> {
	// 如果isApiInited为false，则直接返回
	if (!isApiInited) return
	// 等待50毫秒后，再执行loop函数
	await new Promise((resolve) => setTimeout(resolve, time));
	// 返回loop函数的执行结果
	return await loop(false)
}

const throttleMap : { [key : string] : boolean } = {}; // 用于存储不同 API 的节流状态
const apiPromises : { [key : string] : Promise<any> | null } = {}; // 用于存储正在进行的 API 请求的 Promise
async function throttleExecution(name : any, callback : () => Promise<any>) {
	const key = name; // 生成唯一的节流键
	if (throttleMap[key]) return apiPromises[key]; // 如果节流键存在，返回正在进行的请求的 Promise
	throttleMap[key] = true; // 设置节流状态为 true

	// 发起 API 请求并存储 Promise
	apiPromises[key] = await callback().finally(() => {
		throttleMap[key] = false; // 请求完成后重置节流状态
	});
	return apiPromises[key]; // 返回请求的 Promise
}

// 请求计数器
let requestCount = 0;
// 加载状态标志
let isLoading = false;
/**
 * 控制加载动画的显示与隐藏
 * @param showLoading - 是否显示加载动画
 * @param title - 加载提示文字
 * @param name - 加载动画名称
 * @param isDebug - 是否开启调试模式
 * @returns 当前加载状态
 */
function handleLoading(showLoading = true, title = "加载中...", name = 'Loading', isDebug = false) : boolean {

	// 更新请求计数
	if (showLoading) requestCount++;
	else requestCount--;


	// 首次显示加载
	if (!isLoading && requestCount > 0) {
		isLoading = true;
		// 调试模式下显示开始日志
		if (isDebug) {
			console.log(`\n%c=== ${name} Start ===`, 'color: #2196F3; font-weight: bold');
		}
		// 显示加载动画
		utils.showLoading && utils.showLoading({
			title,
			mask: true
		});
	}
	// 请求全部完成
	else if (isLoading && requestCount < 1) {
		// 调试模式下显示结束日志
		if (isDebug) {
			console.log(`%c=== ${name} End ===\n`, 'color: #4CAF50; font-weight: bold');
		}
		// 隐藏加载动画
		utils.hideLoading && utils.hideLoading();
		isLoading = false;
	}

	// 防止计数为负数
	if (requestCount < 0) {
		requestCount = 0;
	}

	return isLoading;
}
// 异步函数，用于加载动画
const isClog = process.env.NODE_ENV !== "production"; // 是否开启日志
async function request(name : any, callback : (isLog : boolean) => Promise<any>, apiConfig ?: ApiConfig) {
	// 获取加载文本，默认为"加载中..."
	const loadingText = apiConfig?.loadingText ?? "加载中...";
	// 是否显示加载动画，默认为true
	const isReqLoading = apiConfig?.isReqLoading ?? true;
	// 是否显示错误Toast，默认为true
	const isErrorToast = apiConfig?.isErrorToast ?? true;
	// 是否开启调试模式，默认为false
	const isDebug = apiConfig?.isDebug ?? isClog ?? false;
	
	// 开启延迟，简化调用频率
	await loop() 

	return await throttleExecution(name, async () => {
		// 显示加载动画
		const is_loading = isReqLoading && handleLoading(true, loadingText, name, Boolean(isDebug));
		return await callback(Boolean(is_loading && isDebug)).then((response : any) => {
			// 打印日志
			if (is_loading && isDebug) console.log(response);
			return response;
		}).catch((e : { message : any }) => {
			if (is_loading && isDebug) console.log(e);
			// 出错时显示Toast
			isErrorToast && toast(e?.message || e);
			throw e;
		}).finally(() => {
			// 隐藏加载动画
			isReqLoading && handleLoading(false, loadingText, name, Boolean(isDebug));
			console.log(requestCount, name);
		})
	})
}

export default {
	utils,
	toast,
	loop,
	request,
	handleLoading,
	throttleExecution,
}