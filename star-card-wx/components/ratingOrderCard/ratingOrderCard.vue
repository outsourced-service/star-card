<template>
	<view class="order-package-card">
		<view class="package-card-top" v-if="is_form">
			<view class="card-top-left">订单已生成，请尽快寄出哟~</view>
			<view class="card-top-right" @click="handleBack">修改订单</view>
		</view>
		<view class="package-card-item" :style="dynamicBackground">
			<view class="card-item-logo">
				<uv-image :src="evaluationData.order_logo_img.url" width="280rpx" height="56rpx"></uv-image>
				<view class="item-logo-text">{{evaluationData.order_title}}</view>
			</view>
			<view class="card-item-order">
				<view class="item-order-image">
					<uv-image :src="data.status == '未入库' ? data?.order_user_annex[0]?.img?.url : data?.order_annex[0]?.img?.url" width="142rpx" height="180rpx" radius="16rpx"></uv-image>
				</view>
				<view class="item-order-info">
					<view class="order-info-top">
						<view class="info-top-status" v-if="data.text_status == '订单创建，待用户寄出' || data.text_status == '用户已寄出'">
							<view style="color: rgba(0, 0, 0, 0.33);">{{data.text_status}}</view>
						</view>
						<view class="info-top-status" v-else-if="data.text_status == '已出分, 待机构寄回 Shipping' || data.text_status == '机构已寄出 Shipped' || data.text_status == '抵达星卡仓库, 打包中' || data.text_status == '已寄回玩家' || data.text_status == '玩家已签收，订单完成'">
							<view style="color: rgba(52, 199, 89, 1);">{{data.text_status}}</view>
						</view>
						<view class="info-top-status" v-else>
							<view style="color: rgba(254, 168, 0, 1);">{{data.text_status}}</view>
						</view>
						<view class="info-top-name" v-if="data.evaluation_notes">{{ data.evaluation_notes }}</view>
						<view class="info-top-name" v-else>-</view>
						<view class="info-top-size">{{ data.size }} / {{ data.type }}</view>
					</view>
					<view class="order-info-bottom" v-if="data.num">{{ data.num }}张</view>
					<view class="order-info-bottom" v-else>-</view>
				</view>
			</view>
			<view class="card-item-discount" v-if="is_transaction">
				<view class="item-discount-info">
					<view class="discount-info-left">
						<view class="info-left-title">优惠券<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon></view>
						<view class="info-left-description">这里有一段描述</view>
					</view>
					<view class="discount-info-right">
						<view class="info-right-price">
							<view class="right-price-num">已优惠165元</view>
							<view class="right-price-text">慢速档专用免单券</view>
						</view>
						<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx" bold></uv-icon>
					</view>
				</view>
				<view class="item-discount-info">
					<view class="discount-info-left">
						<view class="info-left-title">积分抵扣<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon></view>
						<view class="info-left-description">剩余30000积分</view>
					</view>
					<view class="discount-info-right">
						<view class="info-right-price">
							<view class="right-price-num">已优惠24.5元</view>
							<view class="right-price-text">使用16500</view>
						</view>
						<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx" bold></uv-icon>
					</view>
				</view>
			</view>
			<view class="card-item-price" v-if="is_form">
				<view class="item-price-title">预计总价</view>
				<view class="item-price">
					<view class="item-price-unit">￥</view>
					<view class="item-price-num">{{ data.price }}</view>
					<view class="item-price-text" @click="handleOpenDetail">查看明细</view>
				</view>
			</view>
			<view class="card-item-price" v-else-if="is_list">
				<view class="item-price-id">
					订单号：{{data.order_id}}
				</view>
				<view class="item-price" v-if="data.status == '未入库'">
					<view class="item-price-button" @click="handleMore(data.id)">更多</view>
					<view class="item-price-button">继续填写</view>
				</view>
				<view class="item-price" v-else-if="data.process_status != '已付款'">
					<view class="item-price-total">￥{{ data.total_price }}</view>
					<view class="item-price-button-process">立即支付</view>
				</view>
				<view class="item-price" v-else>
					<view class="item-price-text-process">已支付</view>
				</view>
			</view>
			<view class="card-item-price" v-else>
				<view class="item-price-id">
					订单号：{{data.order_id}}
				</view>
				<view class="item-price">
					<view class="item-price-unit">￥</view>
					<view class="item-price-num-pay">{{ data.total_price || 0 }}</view>
					<view class="item-price-text-pay" @click="handleOpenDetail">查看明细<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold></uv-icon></view>
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
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			is_list: {
				type: Boolean,
				required: true,
				default: () => (false),
			},
			is_pay: {
				type: Boolean,
				required: true,
				default: () => (false),
			},
			is_transaction: {
				type: Boolean,
				required: false,
				default: () => (false),
			},
			is_form: {
				type: Boolean,
				required: false,
				default: () => (false),
			},
			evaluationData: {
				type: Object,
				required: true,
				default: () => ({}),
			}
		},
		data() {
			return {
			}
		},
		emit: ['handleMore'],
		computed: {
			dynamicBackground() {
				// 动态设置背景图片
				return {
					'background-image': `url(${this.evaluationData.img.url})`,
					'background-size': 'cover',
					'background-position': 'center',
					'background-repeat': 'no-repeat',
					'margin-top': !this.is_form ? '0' : '-38rpx'
				};
			}
		},
		methods: {
			handleBack() {
				this.$emit('handleBack')
			},
			handleOpenDetail() {
				this.$emit('handleOpenDetail', this.data.id)
			},
			handleMore(id) {
				this.$emit('handleMore', id)
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.order-package-card {
		margin: 0 2rpx 24rpx 2rpx;
	}
	
	.package-card-top {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 32rpx 56rpx 32rpx;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		background: rgba(255, 238, 204, 1);
	}
	
	.card-top-left {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(224, 148, 0, 1);
	}
	
	.card-top-right {
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.package-card-item {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		padding: 20rpx 32rpx 24rpx 32rpx;
		border-radius: 32rpx;
		border: 2rpx solid;
		border-image-source: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.66) 100%);
		box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1);
	}
	
	.card-item-logo {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.item-logo-text {
		padding: 6rpx 16rpx;
		border-radius: 2000rpx;
		background: rgba(0, 0, 0, 0.03);
		font-size: 20rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.card-item-order {
		display: flex;
		gap: 24rpx;
	}
	
	.item-order-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.order-info-top {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.info-top-status {
		display: flex;
		font-weight: 600;
		font-size: 22rpx;
		gap: 8rpx;
	}
	
	.info-top-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.9);
	}
	
	.info-top-size {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.order-info-bottom {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.card-item-discount {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		padding: 28rpx 0 8rpx 0;
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
	
	.item-discount-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.discount-info-left {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.info-left-title {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.info-left-description {
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.discount-info-right {
		display: flex;
		align-items: center;
		gap: 4rpx;
	}
	
	.info-right-price {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}
	
	.right-price-num {
		font-size: 22rpx;
		color: rgba(255, 59, 48, 1);
	}
	
	.right-price-text {
		font-weight: 600;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.card-item-price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
	
	.item-price-title {
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.item-price {
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}
	
	.item-price-unit {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.item-price-num {
		font-weight: 600;
		font-size: 40rpx;
		color: rgba(254, 168, 0, 1);
		margin-right: 8rpx;
	}
	
	.item-price-text {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.item-price-id {
		display: flex;
		font-size: 20rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.item-price-button {
		display: flex;
		align-items: center;
		padding: 5rpx 24rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		border: 2rpx solid rgba(229, 229, 234, 1);
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.item-price-button:active {
		background-color: #d9d9d9;
	}
	
	.item-price-button-process {
		display: flex;
		align-items: center;
		padding: 5rpx 24rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		border: 2rpx solid rgba(254, 168, 0, 1);
		font-weight: 600;
		font-size: 24rpx;
		margin-left: 8rpx; 
		color: rgba(254, 168, 0, 1);
	}
	
	.item-price-button-process:active {
		background-color: #d9d9d9;
	}
	
	.item-price-total {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.item-price-text-process {
		display: flex;
		align-items: center;
		font-weight: 600;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.2);
	}
	
	.item-price-num-pay {
		font-weight: 600;
		font-size: 36rpx;
		color: rgba(254, 168, 0, 1);
		margin-right: 4rpx;
	}
	
	.item-price-text-pay {
		font-weight: 600;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.66);
		display: flex;
		align-items: baseline;
		gap: 4rpx;
	}
</style>