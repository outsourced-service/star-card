<template>
	<div class="system-goods-dialog-container">
		<el-dialog class="goods-dialog" :title="dialog.title" v-model="dialog.isShowDialog" width="60%"
			body-class="goods-dialog-body">
			<!-- destroy-on-close fullscreen -->
			<template #header="{ titleId, titleClass }">
				<div class="my-header">
					<h4 :id="titleId" :class="titleClass">{{ dialog.title }}</h4>
				</div>
			</template>
			<el-row :gutter="20">
				<el-col :span="24" class="mb20">
					<!-- <showTitle title="基础信息" class="mb16" style="margin-left: -8px;" /> -->
					<BaseInfoForm v-model="dialog.ruleForm.baseInfo" ref="BaseInfoFormRef" />
				</el-col>
			</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="closeDialog">取 消</el-button>
					<el-button size="default" type="primary" @click="onSubmit">{{ dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="duties">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const BaseInfoForm = defineAsyncComponent(() => import('./components/BaseInfoForm.vue'));
const BaseInfoFormRef = ref();
// const ProductAttributesForm = defineAsyncComponent(() => import('./components/ProductAttributesForm.vue'));
// const ProductSpecificationsForm = defineAsyncComponent(() => import('./components/ProductSpecificationsForm.vue'));
// const ProductImagesForm = defineAsyncComponent(() => import('./components/ProductImagesForm.vue'));
// const showTitle = defineAsyncComponent(() => import('/@/components/showTitle/index.vue'));


// 获取标签的接口
const curdFun = shoppingMall.goods();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const dialog = reactive({
	row: <any>{},
	isShowDialog: false,
	ruleForm: {
		id: 0,
		baseInfo: {},
		attributes: {},
		specifications: {},
		goods_intro: {}
	},
	type: 'edit',
	title: '编辑商品',
	submitTxt: '确认',
});

// 打开弹窗
const curdFormRef = ref();
const openDialog = (row: any) => {
	dialog.row = row; //备份行数据
	dialog.ruleForm.id = row.id;
	dialog.type = row.id ? 'edit' : 'add';
	dialog.title = row.id ? '编辑商品' : '新增商品';
	dialog.submitTxt = row.id ? '修 改' : '新 增';
	dialog.isShowDialog = true;

	dialog.ruleForm.baseInfo = {
		category_category: row?.category_category ?? null,
		goods_name: row?.goods_name ?? '',
		goods_img: row?.goods_img ? [row.goods_img] : [],
		idx: row?.idx ?? null,
		start_sale_time: row?.start_sale_time ?? null,
		show_sales: row?.show_sales ?? null,
		status: row?.status ?? '已下架',
		goods_tags: row?.goods_tags?.map((tag: any) => tag.tags.id) ?? [], // 将标签格式化为字符串
	};


	return
	// dialog.ruleForm.goods_intro = row.goods_intro?.map((item: any) => ({
	// 	idx: item.idx,
	// 	type: item.type,
	// 	img: [{ ...item.img }],
	// })) ?? [];

};

// 提交
const onSubmit = () => {
	BaseInfoFormRef.value.validate((valid: any) => {
		if (valid) {
			const { baseInfo, goods_intro, attributes, specifications, id } = dialog.ruleForm;
			if (dialog.type === 'add') onAdd(baseInfo);
			if (dialog.type === 'edit') onUpd({ id, ...baseInfo });
		}
	})
};


// 修改
const onUpd = (ruleForm: any) => {
	ElMessageBox.confirm('确认修改吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const { id, goods_img:[goodsImg], goods_tags, ...set } = ruleForm;
		
		await curdFun.set(id, {
			...set,
			goods_img_id: goodsImg?.raw?.imageId ?? goodsImg?.id,
			_opReplaceData:{
				name: 'goods_tags',
				old: dialog.row.goods_tags.filter((tag:any) => !goods_tags.includes(tag.tags.id)).map((tag: any) => tag.id),
				new: goods_tags.filter((tag: any) => !dialog.row.goods_tags.some((t: any) => t.tags.id === tag)).map((tag: any) => ({ tags_tags: tag })),
			}
		}).then(() => {
			ElMessage({
				type: 'success',
				message: '修改成功',
			});
			emit('refresh');
			closeDialog();
		})
	}).catch((e) => {
		ElMessage({
			type: 'info',
			message: '已取消修改',
		});
	});
};

// 新增
const onAdd = (ruleForm: any) => {
	ElMessageBox.confirm('确认新增该商品吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const { id, goods_img, goods_tags, ...inc } = ruleForm;
		await curdFun.inc({
			...inc,
			goods_img_id: goods_img[0].raw.imageId,
			goods_tags: { data: goods_tags.map((tag: any) => ({ tags_tags: tag })) },
		}).then(() => {
			ElMessage({
				type: 'success',
				message: '添加成功',
			});
			emit('refresh');
		}).finally(() => {
			closeDialog();
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '已取消添加',
		});
	});
};

// 关闭弹窗
const closeDialog = () => {
	BaseInfoFormRef.value.resetFields();
	dialog.isShowDialog = false;
};
// 暴露变量
defineExpose({
	openDialog,
	closeDialog,
});
</script>

<style lang="scss">
.system-user-dialog-container {
	padding: 20px;
}

.el-overlay .el-overlay-dialog .el-dialog .el-dialog__body.goods-dialog-body {
	padding: 0 !important;
}
</style>
