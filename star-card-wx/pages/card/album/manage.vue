<template>
	<view class="page">
		<view class="page-top">
			<manageTop @handleManage="handleManage" :is_manage="true"></manageTop>
		</view>
		<uv-sticky :offsetTop="0" :bg-color="bgColor">
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
		<view class="page-card">
			<view class="page-card-list">
				<cardModeTwo :data="cardList" v-if="cardMode" :is_select="true" @handleSelected="handleSelected" @handleSelectNo="handleSelectNo"></cardModeTwo>
				<cardModeOther :data="cardList" v-else :is_select="true" @handleSelected="handleSelected" @handleSelectNo="handleSelectNo"></cardModeOther>
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
							<uv-image lazyLoad :src="item.image" height="128rpx" width="128rpx" radius="8rpx"></uv-image>
							<view class="list-item-icon">
								<uv-icon name="close-circle-fill" color="rgba(0, 0, 0, 0.66)" size="32rpx"></uv-icon>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="page-bottom-total">
				<view class="bottom-total-left">
					<uv-checkbox-group v-model="checkboxValue">
						<uv-checkbox label="全选" name="全选" active-color="#fea800" shape="circle" iconSize="40rpx" labelSize="24rpx" labelColor="rgba(0, 0, 0, 0.44)"></uv-checkbox>
					</uv-checkbox-group>
					<view class="total-left-line"></view>
					<view class="total-left-text">
						已选<span style="font-weight: 600; color: rgba(0, 0, 0, 0.66);">{{selectCard.length}}</span>张卡牌
					</view>
				</view>
				<view class="bottom-total-button">
					<uv-button @click="handleMove()" plain text="移动到" :color="selectCard.length > 0 ? 'rgba(0, 0, 0, 0.44)' : 'rgba(0, 0, 0, 0.2)'"
						shape="circle" :custom-style="{height: '68rpx', width: '152rpx', fontSize: '26rpx'}"></uv-button>
					<uv-button @click="handleDelete()" plain text="移除" :color="selectCard.length > 0 ? 'rgba(245, 63, 63, 1)' : 'rgba(253, 205, 197, 1)'"
						shape="circle" :custom-style="{height: '68rpx', width: '152rpx', fontSize: '26rpx'}"></uv-button>
				</view>
			</view>
		</view>
	</view>
	<uv-toast ref="toast"></uv-toast>
	<popup-modal v-if="showModal" title="移除卡牌" :message="'确认将 ' + selectCard.length + ' 张卡牌从此卡册中移除？'" rightText="确认移除" @cancelDelete="cancelDelete" @confirmDelete="confirmDelete"></popup-modal>
	<uv-popup ref="popup" safeAreaInsetBottom round="40rpx" mode="bottom">
		<moveAlbum @addAlbum="addAlbum"></moveAlbum>
	</uv-popup>
	<uv-popup ref="addPopup" safeAreaInsetBottom round="40rpx" mode="bottom">
		<view class="add-popup" :style="'height: calc(100vh - ' + offsetTop + 'rpx - 52rpx)'">
			<view class="add-popup-top">
				<view class="popup-top-close">取消</view>
				<view class="popup-top-title">新建卡册</view>
				<view class="popup-top-complete" :style="newForm ? 'color: rgba(254, 168, 0, 1)' : 'color: rgba(255, 220, 153, 1)'">完成</view>
			</view>
			<view class="add-popup-item">
				<editAlbum :is_popup="true"></editAlbum>
			</view>
		</view>
	</uv-popup>
</template>

<script>
	import manageTop from './components/manageTop.vue';
	import cardModeTwo from './components/cardModeTwo.vue';
	import cardModeOther from './components/cardModeOther.vue';
	import moveAlbum from './components/moveAlbum.vue';
	import editAlbum from './edit.vue';
	import {
		cardList
	} from '/mock/cards';
	export default {
		components: {
			manageTop,
			cardModeTwo,
			cardModeOther,
			moveAlbum,
			editAlbum
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
				selectCard: [],
				showModal: false,
				checkboxValue: '',
				newForm: false
			}
		},
		methods: {
			addAlbum() {
				this.$refs.addPopup.open();
			},
			cancelDelete() {
				this.showModal = false;
			},
			confirmDelete() {
				this.showModal = false;
				// 这里可以添加删除订单的逻辑
				console.log('订单已删除');
			},
			handleMove() {
				if(this.selectCard.length > 0) {
					this.$refs.popup.open();
				} else {
					uni.showToast({
						title: '请选择卡牌',
						icon: 'none'
					})
				}
			},
			handleDelete() {
				if(this.selectCard.length > 0) {
					this.showModal = true;
				} else {
					uni.showToast({
						title: '请选择卡牌',
						icon: 'none'
					})
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
		justify-content: space-between;
		// justify-content: flex-end;
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
	
	.bottom-total-left {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}
	
	.total-left-line {
		border-left: 2rpx solid rgba(229, 229, 234, 1);
		height: 24rpx;
	}
	
	.total-left-text {
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}
	
	.bottom-total-button {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}
	
	.add-popup {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
		padding: 40rpx 32rpx 0 32rpx;
		background-color: rgba(246, 247, 249, 1);
	}
	
	.add-popup-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 600;
		font-size: 30rpx;
	}
	
	.popup-top-close {
		color: rgba(0, 0, 0, 0.44);
	}
	
	.popup-top-title {
		color: rgba(0, 0, 0, 0.99);
	}
	
	.add-popup-item {
		height: calc(100% - 40rpx - 30rpx);
		overflow-y: auto;
	}
</style>
