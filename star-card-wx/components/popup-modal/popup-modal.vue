<template>
	<view class="custom-modal">
		<view class="modal-content">
			<view class="modal-content-top">
				<view class="modal-title">{{title}}</view>
				<view class="modal-message">{{message}}</view>
			</view>
			<view class="modal-buttons">
				<view class="modal-button cancel" @click="cancelDelete">{{leftText}}</view>
				<view class="modal-button delete" @click="confirmDelete">{{rightText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup-modal",
		props: {
			title: {
				type: String,
				default: () => ('')
			},
			message: {
				type: String,
				default: () => ('')
			},
			leftText: {
				type: String,
				default: () => ('取消')
			},
			rightText: {
				type: String,
				default: () => ('删除')
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		emit: ['cancelDelete', 'confirmDelete'],
		methods: {
			cancelDelete() {
				this.$emit('cancelDelete')
			},
			confirmDelete() {
				this.$emit('confirmDelete')
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 自定义弹窗样式 */
	.custom-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}
	
	.modal-content {
		margin: 0 112rpx;
		border-radius: 32rpx;
		background-color: white;
		padding: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.modal-content-top {
		padding: 16rpx 8rpx 40rpx 8rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24rpx;
	}
	
	.modal-title {
		font-weight: 600;
		font-size: 32rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.modal-message {
		font-size: 26rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.modal-buttons {
		display: flex;
		justify-content: space-between;
	}
	
	.modal-button {
		width: 45%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40rpx;
		font-size: 30rpx;
	}
	
	.modal-button.cancel {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2rpx solid white;
		width: 237rpx;
		height: 84rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		color: rgba(0, 0, 0, 0.44);
		font-weight: 600;
		font-size: 28rpx;
	}
	
	.modal-button.delete {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(245, 63, 63, 1);
		border: 2rpx solid rgba(245, 63, 63, 1);
		width: 237rpx;
		height: 84rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		color: white;
		font-weight: 600;
		font-size: 28rpx;
	}
</style>