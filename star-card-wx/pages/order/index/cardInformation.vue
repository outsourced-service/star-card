<template>
	<view class="container">
		<tabs :tabList="tabList" :activeTextSize="'28rpx'" :inactiveTextSize="'28rpx'" @tabChange="tabChange"></tabs>
		<view class="container-release-scores-no" v-if="!is_release_scores && tab == '出分信息'">
			<releaseScoresNo></releaseScoresNo>
		</view>
		<view class="container-card" v-else>
			<cardAlbum v-if="tab != '出分信息'"></cardAlbum>
			<cardReleaseScores v-else @handleCard="handleCard"></cardReleaseScores>
		</view>
	</view>
</template>

<script>
	import cardAlbum from "../components/card-album/card-album.vue";
	import releaseScoresNo from "../components/release-scores-no/release-scores-no.vue";
	import cardReleaseScores from "../components/card-release-scores/card-release-scores.vue";
	
	export default {
		components: {
			cardAlbum,
			releaseScoresNo,
			cardReleaseScores
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
		},
		data() {
			return {
				tabList: [
					{ name: '用户拍照' },
					{ name: '入库照片' },
					{ name: '出分信息' }
				],
				tab: '用户拍照',
				is_release_scores: true
			}
		},
		emit: [],
		methods: {
			handleCard() {
				uni.navigateTo({
					url: '/pages/card/ratingCardDetail/index'
				})
			},
			tabChange(name) {
				this.tab = name
			}
		},
		onLoad() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 100vh;
	}
	
	.container-card {
		padding: 24rpx 32rpx;
	}
</style>
