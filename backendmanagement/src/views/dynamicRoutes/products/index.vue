<template>
    <div  class=" layout-padding w100">
        <el-card shadow="hover" class="layout-padding-auto" style="height:100%" body-class="el-card-tabel">
            <template #header>
                <div class="system-menu-search " style="gap: 6px;">
                    <div class="align-center">
                        <el-select size="default" v-model="tableData.textStatus" placeholder="筛选订单状态" class="ml10"
                            style="max-width: 180px" @change="getTableData" value-key="value" clearable>
                            <el-option label="已下架" value="已下架"></el-option>
                            <el-option label="展示中" value="展示中"></el-option>
                        </el-select>
                        <el-input size="default" clearable v-model="tableData.search" class="ml10" placeholder="搜索商品"
                            style="max-width: 180px" @clear="getTableData">
                        </el-input>
                        <el-button size="default" type="primary" class="ml10" icon="Search" @click="getTableData"> 查询
                        </el-button>
                        <el-button size="default" type="success" class="ml10" icon="FolderAdd"
                            @click="popupEditInfoRef.openDialog({})">
                            新增商品
                        </el-button>
                    </div>
                </div>
            </template>
            <el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%" row-key="id"
                default-expand-all>
                <el-table-column prop="idx" label="排序" min-width="60" />
                <el-table-column prop="goods_name" label="商品名称" min-width="160"/>
                <el-table-column v-slot="{ row }" prop="goods_img" label="商品缩略图" min-width="120">
                    <el-image v-if="row.goods_img.url" :src="row.goods_img.url + ImageFormatWebp" alt="商品图片"
                        style="width: 50px; height: 50px;" fit="cover" lazy preview-teleported
                        :preview-src-list="[row.goods_img.url + ImageFormatWebp]"></el-image>
                </el-table-column>
                <el-table-column v-slot="scope" prop="start_sale_time" label="开始销售时间" min-width="120">
                    {{ formatDate(scope.row.start_sale_time, "YYYY-mm-dd HH:MM:SS") }}
                </el-table-column>
                <el-table-column prop="show_sales" label="显示总销量" min-width="120"/>
                <el-table-column v-slot="{ row }" prop="status" label="状态">
                    <el-tag :type="row.status === '已下架' ? 'danger' : 'success'">{{ row.status }}</el-tag>
                </el-table-column>
                <el-table-column v-slot="{ row }" prop="row" label="标签" min-width="240">
                    <div class="flex-row flex-wrap" style="gap: 12px;">
                            <el-tag v-for="(item, index) in row?.goods_tags" :key="index" size="small">
                                {{ item.tags.name }}
                            </el-tag>
                        </div>
                </el-table-column>
                <el-table-column v-slot="{ row }" label="操作" fixed="right" min-width="120">
                    <div class="buttonAggregate">
                        <el-button size="small" type="primary" icon="Position"
                            @click="viewDetail(row.id)">查看详情</el-button>
                        <el-button size="small" type="primary" icon="Edit"
                            @click="popupEditInfoRef.openDialog(row)">编辑商品</el-button>
                    </div>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-pagination v-if="!!tableData.data.length" @size-change="onHandleSizeChange"
                    @current-change="onHandleCurrentChange" :pager-count="5" :page-sizes="[10, 20, 30]"
                    :current-page="tableData.param.pageNum" background :page-size="tableData.param.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
                </el-pagination>
            </template>
        </el-card>
        <div class="popu">
            <popupEditInfo ref="popupEditInfoRef" @refresh="getTableData" />
        </div>
    </div>
</template>

<script setup lang="ts" >
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { defineAsyncComponent, ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import shoppingMall from '/@/api/shoppingMall';
import { formatDate } from '/@/utils/formatTime';
import { formatAmount } from '/@/utils/textFormat';

// 实例化 导入的数据/方法
const { proxy } = getCurrentInstance() as any;
const curdFun = shoppingMall.goods();
const router = useRouter();

// 引入组件
const popupEditInfo = defineAsyncComponent(() => import('./popus-edit.vue'));
const popupEditInfoRef = ref();

//定义接收参数
const props = defineProps({
    info: {
        type: Object,
        default: () => { },
    },
});

const ImageFormatWebp = ref(proxy.$ImageFormatWebp)

// 定义变量内容
const tableData = reactive(<any>{
    loading: false,
    search: '',
    goodsStatus: '',
    total: 0,
    param: {
        pageNum: 1,
        pageSize: 10,
    },
    time: '',
    data: []
});
// 分页数量改变
const onHandleSizeChange = (val: number) => {
    tableData.param.pageSize = val;
    tableData.param.pageNum = 1;
    getTableData();
};
// 页码改变
const onHandleCurrentChange = (val: number) => {
    tableData.param.pageNum = val;
    getTableData();
};

const viewDetail = (id: number) => {
    router.push(`/products/${id}`);
};


// 查询方法
const getTableData = async () => {
    tableData.loading = true;
    try {
        const search = tableData.search;
        const args = {
            page_index: tableData.param.pageNum,
            page_size: tableData.param.pageSize,
            where: {
                goods_name: search ? { _ilike: `%${search}%` } : {},
                status: tableData.goodsStatus ? { _eq: tableData.goodsStatus } : {},
            },
            order_by: { __QUOTOFF__: { created_at: 'desc_nulls_last' } },
        };
        return await curdFun.get(args).then((res: any) => {
            tableData.data = res.list;
            tableData.total = res.total_size;
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('获取订单数据失败:', error);
    } finally {
        tableData.loading = false;
    }
};


// 页面加载时
onMounted(() => {
    getTableData();
});
</script>
