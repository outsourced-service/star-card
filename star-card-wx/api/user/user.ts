import CurdService from '@/utils/ezInstance/curd';

// 定义用户字段
const userFields = [
    'id',
    'nickname',
    'username',
    'avatar{id, url}',
    'province',
    'city',
    'area',
    'address_detail',
    'introduce',
    'start_business_hours',
    'exp_business_hours',
    'is_authentication',
    'is_personal',
    'is_recommend'
];

// 创建用户 CRUD 实例
const userService = new CurdService('user', userFields);

// 更新当前用户信息
export const updateCurrentUserInfo = async (data: Record<string, any>) => {
    try {
        const result = await userService.update({
            _set: data
        });
        return result.data;
    } catch (error) {
        console.error('更新用户信息失败:', error);
        throw error;
    }
}; 