export default {
    name: { required: true, message: '请输入会员等级名称', trigger: 'blur' },
    description: { required: true, message: '请输入VIP权益描述', trigger: 'blur' },
    min_growth_value: { required: true, message: '请输入成长值最低达到多少', trigger: 'blur' },
    img: { required: true, message: '请上传会员样式背景', trigger: 'change' },
    status: { required: true, message: '请选择标签启用状态', trigger: 'change' },
}; 