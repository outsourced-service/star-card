# 星卡项目说明

## 项目概述

本项目包含两个主要部分：
1. 移动端应用（star-card-wx）：基于 uni-app + Vue 3 开发的移动端应用
2. 后台管理系统（backendmanagement）：基于 Vue 的后台管理系统

## 移动端应用（star-card-wx）

### 技术栈
- 框架：uni-app
- 核心框架：Vue 3
- UI组件库：
  - uv-ui（https://www.uvui.cn/）
  - uni-ui（https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html）

### 项目结构
```
star-card-wx/
├── api/                // API 请求相关文件
├── components/         // Vue 组件
├── mock/              // 模拟数据
├── assets/            // 静态资源
├── store/             // Vuex 状态管理
├── pages/             // 页面视图
├── router/            // 路由配置
├── utils/             // 工具函数
├── plugins/           // 插件配置
├── uni_modules/       // uni-app 模块
└── common/            // 公共文件
```

### 分包说明
项目采用分包加载策略，包含以下分包：
- tabel：主入口分包（5个 tab 页面）
- home：主页功能分包
- shop：商城功能分包
- card：卡牌功能分包
- order：订单功能分包
- profile：个人中心功能分包

## 后台管理系统（backendmanagement）

### 开发环境要求
- Node.js >= v16.20.2
- npm >= v8.19.4

### 项目结构
```
backendmanagement/
├── mock/              // 模拟数据
├── public/            // 静态资源
├── src/               // 源代码
│   ├── api/           // 接口请求
│   ├── assets/        // 静态资源
│   ├── components/    // 公共组件
│   ├── config/        // 全局配置
│   ├── layout/        // 布局组件
│   ├── router/        // 路由配置
│   ├── store/         // 状态管理
│   ├── views/         // 页面视图
│   └── utils/         // 工具函数
└── tests/             // 测试文件
```

### 开发命令
```bash
# 安装依赖
yarn install --frozen-lockfile

# 开发环境
npm run dev

# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod

# 预览
npm run preview

# 代码检查
npm run lint
npm run lint -- --fix
```

## 注意事项
1. 建议使用 yarn 而不是 cnpm 安装依赖
2. 移动端项目使用分包加载优化性能
3. 后台管理系统支持多环境构建
