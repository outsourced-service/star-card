<template>
    <div class="goods-attri-dialog-container">
        <el-dialog title="商品属性" v-model="dialog.isShowDialog" append-to-body>
            <el-form ref="curdFormRef" :model="dialog.ruleForm" size="default" :rules="dialog.rules">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="属性名称" prop="name">
                            <el-input v-model="dialog.ruleForm.name" placeholder="请输入属性名称" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="展示模式" prop="type">
                            <el-select v-model="dialog.ruleForm.type" placeholder="请选择展示模式">
                                <el-option label="四行展示排版" value="四行展示排版" />
                                <el-option label="一行展示排版" value="一行展示排版" />
                                <el-option label="图片展示排版" value="图片展示排版" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                        <el-form-item label="排序" prop="idx">
                            <el-input-number v-model="dialog.ruleForm.idx" :precision="0" :step="1" />
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
import { reactive, ref } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';

// 获取商品属性的接口
const curdFun = shoppingMall.goods_attri();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const dialog = reactive({
    isShowDialog: false,
    ruleForm: {
        name: '',
        type: '',
        idx: 0,
    },
    type: 'edit',
    title: '设置商品属性',
    submitTxt: '确认',
    rules: {
        name: [{ required: true, message: '请输入属性名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择展示模式', trigger: 'change' }],
        idx: [{ required: true, message: '请输入排序', trigger: 'blur' }],
    }
});

// 打开弹窗
const curdFormRef = ref();
const openDialog = (row: any) => {
    dialog.ruleForm = { ...row }; // 复制行数据
    dialog.type = row.id ? 'edit' : 'add';
    dialog.title = row.id ? '编辑商品属性' : '新增商品属性';
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
        const { id, ...set } = ruleForm;
        await curdFun.set(id, set).then(() => {
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
    ElMessageBox.confirm('确认新增该商品属性吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        await curdFun.inc(ruleForm).then(() => {
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
.goods-attri-dialog-container {
    padding: 20px;
}
</style> 