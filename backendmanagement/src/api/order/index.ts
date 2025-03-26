import * as FIELDS from '../fileds'
import { initUnified } from '../unified';

const MODEL: string[] = [
	'order_info_paydetail',
	'order_progress',
	'order_user_annex',
	'order_goods_sku',
	'order_goods_attri_spec',
	'order_address',
	'order_evaluation_insurance',
	'order_evaluation_insurance_info',
]

interface OrderFunctions {
	order_info_paydetail: Function;
	order_progress: Function;
	order_user_annex: Function;
	order_goods_sku: Function;
	order_goods_attri_spec: Function;
	order_address: Function;
	order_evaluation_insurance: Function;
	order_evaluation_insurance_info: Function;
	[key: string]: Function;
}

const order: OrderFunctions = MODEL.reduce((prev: OrderFunctions, curr: string) => {
	prev[curr] = () => initUnified(curr, (FIELDS as any)[curr]);
	return prev;
}, {} as OrderFunctions);

export default {
	order: () => initUnified('order', [
		FIELDS['order'],
		FIELDS.aggregate.getFileds('order_info', {
			where: {
				process_status: { _eq: "已付款" },
			}
		}),
	]),
	order_info: (isSend: Boolean = true) => initUnified('order_info', [
		FIELDS['order_info'],
		FIELDS.getFileds('order_address', {
			order_by: { __QUOTOFF__: { set_default_num: 'desc_nulls_last' } },
		}),
		...(isSend ? [
			FIELDS.aggregate.getFileds('order_info'),
			FIELDS.getFileds('order_annex'),
			FIELDS.getFileds('order_user_annex'),
			FIELDS.getFileds('order_evaluation_insurance'),
			FIELDS.getFileds('order_evaluation_insurance_info'),
			FIELDS.getFileds('order_scoring_annex', {}, [
				FIELDS.getFileds('card_img'),
				FIELDS.getFileds('card_info'),
			]),
		] : [
			FIELDS.getFileds('order_goods_sku', {}, [
				FIELDS.getFileds('order_goods_attri_spec'),
			]),
		]),

	]),
	SupplementaryPaymentOrder: () => initUnified('order_info', [
		FIELDS['order_info'],
		FIELDS.getFileds('order_scoring_annex', {}, [
			FIELDS.getFileds('card_img'),
			FIELDS.getFileds('card_info'),
		]),
	]),
	...order,
};

