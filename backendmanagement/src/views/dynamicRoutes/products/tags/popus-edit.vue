<template>
	<div class="system-user-dialog-container">
		<el-dialog title="标签信息" v-model="dialog.isShowDialog">
			<el-form ref="curdFormRef" :model="dialog.ruleForm" size="default" label-width="auto"
				:rules="dialog.rules">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="标签名称" prop="name">
							<el-input v-model="dialog.ruleForm.name" type="text" placeholder="请输入标签名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="排序" prop="idx">
							<el-input v-model="dialog.ruleForm.idx" type="number" placeholder="请输入排序" clearable />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="closeDialog">取 消</el-button>
					<el-button size="default" type="primary" @click="onSubmit">{{ dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="duties">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';

// 获取标签的接口
const curdFun = shoppingMall.tags();

// 引入组件

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const dialog = reactive({
	isShowDialog: false,
	ruleForm: {
		name: '',
		idx: 0,
	},
	type: 'edit',
	title: '设置标签',
	submitTxt: '确认',
	rules: {
		name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
		idx: [{ required: true, message: '请输入排序', trigger: 'blur' }],
	}
});

// 打开弹窗
const curdFormRef = ref();
const openDialog = (row: any) => {
	dialog.ruleForm = { ...row }; // 复制行数据
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑标签' : '新增标签';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.isShowDialog = true;
};

// 提交
const onSubmit = () => {
	curdFormRef.value.validate((valid: any) => {
		if (valid) {
			if (dialog.type === 'add') onAdd(dialog.ruleForm);
			if (dialog.type === 'edit') onUpd(dialog.ruleForm);
		}
	});
};

// 修改
const onUpd = (ruleForm: any) => {
	ElMessageBox.confirm('确认修改吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const { id, ...set } = ruleForm;
		await curdFun.set(id, set).then(() => {
			ElMessage({
				type: 'success',
				message: '修改成功',
			});
			emit('refresh');
		}).finally(() => {
			closeDialog();
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '已取消修改',
		});
	});
};

// 新增
const onAdd = (ruleForm: any) => {
	ElMessageBox.confirm('确认新增该标签吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const { id, ...inc } = ruleForm;
		await curdFun.inc(inc).then(() => {
			ElMessage({
				type: 'success',
				message: '添加成功',
			});
			emit('refresh');
		}).finally(() => {
			closeDialog();
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '已取消添加',
		});
	});
};

// 关闭弹窗
const closeDialog = () => {
	dialog.isShowDialog = false;
};
// 暴露变量
defineExpose({
	openDialog,
	closeDialog,
});
</script>

<style scoped>
.system-user-dialog-container {
	padding: 20px;
}
</style>
