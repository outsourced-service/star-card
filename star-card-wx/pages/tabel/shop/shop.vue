<template>
	<view class="width-full height-full flex" style="background: #F2F3F6;">
		
		<!-- <cardOrderDetails  /> -->
		<!-- <cardCardbookHorizontalList/>
		<cardPictureList />
		<cardAddress />
		<cardShop style="background-color: #0e0e0e;"/> -->
		<!-- 底部导航栏 -->
		<tabBar value='商城' />
	</view>
</template>

<script>
	import * as list from "@/api/list/index"
	
	import cardPictureList from '@/pages/order/components/card-pictureList/card-pictureList.vue';
	import cardAddress from '@/pages/order/components/card-address/card-address.vue';
	import cardOrderDetails from '@/pages/order/components/card-orderDetails/card-orderDetails.vue';
	import cardShop from '@/pages/profile/components/card-shop/card-shop.vue';
	import cardCardbookHorizontalList from '@/pages/profile/components/card-cardbook-horizontalList/card-cardbook-horizontalList.vue';
	import cardOrderDetailsData from "@/mock/card-orderDetails.js";
	export default {
		components: {
			cardPictureList,
			cardAddress,
			cardShop,
			cardCardbookHorizontalList,
			cardOrderDetails
		},
		componentPlaceholder: {},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				cardOrderDetailsData:cardOrderDetailsData
			}
		},
		methods: {

		},
		computed: {

		},
		onLoad() {
			list.getCardList()
		},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
		onPageScroll(e) {

		},
	}
</script>

<style scoped lang="scss"></style>