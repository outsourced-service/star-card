import utils from "./utils";
import EzCloudBase from "ezcloudbase";
import ezConfigJson from "@/ez.config.json";
import createCurd from "./curd";
import { ApiConfig } from "@/types/ezInstance";
// 实例化EzCloudBase并解构出EzServer
const ezserver = new EzCloudBase.EzServer(ezConfigJson);
const ezclient = new EzCloudBase.EzClient(ezConfigJson);

const isClog = process.env.NODE_ENV !== "production"; // 是否开启日志

// 异步函数，用于调用SCF函数
async function api(scf_dir: string, scf_name: string, payload?: any, apiConfig?: ApiConfig) {
    // 获取加载文本，默认为"加载中..."
    const loadingText = apiConfig?.loadingText ?? "加载中...";
    // 是否显示加载动画，默认为true
    const isReqLoading = apiConfig?.isReqLoading ?? true;
    // 是否显示错误Toast，默认为true
    const isErrorToast = apiConfig?.isErrorToast ?? true;
    // 是否开启调试模式，默认为false
    const isDebug = apiConfig?.isDebug ?? isClog ?? false;
    // 显示加载动画
    const is_loading = isReqLoading && utils.handleLoading(true, loadingText, Boolean(isDebug));

    // 开启延迟，简化调用频率
    await utils.loop()

    // 打印日志
    if (is_loading && isDebug) console.log({ scf_dir, scf_name, payload });

    // 调用SCF函数
    return utils.throttleExecution(`${scf_dir}-${scf_name}`, async () => await ezserver.callScf({
        scf_dir,
        scf_name,
        payload,
    }).then((response: any) => {
        // 打印日志
        if (is_loading && isDebug) console.log(response);
        return response;
    }).catch((e: { message: any }) => {
        if (is_loading && isDebug) console.log(e);
        // 出错时显示Toast
        isErrorToast && utils.toast(e?.message || e);
        throw e;
    }).finally(() => {
        // 隐藏加载动画
        isReqLoading && utils.handleLoading(false);
    }));
}

// 导出相关变量和函数
export default {
    ...utils,
    ezserver,
    ezclient,
    api,
    createCurd,
};
