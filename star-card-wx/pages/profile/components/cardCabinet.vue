<template>
	<view class="custom-card">
		<uni-card spacing="30rpx 24rpx 20rpx 24rpx" padding="12rpx 8rpx" margin="0" :border="false"
			shadow="0rpx 8rpx 40rpx 0rpx rgba(0, 0, 0, 0.05)">
			<template v-slot:title>
				<view class="custom-top">
					<view class="custom-title-top">
						我的卡柜
						<view class="custom-new" v-if="number">
							+{{number}}
						</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="32rpx" :bold="true"></uv-icon>
				</view>
			</template>
			<view class="horizontal-list">
				<view class="list-container">
					<cardModeOne v-for="(item, index) in data" :key="index" :data="item"></cardModeOne>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			number: {
				type: Number,
				required: true,
				default: () => (0),
			}
		},
		data() {
			return {}
		},
		components: {},
		options: {
			styleIsolation: 'shared'
		},
		methods: {},
		mounted() {}
	};
</script>

<style scoped lang="scss">
	.custom-card {

		/* width: 738rpx; */
		/* 369px * 2 */
		// height: 660rpx; /* 330px * 2 */
	}

	.custom-card ::v-deep .uni-card {
		border-radius: 24rpx !important;
		/* 12px * 2 */
		overflow: hidden;
		/* 防止子元素溢出 */
		// height: 660rpx; /* 330px * 2 */
	}

	.custom-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		/* 10px * 2 */
		margin-left: 8rpx;
		align-items: flex-start;
	}

	.custom-title-top {
		display: flex;
		color: #000;
		font-size: 28rpx;
		/* 14px * 2 */
		line-height: 40rpx;
		/* 20px * 2 */
		font-weight: 600;
		align-items: center;
	}

	.custom-new {
		color: rgba(254, 168, 0, 1);
		font-family: PingFang SC;
		font-weight: 600;
		font-size: 22rpx;
		/* 11px * 2 */
		line-height: 26rpx;
		/* 13px * 2 */
		letter-spacing: 0.12rpx;
		/* 0.06px * 2 */
		height: 38rpx;
		/* 19px * 2 */
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2000rpx;
		/* 1000px * 2 */
		padding: 0 16rpx;
		/* 0 8px * 2 */
		background: rgba(255, 238, 204, 1);
		margin-left: 12rpx;
		/* 6px * 2 */
	}

	.horizontal-list {
		overflow-x: auto;
	}

	.list-container {
		display: flex;
		flex-direction: row;
		gap: 12rpx;
		/* 6px * 2 */
	}
</style>