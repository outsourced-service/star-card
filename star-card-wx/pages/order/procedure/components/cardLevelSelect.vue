<template>
	<view class="card-level-select">
		<view class="level-select-left">
			<view class="select-left-top">
				<view class="left-top-name">{{ data.name }}</view>
				<view class="left-top-price">{{ data.price }}元/张</view>
			</view>
			<view class="select-left-bottom">
				<view>卡价上限：{{ data.card_price_limit }}元/张</view>
				<view>官方评分时长：{{ data.card_often }}</view>
				<view>特殊限制：{{ data.card_special_restrictions }}</view>
				<view>预估总时效：{{ data.estimated_time_frame }}</view>
			</view>
		</view>
		<view class="level-select-right">
			<view class="select-right-top">{{ data.label_name }}</view>
			<view class="select-right-icon">
				<uv-icon name="checkmark-circle-fill" color="#fea800" size="40rpx"></uv-icon>
			</view>
			<view class="select-right-bottom"></view>
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
			}
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.card-level-select {
		border: 2rpx solid rgba(254, 168, 0, 1);
		background: rgba(255, 246, 229, 1);
		border-radius: 16rpx;
		border-width: 2rpx;
		padding: 24rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.level-select-left {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.select-left-top {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}
	
	.left-top-name {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.left-top-price {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.select-left-bottom {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.level-select-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: end;
	}
	
	.select-right-top {
		background-color: rgba(254, 168, 0, 0.2);
		width: 82;
		height: 19;
		gap: 6rpx;
		padding: 6rpx 20rpx;
		border-radius: 1000px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		font-size: 22rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.select-right-icon {
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}
	
	.select-right-bottom {
		height: 42rpx;
	}
</style>