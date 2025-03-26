<template>
	<div class="system-order-container layout-padding w100" style="width: 100%; padding: 0 !important">
		<!-- <h3>日志信息</h3> -->
		<!-- 搜索栏 -->
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<span class="ml10" style="white-space: nowrap">标题：</span>
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="请输入标题/状态"
							style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" :icon="Search"
							@click="getTableData">查询</el-button>
					</div>
				</div>
			</template>

			<!-- 表格 -->
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%"
				:max-height="'calc(100vh - 200px)'">
				<el-table-column prop="status" label="进程状态" min-width="140" align="center" />
				<el-table-column prop="type" label="进程类型" min-width="140" align="center" />
				<el-table-column v-slot="{ row }" prop="confirm_time" label="确认时间" min-width="140" align="center">
					{{ row.confirm_time ? formatDate(row.confirm_time, "YYYY-mm-dd HH:MM:SS") : '-' }}
				</el-table-column>
				
				<el-table-column prop="title" label="进程标题" min-width="140" show-overflow-tooltip align="center" />
				<el-table-column prop="content" label="进程描述" min-width="140" show-overflow-tooltip align="center" />
			</el-table>

			<!-- 分页 -->
			<template #footer>
				<el-pagination v-if="tableData.data.length > 0" @size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 30, 50]"
					v-model:current-page="tableData.param.pageNum" background
					v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</template>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="LogsTab">
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { formatDate } from '/@/utils/formatTime';
import orderAPI from '/@/api/order';
const curdFun = orderAPI.order_progress();

interface TableData {
	loading: boolean
	search: string
	data: any[]
	total: number
	param: {
		pageNum: number
		pageSize: number
	}
}

// 定义接收参数
const props = defineProps({
	data: {
		type: Object,
		default: () => { },
	},
});

// 定义变量内容
const tableData = reactive<TableData>({
	loading: false,
	search: '',
	data: [],
	total: 0,
	param: {
		pageNum: 1,
		pageSize: 10,
	},
})

// 查询方法
const getTableData = async () => {
	tableData.loading = true
	try {
		const { list, total_size } = await curdFun.get(
			{
				page_index: tableData.param.pageNum,
				page_size: tableData.param.pageSize,
				where: {
					order_info_order_info: { _eq: props.data.id },
					_or:tableData.search?[{
						title: tableData.search ? { _ilike: `%${tableData.search}%` } : {}
					},{
						status: tableData.search ? { _ilike: `%${tableData.search}%` } : {}
					}]:[]
				},
				order_by: { __QUOTOFF__: { confirm_time: 'desc_nulls_last' } },
			},
			{}
		)
		tableData.data = list
		tableData.total = total_size
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn(error);
		ElMessage.error('获取数据失败')
	} finally {
		tableData.loading = false
	}
}

// 分页改变
const onHandleSizeChange = (val: number) => {
	tableData.param.pageSize = val
	getTableData()
}

// 分页改变
const onHandleCurrentChange = (val: number) => {
	tableData.param.pageNum = val
	getTableData()
}

// 页面加载时
onMounted(() => {
	getTableData()
})
</script>

<style scoped>

.align-center {
	display: flex;
	align-items: center;
}

.buttonAggregate {
	display: flex;
	gap: 8px;
}
</style>