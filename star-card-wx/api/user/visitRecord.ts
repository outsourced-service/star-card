import CurdService from "@/utils/ezInstance/curd";
import { login } from '@/api/login/index';

// 定义用户访问记录表字段
const visitRecordFields = [
    'id',
    'user_user',
    'user_visited_user',
    'user_card_user_card',
    'user_cardcabinet_user_cardcabinet',
    'visited_entity_type',
    'is_liked',
    'is_collected',
    'is_followed',
    'share_count',
    'visit_count',
    'last_visit_time',
    'previous_visit_time'
];

// 创建用户访问记录的CRUD服务实例
const visitRecordService = new CurdService('user_visit_record', visitRecordFields);

/**
 * 记录用户访问
 * @param {String} entityType 实体类型：'USER', 'CARD', 'CARDCABINET'
 * @param {Number} entityId 实体ID
 * @returns {Promise} 返回访问记录
 */
export const recordVisit = async (entityType: 'USER' | 'CARD' | 'CARDCABINET', entityId: number) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        let where: Record<string, any> = { user_user: { _eq: userID } };
        
        // 根据实体类型设置不同的查询条件
        switch (entityType) {
            case 'USER':
                where.user_visited_user = { _eq: entityId };
                break;
            case 'CARD':
                where.user_card_user_card = { _eq: entityId };
                break;
            case 'CARDCABINET':
                where.user_cardcabinet_user_cardcabinet = { _eq: entityId };
                break;
            default:
                throw new Error('不支持的实体类型');
        }
        
        // 查询是否已存在访问记录
        const existingRecord = await visitRecordService.query({ where });
        
        if (existingRecord.data && existingRecord.data.length > 0) {
            // 更新现有记录
            const record = existingRecord.data[0];
            const now = new Date().toISOString();
            
            return await visitRecordService.update({
                id: record.id,
                _set: {
                    visit_count: record.visit_count + 1,
                    previous_visit_time: record.last_visit_time,
                    last_visit_time: now
                }
            });
        } else {
            // 创建新记录
            const visitData: Record<string, any> = {
                user_user: userID,
                visited_entity_type: entityType,
                visit_count: 1,
                last_visit_time: new Date().toISOString(),
                is_liked: false,
                is_collected: false,
                is_followed: false,
                share_count: 0
            };
            
            // 根据实体类型设置不同的字段
            switch (entityType) {
                case 'USER':
                    visitData.user_visited_user = entityId;
                    break;
                case 'CARD':
                    visitData.user_card_user_card = entityId;
                    break;
                case 'CARDCABINET':
                    visitData.user_cardcabinet_user_cardcabinet = entityId;
                    break;
            }
            
            return await visitRecordService.insert(visitData);
        }
    } catch (error) {
        console.error('记录用户访问失败:', error);
        throw error;
    }
};

/**
 * 点赞/取消点赞
 * @param {String} entityType 实体类型：'USER', 'CARD', 'CARDCABINET'
 * @param {Number} entityId 实体ID
 * @param {Boolean} isLiked 是否点赞
 * @returns {Promise} 返回操作结果
 */
export const toggleLike = async (entityType: 'USER' | 'CARD' | 'CARDCABINET', entityId: number, isLiked: boolean) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        let where: Record<string, any> = { user_user: { _eq: userID } };
        
        // 根据实体类型设置不同的查询条件
        switch (entityType) {
            case 'USER':
                where.user_visited_user = { _eq: entityId };
                break;
            case 'CARD':
                where.user_card_user_card = { _eq: entityId };
                break;
            case 'CARDCABINET':
                where.user_cardcabinet_user_cardcabinet = { _eq: entityId };
                break;
            default:
                throw new Error('不支持的实体类型');
        }
        
        // 查询是否已存在访问记录
        const existingRecord = await visitRecordService.query({ where });
        
        if (existingRecord.data && existingRecord.data.length > 0) {
            // 更新现有记录
            const record = existingRecord.data[0];
            
            return await visitRecordService.update({
                id: record.id,
                _set: { is_liked: isLiked }
            });
        } else {
            // 创建新记录
            const visitData: Record<string, any> = {
                user_user: userID,
                visited_entity_type: entityType,
                is_liked: isLiked,
                is_collected: false,
                is_followed: false,
                visit_count: 1,
                share_count: 0,
                last_visit_time: new Date().toISOString()
            };
            
            // 根据实体类型设置不同的字段
            switch (entityType) {
                case 'USER':
                    visitData.user_visited_user = entityId;
                    break;
                case 'CARD':
                    visitData.user_card_user_card = entityId;
                    break;
                case 'CARDCABINET':
                    visitData.user_cardcabinet_user_cardcabinet = entityId;
                    break;
            }
            
            return await visitRecordService.insert(visitData);
        }
    } catch (error) {
        console.error('点赞/取消点赞失败:', error);
        throw error;
    }
};

