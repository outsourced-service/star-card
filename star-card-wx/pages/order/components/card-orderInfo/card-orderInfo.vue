<template>
	<view class="order-info-card">
		<view class="info-card-top" :style="'background: ' + orderInfo.evaluation?.ui_color_two">
			<view class="card-top-left" :style="'background: ' + orderInfo.evaluation?.ui_color_one">
				订单号：{{orderInfo.order_id}}
			</view>
			<view class="card-top-right" @click="handleElectronicStub">
				电子存根<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.33)" size="24rpx" bold></uv-icon>
			</view>
		</view>
		<view class="info-card-item">
			<view class="card-item-data">
				<view class="item-data-text">
					<view class="data-text-title">当前订单状态：</view>
				</view>
				<view class="item-data-text">
					<view class="data-text-title">预计出分时间：</view>
					<view class="data-text-time">{{getTime(orderInfo.estimate_time)}}</view>
				</view>
			</view>
			<view class="card-item-payment"> 
				<view class="item-payment-left">
					<uv-icon name="info-circle" color="rgba(224, 148, 0, 1)" size="32rpx" style="transform: rotate(180deg)"></uv-icon>
					此订单存在补款，请尽快核实后支付
				</view>
				<view class="item-payment-right" @click="handleAdditionalPayment">去补款</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		options: {
		    styleIsolation: 'shared'
		},
		props: {
			orderInfo: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
			}
		},
		emit: ['handleElectronicStub', 'handleAdditionalPayment'],
		methods: {
			handleAdditionalPayment() {
				this.$emit('handleAdditionalPayment')
			},
			handleElectronicStub() {
				this.$emit('handleElectronicStub')
			},
			getTime(value) {
				const date = new Date(value);
				const year = date.getFullYear();
				const month = date.getMonth() + 1; 
				const day = date.getDate(); 
				return year + '年' + month + '月' + day + '日'
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.info-card-top {
		display: flex;
		justify-content: space-between;
		height: 132rpx;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		margin-bottom: -64rpx;
	}
	
	.card-top-left {
		gap: 8rpx;
		border-radius: 32rpx;
		padding: 16rpx 72rpx 76rpx 32rpx;
		font-size: 22rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.card-top-right {
		display: flex;
		align-items: baseline;
		font-weight: 500;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
		gap: 8rpx;
		border-radius: 32rpx;
		padding: 16rpx 32rpx 76rpx 32rpx;
	}
	
	.info-card-item {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
		padding: 40rpx 32rpx 32rpx 32rpx;
		border-radius: 32rpx;
		border-bottom-width: 16rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1);
	}
	
	.card-item-data {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}
	
	.item-data-text {
		display: flex;
		align-items: center;
		gap: 4rpx;
	}
	
	.data-text-title {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.data-text-time {
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.card-item-payment {
		background: rgba(255, 238, 204, 1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 24rpx;
		border-radius: 16rpx;
	}
	
	.item-payment-left {
		display: flex;
		align-items: center;
		gap: 8rpx;
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(224, 148, 0, 1);
	}
	
	.item-payment-right {
		padding: 8rpx 28rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		border: 2rpx solid rgba(224, 148, 0, 1);
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(224, 148, 0, 1);
	}
</style>
