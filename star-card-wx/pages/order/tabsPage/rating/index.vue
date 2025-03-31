<template>
	<view class="page">
		<recordCard></recordCard>
		<!-- 标签页 -->
		<uv-sticky :offsetTop="offsetTop" >
			<tabPage :tabList="orderTabList" @tabChange="tabChange" @tagChange="tagChange" @handleSearch="handleSearch"></tabPage>
		</uv-sticky>
	</view>
</template>

<script>
	import recordCard from './components/recordCard.vue';
	import tabPage from './components/tabPage.vue';
	
	import { orderTabList } from '/mock/CategoryTagList.js'
	export default {
		components: {
			recordCard,
			tabPage
		},
		options: {
		    styleIsolation: 'shared'
		},
		data() {
			return {
				offsetTop: 0,
				orderTabList: orderTabList,
				tab: '未入库',
				tag: '全部'
			}
		},
		methods: {
			handleSearch() {
				uni.navigateTo({
					url: '/pages/order/tabsPage/rating/search'
				})
			},
			tabChange(name) {
				this.tab = name
			},
			tagChange(name) {
				this.tag = name
			},
			pullDownRefresh(){
				console.log("下来刷新");
			},
			reachBottom(){
				console.log("上拉加载");
			},
		},
		mounted() {
			// #ifndef WEB
			this.offsetTop = this.$system.BarHeight();
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 100vw;
		background-color: #fff;
	}
</style>