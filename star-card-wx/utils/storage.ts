const __NEXT_NAME__ = 'starCard'; // 项目名称

/**
 * Local 本地永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method getInfo 获取storage配置
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
	// 设置永久缓存
	set(key : any, val : any) {
		uni.setStorage({
			key: this.setKey(key),
			data: val,
		});
	},
	// 获取永久缓存
	get(key : any) {
		return new Promise((resolve, reject) => {
			uni.getStorage({
				key: this.setKey(key),
				success: (res: { data: unknown; }) => resolve(res.data),
				fail: (err: any) => reject(err),
			});
		});
	},
	// 获取storage配置
	getInfo(key : any) {
		return new Promise((resolve, reject) => {
			uni.getStorageInfo({
				key: this.setKey(key),
				success: (res: unknown) => resolve(res),
				fail: (err: any) => reject(err),
			});
		});
	},
	// 移除永久缓存
	remove(key : any) {
		uni.removeStorage({
			key: this.setKey(key),
		});
	},
	// 移除全部永久缓存
	clear() {
		uni.clearStorage();
	},
	// 查看 v2.4.3版本更新日志
	setKey(key : any) {
		return `${__NEXT_NAME__}:${key}`;
	},
};

/**
 * LocalSync 本地永久缓存同步方法
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method getInfo 获取storage配置
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const LocalSync = {
	// 设置永久缓存
	set(key : any, val : any) {
		uni.setStorageSync(this.setKey(key), val);
	},
	// 获取永久缓存
	get(key : any) {
		return uni.getStorageSync(this.setKey(key));
	},
	// 获取storage配置
	getInfo() {
		return uni.getStorageInfoSync();
	},
	// 移除永久缓存
	remove(key : any) {
		uni.removeStorageSync(this.setKey(key));
	},
	// 移除全部永久缓存
	clear() {
		uni.clearStorageSync();
	},
	// 查看 v2.4.3版本更新日志
	setKey(key : any) {
		return `${__NEXT_NAME__}:${key}`;
	},
};