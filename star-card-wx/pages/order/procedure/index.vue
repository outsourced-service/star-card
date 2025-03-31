<template>
	<view class="procedure-page">
		<view class="procedure-page-top">
			<view class="page-top-alert">
				还有
				<view class="top-alert-day">{{ calculateDaysDifference(evaluation.end_data, Date.now()) }}</view>
				天截单，之后抵达订单将被顺延至下一车
			</view>
			<view class="page-top-steps">
				<uv-steps :current="stepsCurrent" activeColor="#fea800">
					<uv-steps-item title="基础信息"></uv-steps-item>
					<uv-steps-item title="附加服务"></uv-steps-item>
					<uv-steps-item title="快递信息"></uv-steps-item>
				</uv-steps>
			</view>
			<orderPackageCard v-if="stepsCurrent == 2" :data="order"></orderPackageCard>
		</view>
		<view class="procedure-page-form" v-if="stepsCurrent == 0">
			<view class="page-form">
				<view class="page-form-title">寄回地址</view>
				<view class="page-form-card">
					<formAddress></formAddress>
				</view>
			</view>
			<view class="page-form">
				<view class="page-form-title">送评信息</view>
				<view class="page-form-card">
					<formInfo :data="evaluation.evaluation_insurance"></formInfo>
				</view>
			</view>
			<view class="page-form">
				<view class="page-form-title">其他信息</view>
				<view class="page-form-card">
					<formOther></formOther>
				</view>
			</view>
		</view>
		<view class="procedure-page-form" v-if="stepsCurrent == 1">
			<view class="page-form">
				<view class="page-form-title">附加服务</view>
				<view class="page-form-card">
					<formAdditional></formAdditional>
				</view>
			</view>
		</view>
		<view class="procedure-page-form" v-if="stepsCurrent == 2">
			<view class="page-form">
				<view class="page-form-top">
					<view class="page-form-title">寄出快递信息<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon></view>
					<view class="page-form-guide">包装指南</view>
				</view>
				<view class="page-form-tip">请准确填写快递单号，并妥善包装卡牌；因玩家自身造成的包裹丢失、损坏、延误等，由玩家自行负责。</view>
				<view class="page-form-card">
					<courierCard :data="addressInfo"></courierCard>
				</view>
			</view>
		</view>
		<view class="procedure-page-nav">
			<view class="page-nav-price" v-if="stepsCurrent == 0 || stepsCurrent == 1">
				<view class="nav-price-text">预计总价</view>
				<view class="nav-price-icon">￥</view>
				<view class="nav-price-num">5000</view>
				<view class="nav-price-tip">查看明细</view>
				<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold></uv-icon>
			</view>
			<view class="page-nav-safety" v-else>
				<!-- <uv-radio-group v-model="is_safety" @change="handleSafety">
					<uv-radio shape="circle" activeColor="#fea800" name="safety"></uv-radio>
				</uv-radio-group> -->
				<uv-radio shape="circle" activeColor="#fea800" name="safety" @change="handleSafety" v-model="is_safety"></uv-radio>
				我已知晓
				<view class="nav-safety">
					《代送评注意事项》
				</view>
				与
				<view class="nav-safety">
					《保险说明》
				</view>
			</view>
			<view class="page-nav-line"></view>
			<view class="page-nav-button-one" v-if="stepsCurrent == 0">
				<uv-button text="下一步" color="#fea800" size="large" shape="circle" @click="handleNext"></uv-button>
			</view>
			<view class="page-nav-button-two" v-if="stepsCurrent == 1">
				<view class="nav-button">
					<uv-button text="上一步" color="#fff6e5" size="large" shape="circle" :customStyle="{color: 'rgba(254, 168, 0, 1)'}" @click="handleBack"></uv-button>
				</view>
				<view class="nav-button">
					<uv-button text="下一步" color="#fea800" size="large" shape="circle" @click="handleNext"></uv-button>
				</view>
			</view>
			<view class="page-nav-button-two" v-if="stepsCurrent == 2">
				<view class="nav-button">
					<uv-button text="稍后寄出" :plain="true" color="#fea800" size="large" shape="circle" :customStyle="{color: 'rgba(254, 168, 0, 1)'}"></uv-button>
				</view>
				<view class="nav-button">
					<uv-button text="确认寄出" color="#fea800" size="large" shape="circle"></uv-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import formAddress from './components/formAddress.vue';
	import formInfo from './components/formInfo.vue';
	import formOther from './components/formOther.vue';
	import formAdditional from './components/formAdditional.vue';
	import orderPackageCard from './components/orderPackageCard.vue';
	import courierCard from './components/courierCard.vue';
	import { timestampToDateString, calculateDaysDifference } from '../getData';
	import {
		evaluation
	} from '/mock/evaluation';
	import {
		order
	} from '/mock/order';
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
			formAddress,
			formInfo,
			formOther,
			formAdditional,
			orderPackageCard,
			courierCard
		},
		data() {
			return {
				evaluation: evaluation,
				order: order,
				stepsCurrent: 0,
				is_safety: '',
				addressInfo: {
					name: '王先生',
					phone: 13256322563,
					address: '广东省深圳市南山区打石一路与留新三街交叉口西北方向84米万科云城六期3栋A座1106',
					courier_name: '顺丰速运'
				}
			}
		},
		methods: {
			timestampToDateString,
			calculateDaysDifference,
			handleNext() {
				this.stepsCurrent++
			},
			handleBack() {
				this.stepsCurrent--
			},
			handleSafety(value) {
				if(this.is_safety == value) {
					this.is_safety = ''
					console.log(this.is_safety)
				} else {
					this.is_safety = 'safety'
					console.log(this.is_safety)
				}
			}
		},
		mounted() {
			this.timestampToDateString()
			this.calculateDaysDifference()
		}
	}
