<template>
	<view class="oder-list-page width-full height-full" style="background: linear-gradient(180deg, #FEA800 -9.82%, #FFEECC 21.04%);">
		<!-- 顶部导航栏 -->
		<navbar title='订单列表' fixed :bgColor="bgColor"></navbar>
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
				@handleEvaluation="handleEvaluation" :openCollapse="openCollapse" :is_stickyBg="is_stickyBg"/>
		</view>
		<!-- 底部导航栏 -->
		<tabBar value='订单' />
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
					}
				},
				orderList: [],
				orderTotal: 0,
				status: '未入库',
				evaluation: '全部',
				openCollapse: [],
				is_stickyBg: false,
				bgColor: 'rgba(0,0,0,0)'
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
							id: {_gt: 0}
						}
					},
					evaluationName: evaluationName
				};
				order.getOrderList(this.params).then(res => {
					this.orderList = [...this.orderList, ...res];
					this.paramsInfo = {
						limit: 10,
						offset: 0,
						where: {
							order_order: { _eq: res[0]?.id }
						},
					};
					this.getOrderInfoListData();
				});
			},
			getOrderInfoListData() {
				orderInfo.getOrderInfoList(this.paramsInfo).then(res => {
					// 找到 id 为 1 的对象并添加 order_info 字段
					for (let i = 0; i < this.orderList.length; i++) {
					  if (this.orderList[i].id == this.orderList[0]?.id) {
					    // 如果对象中没有 order_info 字段，则创建一个空数组
					    if (!this.orderList[i].hasOwnProperty('order_info')) {
					      this.orderList[i].order_info = [];
					    }
					    // 将 res 添加到 order_info 数组中
					    this.orderList[i].order_info = [...this.orderList[i].order_info, ...res];
					    break; // 找到后退出循环
					  }
					}
					this.openCollapse = [this.orderList[0].id]
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
			this.orderList = []
			this.getOrderListData();
		},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			if (scrollTop > this.$system.BarHeight()) {
				this.is_stickyBg = true
			} else {
				this.is_stickyBg = false
			}
			if(scrollTop) {
				this.bgColor = '#fff'
			} else {
				this.bgColor = 'rgba(0,0,0,0)'
			}
		}
	}
</script>

<style scoped lang="scss">
	.oder-list-page {
		::v-deep .uv-tabbar {
			background-color: #f6f7f9;
		}
	}
</style><template>
	<view class="oder-list-page width-full height-full" style="background: linear-gradient(180deg, #FEA800 -9.82%, #FFEECC 21.04%);">
		<!-- 顶部导航栏 -->
		<navbar title='订单列表' fixed :bgColor="bgColor"></navbar>
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
				@handleEvaluation="handleEvaluation" :openCollapse="openCollapse" :is_stickyBg="is_stickyBg"/>
		</view>
		<!-- 底部导航栏 -->
		<!-- <tabBar :value='3' /> -->
		<tabBar :value='1' />
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
					}
				},
				orderList: [],
				orderTotal: 0,
				status: '未入库',
				evaluation: '全部',
				openCollapse: [],
				is_stickyBg: false,
				bgColor: 'rgba(0,0,0,0)'
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
							id: {_gt: 0}
						}
					},
					evaluationName: evaluationName
				};
				order.getOrderList(this.params).then(res => {
					this.orderList = [...this.orderList, ...res];
					this.paramsInfo = {
						limit: 10,
						offset: 0,
						where: {
							order_order: { _eq: res[0]?.id }
						},
					};
					this.getOrderInfoListData();
				});
			},
			getOrderInfoListData() {
				orderInfo.getOrderInfoList(this.paramsInfo).then(res => {
					// 找到 id 为 1 的对象并添加 order_info 字段
					for (let i = 0; i < this.orderList.length; i++) {
					  if (this.orderList[i].id == this.orderList[0]?.id) {
					    // 如果对象中没有 order_info 字段，则创建一个空数组
					    if (!this.orderList[i].hasOwnProperty('order_info')) {
					      this.orderList[i].order_info = [];
					    }
					    // 将 res 添加到 order_info 数组中
					    this.orderList[i].order_info = [...this.orderList[i].order_info, ...res];
					    break; // 找到后退出循环
					  }
					}
					this.openCollapse = [this.orderList[0].id]
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
			this.orderList = []
			this.getOrderListData();
		},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			if (scrollTop > this.$system.BarHeight()) {
				this.is_stickyBg = true
			} else {
				this.is_stickyBg = false
			}
			if(scrollTop) {
				this.bgColor = '#fff'
			} else {
				this.bgColor = 'rgba(0,0,0,0)'
			}
		}
	}
</script>

<style scoped lang="scss">
	.oder-list-page {
		::v-deep .uv-tabbar {
			background-color: #f6f7f9;
		}
	}
