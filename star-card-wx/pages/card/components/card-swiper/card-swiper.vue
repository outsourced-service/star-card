<template>
	<view class="swipers-page">
		<!-- <uv-swiper :list="data" indicator indicatorMode="dot" circular>
			<template v-slot:default="{ item }">
				<uv-image :src="item.url" mode="aspectFit" class="swiper-image"></uv-image>
			</template>
		</uv-swiper> -->
		<swiper class="swiper-box" :current="swiperIndex">
			<swiper-item v-for="(item, index) in 3" :key="index">
				<view class="swiper-item">
					<text style="color: #fff; font-size: 32px;">{{index+1}}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			data: {
				type: Array,
				default: () => [{
					url: 'https://s3-alpha-sig.figma.com/img/d482/b2b0/4cedb767c246b857db81b04cbf5d8cac?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sgoAVOWC5vAKqRt2pbyTwHR4arazraelJfB5KwYpvMDujHKQFZjgvGjYGWHzkm1PUBiQttMAReAfFpGpbQwp31jfKELeAbTHVLMHy2lRJnGgrrVp1y17hnyt5Dxc-EeqC7swAIOhkAWfTNpKhjAjRWP8B~g16YR4wPHDh82u5jOWxxG845I~FiHzVLnq2n3lBuwyjUbizupS8lb97CJ3cu7DGXX4oVPlhGPJoYF8hpo5Ogs8t1jxL1jn3YmZvzTn4r6o5P7Pyh8vgcDkqjqMFYRX56kh70buaqTVE9zX24rTx7aUupglcwZv94xHSMcNBg5y0qRVpJjom2JjCO939w__'
				}, {
					url: 'https://s3-alpha-sig.figma.com/img/d482/b2b0/4cedb767c246b857db81b04cbf5d8cac?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sgoAVOWC5vAKqRt2pbyTwHR4arazraelJfB5KwYpvMDujHKQFZjgvGjYGWHzkm1PUBiQttMAReAfFpGpbQwp31jfKELeAbTHVLMHy2lRJnGgrrVp1y17hnyt5Dxc-EeqC7swAIOhkAWfTNpKhjAjRWP8B~g16YR4wPHDh82u5jOWxxG845I~FiHzVLnq2n3lBuwyjUbizupS8lb97CJ3cu7DGXX4oVPlhGPJoYF8hpo5Ogs8t1jxL1jn3YmZvzTn4r6o5P7Pyh8vgcDkqjqMFYRX56kh70buaqTVE9zX24rTx7aUupglcwZv94xHSMcNBg5y0qRVpJjom2JjCO939w__'
				}]
			}
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
		},
		data() {
			return {
				swiperIndex: 0
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
	.swipers-page {
		height: 600rpx;
		width: 100vw;
		gap: 40rpx;
		padding-bottom: 64rpx;
		border-radius: 16rpx;
		background: rgba(242, 243, 246, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: -40rpx;
		z-index: 8;
	}
	
	.swiper-box {
		height: 200px;
		background-color: #fff;
	}
	
	.swiper-item {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 200px;
			color: #fff;
		}
</style>