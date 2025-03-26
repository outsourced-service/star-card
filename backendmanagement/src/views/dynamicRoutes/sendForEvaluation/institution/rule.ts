export default {
    name: { required: true, message: '请输入机构名称', trigger: 'blur' },
	exp_time: { required: true, message: '请选择截止日期时间', trigger: 'change' },
	order_title: { required: true, message: '请输入订单批次', trigger: 'blur' },
	consignee: { required: true, message: '请输入收货人名称', trigger: 'blur' },
	phone: [
		{ required: true, message: '请输入收货人电话', trigger: 'blur' },
		{ 
			pattern: /^1[3-9]\d{9}$/, // 这里是一个简单的手机号正则表达式
			message: '请输入有效的手机号码', 
			trigger: 'blur' 
		}
	],
	province: { required: true, message: '请输入所在省份', trigger: 'blur' },
	city: { required: true, message: '请输入所在城市', trigger: 'blur' },
	area: { required: true, message: '请输入所在地区', trigger: 'blur' },
	address_detail: { required: true, message: '请输入详细地址', trigger: 'blur' },
	logo_id: { required: true, message: '请选择logo', trigger: ['change', 'blur'] },
	cover_id: { required: true, message: '请选择封面', trigger: 'blur' },
	img_id: { required: true, message: '请选择水印背景图', trigger: 'change' },
}