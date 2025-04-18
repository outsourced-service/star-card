<template>
	<view class="background-layer" :style="{ backgroundImage: 'url(' + userInfo.background_image?.url + ')' }"></view>
	<view class="overlay-layer"></view>
	<view class="gradient-layer"></view>
	<view class="page" :style="'padding-top:' + offsetTop + 'px'">
		<uv-navbar title="" @leftClick="leftClick" :bg-color="bgColor" leftIconColor="#fff"></uv-navbar>
		<view class="page-top">
			<userInfo @handleEidt="handleEidt" :userData="userInfo"></userInfo>
			<!-- <cardShop></cardShop> -->
			<cardCardbookHorizontalList @add="handAddAlbum('curated')"></cardCardbookHorizontalList>
		</view>
		<uv-sticky :offsetTop="offsetTop" :bgColor="is_stickyBg ? '#fff' : ''">
			<tabPage :tabList="homeTabList" @tabChange="tabChange" @tagChange="tagChange" @handleSearch="handleSearch" @handleShowFilter="handleShowFilter">
			</tabPage>
		</uv-sticky>
		<view class="page-card">
			<view class="page-card-list" v-if="tag == '卡牌'">
				<cardModeOne v-for="(item, index) in cardList" :key="index" :data="item" class="card-list-item"></cardModeOne>
			</view>
			<view class="page-card-binder" v-else>
				<view class="card-binder-add" @click="handAddAlbum">
					<view class="binder-add-left">
						<view class="add-left-icon">
							<uv-icon name="empty-news" color="#fff" size="32rpx" bold></uv-icon>
						</view>
						<view class="add-left-text">创建新卡册</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="32rpx" bold></uv-icon>
				</view>
				<cardModeFour :data="cardAlbumList" @handleAlbum="handleAlbum"></cardModeFour>
			</view>
		</view>
	</view>
	<uv-popup ref="popupFilter" mode="right" safeAreaInsetTop safeAreaInsetBottom lock-scroll @open="handlePopupOpen" @close="handlePopupClose">
		<popupFilter :safeHeight="safeHeight" @handleConfirm="handleConfirm"></popupFilter>
	</uv-popup>
</template>

