<template>
	<view class="body-bage width-full">
		<cardModeFive/>
	</view>
</template>

<script>
	// import {
	// 	shops
	// } from '../../mock/shops';
	import cardModeFive from './components/cardModeFive.vue';

	export default {
		name: 'NearbyShops',
		components: {
			cardModeFive
		},
		data() {
			return {
				// shops: shops
			};
		},
		methods: {
			loadMore() {
				// 模拟加载更多数据
				console.log('加载更多数据');
			},
			refresh() {
				// 模拟刷新数据
				console.log('刷新数据');
			}
		}
	};
</script>

<style scoped>
	.page {
		position: relative;
		width: 100vw;
		height: 1138rpx;
	}
</style>
