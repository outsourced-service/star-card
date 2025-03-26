<template>
	<view class="quick-list">
		<view class="quick-list-item" v-for="(item, index) in quickList" :key="index">
			<uv-image :src="item.icon" mode="scaleToFill" width="48rpx" height="48rpx"/>
			<view class="list-item-name">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quickList: [
					{
						name: "我的订单",
						icon: "https://img.picui.cn/free/2025/03/18/67d9960f29ca4.png",
						path: ""
					},
					{
						name: "我的关注",
						icon: "https://img.picui.cn/free/2025/03/18/67d996392d45d.png",
						path: ""
					},
					{
						name: "我的收藏",
						icon: "https://img.picui.cn/free/2025/03/18/67d9964a42488.png",
						path: ""
					}
				]
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.quick-list {
		display: flex;
		padding: 44rpx 22rpx;
		border-radius: 32rpx;
		box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
		background-color: #fff;
	}
	
	.quick-list-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16rpx;
		width: calc(100% / 4);
	}
	
	.list-item-name {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
</style>