<template>
  <view class="address-page">
    <view class="tag-container">
      <view
        v-for="(tag, index) in tags"
        :key="index"
        :class="['tag', { active: activeTag === tag }]"
        @click="selectTag(tag)"
      >
        {{ tag }}
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
  padding: 40rpx 32rpx;
  gap: 40rpx;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag {
  padding: 8rpx 16rpx;
  background-color: #f1f1f6;
  border-radius: 16rpx;
  color: #333;
  font-size: 28rpx;
  cursor: pointer;
}

.tag.active {
  border: 1px solid #fea800;
  color: #fea800;
  background-color: #fff;
}
</style>