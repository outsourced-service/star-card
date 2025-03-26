<template>
    <div name="GoodsAttriSpec" class="GoodsAttriSpec layout-padding w100"
        style="position: relative; padding-top: 7px !important; padding-bottom: 7px !important;">
        <el-card shadow="never" class="layout-padding-auto" body-class="el-card-tabel">
            <!-- <template #header>
                <div class="system-menu-search" style="gap: 6px;">
                    <div class="align-center">
                        <el-button size="default" type="success" class="ml10" icon="FolderAdd"
                            @click="popupEditInfoRef.openDialog({})">
                            新增属性值
                        </el-button>
                    </div>
                </div>
            </template> -->
            <el-table :data="attriSpecs" v-loading="loading" style="width: 100%" border max-height="600px">
                <el-table-column prop="idx" label="排序" />
                <el-table-column prop="value" label="属性值" />
                <el-table-column v-if="type == '图片展示排版'" v-slot="{ row }" prop="img" label="图片">
                    <el-image v-if="row?.img" :src="row?.img?.url + $ImageFormatWebp" fit="cover"
                        style="width: 100px; height: 100px;" preview-teleported
                        :preview-src-list="[row?.img?.url + $ImageFormatWebp]">
                    </el-image>
                    <el-text v-else class="mx-1" type="info"> - </el-text>
                </el-table-column>
                <el-table-column v-slot="scope" label="操作" fixed="right" width="120">
                    <div class="buttonAggregate">
                        <el-button size="small" text type="primary"
                            @click="popupEditInfoRef.openDialog(scope.row, { type: type, id: attriId })">编辑</el-button>
                        <el-button size="small" text type="danger" @click="onDel(scope.row)">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination v-if="!!attriSpecs.length" @size-change="onHandleSizeChange"
                    @current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
                    :current-page="currentPage" background :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </el-card>
        <div class="popu">
            <popupEditInfo ref="popupEditInfoRef" @refresh="getAttriSpecs" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, defineProps, getCurrentInstance } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';


const { proxy } = getCurrentInstance() as any;
const $ImageFormatWebp = proxy.$ImageFormatWebp; // 图片格式化为 webp

// 获取商品属性值的接口
const curdFun = shoppingMall.goods_attri_spec();

// 引入组件
const popupEditInfo = defineAsyncComponent(() => import('./popus-edit.vue'));
const popupEditInfoRef = ref();

// 定义接收参数
const props = defineProps({
    attriId: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    row: {
        type: Object,
        required: true,
    }
});

const attriSpecs = ref(props?.row?.goods_attri_spec ?? []);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(props?.row?.goods_attri_spec?.length ?? 0);

// 获取属性值数据
const getAttriSpecs = async () => {
    loading.value = true;
    try {
        const response = await curdFun.get({
            page_index: currentPage.value,
            page_size: pageSize.value,
            where: {
                goods_attri_goods_attri: { _eq: props.attriId },
            },
            order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
        });
        attriSpecs.value = response.list;
        total.value = response.total_size;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('获取属性值失败:', error);
    } finally {
        loading.value = false;
    }
};

// 删除
const onDel = (row: any) => {
    ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            await curdFun.del(row.id, true, {}).then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                });
                getAttriSpecs();
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除',
            });
        });
};

// 分页数量改变
const onHandleSizeChange = (val: number) => {
    pageSize.value = val;
    currentPage.value = 1; // 重置为第一页
    getAttriSpecs();
};

// 页码改变
const onHandleCurrentChange = (val: number) => {
    currentPage.value = val;
    getAttriSpecs();
};

// 在组件挂载时获取数据
onMounted(() => {
    if(!attriSpecs.value?.length) getAttriSpecs();
});

// 暴露变量
defineExpose({
    add: () => popupEditInfoRef.value!.openDialog({}),
    refresh: () => getAttriSpecs(),
});

</script>

<!-- <style lang="scss">
.GoodsAttriSpec {
    .el-card {
        border: none;
    }
}
</style> -->