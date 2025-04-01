<template>
	<view class="page">
		<recordCard></recordCard>
		<!-- 标签页 -->
		<uv-sticky :offsetTop="offsetTop">
			<tabPage :tabList="orderTabList" @tabChange="tabChange" @tagChange="tagChange" @handleSearch="handleSearch"></tabPage>
		</uv-sticky>
		<view class="page-list">
			<uv-collapse @change="change" @close="close" @open="open" :border="false" :value="index">
				<uv-collapse-item v-for="(item, index) in data" :key="index" :title="item.title" :name="0">
					<ratingOrderCard :data="itemOrder" :is_list="true" :evaluationData="item.evaluation" v-for="(itemOrder, indexOrder) in item.order_info" :key="indexOrder"
						@handleMore="handleMore"></ratingOrderCard>
				</uv-collapse-item>
			</uv-collapse>
			<!-- <view class="page-list-order" v-for="(item, index) in data" :key="index">
				<view class="list-order-title">{{item.title}}</view>
				<view class="list-order-item">
					<ratingOrderCard :evaluationData="item.evaluation" v-for="(itemOrder, indexOrder) in item" :key="indexOrder"></ratingOrderCard>
				</view>
			</view> -->
		</view>
		<uv-popup ref="popup" @change="change" mode="bottom" round="40rpx">
			<view class="popup-page">
				<view class="popup-page-list">
					<view class="popup-page-text">编辑订单</view>
					<view class="page-list-line"></view>
					<view class="popup-page-text" @click="handleDelete">删除订单</view>
				</view>
				<view class="popup-page-line"></view>
				<view class="popup-page-text">取消</view>
			</view>
		</uv-popup>
		<view class="custom-modal" v-if="showModal">
			<view class="modal-content">
				<view class="modal-content-top">
					<view class="modal-title">删除订单</view>
					<view class="modal-message">确认删除此订单吗？删除后将不可恢复。</view>
				</view>
				<view class="modal-buttons">
					<view class="modal-button cancel" @click="cancelDelete">取消</view>
					<view class="modal-button delete" @click="confirmDelete">删除</view>
				</view>
			</view>
		</view>
		<view class="page-pay" :style="{bottom: offsetBottom + 'rpx'}">
			<view class="page-pay-button" @click="handlePayButton">
				<view class="pay-button-icon"></view>
				<view class="pay-button-text">
					5个订单待支付<uv-icon name="arrow-right" color="#fff" size="24rpx" bold></uv-icon>
				</view>
			</view>
		</view>
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
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			}
		},
		data() {
			return {
				offsetTop: 0,
				offsetBottom: 0,
				orderTabList: orderTabList,
				tab: '未入库',
				tag: '全部',
				popupId: 0,
				showModal: false
			}
		},
		emit: ['handleStatus', 'handleEvaluation'],
		methods: {
			handlePayButton() {
				uni.navigateTo({
					url: '/pages/order/list/index'
				})
			},
			handleDelete() {
				this.$refs.popup.close();
				this.showModal = true;
			},
			handleMore(id) {
				this.$refs.popup.open();
				this.popupId = id
			},
			handleSearch() {
				uni.navigateTo({
					url: '/pages/order/tabsPage/rating/search'
				})
			},
			tabChange(name) {
				this.tab = name
				this.$emit('handleStatus', name)
			},
			tagChange(name) {
				this.tag = name
				this.$emit('handleEvaluation', name)
			},
			pullDownRefresh(){
				console.log("下来刷新");
			},
			reachBottom(){
				console.log("上拉加载");
			},
			cancelDelete() {
				this.showModal = false;
			},
			confirmDelete() {
				this.showModal = false;
				// 这里可以添加删除订单的逻辑
				console.log('订单已删除');
			}
		},
		mounted() {
			// #ifndef WEB
			this.offsetTop = this.$system.BarHeight();
			this.offsetBottom = this.$system.safeHeight() + 154
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 100vw;
		background-color: #f6f7f9;
	}
	
	.page-list {
		display: flex;
		flex-direction: column;
		padding: 28rpx 0;
		margin-bottom: 108rpx;
	}
	
	.popup-page {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
		padding: 40rpx 0;
	}
	
	.popup-page-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 40rpx;
		padding: 0 32rpx;
	}
	
	.popup-page-text {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.page-list-line {
		border: 1rpx solid rgba(234, 234, 239, 1)
	}
	
	.popup-page-line {
		border: 4rpx solid rgba(246, 247, 249, 1);
	}
	
	/* 自定义弹窗样式 */
	.custom-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}
	
	.modal-content {
		margin: 0 112rpx;
		border-radius: 32rpx;
		background-color: white;
		padding: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.modal-content-top {
		padding: 16rpx 8rpx 40rpx 8rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24rpx;
	}
	
	.modal-title {
		font-weight: 600;
		font-size: 32rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.modal-message {
		font-size: 26rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.modal-buttons {
		display: flex;
		justify-content: space-between;
	}
	
	.modal-button {
		width: 45%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40rpx;
		font-size: 30rpx;
	}
	
	.modal-button.cancel {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2rpx solid white;
		width: 237rpx;
		height: 84rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		color: rgba(0, 0, 0, 0.44);
		font-weight: 600;
		font-size: 28rpx;
	}
	
	.modal-button.delete {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(245, 63, 63, 1);
		border: 2rpx solid rgba(245, 63, 63, 1);
		width: 237rpx;
		height: 84rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		color: white;
		font-weight: 600;
		font-size: 28rpx;
	}
	
	.page-pay {
		position: fixed;
		bottom: 172rpx;
		right: 32rpx;
		z-index: 100;
	}
	
	.page-pay-button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16rpx;
		padding: 8rpx 16rpx;
		border-radius: 2000rpx;
		background: rgba(254, 168, 0, 1);
	}
	
	.pay-button-icon {
		width: 84rpx;
		height: 84rpx;
		border-radius: 2000rpx;
		padding: 4rpx;
		background: rgba(254, 185, 51, 1);
	}
	
	.pay-button-text {
		display: flex;
		align-items: baseline;
		gap: 8rpx;
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
	}
</style>