<template>
	<view class="address-page">
		<view class="address-page-info" v-if="data.id">
			<view class="page-info-left" @click="handleAddressEidt">
				<view class="info-left-top">
					<view class="left-top-name">
						{{data.consignee}}
					</view>
					<view class="left-top-phone">
						{{data.phone}}
					</view>
					<view class="left-top-tag" v-if="is_default">
						默认
					</view>
				</view>
				<view class="info-left-address">
					{{data.province}}{{data.city}}{{data.area}}{{data.address_detail}}{{data.house}}
				</view>
			</view>
			<view class="page-info-right">
				<view class="info-right-button" @click="handleAddress">
					地址簿
				</view>
			</view>
		</view>
		<view class="address-page-nodata" @click="handleAddress" v-else>选择地址</view>
		<view class="address-page-tips">订单完成后默认顺丰到付寄回该地址，地址后续可更改</view>
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
			},
			is_default: {
				type: Object,
				required: true,
				default: () => (false),
			}
		},
		data() {
			return {
				
			}
		},
		emit: ['handleAddress', 'handleAddressEidt'],
		methods: {
			handleAddress() {
				this.$emit('handleAddress')
			},
			handleAddressEidt() {
				this.$emit('handleAddressEidt')
			}
		},
		mounted() {
		}
	}
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
	
	.address-page-info {
		display: flex;
		justify-content: space-between;
		
	}
	
	.page-info-left {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		max-width: 500rpx;
		padding-right: 20rpx;
	}
	
	.info-left-top {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}
	
	.left-top-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.left-top-phone {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.left-top-tag {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6rpx;
		padding: 6rpx 20rpx;
		border-radius: 2000rpx;
		background: rgba(0, 0, 0, 0.03);
		font-weight: 400;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
		margin-left: 4rpx;
	}
	
	.info-left-address {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-info-right {
		display: flex;
		align-items: center;
	}
	
	.info-right-button {
		font-weight: 600;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.99);
		padding-left: 24rpx;
		border-left: 2rpx solid rgba(209, 209, 214, 1);
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