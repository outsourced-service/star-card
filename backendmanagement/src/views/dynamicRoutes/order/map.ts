const statusMap = <any>{
	'STOCK_LOCKED': '库存锁定',
	'STOCK_RESTORED': '库存恢复',
	'COUPON_LOCKED': '优惠券锁定',
	'COUPON_RESTORED': '优惠券恢复',
	'ORDER_CREATED': '订单创建，待用户寄出',
	'USER_SENT': '用户已寄出',
	'COURIER_SIGNED': '快递已签收',
	'PACKAGED_IN_STORAGE': '已拆包入库，订单准备中',
	'INSPECTION_COMPLETED': '已完成验品，待发车',
	'SHIPPED': '已发车, 待抵达评级机构',
	'ARRIVED': '抵达机构',
	'RESEARCH_ID': '信息核对中',
	'GRADING': '评分中',
	'ASSEMBLY': '封装中',
	'SHIPPING': '已出分, 待机构寄回',
	'INSTITUTION_SENT': '机构已寄出',
	'PACKAGING': '抵达星卡仓库, 打包中',
	'RETURNED_TO_PLAYER': '已寄回玩家',
	'PLAYER_SIGNED': '玩家已签收，订单完成',
	'ORDER_SUBMITTED': '已提交',
	'ORDER_PAID': '已付款',
	'ORDER_NOT_IN_STORAGE': '未入库',
	'ORDER_IN_STORAGE': '已入库',
	'PROCESSING': '流程中',
	'RESULT_OUT': '已出分',
	'COMPLETED_PROCESS': '已完成',
};

export const getStatus = (status: string, type?: string) => {
	const statusStr = statusMap[status];
	if (typeof statusStr === 'function') return statusStr(type);
	return statusStr || "未知状态";
};

// 订单支付状态选项
export const processStatusOptions = [
	{ label: "全部", value: "ALL", status: { _neq: '待下单' }, description: '全部订单' },
	{ label: "已提交", value: "已提交", status: { _eq: '已提交' }, description: '已提交订单' },
	{ label: "待付款", value: "待付款", status: { _eq: '待付款' }, description: '待付款订单' },
	{ label: "已付款", value: "已付款", status: { _eq: '已付款' }, description: '已付款订单' },
];

// 订单入库状态选项
export const statusOptions = [
	{ label: "未入库", value: "未入库", status: { _eq: '未入库' }, description: '未入库订单' },
	{ label: "已入库", value: "已入库", status: { _eq: '已入库' }, description: '已入库订单' },
	{ label: "流程中", value: "流程中", status: { _eq: '流程中' }, description: '流程中订单' },
	{ label: "已出分", value: "已出分", status: { _eq: '已出分' }, description: '已出分订单' },
	{ label: "已完成", value: "已完成", status: { _eq: '已完成' }, description: '已完成订单' },
];

// 订单文本状态选项
export const textStatusOptions = [
	{ label: "创建待寄", value: "ORDER_CREATED", status: { _eq: 'ORDER_CREATED' }, description: '订单创建，待用户寄出' },
	{ label: "用户寄出", value: "USER_SENT", status: { _eq: 'USER_SENT' }, description: '用户已寄出' },
	{ label: "快递签收", value: "COURIER_SIGNED", status: { _eq: 'COURIER_SIGNED' }, description: '快递已签收' },
	{ label: "拆包入库", value: "PACKAGED_IN_STORAGE", status: { _eq: 'PACKAGED_IN_STORAGE' }, description: '已拆包入库，订单准备中' },
	{ label: "验品完成", value: "INSPECTION_COMPLETED", status: { _eq: 'INSPECTION_COMPLETED' }, description: '已完成验品，待发车' },
	{ label: "已发车", value: "SHIPPED", status: { _eq: 'SHIPPED' }, description: '已发车, 待抵达评级机构' },
	{ label: "抵达机构", value: "ARRIVED", status: { _eq: 'ARRIVED' }, description: '抵达机构' },
	{ label: "信息核对", value: "RESEARCH_ID", status: { _eq: 'RESEARCH_ID' }, description: '信息核对中' },
	{ label: "评分中", value: "GRADING", status: { _eq: 'GRADING' }, description: '评分中' },
	{ label: "封装中", value: "ASSEMBLY", status: { _eq: 'ASSEMBLY' }, description: '封装中' },
	{ label: "已出分", value: "SHIPPING", status: { _eq: 'SHIPPING' }, description: '已出分, 待机构寄回' },
	{ label: "机构寄出", value: "INSTITUTION_SENT", status: { _eq: 'INSTITUTION_SENT' }, description: '机构已寄出' },
	{ label: "星卡仓库", value: "PACKAGING", status: { _eq: 'PACKAGING' }, description: '抵达星卡仓库, 打包中' },
	{ label: "已寄回", value: "RETURNED_TO_PLAYER", status: { _eq: 'RETURNED_TO_PLAYER' }, description: '已寄回玩家' },
	{ label: "玩家签收", value: "PLAYER_SIGNED", status: { _eq: 'PLAYER_SIGNED' }, description: '玩家已签收，订单完成' },
];

