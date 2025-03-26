<template>
  <view class="custom-card">
    <view class="custom-title">
		<uv-text text="您可能感兴趣的卡友" size="28rpx" lineHeight="44rpx" :custom-style="{fontWeight: 600}" align="left"></uv-text>
		<uv-text text="查看更多" color="rgba(0, 0, 0, 0.33)" size="24rpx" lineHeight="40rpx" :custom-style="{fontWeight: 600}" align="right"></uv-text>
	</view>
    <view class="horizontal-list">
      <view class="list-container">
        <view class="list-item" v-for="(item, index) in data" :key="index">
			<view class="list-item-image">
				<uv-avatar :src="item.avatar?.url" size="120rpx"></uv-avatar>
				<view class="item-image">
					<uv-image :src="item.level_image" mode="aspectFill" width="128rpx" height="36rpx"/>
				</view>
			</view>
			<view class="list-item-text">
				<view class="list-item-name">{{item.nickname}}</view>
				<view class="list-item-data">
					{{item.area}} · 卡牌{{item.card_number}}张
				</view>
			</view>
          <view class="list-item-follow">
            <uv-button v-if="!item.followed" @click="handleFollow(item.followed, index)" text="关注" :plain="true" color="rgba(254, 168, 0, 1)" shape="circle" size="small" :custom-style="{height: '48rpx', minWidth: '96rpx'}"></uv-button>
			<uv-button v-else @click="handleFollow(item.followed, index)" text="已关注" :plain="true" color="rgba(229, 229, 234, 1)" shape="circle" size="small" :custom-style="{height: '48rpx'}"></uv-button>
          </view>
        </view>
		<view class="list-more">
			<uv-icon name="arrow-right" size="40"></uv-icon>
		</view>
      </view>
    </view>
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
  methods: {
	  handleFollow(value, index) {
		  this.data[index].followed = !value
		  console.log(value)
	  }
  }
};
</script>

<style scoped lang="scss">
.custom-card {
  /* width: 738rpx; */ /* 369px * 2 */
  height: 514rpx; /* 257px * 2 */
  background-color: #fff;
  padding-top: 32rpx; /* 16px * 2 */
  padding-bottom: 28rpx; /* 14px * 2 */
  padding-left: 24rpx; /* 12px * 2 */
}

.custom-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-right: 24rpx;
  margin-bottom: 20rpx;
}

.horizontal-list {
  overflow-x: auto;
}

.list-container {
  display: flex;
  flex-direction: row;
  gap: 20rpx; /* 10px * 2 */
}

.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f7f9;
  width: 208rpx; /* 100px * 2 */
  gap: 32rpx; /* 16px * 2 */
  padding-top: 40rpx; /* 20px * 2 */
  padding-right: 40rpx; /* 20px * 2 */
  padding-bottom: 32rpx; /* 16px * 2 */
  padding-left: 40rpx; /* 20px * 2 */
  border-radius: 16rpx; /* 8px * 2 */
  flex-shrink: 0;
}

.list-item-image {
	display: flex;
	flex-direction: column;
}

.item-image {
	position: relative;
	top: -28rpx;
	height: 8rpx;
}

.list-item-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx; /* 4px * 2 */
}

.list-item-name {
  font-weight: 600;
  font-size: 26rpx; /* 13px * 2 */
  line-height: 32rpx; /* 16px * 2 */
  letter-spacing: 0;
  color: rgba(0, 0, 0, 0.99);
}

.list-item-data {
  font-weight: 400;
  font-size: 22rpx; /* 11px * 2 */
  line-height: 26rpx; /* 13px * 2 */
  letter-spacing: 0.12rpx; /* 0.06px * 2 */
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.33);
}

.list-more {
	display: flex;
	align-items: center;
	padding-right: 30rpx;
}
</style>