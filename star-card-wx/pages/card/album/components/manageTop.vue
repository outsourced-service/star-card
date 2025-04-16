<template>
	<view class="album-info-page">
		<view class="info-page-data">
			<view class="page-data-top">
				<view class="data-top-title">
					<view class="top-title-name">{{albumData.name}}</view>
				</view>
				<view class="data-top-signature">{{albumData.signature}}</view>
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
		color: rgba(0, 0, 0, 0.99);
	}
	
	.data-top-signature {
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.44);
	}
	
	.page-data-user {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}
	
	.data-user-name {
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}
	
	.data-user-number {
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.2);
	}
</style>