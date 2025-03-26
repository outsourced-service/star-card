<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="dialog.title" v-model="dialog.isShowDialog" destroy-on-close append-to-body fullscreen>
			<div class="layout-container">
				<evaluationPrivilege
					:info="dialog.row"
					@closeDialog="closeDialog"
					style="width: 100%; height: calc(100vh - 32px); top: 32px"
					v-if="dialog.type === 'privilege'"
				/>
				<evaluationAnnex
					:info="dialog.row"
					@closeDialog="closeDialog"
					style="width: 100%; height: calc(100vh - 32px); top: 32px"
					v-if="dialog.type === 'annex'"
				/>
				<evaluationInsurance
					:info="dialog.row"
					@closeDialog="closeDialog"
					style="width: 100%; height: calc(100vh - 32px); top: 32px"
					v-if="dialog.type === 'insurance'"
				/>
			</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="duties">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const evaluationPrivilege = defineAsyncComponent(() => import('./evaluationPrivilege/index.vue'));
const evaluationAnnex = defineAsyncComponent(() => import('./evaluationAnnex/index.vue'));
const evaluationInsurance = defineAsyncComponent(() => import('./evaluationInsurance/index.vue'));

// 定义子组件向父组件传值/事件
// const emit = defineEmits(['refresh']);

const dialog = reactive({
	isShowDialog: false,
	row: <any>{},
	title: '',
	type: ''
});

// 打开弹窗
const openDialog = (row: any, type: string) => {
	dialog.row = row;
	dialog.type = type;
	if(type === 'annex') { 
		dialog.title = '附件管理' 
	} else if(type === 'insurance') {
		dialog.title = '档位管理' 
	} else {
		dialog.title = '权益管理' 
	}
	dialog.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
	dialog.isShowDialog = true;
};
// 暴露变量
defineExpose({
	openDialog,
});
</script>
