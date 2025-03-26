<template>
	<div class="system-user-container layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<!-- <el-input
							size="default"
							clearable
							v-model="tableData.searchID"
							class="ml10"
							placeholder="请输入ID"
							style="max-width: 180px"
							@clear="getTableData"
						>
						</el-input> -->
						<!-- <span class="ml10" style="white-space: nowrap">用户昵称：</span> -->
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入名称"
							style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-input size="default" clearable v-model="tableData.searchPhone" class="ml10"
							placeholder="请输入联系方式" style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" :icon="Search" @click="getTableData"> 查询
						</el-button>
						<!-- <el-button size="default" type="success" class="ml10" :icon="FolderAdd" @click="openDialogCurdFormRef({})"> 新增 </el-button> -->
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
				<el-table-column prop="id" show-overflow-tooltip label="序号" width="60" />
				<!-- <el-table-column prop="user_id" label="ID" /> -->
				<el-table-column prop="nickname" label="用户昵称" />
				<el-table-column prop="sex" label="性别" />
				<el-table-column prop="mobile" label="联系方式" />
				<!-- <el-table-column prop="nickname" label="昵称" /> -->
				<el-table-column prop="avatar" label="头像">
					<template #default="scope">
						<div v-if="scope.row.avatar?.url">
							<el-image style="width: 30px; height: 30px; border-radius: 50%" :src="scope.row.avatar?.url"
								fit="cover" :preview-src-list="[scope.row.avatar?.url]" preview-teleported />
						</div>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="name" label="真实姓名" /> -->
				<!-- <el-table-column prop="birthday" label="生日" /> -->
				<!-- <el-table-column prop="address" label="收货地址" /> -->
				<el-table-column label="操作" fixed="right">
					<template #default="scope">
						<div class="buttonAggregate">
							<!-- <el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button> -->
							<!-- <el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button> -->
							<el-button v-if="scope.row.status == '禁用'" size="small" text type="primary"
								@click="handleOpenDisable(scope.row)">解禁</el-button>
							<el-button v-else size="small" text type="primary"
								@click="handleDisable(scope.row)">禁用</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<el-pagination v-if="tableData.data.length > 0" @size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 30, 50]"
					v-model:current-page="tableData.param.pageNum" background
					v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</template>
		</el-card>
		<el-dialog title="订单" v-model="dialog.isShowDialog" width="70vh">
			<el-form ref="userFormRef" :model="dialog.ruleForm" size="default" label-width="100">
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input v-model="dialog.ruleForm.name" type="text" placeholder="请输入名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="描述（可选）" prop="description">
							<el-input v-model="dialog.ruleForm.description" type="text" placeholder="请输入描述" clearable />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="user">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { user } from '/@/api/index';
const userFun = user();

// 定义变量内容
const userFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	title: '',
	submitTxt: '',
	ruleForm: <any>{ id: 0 },
});
const tableData = reactive(<any>{
	loading: false,
	search: '',
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
	const { list, total_size } = await userFun.get(
		{
			page_index: tableData.param.pageNum,
			page_size: tableData.param.pageSize,
			// order_by: { __enum_keys: { idx: 'asc_nulls_last' } },
			where: {
				// user_id: tableData.searchID ? { _ilike: `%${tableData.searchID}%` } : {},
				nickname: tableData.search ? { _ilike: `%${tableData.search}%` } : {},
				mobile: tableData.searchPhone ? { _ilike: `%${tableData.searchPhone}%` } : {}
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
	if (userFormRef.value) userFormRef.value.resetFields();
	dialog.row = row;
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!userFormRef.value) return;
	userFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	userFormRef.value.validate((valid: any) => {
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
			await userFun
				.inc(_ins, {})
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
			await userFun
				.set(
					ID,
					{
						_set,
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

const handleOpenDisable = (row: any) => {
	ElMessageBox.confirm('确认解禁该用户吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await userFun
				.set(
					row.id,
					{
						status: '解禁',
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
};

const handleDisable = (row: any) => {
	ElMessageBox.confirm('确认禁用该用户吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await userFun
				.set(
					row.id,
					{
						status: '禁用',
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
};

//删除
const onDel = (row: any) => {
	ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await userFun.del(row.id, false, {}).then(() => {
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
