<template>
    <div class="system-user-container layout-padding">
        <el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
            <template #header>
                <div class="system-menu-search align-center">
                    <el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入会员等级名称"
                        style="max-width: 180px" @clear="getTableData">
                    </el-input>
                    <el-button size="default" type="primary" class="ml10" @click="getTableData"> 查询 </el-button>
                    <el-button size="default" type="success" class="ml10" @click="openDialogCurdFormRef({})"> 新增 </el-button>
                </div>
            </template>
            <el-table :data="tableData.data" v-loading="tableData.loading" height="100%" style="width: 100%">
                <el-table-column prop="id" label="序号" width="60" />
                <el-table-column prop="name" label="会员等级名称" />
                <el-table-column prop="min_growth_value" label="成长值最低" />
				<el-table-column prop="description" label="VIP权益描述"  show-overflow-tooltip/>
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
                <el-table-column label="操作" fixed="right">
                    <template #default="scope">
                        <el-button size="small" text type="primary" @click="openDialogCurdFormRef(scope.row)">编辑</el-button>
						<el-button size="small" text type="primary" @click="openPrivilegeDialog(scope.row)">相关权益</el-button>
                        <el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="dialog.title" v-model="dialog.isShowDialog" width="70vw">
                <el-form ref="viplevelFormRef" :model="dialog.ruleForm" :rules="dialog.rules" label-width="120px">
					<el-row :gutter="50">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="会员等级名称" prop="name">
							    <el-input v-model="dialog.ruleForm.name" placeholder="请输入会员等级名称" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="最低成长值" prop="min_growth_value">
							    <el-input-number v-model="dialog.ruleForm.min_growth_value" :min="0" />
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
							<el-form-item label="VIP权益描述" prop="description">
							    <el-input v-model="dialog.ruleForm.description" type="textarea" placeholder="请输入VIP权益描述" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
							<el-form-item label="会员样式背景" prop="img">
							    <uploadMedia v-model="dialog.ruleForm.img" mode="image" />
							</el-form-item>
						</el-col>
					</el-row>
                </el-form>
                <template #footer>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </template>
            </el-dialog>
			<el-dialog title="相关权益管理" v-model="dialog.isShowPrivilegeDialog" width="70vw" destroy-on-close append-to-body>
				<popusPrivilege ref="popusPrivilegeRef" :info="dialog.row"/>
			</el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="viplevel">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import { viplevel } from '/@/api/viplevel/index';
import rules from './rule';
const curdFun = viplevel();

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));
// 组件
const popusPrivilege = defineAsyncComponent(() => import('./privilege/index.vue'));
const popusPrivilegeRef = ref();

//定义接收参数
	const props = defineProps({
		info: {
			type: Object,
			default: () => {
				
			},
		},
	});
	
	const dialogImageUrl = ref('')
	const dialogVisible = ref(false)

// 定义变量内容
const viplevelFormRef = ref<FormInstance>();
const dialog = reactive({
	isShowDialog: false,
	isShowPrivilegeDialog: false,
	row: <any>{},
	type: '',
	rules: rules,
	title: '',
	submitTxt: '',
	ruleForm: <any>{ id: 0 },
	imageList: [] as any[],
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
				name: tableData.search ? { _ilike: `%${tableData.search}%` } : {},
				status: { _neq: '删除' },
			},
		},
		{}
	);
	tableData.data = list;
	tableData.total = total_size;
	tableData.loading = false;
};

const openPrivilegeDialog = (row: any = {}) => {
	dialog.row = row;
	dialog.isShowPrivilegeDialog = true;
};

//初始化
const openDialogCurdFormRef = (row: any = {}) => {
	if (viplevelFormRef.value) viplevelFormRef.value.resetFields();
	dialog.row = row;
	dialog.imageList = [];
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑' : '新增';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.ruleForm = JSON.parse(JSON.stringify(row));
	dialog.ruleForm.status = row.id ? row.status : '启用';
	dialog.ruleForm.img = row?.img ? [row.img] : [];
	dialog.isShowDialog = true;
};

// 取消
const onCancel = () => {
	dialog.isShowDialog = false;
	if (!viplevelFormRef.value) return;
	viplevelFormRef.value.resetFields();
};

//提交
const onSubmit = () => {
	viplevelFormRef.value.validate((valid: any) => {
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
			const { id: ID, img, ..._ins } = ruleForm;
			await curdFun
				.inc({..._ins, img_id: img[0].raw.imageId }, {})
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
			const { id: ID, img:[img], ..._set } = ruleForm;
			await curdFun
				.set(
					ID,
					{
						_set,
						img_id: img?.raw?.imageId ?? img?.id,
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
						message: '删除成功！',
					});
					getTableData();
				})
				.catch(() => {
					ElMessage({
						type: 'error',
						message: '删除失败！',
					});
				})
				.finally(() => {
					onCancel();
			});
			// await curdFun.del(row.id, false, {}).then(() => {
			// 	ElMessage({
			// 		type: 'success',
			// 		message: '删除成功',
			// 	});
			// 	getTableData();
			// });
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