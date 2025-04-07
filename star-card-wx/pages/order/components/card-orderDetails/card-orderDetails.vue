<template>
	<view class="width-full">
		<view class="card-orderDetails" v-for="(item, index) in data" :key="index">
			<view v-for="(item, index) in item.data" :key="index" class="section">
				<view v-for="(item, index) in item.data" :key="index" class="flex-row align-start justify-between"
					style="gap:20px">
					<text class="title">{{ item.title }}</text>
					<text class="value">{{ item.value }}</text>
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
			default: () => ([{
				卡牌编号: '0016807181',
				卡品: 'NEAR MINT 8',
				签字: 'AUTO 10',
				价格: '¥440',
				描述: '2023 Critical Blow #BT22138 Bursting Rage SEC ritical Blow #BT'
			}])
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
				订单号: 5
			},
			paymentDetailsIdx: {
				总价: 0,
				补款: 1,
				订单号: 2,
				下单微信: 3,
				下单手机号: 4,
			},
			cardDetailsIdx: {
				描述: 0,
				卡牌编号: 1,
				卡品: 2,
				签字: 3,
				价格: 0,
			}
		}
	},
	computed: {
		data() {
			const arr = [];
			if (this.orderDetails) {
				arr.push({
					title: '订单明细',
					data: Object.entries(this.orderDetails)
						.map(([key, value]) => ({
							title: key,
							value: value
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
							value: value
						}))
						.sort((a, b) => this.paymentDetailsIdx[a.title] - this.paymentDetailsIdx[b.title]),
				});
			}
			if (this.cardDetails) {
				arr.push({
					title: '卡牌信息',
					data: this.cardDetails.map((item) =>
						Object.entries(item).map(([key, value]) => ({
							title: key,
							value: value
						}))
					),
				});
			}
			console.log(arr);
			return arr;
		}
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
			color: #000000FC;
			font-weight: 600;
			font-size: 30rpx;
			line-height: 20px;
			letter-spacing: -0.23px;
		}

		.value {
			flex: 1;
			text-align: right;
			color: #000000A8;
		}

		.value-bole {
			font-weight: 500;
			color: #000000FC;
		}

		.dashed-line {
			width: 100%;
			border: 1px solid #E5E5EA;
		}
	}
}
</style>