<template>
	<view class="page">
		<!-- <view class="page-list">
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
		</view> -->
		<view class="page-list">
			<view class="page-list-item" v-for="(item, index) in orderList" :key="index">
				<view class="page-list-order" v-if="item.order_info.length > 0">
					<!-- <view class="list-order-title">{{item.title}}</view> -->
					<view class="list-order-item">
						<ratingOrderCard v-for="(itemOrder, indexOrder) in item.order_info" :key="indexOrder" :data="itemOrder" :is_transaction="true" :is_list="false" :is_pay="false" :evaluationData="item.evaluation" @handleOpenDetail="handleOpenDetail"></ratingOrderCard>
					</view>
				</view>
			</view>
		</view>
		<view class="page-bottom">
			<view class="page-bottom-safety">
				<uv-checkbox v-model="is_safety" shape="circle" activeColor="#fea800" @change="handleSafety">
					<view class="bottom-safety-text">
						我已知晓
						<view class="bottom-safety">
							《代送评注意事项》
						</view>
						与
						<view class="bottom-safety">
							《保险说明》
						</view>
					</view>
				</uv-checkbox>
			</view>
			<view class="page-bottom-line"></view>
			<view class="page-bottom-button">
				<view class="bottom-button-info">
					<view class="button-info-price">
						<span class="info-price-text">总价</span>
						<span class="info-price-unit">￥</span>
						<span class="info-price-num">{{total_price}}</span>
						<span class="info-price-discount">￥5300</span>
					</view>
					<view class="button-info-detail">
						<span class="info-detail-discount">共优惠￥300</span>
						<view class="info-detail-icon" @click="handleOpenOrderDetail">
							查看明细<uv-icon name="arrow-down" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold></uv-icon>
						</view>
					</view>
				</view>
				<uv-button @click="handlePay" text="确认并支付" color="#fea800" size="large" shape="circle" :customStyle="{width: '240rpx', height: '88rpx'}"></uv-button>
			</view>
		</view>
	</view>
	<uv-popup ref="popup" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
		<orderDetail @handlePay="handlePay"></orderDetail>
	</uv-popup>
	<uv-popup ref="payPopup" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
		<payPopup></payPopup>
	</uv-popup>
	<uv-popup ref="popupDetail" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
		<orderFormPopupDetail :data="evaluation" :formData="formData"></orderFormPopupDetail>
	</uv-popup>
</template>

<script>
	import orderDetail from './components/orderDetail.vue';
	import order from "@/api/order";
	export default {
		components: {
			orderDetail
		},
		options: {
		    styleIsolation: 'shared'
		},
		data() {
			return {
				offsetTop: 0,
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
			handlePay() {
				this.$refs.popup.close();
				this.$refs.payPopup.open();
			},
			handleOpenOrderDetail(id) {
				this.$refs.popup.open();
			},
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
		width: 100vw;
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
		display: flex;
		flex-direction: column;
		box-shadow: 0px 8rpx 16rpx 0px rgba(0, 0, 0, 0.1);
		background-color: rgba(255, 255, 255, 1);
		width: 100vw;
		// width: calc(100vw - 64rpx);
		gap: 28rpx;
		border-top-width: 2rpx;
		padding: 24rpx;
		z-index: 10;
	}
	
	.page-bottom-safety {
		display: flex;
		align-items: center;
	}
	
	.bottom-safety-text {
		display: flex;
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
		align-items: center;
		margin-bottom: 2rpx;
	}
	
	.bottom-safety {
		color: rgba(254, 168, 0, 1);
	}
	
	.page-bottom-line {
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
	
	.page-bottom-checkbox {
		line-height: 28rpx;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-bottom-button {
		display: flex;
		gap: 24rpx;
		align-items: center;
		justify-content: flex-end;
		margin-top: 4rpx;
	}
	
	.bottom-button-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8rpx;
	}
	
	.button-info-price {
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
	
	.info-price-discount {
		font-weight: 600;
		font-size: 24rpx;
		text-decoration: line-through;
		color: rgba(0, 0, 0, 0.33);
		margin-left: 4rpx;
	}
	
	.button-info-detail {
		display: flex;
		align-items: flex-start;
		gap: 12rpx;
	}
	
	.info-detail-discount {
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.info-detail-icon {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
</style>