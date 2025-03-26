<template>
  <div class="flex-col" style="gap: 20px">
    <el-descriptions class="margin-top" :column="3" size="default" border label-width="120px">
      <template #title>
        <showTitle :title="'基本信息'"></showTitle>
      </template>
      <el-descriptions-item label="订单编号">{{ data.order_id }}</el-descriptions-item>
      <el-descriptions-item label="下单时间">{{ new Date(data.order_time).toLocaleString() }}</el-descriptions-item>
      <el-descriptions-item label="支付方式">{{ data.payment_method || '-' }}</el-descriptions-item>
      <el-descriptions-item label="订单来源">{{ data.come_from || '-' }}</el-descriptions-item>
      <el-descriptions-item label="订单备注">{{ data.notes || '-' }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" :column="3" size="default" border label-width="120px">
      <template #title>
        <showTitle :title="'状态信息'"></showTitle>
      </template>
      <el-descriptions-item label="流程状态">{{ data.process_status || '-' }}</el-descriptions-item>
      <el-descriptions-item label="当前状态">{{ data.status || '-' }}</el-descriptions-item>
      <el-descriptions-item label="库存状态">{{ data.stock_status || '-' }}</el-descriptions-item>
      <el-descriptions-item label="文本状态">{{ data.text_status || '-' }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" :column="3" size="default" border label-width="120px">
      <template #title>
        <showTitle :title="'价格和数量'"></showTitle>
      </template>
      <el-descriptions-item label="付款金额">{{ (data.pay_amount / 100).toFixed(2) }} 元</el-descriptions-item>
      <el-descriptions-item label="总商品价格">{{ (data.total_price / 100).toFixed(2) }} 元</el-descriptions-item>
      <el-descriptions-item label="运费金额">{{ (data.deliver_fee / 100).toFixed(2) }} 元</el-descriptions-item>
      <el-descriptions-item label="优惠金额">{{ (data.discount_amount / 100).toFixed(2) }} 元</el-descriptions-item>
      <el-descriptions-item label="投保费用">{{ (data.insure_fee / 100).toFixed(2) }} 元</el-descriptions-item>
      <el-descriptions-item label="投保实际支付费用">{{ (data.insure_amount / 100).toFixed(2) }} 元</el-descriptions-item>
      <el-descriptions-item label="使用积分抵扣金额">{{ (data.pay_score_amount / 100).toFixed(2) }} 元</el-descriptions-item>
      <el-descriptions-item label="总积分">{{ data.total_score || 0 }} 积分</el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" :column="3" size="default" border label-width="120px">
      <template #title>
        <showTitle :title="'物流信息'"></showTitle>
      </template>
      <el-descriptions-item label="快递名称">{{ data.delivery_name || '-' }}</el-descriptions-item>
      <el-descriptions-item label="快递单号">{{ data.delivery_number || '-' }}</el-descriptions-item>
      <el-descriptions-item label="寄回快递单号">{{ data.back_delivery_number || '-' }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" :column="3" size="default" border label-width="120px">
      <template #title>
        <showTitle :title="'地址信息'"></showTitle>
      </template>
      <el-descriptions-item label="收件人">{{ data.order_address[0]?.consignee || '-' }}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{ data.order_address[0]?.phone || '-' }}</el-descriptions-item>
      <el-descriptions-item label="详细地址">{{ data.order_address[0]?.address_info || '-' }}</el-descriptions-item>
    </el-descriptions>

    <div class="photo-wall">
      <showTitle :title="'上传的照片'" class="mb16"></showTitle>
      <div class="image-grid small">
        <el-image v-for="(img, index) in data.order_user_annex" :key="index" :src="img.img.url + $ImageFormatWebp"
          :alt="'订单图片 ' + (index + 1)" fit="cover" class="image-item" :initial-index="index"
          v-bind:preview-src-list="previewSrcList(data.order_user_annex)" />
      </div>
      <div v-if="data.order_user_annex.length === 0" class="no-data">暂无上传的照片</div>
    </div>

    <div class="photo-wall">
      <showTitle :title="'入库图片'" class="mb16 mT16"></showTitle>
      <div class="image-grid small">
        <el-image v-for="(img, index) in data.order_annex" :key="index" :src="img.img.url + $ImageFormatWebp"
          :alt="'入库图片 ' + (index + 1)" fit="cover" class="image-item" :initial-index="index"
          v-bind:preview-src-list="previewSrcList(data.order_annex)" />
      </div>
      <div v-if="data.order_annex.length === 0" class="no-data">暂无入库图片</div>
    </div>
    <div class="photo-wall">
      <showTitle :title="'评分信息'" class="mb16 mT16"></showTitle>
      <el-tabs class="margin-top" >
        <el-tab-pane v-for="(score, index) in data.order_scoring_annex" :key="index" :label="score.card_code">
          <div class="image-grid large">
            <el-image :src="score.img.url + $ImageFormatWebp" :alt="'评分图片 ' + (index + 1)" fit="cover"
              class="image-item" :preview-src-list="previewSrcList(data.order_scoring_annex)" />
            <div class="score-info">
              <p>卡片编号: {{ score.card_code }}</p>
              <p>卡片品类: {{ score.card_category }}</p>
              <p>卡片签字: {{ score.card_sign }}</p>
              <p>卡片年份: {{ score.card_year }}</p>
              <p>当前评分: {{ score.current_score || '无' }}</p>
              <p>最大评分: {{ score.max_score || '无' }}</p>
              <p>描述: {{ score.content }}</p>
            </div>
          </div>
        </el-tab-pane>
        <div v-if="data.order_scoring_annex.length === 0" class="no-data">暂无评分信息</div>
      </el-tabs>
    </div>

    <!-- <el-descriptions class="margin-top" :column="3" size="default" border label-width="120px">
      <template #title>
        <showTitle :title="'其他信息'"></showTitle>
      </template>
      <el-descriptions-item label="是否补款订单">{{ data.is_supplementary_payment ? '是' : '否' }}</el-descriptions-item>
      <el-descriptions-item label="是否删除订单">{{ data.is_deleted ? '是' : '否' }}</el-descriptions-item>
      <el-descriptions-item label="是否弹出出分提示">{{ data.is_tips ? '是' : '否' }}</el-descriptions-item>
    </el-descriptions> -->
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { defineAsyncComponent, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const $ImageFormatWebp = proxy.$ImageFormatWebp;

const showTitle = defineAsyncComponent(() => import('/@/components/showTitle/index.vue'));

withDefaults(defineProps<{
  data: any;
}>(), {
  data: () => ({
    order_id: '',
    order_time: '',
    payment_method: '',
    pay_amount: 0,
    total_price: 0,
    discount_amount: 0,
    deliver_fee: 0,
    insure_fee: 0,
    insure_amount: 0,
    coupon_amount: 0,
    pay_score_amount: 0,
    total_score: 0,
    come_from: '',
    notes: '',
    delivery_name: '',
    delivery_number: '',
    back_delivery_number: '',
    process_status: '',
    status: '',
    stock_status: '',
    text_status: '',
    order_user_annex: [],
    order_address: [],
    order_scoring_annex: [], // 新增字段
    is_supplementary_payment: false,
    is_deleted: false,
    is_tips: false,
  })
});

const previewSrcList = (data: any) => data.map((item: any) => item.img.url + $ImageFormatWebp);

</script>

<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  /* 缩小上传的照片和入库图片 */
  gap: 10px;
}

.image-grid.large {
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  /* 放大评分信息 */
}

.image-item {
  overflow: hidden;
  border-radius: 8px;
}

.no-data {
  text-align: center;
  color: #999;
  margin-top: 10px;
}

.score-info {
  margin: 10px 0; /* 调整评分信息的上下间距 */
}

.score-info p {
  font-size: 1.2em; /* 调整字体大小 */
  margin: 5px 0; /* 调整每个段落的上下间距 */
}
</style>