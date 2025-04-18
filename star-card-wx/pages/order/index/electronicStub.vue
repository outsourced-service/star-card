<template>
	<view class="container">
		<tabs :tabList="tabList" :activeTextSize="'28rpx'" :inactiveTextSize="'28rpx'" @tabChange="tabChange"></tabs>
		<view class="container-data">
			<view class="container-data-card" v-if="tab == '订单明细'">
				<cardOrderDetails :orderDetails="orderDetails" :title="tab"></cardOrderDetails>
				<view class="data-card-item">
					<orderFormPopupDetail :is_only_detail="true" :formData="formData"></orderFormPopupDetail>
				</view>
			</view>
			<view class="container-data-card" v-else-if="tab == '补款明细'">
				<cardOrderDetails :orderDetails="orderAdditionalDetails" :cardDetails="cardDetails" :title="tab"></cardOrderDetails>
			</view>
			<view class="container-data-card" v-else>
				<cardOrderDetails :paymentDetails="paymentDetails" :title="tab"></cardOrderDetails>
			</view>
		</view>
	</view>
</template>

<script>
	import cardOrderDetails from "../components/card-orderDetails/card-orderDetails.vue";
	
	export default {
		components: {
			cardOrderDetails
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
		},
		data() {
			return {
				tabList: [
					{ name: '订单明细' },
					{ name: '补款明细' },
					{ name: '支付信息' }
				],
				tab: '订单明细',
				orderAdditionalDetails: {
					送评批次: '5月31日批次',
					送评机构: 'PSA中国送',
					送评服务: '慢速增值ValueBulk/卡品+签字双评/超过一行折行显示与【送评服务】标题间隔20px',
					张数: '43张',
					补款: '¥880',
					订单号: '20389724896856'
				},
				orderDetails: {
					送评批次: '5月31日批次',
					送评机构: 'PSA中国送',
					送评服务: '慢速增值ValueBulk/卡品+签字双评/超过一行折行显示与【送评服务】标题间隔20px',
					张数: '43张',
					总价: '¥5000',
					订单号: '20389724896856'
				},
				paymentDetails: {
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
				},
				cardDetails: new Array(3).fill({
					标题: '2023 Critical Blow #BT22138 Bursting Rage SEC ritical Blow #BT',
					卡牌编号: '0016807181',
					卡品: 'NEAR MINT 8',
					签字: 'AUTO 10',
					价格: '¥440',
				})
			}
		},
		emit: [],
		methods: {
			tabChange(name) {
				this.tab = name
			}
		},
		onLoad() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
	}
	
	.container-data {
		padding: 40rpx 32rpx;
	}
	
	.container-data-card {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.data-card-item {
		border-radius: 32rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
		padding: -8rpx 0;
	}
</style>
