<template>
	<view class="width-full height-full" style="background-color: #F6F7F9;">
		<!-- 顶部导航栏 -->
		<!-- <navbar title='订单列表' fixed bgColor="#fff"></navbar> -->
		<!-- <navbar title='订单列表' fixed bgColor="#fff"></navbar> -->
		<!-- 标签页 -->
		<!-- <view class="justify-center">
			<uv-tabs :current='current' :list="tabsList" @click="click" lineWidth="40rpx" lineHeight="4rpx"
				lineColor="#FEA800" itemStyle="height:76rpx;" :activeStyle="activeStyle"
				:inactiveStyle="inactiveStyle" />
		</view> -->
		<!-- 评级 -->
		<view v-if="true" class="flex-1">
			<rating ref="ratingRef" :data="orderList" @handleStatus="handleStatus"
				@handleEvaluation="handleEvaluation" />
		</view>
		<!-- 底部导航栏 -->
		<tabBar :value='3' />
	</view>
</template>

<script>
	import rating from '@/pages/order/tabsPage/rating/index.vue';
	import order from "@/api/order";
	import orderInfo from "@/api/order";
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
				params: {
					limit: 10,
					offset: 0,
					where: {
						mode: {
							_eq: '送评订单'
						},
						order_info: {
							id: {
								_gt: 0
							}
						}
					}
				},
				paramsInfo: {
					limit: 10,
					offset: 0,
					where: {
						mode: { _eq: '送评订单' },
						order_info: { 
							id:{_gt: 0}
						}
					}
				},
				orderList: [],
				orderTotal: 0,
				status: '未入库',
				evaluation: '全部'
			}
		},
		methods: {
			handleStatus(value) {
				this.status = value;
				this.getOrderListData();
			},
			handleEvaluation(value) {
				this.evaluation = value;
				this.getOrderListData();
			},
			getOrderListData() {
				const evaluationName = this.evaluation === '全部' ? '' : this.evaluation;
				this.params = {
					limit: 10,
					offset: 0,
					where: {
						mode: {
							_eq: '送评订单'
						},
						order_info: {
							id:{_gt: 0}
						}
					},
					evaluationName: evaluationName
				};
				order.getOrderList(this.params).then(res => {
					this.orderList = res;
				});
			},
			getOrderInfoListData() {
				this.paramsInfo = {
					limit: 10,
					offset: 0,
					where: {
						order_order: this.orderList[0].id
					},
				};
				orderInfo.getOrderList(this.params).then(res => {
					this.orderList = res;
				});
			}
		},
		computed: {
			tabsList() {
				return [
					{
						name: '交换板',
					},
					{
						name: '评级',
					},
					{
						name: '代购'
					}
				];
			},
			activeStyle() {
				return {
					fontFamily: 'PingFang SC',
					color: '#000000FC',
					fontWeight: '600',
					lineHeight: '20px',
					fontSize: '32rpx'
				};
			},
			inactiveStyle() {
				return {
					...this.activeStyle,
					fontWeight: '400',
					color: '#00000054',
					fontSize: '30rpx'
				};
			}
		},
		onLoad() {
			this.getOrderListData();
		},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			if (scrollTop > this.$system.BarHeight()) {
				console.log("变更", e);
			} else {
				console.log("还原", e);
			}
		},
	}
</script>

<style scoped lang="scss"></style>