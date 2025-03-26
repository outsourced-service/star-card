<template>
	<div  class=" layout-padding w100">
		<el-card shadow="hover" class="layout-padding-auto" style="height:100%" body-class="el-card-tabel">
			<template #header>
				<div class="system-menu-search " style="gap: 6px;">
					<div class="align-center">
						<!-- <el-select size="default" v-model="tableData.textStatus" placeholder="筛选订单状态" class="ml10"
							style="max-width: 180px" @change="getTableData" value-key="value" clearable>
							<el-option v-for="option in textStatusOptions" :key="option.value" :label="option.label"
								:value="option.value"></el-option>
						</el-select> -->
						<el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="搜索批次/机构"
							style="max-width: 180px" @clear="getTableData">
						</el-input>
						<el-button size="default" type="primary" class="ml10" icon="Search" @click="getTableData"> 查询
						</el-button>
					</div>
				</div>
			</template>
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" row-key="id"
				default-expand-all >
				<el-table-column prop="title" label="订单批次" min-width="120" />
				<el-table-column v-slot="scope" prop="order_time" label="截止日期" min-width="120">
					{{ formatDate(scope.row.exp_time, "YYYY-mm-dd HH:MM:SS") }}
				</el-table-column>
				<el-table-column v-slot="scope" prop="evaluation_name" label="送检机构" min-width="120">
					<el-tag type="primary">{{ scope.row.evaluation_name }}</el-tag>
				</el-table-column>
				<el-table-column prop="order_info_aggregate.aggregate.count" label="订单数量" min-width="120" />
				<el-table-column v-slot="scope" label="操作" fixed="right" width="80px" align="center">
					<el-button size="small" text type="primary"
						@click="popupOrderInfoRef.openDialog(scope.row)">详情</el-button>
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
			<popupOrderInfo ref="popupOrderInfoRef" />
		</div>
	</div>
</template>

<script setup lang="ts" >
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import orderAPI from '/@/api/order';
const curdFun = orderAPI.order();
import { processStatusOptions, statusOptions, textStatusOptions } from '../map';
import { formatDate } from '/@/utils/formatTime';
import { formatAmount } from '/@/utils/textFormat';

// 引入组件
const popupOrderInfo = defineAsyncComponent(() => import('./popup-orderInfo.vue'));
const popupOrderInfoRef = ref();

//定义接收参数
const props = defineProps({
	info: {
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
				mode:{_eq: '送评订单'},
				_or: [{
					title: { _ilike: `%${tableData.search}%` }
				}, {
					evaluation_name: { _ilike: `%${tableData.search}%` }
				}]
			},
			order_by: { __QUOTOFF__: { created_at: 'desc' } },
		};
		return await curdFun.get(args).then((res:any) => {
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
