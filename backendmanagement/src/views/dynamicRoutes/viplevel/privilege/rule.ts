export default {
    type: { required: true, message: '请选择档位选项类型', trigger: 'change' },
	name: { required: true, message: '请输入选项名称', trigger: 'blur' },
	description: { required: true, message: '请输入尺寸或描述', trigger: 'blur' },
	cover_id: { required: true, message: '请上传封面图片', trigger: 'blur' },
}