<template>
	<view class="info-rating-page">
		<view class="rating-page-top">
			<view class="page-top-title">评级信息</view>
			<view class="page-top-detail" @click="handleOpenScore">详细分数</view>
		</view>
		<view class="rating-page-item">
			<view class="page-item">
				<view class="page-item-title">卡品</view>
				<view class="page-item-data">{{data.card_quality || '-'}}</view>
			</view>
			<view class="page-item">
				<view class="page-item-title">签字</view>
				<view class="page-item-data">{{data.sign || '-'}}</view>
			</view>
			<view class="page-item">
				<view class="page-item-title">当前评分存世量<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon></view>
				<view class="page-item-data">{{data.now_number}}</view>
			</view>
			<view class="page-item">
				<view class="page-item-title">更高评分存世量<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon></view>
				<view class="page-item-data">{{data.height_number}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
		},
		data() {
			return {
			}
		},
		emit: ['handleOpenScore'],
		methods: {
			handleOpenScore() {
				this.$emit('handleOpenScore')
			}
		},
		onLoad() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.info-rating-page {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.rating-page-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-top-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.page-top-detail {
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.rating-page-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		box-sizing: border-box;
		gap: 16rpx;
	}
	
	.page-item {
		width: calc(50% - 8rpx);
		// width: 50%;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		border-radius: 8rpx;
		padding: 24rpx;
		background: rgba(242, 243, 246, 0.44);
	}
	
	.page-item-title {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.44);
		display: flex;
		gap: 4rpx;
	}
	
	.page-item-data {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(254, 168, 0, 1);
	}
</style>