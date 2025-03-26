<template>
	<el-dialog class="orderDetail-dialog" :title="`订单ID: ${dialog.row.order_id}`" v-model="dialog.isShowDialog"
		destroy-on-close fullscreen>
		<el-tabs v-model="activeTab">
			<el-tab-pane label="详情" name="details" lazy>
				<DetailsTab ref="DetailsTabRef" :data="dialog.row" />
			</el-tab-pane>
			<el-tab-pane label="补款订单" name="supplementaryPaymentOrder" lazy>
				<SupplementaryPaymentOrder ref="SupplementaryPaymentOrderRef" :data="dialog.row" />
			</el-tab-pane>
			<el-tab-pane label="订单状态日志" name="logs" lazy>
				<LogsTab ref="LogsTabRef" :data="dialog.row" />
			</el-tab-pane>
			<el-tab-pane label="支付组成明细" name="paymentLogs" lazy>
				<PaymentLogsTab ref="PaymentLogsTabRef" :data="dialog.row" />
			</el-tab-pane>
		</el-tabs>
	</el-dialog>
</template>

<script setup lang="ts" name="duties">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

// 组件
const DetailsTab = defineAsyncComponent(() => import('./components/DetailsTab.vue'));
const DetailsTabRef = ref();
const LogsTab = defineAsyncComponent(() => import('./components/LogsTab.vue'));
const LogsTabRef = ref();
const PaymentLogsTab = defineAsyncComponent(() => import('./components/PaymentLogsTab.vue'));
const PaymentLogsTabRef = ref();
const SupplementaryPaymentOrder = defineAsyncComponent(() => import('./components/SupplementaryPaymentOrder.vue'));
const SupplementaryPaymentOrderRef = ref();

// 定义子组件向父组件传值/事件
// const emit = defineEmits(['refresh']);

const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
});

const activeTab = ref('details');

// 打开弹窗
const openDialog = (row: any) => {
	dialog.row = row;
	dialog.isShowDialog = true;
	activeTab.value = 'details'; // 重置为默认选项
};
// 关闭弹窗
const closeDialog = () => {
	dialog.isShowDialog = false;
};
// 暴露变量
defineExpose({
	openDialog,
	closeDialog,
});
</script>
<style lang="scss">
.el-overlay .el-overlay-dialog {
	.orderDetail-dialog {
		display: flex;
		flex-direction: column;
		height: 100%;

		.el-dialog__body {
			flex: 1;
			overflow: auto;
			padding: 0 !important;
			max-height: 100% !important;
		}

		.el-tabs {
			height: 100%;

			.el-tabs__content {
				height: calc(100% - 55px);
				overflow: auto;
			}
		}
	}
}
</style>