<template>
	<view class="page-search">
		<uv-search placeholder="请输入要查询的内容" v-model="search" :showAction="true" actionText="搜索" searchIconColor="rgba(0, 0, 0, 0.2)" 
			searchIconSize="32rpx" placeholderColor="rgba(0, 0, 0, 0.2)" @search="handleSearch"></uv-search>
	</view>
	<view class="page">
		<view class="page-form">
			<view class="page-form-top">
				<view class="page-form-title">历史搜索</view>
				<view class="page-form-guide" @click="is_eidt = true" v-if="!is_eidt">编辑</view>
				<view class="page-form-guide" @click="is_eidt = false" v-else>完成</view>
			</view>
			<view class="page-tag-list">
				<view class="tag-list-item" v-for="(item, index) in tagList" :key="index" @click="handleTag(item)">
					{{item}}
					<view class="list-item-icon" v-if="is_eidt" @click="handleEidt(index)">
						<uv-icon name="close-circle-fill" color="rgba(174, 174, 178, 1)" size="32rpx"></uv-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
		},
		data() {
			return {
				search: '',
				tagList: [
					'PSA日本 PSA美国 中国', '已出分', 'BGS 已出分', 'PSA 已出分', 'PSA日本 PSA美国 中国PSA日本 PSA美国 中国'
				],
				is_eidt: false
			}
		},
		methods: {
			handleEidt(index) {
				this.tagList.splice(index, 1)
			},
			handleTag(value) {
				if(this.is_eidt) {
					
				} else {
					this.search = value
				}
			},
			handleSearch() {
				// uni.$emit('returnNote', {
				// 	search: this.search
				// })
				uni.navigateBack()
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	body {
		background-color: #f2f3f6 !important;
	}
	
	.page-search {
		display: flex;
		background-color: #fff;
		padding: 8rpx 32rpx 32rpx 32rpx;
	}
	
	.page-search ::v-deep .uv-search__action {
		font-weight: 600 !important;
		font-size: 28rpx !important;
		color: rgba(254, 168, 0, 1) !important;
	}
	
	.page {
		background-color: #f2f3f6;
		padding: 40rpx 32rpx;
		display: flex;
		flex-direction: column;
		gap: 56rpx;
	}
	
	.page-form {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
	
	.page-form-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-form-title {
		font-weight: 600;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.99);
		display: flex;
		gap: 8rpx;
	}
	
	.page-form-guide {
		font-weight: 600;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.page-tag-list {
		display: flex;
		flex-wrap: wrap; // 允许元素换行
		gap: 16rpx; // 设置元素之间的间隔
	}
	
	.tag-list-item {
		margin-top: 8rpx;
		width: auto; // 宽度自适应内容
		max-width: 480rpx; // 最大宽度为 480rpx
		display: inline-block; // 使元素以行内块元素显示，以支持宽度自适应
		position: relative; /* 添加相对定位 */
		opacity: 0.8;
		border-radius: 200rpx;
		padding: 8rpx 24rpx;
		background-color: rgba(234, 234, 239, 1);
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.99);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.list-item-icon {
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}
</style>