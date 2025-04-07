<template>
	<view class="popup-page" v-if="closeableAdditional">
		<view class="popup-page-top">
			<view class="page-top-title">
				补款明细
				<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
			</view>
			<view class="page-top-tip">补款金额由评级机构出分后，根据市场价格估算给出；无法议价，星卡会为您第一时间垫付以避免影响订单进度。</view>
		</view>
		<view>
			<view class="popup-page-item" v-for="(item, index) in additionalInfo" :key="index">
				<view class="page-item-additional">
					<view class="item-additional-left">
						<view class="additional-left-top">{{item.sign}}<span class="left-top-id">{{item.id}}</span></view>
						<view class="additional-left-name">{{item.name}}</view>
					</view>
					<view class="item-additional-right">￥{{item.price}}</view>
				</view>
				<view class="page-item-line" v-if="index != additionalInfo.length - 1"></view>
			</view>
		</view>
	</view>
	<view class="page-bottom">
		<view class="page-bottom-price">
			<view class="bottom-price-title">补款总价</view>
			<view class="bottom-price-item">
				<view class="price-item-total">￥<span style="font-size: 44rpx;">{{total_price || 0}}</span></view>
				<view class="price-item-detail" @click="handleOpenDetail">
					查看明细
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold v-if="!closeableAdditional"></uv-icon>
					<uv-icon name="arrow-up" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold v-else></uv-icon>
				</view>
			</view>
		</view>
		<uv-button @click="handlePay" text="支付补款" color="#fea800" size="large" shape="circle" :customStyle="{width: '300rpx', height: '96rpx'}" :customTextStyle="{fontSize: '28rpx'}"></uv-button>
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
			closeableAdditional: {
				type: Boolean,
				default: false
			},
			additionalInfo: {
				type: Object,
				default: () => new Array(2).fill(
					{
						id: '0016807181',
						sign: 'Pristine 10',
						name: '2023 Critical Blow #BT22138 Bursting Rage SEC ritical Blow #BT',
						price: 440
					}
				)
			}
		},
		data() {
			return {
			}
		},
		emit: ['handlePay', 'handleOpenDetail'],
		methods: {
			handlePay() {
				this.$emit('handlePay')
			},
			handleOpenDetail() {
				this.$emit('handleOpenDetail')
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
	
	.page-top-tip {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.popup-page-item {
		display: flex;
		flex-direction: column;
	}
	
	.page-item-additional {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.item-additional-left {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		width: calc(100% - 140rpx);
	}
	
	.additional-left-top {
		display: flex;
		gap: 8rpx;
		align-items: baseline;
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.left-top-id {
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.additional-left-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.item-additional-right {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.page-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// box-shadow: 0 -8rpx 16rpx 0 #fafafa;
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0 -8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
		width: 100vw;
		border-top-width: 2rpx;
		padding: 40rpx 32rpx;
	}
	
	.page-item-line {
		border: 1rpx dashed rgba(229, 229, 234, 1);
		border-width: 2rpx;
		margin: 32rpx 0;
	}
	
	.page-bottom-price {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}
	
	.bottom-price-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.bottom-price-item {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
	}
	
	.price-item-total {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}
	
	.price-item-detail {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
</style>