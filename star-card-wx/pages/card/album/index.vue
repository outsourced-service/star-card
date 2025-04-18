<template>
	<view class="background-layer" :style="{ backgroundImage: 'url(' + bgImg + ')' }"></view>
	<view class="overlay-layer"></view>
	<view class="page" :style="'padding-top:' + offsetTop + 'px'">
		<uv-navbar title="我的卡册" @leftClick="leftClick" :bg-color="bgColor" leftIconColor="#fff" :titleStyle="{color: '#fff'}"></uv-navbar>
		<view class="page-top">
			<albumInfo @handleManage="handleManage"></albumInfo>
		</view>
		<view class="page-card">
			<uv-sticky :offsetTop="offsetTop" :bgColor="is_stickyBg ? '#f6f7f9' : ''">
				<view class="page-card-tab">
					<view class="card-tab-left">
						<uv-icon v-if="!cardMode" name="list-dot" color="rgba(0, 0, 0, 0.44)" size="32rpx" bold></uv-icon>
						<uv-icon v-else name="list-dot" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold @click="cardMode = 0"></uv-icon>
						<view class="tab-left-line"></view>
						<uv-icon v-if="cardMode" name="grid" color="rgba(0, 0, 0, 0.44)" size="32rpx" bold></uv-icon>
						<uv-icon v-else name="grid" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold @click="cardMode = 1"></uv-icon>
					</view>
					<view class="card-tab-right">
						<view class="tab-right-filter" v-if="!is_filter" @click="handleShowFilter">
							<uv-icon name="tags" color="rgba(0, 0, 0, 0.44)" size="32rpx" bold></uv-icon>
							<view class="right-filter-text">筛选</view>
						</view>
						<view class="tab-right-filtered" v-else @click="handleShowFilter">
							<uv-icon name="tags" color="rgba(254, 168, 0, 1)" size="32rpx" bold></uv-icon>
							<view class="right-filtered-text">筛选</view>
						</view>
						<uv-icon name="search" color="rgba(0, 0, 0, 0.44)" size="32rpx" bold></uv-icon>
					</view>
				</view>
			</uv-sticky>
			<view class="page-card-list" v-if="cardList?.length > 0">
				<cardModeTwo :data="cardList" v-if="cardMode"></cardModeTwo>
				<cardModeOther :data="cardList" v-else></cardModeOther>
			</view>
			<view class="page-card-list" v-else>
				<view class="card-list-empty">
					该卡册还没有收藏任何卡牌
					<uv-button @click="handleAddCard" text="添加卡牌" color="rgba(254, 168, 0, 1)"
						shape="circle" :custom-style="{height: '68rpx', width: '176rpx', fontSize: '26rpx'}"></uv-button>
				</view>
			</view>
		</view>
		<uv-action-sheet ref="actionSheet" :actions="sheetList" @select="selectSheet" @close="close" round="40rpx" cancelText="取消" safeAreaInsetBottom></uv-action-sheet>
		<uv-popup ref="popupFilter" mode="right" safeAreaInsetTop safeAreaInsetBottom lock-scroll @open="handlePopupOpen" @close="handlePopupClose">
			<popupFilter :safeHeight="safeHeight" @handleConfirm="handleConfirm"></popupFilter>
		</uv-popup>
	</view>
</template>

<script>
	import albumInfo from './components/albumInfo.vue';
	import cardModeTwo from './components/cardModeTwo.vue';
	import cardModeOther from './components/cardModeOther.vue';
	import {
		cardList
	} from '/mock/cards';
	export default {
		components: {
			albumInfo,
			cardModeTwo,
			cardModeOther
		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				offsetTop: 0,
				safeHeight: 0,
				// cardList: cardList,
				is_stickyBg: false,
				is_filter: false,
				cardMode: 0,
				bgColor: 'rgba(0,0,0,0)',
				bgImg: 'https://s3-alpha-sig.figma.com/img/9fd2/aa53/906aa6c17e0d5471bc722b1d849ab77d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oGNoyWG0e~ZeEFtZskOd7aOAW84-88TTN0sM9snsuoaoxemMvAixObvSIbbGCSdbPE4vXn2vopv5oEwx4ed7~gyG~BZjKXEvBAb9YxQVIVk5w4UMx8nJ-ASwUHRu2ZydHeNZdPdmnexKuUOhcU8TbRCZuvvB-oe8M5a7gXt5pUkavVNyk43GVuCXQirXKdO77ehkE2iUcJ34obJ5gw8BeHSjmeTpYdXW2dwDTkR2L1JPzm9zyrwTkww7iJW3Dz0yvaJZaLibsp-KoPeD~XKSJlJHltKJvULtOboz9iV9kq6CaNxetcvmtsorSJc-RZHZqVvyNBYYMucDHiS6EHsNyg__',
				sheetList: [{
					name: '添加卡牌'
				}, {
					name: '批量管理'
				}, {
					name: '编辑信息'
				}]
			}
		},
		methods: {
			handleAddCard() {
				uni.navigateTo({
					url: '/pages/card/album/add'
				})
			},
			selectSheet(e) {
				if(e.name == '添加卡牌') {
					uni.navigateTo({
						url: '/pages/card/album/add'
					})
				} else if(e.name == '批量管理') {
					uni.navigateTo({
						url: '/pages/card/album/manage'
					})
				} else if(e.name == '编辑信息') {
					uni.navigateTo({
						url: '/pages/card/album/edit'
					})
				}
			},
			handleManage() {
				this.$refs.actionSheet.open();
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

<style lang="scss" scoped>
	/* 背景图片层 */
	.background-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 800rpx;
		background-size: cover;
		background-position: center;
		z-index: 1;
	}

	/* 黑色蒙层 */
	.overlay-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 800rpx;
		/* background-color: rgba(0, 0, 0, 0.5); */
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 74%);
		z-index: 2;
	}
	
	.page {
		position: relative;
		z-index: 4; /* 确保内容在所有背景层之上 */
		width: 100vw;
		height: 100vh;
	}
	
	/* 修改选项文字大小 */
	.page ::v-deep .uv-action-sheet__item-wrap__item__name {
	  font-size: 28rpx !important;
	}
	
	/* 修改取消按钮文字大小 */
	.page ::v-deep .uv-action-sheet__cancel-text {
	  font-size: 28rpx !important;
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
		width: 100vw;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		padding: 24rpx 16rpx 240rpx 16rpx;
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}
	
	.page-card-tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 16rpx;
	}
	
	.card-tab-left {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}
	
	.tab-left-line {
		height: 24rpx;
		border-width: 2rpx;
		border-left: 2rpx solid rgba(209, 209, 214, 1);
	}
	
	.card-tab-right {
		display: flex;
		align-items: center;
		gap: 32rpx;
	}
	
	.tab-right-filter {
		display: flex;
		align-items: center;
		gap: 4rpx;
	}
	
	.right-filter-text {
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.tab-right-filtered {
		display: flex;
		align-items: center;
		gap: 4rpx;
	}
	
	.right-filtered-text {
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.page-card-list {
		background-color: #f6f7f9;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.card-list-empty {
		margin-top: 240rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40rpx;
		font-size: 26rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.44);
	}
</style>