/**
 * 收藏/取消收藏
 * @param {String} entityType 实体类型：'USER', 'CARD', 'CARDCABINET'
 * @param {Number} entityId 实体ID
 * @param {Boolean} isCollected 是否收藏
 * @returns {Promise} 返回操作结果
 */
export const toggleCollect = async (entityType: 'USER' | 'CARD' | 'CARDCABINET', entityId: number, isCollected: boolean) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        let where: Record<string, any> = { user_user: { _eq: userID } };
        
        // 根据实体类型设置不同的查询条件
        switch (entityType) {
            case 'USER':
                where.user_visited_user = { _eq: entityId };
                break;
            case 'CARD':
                where.user_card_user_card = { _eq: entityId };
                break;
            case 'CARDCABINET':
                where.user_cardcabinet_user_cardcabinet = { _eq: entityId };
                break;
            default:
                throw new Error('不支持的实体类型');
        }
        
        // 查询是否已存在访问记录
        const existingRecord = await visitRecordService.query({ where });
        
        if (existingRecord.data && existingRecord.data.length > 0) {
            // 更新现有记录
            const record = existingRecord.data[0];
            
            return await visitRecordService.update({
                id: record.id,
                _set: { is_collected: isCollected }
            });
        } else {
            // 创建新记录
            const visitData: Record<string, any> = {
                user_user: userID,
                visited_entity_type: entityType,
                is_liked: false,
                is_collected: isCollected,
                is_followed: false,
                visit_count: 1,
                share_count: 0,
                last_visit_time: new Date().toISOString()
            };
            
            // 根据实体类型设置不同的字段
            switch (entityType) {
                case 'USER':
                    visitData.user_visited_user = entityId;
                    break;
                case 'CARD':
                    visitData.user_card_user_card = entityId;
                    break;
                case 'CARDCABINET':
                    visitData.user_cardcabinet_user_cardcabinet = entityId;
                    break;
            }
            
            return await visitRecordService.insert(visitData);
        }
    } catch (error) {
        console.error('收藏/取消收藏失败:', error);
        throw error;
    }
};

/**
 * 关注/取消关注
 * @param {Number} userId 被关注的用户ID
 * @param {Boolean} isFollowed 是否关注
 * @returns {Promise} 返回操作结果
 */
export const toggleFollow = async (userId: number, isFollowed: boolean) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        const where = { 
            user_user: { _eq: userID },
            user_visited_user: { _eq: userId },
            visited_entity_type: { _eq: 'USER' }
        };
        
        // 查询是否已存在访问记录
        const existingRecord = await visitRecordService.query({ where });
        
        if (existingRecord.data && existingRecord.data.length > 0) {
            // 更新现有记录
            const record = existingRecord.data[0];
            
            return await visitRecordService.update({
                id: record.id,
                _set: { is_followed: isFollowed }
            });
        } else {
            // 创建新记录
            const visitData = {
                user_user: userID,
                user_visited_user: userId,
                visited_entity_type: 'USER',
                is_liked: false,
                is_collected: false,
                is_followed: isFollowed,
                visit_count: 1,
                share_count: 0,
                last_visit_time: new Date().toISOString()
            };
            
            return await visitRecordService.insert(visitData);
        }
    } catch (error) {
        console.error('关注/取消关注失败:', error);
        throw error;
    }
};

/**
 * 分享
 * @param {String} entityType 实体类型：'USER', 'CARD', 'CARDCABINET'
 * @param {Number} entityId 实体ID
 * @returns {Promise} 返回操作结果
 */
