<template>
	<view class="page">
		<!-- <uv-sticky :offsetTop="0"> -->
		<tabs :tabList="tabList" :activeTextSize="'30rpx'" @tabChange="tabChange"></tabs>
		<!-- </uv-sticky> -->
		<view class="page-list" >
			<view class="page-list-item" v-for="(item, index) in orderList" :key="index">
				<view class="page-list-order" v-if="item.order_info.length > 0">
					<view class="list-order-title">{{item.title}}</view>
					<view class="list-order-item">
						<ratingOrderCard :data="itemOrder" :is_list="true" :evaluationData="item.evaluation" v-for="(itemOrder, indexOrder) in item.order_info" :key="indexOrder"
							@handleMore="handleMore"></ratingOrderCard>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import order from "@/api/order";
	export default {
		components: {
		},
		options: {
		    styleIsolation: 'shared'
		},
		data() {
			return {
				offsetTop: 0,
				tabList: [{
					name: '送评订单'
				}, {
					name: '补款订单'
				}],
				params: {
					limit: 10,
					offset: 0,
					where: {
						mode: { _eq: '送评订单' }
					}
				},
				orderList: [],
				tab: '送评订单',
			}
		},
		emit: [],
		methods: {
			getOrderListData() {
				const evaluationName = this.evaluation === '全部' ? '' : this.evaluation;
				console.log(evaluationName);
				this.params = {
					limit: 10,
					offset: 0,
					where: {
						mode: { _eq: '送评订单' }
					},
					status: this.status,
					process_status: '待付款',
					evaluationName: evaluationName
				};
				order.getOrderList(this.params).then(res => {
					console.log(res);
					this.orderList = res;
				});
			},
			tabChange(value) {
				
			}
		},
		onLoad() {
			this.getOrderListData();
		},
		mounted() {
			// #ifndef WEB
			this.offsetTop = this.$system.BarHeight();
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f6f7f9;
	}
	
	.page-list {
		display: flex;
		flex-direction: column;
		margin-top: 48rpx;
		padding: 0 28rpx;
	}
	
	.page-list-item {
		display: flex;
		flex-direction: column;
		gap: 64rpx;
	}
	
	.page-list-order {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
</style>