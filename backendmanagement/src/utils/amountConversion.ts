// 定义货币单位换算关系（同一国家内的货币单位换算）
const currencyUnits = {
    '人民币': {
        '分': 0.01,
        '角': 0.1,
        '元': 1
    },
    '美元': {
        'cent': 0.01,
        'dollar': 1
    },
    '欧元': {
        'cent': 0.01,
        'euro': 1
    },
    '日元': {
        'yen': 1
    },
    '港币': {
        '分': 0.01,
        '港元': 1
    }
} as {[key: string]: {[key: string]: number}};

// 定义汇率配置（不同国家货币之间的汇率）
const exchangeRates = {
    '人民币': {
        '美元': 0.1393,
        '欧元': 0.1365,
        '日元': 18.10,
        '港币': 0.8778
    },
    '美元': {
        '人民币': 7.1819,
        '欧元': 0.9793,
        '日元': 129.93,
        '港币': 6.3025
    },
    '欧元': {
        '人民币': 7.3387,
        '美元': 1.0212,
        '日元': 132.72,
        '港币': 6.4551
    },
    '日元': {
        '人民币': 0.0552,
        '美元': 0.0077,
        '欧元': 0.0075,
        '港币': 0.0523
    },
    '港币': {
        '人民币': 1.1407,
        '美元': 0.1587,
        '欧元': 0.1549,
        '日元': 19.11
    }
} as {[key: string]: {[key: string]: number}};

/**
 * 货币单位换算函数
 * @param {number} value - 要换算的数值
 * @param {string} fromCurrency - 源货币（如'人民币'、'美元'等）
 * @param {string} fromUnit - 源单位（如'分'、'角'、'元'、'cent'、'dollar'等）
 * @param {string} toCurrency - 目标货币（如'人民币'、'美元'等）
 * @param {string} toUnit - 目标单位（如'分'、'角'、'元'、'cent'、'dollar'等）
 * @returns {number} 换算后的数值
 */
export function convertCurrency(value: number, fromCurrency: string, fromUnit: string, toCurrency: string, toUnit: string) {
    // 检查货币和单位是否合法
    if (!(fromCurrency in currencyUnits) || !(toCurrency in currencyUnits)) {
        throw new Error('货币类型不支持');
    }
    if (!(fromUnit in currencyUnits[fromCurrency]) || !(toUnit in currencyUnits[toCurrency])) {
        throw new Error('货币单位不支持');
    }

    // 将源货币单位转换为基准单位（如人民币的元、美元的dollar等）
    const baseValue = value * currencyUnits[fromCurrency][fromUnit];

    // 如果源货币和目标货币相同，直接换算单位
    if (fromCurrency === toCurrency) {
        const result = baseValue / currencyUnits[toCurrency][toUnit];
        return Math.round(result * 100) / 100; // 四舍五入到小数点后两位
    }

    // 如果源货币和目标货币不同，使用汇率换算
    if (!(fromCurrency in exchangeRates) || !(toCurrency in exchangeRates[fromCurrency])) {
        throw new Error('不支持的货币汇率换算');
    }
    const exchangeRate = exchangeRates[fromCurrency][toCurrency];
    const convertedValue = baseValue * exchangeRate;

    // 将换算后的值转换为目标货币单位
    const result = convertedValue / currencyUnits[toCurrency][toUnit];
    return Math.round(result * 100) / 100; // 四舍五入到小数点后两位
}

// 人民币 元 转 分
export function convertCNYtoCent(value: number) {
    return convertCurrency(value, '人民币', '元', '人民币', '分');
}