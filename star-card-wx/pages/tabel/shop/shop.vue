<template>
	<view class="width-full height-full flex" style="background-color: #fefefe;">
		<cardPictureList/>
		<!-- 底部导航栏 -->
		<tabBar :value='1' />
	</view>
</template>

<script>
	import cardPictureList from '@/pages/order/components/card-pictureList/card-pictureList.vue';

	export default {
		components: {
			cardPictureList
		},
		componentPlaceholder: {},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {

			}
		},
		methods: {

		},
		computed: {

		},
		onLoad() {},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
		onPageScroll(e) {

		},
	}
</script>

<style scoped lang="scss"></style>