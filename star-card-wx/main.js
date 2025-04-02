import App from './App';
import store from './store';
import {pluginsInit} from '@/plugins/index'
import * as System from '@/utils/system'
import * as api from "@/api"

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})

app.use(store);
pluginsInit(app);

app.$mount()
// #endif
uni.$api = api; // 将api挂载到全局
// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  pluginsInit(app);
  app.config.globalProperties.$ImageFormatWebp = "?x-oss-process=image/format,webp"; //webP格式后缀
  app.config.globalProperties.$previewImage = uni.previewImage; //预览图片
  app.config.globalProperties.$setClipboardData = uni.setClipboardData; //设置剪贴版
  
  app.config.globalProperties.$system = System

  return {
    app
  }
}
// #endif