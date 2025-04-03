<template>
	<view class="card-picture-list">
		<uv-collapse ref="collapse" :value="value" :border="false" @close="onClose" @open="onOpen">
			<uv-collapse-item title="进度详情" name="1" :border="value.includes('1')">
				<uv-steps :current="current" direction="column" active-color="#fea800" active-icon="clock-fill">
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 0"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 0"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 0">
								<view class="steps-active-title" :style="current == 0 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">订单创建，待用户寄出</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">订单创建，待用户寄出</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 1"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 1"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 1">
								<view class="steps-active-title" :style="current == 1 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">用户已寄出</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">用户已寄出</view>
							</view>
						</template>
						<template v-slot:desc>
							<view :class="current >= 1 ? 'steps-desc-button' : 'steps-desc-text'">
								SF14472839247865011
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 2"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 2"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 2">
								<view class="steps-active-title" :style="current == 2 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">快递已签收</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">快递已签收</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 3"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 3"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 3">
								<view class="steps-active-title" :style="current == 3 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">已拆包入库，订单准备中</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">已拆包入库，订单准备中</view>
							</view>
						</template>
						<template v-slot:desc>
							<view class="steps-desc-text">
								若存在验品, 请等待我们联系您
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 4"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 4"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 4">
								<view class="steps-active-title" :style="current == 4 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">已完成验品，待发车</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">已完成验品，待发车</view>
							</view>
						</template>
						<template v-slot:desc>
							<view :class="current >= 4 ? 'steps-desc-button' : 'steps-desc-text'" @click="handleInspectionReport">
								验品报告
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 5"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 5"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 5">
								<view class="steps-active-title" :style="current == 5 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">已发车, 待抵达评级机构</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">已发车, 待抵达评级机构</view>
							</view>
						</template>
						<template v-slot:desc>
							<view class="steps-desc-text">
								一般将在2-5天内抵达
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 6"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 6"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 6">
								<view class="steps-active-title" :style="current == 6 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">抵达机构 Arrived</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">抵达机构 Arrived</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 7"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 7"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 7">
								<view class="steps-active-title" :style="current == 7 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">信息核对中 Research&ID</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">信息核对中 Research&ID</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 8"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 8"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 8">
								<view class="steps-active-title" :style="current == 8 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">评分中 Grading</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">评分中 Grading</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 9"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 9"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 9">
								<view class="steps-active-title" :style="current == 9 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">封装中 Assembly</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">封装中 Assembly</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 10"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 10"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 10">
								<view class="steps-active-title" :style="current == 10 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">已出分, 待机构寄回 Shipping</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">已出分, 待机构寄回 Shipping</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 11"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 11"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 11">
								<view class="steps-active-title" :style="current == 11 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">机构已寄出 Shipped</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">机构已寄出 Shipped</view>
							</view>
						</template>
						<template v-slot:desc>
							<view class="steps-desc-text">
								一般将在5-10天内抵达
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 12"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 12"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 12">
								<view class="steps-active-title" :style="current == 12 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">抵达星卡仓库, 打包中</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">抵达星卡仓库, 打包中</view>
							</view>
						</template>
						<template v-slot:desc>
							<view class="steps-desc-text">
								我们将尽量在1-3工作日内发出
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 13"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 13"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 13">
								<view class="steps-active-title" :style="current == 13 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">已寄回玩家</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">已寄回玩家</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
					<uv-steps-item customStyle="display: flex; align-items: baseline;">
						<template v-slot:icon>
							<uv-icon name="checkmark-circle-fill" color="#fea800" size="36rpx" v-if="current > 14"></uv-icon>
							<uv-icon name="clock-fill" color="#fea800" size="36rpx" v-else-if="current == 14"></uv-icon>
							<view v-else class="inactive-icon-circle"></view>
						</template>
						<template v-slot:title>
							<view class="steps-active" v-if="current >= 14">
								<view class="steps-active-title" :style="current == 14 ? 'color: rgba(254, 168, 0, 1); font-weight: 600;' : ''">玩家已签收，订单完成</view>
								<view class="steps-active-time">2024-05-21</view>
							</view>
							<view class="steps-inactive" v-else>
								<view class="steps-inactive-title">玩家已签收，订单完成</view>
							</view>
						</template>
						<template v-slot:desc>
							<view style="height: 36rpx;">
							</view>
						</template>
					</uv-steps-item>
				</uv-steps>
			</uv-collapse-item>
		</uv-collapse>
	</view>
