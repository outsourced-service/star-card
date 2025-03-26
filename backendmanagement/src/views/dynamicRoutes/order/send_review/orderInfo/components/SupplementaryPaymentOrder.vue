<template>
	<div  class=" layout-padding w100" style="width: 100%; padding: 0 !important">
		<el-card shadow="hover" class="layout-padding-auto" style="height:100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search " style="gap: 6px;">
					<div class="align-center">
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="搜索订单编号"
							style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" icon="Search" @click="getTableData"> 查询
						</el-button>
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" row-key="id"
				height="100%" border default-expand-all :default-sort="{ prop: 'id', order: 'descending' }">
				<el-table-column prop="order_id" label="订单类型" min-width="100">
					<el-tag type="primary">补款订单</el-tag>
				</el-table-column>
				<el-table-column prop="order_id" label="订单id" min-width="140" />
				<el-table-column v-slot="scope" prop="pay_amount" label="付款金额" min-width="140">
					￥{{ formatAmount(scope.row.pay_amount) }}
				</el-table-column>
				<el-table-column prop="num" label="补款卡片数量" min-width="140" />

			</el-table>
			<template #footer>
				<el-pagination v-if="!!tableData.data.length" @size-change="onHandleSizeChange"
					@current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
					:current-page="tableData.param.pageNum" background :page-size="tableData.param.pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
				</el-pagination>
			</template>
		</el-card>
		<div class="popu">
			<!-- <popupOrderDetail ref="popupOrderDetailRef" /> -->
		</div>
	</div>
</template>

<script setup lang="ts" >
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import orderAPI from '/@/api/order';
const curdFun = orderAPI.SupplementaryPaymentOrder();
import { processStatusOptions, statusOptions, textStatusOptions } from '/@/views/dynamicRoutes/order/map';
import { formatDate } from '/@/utils/formatTime';
import { formatAmount } from '/@/utils/textFormat';

// 引入组件
// 组件
// const popupOrderDetail = defineAsyncComponent(() => import('./popup-detail.vue'));
// const popupOrderDetailRef = ref();

// 定义接收参数
const props = defineProps({
	data: {
		type: Object,
		default: () => { },
	},
});

// 定义变量内容
const tableData = reactive(<any>{
	loading: false,
	search: '',
	textStatus: '',
	total: 0,
	param: {
		pageNum: 1,
		pageSize: 10,
	},
	time: '',
	data: []
});
// 分页数量改变
const onHandleSizeChange = (val: number) => {
	tableData.param.pageSize = val;
	tableData.param.pageNum = 1;
	getTableData();
};
// 页码改变
const onHandleCurrentChange = (val: number) => {
	tableData.param.pageNum = val;
	getTableData();
};

// 查询方法
const getTableData = async () => {
	tableData.loading = true;
	try {
		const args = {
			page_index: tableData.param.pageNum,
			page_size: tableData.param.pageSize,
			where: {
				inviteparent_order_info: { _eq: props.data.id },
			},
			order_by: { __QUOTOFF__: { created_at: 'desc' } },
		};
		await curdFun.get(args).then(res => {
			tableData.data = res.list;
			tableData.total = res.total_size;
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('获取订单数据失败:', error);
	} finally {
		tableData.loading = false;
	}
};

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
