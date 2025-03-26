/**
 * 验证电子邮箱格式
 * @param {string} value
 * @return {boolean}
 */
export function email(value: string): boolean {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 * @param {string} value
 * @return {boolean}
 */
export function mobile(value: string): boolean {
    return /^1[23456789]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 * @param {string} value
 * @return {boolean}
 */
export function url(value: string): boolean {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/
        .test(value)
}

/**
 * 验证日期格式
 * @param {number | string} value yyyy-mm-dd hh:mm:ss 或 时间戳
 * @return {boolean}
 */
export function date(value: number | string): boolean {
    if (!value) return false;
    // number类型，判断是否是时间戳
    if (typeof value === "number") {
        // len === 10 秒级时间戳 len === 13 毫秒级时间戳
        if (value.toString().length !== 10 && value.toString().length !== 13) {
            return false;
        }
        return !isNaN(new Date(value).getTime());
    }
    if (typeof value === "string") {
        // 是否为string类型时间戳
        const numV = Number(value);
        if (!isNaN(numV)) {
            if (
                numV.toString().length === 10 ||
                numV.toString().length === 13
            ) {
                return !isNaN(new Date(numV).getTime());
            }
        }
        // 非时间戳，且长度在yyyy-mm-dd 至 yyyy-mm-dd hh:mm:ss 之间
        if (value.length < 10 || value.length > 19) {
            return false;
        }
        const dateRegex =
            /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{1,2}:\d{2}(:\d{2})?)?$/;
        if (!dateRegex.test(value)) {
            return false;
        }
        // 检查是否为有效日期
        const dateValue = new Date(value);
        return !isNaN(dateValue.getTime());
    }
    // 非number和string类型，不做校验
    return false;
}

/**
 * 验证ISO类型的日期格式
 * @param {string} value
 * @return {boolean}
 */
export function dateISO(value: string): boolean {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 * @param {string} value
 * @return {boolean}
 */
export function number(value: string): boolean {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
}

/**
 * 验证字符串
 * @param {any} value
 * @return {boolean}
 */
export function string(value: any): boolean {
    return typeof value === 'string'
}

/**
 * 验证整数
 * @param {string} value
 * @return {boolean}
 */
export function digits(value: string): boolean {
    return /^\d+$/.test(value)
}

/**
 * 验证身份证号码
 * @param {string} value
 * @return {boolean}
 */
export function idCard(value: string): boolean {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
        value
    )
}

/**
 * 是否车牌号
 * @param {string} value
 * @return {boolean}
 */
export function carNo(value: string): boolean {
    // 新能源车牌
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
    // 旧车牌
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
    if (value.length === 7) {
        return creg.test(value)
    } if (value.length === 8) {
        return xreg.test(value)
    }
    return false
}

/**
 * 金额,只允许2位小数
 * @param {string} value
 * @return {boolean}
 */
export function amount(value: string): boolean {
    // 金额，只允许保留两位小数
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 中文
 * @param {string} value
 * @return {boolean}
 */
export function chinese(value: string): boolean {
    const reg = /^[\u4e00-\u9fa5]+$/gi
    return reg.test(value)
}

/**
 * 只能输入字母
 * @param {string} value
 * @return {boolean}
 */
export function letter(value: string): boolean {
    return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 * @param {string} value
 * @return {boolean}
 */
export function enOrNum(value: string): boolean {
    // 英文或者数字
    const reg = /^[0-9a-zA-Z]*$/g
    return reg.test(value)
}

/**
 * 验证是否包含某个值
 * @param {string} value
 * @param {string} param
 * @return {boolean}
 */
export function contains(value: string, param: string): boolean {
    return value.indexOf(param) >= 0
}

/**
 * 验证一个值范围[min, max]
 * @param {number} value
 * @param {number[]} param
 * @return {boolean}
 */
export function range(value: number, param: number[]): boolean {
    return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 * @param {string} value
 * @param {number[]} param
 * @return {boolean}
 */
export function rangeLength(value: string, param: number[]): boolean {
    return value.length >= param[0] && value.length <= param[1]
}

/**
 * 是否固定电话
 * @param {string} value
 * @return {boolean}
 */
export function landline(value: string): boolean {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
    return reg.test(value)
}

/**
 * 判断是否为空
 * @param {any} value
 * @return {boolean}
 */
export function empty(value: any): boolean {
    switch (typeof value) {
    case 'undefined':
        return true
    case 'string':
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
        break
    case 'boolean':
        if (!value) return true
        break
    case 'number':
        if (value === 0 || isNaN(value)) return true
        break
    case 'object':
        if (value === null || value.length === 0) return true
        for (const i in value) {
            return false
        }
        return true
    }
    return false
}

/**
 * 是否json字符串
 * @param {string} value
 * @return {boolean}
 */
export function jsonString(value: string): boolean {
    if (typeof value === 'string') {
        try {
            const obj = JSON.parse(value)
            if (typeof obj === 'object' && obj) {
                return true
            }
            return false
        } catch (e) {
            return false
        }
    }
    return false
}

/**
 * 是否数组
 * @param {any} value
 * @return {boolean}
 */
export function array(value: any): boolean {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 是否对象
 * @param {any} value
 * @return {boolean}
 */
export function object(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否短信验证码
 * @param {string} value
 * @param {number} len
 * @return {boolean}
 */
export function code(value: string, len: number = 6): boolean {
    return new RegExp(`^\\d{${len}}$`).test(value)
}

/**
 * 是否函数方法
 * @param {any} value
 * @return {boolean}
 */
export function func(value: any): boolean {
    return typeof value === 'function'
}

/**
 * 是否promise对象
 * @param {any} value
 * @return {boolean}
 */
export function promise(value: any): boolean {
    return object(value) && func(value.then) && func(value.catch)
}

/** 是否图片格式
 * @param {string} value
 * @return {boolean}
 */
export function image(value: string): boolean {
    const newValue = value.split('?')[0]
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
    return IMAGE_REGEXP.test(newValue)
}

/**
 * 是否视频格式
 * @param {string} value
 * @return {boolean}
 */
export function video(value: string): boolean {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i
    return VIDEO_REGEXP.test(value)
}

/**
 * 是否为正则对象
 * @param {any}
 * @return {boolean}
 */
export function regExp(o: any): boolean {
    return o && Object.prototype.toString.call(o) === '[object RegExp]'
}

export default {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
}
