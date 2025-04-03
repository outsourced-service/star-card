<template>
	<view class="container" :style="dynamicBackground">
		<view class="container-order-info">
			<view class="order-info-top">
				<view class="info-top-tag">
					<uv-image radius="12rpx" :src="orderInfo.evaluation?.order_logo_img.url" width="280rpx" height="56rpx"></uv-image>
					<view class="top-tag-title">{{orderInfo.evaluation?.order_title}}</view>
				</view>
				<view class="info-top-item">
					<view class="top-item-name">中速换评档 Crossover</view>
					<view class="top-item-data">常规尺寸 / 仅评卡品 · 30张</view>
				</view>
			</view>
			<cardOrderInfo :orderInfo="orderInfo" @handleElectronicStub="handleElectronicStub"></cardOrderInfo>
		</view>
		<view class="container-other-info">
			<cardPictureList></cardPictureList>
			<cardAddress></cardAddress>
			<cardProgress></cardProgress>
		</view>
	</view>
</template>

<script>
	import orderInfo from "@/api/order";
	import cardOrderInfo from "../components/card-orderInfo/card-orderInfo.vue";
	import cardAddress from "../components/card-address/card-address.vue";
	import cardPictureList from "../components/card-pictureList/card-pictureList.vue";
	import cardProgress from "../components/card-progress/card-progress.vue";
	
	export default {
		components: {
			cardOrderInfo,
			cardAddress,
			cardPictureList,
			cardProgress
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
				orderInfo: {}
			}
		},
		emit: [],
		methods: {
			handleElectronicStub() {
				
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
</style>
