<template>
	<view class="record-page">
		<view class="record-page-card">
			<view class="page-card-top">
				星卡独享高分战绩功能，已获<span style="font-weight: 600;">国家实用新型专利</span>
			</view>
			<view class="page-card-item">
				<view class="card-item-info">
					<view class="card-item-progress"></view>
					<view class="item-info">
						<view class="item-info-top">
							<view class="info-top-height">有<span class="top-height-number">38</span>张卡牌获得高分!</view>
							<view class="info-top-total">您共送评了<span class="top-total-number">376</span>张卡牌</view>
						</view>
						<view class="item-info-data">
							2023年4月12日加入星卡
						</view>
					</view>
				</view>
				<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="28rpx" bold></uv-icon>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.record-page {
		background: rgba(254, 189, 61, 1);
		padding: 32rpx 40rpx 72rpx 40rpx;
	}
	
	.record-page-card {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		padding-top: 16rpx;
		border-radius: 24rpx;
		border-width: 2rpx;
		background: rgba(255, 238, 204, 1);
		border: 2rpx solid;
		border-image-source: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 123.44%);
	}
	
	.page-card-top {
		color: rgba(254, 168, 0, 1);
		font-family: PingFang SC;
		font-weight: 400;
		font-size: 24rpx;
		text-align: center;
	}
	
	.page-card-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 32rpx;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		background: rgba(255, 251, 243, 1);
		box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
	}
	
	.card-item-progress {
		width: 176rpx;
		height: 176rpx;
	}
	
	.card-item-info {
		display: flex;
		align-items: center;
		gap: 32rpx;
	}
	
	.item-info {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
	
	.item-info-top {
		display: flex;
		flex-direction: column;
	}
	
	.info-top-height {
		display: flex;
		align-items: baseline;
		gap: 8rpx;
		font-weight: 600;
		font-size: 30rpx;
		line-height: 42rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.top-height-number {
		font-weight: 700;
		font-size: 44rpx;
		line-height: 64rpx;
		letter-spacing: 0;
		text-decoration: underline;
		text-decoration-style: solid;
		 text-decoration-color: rgba(254, 168, 0, 1);
		text-decoration-offset: 4rpx;
		text-decoration-thickness: 20%;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.info-top-total {
		display: flex;
		align-items: baseline;
		gap: 8rpx;
		font-weight: 600;
		font-size: 24rpx;
		line-height: 42rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.top-total-number {
		font-weight: 700;
		font-size: 32rpx;
		line-height: 42rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.item-info-data {
		font-weight: 400;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
	}
</style>