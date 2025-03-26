<template>
	<div class="system-order-container layout-padding w100" style="width: 100%; padding: 0 !important">
		<!-- 搜索栏 -->
		<el-card shadow="hover" class="layout-padding-auto" style="height: 100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search align-center">
					<div class="align-center">
						<el-input size="default" clearable v-model="tableData.search" class="ml10"
							placeholder="搜索分类和操作方式" style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" :icon="Search"
							@click="getTableData">查询</el-button>
					</div>
				</div>
			</template>

			<!-- 表格 -->
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%"
				:max-height="'calc(100vh - 200px)'">
				<el-table-column prop="type" label="分类说明" min-width="140" align="center" />
				<el-table-column prop="inc_amount" label="操作金额" min-width="140" align="center">
					<template #default="{ row }">
						{{ (row.inc_amount / 100).toFixed(2) }} 元
					</template>
				</el-table-column>
				<el-table-column prop="deal_type" label="操作类型" min-width="140" align="center" />
				<el-table-column prop="describe" label="变动描述" min-width="140" show-overflow-tooltip align="center" />
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

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import orderAPI from '/@/api/order';
const curdFun = orderAPI.order_info_paydetail();

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
					_or: tableData.search ? [{
						deal_type: { _ilike: `%${tableData.search}%` }
					}, {
						type: { _ilike: `%${tableData.search}%` }
					}] : []
				},
				order_by: { __QUOTOFF__: { created_at: 'desc_nulls_last' } },
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
.system-menu-search {
	padding: 15px 0;
}

.align-center {
	display: flex;
	align-items: center;
}

.ml10 {
	margin-left: 10px;
}

.buttonAggregate {
	display: flex;
	gap: 8px;
}
</style>