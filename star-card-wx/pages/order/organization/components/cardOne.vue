<template>
	<view class="page-card-one">
		<view class="card-one-top">
			<view class="one-top-left">
				<view class="top-left-title">{{data.title}}</view>
				<view class="top-left-tip">{{data.tip}}</view>
			</view>
			<uv-icon name="arrow-right" color="rgba(36, 36, 36, 1)" size="32rpx" bold></uv-icon>
		</view>
		<view class="card-one-bottom">
			<view class="one-bottom-day">
				<uv-icon name="clock" color="rgba(255, 255, 255, 0.99)" size="32rpx"></uv-icon>
				还有
				<view class="bottom-day-num">
					{{ calculateDaysDifference(data.end_data, Date.now())}}天
				</view>
				截单
			</view>
			<view class="one-bottom-data">截止日：{{ timestampToDateString(data.end_data) }}</view>
		</view>
	</view>
</template>

<script>
import { timestampToDateString, calculateDaysDifference } from '../../getData';
export default {
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
	options: {
		styleIsolation: 'shared'
	},
	methods: {
		timestampToDateString,
		calculateDaysDifference
	},
	mounted() {
		this.timestampToDateString()
		this.calculateDaysDifference()
	}
};
</script>

<style lang="scss" scoped>
	.page-card-one {
		display: flex;
		flex-direction: column;
		background-color: #feb11d;
		border-radius: 40rpx;
		box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1);
		padding: 32rpx;
		gap: 24rpx;
	}
	
	.card-one-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.one-top-left {
		display: flex;
		gap: 8rpx;
	}
	
	.top-left-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(255, 255, 255, 0.99);
	}
	
	.top-left-tip {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
		background-color: rgba(255, 255, 255, 0.77);
		padding: 6rpx 20rpx;
		gap: 6rpx;
		border-radius: 1000rpx;
	}
	
	.card-one-bottom {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}
	
	.one-bottom-day {
		display: flex;
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.99);
		gap: 4rpx;
	}
	
	.bottom-day-num {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.99);
	}
	
	.one-bottom-data {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.77);
	}
</style>