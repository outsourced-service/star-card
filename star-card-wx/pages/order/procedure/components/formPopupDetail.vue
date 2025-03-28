<template>
	<view class="popup-page">
		<view class="popup-page-top">
			<view class="page-top-title">
				订单明细
				<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
			</view>
			<view class="page-top-description">
				实际总价需待星卡入库后根据包裹内容确认, 您可在星卡入库后一定时间内更改或取消订单
			</view>
		</view>
		<view class="popup-page-info">
			<view class="page-info-card">
				<view class="page-label-title">
					服务信息
				</view>
				<view class="page-card-info">
					<view class="card-info-item">
						<view class="info-item-label">送评批次</view>
						<view class="info-item-data">{{data.tip || '-'}}</view>
					</view>
					<view class="card-info-item">
						<view class="info-item-label">送评机构</view>
						<view class="info-item-data">{{data.title || '-'}}</view>
					</view>
					<view class="card-info-item">
						<view class="info-item-label">送评服务</view>
						<view class="info-item-data" v-if="formData.evaluation_insurance_name">
							{{formData.evaluation_insurance_name}}<span v-if="formData.signature">/{{formData.signature}}</span><span v-if="formData.size">/{{formData.size}}</span>
						</view>
						<view class="info-item-data" v-else>-</view>
					</view>
					<view class="card-info-item">
						<view class="info-item-label">张数</view>
						<view class="info-item-data" v-if="formData.number">{{formData.number}}张</view>
						<view class="info-item-data" v-else>-</view>
					</view>
				</view>
				<view class="page-card-line"></view>
				<view class="card-info-item">
					<view class="info-item-data">预计总价</view>
					<view class="card-allprice-num">
						<view class="allprice-num-icon" v-if="formData.total_price">￥</view>
						<view class="allprice-num">{{ formData.total_price || '-' }}</view>
					</view>
				</view>
			</view>
			<view class="page-info-formdata">
				<view class="info-formdata-other">
					<view class="info-formdata-item">
						<view class="page-label-title">优惠减免</view>
						<view class="formdata-item-num" v-if="formData.discount_price">-￥{{formData.discount_price}}</view>
						<view class="formdata-item-num" v-else>-</view>
					</view>
					<view class="formdata-other-item" v-if="formData.number >= 15">
						<view class="card-info-item">
							<view class="info-item-label" v-if="formData.number >= 50">最大优惠（满50张95折）</view>
							<view class="info-item-label" v-else>最大优惠（满15张98折）</view>
							<view class="info-item-price" style="color: rgba(254, 168, 0, 1);">-￥{{ formData.discount_price }}</view>
						</view>
					</view>
				</view>
				<view class="info-formdata-line"></view>
				<view class="info-formdata-other">
					<view class="info-formdata-item">
						<view class="page-label-title">评级费用</view>
						<view class="formdata-item-price" v-if="formData.rating_price">￥{{formData.rating_price}}</view>
						<view class="formdata-item-price" v-else>-</view>
					</view>
					<view class="formdata-other-item" v-if="formData.evaluation_insurance_id">
						<view class="card-info-item">
							<view class="info-item-label">档位单价（{{formData.evaluation_insurance_price}}元/张）</view>
							<view class="info-item-price">￥{{formData.evaluation_insurance_price * formData.number}}</view>
						</view>
						<view class="card-info-item" v-if="formData.signatureNum">
							<view class="info-item-label">签字加收（{{formData.signatureNum}}元/张）</view>
							<view class="info-item-price">￥{{formData.signatureNum * formData.number}}</view>
						</view>
						<view class="card-info-item" v-if="formData.sizeNum">
							<view class="info-item-label">{{formData.size}}加收（{{formData.sizeNum}}元/张）</view>
							<view class="info-item-price">￥{{formData.sizeNum * formData.number}}</view>
						</view>
					</view>
				</view>
				<view class="info-formdata-line"></view>
				<view class="info-formdata-other">
					<view class="info-formdata-item">
						<view class="page-label-title">附加服务</view>
						<view class="formdata-item-price" v-if="formData.additional_price">￥{{formData.additional_price}}</view>
						<view class="formdata-item-price" v-else>-</view>
					</view>
					<view class="formdata-other-item">
						<view class="card-info-item" v-if="formData.insurance">
							<view class="info-item-label">投保费用（保价{{formData.insurance * 20}}元）</view>
							<view class="info-item-price">￥{{Number(formData.insurance)}}</view>
						</view>
						<view class="card-info-item" v-if="formData.serviceNum">
							<view class="info-item-label">验品服务（{{formData.serviceNum}}元/张）</view>
							<view class="info-item-price">￥{{formData.serviceNum * formData.number}}</view>
						</view>
						<view class="card-info-item">
							<view class="info-item-label">拆壳费用（5元/张）</view>
							<view class="info-item-data">费用需待星卡入库后确认</view>
						</view>
						<view class="card-info-item">
							<view class="info-item-label">包装费用（1元/张）</view>
							<view class="info-item-data">费用需待星卡入库后确认</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
		},
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			formData: {
				type: Object,
				required: true,
				default: () => ({}),
			}
		},
		data() {
			return {
			}
		},
		emit: [],
		methods: {
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.popup-page {
		padding: 40rpx 32rpx;
		max-height: 60vh;
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.popup-page-top {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.page-top-title {
		display: flex;
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		gap: 4rpx;
	}
	
	.page-top-description {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.popup-page-info {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.page-info-card {
		display: flex;
		flex-direction: column;
		background: rgba(242, 243, 246, 0.66);
		gap: 24rpx;
		padding: 32rpx 24rpx 24rpx 24rpx;
		border-radius: 16rpx;
		border-bottom-width: 16rpx;
	}
	
	.page-label-title {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.page-card-info {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.card-info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	
	.info-item-label {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.info-item-price {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		display: block;
	}
	
	.info-item-data {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 75%;
	}
	
	.page-card-line {
		border-top: 2rpx dashed rgba(209, 209, 214, 1);
	}
	
	.card-allprice-num {
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}
	
	.allprice-num-icon {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.allprice-num {
		font-weight: 600;
		font-size: 40rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.page-info-formdata {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
	
	.info-formdata-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.formdata-item-num {
		color: rgba(254, 168, 0, 1);
		font-weight: 600;
		font-size: 32rpx;
	}
	
	.formdata-item-price {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.info-formdata-line {
		border-top: 2rpx dashed rgba(142, 142, 147, 1);
	}
	
	.info-formdata-other {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.formdata-other-item {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
</style>