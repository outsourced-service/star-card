<template>
	<view class="order-package-card">
		<view class="package-card-top">
			<view class="card-top-left">订单已生成，请尽快寄出哟~</view>
			<view class="card-top-right" @click="handleBack">修改订单</view>
		</view>
		<view class="package-card-item">
			<view class="card-item-logo">
				<uv-image :src="data.logo_image" width="280rpx" height="56rpx"></uv-image>
			</view>
			<view class="card-item-order">
				<view class="item-order-image">
					<uv-image :src="data.image" width="142rpx" height="180rpx" radius="16rpx"></uv-image>
				</view>
				<view class="item-order-info">
					<view class="order-info-top">
						<view class="info-top-name">{{ data.name }}</view>
						<view class="info-top-size">{{ data.size }} / {{ data.type }}</view>
					</view>
					<view class="order-info-bottom">{{ data.number }}张</view>
				</view>
			</view>
			<view class="card-item-price">
				<view class="item-price-title">预计总价</view>
				<view class="item-price">
					<view class="item-price-unit">￥</view>
					<view class="item-price-num">{{ data.price }}</view>
					<view class="item-price-text" @click="handleOpenDetail">查看明细</view>
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
		components: {
		},
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			}
		},
		data() {
			return {
			}
		},
		emit: ['handleBack', 'handleOpenDetail'],
		methods: {
			handleBack() {
				this.$emit('handleBack')
			},
			handleOpenDetail() {
				this.$emit('handleOpenDetail')
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.order-package-card {
		margin: 24rpx 32rpx 0 32rpx;
	}
	
	.package-card-top {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 32rpx 56rpx 32rpx;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		background: rgba(255, 238, 204, 1);
	}
	
	.card-top-left {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(224, 148, 0, 1);
	}
	
	.card-top-right {
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.package-card-item {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		padding: 20rpx 32rpx;
		border-radius: 32rpx;
		border-width: 2rpx;
		border: 2rpx solid;
		background: linear-gradient(0deg, #FFFFFF, #FFFFFF), radial-gradient(101.13% 58.45% at 10.55% 0%, rgba(236, 60, 52, 0.12) 8%, rgba(236, 60, 52, 0) 66%);
		border-image-source: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.66) 100%);
		box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1);
		margin-top: -38rpx;
	}
	
	.card-item-order {
		display: flex;
		gap: 24rpx;
	}
	
	.item-order-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.order-info-top {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.info-top-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.9);
	}
	
	.info-top-size {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.order-info-bottom {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.card-item-price {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-top: 20rpx;
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
	
	.item-price-title {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.item-price {
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}
	
	.item-price-unit {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.item-price-num {
		font-weight: 600;
		font-size: 40rpx;
		color: rgba(254, 168, 0, 1);
		margin-right: 8rpx;
	}
	
	.item-price-text {
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
</style>