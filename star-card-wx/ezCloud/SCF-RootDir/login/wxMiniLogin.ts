// @ts-nocheck
// 使用微信code 实现用户默认注册登录
const { query, mutation, callScf, fail, success, genJwtToken, parseJwtToken } = ezcloud;
const payload = ezcloud.getPayload();
// 基础信息
const wxCode = payload?.code ?? ''; // 微信code
const accountID = payload?.accountID ?? ''; // accountID
const inviteCode = payload?.inviteCode ?? '' // 邀请码
const isRegisterAuto = payload?.isRegisterAut ?? true; // 是否自动注册

// 绑定手机号需要的信息
// 绑定手机号需要的信息
const isMobileBindingForced = payload?.isMobileBindingForced || false; // 是否强制绑定手机号
const isMobileVerificationRequired = payload?.isMobileVerificationRequired || false; // 是否需要手机验证码验证手机号
const mobile = payload?.mobile || ''; // 手机号
const verificationCode = payload?.verificationCode || ''; // 验证码

const expires_in = 60 * 60 * 2; // token 过期时间
const returnToken = (userToken = {}, jwtToken) => ezcloud.success({
    userToken: genJwtToken({
        ...(userToken || {}),
        expires_in: Date.now() + expires_in * 1000,
    }),
    userID: userToken.id,
    expires_in,
    jwtToken
})

const getUser = (where, fields = "id") => query({
    name: "user", args: { limit: 1, where }, fields
})?.[0] ?? null;

// 1. 通过wxCode 或者 accountID 获取账户信息
if (!wxCode && !accountID) return fail('wxCode or accountID is required', 1002);
const { account, token: jwt_token } = registerAccount(wxCode, accountID);
// 2.绑定手机号
const mobileBindingData = mobileBinding(account, isMobileBindingForced, isMobileVerificationRequired, mobile, verificationCode);
account.fz_phone_number = mobileBindingData?.mobile ?? account?.fz_phone_number ?? null;

// 2.通过account 查找用户，如果存在则直接返回token，如果不存在则注册用户
const userData = getUser({ account: { id: { _eq: account.id } } });
if (userData) return returnToken(userData, jwt_token);

if (!isRegisterAuto) return fail('user not found', 1001);
// 3. 注册用户
const newUser = {
    ...register(account),
    ...payload?.user ?? {}, // 如果有用户信息则使用用户信息，否则使用默认信息
};
const GQL = [{
    name: "insert_user_one",
    args: { object: newUser },
    fields: "id"
}]
// 4. 是否有邀请码，如果有则更新邀请码
if (inviteCode) {
    const [inviteUser] = (inviteCode && getUser({ user_id: { _eq: inviteCode } })) || [{ id: null }];
    newUser.user_inviteparent_user = inviteUser.id;
    // 记录日志
    GQL.push({
        name: "insert_user_logs_one",
        args: {
            object: {
                user_user: inviteUser.id,
                type: "邀请",
                title: "邀请成功",
                content: `用户 ${newUser.username} 通过邀请码 ${inviteCode} 注册成功`,
                attach_data: {}
            }
        }
    })
}
// 5.是否通过手机验证码注册

// 6. 执行注册
const { response: result } = ezcloud.operate({
    opMethod: "mutation",
    opName: "create",
    opFields: GQL
})

// 7. 绑定账户和用户
const updateAccount = ezcloud.mutation({
    name: "update_account_by_pk",
    args: {
        pk_columns: { id: account.id },
        _set: { user_user: result.insert_user_one.id }
    },
    fields: "id user_user"
})

// 7. 返回token
return returnToken({
    id:updateAccount?.user_user,
}, jwt_token);

function register(account, i = 0) {
    const username = generateUserId('', i, 2)
    return {
        user_inviteparent_user: null,
        user_id: username,
        username: 'u_' + username,
        nickname: account?.username || username,
        password: account?.password,
        avatar_id: account?.profile_image_id ?? null,
        mobile: account?.fz_phone_number ?? null,

        score: 0,
        growth_value: 0,
        role: "个人用户",
        is_authentication: false,
        is_personal: false,
        is_recommend: false,

        attach_data: {},
        user_acc: {
            data: [{
                type: "zionAccountId登录",
                acc_val: `${account.id}`
            }]
        },
        user_logs: {
            data: [{
                type: "注册",
                title: "注册成功",
                content: "通过微信静默登录注册成功",
                attach_data: {}
            }]
        }
    }
}

// 生成用户ID
function generateUserId(prefix = 'U', index = 0, num = 2) {
    // 获取当前时间戳（格式化为 YYYYMMDDHHMMSS）
    const datetime = new Date().toISOString().slice(0, 19).replace(/[-:.T]/g, '');

    // 生成随机序列（长度为 num 的随机数字）
    const randomSerial = Math.floor(Math.random() * (10 ** num)).toString().padStart(num, '0');

    // 将索引转换为两位数的字符串
    const number = index.toString().padStart(2, '0');

    // 定义字符集
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // 将时间戳、索引和随机序列拼接成一个字符串
    const identifier = `${datetime}${number}${randomSerial}`;

    // 将 identifier 转换为 Base62 编码
    let code = '';
    let base62Value = BigInt(identifier); // 直接将字符串转换为 BigInt
    while (base62Value > 0n) { // 使用 0n 表示 BigInt 的零值
        const remainder = base62Value % 62n; // 使用 62n 表示 62 的 BigInt 类型
        code = alphabet[remainder] + code;
        base62Value = base62Value / 62n; // 使用 62n 表示 62 的 BigInt 类型
    }

    return `${prefix}${code}`;
}

// 查询字段，包括账户信息和jwt token
function registerAccount(code, accountID) {
    const { account, jwt } = code ? mutation({
        name: "loginWithWechatMiniApp",
        args: {
            code: code,
            createIfNotExists: true // 如果用户不存在，则创建新用户
        },
        fields: "account{id}, jwt{token}"
    }) : {
        account: { id: accountID },
        jwt: { token: '' }
    }
    return {
        account: query({
            name: 'account_by_pk',
            args: { id: account.id },
            fields: 'id username password oauth2_user_info_map updated_at created_at profile_image_id fz_deleted fz_phone_number fz_email user_user'
        }),
        token: jwt.token,
    }
}

// 函数mobileBinding用于绑定手机号，参数isMobileBindingForced表示是否强制绑定手机号，isMobileVerificationRequired表示是否需要验证手机号，mobile表示手机号，verificationCode表示验证码输入框
function mobileBinding(account, isMobileBindingForced = false, isMobileVerificationRequired = false, mobile = '', verificationCode = '') {
    // 如果强制绑定手机号，那手机号就不能为空
    if (isMobileBindingForced && !mobile) return fail('mobile binding required', 1001);
    // 如果需要验证手机号，则验证验证码是否正确
    if (isMobileVerificationRequired && !mobileVerifyCode(mobile, verificationCode)) return fail('verificationCode code required', 1001);
    // 如果手机号不为空，则更新用户信息
    if (mobile) return mutation({
        name: 'account_by_pk',
        args: {
            pk_columns: { id: account.id },
            _set: { fz_phone_number: mobile }
        },
        fields: "fz_phone_number"
    })
    return {}
}
// 验证手机验证码
function mobileVerifyCode(mobile, verificationCode) {
    return mutation({
        operation: "attemptToConsumeVerificationCode",
        args: {
            phoneNumber: mobile,
            verificationCode,
        }
    });
}