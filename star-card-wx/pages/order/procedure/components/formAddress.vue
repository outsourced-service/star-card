<template>
	<view class="address-page">
		<view class="address-page-nodata">选择地址</view>
		<view class="address-page-tips">订单完成后默认顺丰到付寄回该地址，地址后续可更改</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.address-page {
		background-color: #fff;
		box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
		background-color: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: column;
		border-radius: 32rpx;
		padding: 48rpx 32rpx 32rpx 32rpx;
		gap: 40rpx;
	}
	
	.address-page-nodata {
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(254, 168, 0, 1);
		font-weight: 600;
		font-size: 28rpx;
	}
	
	.address-page-tips {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 2rpx dashed rgba(209, 209, 214, 1);
		padding-top: 24rpx;
	}
</style>