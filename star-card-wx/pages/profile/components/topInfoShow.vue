<template>
	<view class="info-page">
		<view class="info-page-top">
			<view class="page-top-left">
				<uv-avatar :src="data.avatar.url" size="120rpx"></uv-avatar>
				<view class="top-left-conter">
					<view class="left-conter-name">{{data.nickname}}</view>
					<view class="left-conter-id">星卡号：{{data.user_ID}}<uv-image src="https://img.picui.cn/free/2025/03/18/67d95845056cc.png" mode="scaleToFill" width="24rpx" height="24rpx"/></view>
				</view>
			</view>
			<view class="page-top-right">
				<uv-image src="https://img.picui.cn/free/2025/03/18/67d958b22dd59.png" mode="scaleToFill" width="28rpx" height="28rpx"/>我的主页
			</view>
		</view>
		<view class="info-page-conter">
			<view class="page-conter-item">
				<view class="conter-item-number">{{data.available_points}}</view>
				<view class="conter-item-title">可用积分</view>
			</view>
			<view class="page-conter-item">
				<view class="conter-item-number">{{data.user_coupon_number}}</view>
				<view class="conter-item-title">我的券包</view>
			</view>
			<view class="page-conter-item">
				<view class="conter-item-number">{{data.coin_number}}</view>
				<view class="conter-item-title">我的卡币</view>
			</view>
		</view>
		<view v-if="false" class="info-page-bottom">
			<view class="page-bottom-top">
				<view class="bottom-top-vip">
					<view class="top-vip-name">{{data.viplevel.name}}</view>
					<view class="top-vip-type">{{data.user_viplevel.level_type}}</view>
				</view>
				<view class="bottom-top-rights">
					已解锁
					<view class="top-rights-number">{{data.viplevel.rights}}</view>项权益
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="28rpx" :bold="true">
				</uv-icon></view>
			</view>
			<view class="page-bottom-text">{{data.viplevel.description}}</view>
			<uv-line-progress :percentage="data.user_viplevel.points_number / data.viplevel.min_growth_value * 100" height="8rpx" activeColor="rgba(224, 148, 0, 1)" :showText="false" inactiveColor="rgba(255, 238, 204, 1)"></uv-line-progress>
			<view class="page-bottom-data">
				<view>{{data.user_viplevel.points_number}}/{{data.viplevel.min_growth_value}}</view>
				<view>还需{{data.viplevel.min_growth_value - data.user_viplevel.points_number}}积分即可升级</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	  props: {
	    data: {
	      type: Object,
	      required: true,
	      default: () => ({}),
	    },
	  },
	  data() {
	    return {
	    }
	  },
	  methods: {
	  },
	  options: {
	    styleIsolation: 'shared'
	  },
	  mounted() {
	  }
	};
</script>

<style scoped lang="scss">
	.info-page {
		// background: linear-gradient(to bottom, #fece70, #fbe1ae);
		// height: 440rpx;
		padding-top: 40rpx;
		padding-bottom: 20rpx;
	}
	
	.info-page-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 40rpx;
		margin-bottom: 40rpx;
	}
	
	.page-top-left {
		display: flex;
		align-items: center;
		gap: 32rpx;
	}
	
	.top-left-conter {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.left-conter-name {
		font-weight: 600;
		font-size: 40rpx;
		line-height: 50rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.left-conter-id {
		font-weight: 400;
		font-size: 22rpx;
		line-height: 26rpx;
		display: flex;
		align-items: center;
		color: rgba(0, 0, 0, 0.66);
		gap: 8rpx;
	}
	
	.page-top-right {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8rpx;
		font-weight: 600;
		font-size: 24rpx;
		line-height: 32rpx;
		color: rgba(0, 0, 0, 0.66);
		background-color: rgba(255, 255, 255, 0.56);
		height: 58rpx;
		width: 172rpx;
		border-top-left-radius: 200rpx;
		border-bottom-left-radius: 200rpx;
	}
	
	.info-page-conter {
		display: flex;
		gap: 28rpx;
		justify-content: space-between;
		padding: 0 56rpx;
		margin-bottom: 24rpx;
	}
	
	.page-conter-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8rpx;
		width: calc((100% - 120rpx) / 3);
	}
	
	.conter-item-number {
		font-weight: 600;
		font-size: 40rpx;
		line-height: 50rpx;
		color: rgba(254, 168, 0, 1);
		vertical-align: middle;
	}
	
	.conter-item-title {
		font-weight: 400;
		font-size: 24rpx;
		line-height: 32rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.info-page-bottom {
		margin: 0 40rpx;
		background: radial-gradient(100% 100% at 0% 0%, #FEA800 0%, #FECB66 100%);
		box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding: 32rpx 28rpx 24rpx 32rpx;
	}
	
	.page-bottom-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.bottom-top-vip {
		display: flex;
		gap: 8rpx;
	}
	
	.top-vip-name {
		font-weight: 600;
		font-size: 32rpx;
		line-height: 42rpx;
		color: rgba(102, 67, 0, 1);
	}
	
	.top-vip-type {
		background: rgba(255, 255, 255, 0.66);
		color: rgba(254, 168, 0, 1);
		font-weight: 600;
		font-size: 20rpx;
		padding: 6rpx 12rpx;
		border-radius: 1000px;
	}
	
	.bottom-top-rights {
		display: flex;
		gap: 8rpx;
		align-items: center;
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.top-rights-number {
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.page-bottom-text {
		font-weight: 400;
		font-size: 24rpx;
		line-height: 32rpx;
		margin-top: 8rpx;
		color: rgba(152, 101, 0, 1);
		margin-bottom: 28rpx;
	}
	
	.page-bottom-data {
		display: flex;
		justify-content: space-between;
		font-weight: 400;
		font-size: 11px;
		line-height: 13px;
		color: rgba(152, 101, 0, 1);
		margin-top: 12rpx;
	}
</style>