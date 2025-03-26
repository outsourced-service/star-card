<template>
	<div class="system-user-container layout-padding w100">
		<el-card shadow="none" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<span class="ml10" style="white-space: nowrap">选项名称：</span>
						<el-input size="default" clearable v-model="tableData.searchName" class="ml10" placeholder="请输入选项名称"
							style="max-width: 180px" @clear="getTableData">
						</el-input>
						<span class="ml10" style="white-space: nowrap">选项类型：</span>
						<el-select
						      v-model="tableData.search"
							  size="default"
							  class="ml10"
							  placeholder="请选择选项类型"
							  @change="getTableData"
							  style="width: 180px"
							  clearable
						    >
						      <el-option
						        v-for="item in dialog.typeOptions"
						        :key="item"
						        :label="item"
						        :value="item"
						      />
						</el-select>
						<el-button size="default" type="primary" class="ml10" :icon="Search" @click="getTableData"> 查询
						</el-button>
						<el-button size="default" type="success" class="ml10" :icon="FolderAdd" @click="openDialogCurdFormRef({})"> 新增 </el-button>
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
				<el-table-column prop="id" show-overflow-tooltip label="序号" width="60" />
				<el-table-column prop="type" label="档位选项类型" />
				<el-table-column prop="name" label="选项名称" />
				<el-table-column prop="cover" label="封面图片">
					<template #default="scope">
						<div v-if="scope.row.cover?.url">
							<el-image style="width: 30px; height: 30px; border-radius: 50%" :src="scope.row.cover?.url"
								fit="cover" :preview-src-list="[scope.row.cover?.url]" preview-teleported />
						</div>
						<div v-else>-</div>
					</template>
				</el-table-column>
				<el-table-column prop="description" label="尺寸或描述" show-overflow-tooltip/>
				<el-table-column prop="price" label="额外收费金额" v-slot="scope">
					{{ scope.row.price / 100 }} 元
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="100px">
					<template #default="scope">
						<div class="buttonAggregate">
							<el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button>
							<el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button>
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
		<el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="70vh">
			<el-form ref="evaluationInsuranceInfoFormRef" :model="dialog.ruleForm" size="default" label-width="100" :rules="dialog.rules">
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="选项类型" prop="type">
							<el-select
							      v-model="dialog.ruleForm.type"
								  size="default"
								  placeholder="请选择档位选项类型"
								  clearable
							    >
							      <el-option
							        v-for="item in dialog.typeOptions"
							        :key="item"
							        :label="item"
							        :value="item"
							      />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="选项名称" prop="name">
							<el-input v-model="dialog.ruleForm.name" type="text" placeholder="请输入选项名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="尺寸或描述" prop="description">
							<el-input v-model="dialog.ruleForm.description" type="textarea" placeholder="请输入尺寸或描述" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="封面图片" prop="cover">
							<uploadMedia v-model="dialog.ruleForm.cover" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="额外收费金额" prop="price">
							<el-input-number v-model="dialog.ruleForm.price" :precision="2" :step="1" :min="0"/>&nbsp;&nbsp;元
							<!-- <el-input v-model="dialog.ruleForm.price" type="text" placeholder="请输入额外收费金额" clearable /> -->
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="onSubmit" size="default">确 认</el-button>
					<el-button @click="onCancel" size="default">取 消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="evaluationInsuranceInfo">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { evaluationInsuranceInfo } from '/@/api/index';
import rules from './rule';
const curdFun = evaluationInsuranceInfo();

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));

//定义接收参数
	const props = defineProps({
		info: {
			type: Object,
			default: () => {
				
			},
		},
	});
	

// 定义变量内容
const evaluationInsuranceInfoFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	rules: rules,
	title: '',
	submitTxt: '',
	ruleForm: <any>{ id: 0 },
	imageList: [] as any[],
	typeOptions: ['速度选项', '签字选项', '尺寸选项', '验品服务']
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
				evaluation_insurance_evaluation_insurance: { _eq: props.info.id },
				type: tableData.search ? { _ilike: `%${tableData.search}%` } : {},
				name: tableData.searchName ? { _ilike: `%${tableData.searchName}%` } : {}
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
	if (evaluationInsuranceInfoFormRef.value) evaluationInsuranceInfoFormRef.value.resetFields();
	dialog.row = row;
	dialog.imageList = [];
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.ruleForm.price = row.price / 100;
	dialog.ruleForm.cover = row?.cover ? [row.cover] : [];
	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!evaluationInsuranceInfoFormRef.value) return;
	evaluationInsuranceInfoFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	evaluationInsuranceInfoFormRef.value.validate((valid: any) => {
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
			const { id: ID, price, cover, ..._ins } = ruleForm;
			await curdFun
				.inc({
					..._ins, 
					evaluation_insurance_evaluation_insurance: props.info.id,
					price: price * 100,
					cover_id: cover[0].raw.imageId
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
			const { id: ID, price, cover:[cover], ..._set } = ruleForm;
			await curdFun
				.set(
					ID,
					{
						_set,
						price: price * 100,
						cover_id: cover?.raw?.imageId ?? cover?.id,
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
			await curdFun.del(row.id, false, {}).then(() => {
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

<style scoped lang="scss">
</style>
