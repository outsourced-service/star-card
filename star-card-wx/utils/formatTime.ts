/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @param format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @returns 返回拼接后的时间字符串
 */
export function formatDate(newDate: string | number | Date, format: string): string {
	const date = new Date(newDate)
	let we = date.getDay(); // 星期
	let z = getWeek(date); // 周
	let qut = Math.floor((date.getMonth() + 3) / 3).toString(); // 季度
	const opt: { [key: string]: string } = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		'q+': qut, // 季度
	};
	// 中文数字 (星期)
	const week: { [key: string]: string } = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六',
	};
	// 中文数字（季度）
	const quarter: { [key: string]: string } = {
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
	};
	if (/(W+)/.test(format))
		format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' + week[we] : '周' + week[we]) : week[we]);
	if (/(Q+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 4 ? '第' + quarter[qut] + '季度' : quarter[qut]);
	if (/(Z+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 3 ? '第' + z + '周' : z + '');
	for (let k in opt) {
		let r = new RegExp('(' + k + ')').exec(format);
		// 若输入的长度不为1，则前面补零
		if (r) format = format.replace(r[1], RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, '0'));
	}
	return format;
}

/**
 * 获取当前日期是第几周
 * @param dateTime 当前传入的日期值
 * @returns 返回第几周数字值
 */
export function getWeek(dateTime: Date): number {
	let temptTime = new Date(dateTime.getTime());
	// 周几
	let weekday = temptTime.getDay() || 7;
	// 周1+5天=周六
	temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
	let firstDay = new Date(temptTime.getFullYear(), 0, 1);
	let dayOfWeek = firstDay.getDay();
	let spendDay = 1;
	if (dayOfWeek != 0) spendDay = 7 - dayOfWeek + 1;
	firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
	let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000);
	let result = Math.ceil(d / 7);
	return result;
}

/**
 * 将时间转换为 `几秒前`、`几分钟前`、`几小时前`、`几天前`
 * @param param 当前时间，new Date() 格式或者字符串时间格式
 * @param format 需要转换的时间格式字符串
 * @description param 10秒：  10 * 1000
 * @description param 1分：   60 * 1000
 * @description param 1小时： 60 * 60 * 1000
 * @description param 24小时：60 * 60 * 24 * 1000
 * @description param 3天：   60 * 60* 24 * 1000 * 3
 * @returns 返回拼接后的时间字符串
 */
export function formatPast(param: string | Date, format: string = 'YYYY-mm-dd'): string {
	// 传入格式处理、存储转换值
	let t: any, s: number;
	// 获取js 时间戳
	let time: number = new Date().getTime();
	// 是否是对象
	typeof param === 'string' || 'object' ? (t = new Date(param).getTime()) : (t = param);
	// 当前时间戳 - 传入时间戳
	time = Number.parseInt(`${time - t}`);
	if (time < 10000) {
		// 10秒内
		return '刚刚';
	} else if (time < 60000 && time >= 10000) {
		// 超过10秒少于1分钟内
		s = Math.floor(time / 1000);
		return `${s}秒前`;
	} else if (time < 3600000 && time >= 60000) {
		// 超过1分钟少于1小时
		s = Math.floor(time / 60000);
		return `${s}分钟前`;
	} else if (time < 86400000 && time >= 3600000) {
		// 超过1小时少于24小时
		s = Math.floor(time / 3600000);
		return `${s}小时前`;
	} else if (time < 259200000 && time >= 86400000) {
		// 超过1天少于3天内
		s = Math.floor(time / 86400000);
		return `${s}天前`;
	} else {
		// // 超过3天
		// let date = typeof param === 'string' || 'object' ? new Date(param) : param;
		// return formatDate(date, format);
		// 超过3天
		let date = typeof param === 'string' || 'object' ? new Date(param) : param;
		const currentYear = new Date().getFullYear();
		const year = date.getFullYear();
		// 判断是否是今年
		return formatDate(date, year === currentYear ? format.replace(/YYYY-/, '') : format); // 去掉年份
	}
}

