<template>
	<view class="score-detail-page">
		<view class="detail-page-title">详细分数</view>
		<view class="detail-page-item">
			<view class="page-item" v-for="(item, index) in list" :key="index">
				<view class="page-item-title">{{item.name}}</view>
				<view class="page-item-text">{{item.number}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			list: {
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
		emit: [],
		methods: {
		},
		onLoad() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.score-detail-page {
		// margin: 0 80rpx;
		width: calc(100vw - 160rpx);
		padding: 40rpx 32rpx 32rpx 32rpx;
		border-radius: 24rpx;
		// box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.detail-page-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.detail-page-item {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		overflow-y: auto;
		max-height: 926rpx;
	}
	
	.page-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 24rpx;
		border-radius: 8rpx;
		background: rgba(249, 250, 251, 1);
	}
	
	.page-item-title {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-item-text {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
</style>