export const share = async (entityType: 'USER' | 'CARD' | 'CARDCABINET', entityId: number) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        let where: Record<string, any> = { user_user: { _eq: userID } };
        
        // 根据实体类型设置不同的查询条件
        switch (entityType) {
            case 'USER':
                where.user_visited_user = { _eq: entityId };
                break;
            case 'CARD':
                where.user_card_user_card = { _eq: entityId };
                break;
            case 'CARDCABINET':
                where.user_cardcabinet_user_cardcabinet = { _eq: entityId };
                break;
            default:
                throw new Error('不支持的实体类型');
        }
        
        // 查询是否已存在访问记录
        const existingRecord = await visitRecordService.query({ where });
        
        if (existingRecord.data && existingRecord.data.length > 0) {
            // 更新现有记录
            const record = existingRecord.data[0];
            
            return await visitRecordService.update({
                id: record.id,
                _set: { share_count: record.share_count + 1 }
            });
        } else {
            // 创建新记录
            const visitData: Record<string, any> = {
                user_user: userID,
                visited_entity_type: entityType,
                is_liked: false,
                is_collected: false,
                is_followed: false,
                visit_count: 1,
                share_count: 1,
                last_visit_time: new Date().toISOString()
            };
            
            // 根据实体类型设置不同的字段
            switch (entityType) {
                case 'USER':
                    visitData.user_visited_user = entityId;
                    break;
                case 'CARD':
                    visitData.user_card_user_card = entityId;
                    break;
                case 'CARDCABINET':
                    visitData.user_cardcabinet_user_cardcabinet = entityId;
                    break;
            }
            
            return await visitRecordService.insert(visitData);
        }
    } catch (error) {
        console.error('分享失败:', error);
        throw error;
    }
};

/**
 * 获取用户收藏列表
 * @param {String} entityType 实体类型：'USER', 'CARD', 'CARDCABINET'
 * @param {Number} pageSize 每页数量
 * @param {Number} pageNumber 页码
 * @returns {Promise} 返回收藏列表
 */
export const getCollectedList = async (entityType: 'USER' | 'CARD' | 'CARDCABINET', pageSize: number = 10, pageNumber: number = 1) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        const where = { 
            user_user: { _eq: userID },
            is_collected: { _eq: true },
            visited_entity_type: { _eq: entityType }
        };
        
        // 查询收藏列表
        const result = await visitRecordService.query({
            where,
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
            order_by: { last_visit_time: 'desc' }
        });
        
        return result.data || [];
    } catch (error) {
        console.error('获取收藏列表失败:', error);
        return [];
    }
};

/**
 * 获取用户关注列表
 * @param {Number} pageSize 每页数量
 * @param {Number} pageNumber 页码
 * @returns {Promise} 返回关注列表
 */
export const getFollowedList = async (pageSize: number = 10, pageNumber: number = 1) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        const where = { 
            user_user: { _eq: userID },
            is_followed: { _eq: true },
            visited_entity_type: { _eq: 'USER' }
        };
        
        // 查询关注列表
        const result = await visitRecordService.query({
            where,
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
            order_by: { last_visit_time: 'desc' }
        });
        
        return result.data || [];
    } catch (error) {
        console.error('获取关注列表失败:', error);
        return [];
    }
};

/**
 * 获取用户点赞列表
 * @param {String} entityType 实体类型：'USER', 'CARD', 'CARDCABINET'
 * @param {Number} pageSize 每页数量
 * @param {Number} pageNumber 页码
 * @returns {Promise} 返回点赞列表
 */
export const getLikedList = async (entityType: 'USER' | 'CARD' | 'CARDCABINET', pageSize: number = 10, pageNumber: number = 1) => {
    try {
        const { userID } = await login();
        
        // 构建查询条件
        const where = { 
            user_user: { _eq: userID },
            is_liked: { _eq: true },
            visited_entity_type: { _eq: entityType }
        };
        
        // 查询点赞列表
        const result = await visitRecordService.query({
            where,
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
            order_by: { last_visit_time: 'desc' }
        });
        
        return result.data || [];
    } catch (error) {
        console.error('获取点赞列表失败:', error);
        return [];
    }
};

/**
 * 获取实体访问记录聚合数据
 * @param {String} entityType 实体类型：'USER', 'CARD', 'CARDCABINET'
 * @param {Number} entityId 实体ID
 * @returns {Promise} 返回聚合数据
 */
