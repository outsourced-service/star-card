<template>
	<view class="width-full">
		<view class="card-orderDetails" v-for="(card, index) in dataCard" :key="index">
			<view v-for="(item, index) in card.data" :key="index" class="section">
				<view class="flex-row align-start justify-between" style="gap:20px">
					<text class="title " :class="{
						'title-bole':item?.isTitleBole
					}">{{ item.title }}</text>
					<view class="align-start " :class="{
						'flex-1':!item?.isTitleBole
					}" style="gap:4px;">
						<text class="value" :class="{
							'value-500':item?.isValueBole,
							'value-bole':item?.isTitleBole 
						}">{{ item.value }} </text>
						<icon-base64 v-if="item.isCody" name="cody"
							style="width: 24rpx; height: 24rpx; align-self: center;" @click="cody(item.value)" />
					</view>
				</view>
				<uv-line v-if="item.isLine" dashed margin="12px 0 4px"></uv-line>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "card-orderDetails",
		props: {
			orderDetails: {
				type: Object,
				default: () => ({
					送评批次: '5月31日批次',
					送评机构: 'PSA中国送',
					送评服务: '慢速增值ValueBulk/卡品+签字双评/超过一行折行显示与【送评服务】标题间隔20px',
					张数: '43张',
					补款: '¥880',
					订单号: '20389724896856'
				})
			},
			paymentDetails: {
				type: Object,
				default: () => ({
					总价: '¥5000',
					补款: '¥880',
					订单号: '20389724896856',
					下单微信: 'starry_card',
					下单手机号: '18676726591',
					支付方式: '-',
					下单时间: '2024-04-01 01:36:16',
					支付时间: '2024-04-01 01:36:16',
					支付时间补款: '2024-04-01 01:36:16',
					完成时间: '-'
				})
			},
			cardDetails: {
				type: Object,
				default: () => new Array(3).fill({
					标题: '2023 Critical Blow #BT22138 Bursting Rage SEC ritical Blow #BT',
					卡牌编号: '0016807181',
					卡品: 'NEAR MINT 8',
					签字: 'AUTO 10',
					价格: '¥440',
				}),
			}
		},
		data: () => {
			return {
				orderDetailsIdx: {
					送评批次: 0,
					送评机构: 1,
					送评服务: 2,
					张数: 3,
					补款: 4,
					总价: 4,
					订单号: 5
				},
				paymentDetailsIdx: {
					总价: 0,
					补款: 1,
					订单号: 2,
					下单微信: 3,
					下单手机号: 4,
					支付方式: 5,
					下单时间: 6,
					支付时间: 7,
					支付时间补款: 8,
					完成时间: 9
				},
				cardDetailsIdx: {
					标题: 0,
					价格: 0,
					卡牌编号: 1,
					卡品: 2,
					签字: 3,
				}
			}
		},
		computed: {
			dataCard() {
				const arr = [];
				if (this.orderDetails) {
					arr.push({
						title: '订单明细',
						data: Object.entries(this.orderDetails)
							.map(([key, value]) => ({
								title: key,
								value: value,
								isValueBole: !['订单号'].includes(key),
								isLine: ['张数'].includes(key),
								isCody: ['订单号'].includes(key)
							}))
							.sort((a, b) => this.orderDetailsIdx[a.title] - this.orderDetailsIdx[b.title]),
					});
				}
				if (this.paymentDetails) {
					arr.push({
						title: '支付信息',
						data: Object.entries(this.paymentDetails)
							.map(([key, value]) => ({
								title: key,
								value: value,
								isValueBole: ['总价', '补款'].includes(key),
								isLine: ['订单号', '支付方式'].includes(key),
								isCody: ['订单号'].includes(key)
							}))
							.sort((a, b) => this.paymentDetailsIdx[a.title] - this.paymentDetailsIdx[b.title]),
					});
				}

				if (this.cardDetails?.length > 0) {
					arr.push({
						title: '卡牌明细',
						data: this.cardDetails.reduce((pre, cur, index) => {
							const newCur = {
								...cur
							}
							const title = newCur['标题'];
							const price = newCur['价格'];
							newCur[title] = price;
							delete newCur['标题'];
							delete newCur['价格'];

							this.cardDetailsIdx[title] = 0;

							const arr = Object.entries(newCur).map(([key, value]) => ({
								title: key,
								isTitleBole: [title].includes(key),
								value: value,
								isLine: ['签字'].includes(key) && index !== this.cardDetails
									.length - 1,
							})).sort((a, b) => this.cardDetailsIdx[a.title] - this.cardDetailsIdx[b
								.title]);

							pre.push(...arr);
							return pre
						}, [])
					});
				}

				console.log(arr);

				return arr;
			}
		},
		methods: {
			cody(res) {
				this.$setClipboardData({
					data: res,
					success: () => {
						uni.showToast({
							icon: "none",
							title: '复制成功',
							duration: 2000
						});
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.card-orderDetails {
		width: 100%;
		min-height: 120px;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 32rpx;
		background: #FFFFFF;
		box-shadow: 0px 4px 20px 0px #0000000D;

		text {
			font-family: PingFang SC;
			font-weight: 400;
			font-size: 26rpx;
			line-height: 32rpx;
			letter-spacing: 0px;
			vertical-align: middle;
			color: #00000054;
		}

		.section {
			display: flex;
			flex-direction: column;

			.line {
				width: 100%;
				border: 1rpx dashed #E5E5EA
			}


			.title {}

			.title-bole {
				flex: 1;
				color: #000000FC;
				font-weight: 600;
				font-size: 30rpx;
				line-height: 20px;
				letter-spacing: -0.23px;
				margin-bottom: 8rpx;
			}

			.value {
				flex: 1;
				text-align: right;
				color: #000000A8;
			}

			.value-500 {
				font-weight: 500;
				color: #000000FC;
			}

			.value-bole {
				color: #000000FC;
				font-weight: 600;
				font-size: 32rpx;
				line-height: 21px;
				letter-spacing: -0.31px;
			}

			.dashed-line {
				width: 100%;
				border: 1px solid #E5E5EA;
			}
		}
	}
</style>