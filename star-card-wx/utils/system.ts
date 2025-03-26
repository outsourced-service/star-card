/**
 * 系统信息对象，用于存储和获取设备相关的信息
 */
const SystemInfo = {
	/**
	 * 窗口信息数据，初始为 null，后续通过 uni.getWindowInfo() 获取并缓存
	 */
	data: null,
	/**
	 * 菜单按钮的布局信息，初始为 null，后续通过 uni.getMenuButtonBoundingClientRect() 获取并缓存
	 */
	getMenuButtonBoundingClientRect: null,
}

// 如果 SystemInfo.data 为空，则调用 uni.getWindowInfo() 获取窗口信息并赋值给 SystemInfo.data，实现数据缓存
SystemInfo.data || (SystemInfo.data = uni.getWindowInfo());

/**
 * 获取菜单按钮的布局信息
 * @returns {Object} 菜单按钮的布局信息对象，包含按钮的位置、尺寸等数据
 */
export const getMenuButtonBoundingClientRect = () => {
	return SystemInfo.getMenuButtonBoundingClientRect || (SystemInfo.getMenuButtonBoundingClientRect = uni.getMenuButtonBoundingClientRect())
}

/**
 * 获取状态栏高度
 * @returns {number} 状态栏高度，单位为像素；如果获取失败，则默认返回 15
 */
export const safeHeight = () : number => {
	return SystemInfo.data.statusBarHeight || 15
}

/**
 * 计算菜单按钮的高度
 * @returns {number} 菜单按钮高度，单位为像素；如果设备不支持获取菜单按钮信息，则默认返回 40
 */
export const MenuHeight = () : number => {
	if (uni.getMenuButtonBoundingClientRect) { // 检查是否支持获取菜单按钮布局信息
		let { height, top } = getMenuButtonBoundingClientRect() // 获取菜单按钮的高度和顶部位置
		// 计算公式：(菜单按钮顶部位置 - 状态栏高度) * 2 + 菜单按钮高度
		return (top - safeHeight()) * 2 + height
	} else {
		return 40 // 默认值
	}
}

/**
 * 获取菜单按钮的宽度
 * @returns {number} 菜单按钮宽度的两倍，单位为像素；如果设备不支持获取菜单按钮信息，则返回 undefined
 */
export const MenuWidth = () : number => {
	if (uni.getMenuButtonBoundingClientRect) { // 检查是否支持获取菜单按钮布局信息
		let { width } = getMenuButtonBoundingClientRect() // 获取菜单按钮的宽度
		return width * 2 // 返回宽度的两倍
	}
}

/**
 * 计算导航栏整体高度（包括状态栏和菜单按钮）
 * @returns {number} 导航栏整体高度，单位为像素
 */
export const BarHeight = () : number => MenuHeight() + safeHeight()