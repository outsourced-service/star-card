<template>
	<view class="container" :style="dynamicBackground">
		<view class="container-order-info">
			<view class="order-info-top">
				<view class="info-top-tag">
					<!-- <uv-image radius="12rpx" :src="orderInfo.evaluation?.order_logo_img.url" width="280rpx" height="56rpx"></uv-image> -->
					<evaluationTag :evaluation="orderInfo.evaluation"></evaluationTag>
					<view class="top-tag-title">{{orderInfo.evaluation?.order_title}}</view>
				</view>
				<view class="info-top-item">
					<view class="top-item-name">中速换评档 Crossover</view>
					<view class="top-item-data">常规尺寸 / 仅评卡品 · 30张</view>
				</view>
			</view>
			<cardOrderInfo :orderInfo="orderInfo" @handleElectronicStub="handleElectronicStub" @handleAdditionalPayment="handleAdditionalPayment"></cardOrderInfo>
		</view>
		<view class="container-other-info">
			<cardPictureList @handleMore="handleMoreCardInfo"></cardPictureList>
			<cardAddress></cardAddress>
			<cardProgress @handleInspectionReport="handleInspectionReport"></cardProgress>
		</view>
		<view class="container-button">
			<view class="container-button-item">
				<view class="button-item-left">
					<view class="item-left-title">总价</view>
					<view class="item-left-price">￥<span style="font-size: 44rpx">5000</span></view>
					<view class="item-left-tip" @click="handleDetail">查看明细<uv-icon name="arrow-right" color="#ffffff" size="24rpx"></uv-icon></view>
				</view>
				<view class="button-item-right">
					<uv-button text="支付订单" @click="handlePay" color="#fea800" shape="circle" size="large" :customStyle="{height: '112rpx'}" :customTextStyle="{fontSize: '28rpx'}"></uv-button>
				</view>
			</view>
		</view>
	</view>
	<uv-popup ref="additionalPaymentPopup" mode="bottom" :round="roundAdditional" :closeable="closeableAdditional" safeAreaInsetBottom>
		<additionalPaymentPopup :closeableAdditional="closeableAdditional" @handlePay="handlePay" @handleOpenDetail="handleOpenDetail"></additionalPaymentPopup>
	</uv-popup>
	<uv-popup ref="payPopup" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
		<payPopup></payPopup>
	</uv-popup>
	<uv-popup ref="popupDetail" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
		<orderFormPopupDetail :data="evaluation" :formData="formData"></orderFormPopupDetail>
	</uv-popup>
</template>

<script>
	import orderInfo from "@/api/order";
	import cardOrderInfo from "../components/card-orderInfo/card-orderInfo.vue";
	import cardAddress from "../components/card-address/card-address.vue";
	import cardPictureList from "../components/card-pictureList/card-pictureList.vue";
	import cardProgress from "../components/card-progress/card-progress.vue";
	import additionalPaymentPopup from "../components/additional-payment-popup/additional-payment-popup.vue";
	
	export default {
		components: {
			cardOrderInfo,
			cardAddress,
			cardPictureList,
			cardProgress,
			additionalPaymentPopup
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
			dynamicBackground() {
				// 动态设置背景图片
				return {
					'background-image': `url(${this.orderInfo.evaluation?.img.url})`,
					'background-size': 'contain',
					'background-position': 'top',
					'background-repeat': 'no-repeat'
				};
			}
		},
		data() {
			return {
				orderInfo: {},
				closeableAdditional: true,
				roundAdditional: '0rpx'
			}
		},
		emit: [],
		methods: {
			handleOpenDetail() {
				if(this.closeableAdditional) {
					this.closeableAdditional = false
					this.roundAdditional = '0rpx'
				} else {
					this.closeableAdditional = true
					this.roundAdditional = '40rpx'
				}
			},
			handlePay() {
				this.$refs.popupDetail.close();
				this.$refs.additionalPaymentPopup.close();
				this.$refs.payPopup.open();
			},
			handleDetail() {
				this.$refs.popupDetail.open();
			},
			handleMoreCardInfo() {
				uni.navigateTo({
				    url: '/pages/order/index/cardInformation'
				})
			},
			handleAdditionalPayment() {
				this.$refs.additionalPaymentPopup.open();
			},
			handleInspectionReport() {
				
			},
			handleElectronicStub() {
				uni.navigateTo({
				    url: '/pages/order/index/electronicStub'
				})
			},
			getOrderInfoDetail(id) {
				orderInfo.getOrderInfoDetail(id).then(res => {
					this.orderInfo = res[0];
				});
			}
		},
		onLoad(option) {
			this.getOrderInfoDetail(option.order_info_id);
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		padding: 40rpx 32rpx;
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.container-order-info {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.order-info-top {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.info-top-tag {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.top-tag-title {
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
		padding: 6rpx 20rpx;
		border-radius: 2000rpx;
		background: rgba(0, 0, 0, 0.03);
	}
	
	.info-top-item {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.top-item-name {
		font-weight: 600;
		font-size: 44rpx;
		line-height: 68rpx;
		color: rgba(0, 0, 0, 0.9);
	}
	
	.top-item-data {
		font-weight: 500;
		line-height: 32rpx;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.container-other-info {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.container-button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 24rpx 32rpx 40rpx 32rpx;
		z-index: 100;
	}
	
	.container-button-item {
		background: rgba(0, 0, 0, 0.8);
		height: 112rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 32rpx;
		border-radius: 2000rpx;
	}
	
	.button-item-left {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
	}
	
	.item-left-title {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.item-left-price {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
		display: flex;
		gap: 8rpx;
		align-items: baseline;
	}
	
	.item-left-tip {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.button-item-right {
		width: 240rpx;
	}
</style>
