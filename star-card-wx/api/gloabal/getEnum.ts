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
    enum_types_enum_types: number;
    enum_value: string;
    description?: string;
    sort_order?: string;
    is_active: boolean;
}

// 定义搜索记录接口
interface SearchRecord {
    keyword: string;
    total: number;
    hasMore: boolean;
    lastUpdateTime: number;
}

// 定义缓存接口
interface Cache {
    enumTypes: Map<string, EnumType>;
    enumValues: Map<string, EnumValue[]>;
    searchRecords: Map<string, SearchRecord>;
    lastUpdateTime: Map<string, number>;
    totalCounts: Map<string, number>;
}

// 定义错误类型
class EnumError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnumError';
    }
}

// 常量定义
const CACHE_EXPIRE_TIME = 5 * 60 * 1000; // 缓存过期时间（5分钟）
const DEFAULT_TYPE_LIMIT = 10; // 默认枚举类型加载数量
const DEFAULT_VALUE_LIMIT = 50; // 默认枚举值加载数量

// 枚举值字段定义
const enum_values_fields = [
    'id',
    'enum_types_enum_types',
    'enum_value',
    'description',
    'sort_order',
    'is_active',
];

// 创建CRUD实例
const enumTypeCurd = new CurdService('enum_types', [
    'id',
    'type_name',
    'description',
    'is_active',
    {
        name: 'enum_values',
        args: {
            limit: DEFAULT_VALUE_LIMIT,
            order_by: { sort_order: () => 'desc_nulls_first', created_at: () => 'desc_nulls_first' },
        },
        fields: enum_values_fields,
    }, {
        name: 'enum_values_aggregate',
        fields: ['aggregate{count}'],
    }
]);

const enumValueCurd = new CurdService('enum_values', enum_values_fields);

// 初始化缓存
const cache: Cache = {
    enumTypes: new Map(),
    enumValues: new Map(),
    searchRecords: new Map(),
    lastUpdateTime: new Map(),
    totalCounts: new Map(),
};

/**
 * 检查缓存是否有效
 */
function isCacheValid(key: string): boolean {
    const lastUpdateTime = cache.lastUpdateTime.get(key);
    if (!lastUpdateTime) return false;
    return Date.now() - lastUpdateTime < CACHE_EXPIRE_TIME;
}

/**
 * 更新缓存时间
 */
function updateCacheTime(key: string): void {
    cache.lastUpdateTime.set(key, Date.now());
}

/**
 * 获取枚举类型列表
 * @param typeNames 指定要加载的枚举类型名称，可以是字符串或字符串数组，不传则加载所有
 */
export async function getEnumTypes(
    typeNames?: string | string[],
    apiConfig?: ApiConfig
): Promise<EnumType[]> {
    try {
        const cacheKey = 'enum_types';
        const now = Date.now();

        // 检查缓存是否有效
        if (isCacheValid(cacheKey)) {
            if (typeNames) {
                const names = Array.isArray(typeNames) ? typeNames : [typeNames];
                return names
                    .map(name => cache.enumTypes.get(name))
                    .filter((type): type is EnumType => type !== undefined);
            }
            return Array.from(cache.enumTypes.values());
        }

        // 构建查询条件
        const where: any = { is_active: { _eq: true } };
        if (typeNames) {
            const names = Array.isArray(typeNames) ? typeNames : [typeNames];
            where.type_name = { _in: names };
        }

        // 从数据库获取数据
        const result = await enumTypeCurd.query({
            where,
            limit: typeNames ? (Array.isArray(typeNames) ? typeNames.length : 1) : DEFAULT_TYPE_LIMIT,
            fields: [
                'id',
                'type_name',
                'description',
                'is_active',
                {
                    name: 'enum_values',
                    args: {
                        limit: DEFAULT_VALUE_LIMIT,
                        order_by: { sort_order: () => 'desc_nulls_first', created_at: () => 'desc_nulls_first' },
                    },
                    fields: enum_values_fields,
                }, {
                    name: 'enum_values_aggregate',
                    fields: ['aggregate{count}'],
                }
            ]
        }, apiConfig);

        // 更新缓存
        result.forEach((type: EnumType & { enum_values?: EnumValue[], enum_values_aggregate?: { aggregate: { count: number } } }) => {
            cache.enumTypes.set(type.type_name, {
                id: type.id,
                type_name: type.type_name,
                description: type.description,
                is_active: type.is_active,
                created_at: type.created_at,
                updated_at: type.updated_at
            });

            if (type.enum_values?.length) {
                cache.enumValues.set(type.type_name, type.enum_values);
                updateCacheTime(type.type_name);
            }

            // 保存总数
            if (type.enum_values_aggregate?.aggregate?.count !== undefined) {
                cache.totalCounts.set(type.type_name, type.enum_values_aggregate.aggregate.count);
            }
        });

        updateCacheTime(cacheKey);
        return result;
    } catch (error: any) {
        throw new EnumError(`获取枚举类型失败: ${error.message}`);
    }
}

/**
 * 获取枚举值
 * @param typeName 枚举类型名称
 * @param page 页码（从1开始）
 * @param pageSize 每页数量，默认DEFAULT_VALUE_LIMIT
 */
