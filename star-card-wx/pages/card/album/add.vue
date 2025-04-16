<template>
	<view class="page">
		<view class="page-top">
			<manageTop @handleManage="handleManage"></manageTop>
		</view>
		<view class="page-card">
			<uv-sticky :offsetTop="offsetTop" :bg-color="bgColor">
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
			<view class="page-card-list">
				<cardModeTwo :data="cardList" v-if="cardMode"></cardModeTwo>
				<cardModeOther :data="cardList" v-else></cardModeOther>
			</view>
		</view>
	</view>
</template>

<script>
	import manageTop from './components/manageTop.vue';
	import cardModeTwo from './components/cardModeTwo.vue';
	import cardModeOther from './components/cardModeOther.vue';
	import {
		cardList
	} from '/mock/cards';
	export default {
		components: {
			manageTop,
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
				bgColor: '',
				cardList: cardList,
				is_filter: false,
				cardMode: 0
			}
		},
		methods: {
			selectSheet(e) {
				console.log(e)
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
			// this.offsetTop = this.$system.BarHeight();
			// this.safeHeight = this.$system.safeHeight();
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.page {
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
		padding: 24rpx 40rpx 20rpx 40rpx;
		gap: 40rpx;
	}
	
	.page-card {
		background-color: rgba(246, 247, 249, 1);
		width: 100vw;
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
</style>
