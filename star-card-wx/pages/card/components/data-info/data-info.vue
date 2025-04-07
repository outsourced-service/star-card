<template>
	<view class="data-info-page">
		<view class="info-page-top">
			<view class="page-top-tag">
				<view class="top-tag-logo">PSA</view>
				<view class="top-tag-id">编号：{{data.id}}</view>
			</view>
			<uv-icon name="star" color="rgba(0, 0, 0, 0.33)" size="36rpx" v-if="!data.is_collection" bold @click="handleCollection"></uv-icon>
			<uv-icon name="star-fill" color="#fea800" size="36rpx" v-else @click="handleCollection"></uv-icon>
		</view>
		<view class="info-page-title">
			{{data.name}}
		</view>
		<view class="info-page-tag">
			<view class="page-tag-item" v-for="(item, index) in data.tagList" :key="index">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
		},
		data() {
			return {
			}
		},
		emit: ['handleCollection'],
		methods: {
			handleCollection() {
				// this.$emit('handleCollection', this.data.id)
				if(this.data.is_collection) {
					this.data.is_collection = false
				} else {
					this.data.is_collection = true
				}
			}
		},
		onLoad() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.data-info-page {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		padding-bottom: 56rpx;
		border-bottom: 2rpx dashed rgba(209, 209, 214, 1);
	}
	
	.info-page-top {
		display: flex;
		justify-content: space-between;
		
	}
	
	.page-top-tag {
		display: flex;
		align-items: center;
		gap: 16rpx;
		padding-right: 24rpx;
		border-radius: 4000rpx;
		background: rgba(255, 246, 229, 1);
	}
	
	.top-tag-logo {
		background: rgba(254, 168, 0, 1);
		border-radius: 2000rpx;
		color: #fff;
		padding: 12rpx 28rpx;
		font-size: 24rpx;
		line-height: 24rpx;
	}
	
	.top-tag-id {
		display: flex;
		gap: 8rpx;
		align-items: baseline;
		font-size: 22rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.info-page-title {
		font-weight: 600;
		font-size: 40rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.info-page-tag {
		display: flex;
		gap: 8rpx;
	}
	
	.page-tag-item {
		border-radius: 2000rpx;
		background: rgba(242, 242, 247, 1);
		padding: 8rpx 24rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
</style>