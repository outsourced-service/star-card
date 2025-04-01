<template>
	<view class="page">
		<view class="page-steps">
			<view class="steps-item">
				<view class="steps-item-left">
					<view class="item-left-dot">1</view>
					<view class="item-left-line"></view>
				</view>
				<view class="steps-item-right">
					<view class="item-right-title">截图订单详情</view>
					<view class="item-right-content">
						<view class="right-content-order">
							<view class="content-order-item">
								<text>订单1：</text>
								<text>20389724896856</text>
								<uv-icon name="file-text" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
							</view>
							<view class="content-order-item">
								<text>订单2：</text>
								<text>20389724896852</text>
								<uv-icon name="file-text" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
							</view>
						</view>
						<view class="right-content-price">
							<view class="content-price-item">
								<text>总价</text>
								<text class="price-item-num">¥5000</text>
							</view>
							<view class="content-price-item">
								<text>优惠券</text>
								<text>-¥300</text>
							</view>
							<view class="content-price-item">
								<text>积分抵扣</text>
								<text>-¥800</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="steps-item">
				<view class="steps-item-left">
					<view class="item-left-dot">2</view>
					<view class="item-left-line"></view>
				</view>
				<view class="steps-item-right">
					<view class="item-right-title">支付宝支付</view>
					<view class="item-right-content">
						<view class="right-content-tip">用支付宝扫右侧付款码支付</view>
						<view class="right-content-qrcode">
							<text>客服核实后会更改付款状态，存在一定延时</text>
							<!-- <image src="/static/images/qrcode.png" mode="aspectFit"></image> -->
						</view>
						<view class="right-content-save">
							<view class="content-save-btn">
								<uv-icon name="arrow-right" color="#fea800" size="24rpx"></uv-icon>
								<text>长按保存二维码</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="steps-item">
				<view class="steps-item-left">
					<view class="item-left-dot">3</view>
				</view>
				<view class="steps-item-right">
					<view class="item-right">
						<view class="item-right-title">联系客服发送支付水单</view>
						<view class="item-right-content">
							<view class="right-content-tip">请向客服发送支付宝订单号及订单详情截图</view>
						</view>
					</view>
					<view class="page-button">
						<uv-button text="联系客服" color="#fea800" shape="circle" size="large" :customStyle="{height: '88rpx'}"></uv-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	padding: 32rpx;
	min-height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	background: linear-gradient(to bottom, #fff7e8, #ffffff);
	
	.page-steps {
		flex: 1;
		
		.steps-item {
			display: flex;
			gap: 24rpx;
			
			.steps-item-left {
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.item-left-dot {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: #fea800;
					color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
				}
				
				.item-left-line {
					flex: 1;
					width: 2rpx;
					background-color: #fea800;
					margin: 8rpx 0;
				}
			}
			
			.steps-item-right {
				flex: 1;
				padding-bottom: 48rpx;
				
				.item-right-title {
					font-size: 28rpx;
					font-weight: 600;
					color: rgba(0, 0, 0, 0.99);
					margin-bottom: 24rpx;
				}
				
				.item-right-content {
					background-color: #f6f7f9;
					border-radius: 16rpx;
					padding: 24rpx;
					
					.right-content-order {
						.content-order-item {
							display: flex;
							align-items: center;
							gap: 8rpx;
							font-size: 28rpx;
							color: rgba(0, 0, 0, 0.66);
							margin-bottom: 16rpx;
							
							&:last-child {
								margin-bottom: 0;
							}
						}
					}
					
					.right-content-price {
						margin-top: 24rpx;
						padding-top: 24rpx;
						border-top: 2rpx solid rgba(0, 0, 0, 0.05);
						
						.content-price-item {
							display: flex;
							justify-content: space-between;
							font-size: 28rpx;
							color: rgba(0, 0, 0, 0.66);
							margin-bottom: 16rpx;
							
							&:last-child {
								margin-bottom: 0;
							}
							
							.price-item-num {
								color: #fea800;
								font-weight: 600;
							}
						}
					}
					
					.right-content-tip {
						font-size: 28rpx;
						color: rgba(0, 0, 0, 0.66);
						margin-bottom: 24rpx;
					}
					
					.right-content-qrcode {
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						text {
							font-size: 24rpx;
							color: rgba(0, 0, 0, 0.33);
							max-width: 320rpx;
						}
						
						image {
							width: 200rpx;
							height: 200rpx;
						}
					}
					
					.right-content-save {
						margin-top: 24rpx;
						display: flex;
						justify-content: flex-end;
						
						.content-save-btn {
							display: flex;
							align-items: center;
							gap: 4rpx;
							font-size: 24rpx;
							color: #fea800;
						}
					}
				}
			}
		}
	}
	
	.page-button {
		margin-top: 48rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}
}
</style>