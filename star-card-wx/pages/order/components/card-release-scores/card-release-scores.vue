<template>
	<view class="container">
		<view v-for="(item, index) in cardInfo" :key="index" @click="handleCard">
			<view class="container-item">
				<uv-image :src="item.image.url" width="200rpx" height="200rpx"></uv-image>
				<view class="container-item-right">
					<view class="item-right-info">
						<view class="right-info-id">{{item.id}}</view>
						<view class="right-info">
							<view class="right-info-title">卡品 <span class="right-info-text">{{item.card_quality}}</span></view>
							<view class="right-info-title">签字 <span class="right-info-text">{{item.sign}}</span></view>
						</view>
						<view class="right-info-name">{{item.name}}</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="32rpx"></uv-icon>
				</view>
			</view>
			<view class="container-item-line" v-if="index != cardInfo.length - 1"></view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			cardInfo: {
				type: Object,
				default: () => new Array(10).fill(
					{
						image: {
							url: 'https://s3-alpha-sig.figma.com/img/d482/b2b0/4cedb767c246b857db81b04cbf5d8cac?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sgoAVOWC5vAKqRt2pbyTwHR4arazraelJfB5KwYpvMDujHKQFZjgvGjYGWHzkm1PUBiQttMAReAfFpGpbQwp31jfKELeAbTHVLMHy2lRJnGgrrVp1y17hnyt5Dxc-EeqC7swAIOhkAWfTNpKhjAjRWP8B~g16YR4wPHDh82u5jOWxxG845I~FiHzVLnq2n3lBuwyjUbizupS8lb97CJ3cu7DGXX4oVPlhGPJoYF8hpo5Ogs8t1jxL1jn3YmZvzTn4r6o5P7Pyh8vgcDkqjqMFYRX56kh70buaqTVE9zX24rTx7aUupglcwZv94xHSMcNBg5y0qRVpJjom2JjCO939w__'
						},
						id: '0016807181',
						card_quality: 'NEar mint 8',
						sign: 'Auto 10',
						name: '2023 Critical Blow #BT22138 Bursting Rage SEC ritical Blow #BT'
					}
				)
			},
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
		},
		data() {
			return {
			}
		},
		emit: ['handleCard'],
		methods: {
			handleCard() {
				this.$emit('handleCard', this.cardInfo.id)
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
		background-color: #fff;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 32rpx 24rpx;
		border-radius: 32rpx;
		box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
	}
	
	.container-item {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}
	
	.container-item-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24rpx;
	}
	
	.item-right-info {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
	}
	
	.right-info-id {
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.right-info {
		display: flex;
		flex-direction: column;
	}
	
	.right-info-title {
		display: flex;
		gap: 8rpx;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.right-info-text {
		font-weight: 600;
		font-size: 24rpx;
		text-transform: uppercase;
		color: rgba(254, 168, 0, 1);
	}
	
	.right-info-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3; /* 限制显示3行 */
		-webkit-box-orient: vertical;
		max-width: 360rpx;
	}
	
	.container-item-line {
		border: 1rpx dashed rgba(229, 229, 234, 1);
		border-width: 2rpx;
		margin: 32rpx 0;
	}
</style>
