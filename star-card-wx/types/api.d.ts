// 入参接口
interface wxMiniLoginRequest  {
    code?: string; // 微信code
    accountID?: string; // accountID
    inviteCode?: string; // 邀请码
    isRegisterAuto?: boolean; // 是否自动注册

    // 绑定手机号需要的信息
    isMobileBindingForced?: boolean; // 是否强制绑定手机号
    isMobileVerificationRequired?: boolean; // 是否需要手机验证码验证手机号
    mobile?: string; // 手机号
    verificationCode?: string; // 验证码
}

// 出参接口
interface wxMiniLoginResponse  {
    userToken: string;
    expires_in: number;
    jwtToken: string;
}
