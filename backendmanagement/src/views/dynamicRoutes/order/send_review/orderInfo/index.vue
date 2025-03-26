<template>
	<div  class="layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height:100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search " style="gap: 6px;">
					<div class="align-center">
						<el-select size="default" v-model="tableData.textStatus" placeholder="筛选订单状态" class="ml10"
							style="max-width: 180px" @change="getTableData" value-key="value" clearable>
							<el-option v-for="option in textStatusOptions" :key="option.value" :label="option.label"
								:value="option.value"></el-option>
						</el-select>
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
				<!-- :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" lazy :load="load" -->
				<el-table-column v-slot="{ row }" prop="order_id" label="订单类型" min-width="100">
					<el-tag type="primary">{{ row.is_supplementary_payment ? '补款订单' : '送评订单' }}</el-tag>
				</el-table-column>
				<el-table-column prop="order_id" label="订单id" min-width="140" />
				<el-table-column v-slot="scope" prop="order_time" label="下单时间" min-width="140">
					{{ formatDate(scope.row.order_time, "YYYY-mm-dd HH:MM:SS") }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="pay_time" label="支付时间" min-width="140">
					{{ formatDate(scope.row.pay_time, "YYYY-mm-dd HH:MM:SS") }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="total_price" label="订单金额" min-width="140">
					￥{{ formatAmount(scope.row.total_price) }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="text_status" label="订单进程" min-width="160">
					<el-tag type="primary">{{ scope.row.text_status }}</el-tag>
				</el-table-column>
				<el-table-column v-slot="scope" label="操作" fixed="right" width="80px" align="center">
					<el-button size="small" text type="primary"
						@click="popupOrderDetailRef.openDialog(scope.row)">详情</el-button>
				</el-table-column>
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
			<popupOrderDetail ref="popupOrderDetailRef" />
		</div>
	</div>
</template>

<script setup lang="ts" >
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import orderAPI from '/@/api/order';
const curdFun = orderAPI.order_info();
import { processStatusOptions, statusOptions, textStatusOptions } from '/@/views/dynamicRoutes/order/map';
import { formatDate } from '/@/utils/formatTime';
import { formatAmount } from '/@/utils/textFormat';

// 引入组件
// 组件
const popupOrderDetail = defineAsyncComponent(() => import('./popup-detail.vue'));
const popupOrderDetailRef = ref();
//定义接收参数
const props = defineProps({
	row: {
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

const load = (row: any, treeNode: unknown, resolve: (data: any[]) => void) => getData(true, row.id).then((res: any) => resolve(res.list))

// 查询方法
const getTableData = async () => {
	tableData.loading = true;
	try {
		await getData().then(res => {
			tableData.data = res.list.map((item: any) => ({
				...item,
				hasChildren: Boolean(item.order_info_aggregate.aggregate.count),
			}));
			tableData.total = res.total_size;
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('获取订单数据失败:', error);
	} finally {
		tableData.loading = false;
	}
};

// 数据查询
const getData = async (isChildren = false, inviteparent_order_id = '') => {
	const args = {
		page_index: tableData.param.pageNum,
		page_size: tableData.param.pageSize,
		where: {
			text_status: {},
			inviteparent_order_info: inviteparent_order_id ? { _eq: inviteparent_order_id } : { _is_null: true },
			_or: tableData.search ? [{
				order_id: { _ilike: `%${tableData.search}%` },
			}, {
				inviteparent: { order_id: { _ilike: `%${tableData.search}%` } }
			}] : [],

			...(!isChildren ? {
				order_order: { _eq: props.row.id },
				process_status: { _eq: "已付款" },
			} : {}),
		},
		order_by: { __QUOTOFF__: { created_at: 'desc' } },
	};
	if (!isChildren) {
		const textStatusOption = textStatusOptions.find(option => option.value === tableData.textStatus);
		if (textStatusOption) args.where.text_status = textStatusOption.status;
	}
	return await curdFun.get(args);

}


// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
