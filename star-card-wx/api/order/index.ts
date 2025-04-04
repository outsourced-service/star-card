import CurdService from "@/utils/ezInstance/curd";
const order = new CurdService("order", ['id', 'mode', 'title', 'exp_time', 'evaluation_name']);
const orderInfo = new CurdService("order_info", ['id order_id order_info_id payment_method payment_pk pay_amount total_price discount_amount deliver_fee insure_fee insure_amount coupon_amount pay_score_amount total_score order_time pay_time estimate_time exp_time come_from num evaluation_notes notes delivery_name delivery_number back_delivery_number is_supplementary_payment is_select is_deleted is_tips stock_status coupon_status text_status process_status status']);

export const getOrderList = async (params: any) => {
	return await order.query({
		limit: params.limit,
		offset: params.offset,
		where: params.where,
		fields: ['id', 'mode', 'title', 'exp_time', 'evaluation_name', {
			name: 'evaluation',
			fields: ['id type name logo{id url} order_logo_img{id url} cover{id url} img{id url} exp_time order_title province city area ui_color_one ui_color_two']
		}]
	}, {isReqLoading: false});
};

export const getOrderAllList = async (params: any) => {
	return order.query({
		limit: params.limit,
		offset: params.offset,
		where: params.where,
		fields: ['id', 'mode', 'title', 'exp_time', 'evaluation_name', {
			name: 'order_info',
			args: {
				limit: params.limit,
				where: {
					status: params.status ? { _eq: params.status } : {},
					process_status: params.process_status ? { _eq: params.process_status } : {},
					id: params.order_info_id ? { _eq: params.order_info_id } : {}
				}
			},
			fields: ['id order_id order_info_id payment_method payment_pk pay_amount total_price discount_amount deliver_fee insure_fee insure_amount coupon_amount pay_score_amount total_score order_time pay_time estimate_time exp_time come_from num evaluation_notes notes delivery_name delivery_number back_delivery_number is_supplementary_payment is_select is_deleted is_tips stock_status coupon_status text_status process_status status', {
				name: 'order_info_paydetail',
				fields: ['id type inc_amount deal_type attach_data describe']
			}, {
				name: 'order_annex',
				fields: ['id dir img{id url}']
			}, {
				name: 'order_user_annex',
				fields: ['id img{id url}']
			}]
		}, {
			name: 'evaluation',
			// args: {
			// 	where: {
			// 		name: params.evaluationName ? { _ilike: `%${params.evaluationName}%` } : {}
			// 	}
			// },
			fields: ['id type name logo{id url} order_logo_img{id url} cover{id url} img{id url} exp_time order_title province city area ui_color_one ui_color_two']
		}]
	}, {isReqLoading: false});
};

export const getOrderInfoList = async (params: any) => {
	return await orderInfo.query({
		limit: params.limit,
		offset: params.offset,
		where: params.where,
		fields: ['id order_id order_info_id payment_method payment_pk pay_amount total_price discount_amount deliver_fee insure_fee insure_amount coupon_amount pay_score_amount total_score order_time pay_time estimate_time exp_time come_from num evaluation_notes notes delivery_name delivery_number back_delivery_number is_supplementary_payment is_select is_deleted is_tips stock_status coupon_status text_status process_status status', {
				name: 'order_annex',
				fields: ['id dir img{id url}']
			}, {
				name: 'order_user_annex',
				fields: ['id img{id url}']
		}]
	}, {isReqLoading: false});
};

export const getOrderInfoDetail = async (id: number) => {
	return orderInfo.query({
		limit: 1,
		where: {
			id: { _eq: id }
		},
		fields: ['id order_id order_info_id payment_method payment_pk pay_amount total_price discount_amount deliver_fee insure_fee insure_amount coupon_amount pay_score_amount total_score order_time pay_time estimate_time exp_time come_from num evaluation_notes notes delivery_name delivery_number back_delivery_number is_supplementary_payment is_select is_deleted is_tips stock_status coupon_status text_status process_status status', {
			name: 'order_info_paydetail',
			fields: ['id type inc_amount deal_type attach_data describe']
		}, {
			name: 'order_annex',
			fields: ['id dir img{id url}']
		}, {
			name: 'order_user_annex',
			fields: ['id img{id url}']
		}, {
			name: 'evaluation',
			fields: ['id type name logo{id url} order_logo_img{id url} cover{id url} img{id url} exp_time order_title province city area ui_color_one ui_color_two']
		}]
	}, {isReqLoading: false});
};

export default {
	getOrderList,
	getOrderAllList,
	getOrderInfoList,
	getOrderInfoDetail
}