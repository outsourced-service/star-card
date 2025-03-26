// @ts-nocheck
const {
	getPayload,
	query,
	mutation,
	parseJwtToken,
	getClientinfo,
	callScf,
	find
} = ezcloud;

const {
	user_token,
	developer_token
} = getClientinfo();

const {
	user_pk
} = parseJwtToken(user_token);

// 获取用户基本信息和统计数据
const [user] = query({
	name: "user",
	args: {
		where: {
			id: {
				_eq: user_pk,
			},
		},
	},
	fields: [
		// 基本信息字段
		`id 
		nickname 
		avatar{id url}
		profile
		mobile
		birthday
		created_at
		updated_at
		`,
		{
			alias: "order_aggregate",
			name: "a_order_aggregate",
			args: {
				where: {
					order_status: { _neq: "AWAITING_ORDER" }
				}
			},
			fields: ["aggregate{count}"]
		},
		// 关注统计
		{
			name: "photographer",
			fields: ["id photographer_name photographer_status approval_status", {
				alias: "follows",
				name: "photographer_uv_aggregate",
				args: {
					where: { is_favorite: { _eq: true } }
				},
				fields: ["aggregate{count}"]
			}]
		},
		{
			alias: "followers",
			name: "photographer_uv_aggregate",
			args: {
				where: {
					is_favorite: { _eq: true }
				}
			},
			fields: ["aggregate{count}"]
		},
		// 收藏统计
		{
			alias: "posts_favorites",
			name: "posts_uv_aggregate",
			args: {
				where: {
					is_favorite: { _eq: true }
				}
			},
			fields: ["aggregate{count}"]
		},
		{
			alias: "service_favorites",
			name: "service_uv_aggregate",
			args: {
				where: {
					is_favorite: { _eq: true }
				}
			},
			fields: ["aggregate{count}"]
		},
		{
			alias: "works_favorites",
			name: "works_uv_aggregate",
			args: {
				where: {
					is_favorite: { _eq: true }
				}
			},
			fields: ["aggregate{count}"]
		},
		// 卡券统计
		// {
		// 	alias: "coupons",
		// 	name: "coupon_user_aggregate",
		// 	args: {
		// 		where: {
		// 			status: { _eq: "VALID" }
		// 		}
		// 	},
		// 	fields: ["aggregate{count}"]
		// }
	]
});

// 返回用户基本信息和统计数据
const { followers, posts_favorites, service_favorites, works_favorites, order_aggregate, coupons, photographer, ...userInfo } = user;
const { follows = {}, ...photographerInfo } = photographer || {};

// 计算统计数据
const followersCount = followers?.aggregate?.count || 0;
const followsCount = follows?.aggregate?.count || 0;
const ordersCount = order_aggregate?.aggregate?.count || 0;
const couponsCount = coupons?.aggregate?.count || 0;
const favoritesCount = (
	(posts_favorites?.aggregate?.count || 0) +
	(service_favorites?.aggregate?.count || 0) +
	(works_favorites?.aggregate?.count || 0)
);

return {
	...userInfo,
	fens_count: followsCount, // 关注我的数量
	followers_count: followersCount, // 我关注的数量
	favorites_count: favoritesCount, // 我的收藏数量(动态、服务、作品)
	posts_favorites: posts_favorites?.aggregate?.count || 0, // 我的收藏数量(动态)
	service_favorites: service_favorites?.aggregate?.count || 0, // 我的收藏数量(服务)
	works_favorites: works_favorites?.aggregate?.count || 0, // 我的收藏数量(作品)
	orders_count: ordersCount, // 订单数量
	coupons_count: couponsCount, // 卡券数量
	is_photographer: Boolean(photographerInfo?.id && photographerInfo?.photographer_status === "启用" && photographerInfo?.approval_status === "已通过"), // 是否为摄影师
	photographer: photographerInfo || null // 摄影师信息
};