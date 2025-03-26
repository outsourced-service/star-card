import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from '/@/App.vue';
import router from '/@/router';
import { directive } from '/@/directive/index';
import { i18n } from '/@/i18n/index';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import '/@/theme/index.scss';
import VueGridLayout from 'vue-grid-layout';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus, {
	locale: zhCn,
}).use(i18n).use(VueGridLayout);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.config.globalProperties.$ImageFormatWebp = "?x-oss-process=image/format,webp";

app.mount('#app');