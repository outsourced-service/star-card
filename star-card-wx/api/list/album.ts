import CurdService from '@/utils/ezInstance/curd';

// 创建卡册列表的 CRUD 实例
const albumList = new CurdService('album', [
    'id',
    'name',
    'description',
    'cover_image',
    'card_count',
    'status',
    'created_at',
    'updated_at'
]);

export default {
    // 获取卡册列表
    getAlbumList: async (params: any) => {
        return await albumList.query({
            ...params,
            limit: params.pageSize,
            offset: (params.pageNumber - 1) * params.pageSize,
            where: {
                is_deleted: { _eq: false }
            }
        });
    },

    // 获取卡册详情
    getAlbumDetail: async (id: number) => {
        return await albumList.query({ id });
    },

    // 创建卡册
    createAlbum: async (data: any) => {
        return await albumList.insert(data);
    },

    // 更新卡册
    updateAlbum: async (id: number, data: any) => {
        return await albumList.update({
            id,
            _set: data
        });
    },

    // 删除卡册（软删除）
    deleteAlbum: async (id: number) => {
        return await albumList.delete({ id });
    }
}; 