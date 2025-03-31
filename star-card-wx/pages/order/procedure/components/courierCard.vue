<template>
	<view class="address-page">
		<view class="address-page-form">
			<view class="page-form-item-top">
				<view class="form-item-top">
					<view class="page-form-title">
						星卡仓库地址
					</view>
					<uv-button text="一键复制" color="rgba(209, 209, 214, 1)" size="small" :plain="true" shape="circle" :customStyle="{color: 'rgba(0, 0, 0, 0.44)', height: '50rpx'}"></uv-button>
				</view>
				<view class="form-item-input">
					<view class="form-delivery-person">{{ data.name }} {{ data.phone }}</view>
					<view class="item-input-address">{{ data.address }}</view>
				</view>
			</view>
			<view class="page-form-item-top">
				<view class="form-item-top">
					<view class="page-form-label">
						<view class="form-label-title">
							快递公司<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
						</view>
						<view class="form-label-description">
							这里有一段描述
						</view>
					</view>
					<view class="page-form-text">
						{{ data.courier_name }}
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
		methods: {
			handleAdd() {
				this.formData.number++
			},
			handleSubtract() {
				this.formData.number--
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