<template>
    <div name="GoodsAttributes" class="GoodsAttributes layout-padding w100">
        <el-card shadow="hover" class="layout-padding-auto GoodsAttributes-card" body-class="el-card-tabel"
            style="border: none;">
            <template #header>
                <div class="system-menu-search" style="gap: 6px;">
                    <div class="align-center">
                        <el-input size="default" clearable v-model="searchName" placeholder="搜索属性名称"
                            @clear="getAttributes" style="max-width: 180px;" />
                        <el-select v-model="selectedType" placeholder="选择展示模式" class="ml10" @change="getAttributes"
                            clearable style="width: 180px;">
                            <el-option label="四行展示排版" value="四行展示排版" />
                            <el-option label="一行展示排版" value="一行展示排版" />
                            <el-option label="图片展示排版" value="图片展示排版" />
                        </el-select>
                        <el-button size="default" type="primary" class="ml10" icon="Search"
                            @click="getAttributes">查询</el-button>
                        <el-button size="default" type="success" class="ml10" icon="FolderAdd"
                            @click="popupEditInfoRef.openDialog({
                                goods_goods: ID,
                            })">
                            新增属性
                        </el-button>
                    </div>
                </div>
            </template>
            <el-table :data="attributes" v-loading="loading" style="width: 100%" border :default-expand-all="false">
                <el-table-column type="expand" label="展开属性" fixed="left" width="120">
                    <template v-slot="{ row }">
                        <GoodsAttriSpec ref="GoodsAttriSpecRef" :attriId="row.id" :type="row.type" :row="row"/>
                    </template>
                </el-table-column>
                <el-table-column prop="idx" label="排序" min-width="120" />
                <el-table-column prop="name" label="属性名称" min-width="120" />
                <el-table-column prop="type" label="展示模式" min-width="120" />
                <el-table-column v-slot="scope" label="操作" fixed="right" width="120">
                    <div class="buttonAggregate">
                        <el-button size="small" text type="primary"
                            @click="popupEditGoodsAttriSpecRef.openDialog({
                                goods_attri_goods_attri: scope.row.id
                            }, scope.row)">新增属性值</el-button>
                        <el-button size="small" text type="primary"
                            @click="popupEditInfoRef.openDialog(scope.row)">编辑</el-button>
                        <el-button size="small" text type="danger" @click="onDel(scope.row)">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination v-if="!!attributes?.length" @size-change="onHandleSizeChange"
                    @current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
                    :current-page="currentPage" background :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </el-card>
        <div class="popu">
            <popupEditInfo ref="popupEditInfoRef" @refresh="getAttributes" />
            <popupEditGoodsAttriSpec ref="popupEditGoodsAttriSpecRef" @refresh="refreshGoodsAttriSpecRef" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, watch } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';

// 获取商品属性的接口
const curdFun = shoppingMall.goods_attri();

// 引入组件
const popupEditInfo = defineAsyncComponent(() => import('./popus-edit.vue'));
const popupEditGoodsAttriSpec = defineAsyncComponent(() => import('./GoodsAttriSpec/popus-edit.vue'));
const GoodsAttriSpec = defineAsyncComponent(() => import('./GoodsAttriSpec/index.vue'));
const popupEditInfoRef = ref();
const GoodsAttriSpecRef = ref();
const popupEditGoodsAttriSpecRef = ref();
const refreshGoodsAttriSpecRef = () => {
   if(GoodsAttriSpecRef.value) return GoodsAttriSpecRef.value!.refresh();
}

// 定义接收参数并监听变化
const props = defineProps({
    ID: {
        type: Number,
    },
});

// 页面初次加载时ID是没有值的，需要监听ID的变化
watch(() => props.ID, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        getAttributes();
    }
});

const attributes = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const searchName = ref('');
const selectedType = ref('');

// 获取商品属性数据
const getAttributes = async () => {
    loading.value = true;
    try {
        const response = await curdFun.get({
            page_index: currentPage.value,
            page_size: pageSize.value,
            where: {
                goods_goods: { _eq: props.ID },
                _or: searchName.value ? [{
                    name: { _ilike: `%${searchName.value}%` },
                }, {
                    goods_attri_spec: {
                        value: { _ilike: `%${searchName.value}%` },
                    }
                }] : [],
                type: selectedType.value ? { _eq: selectedType.value } : {},
            },
            order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
        });
        attributes.value = response.list;
        total.value = response.total_size;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('获取商品属性失败:', error);
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
                getAttributes();
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
    getAttributes();
};

// 页码改变
const onHandleCurrentChange = (val: number) => {
    currentPage.value = val;
    getAttributes();
};

// 在组件挂载时获取数据
onMounted(() => {
    if (props.ID) getAttributes();
});
</script>
<style lang="scss">
.GoodsAttributes {
    .GoodsAttributes-card>.el-card__header {
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