import CurdService from '@/utils/ezInstance/curd';
import { ApiConfig } from '@/types/ezInstance';

// 定义轮播图类型枚举
export enum BannerType {
    EVALUATION_PAGE = 'evaluation_page',    // 送评页轮播图
    EVALUATION_ACTIVITY = 'evaluation_activity', // 送评活动
    MALL_HOME = 'mall_home',               // 商城首页轮播图
    MINIAPP_HOME = 'miniapp_home',         // 小程序首页轮播图
    MINIAPP_EVALUATION = 'miniapp_evaluation' // 小程序首页送评
}

// 定义资源类型枚举
export enum ResourceType {
    IMAGE = 'image', // 图片
    VIDEO = 'video'  // 视频
}

// 定义轮播图接口
export interface Banner {
    id: number;
    name: string;           // 资源名称（唯一）
    type: BannerType;       // 轮播图分类
    resource_type: ResourceType; // 资源类型
    idx: number;            // 资源排序
    img?: {                 // 图片资源
        id: number;
        url: string;
    };
    video?: {               // 视频资源
        id: number;
        url: string;
    };
    path?: string;          // 跳转路径或链接
    is_enabled: boolean;    // 是否启用
    created_at: string;     // 创建时间
    updated_at: string;     // 更新时间
}

// 缓存配置
const CACHE_EXPIRE_TIME = 5 * 60 * 1000; // 5分钟缓存过期
const cache = new Map<string, {
    data: Banner[];
    timestamp: number;
}>();

// 创建轮播图的 CRUD 实例
const bannerService = new CurdService('banner', [
    'id',
    'name',
    'type',
    'resource_type',
    'idx',
    'img{id url}',
    'video{id url}',
    'path',
    'is_enabled',
    'created_at',
    'updated_at'
]);

/**
 * 获取轮播图列表
 * @param type 轮播图类型
 * @param forceRefresh 是否强制刷新缓存
 * @param apiConfig API配置
 */
export async function getBanners(
    type?: BannerType,
    forceRefresh: boolean = false,
    apiConfig?: ApiConfig
): Promise<Banner[]> {
    try {
        const cacheKey = type || 'all';
        const now = Date.now();
        const cachedData = cache.get(cacheKey);

        // 检查缓存是否有效
        if (!forceRefresh && cachedData && (now - cachedData.timestamp) < CACHE_EXPIRE_TIME) {
            return cachedData.data;
        }

        // 构建查询条件
        const where: Record<string, any> = {
            is_enabled: { _eq: true }
        };

        if (type) {
            where.type = { _eq: type };
        }

        // 查询数据
        const result = await bannerService.query({
            where,
            order_by: { idx: () => 'desc', created_at: () => 'desc' }
        }, apiConfig);

        // 更新缓存
        cache.set(cacheKey, {
            data: result,
            timestamp: now
        });

        return result;
    } catch (error) {
        console.error('获取轮播图列表失败:', error);
        // 如果请求失败，返回缓存的数据（如果有的话）
        const cachedData = cache.get(type || 'all');
        return cachedData?.data || [];
    }
}

/**
 * 获取指定名称的轮播图
 * @param name 轮播图名称
 * @param type 轮播图类型
 */
export async function getBannerByName(
    name: string,
    type?: BannerType,
    apiConfig?: ApiConfig
): Promise<Banner | null> {
    try {
        const where: Record<string, any> = {
            name: { _eq: name },
            is_enabled: { _eq: true }
        };

        if (type) {
            where.type = { _eq: type };
        }

        const result = await bannerService.query({
            where,
            limit: 1
        }, apiConfig);

        return result[0] || null;
    } catch (error) {
        console.error('获取轮播图详情失败:', error);
        return null;
    }
}

/**
 * 清除轮播图缓存
 * @param type 轮播图类型，不传则清除所有缓存
 */
export function clearBannerCache(type?: BannerType): void {
    if (type) {
        cache.delete(type);
    } else {
        cache.clear();
    }
}

// 使用示例：
/*
// 获取小程序首页轮播图
const homeBanners = await getBanners(BannerType.MINIAPP_HOME);

// 获取所有轮播图
const allBanners = await getBanners();

// 强制刷新缓存
const freshBanners = await getBanners(BannerType.MALL_HOME, true);

// 根据名称获取特定轮播图
const specificBanner = await getBannerByName('spring-festival-2024', BannerType.EVALUATION_ACTIVITY);

// 清除特定类型的缓存
clearBannerCache(BannerType.MINIAPP_HOME);

// 清除所有缓存
clearBannerCache();
*/ 