<template>
  <view class="custom-card"  v-for="(item, index) in data" :key="index">
    <uni-card spacing="30rpx 24rpx 20rpx 24rpx" padding="0" margin="24rpx" :border="false" shadow="0rpx 8rpx 40rpx 0rpx rgba(0, 0, 0, 0.05)">
      <template v-slot:title>
        <view class="custom-top">
          <view class="custom-top-left">
            <uv-image :src="item.avatar" mode="aspectFill" width="72rpx" height="72rpx"/>
            <view class="custom-title">
              <view class="custom-title-top">
                {{item.nickname}}
                <view class="custom-level">
                  <uv-image :src="item.level_image" mode="aspectFill" width="140rpx" height="36rpx"/>
                </view>
                <view class="custom-new" v-if="item.new_number">
                  +{{item.new_number}}
                </view>
              </view>
              <view class="custom-title-bottom">
                {{item.city}}
                &nbsp;·&nbsp;
                {{item.follow_number}}
                +人关注&nbsp;·&nbsp;
                {{item.card_number}}
                +张卡牌
              </view>
            </view>
          </view>
          <uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="32rpx" :bold="true"></uv-icon>
        </view>
      </template>
      <view class="horizontal-list">
        <view class="list-container">
			<cardModeOne v-for="(ite, index1) in item.card_list" :key="index1" :data="ite" :is_group="true" class="list-container-item"></cardModeOne>
        </view>
      </view>
    </uni-card>
  </view>
</template>

<script>

export default {
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
  components: {
  },
  options: {
    styleIsolation: 'shared'
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
.custom-card {
  /* width: 738rpx; */ /* 369px * 2 */
  // height: 660rpx; /* 330px * 2 */
}

.custom-card ::v-deep .uni-card {
  border-radius: 24rpx !important; /* 12px * 2 */
  overflow: hidden; /* 防止子元素溢出 */
  // height: 660rpx; /* 330px * 2 */
}

.custom-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx; /* 10px * 2 */
  align-items: flex-start;
}

.custom-top-left {
  display: flex;
  gap: 16rpx; /* 8px * 2 */
  height: 72rpx; /* 36px * 2 */
}

.custom-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.custom-title-top {
  display: flex;
  color: #000;
  font-size: 28rpx; /* 14px * 2 */
  line-height: 40rpx; /* 20px * 2 */
  font-weight: 600;
  align-items: center;
}

.custom-level {
  display: flex;
  font-weight: 700;
  font-size: 18rpx; /* 9px * 2 */
  line-height: 32rpx; /* 16px * 2 */
  letter-spacing: 0;
  vertical-align: middle;
  background: linear-gradient(112.9deg, #B0F1FF -50.99%, #4EAAFF 29.24%, #003A7E 100%);
  -webkit-background-clip: text; /* Webkit内核浏览器 */
  color: transparent; /* 使文字透明，显示背景渐变 */
  background-clip: text; /* 标准CSS属性 */
  margin-left: 12rpx; /* 6px * 2 */
}

.custom-new {
  color: rgba(254, 168, 0, 1);
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 22rpx; /* 11px * 2 */
  line-height: 26rpx; /* 13px * 2 */
  letter-spacing: 0.12rpx; /* 0.06px * 2 */
  height: 38rpx; /* 19px * 2 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2000rpx; /* 1000px * 2 */
  padding: 0 16rpx; /* 0 8px * 2 */
  background: rgba(255, 238, 204, 1);
  margin-left: 12rpx; /* 6px * 2 */
}

.custom-title-bottom {
  display: flex;
  color: rgba(0, 0, 0, 0.33);
  font-size: 22rpx; /* 11px * 2 */
  line-height: 24rpx; /* 12px * 2 */
  letter-spacing: 0.12rpx; /* 0.06px * 2 */
}

.horizontal-list {
  overflow-x: auto;
}

.list-container {
  display: flex;
  flex-direction: row;
  gap: 20rpx; /* 10px * 2 */
}

.list-container-item {
	width: 238rpx !important;
}
</style>