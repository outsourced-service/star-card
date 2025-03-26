import * as FIELDS from '../fileds'
import { initUnified, getQueOne } from '../unified';

const MODEL: string[] = [
	'category',
	'tags',
	'goods_intro',
	'goods_tags',
	'goods_attri',
	'goods_attri_spec',
	'goods_sku_attri_spec',
]

interface ShoppingMallFunctions {
	category: Function;
	tags: Function;
	goods_intro: Function;
	goods_tags: Function;
	goods_attri: Function;
	goods_attri_spec: Function;
	goods_sku_attri_spec: Function;
	[key: string]: Function;
}

const shoppingMall: ShoppingMallFunctions = MODEL.reduce((prev: ShoppingMallFunctions, curr: string) => {
	prev[curr] = () => initUnified(curr, (FIELDS as any)[curr]);
	return prev;
}, {} as ShoppingMallFunctions);

export default {
	goodsDetail: (ID:number) => getQueOne('goods', ID, [
		FIELDS.goods,
		FIELDS.getFileds('category'),
		{ name: "goods_tags", fields: ['id',FIELDS.getFileds('tags')] },
	]),
	goods: () => initUnified('goods', [
		FIELDS.goods,
		FIELDS.getFileds('category'),
		{ name: "goods_tags", fields: ['id',FIELDS.getFileds('tags')] },
	]),
	goods_sku: () => initUnified('goods_sku',[
		FIELDS.goods_sku,
		FIELDS.getFileds('goods_sku_attri_spec'),
	]),
	...shoppingMall
};

