<template>
	<view class="card-info-page">
		<view class="info-page-top">
			<view class="page-top-title">卡牌信息</view>
		</view>
		<view class="info-page-item">
			<view class="page-item" v-for="(item, index) in data" :key="index">
				<view class="page-item-card">
					<view class="page-item-data">
						<view class="item-data-title">卡牌编号</view>
						<view class="item-data-text">{{item.card_id || '-'}}</view>
					</view>
					<view class="page-item-data">
						<view class="item-data-title">年份</view>
						<view class="item-data-text">{{item.year || '-'}}</view>
					</view>
					<view class="page-item-data">
						<view class="item-data-title">类型</view>
						<view class="item-data-text">{{item.type || '-'}}</view>
					</view>
				</view>
				<view class="page-item-line" v-if="index != data.length - 1"></view>
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
				default: () => ([{
					card_id: '#PPSID',
					year: '2023',
					type: '球星卡'
				}, {
					card_id: '#PPSID',
					year: '2023',
					type: '球星卡'
				}])
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
	.card-info-page {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.info-page-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-top-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.info-page-item {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
		border-radius: 16rpx;
		padding: 32rpx;
		background: rgba(242, 243, 246, 0.66);
	}
	
	.page-item {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.page-item-card {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.page-item-data {
		display: flex;
		justify-content: space-between;
		
	}
	
	.item-data-title {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.item-data-text {
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-item-line {
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
</style>