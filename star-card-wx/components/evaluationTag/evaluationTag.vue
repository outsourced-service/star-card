<template>
	<view class="evaluation-tag" :style="evaluation.style_config.orderTagStyle">
		<view class="evaluation-tag-log">
			<image :src="evaluation.logo.url" style="height: 24rpx" mode="heightFix"></image>
		</view>
		<view class="evaluation-tag-text">
			{{evaluation.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			evaluation: {
				type: Object,
				default: () => ({})
			}
		},
		emit:[],
		mounted() {
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
	.evaluation-tag {
		height: 56rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12rpx 16rpx;
		gap: 8rpx;
		border-radius: 12rpx;
		font-weight: 600;
		font-size: 24rpx;
	}
	
	.evaluation-tag-log {
		// width: 100%; /* 容器宽度可以是任意值 */
		  height: 24rpx; /* 固定高度 */
		  overflow: hidden; /* 防止图片超出容器 */
	}
	
	// .evaluation-tag-log img {
	//   height: 24rpx; /* 图片高度与容器高度一致 */
	//   width: auto; /* 图片宽度自适应 */
	//   object-fit: contain; /* 保持图片比例并居中显示 */
	// }
</style>