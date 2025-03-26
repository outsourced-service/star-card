export default {
    resource_type: { required: true, message: '请选择资源类型', trigger: 'change' },
    name: { required: true, message: '请输入资源名称', trigger: 'blur' },
    dir: { required: true, message: '请输入资源目录', trigger: 'blur' },
    // title: { required: true, message: '请输入标题/描述', trigger: 'blur' },
}