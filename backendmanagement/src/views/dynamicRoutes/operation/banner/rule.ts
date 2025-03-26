export default {
    resource_type: { required: true, message: '请选择资源类型', trigger: 'change' },
    name: { required: true, message: '请输入轮播图名称', trigger: 'blur' },
    type: { required: true, message: '请选择轮播图分类', trigger: 'blur' },
    // title: { required: true, message: '请输入标题/描述', trigger: 'blur' },
}