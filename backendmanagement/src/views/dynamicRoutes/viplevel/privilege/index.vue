<template>
    <div class="system-user-container layout-padding">
        <el-card shadow="none" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
            <template #header>
                <div class="system-menu-search align-center">
                    <el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入权益名称"
                        style="max-width: 180px" @clear="getTableData">
                    </el-input>
                    <el-button size="default" type="primary" class="ml10" @click="getTableData"> 查询 </el-button>
                    <el-button size="default" type="success" class="ml10" @click="openDialogCurdFormRef()"> 新增 </el-button>
                </div>
            </template>
            <el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
                <el-table-column prop="id" label="序号" width="60" />
                <el-table-column prop="name" label="权益名称" />
                <el-table-column prop="value" label="折扣值" />
                <el-table-column label="操作" fixed="right" width="100px">
                    <template #default="scope">
                        <el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button>
                        <el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="40vw">
                <el-form ref="viplevelPrivilegeFormRef" :model="dialog.ruleForm" :rules="dialog.rules" label-width="100px">
                    <el-form-item label="权益名称" prop="name">
                        <el-input v-model="dialog.ruleForm.name" placeholder="请输入权益名称" />
                    </el-form-item>
                    <el-form-item label="折扣值" prop="value">
                        <el-input-number v-model="dialog.ruleForm.value" :precision="2" :step="0.01" :min="0" :max="1" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </template>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="viplevelPrivilege">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { viplevelPrivilege } from '/@/api/viplevel/index';
import rules from './rule';
const curdFun = viplevelPrivilege();

//定义接收参数
	const props = defineProps({
		info: {
			type: Object,
			default: () => {
				
			},
		},
	});
	

// 定义变量内容
const viplevelPrivilegeFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	rules: rules,
	title: '',
	submitTxt: '',
	ruleForm: <any>{ id: 0 },
	imageList: [] as any[]
});

const tableData = reactive(<any>{
	loading: false,
	search: '',
	searchName: '',
	vip: '',
	data: [],
	total: 0,
	param: {
		pageNum: 1,
		pageSize: 10,
	},
	time: '',
});

const scale2Format = (value: string = '0') => {
	return Number.parseFloat(value).toFixed(2);
};

// 查询方法
const getTableData = async () => {
	tableData.loading = true;
	const { list, total_size } = await curdFun.get(
		{
			page_index: tableData.param.pageNum,
			page_size: tableData.param.pageSize,
			// order_by: { __enum_keys: { idx: 'asc_nulls_last' } },
			where: {
				viplevel_viplevel: { _eq: props.info.id },
				name: tableData.search ? { _ilike: `%${tableData.search}%` } : {}
			},
		},
		{}
	);
	tableData.data = list;
	tableData.total = total_size;
	tableData.loading = false;
};

//初始化
const openDialogCurdFormRef = (row: any = {}) => {
	if (viplevelPrivilegeFormRef.value) viplevelPrivilegeFormRef.value.resetFields();
	dialog.row = row;
	dialog.imageList = [];
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!viplevelPrivilegeFormRef.value) return;
	viplevelPrivilegeFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	viplevelPrivilegeFormRef.value.validate((valid: any) => {
		if (valid) {
			if (dialog.type === 'add') onAdd(dialog.ruleForm);
			if (dialog.type === 'edit') onUpd(dialog.ruleForm);
		}
	});
};

// 新增
const onAdd = (ruleForm: any) => {
	ElMessageBox.confirm('确认新增该数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const { id: ID, ..._ins } = ruleForm;
			await curdFun
				.inc({
					..._ins, 
					viplevel_viplevel: props.info.id,
				}, {})
				.then(() => {
					ElMessage({
						type: 'success',
						message: '添加成功！',
					});
					getTableData();
				})
				.catch(() => {
					ElMessage({
						type: 'error',
						message: '添加失败！',
					});
				})
				.finally(() => {
					onCancel();
				});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消添加',
			});
		});
};

// 修改
const onUpd = (ruleForm: any) => {
	ElMessageBox.confirm('确认修改该数据吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			const { id: ID, ..._set } = ruleForm;
			await curdFun
				.set(
					ID,
					{
						_set
					},
					{}
				)
				.then(() => {
					ElMessage({
						type: 'success',
						message: '修改成功！',
					});
					getTableData();
				})
				.catch(() => {
					ElMessage({
						type: 'error',
						message: '修改失败！',
					});
				})
				.finally(() => {
					onCancel();
				});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消修改',
			});
		});
};

//删除
const onDel = (row: any) => {
	ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await curdFun.del(row.id, true, {}).then(() => {
				ElMessage({
					type: 'success',
					message: '删除成功',
				});
				getTableData();
			});
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消删除',
			});
		});
};

// 分页改变
const onHandleSizeChange = (val: number) => {
	tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	tableData.param.pageNum = val;
	getTableData();
};

// 页面加载时
onMounted(async () => {
	getTableData();
});
</script>

<style scoped lang="scss"></style> 