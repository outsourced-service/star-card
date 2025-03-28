<template>
	<view class="address-page">
		<view class="address-page-form">
			<view class="page-form-item-top">
				<view class="form-item-top" @click="handlePopup('submissionReview')">
					<view class="page-form-label">
						<view class="form-label-title">
							送评档位<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
						</view>
						<view class="form-label-description">
							这里有一段描述
						</view>
					</view>
					<view class="page-form-select">
						<view class="form-select-text" v-if="!formData.evaluation_insurance_id">请选择</view>
						<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx" bold></uv-icon>
					</view>
				</view>
				<view v-if="formData.evaluation_insurance_id">
					<cardLevelSelect :data="submissionReviewData"></cardLevelSelect>
				</view>
			</view>
			<view class="page-form-item" v-if="data.showSignature" @click="handlePopup('signatureReview')">
				<view class="page-form-label">
					<view class="form-label-title">
						签字选项<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
					</view>
					<view class="form-label-description">
						这里有一段描述
					</view>
				</view>
				<view class="page-form-select">
					<view class="address-page-signature" v-if="formData.signature_id">
						<view class="form-signature">{{ formData.signature }}</view>
						<view class="form-signature-num" v-if="formData.signatureNum">+{{ formData.signatureNum }}元/张</view>
					</view>
					<view class="address-page-nonotes" v-else>请选择</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx" bold></uv-icon>
				</view>
			</view>
			<view class="page-form-item" v-if="data.showSize" @click="handlePopup('sizeReview')">
				<view class="page-form-label">
					<view class="form-label-title">
						尺寸选项<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
					</view>
					<view class="form-label-description">
						目前仅支持常规尺寸
					</view>
				</view>
				<view class="page-form-select">
					<!-- <view v-if="formData.notes">{{ formData.size }}</view> -->
					<view class="address-page-signature" v-if="formData.size_id">
						<view class="form-signature">{{ formData.size }}</view>
						<view class="form-signature-num" v-if="formData.sizeNum">+{{ formData.sizeNum }}元/张</view>
					</view>
					<view class="address-page-nonotes" v-else>请选择</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="28rpx" bold></uv-icon>
				</view>
			</view>
			<view class="page-form-item-end">
				<view class="page-form-label">
					<view class="form-label-title">
						送评张数
						<view class="label-title-tip">多送优惠</view>
					</view>
					<view class="form-label-description">
						满15张98折, 满50张95折
					</view>
				</view>
				<view class="page-form-number">
					<uv-image src="https://img.picui.cn/free/2025/03/25/67e1b8096217f.png" width="40rpx" height="40rpx" @click="handleSubtract"></uv-image>
					<view class="form-number-input">
						<uv-input placeholder="" border="surround" v-model="formData.number" inputAlign="center" type="number" @change="changeInput" @input="changeInput" @blur="changeInput"></uv-input>
					</view>
					<uv-image src="https://img.picui.cn/free/2025/03/25/67e1b85d88652.png" width="40rpx" height="40rpx" @click="handleAdd"></uv-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cardLevelSelect from './cardLevelSelect.vue';
	import formPopup from './popup.vue';
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
			cardLevelSelect,
			formPopup
		},
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			formData: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			submissionReviewData: {
				type: Object,
				required: true,
				default: () => ({}),
			}
		},
		data() {
			return {
				fileList: []
			}
		},
		emit: ['handlePopup', 'changeNumber'],
		methods: {
			handleAdd() {
				this.formData.number++
				this.$emit('changeNumber')
			},
			handleSubtract() {
				this.formData.number--
				if(this.formData.number < 0) {
					this.formData.number = 0
				}
				this.$emit('changeNumber')
			},
			handlePopup(value) {
				this.$emit('handlePopup', value)
			},
			changeInput() {
				if(this.formData.number < 0) {
					this.formData.number = 0
				}
				if (this.formData.number) {
					this.formData.number = String(Number(this.formData.number))
				}
				this.$emit('changeNumber')
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
	
	.page-form-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx dashed rgba(209, 209, 214, 1);
		padding-bottom: 40rpx;
		margin-bottom: 40rpx;
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
	
	.page-form-select {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
	}
	
	.address-page-nonotes {
		display: flex;
		justify-content: end;
		align-items: center;
		width: 100%;
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.form-select-text {
		display: flex;
		justify-content: end;
		align-items: center;
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.page-form-item-end {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.label-title-tip {
		display: flex;
		align-items: center;
		padding: 6rpx 12rpx;
		gap: 6rpx;
		border-radius: 1000rpx;
		border: 1px solid var(--Color, rgba(255, 59, 48, 1));
		font-weight: 400;
		font-size: 20rpx;
		color: rgba(255, 59, 48, 1);
	}
	
	.page-form-number {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}
	
	.form-number-input {
		width: 124rpx;
		height: 72rpx;
	}
	
	.address-page-signature {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.form-signature {
		color: rgba(0, 0, 0, 0.99);
		font-weight: 600;
		font-size: 28rpx;
	}
	
	.form-signature-num {
		color: rgba(254, 168, 0, 1);
		font-weight: 400;
		font-size: 26rpx;
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
	
	.popup-page {
		padding: 32rpx;
	}
</style>