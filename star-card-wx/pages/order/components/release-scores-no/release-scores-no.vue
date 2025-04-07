<template>
	<view class="release-scores-no">
		<view class="release-scores-no-canter">
			<view class="no-canter-icon">
				<uv-icon name="info-circle-fill" color="#fea800" size="108rpx" style="transform: rotate(180deg)"></uv-icon>
			</view>
			<view class="no-canter-title">您尚未结清款项，无法查看分数</view>
			<view class="no-canter-tip">若卡牌抵达星卡仓库后7天后还未支付，卡牌将会自动被星卡回收，请尽快支付哦！</view>
		</view>
		<view class="release-scores-no-button">
			<uv-button text="保存" color="#fea800" shape="circle" size="large" :customStyle="{height: '96rpx'}"></uv-button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.release-scores-no {
		width: 100vw;
		height: calc(100vh - 64rpx);
		background: linear-gradient(180deg, #FFF6E5 0%, #FFFFFF 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 120rpx;
	}
	
	.release-scores-no-canter {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12rpx;
		margin-top: -262rpx;
	}
	
	.no-canter-icon {
		margin-bottom: 20rpx;
	}
	
	.no-canter-title {
		font-weight: 600;
		font-size: 32rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.no-canter-tip {
		font-size: 26rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.release-scores-no-button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 24rpx 64rpx 40rpx 64rpx;
		z-index: 100;
	}
</style>