<template>
	<view class="album-info-page">
		<view class="info-page-top">
			<view class="page-top-left" @click="handleManage">
				<view class="top-right-button"><uv-icon name="edit-pen" color="#fff" size="30rpx"></uv-icon>管理</view>
			</view>
			<view class="page-top-right">
				<view class="top-right-button"><uv-icon name="share-square" color="#fff" size="30rpx"></uv-icon>分享</view>
				<view class="top-right-button"><uni-icons type="image" color="#fff" size="30rpx"></uni-icons>海报</view>
			</view>
		</view>
		<view class="info-page-data">
			<view class="page-data-top">
				<view class="data-top-title">
					<view class="top-title-name">{{albumData.name}}</view>
					<view class="top-title-like">
						<uv-button v-if="!albumData.is_favorite" @click="handleFavorite(albumData.is_favorite)"
							iconColor="#fff" iconSize="30rpx" icon="heart" text="收藏" color="rgba(254, 168, 0, 1)"
							shape="circle"
							:custom-style="{height: '58rpx', width: '126rpx', fontSize: '24rpx'}"></uv-button>
						<uv-button v-else @click="handleFavorite(albumData.is_favorite)" iconColor="#fea800"
							iconSize="30rpx" icon="heart-fill" text="已收藏" :plain="true" color="rgba(0, 0, 0, 0.44)"
							shape="circle"
							:custom-style="{height: '58rpx', width: '150rpx', fontSize: '24rpx !important', borderColor: 'rgba(229, 229, 234, 1)'}"></uv-button>
					</view>
				</view>
				<view class="data-top-signature">{{albumData.signature || '暂无简介'}}</view>
			</view>
			<view class="page-data-user">
				<uv-avatar :src="albumData.cover" size="48rpx"></uv-avatar>
				<view class="data-user-name">{{albumData.user_name}}</view>
				<view class="data-user-number">{{albumData.card_number}}张 · {{albumData.follow_number}}人收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "album-info",
		props: {
			albumData: {
				type: Object,
				default: () => ({
					user_name: 'MODU球星卡',
					cover: 'https://s3-alpha-sig.figma.com/img/9fd0/d949/91f3db9af898cb3ff3578de1f7b2340e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tiwAlSnQMGhmwzbalTJ-Az-MnvYt6E-NHBpZe8Gkk4Uh9BiNMYhEI5bGuTa6LJcip0MaoDbdlmIc3SXplfiIm7POyV4SzgA1UjjOYsbzV75uu1Z7dobO4sWnIW9wNmjm6vF1-KOvmBk3pe8VuJHiPNPDLHCifQrMfOmlchyWwHSLUZ2itrP0u5qFe6DlbGp~Zl4zfUEeYt8dKe-krh8TPj58dTuBdGqGvybUMchiDlciSQ9TrOU9Hl4-WTuU5DcmPmPuHcFBu1v0JrVxpdUGlYw4QSjPEN00OS6~jL8mSYTKBxvcSKlytdsITZQdobCL2WK904PeHohWVc-3Jkhk8w__',
					name: '小小卡册',
					is_favorite: false,
					signature: '持续更新我最喜欢的卡牌们~ 欢迎交流！持续更新我最喜欢的卡牌们~ 欢迎交流！最多两行，编辑时限制字数',
					card_number: 2000,
					follow_number: 300
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		emit: ['handleManage'],
		methods: {
			handleManage() {
				this.$emit('handleManage')
			},
			handleFavorite(value) {
				this.albumData.is_favorite = !value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album-info-page {
		display: flex;
		flex-direction: column;
		gap: 80rpx;
	}
	
	.info-page-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-top-left {
		display: flex;
		align-items: center;
	}
	
	.top-left-identity {
		padding: 8rpx 20rpx;
		border-radius: 200rpx;
		background: rgba(254, 168, 0, 1);
		font-weight: 600;
		font-size: 20rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.top-left-tag {
		display: flex;
		align-items: center;
		gap: 4rpx;
		font-weight: 600;
		font-size: 20rpx;
		color: rgba(254, 168, 0, 1);
		margin-left: 4rpx;
	}
	
	.page-top-right {
		display: flex;
		gap: 12rpx;
		align-items: center;
	}
	
	.top-right-button {
		display: flex;
		gap: 8rpx;
		align-items: center;
		border: 2rpx solid rgba(209, 209, 214, 1);
		border-radius: 200rpx;
		border-width: 2rpx;
		padding: 12rpx 28rpx;
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.info-page-data {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.page-data-top {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.data-top-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.top-title-name {
		font-weight: 600;
		font-size: 40rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.top-title-like {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.top-title-like ::v-deep .uv-button__text {
		font-size: 24rpx !important;
	}
	
	.data-top-signature {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.page-data-user {
		display: flex;
		align-items: center;
		gap: 20rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.data-user-name {
		font-size: 24rpx;
	}
	
	.data-user-number {
		font-size: 24rpx;
	}
</style>