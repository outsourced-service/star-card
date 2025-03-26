# 项目说明

这是一个基于 `uni-app` 的项目，使用 `Vue 3` 及其相关生态系统。项目主要使用 `uv-ui` 组件库（https://www.uvui.cn/），辅以 `uni-ui`（https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html）。该项目旨在提供一个高效、可扩展的移动端应用开发框架。

# 项目结构说明

以下是项目的基本结构说明：

- **api/**: 存放 API 请求相关的文件。
- **components/**: 存放 Vue 组件。
- **mock/**: 存放项目的模拟数据。
- **assets/**: 存放静态资源，如图片、样式等。
  - **images/**: 存放图片资源。
  - **styles/**: 存放样式文件。
- **store/**: Vuex 状态管理相关文件。
- **pages/**: 存放页面视图文件。
- **router/**: 路由配置文件。
- **utils/**: 工具函数文件。
- **plugins/**: 插件相关文件。
- **uni_modules/**: 存放从 `uni-app` 上下载的模块和组件，类似于 `node_modules`。
- **package.json**: 项目依赖配置文件。
- **README.md**: 项目说明文件。
- **uni.config.js**: `uni-app` 配置文件。
- **.gitignore**: Git 忽略文件配置。
- **common/**: 存放公共文件，如常量、工具函数等。

# 示例项目结构

```plaintext
uni-app-project/
│
├── api/
│   └── index.js
├── components/
│   └── ExampleComponent.vue
├── mock/
│   └── data.json
├── assets/
│   ├── images/
│   └── styles/
├── store/
│   └── index.js
├── pages/
│   └── index/index.vue
├── router/
│   └── index.js
├── utils/
│   └── helper.js
├── plugins/
│   └── uv-ui.js
├── node_modules/
├── uni_modules/
│   ├── uni-ui          //uni组件
│   └── uv-ui           //uv组件
│
├── package.json
├── README.md
└── uni.config.js
```

# 说明

- **api/**: 这里存放所有与后端 API 交互的代码。
- **components/**: 这里存放项目中可复用的 Vue 组件。
- **mock/**: 这里存放用于开发阶段的模拟数据。
- **assets/**: 这里存放项目的静态资源，包括图片和样式文件。
- **store/**: 这里存放 Vuex 的状态管理文件。
- **pages/**: 这里存放项目的页面视图文件。
- **router/**: 这里存放项目的路由配置。
- **utils/**: 这里存放项目的工具函数。
- **plugins/**: 这里存放项目使用的插件配置。
- **uni_modules/**: 这里存放从 `uni-app` 上下载的模块和组件，类似于 `node_modules`。

# 路由和分包说明

项目中配置了 5 个主要的 tabel 页面，每个页面都有一个属于它的子包。以下是分包的详细信息：

- **tabel**: 位于 `pages/tabel`，入口分包，只有5个页面分包是每个分包的主人口。

- **主页**: 位于 `pages/home`，包含主页的相关功能。
- **商城**: 位于 `pages/shop`，包含商城的相关功能。
- **卡牌**: 位于 `pages/card`，包含卡牌的相关功能。
- **订单**: 位于 `pages/order`，包含订单的相关功能。
- **我的**: 位于 `pages/profile`，包含用户个人中心的相关功能。

每个分包都在 `pages.json` 中进行了配置，确保应用的路由和页面加载的高效性。

# 示例项目结构

```plaintext
│   
├─card                  // 卡牌功能分包
│  ├─components         // 所属分包组件
│  └─...                // 其他文件
│             
├─home                  // 首页功能分包
│  ├─components         
│  └─...
│              
├─order                 // 订单功能分包
│  ├─components         
│  └─...
│   
├─profile               // 卡牌功能分包
│  ├─components
│  └─...
│   
├─shop                  // 商城功能分包
│  ├─components
│  └─...
│   
└─tabel                  // 主入口分包
   ├─card.vue            // 卡牌页面
   ├─home.vue            // 主页页面
   ├─order.vue           // 订单页面
   ├─profile.vue         // 个人中心页面
   └─shop.vue            // 商城页面

```
