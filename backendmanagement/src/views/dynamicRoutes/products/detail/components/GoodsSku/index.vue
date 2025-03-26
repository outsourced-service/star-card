<template>
    <div name="GoodsSku" class="GoodsSku layout-padding w100">
        <el-card shadow="hover" class="layout-padding-auto GoodsSku-card" body-class="el-card-tabel"
            style="border: none;">
            <template #header>
                <div class="system-menu-search" style="gap: 6px;">
                    <div class="align-center">
                        <el-input size="default" clearable v-model="skuName" placeholder="搜索 SKU 名称"
                            @clear="getGoodsSku" style="max-width: 180px;" />
                        <el-button size="default" type="primary" class="ml10" icon="Search" @click="getGoodsSku">
                            查询
                        </el-button>
                        <el-button size="default" type="success" class="ml10" icon="FolderAdd" @click="popupEditInfoRef.openDialog({
                            goods_goods: ID,
                        })">
                            新增
                        </el-button>
                    </div>
                </div>
            </template>
            <el-table :data="goodsSku" v-loading="loading" border style="width: 100%">
                <el-table-column type="expand" label="展开属性" fixed="left" width="100">
                    <template v-slot="{ row }">
                        <div style="padding: 15px; ">
                            <el-descriptions title="其他属性参数"
                                v-if="row.goods_sku_attri_spec && row.goods_sku_attri_spec.length"
                                class="spec-descriptions width-100" border :column="1" label-width="120px" size="small">
                                <el-descriptions-item v-for="spec in row.goods_sku_attri_spec" :key="spec.id"
                                    :label="spec.goods_attri.name" class="spec-item">
                                    <el-tag>{{ spec.goods_attri_spec.value }}</el-tag>
                                </el-descriptions-item>
                            </el-descriptions>
                            <div v-else >暂无规格信息</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sku_name" label="SKU名称" min-width="120" />
                <el-table-column v-slot="{ row }" prop="price" label="支付价格" min-width="120">
                    ￥{{ formatAmount(row.price) }}
                </el-table-column>
                <el-table-column v-slot="{ row }" prop="original_price" label="原价" min-width="120">
                    ￥{{ formatAmount(row.original_price) }}
                </el-table-column>
                <el-table-column prop="stock" label="库存" min-width="120" />
                <el-table-column prop="present_score" label="赠送积分" min-width="120" />
                <el-table-column prop="growth_value" label="成长值" min-width="120" />
                <el-table-column prop="sales" label="真实销量" min-width="120" />
                <el-table-column prop="fictitious_sales" label="虚拟销量" min-width="120" />
                <el-table-column v-slot="{ row }" prop="status" label="状态" min-width="120">
                    <el-tag size="small">
                        {{ row.status }}
                    </el-tag>
                </el-table-column>
                <el-table-column v-slot="scope" label="操作" fixed="right" width="120">
                    <div class="buttonAggregate">
                        <el-button size="small" text type="primary"
                            @click="popupEditInfoRef.openDialog(scope.row)">编辑</el-button>
                        <el-button size="small" text type="danger" @click="onDel(scope.row)">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination v-if="!!goodsSku?.length" @size-change="onHandleSizeChange"
                    @current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
                    :current-page="currentPage" background :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </el-card>
        <div class="popu">
            <popupEditInfo ref="popupEditInfoRef" @refresh="getGoodsSku" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, watch } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';
import { formatAmount } from '/@/utils/textFormat';

// 获取商品规格的接口
const curdFun = shoppingMall.goods_sku();

// 引入组件
const popupEditInfo = defineAsyncComponent(() => import('./popus-edit.vue'));
const popupEditInfoRef = ref();

// 定义接收参数
const props = defineProps({
    ID: {
        type: Number,
    },
});

watch(() => props.ID, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        getGoodsSku();
    }
});


const goodsSku = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const skuName = ref('');

// 获取商品规格数据
const getGoodsSku = async () => {
    loading.value = true;
    try {
        const response = await curdFun.get({
            page_index: currentPage.value,
            page_size: pageSize.value,
            where: {
                goods_goods: { _eq: props.ID },
                sku_name: skuName.value ? { _ilike: `%${skuName.value}%` } : {},
            },
            order_by: { __QUOTOFF__: { created_at: 'asc_nulls_last' } },
        });
        goodsSku.value = response.list;
        total.value = response.total_size;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('获取商品规格失败:', error);
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
            await curdFun.del(row.id, false, {}).then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                });
                getGoodsSku();
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
    getGoodsSku();
};

// 页码改变
const onHandleCurrentChange = (val: number) => {
    currentPage.value = val;
    getGoodsSku();
};

// 在组件挂载时获取数据
onMounted(() => {
    if (props.ID) getGoodsSku();
});

</script>

<style lang="scss">
.GoodsSku {
    .GoodsSku-card>.el-card__header {
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

.spec-descriptions {
    border: 1px solid #dcdfe6;
    /* 边框 */
    border-radius: 4px;
    /* 圆角 */
    padding: 16px;
    /* 内边距 */
    margin-bottom: 16px;
    /* 下边距 */
}

.spec-item {
    margin-bottom: 8px;
    /* 每个项的下边距 */
}
</style>
