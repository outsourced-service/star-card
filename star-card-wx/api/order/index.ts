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
			fields: ['id', 'name', 'order_logo_img']
		}, {
			name: 'order_info',
			fields: ['id', 'status', 'number', 'price', 'image', 'name', 'size', 'type']
		}]
	}, {isReqLoading: false});
};

export default {
	getOrderList,
	getOrderInfoList(params: any) {
	    return orderInfo.query({
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
	},
}