<template>
	<view class="address-page">
		<view class="address-page-form">
			<view class="page-form-item-top">
				<view class="form-item-top">
					<view class="page-form-label">
						<view class="form-label-title">
							为订单追加投保<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
						</view>
						<view class="form-label-description">
							比例20:1，单卡保额默认为保价总额/张数
						</view>
					</view>
					<uv-switch v-model="formData.is_insurance" activeColor="#fea800"></uv-switch>
				</view>
				<view class="form-item-input" v-if="formData.is_insurance">
					<uv-input placeholder="" border="surround" v-model="formData.insurance" @change="change" type="number">
						<template v-slot:suffix>
							元
						</template>
					</uv-input>
					<view class="form-item-tip">
						<uv-icon name="info-circle" color="rgba(0, 0, 0, 0.33)" size="32rpx" bold class="icon-rotate-180"></uv-icon>
						<view class="item-tip-text">需额外支付</view>
						<view class="item-tip-num">220</view>
						<view class="item-tip">元</view>
					</view>
				</view>
			</view>
			<view class="page-form-item-end">
				<view class="form-item-top">
					<view class="page-form-label">
						<view class="form-label-title">
							验品服务<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
						</view>
						<view class="form-label-description">
							这里有一段描述
						</view>
					</view>
					<uv-switch v-model="formData.is_service" activeColor="#fea800"></uv-switch>
				</view>
				<view class="form-item-input" v-if="formData.is_service">
					<view class="item-input" @click="handleService">
						<view class="item-input-data">
							<view class="item-input-name">{{ data.service }}</view>
							<view class="item-input-price" v-if="data.serviceNum">+{{ data.serviceNum }}元/张</view>
						</view>
						<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx"></uv-icon>
					</view>
					<view class="form-item-tip">
						<uv-icon name="info-circle" color="rgba(0, 0, 0, 0.33)" size="32rpx" bold class="icon-rotate-180"></uv-icon>
						<view class="item-tip-text">需额外支付</view>
						<view class="item-tip-num">105</view>
						<view class="item-tip">元</view>
					</view>
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
				formData: {
					is_insurance: false,
					insurance: 0,
					is_service: false,
					service: '一对一验品',
					servicePrice: 50
				},
				fileList: []
			}
		},
		emit: ['handleService'],
		methods: {
			handleService() {
				this.$emit('handleService')
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
	
	.form-item-input {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
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
		justify-content: flex-end;
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