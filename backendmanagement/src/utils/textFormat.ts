/**
 * 将金额转换为中文货币格式
 * @param {number} amount - 需要转换的金额
 * @returns {string} - 转换后的中文货币格式
 */
export function toChineseCurrency(amount: number): string {
    const units = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
    const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    let result = '';
    let integerPart = Math.floor(amount).toString();
    let decimalPart:any = (amount - Math.floor(amount)).toFixed(2).slice(2);
  
    // 处理整数部分
    for (let i = 0; i < integerPart.length; i++) {
      const digit = integerPart[integerPart.length - i - 1] as any;
      result = digits[digit] + units[i] + result;
    }
  
    // 处理小数部分
    if (decimalPart !== '00') {
      result += decimalPart[0] !== '0' ? digits[decimalPart[0]] + '角' : '';
      result += decimalPart[1] !== '0' ? digits[decimalPart[1]] + '分' : '';
    }
  
    return result;
}

/**
 * 截断文本
 * @param {string} text - 需要截断的文本
 * @param {number} maxLength - 截断的最大长度
 * @returns {string} - 截断后的文本
 */
export function truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * 格式化身份证号码
 * @param {string} idCard - 需要格式化的身份证号码
 * @returns {string} - 格式化后的身份证号码
 */
export function formatIDCard(idCard: string): string {
    if (!idCard || idCard.length < 18) return idCard;
    return idCard.replace(/(\d{6})\d{10}(\d{4})/, '$1**********$2');
}

/**
 * 格式化邮箱
 * @param {string} email - 需要格式化的邮箱
 * @returns {string} - 格式化后的邮箱
 */
export function formatEmail(email: string): string {
    if (!email) return email;
    const [localPart, domainPart] = email.split('@');
    const localLen = localPart.length;
    if (localLen <= 2) {
      return email.replace(/./g, '*') + '@' + domainPart;
    }
    return localPart[0] + '*'.repeat(localLen - 2) + localPart[localLen - 1] + '@' + domainPart;
}

/**
 * 格式化货币
 * @param {number} amount - 需要格式化的货币
 * @returns {string} - 格式化后的货币
 */
export function formatCurrency(amount: number): string {
    if (!amount) return '0';
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * 格式化金额
 * @param {number} amountInCents - 需要格式化的金额
 * @returns {string} - 格式化后的金额
 */
export function formatAmount(amountInCents: number): string {
    if (!amountInCents) return '0.00';
    const amountInYuan = amountInCents / 100;
    return amountInYuan.toFixed(2);
}

/**
 * 格式化手机号码
 * @param {string} phone - 需要格式化的手机号码
 * @returns {string} - 格式化后的手机号码
 */
export function formatPhoneNumber(phone: string): string {
    if (!phone || phone.length < 11) return phone;
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 格式化昵称
 * @param {string} nickname - 需要格式化的昵称
 * @returns {string} - 格式化后的昵称
 */
export function formatNickname(nickname: string): string {
    if (!nickname) return nickname;
    const len = nickname.length;
    if (len <= 2) {
      return nickname.replace(/./g, '*');
    }
    return nickname[0] + '*'.repeat(len - 2) + nickname[len - 1];
}


