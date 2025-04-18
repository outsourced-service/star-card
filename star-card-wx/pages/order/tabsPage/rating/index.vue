<template>
	<view class="page">
		<recordCard></recordCard>
		<!-- 标签页 -->
		<uv-sticky :offsetTop="offsetTop" :bgColor="is_stickyBg ? '#fff' : ''">
			<tabPage :tabList="orderTabList" @tabChange="tabChange" @tagChange="tagChange" @handleSearch="handleSearch">
			</tabPage>
		</uv-sticky>
		<view class="page-list">
			<uv-collapse :border="false" :value="openCollapse">
				<uv-collapse-item v-for="(item, index) in data" :key="index" :title="item.title" :name="item?.id">
					<ratingOrderCard :data="itemOrder" :is_list="true" :evaluationData="item.evaluation" :is_pay="false" :is_transaction="false"
						v-for="(itemOrder, indexOrder) in item.order_info" :key="indexOrder" @handleMore="handleMore" @handleToDetail="handleToDetail">
					</ratingOrderCard>
				</uv-collapse-item>
			</uv-collapse>
			<!-- <view class="page-list-order" v-for="(item, index) in data" :key="index">
				<view class="list-order-title">{{item.title}}</view>
				<view class="list-order-item">
					<ratingOrderCard :evaluationData="item.evaluation" v-for="(itemOrder, indexOrder) in item" :key="indexOrder"></ratingOrderCard>
				</view>
			</view> -->
		</view>
		<uv-popup ref="popup" mode="bottom" round="40rpx">
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
		<popup-modal v-if="showModal" title="删除订单" message="确认删除此订单吗？删除后将不可恢复。" @cancelDelete="cancelDelete" @confirmDelete="confirmDelete"></popup-modal>
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

	import {
		orderTabList
	} from '/mock/CategoryTagList.js'
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
			},
			openCollapse: {
				type: Object,
				required: true,
				default: () => ([]),
			},
			is_stickyBg: {
				type: Boolean,
				required: true,
				default: () => (false),
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
			handleToDetail(id) {
				uni.navigateTo({
					url: '/pages/order/index/index?order_info_id=' + id
				})
			},
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
			pullDownRefresh() {
				console.log("下来刷新");
			},
			reachBottom() {
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
	}

	.page-list {
		display: flex;
		flex-direction: column;
		padding-top: 28rpx;
		padding-bottom: 108rpx;
		background-color: #f6f7f9;
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