<template>
	<view class="container-page" :style="!is_select ? 'box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.04);' : ''">
		<!-- 标签列表 -->
		<view class="container-page-tab" ref="tab">
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
			<uv-icon name="search" color="rgba(0, 0, 0, 0.44)" size="40rpx" style="padding-top: 2rpx;"
				@click="handleSearch"></uv-icon>
		</view>
		<!-- 分割线 -->
		<view class="divider"></view>
		<!-- 标签卡 -->
		<view class="container-page-tag" ref="tag">
			<view class="page-tag-tabs">
				<uv-tabs :list="currentTagList" :current="currentTagIndex" @change="onTagChange" :scrollable="true"
					lineWidth="0" lineHeight="0" :activeStyle="{
							color: 'rgba(0, 0, 0, 0.99)',
							fontWeight: '600',
							fontSize: '26rpx',
							lineHeight: '40rpx'
						}" :inactiveStyle="{
						color: 'rgba(0, 0, 0, 0.33)',
						fontSize: '26rpx',
						lineHeight: '40rpx',
					}" itemStyle="padding-left: 8rpx;padding-right:32rpx;height:48rpx; display:flex; flex-direction:column; justify-content:center; align-items:center;">
				</uv-tabs>
			</view>
			<view class="page-tag-right">
				<view class="tag-right-item" @click="handleShowSelect">
					{{selectText}}
					<uv-icon name="arrow-down" color="rgba(0, 0, 0, 0.44)" size="24rpx" bold v-if="!is_select"></uv-icon>
					<uv-icon name="arrow-up" color="rgba(0, 0, 0, 0.44)" size="24rpx" bold v-else></uv-icon>
				</view>
				<view class="tag-right-item" @click="handleShowFilter">
					<uv-icon name="setting" color="rgba(0, 0, 0, 0.44)" size="24rpx" bold></uv-icon>筛选
				</view>
			</view>
		</view>
		<view class="container-page-select" v-if="is_select">
			<view class="page-select-item" v-for="(item, index) in selectList" :key="index" @click="handleSelect(item)">{{item}}</view>
		</view>
	</view>
	<!-- 遮罩层 -->
	<view class="mask-layer" v-if="is_select" @click="handleShowSelect"></view>
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
				selectList: ['新品优先', '匹配优先', '匹配优先（任意版本）', '价格从低到高', '价格从高到低'],
				is_select: false,
				selectText: '新品优先'
			}
		},
		props: {
			tabList: {
				type: Object,
				default: () => ({})
			}
		},
		emit: ['tabChange', 'tagChange', 'handleSearch', 'handleShowFilter'],
		mounted() {
			this.currentTagList = this.tabList[0].tagList
		},
		methods: {
			handleShowFilter() {
				this.$emit('handleShowFilter')
			},
			handleSelect(value) {
				this.selectText = value;
				this.is_select = false;
			},
			handleShowSelect() {
				this.is_select = !this.is_select;
			},
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
		border-top-right-radius: 32rpx;
		border-top-left-radius: 32rpx;
		position: relative;
		z-index: 1001;
	}

	.container-page-tab {
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
		/* width: calc(100vw - 100rpx - 124rpx); */
	}

	.page-tag-right {
		display: flex;
		align-items: center;
		gap: 32rpx;
	}
	
	.tag-right-item {
		display: flex;
		align-items: center;
		gap: 4rpx;
		color: rgba(0, 0, 0, 0.66);
		font-weight: 600;
		font-size: 24rpx;
	}
	
	.container-page-select {
		display: flex;
		flex-direction: column;
		gap: 56rpx;
		padding: 40rpx 48rpx 64rpx 48rpx;
		position: absolute;
		background-color: #fff;
		top: calc(100% - 24rpx);
		width: 100%;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}
	
	.page-select-item {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	/* 遮罩层样式 */
	.mask-layer {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, 0.5);
	  z-index: 1000;
	}
</style>