export const getEntityVisitRecordAggregate = async (entityType: 'USER' | 'CARD' | 'CARDCABINET', entityId: number) => {
    try {
        // 构建查询条件
        let where: Record<string, any> = {};
        
        // 根据实体类型设置不同的查询条件
        switch (entityType) {
            case 'USER':
                where.user_visited_user = { _eq: entityId };
                break;
            case 'CARD':
                where.user_card_user_card = { _eq: entityId };
                break;
            case 'CARDCABINET':
                where.user_cardcabinet_user_cardcabinet = { _eq: entityId };
                break;
            default:
                throw new Error('不支持的实体类型');
        }
        
        // 查询收藏总数
        const collectedResult = await visitRecordService.query({
            where: { 
                ...where,
                is_collected: { _eq: true }
            },
            aggregate: {
                count: true
            }
        });
        
        // 查询关注总数
        const followedResult = await visitRecordService.query({
            where: { 
                ...where,
                is_followed: { _eq: true }
            },
            aggregate: {
                count: true
            }
        });
        
        // 查询点赞总数
        const likedResult = await visitRecordService.query({
            where: { 
                ...where,
                is_liked: { _eq: true }
            },
            aggregate: {
                count: true
            }
        });
        
        // 查询访问总数
        const visitResult = await visitRecordService.query({
            where,
            aggregate: {
                count: true
            }
        });
        
        // 查询分享总数
        const shareResult = await visitRecordService.query({
            where,
            aggregate: {
                sum: {
                    share_count: true
                }
            }
        });
        
        return {
            collected_count: collectedResult.aggregate?.count || 0,
            followed_count: followedResult.aggregate?.count || 0,
            liked_count: likedResult.aggregate?.count || 0,
            visit_count: visitResult.aggregate?.count || 0,
            share_count: shareResult.aggregate?.sum?.share_count || 0
        };
    } catch (error) {
        console.error('获取实体访问记录聚合数据失败:', error);
        return {
            collected_count: 0,
            followed_count: 0,
            liked_count: 0,
            visit_count: 0,
            share_count: 0
        };
    }
};

/**
 * 获取用户访问记录聚合数据
 * @param {Number} userId 用户ID，不传则获取当前用户
 * @returns {Promise} 返回聚合数据
 */
export const getUserVisitRecordAggregate = async (userId?: number) => {
    try {
        // 如果没有提供用户ID，则获取当前登录用户
        let targetUserId = userId;
        if (!targetUserId) {
            const { userID } = await login();
            targetUserId = userID;
        }
        
        // 构建查询条件
        const where = { user_user: { _eq: targetUserId } };
        
        // 查询收藏总数
        const collectedResult = await visitRecordService.query({
            where: { 
                ...where,
                is_collected: { _eq: true }
            },
            aggregate: {
                count: true
            }
        });
        
        // 查询关注总数
        const followedResult = await visitRecordService.query({
            where: { 
                ...where,
                is_followed: { _eq: true }
            },
            aggregate: {
                count: true
            }
        });
        
        // 查询点赞总数
        const likedResult = await visitRecordService.query({
            where: { 
                ...where,
                is_liked: { _eq: true }
            },
            aggregate: {
                count: true
            }
        });
        
        // 查询访问总数
        const visitResult = await visitRecordService.query({
            where,
            aggregate: {
                count: true
            }
        });
        
        // 查询分享总数
        const shareResult = await visitRecordService.query({
            where,
            aggregate: {
                sum: {
                    share_count: true
                }
            }
        });
        
        return {
            collected_count: collectedResult.aggregate?.count || 0,
            followed_count: followedResult.aggregate?.count || 0,
            liked_count: likedResult.aggregate?.count || 0,
            visit_count: visitResult.aggregate?.count || 0,
            share_count: shareResult.aggregate?.sum?.share_count || 0
        };
    } catch (error) {
        console.error('获取用户访问记录聚合数据失败:', error);
        return {
            collected_count: 0,
            followed_count: 0,
            liked_count: 0,
            visit_count: 0,
            share_count: 0
        };
    }
};

export default {
    recordVisit,
    toggleLike,
    toggleCollect,
    toggleFollow,
    share,
    getCollectedList,
    getFollowedList,
    getLikedList,
    getEntityVisitRecordAggregate,
    getUserVisitRecordAggregate
}; 