<template>
	<div class="system-user-container layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<span class="ml10" style="white-space: nowrap">机构名称：</span>
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入机构名称"
							style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" :icon="Search" @click="getTableData"> 查询
						</el-button>
						<el-button size="default" type="success" class="ml10" :icon="FolderAdd" @click="openDialogCurdFormRef({})"> 新增 </el-button>
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
				<!-- <el-table-column prop="id" show-overflow-tooltip label="序号" width="60" /> -->
				<!-- <el-table-column prop="evaluation_id" label="ID" /> -->
				<el-table-column prop="sort_weight" label="推荐排序" />
				<el-table-column prop="name" label="机构名称" />
				<el-table-column v-slot="scope" prop="logo" label="logo">
					<div v-if="scope.row.logo?.url">
						<el-image style="width: 60px; height: 40px; border-radius: 10%" :src="scope.row.logo?.url"
							fit="contain" :preview-src-list="[scope.row.logo?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column v-slot="scope" prop="cover" label="封面">
					<div v-if="scope.row.cover?.url">
						<el-image style="width: 60px; height: 40px; border-radius: 10%" :src="scope.row.cover?.url"
							fit="cover" :preview-src-list="[scope.row.cover?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column prop="img" label="档位水印背景图">
					<template #default="scope">
						<div v-if="scope.row.img?.url">
							<el-image style="width: 60px; height: 40px; border-radius: 10%" :src="scope.row.img?.url"
								fit="cover" :preview-src-list="[scope.row.img?.url]" preview-teleported />
						</div>
						<div v-else>-</div>
					</template>
				</el-table-column>
				<el-table-column v-slot="scope" prop="exp_time" label="截止日期时间" width="120px">
					{{ scope.row.exp_time ? new Date(scope.row.exp_time).toLocaleString() : '-' }}
				</el-table-column>
				<el-table-column prop="order_title" label="订单批次" />
				<el-table-column prop="consignee" label="收货人名称" />
				<el-table-column v-slot="scope" prop="phone" label="收货人电话" >
					{{ maskPhoneNumber(scope.row.phone) }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="province" label="收货地址" >
					{{ scope.row.province }}/{{ scope.row.city }}/{{ scope.row.area }}
				</el-table-column>
				<!-- <el-table-column prop="city" label="所在城市" />
				<el-table-column prop="area" label="所在地区" /> -->
				<el-table-column prop="address_detail" label="详细地址" show-overflow-tooltip/>
				<el-table-column label="操作" fixed="right" min-width="160px">
					<template #default="scope">
						<div class="buttonAggregate">
							<el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button>
							<el-button size="small" text type="primary" @click="popusRef.openDialog(scope.row, 'annex')">附件管理</el-button>
							<el-button size="small" text type="primary" @click="popusRef.openDialog(scope.row, 'insurance')">档位管理</el-button>
							<el-button size="small" text type="primary" @click="popusRef.openDialog(scope.row, 'privilege')">权益管理</el-button>
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
		<el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="70vw">
			<el-form ref="evaluationFormRef" :model="dialog.ruleForm" size="default" label-width="100" :rules="dialog.rules">
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="机构名称" prop="name">
							<el-input v-model="dialog.ruleForm.name" type="text" placeholder="请输入机构名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="推荐排序" prop="sort_weight">
							<el-input-number v-model="dialog.ruleForm.sort_weight" :min="1" />
							<!-- <el-input v-model="dialog.ruleForm.sort_weight" type="text" placeholder="请输入推荐排序" clearable /> -->
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="截止时间" prop="exp_time">
							<el-date-picker
								v-model="dialog.ruleForm.exp_time"
								type="datetime"
								placeholder="请选择截止日期时间"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="订单批次" prop="order_title">
							<el-input v-model="dialog.ruleForm.order_title" type="text" placeholder="请输入订单批次" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="收货人名称" prop="consignee">
							<el-input v-model="dialog.ruleForm.consignee" type="text" placeholder="请输入收货人名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="收货人电话" prop="phone">
							<el-input v-model="dialog.ruleForm.phone" type="number" placeholder="请输入收货人电话" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所在省份" prop="province">
							<el-input v-model="dialog.ruleForm.province" type="text" placeholder="请输入所在省份" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所在城市" prop="city">
							<el-input v-model="dialog.ruleForm.city" type="text" placeholder="请输入所在城市" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所在地区" prop="area">
							<el-input v-model="dialog.ruleForm.area" type="text" placeholder="请输入所在地区" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="详细地址" prop="address_detail">
							<el-input v-model="dialog.ruleForm.address_detail" type="text" placeholder="请输入详细地址" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="logo" prop="logo">
							<uploadMedia v-model="dialog.ruleForm.logo" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="封面" prop="cover">
							<uploadMedia v-model="dialog.ruleForm.cover" mode="image" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="水印背景图" prop="img">
							<uploadMedia v-model="dialog.ruleForm.img" mode="image" />
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
		<popus ref="popusRef" />
	</div>
</template>

<script setup lang="ts" name="evaluation">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { evaluation } from '/@/api/index';
import { maskPhoneNumber } from '/@/views/base';
import rules from './rule';
const evaluationFun = evaluation();

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));

// 组件
const popus = defineAsyncComponent(() => import('./popus.vue'));
const popusRef = ref();
	
// 定义变量内容
const evaluationFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	title: '',
	rules: rules,
	submitTxt: '',
	ruleForm: <any>{ id: 0 },
	coverList: [],
	logoList: [],
	imageList: []
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
	const { list, total_size } = await evaluationFun.get(
		{
			page_index: tableData.param.pageNum,
			page_size: tableData.param.pageSize,
			// order_by: { __enum_keys: { sort_weight: 'asc_nulls_last' } },
			where: {
				// evaluation_id: tableData.searchID ? { _ilike: `%${tableData.searchID}%` } : {},
				name: tableData.search ? { _ilike: `%${tableData.search}%` } : {},
				// mobile: tableData.searchPhone ? { _ilike: `%${tableData.searchPhone}%` } : {}
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
	if (evaluationFormRef.value) evaluationFormRef.value.resetFields();
	dialog.row = row;
	dialog.coverList = [];
	dialog.logoList = [];
	dialog.imageList = [];
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	// 处理图片回显
	dialog.ruleForm.logo = row?.logo ? [row.logo] : [];
	dialog.ruleForm.cover = row?.cover ? [row.cover] : [];
	dialog.ruleForm.img = row?.img ? [row.img] : [];
	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!evaluationFormRef.value) return;
	evaluationFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	evaluationFormRef.value.validate((valid: any) => {
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
			const { id: ID, logo, cover, img, ..._ins } = ruleForm;
			await evaluationFun
				.inc({
					..._ins,
					img_id: img[0].raw.imageId,
					cover_id: cover[0].raw.imageId,
					logo_id:  logo[0].raw.imageId
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
			const { id: ID, logo:[logo], cover:[cover], img:[img], ..._set } = ruleForm;
			await evaluationFun
				.set(
					ID,
					{
						_set,
						img_id: img?.raw?.imageId ?? img?.id,
						logo_id: logo?.raw?.imageId ?? logo?.id,
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
			await evaluationFun.del(row.id, true, {}).then(() => {
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
