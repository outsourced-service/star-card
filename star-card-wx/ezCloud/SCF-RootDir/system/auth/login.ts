// @ts-nocheck
const LOGIN = {
    /**
     * 小程序登录，创建账户，返回jwt token
     * @param {string} code 小程序登录凭证
     * @returns {Object} 包含登录信息和jwt token的对象
     */
    loginWithWechatMiniApp: (code) => ({
        name: "loginWithWechatMiniApp",
        args: {
            code: code,
            createIfNotExists: true // 如果用户不存在，则创建新用户
        },
        fields: `account{ email id permissionRoles phoneNumber profileImageUrl roles{ id name } thirdPartyInfo{ provider userInfo{ name openId type unionId } } username } jwt{ token }` // 查询字段，包括账户信息和jwt token
    }),
    /**
     * 微信H5登录，创建账户，返回jwt token
     * @param {string} code 微信H5登录凭证
     * @returns {Object} 包含登录信息和jwt token的对象
     */
    loginWithWechat: (code) => ({
        name: "loginWithWechat",
        args: {
            code: code,
            createIfNotExists: true // 如果用户不存在，则创建新用户
        },
        fields: `account{ email id permissionRoles phoneNumber profileImageUrl roles{ id name } thirdPartyInfo{ provider userInfo{ name openId type unionId } } username } jwt{ token }` // 查询字段，包括账户信息和jwt token
    }),
    /**
     * 用户名和密码登录, 返回app的jwt
     * @param {string} password 用户密码
     * @param {string} name 用户名
     * @returns {Object} 包含登录信息和jwt token的对象
     */
    loginWithPassword: (password, name) => ({
        name: "loginWithPassword",
        args: {
            password: password,
            name: name
        },
        fields: `account{ email id permissionRoles phoneNumber profileImageUrl roles{ id name } thirdPartyInfo{ provider userInfo{ name openId type unionId } } username } jwt{ token }` // 查询字段，包括账户信息和jwt token
    }),
    /**
     * 手机号登录，注册账户，返回jwt token
     * @param {string} password 用户密码
     * @param {string} phoneNumber 手机号
     * @param {boolean} registerIfNotExists 如果用户不存在，是否注册
     * @param {string} wechatLoginCode 微信登录凭证
     * @param {string} verificationCode 手机验证码
     * @returns {Object} 包含登录信息和jwt token的对象
     */
    loginWithPhoneNumber: (password, phoneNumber, registerIfNotExists, wechatLoginCode, verificationCode) => ({
        name: "loginWithPhoneNumber",
        args: {
            password: password,
            phoneNumber: phoneNumber,
            registerIfNotExists: registerIfNotExists, // 如果用户不存在，则注册新用户
            wechatLoginCode: wechatLoginCode,
            verificationCode: verificationCode
        },
        fields: `account{ email id permissionRoles phoneNumber profileImageUrl roles{ id name } thirdPartyInfo{ provider userInfo{ name openId type unionId } } username } jwt{ token }` // 查询字段，包括账户信息和jwt token
    }),
}
const { getPayload, parseJwtToken, getClientinfo } = ezcloud;
// 获取请求参数
const payload = getPayload();
const { operationType, ...args } = payload; // 假设 operationType 是请求中传入的操作类型

// 1. 获取操作类型判断使用哪一种登录方式
let loginMethod;
switch (operationType) {
    case 'loginWithWechatMiniApp':
        loginMethod = LOGIN.loginWithWechatMiniApp(args.code);
        break;
    case 'loginWithWechat':
        loginMethod = LOGIN.loginWithWechat(args.code);
        break;
    case 'loginWithPassword':
        loginMethod = LOGIN.loginWithPassword(args.password, args.name);
        break;
    case 'loginWithPhoneNumber':
        loginMethod = LOGIN.loginWithPhoneNumber(args.password, args.phoneNumber, args.registerIfNotExists, args.wechatLoginCode, args.verificationCode);
        break;
    default:
        return ezcloud.fail(payload, "无效的登录方式");
}

// 2. 通过获取的登录方式验证传入值，并执行请求
const result = ezcloud.mutation(loginMethod);

// 3. 对返回值进行分类并格式化
if (result && result.jwt) {
    // 登录成功，返回用户信息和token
    return ezcloud.success({
        account: result.account,
        token: result.jwt.token
    }, "登录成功");
} else {
    // 登录失败，返回错误信息
    return ezcloud.fail(payload, "登录失败，请检查凭证");
}