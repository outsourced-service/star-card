<template>
    <div class="goods-attri-spec-dialog-container">
        <el-dialog title="商品属性值" v-model="dialog.isShowDialog" append-to-body>
            <el-form ref="curdFormRef" :model="dialog.ruleForm" size="default" label-width="auto" :rules="dialog.rules">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="属性值" prop="value">
                            <el-input v-model="dialog.ruleForm.value" placeholder="请输入属性值" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="排序" prop="idx">
                            <el-input-number v-model="dialog.ruleForm.idx" :precision="0" :step="1" />
                        </el-form-item>
                    </el-col>
                    <el-col v-if="dialog.GoodsAttributes.type === '图片展示排版'" :xs="24" :sm="24" :md="24" :lg="24"
                        :xl="12">
                        <el-form-item label="商品封面" prop="goods_img">
                            <uploadMedia v-model="dialog.ruleForm.img" mode="image" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="default" @click="closeDialog">取 消</el-button>
                    <el-button size="default" type="primary" @click="onSubmit">{{ dialog.submitTxt }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineAsyncComponent } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';

// 引入组件
const uploadMedia = defineAsyncComponent(() => import('/@/components/upload/index.vue'));

// 获取商品属性值的接口
const curdFun = shoppingMall.goods_attri_spec();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const dialog = reactive({
    isShowDialog: false,
    ruleForm: {
        value: '',
        idx: 0,
        img: []
    },
    GoodsAttributes: <any>{},
    type: 'edit',
    title: '设置商品属性值',
    submitTxt: '确认',
    rules: {
        value: [{ required: true, message: '请输入属性值', trigger: 'blur' }],
        idx: [{ required: true, message: '请输入排序', trigger: 'blur' }],
    }
});

// 打开弹窗
const curdFormRef = ref();
const openDialog = (row: any, goods: any) => {
    dialog.GoodsAttributes = goods;
    dialog.ruleForm = { ...row, img: row.img ? [row.img] : [] }; // 复制行数据
    dialog.type = row.id ? 'edit' : 'add';
    dialog.title = row.id ? '编辑商品属性值' : '新增商品属性值';
    dialog.submitTxt = row.id ? '修 改' : '新 增';
    dialog.isShowDialog = true;
};

// 提交
const onSubmit = () => {
    curdFormRef.value.validate((valid: any) => {
        if (valid) {
            if (dialog.type === 'add') onAdd(dialog.ruleForm);
            if (dialog.type === 'edit') onUpd(dialog.ruleForm);
        }
    });
};

// 修改
const onUpd = (ruleForm: any) => {
	ElMessageBox.confirm('确认修改吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		const { id, img:[image], ...set } = ruleForm;
		await curdFun.set(id, {
			...set,
			img_id: image?.raw?.imageId ?? image?.id ?? null
		}).then(() => {
			ElMessage({
				type: 'success',
				message: '修改成功',
			});
			emit('refresh');
		}).finally(() => {
			closeDialog();
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '已取消修改',
		});
	});
};

// 新增
const onAdd = (ruleForm: any) => {
	ElMessageBox.confirm('确认新增该商品介绍吗?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		const { id, img, ...inc } = ruleForm;
		await curdFun.inc({
			...inc,
			img_id: img?.[0]?.raw?.imageId
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
    dialog.isShowDialog = false;
};

// 暴露变量
defineExpose({
    openDialog,
    closeDialog,
});
</script>

<style scoped>
.goods-attri-spec-dialog-container {
    padding: 20px;
}
</style>