<template>
	<view class="page">
		<topInfoShow :data="userInfo"></topInfoShow>
	</view>
</template>

<script>
	import cardModeTwo from '/pages/home/components/cardModeTwo.vue';
	import cardModeThree from '/pages/home/components/cardModeThree.vue';
	import cardModeFour from '/pages/home/components/cardModeFour.vue';
	import recommendationUserList from '/pages/home/components/recommendationUserList.vue';
	import CategoryTagList from '/pages/home/components/CategoryTagList.vue';
	import quickLink from '/pages/home/components/quickLink.vue';
	
	import topInfoShow from '/pages/profile/components/topInfoShow.vue';
	
	import { tabList } from '../../mock/CategoryTagList.js'
	import {
		users,
		userInfo
	} from '../../mock/users';
	import {
		cardUserList,
		cardList,
		cardAlbumList
	} from '../../mock/cards';
	
	export default {
		data() {
			return {
				users: users,
				userInfo: userInfo,
				cardUserList: cardUserList,
				cardList: cardList,
				cardAlbumList: cardAlbumList,
				tabList: tabList,
				tab: '最新上架',
				tag: '全部'
			}
		},
		methods: {
			tabChange(name) {
				this.tab = name
			},
			tagChange(name) {
				this.tag = name
			}
		},
		components: {
			cardModeTwo,
			cardModeThree,
			cardModeFour,
			recommendationUserList,
			CategoryTagList,
			quickLink,
			topInfoShow
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 100vw;
		height: 100vh;
	}
</style>