<template>
    <div class="product-detail-container flex-1 flex-row">
        <el-card class="layout-padding-auto" body-class="flex-1 body-scroll el-card-tabel">
            <!-- <template #header>
                <div class="system-menu-search flex-row align-center justify-between" style="gap: 6px;">
                    <h3>商品: {{ product?.goods_name }}</h3>
                    <el-button size="default" type="success" class="ml10" icon="FolderAdd"
                        @click="popupEditInfoRef.openDialog(product)">
                        编辑信息
                    </el-button>
                </div>
            </template> -->
            <div class="height-y-auto flex-col" style="gap: 20px; ">
                <el-descriptions class="margin-top" :column="5" size="default" border direction="vertical">
                    <template #title>
                        <showTitle :title="product?.goods_name"></showTitle>
                    </template>
                    <template #extra>
                        <el-button size="default" type="success" class="ml10" icon="FolderAdd"
                            @click="popupEditInfoRef.openDialog(product)">
                            编辑信息
                        </el-button>
                    </template>
                    <el-descriptions-item label="商品缩略图" align="center" :rowspan="2" :width="140">
                        <el-image :src="product?.goods_img?.url + $ImageFormatWebp" fit="cover"
                            style="width: 100px; height: 100px;" preview-teleported
                            :preview-src-list="[product?.goods_img?.url + $ImageFormatWebp]" />
                    </el-descriptions-item>
                    <el-descriptions-item label="商品名称" align="left" :width="180">{{ product?.goods_name || '-'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="分类" align="left">{{ product?.category?.name || '未分类'
                        }}</el-descriptions-item>
                    <el-descriptions-item label="状态" align="left"><el-tag size="small">{{ product?.status
                            }}</el-tag></el-descriptions-item>
                    <el-descriptions-item label="销量" align="left">{{ product?.show_sales }}</el-descriptions-item>
                    <el-descriptions-item label="开始销售时间" align="left" >{{ formatDate(product?.start_sale_time ??
                        '') }}</el-descriptions-item>
                    <el-descriptions-item label="标签" align="left" >
                        <div class="flex-row flex-wrap" style="gap: 12px;">
                            <el-tag v-for="(item, index) in product?.goods_tags" :key="index" size="small">
                                {{ item.tags.name }}
                            </el-tag>
                        </div>
                    </el-descriptions-item>
                </el-descriptions>

                <!-- <showTitle :title="'其他信息'"></showTitle> -->
                <el-tabs type="border-card" v-model="activeName" style="min-height: 80vh;">
                    <el-tab-pane label="SKU" name="sku" lazy>
                        <GoodsSku :ID="product.id" ref="GoodsSkuRef" style="padding: 0 !important;" />
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="intro" lazy>
                        <GoodsIntro :ID="product.id" ref="GoodsIntroRef" style="padding: 0 !important;" />
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="attributes" lazy>
                        <GoodsAttributes :ID="product.id" ref="GoodsAttributesRef" style="padding: 0 !important;" />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>

        <div class="popu">
            <popupEditInfo ref="popupEditInfoRef" @refresh="getProductDetail" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import shoppingMall from '/@/api/shoppingMall';
import { formatDate } from '/@/utils/formatTime';

const { proxy } = getCurrentInstance() as any;
const $ImageFormatWebp = proxy.$ImageFormatWebp; // 图片格式化为 webp

// 引入组件
const showTitle = defineAsyncComponent(() => import('/@/components/showTitle/index.vue'));
const popupEditInfo = defineAsyncComponent(() => import('../popus-edit.vue'));
const GoodsSku = defineAsyncComponent(() => import('./components/GoodsSku/index.vue'));
const GoodsIntro = defineAsyncComponent(() => import('./components/GoodsIntro/index.vue'));
const GoodsAttributes = defineAsyncComponent(() => import('./components/GoodsAttributes/index.vue'));
const popupEditInfoRef = ref();
const GoodsSkuRef = ref();
const GoodsIntroRef = ref();
const GoodsAttributesRef = ref()

// 获取商品详情接口
const curdFun = shoppingMall.goodsDetail;

const route = useRoute();
const product: any = ref({});
const activeName = ref('sku');

const getProductDetail = async () => {
    const productId = Number(route.params.id);
    product.value = await curdFun(productId);
};

onMounted(() => {
    getProductDetail();
});
</script>
<style scoped lang="scss">
.product-detail-container {
    padding: 20px;

    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
    }

    .intro-image {
        width: 100%;
        height: auto;
        aspect-ratio: 3 / 4;
        /* 设置宽高比为 3:4 */
        border-radius: 8px;
        object-fit: cover;
        /* 确保图片覆盖整个容器 */
    }

    .body-scroll {
        max-height: 600px;
        overflow: auto;
        /* 添加滚动效果 */
    }
}
</style>