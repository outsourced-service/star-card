<template>
  <view class="address-page">
    <view class="tag-container">
      <view
        v-for="(tag, index) in tags"
        :key="index"
        @click="selectTag(tag)"
      >
		<view style="display: flex; align-items: center;">
			<view :class="['tag', { active: activeTag === tag }]">
				{{ tag }}
			</view>
			<view class="tag-container-line" v-if="index == 4"></view>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        '全部', '北京', '上海', '广州', '深圳', '浙江', '四川', '陕西', '广东', '天津', '辽宁', '福建', '山东', '安徽', '河北', '江苏', '四川'
      ],
      activeTag: '浙江'
    };
  },
  methods: {
    selectTag(tag) {
      this.activeTag = tag;
    }
  }
};
</script>

<style lang="scss" scoped>
.address-page {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 32rpx;
  gap: 40rpx;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16rpx;
}

.tag-container-line {
	height: 32rpx;
	// margin: 0 20rpx;
	margin-left: 20rpx;
	border-left: 2rpx solid rgba(209, 209, 214, 1)
}

.tag {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 56rpx;
	background-color: rgba(242, 243, 246, 1);
	color: rgba(0, 0, 0, 0.66);
	font-size: 28rpx;
	border-radius: 1000rpx;
	padding: 0 28rpx;
	border: 2rpx solid rgba(242, 243, 246, 1);
}

.tag.active {
	border: 2rpx solid #fea800;
	color: #fea800;
	background-color: rgba(255, 246, 229, 1);
}
</style>