<template>
    <div class="cardLibrary-detail-container flex-1 flex-row">
        <el-card class="layout-padding-auto" body-class="flex-1 body-scroll el-card-tabel">
            <div class="height-y-auto flex-col" style="gap: 20px;">
                <!-- 主信息区块 -->
                <el-descriptions class="margin-top" :column="3" size="default" border direction="vertical">
                    <template #title>
                        <showTitle :title="'基础信息'"></showTitle>
                    </template>

                    <!-- 核心信息 -->
                    <el-descriptions-item label="卡片大类">{{ cardLibraryData?.type_category || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="完整名称">{{ cardLibraryData?.card_name || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="类别名称">{{ cardLibraryData?.card_category || '-' }}</el-descriptions-item>
                    
                    <!-- 年份信息 -->
                    <el-descriptions-item label="特定年份">{{ cardLibraryData?.particular_year || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="卡片年份">{{ cardLibraryData?.card_year || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="备用年份">{{ cardLibraryData?.year_remarks || '-' }}</el-descriptions-item>
                </el-descriptions>

                <!-- 图片信息区块 -->
                <el-descriptions :column="3" size="default" border direction="vertical">
                    <template #title>
                        <showTitle :title="'图片信息'"></showTitle>
                    </template>

                    <!-- 封面图 -->
                    <el-descriptions-item label="封面图" :span="1">
                        <template v-if="cardLibraryData?.card_cover?.url">
                            <el-image 
                                style="width: 80px; height: 120px; border-radius: 8px"
                                :src="cardLibraryData?.card_cover.url"
                                :preview-src-list="[cardLibraryData?.card_cover.url]"
                                fit="cover"
                                preview-teleported
                            />
                        </template>
                        <span v-else>-</span>
                    </el-descriptions-item>

                    <!-- 背面图 -->
                    <el-descriptions-item label="背面图" :span="1">
                        <template v-if="cardLibraryData?.card_img?.url">
                            <el-image 
                                style="width: 80px; height: 120px; border-radius: 8px"
                                :src="cardLibraryData?.card_img.url"
                                :preview-src-list="[cardLibraryData?.card_img.url]"
                                fit="cover"
                                preview-teleported
                            />
                        </template>
                        <span v-else>-</span>
                    </el-descriptions-item>

                    <!-- 分类LOGO -->
                    <el-descriptions-item label="分类LOGO" :span="1">
                        <template v-if="cardLibraryData?.img_category?.url">
                            <el-image 
                                style="width: 60px; height: 40px"
                                :src="cardLibraryData?.img_category.url"
                                :preview-src-list="[cardLibraryData?.img_category.url]"
                                fit="contain"
                                preview-teleported
                            />
                        </template>
                        <span v-else>-</span>
                    </el-descriptions-item>
                </el-descriptions>

                <!-- 分类详细信息 -->
                <el-descriptions :column="2" size="default" border direction="vertical">
                    <template #title>
                        <showTitle :title="'分类信息'"></showTitle>
                    </template>
                    
                    <el-descriptions-item label="类别中文">{{ cardLibraryData?.cn_category || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="类别英文">{{ cardLibraryData?.eng_category || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="分类备注" :span="2">{{ cardLibraryData?.category_remarks || '-' }}</el-descriptions-item>
                </el-descriptions>

                <!-- 发行商信息 -->
                <el-descriptions :column="3" size="default" border direction="vertical">
                    <template #title>
                        <showTitle :title="'发行商信息'"></showTitle>
                    </template>
                    
                    <el-descriptions-item label="发行商中文">{{ cardLibraryData?.cn_publisher || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="发行商英文">{{ cardLibraryData?.eng_publisher || '-' }}</el-descriptions-item>
                    <el-descriptions-item label="发行商LOGO">
                        <template v-if="cardLibraryData?.img_publisher?.url">
                            <el-image 
                                style="width: 100px; height: 40px"
                                :src="cardLibraryData?.img_publisher.url"
                                fit="contain"
                                preview-teleported
                            />
                        </template>
                        <span v-else>-</span>
                    </el-descriptions-item>
                </el-descriptions>

                <!-- 动态类型信息 -->
                <template v-if="cardLibraryData?.type_category === 'TCG'">
                    <el-descriptions :column="3" size="default" border direction="vertical">
                        <!-- <template #title>
                            <showTitle :title="'TCG专属信息'"></showTitle>
                        </template> -->
                        
                        <el-descriptions-item label="卡牌分类">{{ cardLibraryData?.abbr_ranks || '-' }}</el-descriptions-item>
                        <el-descriptions-item label="系列名称">{{ cardLibraryData?.card_series || '-' }}</el-descriptions-item>
                        <el-descriptions-item label="系列缩写">{{ cardLibraryData?.abbr_series || '-' }}</el-descriptions-item>
                        <el-descriptions-item label="卡牌编号">{{ cardLibraryData?.card_code || '-' }}</el-descriptions-item>
                        <el-descriptions-item label="插画师">{{ cardLibraryData?.illustrator || '-' }}</el-descriptions-item>
                    </el-descriptions>
                </template>

                <template v-if="cardLibraryData?.type_category === 'SPORTS'">
                    <el-descriptions :column="3" size="default" border direction="vertical">
                        <template #title>
                            <showTitle :title="'体育卡信息'"></showTitle>
                        </template>
                        
                        <el-descriptions-item label="队伍昵称">{{ cardLibraryData?.card_ranks || '-' }}</el-descriptions-item>
                        <el-descriptions-item label="中文缩写">{{ cardLibraryData?.abbr_ranks || '-' }}</el-descriptions-item>
                        <el-descriptions-item label="队伍LOGO">
                            <template v-if="cardLibraryData?.img_ranks?.url">
                                <el-image 
                                    style="width: 60px; height: 60px"
                                    :src="cardLibraryData?.img_ranks.url"
                                    fit="contain"
                                    preview-teleported
                                />
                            </template>
                            <span v-else>-</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="限编信息">{{ cardLibraryData?.limited_edition || '-' }}</el-descriptions-item>
                        <el-descriptions-item label="位置信息">
                            {{ cardLibraryData?.cn_position || '' }} / {{ cardLibraryData?.eng_position || '' }}
                        </el-descriptions-item>
                    </el-descriptions>
                </template>

                <!-- 其他扩展信息 -->
                <el-descriptions :column="2" size="default" border direction="vertical">
                    <template #title>
                        <showTitle :title="'扩展信息'"></showTitle>
                    </template>
                    
                    <el-descriptions-item label="角色信息">
                        {{ cardLibraryData?.cn_role || '' }} / {{ cardLibraryData?.eng_role || '' }}
                    </el-descriptions-item>
                    <el-descriptions-item label="角色LOGO">
                        <template v-if="cardLibraryData?.img_role?.url">
                            <el-image 
                                style="width: 60px; height: 40px"
                                :src="cardLibraryData?.img_role.url"
                                fit="contain"
                                preview-teleported
                            />
                        </template>
                        <span v-else>-</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="罕度信息">
                        {{ cardLibraryData?.cn_rare_degree || '' }} / {{ cardLibraryData?.eng_rare_degree || '' }}
                    </el-descriptions-item>
                    <el-descriptions-item label="语言版本">
                        {{ cardLibraryData?.cn_language || '' }} / {{ cardLibraryData?.eng_language || '' }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { cardLibrary } from '/@/api/index';
import { formatDate } from '/@/utils/formatTime';
const curdFun = cardLibrary();

const { proxy } = getCurrentInstance() as any;
const $ImageFormatWebp = proxy.$ImageFormatWebp; // 图片格式化为 webp

// 引入组件
const showTitle = defineAsyncComponent(() => import('/@/components/showTitle/index.vue'));

const route = useRoute();
const cardLibraryData: any = ref({});
const activeName = ref('sku');

const getCardLibraryDetail = async () => {
    const cardLibraryId = Number(route.params.id);
	const { list } = await curdFun.get(
		{
			where: {
				id: { _eq: cardLibraryId }
			},
		},
		{}
	);
	cardLibraryData.value = list[0]
};

onMounted(() => {
    getCardLibraryDetail();
});
</script>
<style scoped lang="scss">
.cardLibrary-detail-container {
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