</style><template>
	<view class="oder-list-page width-full height-full" style="background: linear-gradient(180deg, #FEA800 -9.82%, #FFEECC 21.04%);">
		<!-- 顶部导航栏 -->
		<navbar title='订单列表' fixed :bgColor="bgColor"></navbar>
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
				@handleEvaluation="handleEvaluation" :openCollapse="openCollapse" :is_stickyBg="is_stickyBg"/>
		</view>
		<!-- 底部导航栏 -->
		<!-- <tabBar :value='3' /> -->
		<tabBar :value='1' />
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
					}
				},
				orderList: [],
				orderTotal: 0,
				status: '未入库',
				evaluation: '全部',
				openCollapse: [],
				is_stickyBg: false,
				bgColor: 'rgba(0,0,0,0)'
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
							id: {_gt: 0}
						}
					},
					evaluationName: evaluationName
				};
				order.getOrderList(this.params).then(res => {
					this.orderList = [...this.orderList, ...res];
					this.paramsInfo = {
						limit: 10,
						offset: 0,
						where: {
							order_order: { _eq: res[0]?.id }
						},
					};
					this.getOrderInfoListData();
				});
			},
			getOrderInfoListData() {
				orderInfo.getOrderInfoList(this.paramsInfo).then(res => {
					// 找到 id 为 1 的对象并添加 order_info 字段
					for (let i = 0; i < this.orderList.length; i++) {
					  if (this.orderList[i].id == this.orderList[0]?.id) {
					    // 如果对象中没有 order_info 字段，则创建一个空数组
					    if (!this.orderList[i].hasOwnProperty('order_info')) {
					      this.orderList[i].order_info = [];
					    }
					    // 将 res 添加到 order_info 数组中
					    this.orderList[i].order_info = [...this.orderList[i].order_info, ...res];
					    break; // 找到后退出循环
					  }
					}
					this.openCollapse = [this.orderList[0].id]
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
			this.orderList = []
			this.getOrderListData();
		},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			if (scrollTop > this.$system.BarHeight()) {
				this.is_stickyBg = true
			} else {
				this.is_stickyBg = false
			}
			if(scrollTop) {
				this.bgColor = '#fff'
			} else {
				this.bgColor = 'rgba(0,0,0,0)'
			}
		}
	}
</script>

<style scoped lang="scss">
	.oder-list-page {
		::v-deep .uv-tabbar {
			background-color: #f6f7f9;
		}
	}
</style><template>
	<view class="oder-list-page width-full height-full" style="background: linear-gradient(180deg, #FEA800 -9.82%, #FFEECC 21.04%);">
		<!-- 顶部导航栏 -->
		<navbar title='订单列表' fixed :bgColor="bgColor"></navbar>
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
				@handleEvaluation="handleEvaluation" :openCollapse="openCollapse" :is_stickyBg="is_stickyBg"/>
		</view>
		<!-- 底部导航栏 -->
		<!-- <tabBar :value='3' /> -->
		<tabBar :value='1' />
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
					}
				},
				orderList: [],
				orderTotal: 0,
				status: '未入库',
				evaluation: '全部',
				openCollapse: [],
				is_stickyBg: false,
				bgColor: 'rgba(0,0,0,0)'
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
							id: {_gt: 0}
						}
					},
					evaluationName: evaluationName
				};
				order.getOrderList(this.params).then(res => {
					this.orderList = [...this.orderList, ...res];
					this.paramsInfo = {
						limit: 10,
						offset: 0,
						where: {
							order_order: { _eq: res[0]?.id }
						},
					};
					this.getOrderInfoListData();
				});
			},
			getOrderInfoListData() {
				orderInfo.getOrderInfoList(this.paramsInfo).then(res => {
					// 找到 id 为 1 的对象并添加 order_info 字段
					for (let i = 0; i < this.orderList.length; i++) {
					  if (this.orderList[i].id == this.orderList[0]?.id) {
					    // 如果对象中没有 order_info 字段，则创建一个空数组
					    if (!this.orderList[i].hasOwnProperty('order_info')) {
					      this.orderList[i].order_info = [];
					    }
					    // 将 res 添加到 order_info 数组中
					    this.orderList[i].order_info = [...this.orderList[i].order_info, ...res];
					    break; // 找到后退出循环
					  }
					}
					this.openCollapse = [this.orderList[0].id]
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
			this.orderList = []
			this.getOrderListData();
		},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			if (scrollTop > this.$system.BarHeight()) {
				this.is_stickyBg = true
			} else {
				this.is_stickyBg = false
			}
			if(scrollTop) {
				this.bgColor = '#fff'
			} else {
				this.bgColor = 'rgba(0,0,0,0)'
			}
		}
	}
</script>

<style scoped lang="scss">
	.oder-list-page {
		::v-deep .uv-tabbar {
			background-color: #f6f7f9;
		}
	}
</style>