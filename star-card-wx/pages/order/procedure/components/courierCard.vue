<template>
	<view class="address-page">
		<view class="address-page-form">
			<view class="page-form-item-top">
				<view class="form-item-top">
					<view class="page-form-title">
						星卡仓库地址
					</view>
					<uv-button text="一键复制" color="rgba(209, 209, 214, 1)" size="small" :plain="true" shape="circle" :customStyle="{color: 'rgba(0, 0, 0, 0.44)', height: '50rpx'}" @click="handleCopy"></uv-button>
				</view>
				<view class="form-item-input">
					<view class="form-delivery-person">{{ data.addressData.consignee }} {{ data.addressData.phone }}</view>
					<view class="item-input-address">{{data.addressData.province}}{{data.addressData.city}}{{data.addressData.area}}{{data.addressData.address_detail}}{{data.addressData.house}}</view>
				</view>
			</view>
			<view class="page-form-item-top">
				<view class="form-item-top" @click="handleCourier">
					<view class="page-form-label">
						<view class="form-label-title">
							快递公司<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
						</view>
						<view class="form-label-description">
							这里有一段描述
						</view>
					</view>
					<view class="page-form-text">
						{{ data.courier }}
						<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx" bold></uv-icon>
					</view>
				</view>
			</view>
			<view class="page-form-item-end">
				<view class="form-item-top">
					<view class="page-form-label">
						<view class="form-label-title">
							签字选项<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
						</view>
						<view class="form-label-description">
							这里有一段描述
						</view>
					</view>
				</view>
				<view class="form-item-input">
					<uv-input placeholder="请输入完整快递单号" border="surround" v-model="formData.insurance" @change="change" type="number"></uv-input>
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
			},
			addressData: {
				type: Object,
				required: true,
				default: () => ({}),
			}
		},
		data() {
			return {
				formData: {
					insurance: '',
				},
				fileList: []
			}
		},
		emit: ['handleCourier'],
		methods: {
			handleCourier() {
				this.$emit('handleCourier')
			},
			handleCopy() {
				const address = `${this.data.addressData.province}${this.data.addressData.city}${this.data.addressData.area}${this.data.addressData.address_detail}${this.data.addressData.house}`
				uni.setClipboardData({
					data: address,
					success: () => {
						uni.showToast({
							title: '地址已复制',
							icon: 'success',
							duration: 2000
						})
					},
					fail: () => {
						uni.showToast({
							title: '复制失败',
							icon: 'error',
							duration: 2000
						})
					}
				})
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
		padding: 40rpx 32rpx;
		gap: 40rpx;
	}
	
	.address-page-form {
		display: flex;
		flex-direction: column;
	}
	
	.page-form-label {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.form-label-title {
		display: flex;
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		gap: 4rpx;
	}
	
	.form-label-description {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.page-form-text {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}
	
	.page-form-item-end {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
	
	.page-form-item-top {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
		border-bottom: 2rpx dashed rgba(209, 209, 214, 1);
		padding-bottom: 40rpx;
		margin-bottom: 40rpx;
	}
	
	.form-item-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.page-form-title {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.form-item-input {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.form-delivery-person {
		display: flex;
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.item-input-address {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.item-input {
		display: flex;
		justify-content: space-between;
		border: 2rpx solid rgba(0, 0, 0, 0.1);
		border-radius: 16rpx;
		border-width: 2rpx;
		padding: 32rpx;
	}
	
	.item-input-data {
		display: flex;
		gap: 8rpx;
	}
	
	.item-input-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.item-input-price {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.form-item-tip {
		display: flex;
		align-items: baseline;
		justify-content: end;
		gap: 8rpx;
	}
	
	.icon-rotate-180 {
	  transform: rotate(180deg);
	}
	
	.item-tip-text {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.item-tip-num {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.item-tip {
		color: rgba(0, 0, 0, 0.99);
		font-weight: 400;
		font-size: 26rpx;
	}
</style>