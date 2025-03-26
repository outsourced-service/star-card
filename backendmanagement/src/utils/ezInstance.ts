/* eslint-disable no-console */
import EzCloudBase from "ezcloudbase";
import ezConfigJson from "../../ez.config.json";

// 实例化EzCloudBase并解构出EzServer
const ezserver = new EzCloudBase.EzServer(ezConfigJson);
const ezclient = new EzCloudBase.EzClient(ezConfigJson);

let isApiInited = false;
// 加载状态控制变量
let is_loading = false; // 是否正在显示加载动画
let dealLoading_times = 0; // 加载动画调用次数，防止重复调用
let isClog = process.env.NODE_ENV !== "production"; // 是否开启日志
// 定制请求loading和错误toast的代码
import { ElMessage, ElLoading } from 'element-plus';
let loadingService: any = null; // loading实例
const utils = {
	showLoading: (info: any) => {
		if (!loadingService) {
			loadingService = ElLoading.service({
				lock: info?.mask,
				text: info?.content || 'loading',
				background: 'rgba(0, 0, 0, .7)',
			});
		}
	},
	hideLoading: () => {
		if (loadingService) {
			loadingService.close();
			loadingService = null;
		}
	},
	showToast: (info: any) => {
		ElMessage.error(info?.content || 'error');
	},
	hindToast: () => { },
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
// 控制加载动画的显示与隐藏
function changeloading(dealLoading = true, title = "") {
	// 更新加载动画调用次数
	if (dealLoading) dealLoading_times++;
	else dealLoading_times--;

	// 根据加载动画调用次数控制加载动画的显示与隐藏
	if (!is_loading && dealLoading_times > 0) {
		is_loading = true;
		isClog && console.log(`\n\n%c======>loading_start.............>`, 'color: #0055ff')
		utils.showLoading &&
			utils.showLoading({
				title: <any>title,
				mask: true,
			});
	} else if (is_loading && dealLoading_times === 0) {
		isClog && console.log(`%c======<loading_end================<\n\n`, 'color: #0055ff')
		utils.hideLoading && utils.hideLoading();
		is_loading = false;
	} else if (dealLoading_times < 0) {
		dealLoading_times = 0;
	}
	return is_loading;
}

type ApiConfig = {
	loadingText?: string;
	isReqLoading?: boolean;
	isErrorToast?: boolean;
}

// 封装API调用函数
async function api(
	scf_dir: string,
	scf_name: string,
	payload?: any,
	apiConfig?: ApiConfig
) {
	const loadingText = apiConfig?.loadingText ?? "加载中...";
	const isReqLoading = apiConfig?.isReqLoading ?? false;
	const isErrorToast = apiConfig?.isErrorToast ?? true;

	// 显示加载动画
	const is_loading = isReqLoading && changeloading(true, loadingText);
	if (is_loading && isClog) console.log({ scf_dir, scf_name, payload });
	async function loop(): Promise<any> {
		if (!isApiInited) return
		await new Promise((resolve) => setTimeout(resolve, 50));
		return await loop()
	}
	await loop()
	// 调用SCF函数
	return await ezserver
		.callScf({
			scf_dir,
			scf_name,
			payload,
		})
		.then((response: any) => {
			if (is_loading && isClog) console.log(response);
			return response;
		})
		.catch((e: { message: any }) => {
			if (is_loading && isClog) console.log(e);
			// 出错时显示Toast
			isErrorToast && toast(e?.message || e);
			throw e;
		})
		.finally(() => {
			// 隐藏加载动画
			isReqLoading && changeloading(false);
		});
}

// 初始化API
const throttleMap: { [key: string]: boolean } = {}; // 用于存储不同 API 的节流状态
const apiPromises: { [key: string]: Promise<any> | null } = {}; // 用于存储正在进行的 API 请求的 Promise

// 导出相关变量和函数
export default {
	apiInit: (status: boolean = true) => {
		isApiInited = status;
		return isApiInited;
	},
	api: async (scf_dir: string, scf_name: string, payload?: any, apiConfig?: any) => {
		const key = `${scf_dir}-${scf_name}`; // 生成唯一的节流键
		if (throttleMap[key]) return apiPromises[key]; // 如果节流键存在，返回正在进行的请求的 Promise

		throttleMap[key] = true; // 设置节流状态为 true
		// 发起 API 请求并存储 Promise
		apiPromises[key] = api(scf_dir, scf_name, payload, apiConfig).finally(() => {
			throttleMap[key] = false; // 请求完成后重置节流状态
		});
		return apiPromises[key]; // 返回请求的 Promise
	},
	ezserver,
	ezclient,
	EzCloudBase,
	uploadImage: ezclient.uploadImage,
	uploadFile: ezclient.uploadFile,
	uploadVideo: ezclient.uploadVideo,
};