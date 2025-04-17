import CurdService from '@/utils/ezInstance/curd';

const fields = [
    'id',
    'user_cardcabinet_user_cardcabinet', // 用户卡柜
    'card_id',                           // 评级卡卡片编号id
    'evaluation',                        // 送评机构
    'card_type',                         // 卡牌种类（评级卡/裸卡/原封砖）
    'card_year',                         // 卡片年份
    'particular_year',                   // 卡片年份日期格式
    'card_category',                     // 卡片类型
    'cn_category',                       // 卡片类别名称中文
    'eng_category',                      // 卡片类别名称英文
    'cn_publisher',                      // 卡片发行商名称中文
    'card_series',                       // 卡牌系列
    'card_role',                         // 卡片角色昵称
    'cn_sub_series',                     // 卡片子系列名称中文
    'card_number',                       // 卡片编号
    'rarity_degree',                     // 罕贵度
    'limited_edition',                   // 卡片罕见度名称英文限编
    'card_name',                         // 卡片名称
    'card_cover{id url}',                // 卡片封面图（正面）
    'card_img{id url}',                  // 卡片封面图（背面）
    'card_sign',                         // 卡片签字
    'category_score',                    // 卡品分数
    'sign_score',                        // 卡片签字分
    'current_score',                     // 当前评分存世量
    'max_score',                         // 更高评分存世量
    'edit_time',                         // 卡片录入小程序发布时间
    // 'is_relation',                      // 是否关联爬虫信息标识
    // 'is_new',                           // 是否展示new标识
    // 'is_top',                           // 是否置顶
    // 'is_select',                        // 编辑卡册时是否选中
    // 'is_edit',                          // 是否完成编辑
    // 'is_open',                          // 是否公开
    // 'card_remarks',                     // 卡片备注
    // 'date_obtained',                    // 获得日期
    // 'get_price',                        // 获得价格
    // 'status',                           // 卡片状态
    {
        alias: "collect_count",         // 收藏数量
        name: "user_visit_record_aggregate",
        args: {
            where: {
                is_collected: { _eq: true }
            }
        },
        fields: [{
            name: "aggregate",
            fields: ['count']
        }]
    }
];

// 创建卡牌列表的 CRUD 实例
const cardList = new CurdService('user_card', fields);

export default {
    fields,
    // 获取卡牌列表
    getCardList: async (params: any) => {
        const { pageSize = 10, pageNumber = 1, order_by, where } = params;
        return await cardList.query({
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize,
            where: {
                ...(where || {}),
                is_edit: { _eq: true },
                is_open: { _eq: true },
                // status: { _eq: '已上架' }
            },
            order_by,
            fields
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