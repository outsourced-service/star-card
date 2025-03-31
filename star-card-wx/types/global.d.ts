// 申明外部 npm 插件模块
declare module 'uv-ui';
declare module 'vue';
declare const uni : any;


// 声明一个模块，防止引入文件时报错
declare module '*.json';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.scss';
declare module '*.ts';
declare module '*.js';
declare module '*.mjs';

// 声明扩展Array接口  
interface Array<T> { }

interface ImportMeta {
	glob : any;
}
