import CurdService from '@/utils/ezInstance/curd';


const fields = [
    "id",
    "nickname",
    "avatar{id url}",
    "city",
    {
        alias: "follow_count",         // 关注数量
        name: "user_visit_record_aggregate",
        args: {
            where: {
                is_follow: { _eq: true }
            }
        },
        fields: [{
            name: "aggregate",
            fields: ['count']
        }]
    },
    {
        alias: "card_count",         // 卡牌数量
        name: "user_card",
        args: {
            where: {
                is_open: { _eq: true },
                is_edit: { _eq: true },
            }
        },
        fields: [{
            name: "aggregate",
            fields: ['count']
        }]
    },
];