<template>
  <view class="custom-card" @click="handleCard">
    <uni-card spacing="0" padding="0" margin="0" :border="false" shadow="0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.04)">
      <template v-slot:cover>
        <view class="custom-cover">
          <view class="custom-badge" v-if="data.is_new">
            <uv-text text="NEW" color="#fff" size="20rpx" lineHeight="26rpx" :custom-style="{fontWeight: 600, letterSpacing: '0.12rpx'}" align="center"></uv-text>
          </view>
          <uv-image :src="data.image" mode="aspectFill" width="238rpx" height="348rpx"></uv-image>
        </view>
      </template>
      <view class="custom-title">
        <view class="custom-tag">
          <view class="tag">
            <uv-text :text="data.type" color="#fff" size="20rpx" lineHeight="40rpx" :custom-style="{fontWeight: 700, letterSpacing: '0.12rpx'}" lines="1"></uv-text>
          </view>
          <uv-text :text="data.ot" color="#fea800" size="20rpx" lineHeight="26rpx" :custom-style="{fontWeight: 700, letterSpacing: '0.12rpx', width: 'auto'}" lines="1"></uv-text>
        </view>
        <uv-text :text="data.card_name" color="#000" size="26rpx" lineHeight="32rpx" :custom-style="{fontWeight: 600}" lines="2" style="width: 198rpx;"></uv-text>
      </view>
    </uni-card>
  </view>
</template>

<script>
export default {
  name: 'cardModeOne',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
    }
  },
  methods: {
	  handleCard() {
      this.data.is_new = false
	  }
  },
  emit: ['handleCardOne'],
  options: {
    styleIsolation: 'shared'
  },
};
</script>

<style scoped lang="scss">
.custom-card {
  width: 238rpx; /* 119px * 2 */
  height: 484rpx; /* 242px * 2 */
  margin-bottom: 20rpx; /* 10px * 2 */
}

.custom-card ::v-deep .uni-card {
  border-radius: 16rpx !important; /* 8px * 2 */
  overflow: hidden; /* 防止子元素溢出 */
  height: 484rpx; /* 242px * 2 */
}

.custom-title {
  padding: 14rpx 20rpx; /* 7px 10px * 2 */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.custom-tag {
  display: flex;
  background-color: #fff6e5;
  border-radius: 8rpx; /* 4px * 2 */
  height: 32rpx; /* 16px * 2 */
  align-items: center;
  margin-bottom: 12rpx; /* 6px * 2 */
  padding-right: 12rpx; /* 6px * 2 */
}

.tag {
  background-color: #fea800;
  height: 32rpx; /* 16px * 2 */
  font-size: 20rpx; /* 10px * 2 */
  border-radius: 8rpx; /* 4px * 2 */
  display: flex;
  align-items: center;
  padding: 0 12rpx; /* 0 6px * 2 */
  margin-right: 12rpx; /* 6px * 2 */
}

.custom-badge {
  background: rgba(254, 185, 51, 0.77);
  width: 72rpx; /* 36px * 2 */
  height: 34rpx; /* 17px * 2 */
  border-radius: 2000rpx; /* 1000px * 2 */
  position: absolute;
  top: 16rpx; /* 8px * 2 */
  right: 16rpx; /* 8px * 2 */
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>