<template>
	<view class="popup-page">
		<view class="popup-page-top">
			<view class="page-top-title">
				结算明细
				<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
			</view>
		</view>
		<view class="popup-page-info">
			<view class="page-info-item">
				<view class="info-item-title">商品总价</view>
				<view class="info-item-price">￥5300</view>
			</view>
			<view class="page-info-item">
				<view class="info-item-title">优惠券</view>
				<view class="info-item-discount">-￥165</view>
			</view>
			<view class="page-info-item">
				<view class="info-item-title">积分抵扣</view>
				<view class="info-item-discount">-￥135</view>
			</view>
		</view>
		<view class="popup-page-total">
			<view class="page-total-title">合计总价</view>
			<view class="page-total-price">￥5000</view>
		</view>
	</view>
	<view class="page-bottom">
		<view class="page-bottom-safety">
			<uv-checkbox v-model="is_safety" shape="circle" activeColor="#fea800" @change="handleSafety">
				<view class="bottom-safety-text">
					我已知晓
					<view class="bottom-safety">
						《代送评注意事项》
					</view>
					与
					<view class="bottom-safety">
						《保险说明》
					</view>
				</view>
			</uv-checkbox>
		</view>
		<view class="page-bottom-line"></view>
		<view class="page-bottom-button">
			<view class="bottom-button-info">
				<view class="button-info-price">
					<span class="info-price-text">总价</span>
					<span class="info-price-unit">￥</span>
					<span class="info-price-num">{{total_price || 0}}</span>
					<span class="info-price-discount">￥5300</span>
				</view>
				<view class="button-info-detail">
					<span class="info-detail-discount">共优惠￥300</span>
					<view class="info-detail-icon" @click="handleOpenOrderDetail">
						查看明细<uv-icon name="arrow-down" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold></uv-icon>
					</view>
				</view>
			</view>
			<uv-button @click="handlePay" text="确认并支付" color="#fea800" size="large" shape="circle" :customStyle="{width: '240rpx', height: '88rpx'}"></uv-button>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
		},
		props: {
		},
		data() {
			return {
			}
		},
		emit: ['handlePay'],
		methods: {
			handlePay() {
				this.$emit('handlePay')
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.popup-page {
		padding: 40rpx 32rpx;
		// max-height: 60vh;
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.popup-page-top {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.page-top-title {
		display: flex;
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		gap: 4rpx;
	}
	
	.popup-page-info {
		max-height: 840rpx; /* 设置最大高度 */
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.page-info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16rpx;
	}
	
	.info-item-title {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.info-item-price {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.info-item-discount {
		font-size: 26rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.popup-page-total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.page-bottom {
		display: flex;
		flex-direction: column;
		box-shadow: 0px -8rpx 16rpx 0px #fafafa;
		background-color: rgba(255, 255, 255, 1);
		width: 100vw;
		gap: 28rpx;
		border-top-width: 2rpx;
		padding: 24rpx;
	}
	
	.page-bottom-safety {
		display: flex;
		align-items: center;
	}
	
	.bottom-safety-text {
		display: flex;
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
		align-items: center;
		margin-bottom: 2rpx;
	}
	
	.bottom-safety {
		color: rgba(254, 168, 0, 1);
	}
	
	.page-bottom-line {
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
	
	.page-bottom-checkbox {
		line-height: 28rpx;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-bottom-button {
		display: flex;
		gap: 24rpx;
		align-items: center;
		justify-content: flex-end;
		margin-top: 4rpx;
	}
	
	.bottom-button-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8rpx;
	}
	
	.button-info-price {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
	}
	
	.info-price-text {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		margin-right: 4rpx;
	}
	
	.info-price-unit {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.info-price-num {
		font-weight: 600;
		font-size: 36rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.info-price-discount {
		font-weight: 600;
		font-size: 24rpx;
		text-decoration: line-through;
		color: rgba(0, 0, 0, 0.33);
		margin-left: 4rpx;
	}
	
	.button-info-detail {
		display: flex;
		align-items: flex-start;
		gap: 12rpx;
	}
	
	.info-detail-discount {
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.info-detail-icon {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
</style>