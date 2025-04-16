import CurdService from '@/utils/ezInstance/curd';

const fields = [
    'id',
    'title',
    'card_name',           // 卡片名称
    'card_number',         // 卡片编号
    'card_type',          // 卡片类型（如 PSA）
    'grade',              // 评级分数
    'signature',          // 签名
    'price',              // 价格
    'description',        // 描述
    'status',            // 状态
    'eng_category',      // 英文分类（如 Basketball）
    'eng_publisher',     // 英文发行商（如 Kobe Bryant）
    'card_cover',        // 卡片封面图片
    'card_img{id url}',  // 卡片图片
    'is_new',           // 是否新卡
    'is_like',          // 是否被喜欢
    'like_number',      // 喜欢数量
]

// 创建卡牌列表的 CRUD 实例
const cardList = new CurdService('card', fields);

export default {
    fields,
    // 获取卡牌列表
    getCardList: async (params: any) => {
        return await cardList.query({
            ...params,
            limit: params.pageSize,
            offset: (params.pageNumber - 1) * params.pageSize,
            where: {
                is_deleted: { _eq: false }
            }
        });
    },

    // 获取卡牌详情
    getCardDetail: async (id: number) => {
        return await cardList.query({ id });
    },

    // 创建卡牌
    createCard: async (data: any) => {
        return await cardList.insert(data);
    },

    // 更新卡牌
    updateCard: async (id: number, data: any) => {
        return await cardList.update({
            id,
            _set: data
        });
    },

    // 删除卡牌（软删除）
    deleteCard: async (id: number) => {
        return await cardList.delete({ id });
    }
}; 