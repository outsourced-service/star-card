<template>
	<view class="function-list">
		<view class="function-list-item" v-for="(item, index) in functionList" :key="index">
			<view class="list-item">
				<view class="list-item-left">
					<uv-image :src="item.icon" mode="scaleToFill" width="48rpx" height="48rpx"/>
					<view class="item-left-name">{{item.name}}</view>
				</view>
				<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="32rpx" :bold="true"></uv-icon>
			</view>
			<uv-line color="rgba(229, 229, 234, 1)" v-if="index != 5"></uv-line>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				functionList: [
					{
						name: "人工客服",
						icon: "https://img.picui.cn/free/2025/03/19/67d9a1954f7cf.png",
						path: ""
					},
					{
						name: "地址管理",
						icon: "https://img.picui.cn/free/2025/03/19/67d9a200e5767.png",
						path: ""
					},
					{
						name: "加入交流群",
						icon: "https://img.picui.cn/free/2025/03/19/67d9a2598b8c0.png",
						path: ""
					},
					{
						name: "卡社认证",
						icon: "https://img.picui.cn/free/2025/03/19/67d9a293bcd9a.png",
						path: ""
					},
					{
						name: "加入我们",
						icon: "https://img.picui.cn/free/2025/03/19/67d9a2a5e488d.png",
						path: ""
					},
					{
						name: "关于我们",
						icon: "https://img.picui.cn/free/2025/03/19/67d9a2eb46b4e.png",
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
	.function-list {
		display: flex;
		flex-direction: column;
		padding: 32rpx 36rpx;
		border-radius: 32rpx;
		box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
		background-color: #fff;
		z-index: 2;
	}
	
	.function-list-item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	
	.list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 32rpx 0;
	}
	
	.list-item-left {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}
	
	.item-left-name {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
</style>