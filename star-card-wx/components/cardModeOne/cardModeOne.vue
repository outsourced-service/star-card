<template>
  <view class="custom-card" @click="handleCard" :style="is_group ? 'width: 238rpx' : ''">
    <uni-card spacing="0" padding="0" margin="0" :border="false" shadow="0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.04)">
      <template v-slot:cover>
        <view class="custom-cover">
          <view class="custom-badge" v-if="data.is_new && !is_select">
            <uv-text text="NEW" color="#fff" size="20rpx" lineHeight="26rpx" :custom-style="{fontWeight: 600, letterSpacing: '0.12rpx'}" align="center"></uv-text>
          </view>
          <uv-image :src="data.image" mode="aspectFill" width="100%" height="348rpx" bg-color="#eaeaef" lazyLoad></uv-image>
		  <view class="custom-top" v-if="data.is_top && !is_group && !is_select">置顶</view>
		  <view class="custom-sale" v-if="data.on_sale && !is_group && !is_select">上架中</view>
		  <view class="custom-select" v-if="is_select">
			  <uni-icons type="circle" size="40rpx" color="#d1d1d6" v-if="!data.is_select" @click="handleSelected"></uni-icons>
			  <uni-icons type="checkbox-filled" size="40rpx" color="#fea800" v-else @click="handleSelectNo"></uni-icons>
		  </view>
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
	  <view class="custom-like" v-if="!data.is_like && !is_group" @click.stop="handleLike">
			<uv-icon name="heart" color="rgba(0, 0, 0, 0.2)" size="36rpx"></uv-icon>
			<view class="custom-like-number">{{data.like_number}}</view>
	  </view>
	  <view class="custom-like" v-if="data.is_like && !is_group" @click.stop="handleUnLike">
	  		<uv-icon name="heart-fill" color="#fea800" size="36rpx"></uv-icon>
			<view class="custom-like-number-fill">{{data.like_number}}</view>
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
      default: () => ({})
    },
	is_group: {
		type: Boolean,
		default: () => (false)
	},
	is_select: {
		type: Boolean,
		default: () => (false)
	}
  },
  data() {
    return {
    }
  },
  methods: {
	  handleSelectNo() {
	  	this.$emit('handleSelectNo')
	  },
	  handleSelected() {
		  this.$emit('handleSelected')
	  },
	handleLike() {
		this.data.is_like = true
		this.data.like_number += 1
	},
	handleUnLike() {
		this.data.is_like = false
		this.data.like_number -= 1
	},
	handleCard() {
		this.data.is_new = false
	}
  },
  emit: ['handleSelected', 'handleSelectNo'],
  options: {
    styleIsolation: 'shared'
  },
};
</script>

<style scoped lang="scss">
.custom-card {
  width: 100%;
  // height: 484rpx; /* 242px * 2 */
  margin-bottom: 4rpx;
}

.custom-card ::v-deep .uni-card {
  border-radius: 16rpx !important; /* 8px * 2 */
  overflow: hidden; /* 防止子元素溢出 */
  // height: 484rpx; /* 242px * 2 */
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

.custom-top {
	padding: 4rpx 12rpx;
	border-radius: 2000rpx;
	background: rgba(254, 168, 0, 1);
	font-family: PingFang SC;
	font-weight: 600;
	font-size: 20rpx;
	color: rgba(255, 255, 255, 1);
	z-index: 2;
	position: absolute;
	top: 8rpx; 
	left: 8rpx;
}

.custom-sale {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-width: 8rpx;
	background: rgba(52, 199, 89, 0.66);
	font-weight: 600;
	font-size: 24rpx;
	color: rgba(255, 255, 255, 1);
	position: absolute;
	bottom: 0; 
	padding: 12rpx 0;
}

.custom-select {
	z-index: 2;
	position: absolute;
	top: 8rpx; 
	right: 8rpx;
}

.custom-like {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 4rpx;
	padding: 0 20rpx;
	margin-bottom: 16rpx;
}

.custom-like-number {
	font-size: 24rpx;
	padding-top: 2rpx;
	color: rgba(0, 0, 0, 0.44);
}

.custom-like-number-fill {
	font-size: 24rpx;
	padding-top: 2rpx;
	color: rgba(0, 0, 0, 0.66);
}
</style>