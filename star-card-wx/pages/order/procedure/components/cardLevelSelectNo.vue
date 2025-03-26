<template>
	<view class="card-level-select" @click="handleSubmissionReview">
		<view class="level-select-left">
			<view class="select-left-top">
				<view class="left-top-name">{{ data.name }}</view>
				<view class="left-top-price">{{ data.price }}元/张</view>
			</view>
			<view class="select-left-bottom">
				<view v-if="data.card_price_limit">卡价上限：{{ data.card_price_limit }}元/张</view>
				<view v-else>卡价上限：-</view>
				<view>官方评分时长：{{ data.card_often || '-' }}</view>
				<view>特殊限制：{{ data.card_special_restrictions || '-' }}</view>
				<view>预估总时效：{{ data.estimated_time_frame || '-' }}</view>
			</view>
		</view>
		<view class="level-select-right">
			<view class="select-right-top" v-if="data.label_name">{{ data.label_name }}</view>
			<view class="select-right-bottom" v-else></view>
			<view class="circle-ring"></view>
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
		emit: ['handleSubmissionReview'],
		methods: {
			handleSubmissionReview() {
				this.$emit('handleSubmissionReview')
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.card-level-select {
		border: 2rpx solid rgba(242, 243, 246, 1);
		background: #fff;
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
		color: rgba(0, 0, 0, 0.33);
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.level-select-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.select-right-top {
		background-color: rgba(0, 0, 0, 0.03);
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
		color: rgba(0, 0, 0, 0.33);
	}
	
	.select-right-bottom {
		height: 42rpx;
	}
	
	.circle-ring {
	    width: 40rpx;       /* 圆环的宽度 */
	    height: 40rpx;      /* 圆环的高度 */
	    border: 2rpx solid #d1d1d6; /* 圆环的边框 */
	    border-radius: 50%;  /* 圆环的圆角半径为宽度和高度的50% */
	    background: transparent; /* 背景透明 */
	}
</style>