</template>

<script>
	export default {
		name: "card-pictureList",
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				value: ['1'],
				current: 7,
				stepsList: [
					{
						title: '订单创建，待用户寄出', desc: '', time: '2024-05-21'
					}, {
						title: '用户已寄出', desc: '', time: '2024-05-21'
					}, {
						title: '快递已签收', desc: '', time: '2024-05-21'
					}, {
						title: '已拆包入库，订单准备中', desc: '', time: '2024-05-21'
					}, {
						title: '已完成验品，待发车', desc: '', time: '2024-05-21'
					}, {
						title: '已发车, 待抵达评级机构', desc: '', time: '2024-05-21'
					}, {
						title: '抵达机构 Arrived', desc: '', time: '2024-05-21'
					}, {
						title: '信息核对中 Research&ID', desc: '', time: '2024-05-21'
					}, {
						title: '评分中 Grading', desc: '', time: ''
					}, {
						title: '封装中 Assembly', desc: '', time: ''
					}, {
						title: '已出分, 待机构寄回 Shipping', desc: '', time: ''
					}, {
						title: '机构已寄出 Shipped', desc: '', time: ''
					}, {
						title: '抵达星卡仓库, 打包中', desc: '', time: ''
					}, {
						title: '已寄回玩家', desc: '', time: ''
					}, {
						title: '玩家已签收，订单完成', desc: '', time: ''
					}
				]
			};
		},
		emit: ['handleInspectionReport'],
		methods: {
			handleInspectionReport() {
				this.$emit('handleInspectionReport')
			},
			onOpen(v) {
				this.value.push(v)
			},
			onClose(v) {
				this.value = this.value.find(i => i != v) || []
			}
		}
	}
</script>

<style lang="scss">
	.card-picture-list {
		width: 100%;
		min-height: 62.98rpx;
		border-radius: 32rpx;
		box-shadow: 0px 2px 8px 0px #0000001A;

		::v-deep .uv-collapse-item__content__text {
			padding: 16px;
		}

		::v-deep .uv-cell__body {
			padding: 38.17rpx 22.9rpx 22.9rpx 22.9rpx;

			.uv-cell__title {
				flex-direction: row;
				align-items: center;

				.uv-cell__title-text {
					color: #000000FC;
					font-family: PingFang SC;
					font-weight: 600;
					font-size: 32rpx;
					line-height: 40.08rpx;
					margin-right: 8rpx;
				}
			}
		}
		
		::v-deep .uv-steps-item__content {
			margin-left: 24rpx !important;
			margin-top: 0 !important;
		}
		
		::v-deep .uv-steps-item__content--column {
			margin-left: 24rpx !important;
			margin-top: 0 !important;
		}
	}
	
	.steps-active {
		display: flex;
		justify-content: space-between;
	}
	
	.steps-active-title {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.steps-active-time {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.2);
	}
	
	.steps-inactive-title {
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.steps-desc-button {
		font-weight: 600;
		font-size: 22rpx;
		line-height: 140%;
		text-decoration: underline;
		text-decoration-style: solid;
		text-decoration-offset: 0%;
		text-decoration-thickness: 0%;
		color: rgba(254, 168, 0, 1);
		margin-top: 4rpx;
	}
	
	.steps-desc-text {
		margin-top: 4rpx;
		font-size: 22rpx;
		line-height: 140%;
		letter-spacing: 0%;
		color: rgba(0, 0, 0, 0.33);
		height: 36rpx;
	}
	
	.inactive-icon-circle {
		width: 32rpx;
		height: 32rpx;
		gap: 16rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		background: rgba(242, 243, 246, 1);
		border: 2rpx solid rgba(209, 209, 214, 1);
	}
</style>