/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns 返回拼接后的时间字符串
 */
export function formatAxis(param: Date): string {
	let hour: number = new Date(param).getHours();
	if (hour < 6) return '凌晨好';
	else if (hour < 9) return '早上好';
	else if (hour < 12) return '上午好';
	else if (hour < 14) return '中午好';
	else if (hour < 17) return '下午好';
	else if (hour < 19) return '傍晚好';
	else if (hour < 22) return '晚上好';
	else return '夜里好';
}


/**
 * 生成指定日期所在月份的日历
 * @param date 输入的日期，类型为 Date 对象，表示需要生成日历的日期
 * @returns 返回一个对象，包含当月的日历和年份信息，日历为二维数组，每行代表一周，数组中的每个元素为完整的日期字符串
 * 
 * @example
 * // 示例：生成2023年10月的日历
 * const calendar = generateCalendar(new Date(2023, 9, 1));
 * console.log(calendar);
 * // 输出：
 * // {
 * //   year: 2023,
 * //   month: 10,
 * //   days: [
 * //     ["2023-09-25", "2023-09-26", "2023-09-27", "2023-09-28", "2023-09-29", "2023-09-30", "2023-10-01"],
 * //     ["2023-10-02", "2023-10-03", "2023-10-04", "2023-10-05", "2023-10-06", "2023-10-07", "2023-10-08"],
 * //     ["2023-10-09", "2023-10-10", "2023-10-11", "2023-10-12", "2023-10-13", "2023-10-14", "2023-10-15"],
 * //     ["2023-10-16", "2023-10-17", "2023-10-18", "2023-10-19", "2023-10-20", "2023-10-21", "2023-10-22"],
 * //     ["2023-10-23", "2023-10-24", "2023-10-25", "2023-10-26", "2023-10-27", "2023-10-28", "2023-10-29"],
 * //     ["2023-10-30", "2023-10-31", "2023-11-01", "2023-11-02", "2023-11-03", "2023-11-04", "2023-11-05"]
 * //   ]
 * // }
 */
export function generateCalendar(date: Date): { year: number, month: number, days: string[][] } {
	const year = date.getFullYear(); // 获取年份
	const month = date.getMonth(); // 获取月份（0-11）
	const firstDay = new Date(year, month, 1); // 获取该月的第一天
	const lastDay = new Date(year, month + 1, 0); // 获取该月的最后一天

	const calendar: string[][] = []; // 初始化日历数组

	// 计算本月第一天是周几
	const startDay = (firstDay.getDay() || 7) + 1; // 计算第一周的开始天数，周日为7
	const fillDays = ((startDay - 1) % 7); // 计算需要填充的天数

	// 填充本月第一天之前的日期
	for (let i = fillDays; i > 0; i--) {
		const day = new Date(year, month, 1 - i).getDate(); // 获取上个月的日期
		if (!calendar[0]) calendar[0] = [];
		calendar[0].push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
	}

	// 填充当前月的日期
	for (let day = 1; day <= lastDay.getDate(); day++) {
		if (!calendar[calendar.length - 1] || calendar[calendar.length - 1].length === 7) {
			calendar.push([]);
		}
		calendar[calendar.length - 1].push(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
	}

	// 如果最后一周不满7天，填充下一个月的第一周，从1号开始
	while (calendar[calendar.length - 1] && calendar[calendar.length - 1].length < 7) {
		const nextDay = calendar[calendar.length - 1].length + 1;
		const nextMonth = month + 1 === 12 ? 0 : month + 1; // 处理跨年
		const nextYear = nextMonth === 0 ? year + 1 : year; // 处理跨年
		calendar[calendar.length - 1].push(`${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-01`);
	}

	return { year, month: month + 1, days: calendar }; // 返回生成的日历和年份信息
}