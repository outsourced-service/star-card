<template>
  <view class="page">
    <view class="custom-navbar">
      <view class="search-box">
        <uv-input type="text" placeholder="搜索卡牌/玩家/卡册..." prefixIcon="search" border="none" shape="circle" disabled
			prefixIconStyle="font-size: 40rpx;color: rgba(0, 0, 0, 0.66)" :custom-style="{ color: 'rgba(0, 0, 0, 0.44)', fontSize: '24rpx', gap: '8rpx', padding: '8rpx 36rpx 8rpx 20rpx', backgroundColor: 'rgba(242, 243, 246, 1)'}"/>
      </view>
    </view>
    <!-- 页面内容 -->
  </view>
</template>

<style scoped lang="scss">
.custom-navbar {
  height: 88rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  width: 45vw;
}

.search-box {
  // background-color: rgba(242, 243, 246, 1);
  // flex: 1;
  // height: 64rpx;
  // gap: 4px;
  // border-radius: 200rpx;
}

.search-box input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
</style>