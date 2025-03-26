let _boundaryCheckingState = true; // 是否进行越界检查的全局开关

/**
 * 把错误的数据转正
 * @private
 * @param {number} num 输入数
 * @param {number} precision 精度，默认为15
 * @example strip(0.09999999999999998)=0.1
 */
export function strip(num: number, precision: number = 15): number {
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * Return digits length of a number
 * @private
 * @param {number} num Input number
 * @returns {number} 返回数字的位数长度
 */
export function digitLength(num: number): number {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数,如果是小数则放大成整数
 * @private
 * @param {number} num 输入数
 * @returns {number} 返回转换后的整数
 */
export function float2Fixed(num: number): number {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @private
 * @param {number} num 输入数
 */
export function checkBoundary(num: number): void {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      // eslint-disable-next-line no-console
      console.warn(`${num} 超出了精度限制，结果可能不正确`);
    }
  }
}

/**
 * 把递归操作扁平迭代化
 * @param {number[]} arr 要操作的数字数组
 * @param {(a: number, b: number) => number} operation 迭代操作
 * @private
 * @returns {number} 返回迭代操作的结果
 */
export function iteratorOperation(arr: number[], operation: (a: number, b: number) => number): number {
  const [num1, num2, ...others] = arr;
  let res = operation(num1, num2);

  others.forEach((num) => {
    res = operation(res, num);
  });

  return res;
}

/**
 * 高精度乘法
 * @export
 * @param {...number} nums 要相乘的数字
 * @returns {number} 返回乘法结果
 */
export function times(...nums: number[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }

  const [num1, num2] = nums;
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

/**
 * 高精度加法
 * @export
 * @param {...number} nums 要相加的数字
 * @returns {number} 返回加法结果
 */
export function plus(...nums: number[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, plus);
  }

  const [num1, num2] = nums;
  // 取最大的小数位
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 高精度减法
 * @export
 * @param {...number} nums 要相减的数字
 * @returns {number} 返回减法结果
 */
export function minus(...nums: number[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, minus);
  }

  const [num1, num2] = nums;
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 高精度除法
 * @export
 * @param {...number} nums 要相除的数字
 * @returns {number} 返回除法结果
 */
export function divide(...nums: number[]): number {
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }

  const [num1, num2] = nums;
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // 重要，这里必须用strip进行修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

/**
 * 四舍五入
 * @export
 * @param {number} num 要四舍五入的数字
 * @param {number} ratio 小数位数
 * @returns {number} 返回四舍五入后的数字
 */
export function round(num: number, ratio: number): number {
  const base = Math.pow(10, ratio);
  let result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  // 位数不足则补0
  return result;
}

/**
 * 是否进行边界检查，默认开启
 * @param {boolean} flag 标记开关，true 为开启，false 为关闭，默认为 true
 * @export
 */
export function enableBoundaryChecking(flag: boolean = true): void {
  _boundaryCheckingState = flag;
}


export default {
  times,
  plus,
  minus,
  divide,
  round,
  enableBoundaryChecking,
};
