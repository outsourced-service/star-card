<template>
	<div name="systemRole" class=" layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height:100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-dept-search ">
					<el-input v-model="state.tableData.search" size="default" clearable placeholder="搜索角色"
						style="max-width: 180px" @clear="getTableData">
					</el-input>
					<el-button size="default" type="primary" class="ml10" @click="getTableData">
						<el-icon>
							<ele-Search />
						</el-icon>
						查询
					</el-button>
					<el-button size="default" type="success" class="ml10" @click="popupDialogRef.openDialog({}, 'add')">
						<el-icon>
							<ele-FolderAdd />
						</el-icon>
						新增角色
					</el-button>
				</div>
			</template>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" row-key="id"
				default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				:default-sort="{ prop: 'id', order: 'descending' }">
				<el-table-column type="index" label="序号" width="60" align="center" />
				<el-table-column prop="name" label="角色名称" min-width="120" align="center" />
				<el-table-column prop="manager_role.aggregate.count" label="已使用人数" min-width="120" align="center" />
				<el-table-column prop="describe" label="角色描述" min-width="120" show-overflow-tooltip />
				<el-table-column label="操作" fixed="right" min-width="120">
					<template #default="scope">
						<el-button class="mr10" size="small" text type="primary"
							@click="popupDialogRef.openDialog(scope.row, 'edit')">修改</el-button>
						<div v-if="scope.row.id != 11" class="buttonAggregate " style="display: inline-block;">
							<el-button size="small" text type="primary"
								@click="popupDialogRef.openDialog(scope.row, 'configMenu')">菜单配置</el-button>
							<el-button size="small" text type="primary"
								@click="popupDialogRef.openDialog(scope.row, 'configPer')">权限配置</el-button>
							<el-button v-if="!scope.row.manager_role.aggregate.count" size="small" text type="primary"
								@click="onRowDel(scope.row)">删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<template #footer>
				<el-pagination v-if="!!state.tableData.data.length" @size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
					:current-page="state.tableData.param.pageNum" background :page-size="state.tableData.param.pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="state.tableData.total">
				</el-pagination>
			</template>
		</el-card>
		<popupDialog ref="popupDialogRef" @refresh="getTableData" />
	</div>
</template>

<script setup lang="ts" name="systemRole">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { mprApi } from '/@/api/system/index';
const roleAPI = mprApi('role');


// 引入组件
const popupDialog = defineAsyncComponent(() => import('./popup-dialog.vue'));
const popupDialogRef = ref();

// 定义组件变量
const props = defineProps({
	row: {
		type: Object,
		default: () => ({}),
	}
});
// 定义变量内容
const state = reactive({
	tableData: {
		data: [],
		total: 0,
		search: '',
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		},
	},
});
// 分页数量改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	state.tableData.param.pageNum = 1;
	getTableData();
};
// 页码改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.pageNum = val;
	getTableData();
};
// 初始化表格数据
const getTableData = async () => {
	state.tableData.loading = true;
	state.tableData.data = [];
	const search = state.tableData.search?.length ? state.tableData.search : '';
	const { list, total_size } = await roleAPI.get({
		page_index: state.tableData?.param?.pageNum || 1,
		page_size: state.tableData.param.pageSize,
		where: {
			name: { _ilike: `%${search}%` },
		},
	});
	state.tableData.data = list;
	state.tableData.total = total_size;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 删除角色
const onRowDel = (row: any) => {
	ElMessageBox.confirm(`此操作将删除角色名称：“${row.name}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await roleAPI.set(row.id, { is_active: false });
			await getTableData();
		})
		.catch(() => { });
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
