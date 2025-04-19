<template>
	<view class="page-fake-form">
		<view class="fake-form">
			<view class="fake-form-item">
				<view class="form-item-title">名字</view>
				<view class="form-item-right" @click="changeData('name')">
					<view class="item-right-data">
						<view class="right-data-text" v-if="data.user_name">{{data.user_name}}</view>
						<view class="right-no-data" v-else>输入名字</view>
						<view v-if="data.is_shop" class="right-data-shop">店</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
			<view class="fake-form-line"></view>
			<view class="fake-form-item">
				<view class="form-item-title">星卡号</view>
				<view class="form-item-right">
					<view class="item-right-data">
						<view class="right-data-text">{{data.user_id}}</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
			<view class="fake-form-line"></view>
			<view class="fake-form-item">
				<view class="form-item-title">背景图</view>
				<view class="form-item-right">
					<view class="item-right-data">
						<uv-image lazyLoad :src="data.bg_img" radius="8rpx" width="96rpx" height="96rpx"></uv-image>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
		</view>
		<view class="fake-form">
			<view class="fake-form-item">
				<view class="form-item-title">简介</view>
				<view class="form-item-right" @click="changeData('signature')">
					<view class="item-right-data">
						<view class="right-data-text" v-if="data.signature">{{data.signature}}</view>
						<view class="right-no-data" v-else>输入简介</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
		</view>
		<view class="fake-form">
			<view class="fake-form-item">
				<view class="form-item-title">实名认证</view>
				<view class="form-item-right">
					<view class="item-right-data">
						<view class="right-data-text" v-if="data.is_accreditation">已认证</view>
						<view class="right-no-data" v-else>未实名</view>
						<uv-icon v-if="data.is_accreditation" name="checkmark-circle-fill" color="rgba(254, 168, 0, 1)" size="32rpx"></uv-icon>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
		</view>
		<view class="fake-form" v-if="data.is_shop">
			<view class="fake-form-item">
				<view class="form-item-title">店铺地址</view>
				<view class="form-item-right" @click="changeData('address')">
					<view class="item-right-data">
						<view class="right-data-text" v-if="data.address">{{data.address.address}}{{data.address.address_detail}}{{data.address.house}}</view>
						<view class="right-no-data" v-else>输入店铺地址</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
			<view class="fake-form-line"></view>
			<view class="fake-form-item">
				<view class="form-item-title">营业时间</view>
				<view class="form-item-right" @click="changeData('time')">
					<view class="item-right-data">
						<view class="right-data-text" v-if="data.time">{{data.time}}</view>
						<view class="right-no-data" v-else>输入营业时间</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
			<view class="fake-form-line"></view>
			<view class="fake-form-item">
				<view class="form-item-title">经营服务</view>
				<view class="form-item-right" @click="changeData('service')">
					<view class="item-right-data">
						<view class="right-data-text" style="-webkit-line-clamp: 1" v-if="data.service">{{data.service}}</view>
						<view class="right-no-data" v-else>选择经营服务</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
			<view class="fake-form-line"></view>
			<view class="fake-form-item">
				<view class="form-item-title">经营类别</view>
				<view class="form-item-right" @click="changeData('serviceType')">
					<view class="item-right-data">
						<view class="right-data-text" style="-webkit-line-clamp: 1" v-if="data.serviceType">{{data.serviceType}}</view>
						<view class="right-no-data" v-else>选择经营类别</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fake-form",
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		emit: ['changeData'],
		methods: {
			changeData(value) {
				this.$emit('changeData', value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-fake-form {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		width: 100%;
	}
	
	.fake-form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 32rpx;
		border-radius: 32rpx;
		padding: 32rpx;
		background-color: #fff;
	}
	
	.fake-form-item {
		display: flex;
		align-items: center;
		
	}
	
	.form-item-title {
		width: 160rpx;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.form-item-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: calc(100% - 160rpx);
		gap: 24rpx;
	}
	
	.item-right-data {
		width: calc(100% - 24rpx - 32rpx);
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.right-data-text {
		max-width: 100%;
		font-size: 30rpx;
		line-height: 40rpx;
		color: rgba(0, 0, 0, 0.9);
		display: -webkit-box;            /* 使用旧版弹性盒子布局 */
		-webkit-box-orient: vertical;    /* 设置垂直方向排列 */
		-webkit-line-clamp: 2;           /* 限制显示行数 */
		overflow: hidden;                /* 隐藏溢出内容 */
		text-overflow: ellipsis;         /* 添加省略号 */
		word-break: break-all;           /* 允许单词内换行 */
	}
	
	.right-no-data {
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.2);
	}
	
	.right-data-shop {
		width: 32rpx;
		height: 32rpx;
		border-radius: 8rpx;
		background: linear-gradient(180deg, #FEA800 0%, #FECB66 100%);
		font-size: 20rpx;
		color: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.fake-form-line {
		border-top: 1rpx solid rgba(229, 229, 234, 1)
	}
</style>