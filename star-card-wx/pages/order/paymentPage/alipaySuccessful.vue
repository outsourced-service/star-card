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
						<view class="right-content-top">
							<uv-icon name="camera" color="rgba(224, 148, 0, 1)" size="40rpx"></uv-icon>
							请截图以下订单完成页面，并截图支付宝转账记录发送给客服完成支付。
						</view>
						<view class="right-content-card">
							<view class="content-card-top">
								<view class="content-card-title">需支付订单</view>
								<view class="content-card-show" @click="handleDetail">展示详情<uv-icon name="arrow-right" color="rgba(254, 168, 0, 1)" size="28rpx" bold></uv-icon></view>
							</view>
							<view class="content-card-info">
								<view class="content-card-info">
									<view class="card-info-order" v-for="(item, index) in 2" :key="index" :style="index >= 2 - 1 ? 'padding-bottom: 0; border-bottom: none;' : ''">
										<view class="info-order-item">
											<view class="info-order-text">订单{{index + 1}}：</view>
											<view class="info-order-num">
												<text>20389724896856</text>
												<uv-icon name="file-text" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
											</view>
										</view>
										<view class="info-order-detail" v-if="is_show_order">
											<view class="order-detail-top">
												<uv-image lazyLoad radius="12rpx" width="256rpx" height="48rpx" src="https://fz-zion-static.functorz.com/202504030603/c54b5d357b07d6415abd39986354d350/project/2000000000380240/images/FTt735VO8DT0pmlukb_HlQ==.png"></uv-image>
												<view class="detail-top-tip">5月31日批次</view>
											</view>
											<view class="order-detail-data">
												<uv-image lazyLoad radius="8rpx" width="132rpx" height="168rpx" src="https://s3-alpha-sig.figma.com/img/2d8e/f213/5da0a173d8245abe7f445f18ac601e5a?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qOTWpKhQgayflR-xobQl20EL8ZoAS~VymbPivshd9kC6fwStAvoqh0fyOZ7MIa0gWLeOvYfNn5l11C6NmBM4b5Wg~VGnRqtiNDKixKHnbHbfETiKTWaFzuy9P-dBmUOSj2xtwgWziLkQmwJ0oXhoqlYaHTafKVE336CjslmIc3FhhIyui2OMjiwo20SjBAtn5xndPjA9KG6638~PmaGD7TdvITNm~Ym6wytUE9zeB2EXAtcQpz5KxJXLsSWOi-074iNVjvhkmjiIGUxyb8XT4Ws~-wsgt8gHIaJ3HHMrVLMdum6y8QJTkzKzvnF4AxOThMkGgz9l7GP6fe2EbP3nKw__"></uv-image>
												<view class="detail-data-order">
													<view class="data-order-top">
														<view class="order-top-name">Tcg特惠档 TcgBulk</view>
														<view class="order-top-size">常规尺寸 / 仅评卡品</view>
													</view>
													<view class="data-order-num">30张</view>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="content-card-line"></view>
								<view class="content-card-price">
									<view class="card-price-total">
										<view class="price-total-text">总价</view>
										<view class="price-total-num"><span style="font-size: 28rpx;">¥</span>5000</view>
									</view>
									<view class="card-price-discount">
										<view class="price-discount-item">
											<view class="discount-item-text">优惠券</view>
											<view class="discount-item-num">-¥300</view>
										</view>
										<view class="price-discount-item">
											<view class="discount-item-text">积分抵扣</view>
											<view class="discount-item-num">-¥800</view>
										</view>
									</view>
								</view>
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
						<view class="right-content-card">
							<view class="content-card">
								<view class="content-card-left">
									<view class="content-card-title">用支付宝扫右侧付款码支付</view>
									<view class="card-left-tip">
										<text>客服核实后会更改付款状态，存在一定延时</text>
									</view>
									<view class="card-left-save">
										长按保存二维码
										<view class="left-save-icon">
											<uv-icon name="arrow-rightward" color="rgba(255, 220, 153, 1)" size="40rpx"></uv-icon>
										</view>
									</view>
								</view>
								<uv-image lazyLoad @longpress="handleLongPress" height="160rpx" width="160rpx" mode="aspectFit" src="https://s3-alpha-sig.figma.com/img/580c/9c48/5bac31d9e569f88d96c3a58a740ea88d?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DPQNeCG2wT6Z3Vy-M5W8lh8tFbod2yazFe3tWVVZhO5HpZJXHqiI70lS6W0CLjN2cno6enHkt23jOd0akRERrAd-7r6UA2Y2B65X~35JOXfe5Tr0gxWneV3ndbKJVotTAZvj-kxVLWGdNpX3hJqfsU8wt5CXtGggg9y7j-MYtfRFLxDolAKf1PxnjheFnz3y8GU14bL9QsdS1~bk850ouOj~I6z96oR4jfKPzthVlXoTjpNFJhRSO-cRsNnRh6bOQTJe~~rsVgVkTTjC827XqaNK93EzHV-Vg10nbodmS0EttNUDfe~shbfGP6UcKa2J7FTuh2MRBJJJM3cb6IVSMQ__"></uv-image>
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
						<view class="item-right-text">
							请向客服发送<span style="color: rgba(254, 168, 0, 1); padding: 0 4rpx;">支付宝订单号</span>及<span style="color: rgba(254, 168, 0, 1); padding: 0 4rpx;">订单详情截图</span>
						</view>
					</view>
					<view class="page-button">
						<uv-button text="联系客服" color="#fea800" shape="circle" size="large" icon="server-fill" iconSize="32rpx" iconColor="#fff" :customStyle="{height: '88rpx', fontSize: '30rpx', gap: '6rpx'}"></uv-button>
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
			is_show_order: false
		}
	},
	methods: {
		handleLongPress() {
			console.log('触发长按')
		},
		handleDetail() {
			if(this.is_show_order) {
				this.is_show_order = false
			} else {
				this.is_show_order = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	padding: 32rpx;
	min-height: 100vh;
	width: 100vw;
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
				padding-bottom: 40rpx;
				
				.item-right-title {
					font-size: 30rpx;
					font-weight: 600;
					color: rgba(0, 0, 0, 0.99);
				}
				
				.item-right-content {
					padding: 24rpx 0;
					
					.right-content-top {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 20rpx;
						padding: 20rpx 24rpx 48rpx 24rpx;
						border-top-left-radius: 32rpx;
						border-top-right-radius: 32rpx;
						background: linear-gradient(0deg, #FFE5B2 0%, #FFEECC 100%);
						font-weight: 600;
						font-size: 24rpx;
						line-height: 32rpx;
						color: rgba(224, 148, 0, 1);
						margin-bottom: -32rpx;
					}
					
					.right-content-card {
						background-color: #ffffff;
						padding: 24rpx 28rpx;
						border-radius: 32rpx;
						border-bottom-width: 16rpx;
						box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
						display: flex;
						flex-direction: column;
						gap: 40rpx;
						
						.content-card {
							display: flex;
							justify-content: space-between;
							align-items: center;
							gap: 24rpx;
						}
						
						.content-card-top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 4rpx;
						}
						
						.content-card-left {
							display: flex;
							flex-direction: column;
							gap: 16rpx;
							width: calc(100% - 184rpx);
						}
						
						.content-card-title {
							font-weight: 600;
							font-size: 28rpx;
							color: rgba(0, 0, 0, 0.99);
						}
						
						.content-card-show {
							font-weight: 600;
							font-size: 24rpx;
							color: rgba(254, 168, 0, 1);
							display: flex;
							align-items: baseline;
						}
						
						.content-card-info {
							display: flex;
							flex-direction: column;
							gap: 32rpx;
						}
						
						.card-info-order {
							display: flex;
							flex-direction: column;
							gap: 16rpx;
							padding-bottom: 32rpx;
							border-bottom: 2rpx rgba(209, 209, 214, 1) dashed;
						}
						
						.info-order-item {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
						
						.info-order-text {
							font-size: 26rpx;
							color: rgba(0, 0, 0, 0.44);
						}
						
						.info-order-num {
							display: flex;
							gap: 8rpx;
							font-size: 24rpx;
							color: rgba(0, 0, 0, 0.33);
						}
						
						.info-order-detail {
							display: flex;
							flex-direction: column;
							gap: 20rpx;
							
							.order-detail-top {
								display: flex;
								justify-content: space-between;
								align-items: center;
								
								.detail-top-tip {
									padding: 6rpx 16rpx;
									border-radius: 2000rpx;
									background: rgba(0, 0, 0, 0.03);
									font-size: 20rpx;
									color: rgba(0, 0, 0, 0.33);
								}
							}
							
							.order-detail-data {
								display: flex;
								gap: 24rpx;
								
								.detail-data-order {
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									
									.data-order-top {
										display: flex;
										flex-direction: column;
										gap: 8rpx;
										
										.order-top-name {
											font-weight: 600;
											font-size: 28rpx;
											color: rgba(0, 0, 0, 0.9);
										}
										
										.order-top-size {
											font-weight: 600;
											font-size: 22rpx;
											color: rgba(0, 0, 0, 0.44);
										}
									}
									
									.data-order-num {
										font-weight: 600;
										font-size: 28rpx;
										color: rgba(0, 0, 0, 0.99);
									}
								}
							}
						}
						
						.content-card-line {
							border-top: 2rpx solid rgba(234, 234, 239, 1)
						}
						
						.content-card-price {
							display: flex;
							flex-direction: column;
							gap: 28rpx;
							
							.card-price-total {
								display: flex;
								justify-content: space-between;
								align-items: center;
								
								.price-total-text {
									font-weight: 600;
									font-size: 30rpx;
									color: rgba(0, 0, 0, 0.99);
								}
								
								.price-total-num {
									display: flex;
									align-items: baseline;
									gap: 4rpx;
									font-weight: 600;
									font-size: 36rpx;
									color: rgba(254, 168, 0, 1);
								}
							}
							
							.card-price-discount {
								display: flex;
								flex-direction: column;
								gap: 16rpx;
								padding-bottom: 4rpx;
								
								.price-discount-item {
									display: flex;
									justify-content: space-between;
									align-items: center;
									
									.discount-item-text {
										font-size: 26rpx;
										color: rgba(0, 0, 0, 0.33);
									}
									
									.discount-item-num {
										font-size: 26rpx;
										color: rgba(0, 0, 0, 0.99);
									}
								}
							}
						}
						
						.card-left-tip {
							font-size: 24rpx;
							color: rgba(0, 0, 0, 0.33);
						}
						
						.card-left-save {
							display: flex;
							align-items: center;
							gap: 20rpx;
							background: rgba(255, 229, 178, 1);
							border-radius: 200rpx;
							padding: 8rpx 8rpx 8rpx 16rpx;
							font-weight: 600;
							font-size: 24rpx;
							color: rgba(224, 148, 0, 1);
							width: 252rpx;
							
							.left-save-icon {
								background-color: #ffffff;
								width: 40rpx;
								height: 40rpx;
								border-radius: 50%;
							}
						}
					}
				}
				
				.item-right-text {
					font-size: 24rpx;
					color: rgba(0, 0, 0, 0.44);
					margin-top: 8rpx;
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