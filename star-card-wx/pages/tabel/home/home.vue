<template>
	<view class="width-full height-full" style="background-color: #F6F7F9;">
		<!-- 顶部导航栏 -->
		<navbar title='主页' fixed bgColor="#fff"></navbar>
		<!-- 标签页 -->
		<!-- <view class="justify-center">
			<uv-tabs :current='current' :list="tabsList" @click="click" lineWidth="40rpx" lineHeight="4rpx"
				lineColor="#FEA800" itemStyle="height:76rpx;" :activeStyle="activeStyle"
				:inactiveStyle="inactiveStyle" />
		</view> -->
		<!-- 页面1 -->
		<view v-if="false" class="flex-1">

		</view>
		<!-- 页面2 -->
		<view v-if="true" class="flex-1">
			<recommendation ref="recommendationRef" />
		</view>
		<!-- 页面3 -->
		<view v-if="false" class="flex-1">

		</view>
		<!-- 底部导航栏 -->
		<tabBar value='主页' />
	</view>
</template>

<script>
import recommendation from '@/pages/home/tabsPage/recommendation/index.vue';

import { getEnumTypes, getEnumValues, searchEnumValues } from '@/api/gloabal/getEnum';

export default {
	components: {
		recommendation
	},
	componentPlaceholder: {},
	options: {
		styleIsolation: 'shared'
	},
	data() {
		return {
			current: 1,
		}
	},
	methods: {},
	computed: {
		tabsList: () => [{
			name: '关注',
		}, {
			name: '推荐',
		}, {
			name: '附近'
		}],
		activeStyle: () => ({
			fontFamily: 'PingFang SC',
			color: '#000000FC',
			fontWeight: '600',
			lineHeight: '20px',
			fontSize: '32rpx'
		}),
		inactiveStyle() {
			return {
				...this.activeStyle,
				fontWeight: '400',
				color: '##00000054',
				fontSize: '30rpx',
			}
		}
	},
	onLoad: function (options) {
	},
	onShow: function () {
		getEnumValues("类别").then(res => {
			console.log(res);
		})
	},
	// 下来刷新
	onPullDownRefresh() {
		this.$refs.recommendationRef.pullDownRefresh()
	},
	// 上拉加载
	onReachBottom() {
		this.$refs.recommendationRef.reachBottom()
	},
}
</script>

<style scoped lang="scss"></style>