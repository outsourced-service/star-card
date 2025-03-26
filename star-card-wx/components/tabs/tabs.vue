<template>
	<!-- 标签列表 -->
	<view class="container" ref="tab">
		<uv-tabs :list="tabList" :current="current" @change="onTabChange" :scrollable="true"
			lineColor="rgba(254, 168, 0, 1)" lineWidth="40rpx" lineHeight="4rpx" :activeStyle="{
				color: 'rgba(0, 0, 0, 0.99)',
				fontWeight: 'bold',
				fontSize: activeTextSize,
				lineHeight: activeTextLineHeight,
				transform: 'scale(1.05)'
			}" :inactiveStyle="{
				color: 'rgba(0, 0, 0, 0.33)',
				fontSize: inactiveTextSize,
				lineHeight: inactiveTextLineHeight,
			}" itemStyle="
				padding-left:20rpx;
				padding-right:20rpx;
				height:62rpx;
				display:flex; 
				flex-direction:column; 
				justify-content:space-between; 
				align-items:center;">

		</uv-tabs>
	</view>
	<!-- 分割线 -->
	<view class="divider"></view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
			}
		},
		props: {
			tabList: {
				type: Object,
				default: () => ({})
			},
			activeTextSize: {
				type: String,
				default: () => ('32rpx')
			},
			activeTextLineHeight: {
				type: String,
				default: () => ('40rpx')
			},
			inactiveTextSize: {
				type: String,
				default: () => ('30rpx')
			},
			inactiveTextLineHeight: {
				type: String,
				default: () => ('40rpx')
			}
		},
		emit:['tabChange'],
		mounted() {
		},
		methods: {
			onTabChange(data) {
				this.current = data.index
				this.$emit("tabChange", data.name)
			}
		}
	}
</script>

<style scoped>
	.container {
		/* padding: 12px 6px; */
		background-color: #fff;
		display: flex;
		justify-content: center;
		padding-bottom: 12rpx;
	}

	/* 分割线 */
	.divider {
		width: 100%;
		height: 2rpx;
		background-color: #F2F3F6;
		margin-top: -18rpx;
	}
</style>