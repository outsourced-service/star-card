// @ts-nocheck

/**
 * 用户注册行为流
 * 
 * 输入参数：
 * - username: 用户名
 * - email: 邮箱
 * - password: 密码
 * - inviteCode: 邀请码(可选)
 * 
 * 返回数据：
 * - userId: 用户ID
 * - status: 注册状态
 * - message: 处理结果说明
 */

/**
 * 获取输入参数
 * @param {string[]} keys 参数名称列表
 * @returns {Object} 参数对象
 */
function getArgs(keys = ["username", "email", "password", "inviteCode"]) {
    const args = {};
    keys.forEach(key => {
        args[key] = context.getArg(key);
    });
    return args;
}

/**
 * 设置返回值
 * @param {Object} outputs 返回值对象
 */
function setReturns(outputs) {
    Object.keys(outputs).forEach(key => {
        context.setReturn(key, outputs[key]);
    });
}

/**
 * 校验用户输入
 * @param {Object} args 用户输入参数
 */
function validateInput(args) {
    if (!args.username || args.username.length < 3) {
        throw new Error("用户名至少需要3个字符");
    }
    
    if (!args.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email)) {
        throw new Error("邮箱格式不正确");
    }
    
    if (!args.password || args.password.length < 6) {
        throw new Error("密码至少需要6个字符");
    }
}

/**
 * 检查用户名和邮箱是否已存在
 * @param {string} username 用户名
 * @param {string} email 邮箱
 */
function checkUserExists(username, email) {
    const gql = `
        query checkUser($username: String!, $email: String!) {
            users(where: {
                _or: [
                    { username: { _eq: $username } },
                    { email: { _eq: $email } }
                ]
            }) {
                id
                username
                email
            }
        }
    `;
    
    const result = context.runGql("checkUser", gql, { username, email });
    const users = result.users || [];
    
    if (users.length > 0) {
        const existingUser = users[0];
        if (existingUser.username === username) {
            throw new Error("用户名已被使用");
        }
        if (existingUser.email === email) {
            throw new Error("邮箱已被注册");
        }
    }
}

/**
 * 验证邀请码
 * @param {string} inviteCode 邀请码
 * @returns {Object} 邀请信息
 */
function validateInviteCode(inviteCode) {
    if (!inviteCode) return null;
    
    const gql = `
        query checkInviteCode($code: String!) {
            invite_codes(where: { 
                code: { _eq: $code },
                status: { _eq: "UNUSED" }
            }) {
                id
                inviter_id
            }
        }
    `;
    
    const result = context.runGql("checkInviteCode", gql, { code: inviteCode });
    const codes = result.invite_codes || [];
    
    if (codes.length === 0) {
        throw new Error("无效的邀请码");
    }
    
    return codes[0];
}

/**
 * 创建用户记录
 * @param {Object} args 用户信息
 * @param {Object} inviteInfo 邀请信息
 * @returns {Object} 创建的用户信息
 */
function createUser(args, inviteInfo) {
    const gql = `
        mutation createUser($input: users_insert_input!) {
            insert_users_one(object: $input) {
                id
                username
                email
                status
            }
        }
    `;
    
    const result = context.runGql("createUser", gql, {
        input: {
            username: args.username,
            email: args.email,
            password: args.password, // 注意：实际应用中需要对密码进行加密
            inviter_id: inviteInfo?.inviter_id,
            status: "ACTIVE"
        }
    });
    
    return result.insert_users_one;
}

/**
 * 发送欢迎邮件
 * @param {Object} user 用户信息
 */
function sendWelcomeEmail(user) {
    context.sendEmail({
        to: user.email,
        subject: "欢迎注册",
        fromAlias: "系统管理员",
        textBody: `尊敬的 ${user.username}，欢迎加入我们！`,
        htmlBody: `<h1>欢迎加入</h1><p>尊敬的 ${user.username}，欢迎加入我们！</p>`
    });
}

/**
 * 注册流程主函数
 * @param {Object} args 注册参数
 * @returns {Object} 注册结果
 */
function register(args) {
    // 1. 校验输入参数
    validateInput(args);
    
    // 2. 检查用户是否已存在
    checkUserExists(args.username, args.email);
    
    // 3. 验证邀请码
    const inviteInfo = args.inviteCode ? validateInviteCode(args.inviteCode) : null;
    
    // 4. 创建用户
    const user = createUser(args, inviteInfo);
    
    // 5. 发送欢迎邮件
    sendWelcomeEmail(user);
    
    return {
        userId: user.id,
        status: user.status,
        message: "注册成功"
    };
}

// 执行入口
try {
    const args = getArgs();
    const result = register(args);
    setReturns(result);
    context.log("用户注册成功", false);
} catch (error) {
    context.log("用户注册失败: " + error.message, true);
    context.error("registerError", `注册失败: ${error.message}`, true);
}
