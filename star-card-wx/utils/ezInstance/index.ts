import utils from "./utils";
import EzCloudBase from "ezcloudbase";
import ezConfigJson from "@/ez.config.json";
import { ApiConfig } from "@/types/ezInstance";

// 实例化EzCloudBase并解构出EzServer
const ezserver = new EzCloudBase.EzServer(ezConfigJson);
const ezclient = new EzCloudBase.EzClient(ezConfigJson);

// 异步函数，用于调用SCF函数
async function api(scf_dir: string, scf_name: string, payload?: any, apiConfig?: ApiConfig) {
    return await utils.request(`${scf_dir}-${scf_name}`, async () => await ezserver.callScf({ scf_dir, scf_name, payload }), apiConfig)
}

// 导出相关变量和函数
export default {
    ...utils,
    ezserver,
    ezclient,
    api,
};
