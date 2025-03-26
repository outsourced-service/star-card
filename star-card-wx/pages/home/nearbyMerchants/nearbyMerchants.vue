<template>
	<view class="width-full" style="padding: 0 32rpx;">
		<view class="width-full" v-for="(merchant,index) in merchants" :key="index">
			<view v-if="index" class="width-full" style="height: 1px;background-color: #E5E5EA" />
			<card-mode-five :model="merchant" />
		</view>
		<uv-load-more :status="loadMoreStatus" @loadmore="loadMore" @clickLoadMore="loadMore" loadmoreText="上拉加载跟多"
			height="64" fontSize="28" iconSize="34" />
	</view>
</template>

<script>
	import {
		fetchMerchants
	} from '@/api/testApi';
	import CardModeFive from '../components/cardModeFive.vue';

	export default {
		name: 'nearbyMerchants',
		components: {
			CardModeFive
		},
		data() {
			return {
				merchants: [],
				page: 1,
				limit: 1,
				loadMoreStatus: 'loadmore'
			};
		},
		methods: {
			async loadMerchants() {
				this.loadMoreStatus = 'loading';
				const response = await fetchMerchants(this.page, this.limit);
				this.merchants.push(...response.data);
				if (this.merchants.length >= response.total) {
					this.loadMoreStatus = 'nomore';
				}
				this.$nextTick(() => {
					this.loadMoreStatus = 'loadmore';
				})
			},
			loadMore() {
				if (this.loadMoreStatus === 'loadmore') {
					this.page++;
					this.loadMerchants();
				}
			},
			refresh() {
				this.page = 1;
				this.merchants = [];
				this.loadMoreStatus = 'loadmore';
				this.loadMerchants();
			}
		},
		onPullDownRefresh() {
			this.refresh();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.loadMore();
		},
		mounted() {
			this.loadMerchants();
		}
	};
</script>

<style>

</style>