<template>
	<view class="container">
		<view v-for="(item, index) in urls" :key="index" class="container-album">
			<uv-image lazyLoad :src="item" width="100%" height="220rpx"></uv-image>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			urls: {
				type: Array,
				default: () => new Array(10).fill(
					"https://s3-alpha-sig.figma.com/img/d482/b2b0/4cedb767c246b857db81b04cbf5d8cac?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sgoAVOWC5vAKqRt2pbyTwHR4arazraelJfB5KwYpvMDujHKQFZjgvGjYGWHzkm1PUBiQttMAReAfFpGpbQwp31jfKELeAbTHVLMHy2lRJnGgrrVp1y17hnyt5Dxc-EeqC7swAIOhkAWfTNpKhjAjRWP8B~g16YR4wPHDh82u5jOWxxG845I~FiHzVLnq2n3lBuwyjUbizupS8lb97CJ3cu7DGXX4oVPlhGPJoYF8hpo5Ogs8t1jxL1jn3YmZvzTn4r6o5P7Pyh8vgcDkqjqMFYRX56kh70buaqTVE9zX24rTx7aUupglcwZv94xHSMcNBg5y0qRVpJjom2JjCO939w__"
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
				orderInfo: {}
			}
		},
		emit: [],
		methods: {
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
		// gap: 4px;
		padding: 32rpx 24rpx;
		border-radius: 32rpx;
		box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
		
		display: flex;
		flex-wrap: wrap;
		gap: 8rpx; // 项目间距
		justify-content: space-between;
	}
	
	.container-album {
		// width: calc((100vw - 64rpx - 16rpx - 48rpx) / 3);
		// width: calc((100% - 16rpx - 48rpx) / 3);
		/* 优化宽度计算 */
		flex: 0 0 calc(33.333% - 6rpx); // 保持三列布局
		position: relative;
		border-radius: 16rpx;
		overflow: hidden;
		transition: all 0.3s ease;
	}
	
	/* 最后一行左对齐（当项目不足3的倍数时） */
	.container-album:nth-child(3n+1):nth-last-child(-n+3) {
		margin-right: auto;
	}
</style>
