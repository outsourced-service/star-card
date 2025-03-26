<template>
    <div name="GoodsIntro" class="GoodsIntro layout-padding w100">
        <el-card shadow="hover" class="layout-padding-auto GoodsIntro-card" body-class="el-card-tabel" style="border: none;">
            <template #header>
                <div class="system-menu-search" style="gap: 6px;">
                    <div class="align-center">
                        <el-select v-model="selectedType" placeholder="选择类型" @change="getGoodsIntro"
                            clearable style="width: 180px;">
                            <el-option label="轮播图" value="轮播图" />
                            <el-option label="详情图" value="详情图" />
                        </el-select>
                        <el-button size="default" type="success" class="ml10" icon="FolderAdd"
                            @click="popupEditInfoRef.openDialog({
                                goods_goods: ID,
                            })">
                            新增
                        </el-button>
                    </div>
                </div>
            </template>
            <el-table :data="goodsIntro" v-loading="loading" border style="width: 100%">
                <el-table-column prop="idx" label="排序" min-width="120" />
                <el-table-column prop="type" label="类型" min-width="120" />
                <el-table-column v-slot="{ row }" prop="img" label="图片" min-width="120">
                    <el-image :src="row?.img?.url + $ImageFormatWebp" fit="cover" style="width: 100px; height: 100px;"
                        preview-teleported :preview-src-list="[row?.img?.url + $ImageFormatWebp]" />
                </el-table-column>
                <el-table-column v-slot="scope" label="操作" width="120">
                    <div class="buttonAggregate">
                        <el-button size="small" text type="primary"
                            @click="popupEditInfoRef.openDialog(scope.row)">编辑</el-button>
                        <el-button size="small" text type="danger" @click="onDel(scope.row)">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination v-if="!!goodsIntro?.length" @size-change="onHandleSizeChange"
                    @current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
                    :current-page="currentPage" background :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </el-card>
        <div class="popu">
            <popupEditInfo ref="popupEditInfoRef" @refresh="getGoodsIntro" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, getCurrentInstance, watch } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';


const { proxy } = getCurrentInstance() as any;
const $ImageFormatWebp = proxy.$ImageFormatWebp; // 图片格式化为 webp

// 获取商品介绍的接口
const curdFun = shoppingMall.goods_intro();

// 引入组件
const popupEditInfo = defineAsyncComponent(() => import('./popus-edit.vue'));
const popupEditInfoRef = ref();

// 定义接收参数并监听变化
const props = defineProps({
    ID: {
        type: Number,
    },
});

watch(() => props.ID, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        getGoodsIntro();
    }
});

const goodsIntro = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const selectedType = ref('');

const getGoodsIntro = async () => {
    loading.value = true;
    try {
        const response = await curdFun.get({
            page_index: currentPage.value,
            page_size: pageSize.value,
            where: {
                goods_goods: { _eq: props.ID },
                type: selectedType.value ? { _ilike: `%${selectedType.value}%` } : {},
            },
            order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
        });
        goodsIntro.value = response.list;
        total.value = response.total_size;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('获取商品介绍失败:', error);
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
                getGoodsIntro();
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
    getGoodsIntro();
};

// 页码改变
const onHandleCurrentChange = (val: number) => {
    currentPage.value = val;
    getGoodsIntro();
};

// 在组件挂载时获取数据
onMounted(() => {
    if (props.ID) getGoodsIntro();
});
</script>

<style lang="scss">
.GoodsIntro {
    .GoodsIntro-card>.el-card__header{
        padding: 15px 12px;
    }

    .el-card-tabel {
        padding: 0 !important;

        .el-table--border .el-table__inner-wrapper:after,
        .el-table--border:after,
        .el-table--border:before,
        .el-table__inner-wrapper:before,
        .el-table__border-left-patch {
            height: 0 !important;
        }

        .el-table__cell:last-child {
            border-right: none;
        }
    }
}
</style>