<script>
	import userInfo from './components/userInfo.vue';
	import cardShop from '@/pages/profile/components/card-shop/card-shop.vue';
	import cardCardbookHorizontalList from '@/pages/profile/components/card-cardbook-horizontalList/card-cardbook-horizontalList.vue';
	import tabPage from './components/tabPage.vue';
	import cardModeFour from './components/cardModeFour.vue';
	
	import { user } from '@/api/gloabal/index';
	import {
		homeTabList
	} from '/mock/CategoryTagList.js';
	import {
		cardList,
		cardAlbumList
	} from '/mock/cards';
	export default {
		components: {
			userInfo,
			cardShop,
			cardCardbookHorizontalList,
			tabPage,
			cardModeFour
		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				userInfo: {},
				offsetTop: 0,
				offsetBottom: 0,
				safeHeight: 0,
				homeTabList: homeTabList,
				cardAlbumList: cardAlbumList,
				cardList: cardList,
				is_stickyBg: false,
				bgColor: 'rgba(0,0,0,0)',
				tab: '卡柜',
				tag: '卡牌',
				bgImg: 'https://s3-alpha-sig.figma.com/img/558b/692c/c9003e551f4cc5f282f8b48c8f419fe4?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DZuWShLdhyFaKjYQz~pScdCl08lCTdo6Fq2TDIkuOmipW9JHE5wpwiuLveSJRKi~dP6NqYmkAW7INUuyX74ln73GSD-KzphfDM7BXiEmzqfurTEUQoKS9xtRpNsslZLmucSwRcGWrssqSffXqI10NhIXQWYcBI~H9avAQ~KZ8e~0~y5AK2-Z5EenMV2avc-YGRx0fRg4iwiM8MnfipOZteC8N86fk5LIELDq-D-Pi8TkEyQdytBCdR8kNJ7Mx9y-945bXZclRCgVzX-CW9DvznULlUVDrEX95kHkUsFu0cokEHEF1xSCOg1YZRJTewzRzC-Xda5myZdnWwxAvwjXEQ__'
			}
		},
		methods: {
			handAddAlbum(type) {
				uni.navigateTo({
					url: '/pages/card/album/edit?type=' + type
				})
			},
			handleAlbum() {
				uni.navigateTo({
					url: '/pages/card/album/index'
				})
			},
			handleEidt() {
				uni.navigateTo({
					url: '/pages/profile/edit/index'
				})
			},
			handlePopupOpen() {
				this.enableScroll(false);
			},
			handlePopupClose() {
				this.enableScroll(true);
			},
			enableScroll(flag) {
				// H5 处理
				// #ifdef H5
				const pageEl = document.querySelector('.page');
				if (pageEl) {
					pageEl.style.overflow = flag ? 'auto' : 'hidden';
				}
				// #endif
			  
				// 小程序处理
				// #ifdef MP-WEIXIN
				if (!flag) {
					wx.pageScrollTo({
					scrollTop: 0,
					duration: 0
					});
				}
				// #endif
			},
			handleConfirm() {
				this.$refs.popupFilter.close();
				this.enableScroll(true);
			},
			handleShowFilter() {
				this.$refs.popupFilter.open();
				this.enableScroll(false);
			},
			leftClick() {
				uni.navigateBack()
			},
			tabChange(name) {
				this.tab = name
			},
			tagChange(name) {
				this.tag = name
			},
			handleSearch() {
				
			}
		},
		mounted() {
			// #ifndef WEB
			this.offsetTop = this.$system.BarHeight();
			this.safeHeight = this.$system.safeHeight();
			// #endif
		},
		onLoad() {
			user.getUserInfo().then(res => {
				console.log(res)
				this.userInfo = res
			})
		},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			console.log(e.scrollTop)
			if (scrollTop > this.$system.BarHeight()) {
				this.is_stickyBg = true
			} else {
				this.is_stickyBg = false
			}
			if(scrollTop) {
				this.bgColor = 'rgba(0,0,0,0.5)'
			} else {
				this.bgColor = 'rgba(0,0,0,0)'
			}
		}
	}
</script>

<style>
	/* 背景图片层 */
	.background-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1326rpx;
		/* background-size: cover; */
		background-size: auto;
		background-position: center;
		background-repeat: no-repeat;
		z-index: 1;
	}

	/* 黑色蒙层 */
	.overlay-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色蒙层 */
		z-index: 2;
	}

	/* 渐变蒙层 */
	.gradient-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)); /* 从透明到深色的渐变 */
		z-index: 3;
	}
	
	.page {
		position: relative;
		z-index: 4; /* 确保内容在所有背景层之上 */
		width: 100vw;
		height: 100vh;
	}
	
	.page-top {
		width: 100vw;
		/* height: 200px; 可以根据需要调整高度 */
		background-size: cover; /* 确保背景图像覆盖整个区域 */
		background-position: center; /* 背景图像居中 */
		display: flex;
		flex-direction: column;
		padding: 24rpx 32rpx 80rpx 32rpx;
		gap: 40rpx;
		margin-bottom: -40rpx;
	}
	
	.page-card {
		background-color: rgba(246, 247, 249, 1);
		padding: 24rpx;
	}
	
	.page-card-list {
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx;
	}
	
	.card-list-item {
		width: calc((100% - 24rpx) / 3);
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
	}
	
	.page-card-binder {
		display: flex;
		flex-direction: column;
	}
	
	.card-binder-add {
		border-radius: 24rpx;
		padding: 24rpx;
		border-width: 2rpx;
		background: radial-gradient(93.36% 144.29% at 0% 0%, #FFE5B2 0%, #FFFFFF 100%);
		border: 2rpx solid rgba(255, 255, 255, 1);
		box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12rpx;
	}
	
	.binder-add-left {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}
	
	.add-left-icon {
		background: linear-gradient(180deg, #FEB933 0%, #FEA800 100%);
		border-radius: 50%;
		padding: 10rpx;
	}
	
	.add-left-text {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
</style>
