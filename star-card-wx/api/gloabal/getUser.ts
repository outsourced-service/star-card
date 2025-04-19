import CurdService from '@/utils/ezInstance/curd';
import { login } from '@/api/login/index';

// 用户信息缓存
const userCache = new Map();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5分钟缓存时间

// 创建用户表的 CRUD 实例
const userService = new CurdService('user', [
    'id',
    'user_id',                   // 用户id,邀请码
    'nickname',                  // 昵称
    'avatar{id url}',            // 用户头像
    'profile',                   // 个人简介
    'role',                      // 用户角色
    'background_image{id url}',  // 背景图
    'province',                  // 所在省份
    'city',                      // 所在城市
    'area',                      // 所在地区
    'edit_time',                 // 更新时间
	'login_time',                // 登录更新时间
    'location',                  // 中心地理位置 {"type": "Point", "coordinates": [ 103.970107857, 0  ]}
    'address_detail',            // 账号详细地址，线下门店地址
    'address_title',             // 地址简要信息
    'address_info',              // 地图详细信息
    'house',                     // 门牌号
    'start_business_hours',      // 营业时间开始
    'exp_business_hours',        // 营业时间结束
    'edit_time',                 // 卡片最新更新时间
    'login_time',                // 用户最新登录时间
    'is_authentication',         // 是否商家认证
    'score',                     // 积分数量
    'growth_value'               // 成长值
]);

// 获取用户信息（带缓存）
export const getUserInfo = async (userId: string, forceRefresh: boolean = false) => {
    // 如果userId为空，则获取当前登录用户信息
    if (!userId) {
        const { userID } = await login()
        userId = userID
    }

    // 检查缓存
    const cachedData = userCache.get(userId);
    const now = Date.now();

    if (!forceRefresh && cachedData && (now - cachedData.timestamp) < CACHE_EXPIRY) {
        return cachedData.data;
    }

    // 查询用户信息
    const userInfo = await userService.query({
        alias: `user_${userId}`,
        id: Number(userId),
    });

    // 更新缓存
    userCache.set(userId, {
        data: userInfo,
        timestamp: now
    });

    return userInfo;
};

// 强制刷新用户信息
export const refreshUserInfo = async (userId: string) => {
    return await getUserInfo(userId, true);
};

// 清除用户缓存
export const clearUserCache = (userId?: string) => {
    if (userId) {
        userCache.delete(userId);
    } else {
        userCache.clear();
    }
};
