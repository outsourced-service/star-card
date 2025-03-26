<template>
	<!-- 标签列表 -->
	<view class="container" ref="tab">
		<uv-tabs :list="tabList" :current="current" @change="onTabChange" :scrollable="true"
			lineColor="rgba(254, 168, 0, 1)" lineWidth="20px" lineHeight="2px" :activeStyle="{
				color: 'rgba(0, 0, 0, 0.99)',
				fontWeight: 'bold',
				fontSize: '15px',
				lineHeight: '20px',
				transform: 'scale(1.05)'
			}" :inactiveStyle="{
				color: 'rgba(0, 0, 0, 0.33)',
				fontSize: '14px',
			}" itemStyle="
				padding-left:10px;
				padding-right:10px;
				height:31px;
				display:flex; 
				flex-direction:column; 
				justify-content:space-between; 
				align-items:center;">

		</uv-tabs>
	</view>
	<!-- 分割线 -->
	<view class="divider"></view>

	<!-- 标签卡 -->
	<view class="container" ref="tag" style="padding-left: 10px;">
		<uv-tabs :list="currentTagList" :current="currentTagIndex" @change="onTagChange" :scrollable="true"
			 lineWidth="0px" lineHeight="0px" :activeStyle="{
					color: '#FFFFFF',
					backgroundColor: 'rgba(0, 0, 0, 0.99)',
					fontWeight: 'bold',
					padding: '2px 8px',
					borderRadius: '4px',
					fontSize: '12px',
					lineHeight: '20px',
					transform: 'scale(1.05)'
				}" :inactiveStyle="{
				color: 'rgba(0, 0, 0, 0.99)',
				fontSize: '12px',
				lineHeight: '20px',
				backgroundColor: '#F2F3F6',
				borderRadius: '4px',
				padding: '2px 8px',
			}" itemStyle="padding-left: 4px;padding-right:4px;height:24px; display:flex; flex-direction:column; justify-content:center; align-items:center;">

		</uv-tabs>
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
		emit: ['tabChange', 'tagChange'],
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
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 12px 6px;
		background-color: #fff;
	}

	/* 分割线 */
	.divider {
		width: 100%;
		height: 1px;
		background-color: #F2F3F6;
		margin-top: -15px
	}
</style>