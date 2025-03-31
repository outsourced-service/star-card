<template>
	<view class="container-page">
		<!-- 标签列表 -->
		<view class="container" ref="tab">
			<uv-tabs :list="tabList" :current="current" @change="onTabChange" :scrollable="true"
				lineColor="rgba(254, 168, 0, 1)" lineWidth="40rpx" lineHeight="4rpx" :activeStyle="{
					color: 'rgba(0, 0, 0, 0.99)',
					fontWeight: 'bold',
					fontSize: '30rpx',
					lineHeight: '40rpx',
				}" :inactiveStyle="{
					color: 'rgba(0, 0, 0, 0.33)',
					fontSize: '30rpx',
					lineHeight: '40rpx'
				}" itemStyle="
					padding-left:18rpx;
					padding-right:18rpx;
					height:60rpx;
					display:flex; 
					flex-direction:column; 
					justify-content:space-between; 
					align-items:center;">
			</uv-tabs>
			<uv-icon name="search" color="rgba(0, 0, 0, 0.44)" size="36rpx" bold style="padding-top: 2rpx;" @click="handleSearch"></uv-icon>
		</view>
		<!-- 分割线 -->
		<view class="divider"></view>
		<!-- 标签卡 -->
		<view class="container-page-tag" ref="tag">
			<view class="page-tag-tabs">
				<uv-tabs :list="currentTagList" :current="currentTagIndex" @change="onTagChange" :scrollable="true"
					 lineWidth="0" lineHeight="0" :activeStyle="{
							color: 'rgba(254, 168, 0, 1)',
							backgroundColor: 'rgba(255, 246, 229, 1)',
							fontWeight: '500',
							padding: '6rpx 22rpx',
							borderRadius: '2000rpx',
							fontSize: '24rpx',
							lineHeight: '32rpx',
							border: '2rpx solid rgba(254, 168, 0, 1)'
						}" :inactiveStyle="{
						color: 'rgba(0, 0, 0, 0.44)',
						fontSize: '24rpx',
						lineHeight: '32rpx',
						backgroundColor: 'rgba(255, 255, 255, 1)',
						borderRadius: '2000rpx',
						padding: '6rpx 22rpx',
						border: '2rpx solid rgba(229, 229, 234, 1)'
					}" itemStyle="padding-left: 8rpx;padding-right:8rpx;height:48rpx; display:flex; flex-direction:column; justify-content:center; align-items:center;">
				</uv-tabs>
			</view>
			<view class="page-tag-right">
				最小优先<uv-icon name="arrow-down" color="rgba(0, 0, 0, 0.44)" size="24rpx" bold></uv-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		tabList
	} from '@/mock/CategoryTagList.js'

	export default {
		data() {
			return {
				current: 0,
				currentTagIndex: 0,
				currentTagList: [],
			}
		},
		props: {
			tabList: {
				type: Object,
				default: () => ({})
			}
		},
		emit: ['tabChange', 'tagChange', 'handleSearch'],
		mounted() {
			this.currentTagList = this.tabList[0].tagList
		},
		methods: {
			onTabChange(data) {
				this.current = data.index
				this.currentTagList = this.tabList[data.index].tagList
				this.currentTagIndex = 0
				this.$emit("tabChange", data.name)
				this.$emit("tagChange", this.tabList[data.index].tagList[0].name)
			},
			onTagChange(data) {
				this.currentTagIndex = data.index
				this.$emit("tagChange", data.name)
			},
			handleSearch() {
				this.$emit("handleSearch")
			}
		}
	}
</script>

<style scoped>
	.container-page {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.04);
		border-top-right-radius: 32rpx;
		border-top-left-radius: 32rpx;
		margin-top: -40rpx;
	}
	
	.container {
		padding: 28rpx 32rpx 20rpx 14rpx;
		background-color: #fff;
		border-top-right-radius: 32rpx;
		border-top-left-radius: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	/* 分割线 */
	.divider {
		width: 100%;
		height: 2rpx;
		background-color: #F2F3F6;
		margin-top: -24rpx
	}
	
	.container-page-tag {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 40rpx;
		padding: 20rpx 32rpx 24rpx 28rpx;
	}
	
	.page-tag-tabs {
		width: calc(100vw - 100rpx - 124rpx);
	}
	
	.page-tag-right {
		display: flex;
		align-items: center;
		color: rgba(0, 0, 0, 0.66);
		font-weight: 600;
		font-size: 24rpx;
		gap: 4rpx;
	}
</style>