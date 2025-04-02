<template>
	<view class="quick-page">
		<uv-image src="https://img.picui.cn/free/2025/03/13/67d2fa3b48950.png" mode="scaleToFill" width="100vw" height="360rpx"/>
		<view class="link-item-tag">
			<!-- <uv-tags text="2月底车收卡中！" bgColor="rgba(254, 185, 51, 1)" borderColor="rgba(254, 185, 51, 1)" shape="circle" size="mini"></uv-tags> -->
			2月底车收卡中！
		</view>
		<view class="quick-link">
			<view class="quick-link-item" @click="handleLink">
				<view class="link-item">
					<view class="link-item-title">线上送评</view>
					<view class="link-item-clock">
						<uv-icon name="clock" color="rgba(254, 168, 0, 1)" size="28rpx"></uv-icon>
						<uv-text text="还有4天截单" color="rgba(254, 168, 0, 1)" size="24rpx" lineHeight="26rpx" :custom-style="{fontWeight: 600}"></uv-text>
					</view>
				</view>
				<view class="link-image-left">
					<uv-image src="https://img.picui.cn/free/2025/03/13/67d2fd8eb78a2.png" mode="scaleToFill" width="126rpx" height="150rpx"/>
				</view>
			</view>
			<view class="quick-link-item">
				<view class="link-item">
					<view class="link-item-title">线下送评</view>
					<view class="link-item-text">入驻卡社，面对面送评</view>
				</view>
				<view class="link-image-right">
					<uv-image src="https://img.picui.cn/free/2025/03/13/67d2fdc235bc7.png" mode="scaleToFill" width="112rpx" height="148rpx"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		data() {
			return {
			}
		},
		methods: {
			handleLink() {
				uni.navigateTo({
					url: '/pages/order/organization/index'
				})
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.quick-page {
		background-color: #f6f7f9;
		width: 100vw;
		height: 520rpx;
	}
	
	.quick-link {
		margin: 0 24rpx;
		display: flex;
		gap: 16rpx;
		justify-content: space-between;
		margin-top: -80rpx;
	}
	
	.quick-link-item {
		width: calc((100vw - 48rpx - 16rpx) / 2) !important;
		height: 160rpx;
		border: solid 2rpx rgba(254, 168, 0, 1);
		border-radius: 24rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding-left: 20rpx;
		z-index: 2;
	}
	
	.link-item-tag {
		position: relative;
		width: 208rpx;
		padding-top: 4rpx;
		padding-bottom: 4rpx;
		padding-left: 16rpx;
		border-radius: 21rpx;
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
		background: rgba(254, 185, 51, 1);
		left: 30rpx;
		bottom: 56rpx;
		z-index: 10;
	}
	
	.link-item {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
		justify-content: center;
	}
	
	.link-item-title {
		font-weight: 600;
		font-size: 30rpx;
		line-height: 40rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.link-item-clock {
		display: flex;
		align-items: center;
		gap: 4rpx;
	}
	
	.link-item-text {
		font-weight: 600;
		font-size: 22rpx;
		line-height: 26rpx;
		vertical-align: middle;
		color: rgba(254, 168, 0, 1);
		width: 222rpx;
	}
	
	.link-image-left {
		position: relative;
		top: -32rpx;
		right: -16rpx;
	}
	
	.link-image-right {
		position: relative;
		top: -30rpx;
		right: -14rpx;
	}
</style>