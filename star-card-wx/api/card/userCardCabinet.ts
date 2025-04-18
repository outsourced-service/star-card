import CurdService from '@/utils/ezInstance/curd';
import { login } from '@/api/login/index';

// 定义用户卡册字段
const userCardCabinetFields = [
    'id',
    'user_user',
    'name',
    'avatar',
    'introduce',
    'is_public',
    'is_featured',
    'is_pinned',
    'pin_time',
    {
        name: 'user_card_aggregate',
        fields: ['aggregate{count}']
    }
];

// 创建用户卡册的 CRUD 实例
const userCardCabinet = new CurdService('user_cardcabinet', userCardCabinetFields);

// 公共排序配置
const defaultOrderBy = { is_pinned: 'desc', pin_time: 'desc', created_at: 'desc' };

// 错误处理包装器
const handleError = (error: any, message: string, defaultValue: any = null) => {
    console.error(message, error);
    return defaultValue;
};

// 处理置顶时间
const handlePinTime = (isPinned: boolean | undefined) =>
    isPinned !== undefined ? (isPinned ? Date.now() : null) : null;

export default {
    // 获取当前用户的卡册列表
    getCurrentUserCardCabinet: async () => {
        try {
            const { userID } = await login();
            const result = await userCardCabinet.query({
                where: { user_user: { _eq: userID } },
                order_by: defaultOrderBy
            });
            return result.data || [];
        } catch (error) {
            return handleError(error, '获取用户卡册列表失败', []);
        }
    },

    // 根据用户ID获取卡册列表
    getUserCardCabinetByUserId: async (userId: number) => {
        try {
            const result = await userCardCabinet.query({
                where: { user_user: { _eq: userId } },
                order_by: defaultOrderBy
            });
            return result.data || [];
        } catch (error) {
            return handleError(error, '获取用户卡册列表失败', []);
        }
    },

    // 获取公开卡册列表（通用搜索）
    getPublicCardCabinet: async (params: {
        pageSize?: number;
        pageNumber?: number;
        keyword?: string;
        isFeatured?: boolean
    } = {}) => {
        try {
            const { pageSize = 10, pageNumber = 1, keyword = '', isFeatured = false } = params;

            // 构建查询条件
            const where: Record<string, any> = { is_public: { _eq: true } };

            if (keyword) {
                where.name = { _ilike: `%${keyword}%` };
            }

            if (isFeatured) {
                where.is_featured = { _eq: true };
            }

            const result = await userCardCabinet.query({
                where,
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
                order_by: defaultOrderBy
            });

            return result.data || [];
        } catch (error) {
            return handleError(error, '获取公开卡册列表失败', []);
        }
    },

    // 获取卡册详情
    getCardCabinetDetail: async (cabinetId: number) => {
        try {
            const result = await userCardCabinet.query({ id: cabinetId });
            return result.data?.[0] || null;
        } catch (error) {
            return handleError(error, '获取卡册详情失败', null);
        }
    },

    // 创建用户卡册
    createUserCardCabinet: async (data: Record<string, any>) => {
        try {
            const { userID } = await login();
            const isPinned = data.is_pinned || false;

            const cabinetData = {
                ...data,
                user_user: userID,
                is_public: data.is_public ?? false,
                is_featured: data.is_featured ?? false,
                is_pinned: isPinned,
                pin_time: handlePinTime(isPinned)
            };

            return await userCardCabinet.insert(cabinetData);
        } catch (error) {
            return handleError(error, '创建用户卡册失败');
        }
    },

    // 更新用户卡册
    updateUserCardCabinet: async (cabinetId: number, data: Record<string, any>) => {
        try {
            const pinTime = handlePinTime(data.is_pinned);
            if (pinTime !== undefined) {
                data.pin_time = pinTime;
            }

            return await userCardCabinet.update({
                id: cabinetId,
                _set: data
            });
        } catch (error) {
            return handleError(error, '更新用户卡册失败');
        }
    },

    // 删除用户卡册
    deleteUserCardCabinet: async (cabinetId: number) => {
        try {
            return await userCardCabinet.delete({ id: cabinetId });
        } catch (error) {
            return handleError(error, '删除用户卡册失败');
        }
    },

    // 设置卡册置顶状态
    setCardCabinetPinned: async (cabinetId: number, isPinned: boolean) => {
        try {
            return await userCardCabinet.update({
                id: cabinetId,
                _set: {
                    is_pinned: isPinned,
                    pin_time: handlePinTime(isPinned)
                }
            });
        } catch (error) {
            return handleError(error, '设置卡册置顶状态失败');
        }
    }
}; 