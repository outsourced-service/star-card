import CurdService from '@/utils/ezInstance/curd';
import { ApiConfig } from '@/types/ezInstance';

// 定义资源类型枚举
export enum ResourceType {
    VIDEO = 'video',    // 视频
    IMAGE = 'image',    // 图片
    FILE = 'file',      // 文件
    RICH_TEXT = 'rich_text' // 富文本
}


// 定义资源接口
export interface Resource {
    id: number;
    name: string;           // 资源名称（英文小写）
    dir: string;            // 资源目录
    title: string;          // 配置标题
    resource_type: ResourceType; // 资源类型
    is_variable: boolean;   // 是否后台可替换
    idx: number;            // 资源排序
    img?: {                 // 图片资源
        id: number;
        url: string;
    };
    video?: {               // 视频资源
        id: number;
        url: string;
    };
    file?: {                // 文件资源
        id: number;
        url: string;
        name: string;
    };
    text?: string;          // 富文本资源
    path?: string;          // 点击跳转路径
    attach_data?: any;      // 附加信息
    created_at: string;     // 创建时间
    updated_at: string;     // 更新时间
}

// 缓存配置
const CACHE_EXPIRE_TIME = 5 * 60 * 1000; // 5分钟缓存过期
const cache = new Map<string, {
    data: Resource[];
    timestamp: number;
}>();

// 创建资源的 CRUD 实例
const resourceService = new CurdService('resource', [
    'id',
    'name',
    'dir',
    'title',
    'resource_type',
    'is_variable',
    'idx',
    'img{id url}',
    'video{id url}',
    'file{id url name}',
    'text',
    'path',
    'attach_data',
    'created_at',
    'updated_at'
]);

/**
 * 获取资源列表
 * @param dir 资源目录
 * @param title 配置标题
 * @param forceRefresh 是否强制刷新缓存
 */
export async function getResources(
    dir?: string,
    title?: string,
    forceRefresh: boolean = false,
    apiConfig?: ApiConfig
): Promise<Resource[]> {
    try {
        const cacheKey = `${dir || 'all'}_${title || 'all'}`;
        const now = Date.now();
        const cachedData = cache.get(cacheKey);

        // 检查缓存是否有效
        if (!forceRefresh && cachedData && (now - cachedData.timestamp) < CACHE_EXPIRE_TIME) {
            return cachedData.data;
        }

        // 构建查询条件
        const where: Record<string, any> = {};

        if (dir) {
            where.dir = { _eq: dir };
        }
        if (title) {
            where.title = { _eq: title };
        }

        // 查询数据
        const result = await resourceService.query({
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
        console.error('获取资源列表失败:', error);
        // 如果请求失败，返回缓存的数据（如果有的话）
        const cachedData = cache.get(`${dir || 'all'}_${title || 'all'}`);
        return cachedData?.data || [];
    }
}

/**
 * 获取指定名称的资源
 * @param name 资源名称
 * @param dir 资源目录
 */
export async function getResourceByName(
    name: string,
    dir?: string,
    apiConfig?: ApiConfig
): Promise<Resource | null> {
    try {
        const where: Record<string, any> = {
            name: { _eq: name }
        };

        if (dir) {
            where.dir = { _eq: dir };
        }

        const result = await resourceService.query({
            where,
            limit: 1
        }, apiConfig);

        return result[0] || null;
    } catch (error) {
        console.error('获取资源详情失败:', error);
        return null;
    }
}

/**
 * 清除资源缓存
 * @param dir 资源目录
 * @param title 配置标题
 */
export function clearResourceCache(dir?: string, title?: string): void {
    if (dir || title) {
        const pattern = `${dir || '*'}_${title || '*'}`;
        for (const key of cache.keys()) {
            if (key.match(new RegExp(pattern.replace(/\*/g, '.*')))) {
                cache.delete(key);
            }
        }
    } else {
        cache.clear();
    }
}

// 使用示例：
/*
// 获取送评须知资源
const evaluationNotice = await getResources(undefined, "evaluation_notice");

// 获取特定目录下的所有资源
const dirResources = await getResources('evaluation');

// 获取特定资源
const resource = await getResourceByName('app_name');

// 清除特定目录的缓存
clearResourceCache('evaluation');
*/ 