export async function getEnumValues(
    typeName: string,
    page: number = 1,
    pageSize: number = DEFAULT_VALUE_LIMIT,
    apiConfig?: ApiConfig
): Promise<{ values: EnumValue[], hasMore: boolean }> {
    try {
        // 先验证枚举类型是否存在
        const types = await getEnumTypes(typeName, apiConfig);
        if (!types.length) {
            return { values: [], hasMore: false };
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        // 检查缓存是否有效
        if (isCacheValid(typeName)) {
            const currentValues = cache.enumValues.get(typeName) || [];
            const totalCount = cache.totalCounts.get(typeName) || 0;
            
            // 如果缓存中的数据足够，直接返回
            if (currentValues.length >= end) {
                return {
                    values: currentValues.slice(start, end),
                    hasMore: currentValues.length < totalCount
                };
            }
            
            // 如果缓存中的数据不足，但总数已经知道，说明数据已经加载完了
            if (currentValues.length === totalCount) {
                return {
                    values: currentValues.slice(start, end),
                    hasMore: false
                };
            }
        }

        // 获取当前缓存的值
        const currentValues = cache.enumValues.get(typeName) || [];

        // 请求新数据
        const result = await enumValueCurd.query({
            where: { 
                enum_types_enum_types: { _eq: types[0].id },
                is_active: { _eq: true }
            },
            order_by: { sort_order: () => 'desc_nulls_first', created_at: () => 'desc_nulls_first' },
            offset: currentValues.length,
            limit: end - currentValues.length,
            aggregate_fields: 'count'
        }, apiConfig);

        const total = result.enum_values_aggregate?.aggregate?.count || 0;
        const newValues = [...currentValues, ...result.enum_values];
        
        // 更新缓存
        cache.enumValues.set(typeName, newValues);
        cache.totalCounts.set(typeName, total);
        updateCacheTime(typeName);

        return {
            values: newValues.slice(start, end),
            hasMore: newValues.length < total
        };
    } catch (error: any) {
        throw new EnumError(`获取枚举值失败: ${error.message}`);
    }
}

/**
 * 搜索枚举值
 * @param typeName 枚举类型名称
 * @param keyword 搜索关键词
 * @param page 页码（从1开始）
 * @param pageSize 每页数量，默认DEFAULT_VALUE_LIMIT
 */
export async function searchEnumValues(
    typeName: string,
    keyword: string,
    page: number = 1,
    pageSize: number = DEFAULT_VALUE_LIMIT,
    apiConfig?: ApiConfig
): Promise<{ values: EnumValue[], hasMore: boolean }> {
    try {
        const searchKey = `${typeName}:${keyword}`;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        // 检查搜索记录
        if (cache.searchRecords.has(searchKey)) {
            const record = cache.searchRecords.get(searchKey)!;
            if (isCacheValid(searchKey)) {
                const values = cache.enumValues.get(typeName) || [];
                const filteredValues = values.filter((value: EnumValue) => 
                    value.enum_value.toLowerCase().includes(keyword.toLowerCase()) ||
                    (value.description && value.description.toLowerCase().includes(keyword.toLowerCase()))
                );
                
                if (filteredValues.length >= end) {
                    return {
                        values: filteredValues.slice(start, end),
                        hasMore: filteredValues.length > end
                    };
                }
            }
        }

        const types = await getEnumTypes([typeName], apiConfig);
        if (!types.length) {
            return { values: [], hasMore: false };
        }

        const result = await enumValueCurd.query({
            where: { 
                enum_types_enum_types: { _eq: types[0].id },
                is_active: { _eq: true },
                _or: [
                    { enum_value: { _ilike: `%${keyword}%` } },
                    { description: { _ilike: `%${keyword}%` } }
                ]
            },
            order_by: { sort_order: () => 'desc_nulls_first', created_at: () => 'desc_nulls_first' },
            offset: start,
            limit: pageSize + 1,
            aggregate_fields: 'count'
        }, apiConfig);

        const total = result.enum_values_aggregate?.aggregate?.count || 0;
        const values = result.enum_values.slice(0, pageSize);
        
        // 更新搜索记录
        cache.searchRecords.set(searchKey, {
            keyword,
            total,
            hasMore: result.enum_values.length > pageSize,
            lastUpdateTime: Date.now()
        });

        // 更新缓存
        const currentValues = cache.enumValues.get(typeName) || [];
        const newValues = values.filter((value: { id: number; }) => 
            !currentValues.some(v => v.id === value.id)
        );
        cache.enumValues.set(typeName, [...currentValues, ...newValues]);
        updateCacheTime(typeName);

        return { 
            values, 
            hasMore: result.enum_values.length > pageSize 
        };
    } catch (error: any) {
        throw new EnumError(`搜索枚举值失败: ${error.message}`);
    }
}

/**
 * 清除缓存
 * @param typeName 枚举类型名称，不传则清除所有缓存
 */
export function clearCache(typeName?: string): void {
    try {
        if (typeName) {
            cache.enumTypes.delete(typeName);
            cache.enumValues.delete(typeName);
            cache.searchRecords.delete(typeName);
            cache.lastUpdateTime.delete(typeName);
            cache.totalCounts.delete(typeName);
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
            cache.totalCounts.clear();
        }
    } catch (error: any) {
        throw new EnumError(`清除缓存失败: ${error.message}`);
    }
}