</script>

<style lang="scss" scoped>
	.procedure-page {
		background-color: #f2f2f7;
		width: 100vw;
		padding-bottom: 300rpx;
	}
	
	.page-top-alert {
		background-color: rgba(255, 246, 229, 1);
		display: flex;
		padding: 12rpx 0;
		justify-content: center;
		align-items: center;
		gap: 16rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(224, 148, 0, 1);
	}
	
	.top-alert-day {
		color: rgba(224, 148, 0, 1);
		font-weight: 600;
		font-size: 26rpx;
	}
	
	.page-top-steps {
		background-color: #ffffff;
		margin: 56rpx 32rpx 0 32rpx;
		border-radius: 32rpx;
		padding: 40rpx 32rpx 32rpx 32rpx;
	}
	
	.procedure-page-form {
		display: flex;
		flex-direction: column;
		gap: 56rpx;
		margin: 56rpx 0;
	}
	
	.page-form {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
		padding: 0 32rpx;
	}
	
	.page-form-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
		display: flex;
		gap: 8rpx;
		align-items: center;
	}
	
	.page-form-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-form-guide {
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.page-form-tip {
		font-weight: 400;
		font-size: 26rpx;
		line-height: 32rpx;
		color: rgba(0, 0, 0, 0.2);
	}
	
	.procedure-page-nav {
		display: flex;
		flex-direction: column;
		box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
		background-color: rgba(255, 255, 255, 1);
		// width: 100vw;
		width: calc(100vw - 64rpx);
		gap: 20px;
		border-top-width: 2rpx;
		padding: 24rpx 32rpx;
		z-index: 10;
		position: fixed;
		bottom: 0;
	}
	
	.page-nav-price {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
	}
	
	.nav-price-text {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.nav-price-icon {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.nav-price-num {
		font-weight: 600;
		font-size: 44rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.nav-price-tip {
		font-weight: 600;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-nav-safety {
		display: flex;
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
		margin-top: 4rpx;
	}
	
	.nav-safety {
		color: rgba(254, 168, 0, 1);
	}
	
	.page-nav-line {
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
	
	.page-nav-button-one {
		
	}
	
	.page-nav-button-two {
		display: flex;
		justify-content: space-between;
	}
	
	.nav-button {
		width: calc((100vw - 80rpx) / 2);
	}
</style>