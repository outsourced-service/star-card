import { initUnified } from './unified';
// import ezInstance from '/@/utils/ezInstance';// 引入ezcloud工具，用于执行数据操作  
// const { api, ezserver } = ezInstance

/* 用户管理 */
export function user() {
	return {
		...initUnified("user", ['id password username mobile nickname avatar{id url} name sex birthday profile']),
	}
}

/* 送评机构管理 */
export function evaluation() {
    return {
		...initUnified("evaluation", ['id name logo{id url} cover{id url} img{id url} sort_weight exp_time order_title consignee phone province city area address_detail']),
	}
}

/* 送评机构档位管理 */
export function evaluationInsurance() {
    return {
		...initUnified("evaluation_insurance", ['id name description card_price_limit card_often card_special_restrictions estimated_time_frame label_name price is_input'])
	}
}

/* 送评机构档位选项管理 */
export function evaluationInsuranceInfo() {
	return {
		...initUnified("evaluation_insurance_info", ['id type name cover{id url} description price'])
	}
}

/* 送评机构附件管理 */
export function evaluationAnnex() {
	return {
		...initUnified("evaluation_annex", ['id dir img{id url} text'])
	}
}

/* 送评机构相关权益数据管理 */
export function evaluationPrivilege() {
	return {
		...initUnified("evaluation_privilege", ['id num_limit num_discount description'])
	}
}

/* 卡片搜索图鉴库管理 */
export function cardLibrary() {
    return {
        ...initUnified("card_library", [
            'id',
            'type_category', // 卡片大类
            'card_cover{id url}', // 卡片封面图，正面
            'card_img{id url}', // 卡片封面图，背面
            'card_name', // 卡片完整名称
            'card_category', // 卡片类别名称完整命名
            'cn_category', // 卡片类别名称中文
            'eng_category', // 卡片类别名称英文
            'img_category{id url}', // 卡片类别名称logo
            'particular_year', // 卡片年份日期格式
            'card_year', // 卡片年份
            'year_remarks', // 备用年份
            'cn_publisher', // 卡片发行商名称中文
            'eng_publisher', // 卡片发行商名称英文
            'img_publisher{id url}', // 卡片发行商名称图片logo
            'card_ranks', // 卡片队伍昵称
            'abbr_ranks', // 卡片队伍中文缩写
            'cn_ranks', // 卡片队伍名称中文
            'eng_ranks', // 卡片队伍名称英文
            'img_ranks{id url}', // 卡片队伍名称图片logo
            'card_series', // 卡片系列昵称
            'abbr_series', // 卡片系列缩写
            'img_series{id url}', // 卡片系列名称图片logo
            'cn_sub_series', // 卡片子系列名称中文
            'eng_sub_series', // 卡片子系列名称英文
            'card_number', // 卡片编号
            'card_role', // 卡片角色昵称
            'cn_role', // 卡片角色名称中文
            'eng_role', // 卡片角色名称英文
            'img_role{id url}', // 卡片角色名称图片logo
            'cn_rare_degree', // 卡片罕见度名称中文
            'eng_rare_degree', // 卡片罕见度名称英文
            'limited_edition', // 卡片罕见度英文限编
            'cn_position', // 卡片位置名称中文
            'eng_position', // 卡片位置名称英文
            'cn_attribute', // 属性中文
            'eng_attribute', // 属性英文
            'cn_language', // 语言中文
            'eng_language', // 语言英文
            'cn_series_types', // 系列种类中文
            'eng_series_types', // 系列种类英文
			'card_code', //卡牌编号
            'illustrator' // 插画师
        ])
    }
}

/* 优惠券管理 */
export function coupon() {
    return {
        ...initUnified("coupon", ['id name img{id url} show_name type amount_cny min_price_cny discount_rate activity_starttime activity_endtime start_time exp_time max_use_limit describe status'])
    }
}

/* 轮播图 */
export function banner() {
	return initUnified("banner", ['id name idx path attach_data status img{id url} video{id url} type exp_time order_title resource_type'])
}

/* 资源库 */
export function resource() {
	return initUnified("resource", ['id name dir title idx is_variable text path attach_data img{id url} video{id url} file{id url} resource_type'])
}