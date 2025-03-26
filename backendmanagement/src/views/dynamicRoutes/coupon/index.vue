<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入名称"
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
				<el-table-column prop="name" label="名称" />
				<el-table-column v-slot="scope" prop="img" label="展示图片">
					<div v-if="scope.row.img?.url">
						<el-image style="width: 60px; height: 40px; border-radius: 10%" :src="scope.row.img?.url"
							fit="cover" :preview-src-list="[scope.row.img?.url]" preview-teleported />
					</div>
					<div v-else>-</div>
				</el-table-column>
				<el-table-column prop="show_name" label="前台显示名称" />
				<el-table-column prop="type" label="类型" />
				<el-table-column prop="amount_cny" label="面值" />
				<el-table-column prop="min_price_cny" label="最小要求金额" />
				<el-table-column prop="discount_rate" label="折扣比例" />
				<el-table-column v-slot="scope" prop="activity_starttime" label="开始时间" >
					{{ scope.row.activity_starttime ? new Date(scope.row.activity_starttime).toLocaleString() : '-' }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="activity_endtime" label="结束时间" >
					{{ scope.row.activity_endtime ? new Date(scope.row.activity_endtime).toLocaleString() : '-' }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="start_time" label="生效时间" >
					{{ scope.row.start_time ? new Date(scope.row.start_time).toLocaleString() : '-' }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="exp_time" label="失效时间" >
					{{ scope.row.exp_time ? new Date(scope.row.exp_time).toLocaleString() : '-' }}
				</el-table-column>
				<el-table-column prop="max_use_limit" label="最大使用数量" />
				<el-table-column prop="describe" label="描述" show-overflow-tooltip/>
				<el-table-column v-slot="scope" prop="status" label="状态" >
					<el-switch
					    v-model="scope.row.status"
						active-value="启用"
						inactive-value="冻结"
					    active-text="启用"
					    inactive-text="冻结"
						inline-prompt
						@change="changeStatus(scope.row)"
					  />
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
		<el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="70vw">
			<el-form ref="couponFormRef" :model="dialog.ruleForm" size="default" label-width="120" :rules="dialog.rules">
				<el-row :gutter="50">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称" prop="name" >
							<el-input v-model="dialog.ruleForm.name" type="text" placeholder="请输入名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="前台显示名称" prop="show_name" >
							<el-input v-model="dialog.ruleForm.show_name" type="text" placeholder="请输入前台显示名称" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="类型" prop="type" >
							<el-select
							      v-model="dialog.ruleForm.type"
								  size="default"
								  placeholder="请选择类型"
								  clearable
							    >
							      <el-option
							        v-for="item in dialog.options"
							        :key="item"
							        :label="item"
							        :value="item"
							      />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="面值" prop="amount_cny" >
							<el-input-number v-model="dialog.ruleForm.amount_cny" :precision="2" :step="0.01" :min="0.01" :max="1" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="最小要求金额" prop="min_price_cny" >
							<el-input-number v-model="dialog.ruleForm.min_price_cny" :precision="2" :step="0.01" :min="0.01" :max="1" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="折扣比例" prop="discount_rate" >
							<el-input-number v-model="dialog.ruleForm.discount_rate" :precision="2" :step="0.01" :min="0.01" :max="1" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="开始时间" prop="activity_starttime">
							<el-date-picker
								v-model="dialog.ruleForm.activity_starttime"
								type="datetime"
								placeholder="请选择开始时间"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="结束时间" prop="activity_endtime">
							<el-date-picker
								v-model="dialog.ruleForm.activity_endtime"
								type="datetime"
								placeholder="请选择结束时间"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="生效时间" prop="start_time">
							<el-date-picker
								v-model="dialog.ruleForm.start_time"
								type="datetime"
								placeholder="请选择生效时间"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="失效时间" prop="activity_starttime">
							<el-date-picker
								v-model="dialog.ruleForm.exp_time"
								type="datetime"
								placeholder="请选择失效时间"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="最大使用数量" prop="max_use_limit" >
							<el-input-number v-model="dialog.ruleForm.max_use_limit" :step="1" :min="0"/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="状态" prop="status" >
							<el-switch
							    v-model="dialog.ruleForm.status"
								active-value="启用"
								inactive-value="冻结"
							    active-text="启用"
							    inactive-text="冻结"
							  />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="描述" prop="describe">
							<el-input v-model="dialog.ruleForm.describe" type="textarea" placeholder="请输入描述" clearable />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="展示图片" prop="img" >
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
	</div>
</template>

<script setup lang="ts" name="coupon">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { coupon } from '/@/api/index';
import rules from './rule';
const curdFun = coupon();

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));

// 定义变量内容
const couponFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	type: '',
	rules: rules,
	title: '',
	submitTxt: '',
	ruleForm: <any>{ id: 0 },
	imageList: [],
	options: ['满减卷', '折扣卷']
});
const tableData = reactive(<any>{
	loading: false,
	search: '',
	searchType: 'TCG',
	vip: '',
	data: [],
	total: 0,
	param: {
		pageNum: 1,
		pageSize: 10,
	},
	time: ''
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
			where: {
				name: tableData.search ? { _ilike: `%${tableData.search}%` } : {},
				status: { _neq: '删除' }
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
	if (couponFormRef.value) couponFormRef.value.resetFields();
	dialog.row = row;
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.ruleForm.img = row?.img ? [row.img] : [],
	dialog.ruleForm.amount_cny = row.id ? dialog.ruleForm.amount_cny / 100 : 0;
	dialog.ruleForm.min_price_cny = row.id ? dialog.ruleForm.min_price_cny / 100 : 0;
	dialog.ruleForm.status = row.id ? row.status : '启用';
	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!couponFormRef.value) return;
	couponFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	couponFormRef.value.validate((valid: any) => {
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
			const { id: ID, img, min_price_cny, amount_cny, ..._ins } = ruleForm;
			await curdFun
				.inc({
					..._ins, 
					img_id: img[0].raw.imageId,
					min_price_cny: min_price_cny * 100,
					amount_cny: amount_cny * 100
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
			const { id: ID, img:[img], min_price_cny, amount_cny, ..._set } = ruleForm;
			await curdFun
				.set(
					ID,
					{
						_set,
						img_id: img?.raw?.imageId ?? img?.id,
						min_price_cny: min_price_cny * 100,
						amount_cny: amount_cny * 100
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

// 修改状态
const changeStatus = async (row: any) => {
	const { id: ID, status, ..._set } = row;
	await curdFun
		.set(
			ID,
			{
				status: status
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
};

//删除
const onDel = (row: any) => {
	ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			// await curdFun.del(row.id, true, {}).then(() => {
			// 	ElMessage({
			// 		type: 'success',
			// 		message: '删除成功',
			// 	});
			// 	getTableData();
			// });
			const { id: ID, status, ..._set } = row;
			await curdFun
				.set(
					ID,
					{
						status: '删除'
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
