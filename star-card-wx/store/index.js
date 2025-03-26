// 自定义模块
let self_modules = {};

let modulesFiles =
	import.meta.glob('./modules/*.js', {
		eager: true
	});
let modules = {}
for (let mudulePath in modulesFiles) {
	let moduleName = mudulePath.slice(10, -3)
	modules[moduleName] = modulesFiles[mudulePath].default

	// 默认设置为分模块
	modules[moduleName].namespaced = true
	// 所有模块下面都放入一个reqStop state
	modules[moduleName].state = modules[moduleName].state || {}
	// 所有模块下面都载入一个MreqStop mutation
	modules[moduleName].mutations = modules[moduleName].mutations || {}
}


// 自定义模块全部默认开启命名空间
for (let key in self_modules) {
	if (self_modules.namespaced === undefined) {
		self_modules[key].namespaced = true
	}
}


import {
	createStore
} from 'vuex'
let store = createStore({
	modules: {
		...self_modules,
		...modules
	},
	strict: import.meta.env.MODE !== 'production'
})
import.meta.env.MODE !== 'production' && console.log(store);
export default store