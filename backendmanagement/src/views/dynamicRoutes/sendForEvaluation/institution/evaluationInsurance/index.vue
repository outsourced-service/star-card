<template>
	<div class="system-user-container layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入档位名称"
							style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" :icon="Search" @click="getTableData"> 查询
						</el-button>
						<el-button size="default" type="success" class="ml10" :icon="FolderAdd" @click="openDialogCurdFormRef({})"> 新增 </el-button>
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
				<el-table-column prop="id" show-overflow-tooltip label="序号" width="60" />
				<el-table-column prop="name" label="档位名称" />
				<el-table-column prop="description" label="档位描述" />
				<el-table-column v-slot="scope" prop="card_price_limit" label="卡价上限" >
					<div v-if="scope.row.card_price_limit">
						{{ scope.row.card_price_limit / 100 }} 元
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column prop="card_often" label="官方评分时长" />
				<el-table-column prop="card_special_restrictions" label="特殊限制" />
				<el-table-column prop="estimated_time_frame" label="预估总时效" />
				<el-table-column prop="label_name" label="档位标签名称" />
				<el-table-column v-slot="scope" prop="price" label="档位每张金额" >
					{{ scope.row.price / 100 }} 元
				</el-table-column>
				<el-table-column v-slot="scope" prop="is_input" label="自定义输入框" show-overflow-tooltip >
					<div v-if="scope.row.is_input">是</div>
					<div v-else>否</div>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="100px">
					<template #default="scope">
						<div class="buttonAggregate">
							<el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button>
							<el-button size="small" text type="primary" @click="openInfoDialog(scope.row)">选项管理</el-button>
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
			<el-form ref="evaluationInsuranceFormRef" :model="dialog.ruleForm" size="default" label-width="100" :rules="dialog.rules">
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="档位名称" prop="name">
							<el-input v-model="dialog.ruleForm.name" type="text" placeholder="请输入档位名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="卡价上限" prop="card_price_limit">
							<el-input-number v-model="dialog.ruleForm.card_price_limit" :precision="2" :step="1" :min="0"/> &nbsp;&nbsp;元
							<!-- <el-input v-model="dialog.ruleForm.card_price_limit" type="text" placeholder="请输入卡价上限" clearable /> -->
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="评分时长" prop="card_often">
							<el-input v-model="dialog.ruleForm.card_often" type="text" placeholder="请输入送评评分时长" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="特殊限制" prop="card_special_restrictions">
							<el-input v-model="dialog.ruleForm.card_special_restrictions" type="text" placeholder="请输入特殊限制" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="预估总时效" prop="estimated_time_frame">
							<el-input v-model="dialog.ruleForm.estimated_time_frame" type="text" placeholder="请输入预估总时效" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="标签名称" prop="label_name">
							<el-input v-model="dialog.ruleForm.label_name" type="text" placeholder="请输入档位标签名称" clearable /> 
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="每张金额/元" prop="price">
							<el-input-number v-model="dialog.ruleForm.price" :precision="2" :step="1" :min="0"/>&nbsp;&nbsp;元
							<!-- <el-input v-model="dialog.ruleForm.price" type="text" placeholder="请输入档位每张金额/分" clearable /> -->
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="自定义输入框" prop="is_input">
							<el-switch
							    v-model="dialog.ruleForm.is_input"
							    class="mb-2"
								:active-value="true"
								:inactive-value="false"
							    active-text="是"
							    inactive-text="否"
							  />
							<!-- <el-input v-model="dialog.ruleForm.is_input" type="text" placeholder="请输入自定义输入框" clearable /> -->
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="档位描述" prop="description">
							<el-input v-model="dialog.ruleForm.description" type="textarea" placeholder="请输入档位描述" clearable />
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
		<el-dialog title="选项管理" v-model="dialog.isShowInfoDialog" width="70vw" destroy-on-close append-to-body>
			<popusInfo ref="popusInfoRef" :info="dialog.row"/>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="evaluationInsurance">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { evaluationInsurance } from '/@/api/index';
import rules from './rule';
const curdFun = evaluationInsurance();

// 组件
const popusInfo = defineAsyncComponent(() => import('./info/index.vue'));
const popusInfoRef = ref();

//定义接收参数
	const props = defineProps({
		info: {
			type: Object,
			default: () => {
				
			},
		},
	});

// 定义变量内容
const evaluationInsuranceFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	isShowInfoDialog: false,
	row: <any>{},
	type: '',
	rules: rules,
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
	const { list, total_size } = await curdFun.get(
		{
			page_index: tableData.param.pageNum,
			page_size: tableData.param.pageSize,
			// order_by: { __enum_keys: { idx: 'asc_nulls_last' } },
			where: {
				evaluation_evaluation: { _eq: props.info.id },
				name: tableData.search ? { _ilike: `%${tableData.search}%` } : {},
			},
		},
		{}
	);
	tableData.data = list;
	tableData.total = total_size;
	tableData.loading = false;
};

const openInfoDialog = (row: any = {}) => {
	dialog.row = row;
	dialog.isShowInfoDialog = true;
};

//初始化
const openDialogCurdFormRef = (row: any = {}) => {
	if (evaluationInsuranceFormRef.value) evaluationInsuranceFormRef.value.resetFields();
	dialog.row = row;
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.ruleForm.card_price_limit = row.card_price_limit / 100;
	dialog.ruleForm.price = row.price / 100;
	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!evaluationInsuranceFormRef.value) return;
	evaluationInsuranceFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	evaluationInsuranceFormRef.value.validate((valid: any) => {
		if (valid) {
			if(dialog.ruleForm.is_input && !dialog.ruleForm.label_name) return ElMessage({ type: 'error', message: '请输入档位标签名称！'});
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
			const { id: ID, card_price_limit, price,  ..._ins } = ruleForm;
			await curdFun
				.inc({
					..._ins, 
					evaluation_evaluation: props.info.id, 
					card_price_limit: card_price_limit * 100,
					price: price * 100
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
			const { id: ID, card_price_limit, price, ..._set } = ruleForm;
			await curdFun
				.set(
					ID,
					{
						_set,
						card_price_limit: card_price_limit * 100,
						price: price * 100
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

<style scoped lang="scss"></style>
