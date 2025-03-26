<template>
	<view class="page">
		<view class="page-list">
			<view :class="item.id === addressDefault ? 'page-list-card-default' : 'page-list-card'" v-for="(item, index) in addressList" :key="index" @click="handleAddress(item.id)">
				<view class="list-card-left">
					<view class="card-left-top">
						<view class="left-top-name">
							{{ item.consignee }}
						</view>
						<view class="left-top-phone">
							{{ item.phone }}
						</view>
						<view class="left-top-default" v-if="item.id === addressDefault">
							默认
						</view>
					</view>
					<view class="card-left-address">
						{{ item.province }}{{ item.city }}{{ item.area }}{{ item.address_detail }}{{ item.house }}
					</view>
				</view>
				<view class="list-card-right">
					<uv-icon name="edit-pen" color="rgba(254, 168, 0, 1)" size="40rpx"></uv-icon>
				</view>
			</view>
		</view>
		<view class="page-bottom-button">
			<uv-button text="新增地址" color="#fea800" size="large" shape="circle" @click="handleAdd"></uv-button>
		</view>
	</view>
</template>

<script>
	import {
		addressList
	} from '/mock/address';
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
		},
		computed: {
		    maxDefaultNum() {
		        return Math.max(...this.addressList.map(item => item.set_default_num));
		    }
		},
		data() {
			return {
				addressList: addressList.map(item => ({
					...item,
					// 预处理：将 set_default_num 转换为数字（空字符串转为0）
					set_default_num: Number(item.set_default_num) || 0
				})),
				addressDefault: null // 初始化为 null
			}
		},
		methods: {
			handleItem() {
				uni.navigateTo({
					url: '/pages/order/procedure/index'
				})
			},
			handleAddress(id) {
				this.addressDefault = id;
				uni.$emit('returnAddressId', {
					address_id: id
				})
				uni.navigateBack()
			}
		},
		mounted() {
			// 直接访问计算属性 maxDefaultNum
			this.addressDefault = this.addressList.find(item => item.set_default_num === this.maxDefaultNum)?.id;
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f6f7f9;
		padding: 40rpx 32rpx;
	}
	
	.page-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		margin-bottom: 180rpx;
	}
	
	.page-list-card-default {
		display: flex;
		justify-content: space-between;
		gap: 32rpx;
		border-radius: 32rpx;
		border-width: 2rpx;
		padding: 32rpx;
		background: rgba(255, 246, 229, 1);
		border: 1px solid rgba(254, 168, 0, 1);
	}
	
	.page-list-card {
		display: flex;
		justify-content: space-between;
		gap: 32rpx;
		border-radius: 32rpx;
		border-width: 2rpx;
		padding: 32rpx;
		background: #fff;
	}
	
	.list-card-left {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}
	
	.card-left-top {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.left-top-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.8);
	}
	
	.left-top-phone {
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
		margin-left: 4rpx;
	}
	
	.left-top-default {
		display: flex;
		background: rgba(255, 238, 204, 1);
		padding: 4rpx 16rpx;
		gap: 6rpx;
		border-radius: 1000rpx;
		font-weight: 600;
		font-size: 22rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.card-left-address {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.list-card-right {
		display: flex;
		align-items: center;
	}
	
	.page-bottom-button {
		position: fixed;
		bottom: 0;
		// margin: 0 32rpx 40rpx 32rpx;
		padding-bottom: 80rpx;
		width: calc(100vw - 64rpx);
	}
</style>