import * as FIELDS from '../fileds'
import { initUnified } from '../unified';

export function viplevel() {
	return {
		...initUnified("viplevel", [
			'id', // 会员等级ID
			'name', // 会员等级名称
			'description', // 小程序前端展示vip权益描述
			'min_growth_value', // 成长值最低达到多少
			'img{id url}', // 会员样式背景
			'status' // 标签启用状态
		])
	}
}

export function viplevelPrivilege() {
	return {
		...initUnified("viplevel_privilege", [
			'id', // 权益ID
			'viplevel_viplevel', // 关联的会员等级
			'name', // 权益名称
			'value' // 折扣值
		])
	}
}

