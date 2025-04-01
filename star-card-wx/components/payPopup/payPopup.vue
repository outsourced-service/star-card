<template>
	<view class="pay-popup">
		<view class="pay-popup-header">
			<view class="popup-header-title">请选择支付方式</view>
		</view>
		<view class="pay-popup-price">
			<text class="popup-price-symbol">¥</text>
			<text class="popup-price-value">{{ price || 0 }}</text>
			<text class="popup-price-original">¥{{ originalPrice || 0}}</text>
		</view>
		<view class="pay-popup-methods">
			<view class="popup-method-item" @click="handleSelect('wechat')">
				<view class="method-item-left">
					<image src="/static/images/wechat.png" mode="aspectFit" class="method-item-icon"></image>
					<text class="method-item-name">微信支付</text>
				</view>
				<uv-icon name="checkmark-circle-fill" color="#fea800" size="40rpx" v-if="selectedMethod === 'wechat'"></uv-icon>
				<view class="method-item-radio" v-else></view>
			</view>
			<view class="popup-method-item" @click="handleSelect('alipay')" style="border-bottom: none;">
				<view class="method-item-left">
					<image src="/static/images/alipay.png" mode="aspectFit" class="method-item-icon"></image>
					<text class="method-item-name">支付宝</text>
				</view>
				<uv-icon name="checkmark-circle-fill" color="#fea800" size="40rpx" v-if="selectedMethod === 'alipay'"></uv-icon>
				<view class="method-item-radio" v-else></view>
			</view>
			<view class="method-item-tip" v-if="selectedMethod === 'alipay'">请截图订单完成页面，并截图支付宝转账记录发送给客服完成支付宝支付！</view>
		</view>
		<view class="pay-popup-button">
			<uv-button text="立即支付" color="#fea800" shape="circle" @click="handlePay" size="large" :customStyle="{height: '88rpx'}"></uv-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'payPopup',
	props: {
		price: {
			type: [Number, String],
			required: true
		},
		originalPrice: {
			type: [Number, String],
			default: ''
		}
	},
	data() {
		return {
			selectedMethod: 'wechat'
		}
	},
	methods: {
		handleSelect(method) {
			this.selectedMethod = method
		},
		handlePay() {
			// this.$emit('pay', this.selectedMethod)
			if(this.selectedMethod == 'wechat') {
				uni.navigateTo({
					url: '/pages/order/paymentPage/wechatSuccessful'
				})
			} else if(this.selectedMethod == 'alipay') {
				uni.navigateTo({
					url: '/pages/order/paymentPage/alipaySuccessful'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.pay-popup {
	padding: 40rpx 32rpx 0 32rpx;
	
	.pay-popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 48rpx;
		
		.popup-header-title {
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.99);
		}
	}
	
	.pay-popup-price {
		text-align: center;
		margin-bottom: 32rpx;
		
		.popup-price-symbol {
			font-size: 40rpx;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.99);
		}
		
		.popup-price-value {
			font-size: 72rpx;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.99);
			margin-left: 8rpx;
		}
		
		.popup-price-original {
			font-size: 32rpx;
			color: rgba(0, 0, 0, 0.33);
			text-decoration: line-through;
			margin-left: 16rpx;
		}
	}
	
	.pay-popup-methods {
		
		.popup-method-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx 0;
			border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
			
			&:last-child {
				border-bottom: none;
			}
			
			.method-item-left {
				display: flex;
				align-items: center;
				gap: 24rpx;
				
				.method-item-icon {
					width: 48rpx;
					height: 48rpx;
				}
				
				.method-item-name {
					font-size: 28rpx;
					font-weight: 600;
					color: rgba(0, 0, 0, 0.99);
				}
			}

			.method-item-radio {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				border: 2rpx solid rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;
				justify-content: center;
				
				&-active {
					border-color: #fea800;
				}
				
				.radio-inner {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		
		.method-item-tip {
			border-radius: 16rpx;
			padding: 24rpx;
			background: rgba(255, 246, 229, 1);
			font-weight: 600;
			font-size: 24rpx;
			line-height: 32rpx;
			color: rgba(254, 168, 0, 1);
		}
	}
	
	.pay-popup-button {
		margin-top: 48rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}
}
</style>