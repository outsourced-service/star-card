<template>
	<uv-navbar leftText="返回" :title="title" :fixed="fixed" :safeAreaInsetTop="true" :bgColor="bgColor" placeholder>
		<template #left>
			<slot>
				<view class="u-nav-slot" v-if="!leftText">
					<image style="height: 48rpx;" mode="heightFix" :src="logo"></image>
				</view>
				<text v-else class="u-nav-slot__left-text">{{leftText}}</text>
			</slot>
		</template>
	</uv-navbar>
</template>
<script setup>
	const props = defineProps({
		logo: {
			type: String,
			default: ''
		},
		leftText: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		fixed: {
			type: Boolean,
			default: false
		},
		bgColor:{
			type: String,
			default:'transparent'
		}
	})
</script>
<style lang="scss" scoped>
	.u-nav-slot {
		@include flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		opacity: 0.8;

		text {
			font-family: SourceHanSansCN, SourceHanSansCN;
			font-weight: bold;
			font-size: 36rpx;
			color: #FA601C;
			text-align: left;
			font-style: normal;
			margin-left: 8rpx;
		}

		&__left-text {
			font-size: 34rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 47.6rpx;
			color: rgba(0, 0, 0, 1);
			text-align: left;
			margin: 0 14rpx;
		}
	}
</style>