<template>
	<view class="page-card-two" @click="handleCard()">
		<uni-card spacing="0" padding="0 0 32rpx 0" margin="0 0 16rpx 0" :border="false" shadow="0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1)">
			<template v-slot:cover>
			  <uv-image lazyLoad :src="data.bg_image" width="calc((100vw - 80rpx) / 2)" height="200rpx"></uv-image>
			</template>
			<view class="card-two-info">
				<view class="two-info-top">
					<view class="info-top-title">
						{{ data.title }}
						<uv-icon name="arrow-right" color="rgba(36, 36, 36, 1)" size="28rpx" bold></uv-icon>
					</view>
					<view class="info-top-tip">
						<view class="top-tip">
							{{ data.tip }}
						</view>
					</view>
				</view>
				<view class="two-info-bottom">
					<view class="info-bottom-day">
						<uv-icon name="clock" color="rgba(0, 0, 0, 0.33)" size="32rpx"></uv-icon>
						还有	{{ calculateDaysDifference(data.end_data, Date.now())}}天截单
					</view>
					<view class="info-bottom-data">截止日：{{ timestampToDateString(data.end_data) }}</view>
				</view>
			</view>
		</uni-card>
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
	emit: ['handleCard'],
	methods: {
		timestampToDateString,
		calculateDaysDifference,
		handleCard() {
			this.$emit('handleCard')
		}
	},
	mounted() {
		this.timestampToDateString()
		this.calculateDaysDifference()
	}
};
</script>

<style lang="scss" scoped>
	.page-card-two {
		width: calc((100vw - 80rpx) / 2);
	}
	
	.page-card-two ::v-deep .uni-card {
	  border-radius: 32rpx !important; /* 8px * 2 */
	  overflow: hidden; /* 防止子元素溢出 */
	  // height: 620rpx; 
	}
	
	.card-two-info {
		display: flex;
		flex-direction: column;
		margin-top: 24rpx;
		padding: 0 24rpx;
		gap: 32rpx;
	}
	
	.two-info-top {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}
	
	.info-top-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: rgba(0, 0, 0, 0.99);
		font-weight: 600;
		font-size: 32rpx;
	}
	
	.info-top-tip {
		background: rgba(0, 0, 0, 0.05);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 6rpx 20rpx;
		border-radius: 1000rpx;
		gap: 6rpx;
		max-width: 160rpx;
	}
	
	.top-tip {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.two-info-bottom {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}
	
	.info-bottom-day {
		display: flex;
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.66);
		gap: 4rpx;
	}
	
	.info-bottom-data {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.33);
	}
</style>