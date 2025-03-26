import { CombinedVueInstance, Vue } from 'vue/types/vue';
import uvUI from '@/uni_modules/uv-ui-tools'
import { App } from 'e:/hbuilderx/plugins/hbuilderx-language-services/builtin-dts/common/vue2and3';

export function pluginsInit(app: CombinedVueInstance<Vue, object, object, object, Record<never, any>> | App<Element>) {
    app.use(uvUI);
}