import card from './card';
export const getCardList = async (params: any = {}) => {
    const { pageSize = 10, pageNumber = 1, order_by = '最新上架', category_id, search } = params;
    const category_category = { _eq: category_id };
    const search_condition = { _like: `%${search}%` };

    if (['最新上架', '热门卡牌'].includes(order_by)) return await card.getCardList({
        pageSize,
        pageNumber,
        where: {
            ...(category_id && category_category || {}),
            // ...(search && search_condition || {}),
        },
        order_by: {
            ...(order_by && order_by === '最新上架' && { edit_time: () => 'desc_nulls_first' } || {}),
            ...(order_by && order_by === '热门卡牌' && { like_number: { _desc: true } } || {}),
        }
    })

}
