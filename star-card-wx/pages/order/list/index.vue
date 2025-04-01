<template>
	<view class="page">
		<!-- <uv-sticky :offsetTop="0"> -->
		<tabs :tabList="tabList" :activeTextSize="'30rpx'" @tabChange="tabChange"></tabs>
		<!-- </uv-sticky> -->
		<view class="page-list">
			<view class="page-list-item" v-for="(item, index) in orderList" :key="index">
				<view class="page-list-order" v-if="item.order_info.length > 0">
					<view class="list-order-title">{{item.title}}</view>
					<view class="list-order-item">
						<uv-checkbox-group v-model="checkboxValue" labelDisabled shape="circle" activeColor="#fea800" iconSize="40rpx">
							<uv-checkbox v-model="item.is_select" v-for="(itemOrder, indexOrder) in item.order_info" :key="indexOrder" :customStyle="{width: '100%', paddingRight: '8rpx', gap: '4rpx'}">
								<ratingOrderCard :data="itemOrder" :is_list="false" :is_pay="true" :evaluationData="item.evaluation" @handleOpenDetail="handleOpenDetail"></ratingOrderCard>
							</uv-checkbox>
						</uv-checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<view class="page-bottom">
			<uv-checkbox-group v-model="checkboxValue" labelDisabled shape="circle" activeColor="#fea800" iconSize="36rpx">
				<uv-checkbox v-model="is_all_select" :customStyle="{width: '100%', paddingRight: '8rpx', gap: '4rpx'}">
					<view class="page-bottom-checkbox">全选</view>
				</uv-checkbox>
			</uv-checkbox-group>
			<view class="page-bottom-right">
				<view class="bottom-right-info">
					<view class="right-info-price">
						<span class="info-price-text">总价</span>
						<span class="info-price-unit">￥</span>
						<span class="info-price-num">{{total_price}}</span>
					</view>
					<view class="right-info-data">
						查看明细<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold></uv-icon>
					</view>
				</view>
				<uv-button :text="'结算 (' + total_num + ')'" color="#fea800" size="large" shape="circle" :customStyle="{width: '240rpx', height: '88rpx'}"></uv-button>
			</view>
		</view>
	</view>
	<uv-popup ref="popupDetail" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
		<orderFormPopupDetail :data="evaluation" :formData="formData"></orderFormPopupDetail>
	</uv-popup>
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
				evaluation: '',
				checkboxValue: [],
				is_all_select: false,
				total_price: 3400,
				total_num: 0
			}
		},
		emit: [],
		methods: {
			handleOpenDetail(id) {
				this.$refs.popupDetail.open();
			},
			getOrderListData() {
				this.params = {
					limit: 10,
					offset: 0,
					where: {
						mode: { _eq: '送评订单' },
						order_info: {
							process_status: { _eq: '待付款' }
						}
					},
					evaluationName: this.evaluation
				};
				order.getOrderAllList(this.params).then(res => {
					this.orderList = res.filter(item => item.order_info?.length > 0); // 过滤空数据
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
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	
	.page-list {
		display: flex;
		flex-direction: column;
		padding: 48rpx 28rpx 0 28rpx;
		flex: 1;
		overflow-y: auto;
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
	
	.list-order-item {
		margin: 0;
		padding: 0;
	}
	
	.page-bottom {
		background-color: #fff;
		padding: 24rpx;
		border-top-width: 2rpx;
		box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		// position: sticky;
		// bottom: 0;
		// left: 0;
		// right: 0;
		// z-index: 1;
	}
	
	.page-bottom-checkbox {
		line-height: 28rpx;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-bottom-right {
		display: flex;
		gap: 24rpx;
		align-items: center;
	}
	
	.bottom-right-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	
	.right-info-price {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
	}
	
	.info-price-text {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		margin-right: 4rpx;
	}
	
	.info-price-unit {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.info-price-num {
		font-weight: 600;
		font-size: 36rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.right-info-data {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
</style>