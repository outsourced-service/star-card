<template>
	<view class="page">
		<uv-icon name="checkmark-circle-fill" color="#fea800" size="120rpx"></uv-icon>
		<view class="page-title">支付成功</view>
		<view class="page-text">感谢您对星卡快送的支持，我们将尽快为您处理订单！</view>
		<view class="page-button">
			<uv-button text="确认" color="#fea800" shape="circle" @click="handleBack" size="large" :customStyle="{height: '88rpx'}"></uv-button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleBack() {
				// 返回逻辑
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to bottom, #fff7e8, #ffffff);
		padding-bottom: 120rpx; /* 为底部按钮预留空间 */
		box-sizing: border-box;
	}
	
	.page-title {
		font-weight: 600;
		font-size: 32rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.99);
		margin-top: 40rpx;
	}
	
	.page-text {
		font-size: 26rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.44);
		margin-top: 16rpx;
		max-width: 360rpx;
	}
	
	.page-button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 24rpx 32rpx 40rpx 32rpx;
		z-index: 100;
	}
</style>