<template>
	<view class="page">
		<quickLink></quickLink>
		<uv-sticky :offsetTop="offsetTop" >
			<CategoryTagList :tabList="tabList" @tabChange="tabChange" @tagChange="tagChange"></CategoryTagList>
		</uv-sticky>
		<card-mode-three v-if="tab === '热门卡柜'" :data="cardUserList"></card-mode-three>
		<card-mode-four :data="cardAlbumList" v-else-if="tab === '热门卡册'"></card-mode-four>
		<card-mode-two :data="cardList" v-else></card-mode-two>
	</view>
</template>

<script>
	import cardModeTwo from '@/pages/home/components/cardModeTwo.vue';
	import cardModeThree from '@/pages/home/components/cardModeThree.vue';
	import cardModeFour from '@/pages/home/components/cardModeFour.vue';
	import CategoryTagList from '@/pages/home/components/CategoryTagList.vue';
	import quickLink from '@/pages/home/components/quickLink.vue';
	
	import { tabList } from '/mock/CategoryTagList.js'
	import {
		users
	} from '/mock/users';
	import {
		cardUserList,
		cardList,
		cardAlbumList
	} from '/mock/cards';
	
	export default {
		components: {
			cardModeTwo,
			cardModeThree,
			cardModeFour,
			CategoryTagList,
			quickLink
		},
		componentPlaceholder: {
		    cardModeTwo: 'view',
		    cardModeThree: 'view',
		    cardModeFour: 'view',
		    CategoryTagList: 'view',
		    quickLink: 'view'
		},
		options: {
		    styleIsolation: 'shared'
		},
		data() {
			return {
				users: users,
				cardUserList: cardUserList,
				cardList: cardList,
				cardAlbumList: cardAlbumList,
				tabList: tabList,
				tab: '最新上架',
				tag: '全部',
				offsetTop: 0
			}
		},
		methods: {
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
		// height: 100vh;
		// padding-top: 88rpx;
		background-color: #fff;
	}
</style>