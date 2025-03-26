<template>
	<el-dialog class="orderDetail-dialog" v-model="dialog.isShowDialog" destroy-on-close fullscreen>
		<template #header="{ titleId, titleClass }">
			<div class="my-header">
				<h4 :id="titleId" :class="titleClass">批次: {{ dialog.row.title }}</h4>
				<h4>机构: {{ dialog.row.evaluation_name }}</h4>
			</div>
		</template>
		<div class="relative width-flex-1 height-100 flex" style="">
			<orderInfoTab ref="orderInfoTabRef" :row="dialog.row" style="padding: 0 !important; width: 100%;" />
		</div>
	</el-dialog>
</template>

<script setup lang="ts" name="duties">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

// 组件
const orderInfoTab = defineAsyncComponent(() => import('./orderInfo/index.vue'));
const orderInfoTabRef = ref();

// 定义子组件向父组件传值/事件
// const emit = defineEmits(['refresh']);

const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
});

// 打开弹窗
const openDialog = (row: any) => {
	dialog.row = row;
	dialog.isShowDialog = true;
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