import { ApiConfig } from "@/types/ezInstance";
import CurdService from "@/utils/ezInstance/curd";

// 定义枚举类型接口
interface EnumType {
    id: number;
    type_name: string;
    description?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// 定义枚举值接口
interface EnumValue {
    id: number;
    enum_types: number;
    enum_value: string;
    description?: string;
    sort_order?: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// 定义搜索记录接口
interface SearchRecord {
    keyword: string;
    total: number;
    hasMore: boolean;
    lastUpdateTime: number;
}

// 创建枚举类型的CRUD实例
const enumTypeCurd = new CurdService('enum_types', [
    'id',
    'type_name',
    'description',
    'is_active',
    'created_at',
    'updated_at'
]);

// 创建枚举值的CRUD实例
const enumValueCurd = new CurdService('enum_values', [
    'id',
    'enum_types',
    'enum_value',
    'description',
    'sort_order',
    'is_active',
    'created_at',
    'updated_at'
]);

// 缓存对象
const cache = {
    enumTypes: new Map<string, EnumType>(),  // 存储枚举类型
    enumValues: new Map<string, EnumValue[]>(),  // 存储枚举值，key为type_name
    searchRecords: new Map<string, SearchRecord>(),  // 存储搜索记录，key为type_name:keyword
    lastUpdateTime: new Map<string, number>()  // 存储最后更新时间
};

// 缓存过期时间（5分钟）
const CACHE_EXPIRE_TIME = 5 * 60 * 1000;

// 默认加载数量
const DEFAULT_TYPE_LIMIT = 10;
const DEFAULT_VALUE_LIMIT = 50;

/**
 * 获取枚举类型列表
 * @param typeNames 指定要加载的枚举类型名称数组，不传则加载所有
 */
export async function getEnumTypes(
    typeNames?: string[],
    apiConfig?: ApiConfig
): Promise<EnumType[]> {
    const now = Date.now();
    const cacheKey = 'enum_types';

    // 检查缓存是否有效
    if (cache.lastUpdateTime.has(cacheKey) &&
        now - cache.lastUpdateTime.get(cacheKey)! < CACHE_EXPIRE_TIME) {
        // 如果指定了类型名称，只返回指定的类型
        if (typeNames && typeNames.length > 0) {
            return typeNames
                .map(name => cache.enumTypes.get(name))
                .filter((type): type is EnumType => type !== undefined);
        }
        return Array.from(cache.enumTypes.values());
    }

    // 构建查询条件
    const where: any = { is_active: { _eq: true } };
    if (typeNames && typeNames.length > 0) {
        where.type_name = { _in: typeNames };
    }

    // 从数据库获取数据
    const result = await enumTypeCurd.query({
        where,
        order_by: { sort_order: () => 'desc_nulls_first' },
        limit: typeNames ? typeNames.length : DEFAULT_TYPE_LIMIT
    }, apiConfig);

    // 更新缓存
    result.forEach((type: EnumType) => {
        cache.enumTypes.set(type.type_name, type);
    });
    cache.lastUpdateTime.set(cacheKey, now);

    return result;
}

/**
 * 获取枚举值（初始加载）
 * @param typeName 枚举类型名称
 */
export async function getEnumValues(
    typeName: string,
    apiConfig?: ApiConfig
): Promise<EnumValue[]> {
    const now = Date.now();

    // 检查缓存是否有效
    if (cache.enumValues.has(typeName) &&
        cache.lastUpdateTime.has(typeName) &&
        now - cache.lastUpdateTime.get(typeName)! < CACHE_EXPIRE_TIME) {
        return cache.enumValues.get(typeName)!;
    }

    // 获取枚举类型
    const enumType = await enumTypeCurd.query({
        where: {
            type_name: { _eq: typeName },
            is_active: { _eq: true }
        }
    }, apiConfig);

    if (!enumType[0]) {
        return [];
    }

    // 从数据库获取枚举值
    const result = await enumValueCurd.query({
        where: {
            enum_types: { _eq: enumType[0].id },
            is_active: { _eq: true }
        },
        order_by: { sort_order: () => 'desc_nulls_first', created_at: () => 'asc' },
        limit: DEFAULT_VALUE_LIMIT
    }, apiConfig);

    // 更新缓存
    cache.enumValues.set(typeName, result);
    cache.lastUpdateTime.set(typeName, now);

    return result;
}

/**
 * 加载更多枚举值
 * @param typeName 枚举类型名称
 * @param offset 偏移量
 */
export async function loadMoreEnumValues(
    typeName: string,
    offset: number = 0,
    apiConfig?: ApiConfig
): Promise<{ values: EnumValue[], hasMore: boolean }> {
    // 获取枚举类型
    const enumType = await enumTypeCurd.query({
        where: {
            type_name: { _eq: typeName },
            is_active: { _eq: true }
        }
    }, apiConfig);

    if (!enumType[0]) {
        return { values: [], hasMore: false };
    }

    // 从数据库获取更多枚举值
    const result = await enumValueCurd.query({
        where: {
            enum_types: { _eq: enumType[0].id },
            is_active: { _eq: true }
        },
        order_by: { sort_order: 'asc', created_at: 'asc' },
        offset,
        limit: DEFAULT_VALUE_LIMIT
    }, apiConfig);

    // 更新缓存
    const currentValues = cache.enumValues.get(typeName) || [];
    cache.enumValues.set(typeName, [...currentValues, ...result]);

    return {
        values: result,
        hasMore: result.length === DEFAULT_VALUE_LIMIT
    };
}

/**
 * 搜索枚举值
 * @param typeName 枚举类型名称
 * @param keyword 搜索关键词
 */
export async function searchEnumValues(
    typeName: string,
    keyword: string,
    apiConfig?: ApiConfig
): Promise<{ values: EnumValue[], hasMore: boolean }> {
    const searchKey = `${typeName}:${keyword}`;
    const now = Date.now();

    // 检查搜索记录
    if (cache.searchRecords.has(searchKey)) {
        const record = cache.searchRecords.get(searchKey)!;
        if (now - record.lastUpdateTime < CACHE_EXPIRE_TIME) {
            const values = cache.enumValues.get(typeName) || [];
            const filteredValues = values.filter((value: EnumValue) =>
                value.enum_value.toLowerCase().includes(keyword.toLowerCase()) ||
                (value.description && value.description.toLowerCase().includes(keyword.toLowerCase()))
            );
            return {
                values: filteredValues.slice(0, DEFAULT_VALUE_LIMIT),
                hasMore: record.hasMore
            };
        }
    }

    // 获取枚举类型
    const enumType = await enumTypeCurd.query({
        where: {
            type_name: { _eq: typeName },
            is_active: { _eq: true }
        }
    }, apiConfig);

    if (!enumType[0]) {
        return { values: [], hasMore: false };
    }

    // 从数据库搜索枚举值
    const result = await enumValueCurd.query({
        where: {
            enum_types: { _eq: enumType[0].id },
            is_active: { _eq: true },
            _or: [
                { enum_value: { _ilike: `%${keyword}%` } },
                { description: { _ilike: `%${keyword}%` } }
            ]
        },
        order_by: { sort_order: 'asc', created_at: 'asc' },
        limit: DEFAULT_VALUE_LIMIT + 1  // 多取一条用于判断是否有更多
    }, apiConfig);

    // 更新搜索记录
    const hasMore = result.length > DEFAULT_VALUE_LIMIT;
    const values = result.slice(0, DEFAULT_VALUE_LIMIT);

    cache.searchRecords.set(searchKey, {
        keyword,
        total: values.length,
        hasMore,
        lastUpdateTime: now
    });

    // 更新枚举值缓存
    const currentValues = cache.enumValues.get(typeName) || [];
    const newValues = values.filter((value: { id: number; }) =>
        !currentValues.some(v => v.id === value.id)
    );
    cache.enumValues.set(typeName, [...currentValues, ...newValues]);

    return { values, hasMore };
}

/**
 * 清除缓存
 * @param typeName 枚举类型名称，不传则清除所有缓存
 */
export function clearCache(typeName?: string) {
    if (typeName) {
        cache.enumTypes.delete(typeName);
        cache.enumValues.delete(typeName);
        cache.lastUpdateTime.delete(typeName);
        // 清除该类型的所有搜索记录
        for (const key of cache.searchRecords.keys()) {
            if (key.startsWith(`${typeName}:`)) {
                cache.searchRecords.delete(key);
            }
        }
    } else {
        cache.enumTypes.clear();
        cache.enumValues.clear();
        cache.searchRecords.clear();
        cache.lastUpdateTime.clear();
    }
}
