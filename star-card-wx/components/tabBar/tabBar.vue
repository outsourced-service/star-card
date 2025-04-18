<template>
	<view class="tabbar" style="z-index: 99;">
		<uv-tabbar :value="value" @change="handleTabber" activeColor="#fea800" inactiveColor="rgba(0, 0, 0, 0.2)"
			iconSize="38rpx" :custom-style="{padding: '14rpx'}" safeAreaInsetBottom>
			<uv-tabbar-item text="主页">
				<template v-slot:active-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e651ccc7e.png"></image>
				</template>
				<template v-slot:inactive-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e5e777dd7.png"></image>
				</template>
			</uv-tabbar-item>
			<!-- <uv-tabbar-item text="商城">
				<template v-slot:active-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e69267f04.png"></image>
				</template>
				<template v-slot:inactive-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e6f323d2f.png"></image>
				</template>
			</uv-tabbar-item> -->
			<!-- <uv-tabbar-item text="" iconSize="88rpx"
				icon="https://img.picui.cn/free/2025/03/19/67da51c2e9604.png"></uv-tabbar-item> -->
			<uv-tabbar-item text="订单">
				<template v-slot:active-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e76ca765c.png"></image>
				</template>
				<template v-slot:inactive-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e79447a6e.png"></image>
				</template>
			</uv-tabbar-item>
			<uv-tabbar-item text="我的">
				<template v-slot:active-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e7e0a309c.png"></image>
				</template>
				<template v-slot:inactive-icon>
					<image class="icon" src="https://img.picui.cn/free/2025/03/14/67d3e7f615f73.png"></image>
				</template>
			</uv-tabbar-item>
		</uv-tabbar>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number, null],
				default: () => ""
			}
		},
		data() {
			return {
				tabbar: [{
					title: "主页",
					path: "pages/tabel/home/home"
				},
				{
					title: "商城",
					path: "pages/tabel/shop/shop"
				}, {
					title: "卡牌",
					path: "pages/tabel/card/card"
				}, 
				{
					title: "订单",
					path: "pages/tabel/order/order"
				}, {
					title: "我的",
					path: "pages/tabel/profile/profile"
				}],
			}
		},
		mounted() {},
		methods: {
			handleTabber(index) {
				uni.switchTab({
					url: `/${this.tabbar[index].path}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	:deep .u-icon__icon {
		font-weight: 900 !important;
	}

	.icon {
		width: 48rpx;
		height: 48rpx;
		padding-bottom: 6rpx;
	}

	.icon-add {
		width: 88rpx;
		height: 88rpx;
	}
</style>