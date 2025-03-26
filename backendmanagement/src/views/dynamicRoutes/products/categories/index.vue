<!-- eslint-disable no-console -->
<template>
    <div  class=" layout-padding w100">
        <el-card shadow="hover" class="layout-padding-auto" style="height:100%" body-class="el-card-tabel">
            <template #header>
                <div class="system-menu-search" style="gap: 6px;">
                    <div class="align-center">
                        <el-input size="default" clearable v-model="search" class="ml10" placeholder="搜索商品分类"
                            style="max-width: 180px" @clear="getCategories">
                        </el-input>
                        <el-button size="default" type="primary" class="ml10" icon="Search" @click="getCategories"> 查询
                        </el-button>
                        <el-button size="default" type="success" class="ml10" icon="FolderAdd"
                            @click="popupEditInfoRef.openDialog({})">
                            新增
                        </el-button>
                    </div>
                </div>
            </template>
            <el-table :data="categories" v-loading="loading" style="width: 100%">
                <el-table-column prop="name" label="分类名称" />
                <el-table-column prop="idx" label="排序" />
                <el-table-column v-slot="scope" label="操作" width="120">
                    <div class="buttonAggregate">
                        <el-button size="small" text type="primary"
                            @click="popupEditInfoRef.openDialog(scope.row)">编辑</el-button>
                        <el-button size="small" text type="primary" @click="onDel(scope.row)">删除</el-button>
                    </div>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination v-if="!!categories.length" @size-change="onHandleSizeChange"
                    @current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
                    :current-page="currentPage" background :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </template>
        </el-card>
        <div class="popu">
            <popupEditInfo ref="popupEditInfoRef" @refresh="getCategories" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import shoppingMall from '/@/api/shoppingMall';
import { ElMessageBox, ElMessage } from 'element-plus';

// 获取分类的接口
const curdFun = shoppingMall.category();

// 引入组件
const popupEditInfo = defineAsyncComponent(() => import('./popus-edit.vue'));
const popupEditInfoRef = ref();

const categories = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const search = ref('');

const getCategories = async () => {
    loading.value = true;
    try {
        const response = await curdFun.get({
            page_index: currentPage.value,
            page_size: pageSize.value,
            where: {
                name: search.value ? { _ilike: `%${search.value}%` } : {},
            },
            order_by: { __QUOTOFF__: { idx: 'asc_nulls_last' } },
        });
        categories.value = response.list;
        total.value = response.total_size;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('获取产品分类失败:', error);
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
                getCategories();
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
    getCategories();
};

// 页码改变
const onHandleCurrentChange = (val: number) => {
    currentPage.value = val;
    getCategories();
};

onMounted(() => {
    getCategories();
});
</script>

<style scoped>
.categories-container {
    padding: 20px;
}
</style>
