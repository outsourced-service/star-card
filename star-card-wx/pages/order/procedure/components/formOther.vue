<template>
	<view class="address-page">
		<view class="address-page-form">
			<view class="page-form-notes" @click="handleNotes">
				<view class="page-form-label">
					<view class="form-label-title">
						备注<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
					</view>
					<view class="form-label-description">
						这里有一段描述
					</view>
				</view>
				<view class="page-form-select">
					<view v-if="formData.notes">{{ formData.notes }}</view>
					<view class="address-page-nonotes" v-else>例：请按标签顺序送评</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx" bold></uv-icon>
				</view>
			</view>
			<view class="page-form-switch">
				<view class="page-form-label">
					<view class="form-label-title">
						上传卡牌照片<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
					</view>
					<view class="form-label-description">
						这里有一段描述
					</view>
				</view>
				<uv-switch v-model="formData.is_img" activeColor="#fea800"></uv-switch>
			</view>
			<view class="page-form-img" v-if="formData.is_img">
				<uv-upload
					:fileList="fileList"
					multiple 
					:maxCount="10"
				></uv-upload>
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
		data() {
			return {
				formData: {
					notes: '',
					img: null,
					is_img: false
				},
				fileList: []
			}
		},
		emit: ['handleNotes'],
		methods: {
			handleNotes() {
				this.$emit('handleNotes')
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
	
	.page-form-notes {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx dashed rgba(209, 209, 214, 1);
		padding-bottom: 40rpx;
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
		align-items: center;
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
	
	.page-form-switch {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 40rpx;
	}
	
	.page-form-img {
		margin-top: 32rpx;
	}
</style>