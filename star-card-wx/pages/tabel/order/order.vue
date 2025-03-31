<template>
	<view class="width-full height-full" style="background-color: #F6F7F9;">
		<!-- 顶部导航栏 -->
		<navbar title='订单列表' fixed bgColor="#fff"></navbar>
		<!-- 标签页 -->
		<!-- <view class="justify-center">
			<uv-tabs :current='current' :list="tabsList" @click="click" lineWidth="40rpx" lineHeight="4rpx"
				lineColor="#FEA800" itemStyle="height:76rpx;" :activeStyle="activeStyle"
				:inactiveStyle="inactiveStyle" />
		</view> -->
		<!-- 评级 -->
		<view v-if="true" class="flex-1">
			<rating ref="ratingRef"/>
		</view>
		<!-- 底部导航栏 -->
		<tabBar :value='1' />
	</view>
</template>

<script>
	import rating from '@/pages/order/tabsPage/rating/index.vue';
	export default {
		components: {
			rating
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
				name: '交换板',
			}, {
				name: '评级',
			}, {
				name: '代购'
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
		onLoad: function(options) {

		},
		// 下来刷新
		onPullDownRefresh() {
		},
		// 上拉加载
		onReachBottom() {
		},
	}
</script>

<style scoped lang="scss">
</style>