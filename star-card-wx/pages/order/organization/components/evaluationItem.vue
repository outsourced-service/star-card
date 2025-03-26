<template>
	<view class="evaluation-item">
		<view class="evaluation-item-left">
			<view class="item-left-avatar">
				<uv-avatar :src="data.cover_image" size="140rpx"></uv-avatar>
			</view>
			<view class="item-left-info">
				<view class="left-info">
					<view class="left-info-top">
						<view class="info-top-name">{{ data.title }}</view>
						<view class="info-top-level">{{ data.level_name }}</view>
					</view>
					<view class="left-info-tag">
						<view class="info-tag" v-for="(item, index) in data.tag" :key="index">{{item}}</view>
					</view>
					<view class="left-info-description">
						<uv-text :lines="1" :text="data.description"></uv-text>
					</view>
				</view>
				<view class="left-info-address">
					<uv-icon name="map" color="rgba(254, 168, 0, 1)" size="24rpx"></uv-icon>
					<view class="info-address">{{ data.city }}{{ data.area }}</view>
					<view class="info-address-distance">距您2.5km</view>
				</view>
			</view>
		</view>
		<view class="evaluation-item-right">
			<view>联系</view>
			<uv-icon name="arrow-right" color="rgba(254, 168, 0, 1)" size="28rpx" bold></uv-icon>
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
	  	}
	  },
	  data() {
	  	return {
	  	}
	  },
	  options: {
	  	styleIsolation: 'shared'
	  },
	  methods: {
	  },
	  mounted() {
	  }
	}
</script>

<style lang="scss" scoped>
	.evaluation-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 32rpx 0;
	}
	
	.evaluation-item-left {
		display: flex;
		gap: 32rpx;
		align-items: center;
		width: calc(100vw - 64rpx - 80rpx);
	}
	
	.item-left-info {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.left-info {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.left-info-top {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.info-top-name {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.info-top-level {
		display: flex;
		gap: 3px;
		padding: 6rpx 20rpx;
		border-radius: 2000rpx;
		background: rgba(254, 168, 0, 0.2);
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.left-info-tag {
		display: flex;
		gap: 8rpx;
	}
	
	.info-tag {
		display: flex;
		gap: 6rpx;
		padding-top: 2rpx;
		padding-right: 16rpx;
		padding-bottom: 2rpx;
		padding-left: 16rpx;
		border-radius: 2000rpx;
		background-color: rgba(0, 0, 0, 0.05);
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.left-info-description {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.left-info-address {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
	}
	
	.info-address {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.info-address-distance {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.33);
		margin-left: 12rpx;
	}
	
	.evaluation-item-right {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}
</style>