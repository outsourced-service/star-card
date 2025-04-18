<template>
	<view class="page">
		<view class="page-top">
			<manageTop @handleManage="handleManage"></manageTop>
		</view>
		<uv-sticky :offsetTop="0" :bg-color="bgColor">
			<view class="page-card-tab">
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
		<view class="page-card">
			<view class="page-card-list">
				<view class="card-list-item" v-for="(item, index) in cardList" :key="index">
					<cardModeOne :data="item" :is_select="true" @handleSelectNo="handleSelectNo(index)" @handleSelected="handleSelected(index)"></cardModeOne>
				</view>
			</view>
			<view class="page-card-end" :style="selectCard.length > 0 ? 'padding-bottom: 350rpx' : 'padding-bottom: 158rpx'"> 
				此页面中仅展示未添加进卡册的卡牌
			</view>
		</view>
		<view class="page-bottom">
			<view class="page-bottom-list" v-if="selectCard.length > 0">
				<scroll-view scroll-x class="" style="white-space: nowrap; width: 100%;" :enable-flex="true">
					<view class="bottom-list-scroll">
						<view class="bottom-list-item" v-for="(item, index) in selectCard" :key="index">
							<uv-image :src="item.image" height="128rpx" width="128rpx" radius="8rpx"></uv-image>
							<view class="list-item-icon">
								<uv-icon name="close-circle-fill" color="rgba(0, 0, 0, 0.66)" size="32rpx"></uv-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="page-bottom-total">
				<view class="bottom-total-text">
					已选<span style="font-weight: 600; color: rgba(0, 0, 0, 0.66);">{{selectCard.length}}</span>张卡牌
				</view>
				<uv-button @click="handleAdd()" text="确认添加" :color="selectCard.length > 0 ? 'rgba(254, 168, 0, 1)' : 'rgba(255, 220, 153, 1)'" 
					shape="circle" :custom-style="{height: '68rpx', width: '176rpx', fontSize: '26rpx'}"></uv-button>
			</view>
		</view>
	</view>
	<uv-toast ref="toast"></uv-toast>
</template>

<script>
	import manageTop from './components/manageTop.vue';
	import {
		cardList
	} from '/mock/cards';
	export default {
		components: {
			manageTop
		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				offsetTop: 0,
				safeHeight: 0,
				bgColor: 'rgba(246, 247, 249, 1)',
				cardList: cardList,
				is_filter: false,
				cardMode: 0,
				selectCard: []
			}
		},
		methods: {
			handleAdd() {
				if(this.selectCard.length > 0) {
					uni.navigateBack()
				} else {
					uni.showToast({
						title: '已将选中卡牌添加至 “' + '🏀东契奇' + '”',
						icon: 'none'
					})
					// uni.showToast({
					// 	title: '请选择卡牌',
					// 	icon: 'none'
					// })
				}
			},
			handleSelectNo(index) {
				this.cardList[index].is_select = false;
			},
			handleSelected(index) {
				this.cardList[index].is_select = true;
				this.selectCard.push(this.cardList[index])
			},
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
			this.offsetTop = this.$system.BarHeight();
			// this.safeHeight = this.$system.safeHeight();
			// #endif
		},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			if(scrollTop - this.offsetTop > this.offsetTop - 40) {
				this.bgColor = '#fff'
			} else {
				this.bgColor = 'rgba(246, 247, 249, 1)'
			}
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
		padding: 0 24rpx 24rpx 24rpx;
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
	
	.page-card-tab {
		display: flex;
		// justify-content: space-between;
		justify-content: flex-end;
		align-items: center;
		padding: 24rpx 40rpx;
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
		width: calc(100vw - 48rpx);
		display: flex;
		/* 使用 flex 布局 */
		flex-wrap: wrap;
		/* 允许换行 */
		// justify-content: space-between;
		/* 项目之间的间隔均匀分布 */
		// margin: 24rpx;
		gap: 12rpx;
	}
	
	.card-list-item {
		width: calc((100% - 24rpx) / 3);
	}
	
	.page-card-end {
		font-size: 24rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.page-bottom {
		width: 100vw;
		display: flex;
		flex-direction: column;
		z-index: 10;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	
	.page-bottom-list {
		background-color: #fff;
		display: flex;
		align-items: center;
		height: 192rpx;
		padding: 0 32rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
	}
	
	.bottom-list-scroll {
		display: flex;
		gap: 20rpx;
		padding: 32rpx 0;
	}
	
	.bottom-list-item {
		position: relative;
	}
	
	.list-item-icon {
		position: absolute;
		  top: -6rpx;
		  right: -6rpx;
	}
	
	.page-bottom-total {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding: 24rpx 24rpx 40rpx 40rpx;
		align-items: center;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
	}
	
	.bottom-total-text {
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}
</style>
