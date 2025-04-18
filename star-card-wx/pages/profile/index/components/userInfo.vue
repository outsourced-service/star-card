<template>
	<view class="user-info-page">
		<view class="info-page-top">
			<view class="page-top-left">
				<view class="top-left-identity">{{userData.user_identity}}</view>
				<view class="top-left-tag" v-if="userData.user_identity == '个人用户'">
					<span v-if="!userData.is_accreditation">未实名</span>
					<span v-else><uv-icon name="checkmark-circle-fill" color="#fea800" size="24rpx"></uv-icon>已实名</span>
				</view>
				<view class="top-left-tag" v-else>
					<span v-if="!userData.is_accreditation">未缴纳保证金</span>
					<span v-else>已缴纳保证金</span>
				</view>
			</view>
			<view class="page-top-right">
				<view class="top-right-button"><uv-icon name="share-square" color="#fff" size="30rpx"></uv-icon>分享</view>
				<view class="top-right-button"><uni-icons type="image" color="#fff" size="30rpx"></uni-icons>海报</view>
			</view>
		</view>
		<view class="info-page-data">
			<view class="page-data-top">
				<uv-avatar :src="userData.cover" size="176rpx"></uv-avatar>
				<view class="data-top-right">
					<view class="top-right-name">{{userData.name}}</view>
					<view class="top-right-item">
						<view class="right-item">星卡号：{{userData.id_number}}</view>
						<view class="right-item">IP属地：{{userData.address}}</view>
						<view class="right-item">9分钟前来过</view>
					</view>
				</view>
			</view>
			<view class="page-data-canter">
				<view class="data-canter-left">
					<view class="canter-left-item">
						<view class="left-item-number">{{userData.show_card_number}}</view>
						<view class="left-item-title">展示</view>
					</view>
					<view class="canter-left-item">
						<view class="left-item-number">{{userData.fans_number}}</view>
						<view class="left-item-title">粉丝</view>
					</view>
					<view class="canter-left-item">
						<view class="left-item-number">{{userData.like_favorite_count}}</view>
						<view class="left-item-title">获赞与收藏</view>
					</view>
				</view>
				<view class="data-canter-button" @click="handleEidt">编辑资料</view>
			</view>
			<view class="page-data-signature">{{userData.signature}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "user-info",
		props: {
			userData: {
				type: Object,
				default: () => ({
					user_identity: '个人用户',
					cover: 'https://s3-alpha-sig.figma.com/img/9fd0/d949/91f3db9af898cb3ff3578de1f7b2340e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tiwAlSnQMGhmwzbalTJ-Az-MnvYt6E-NHBpZe8Gkk4Uh9BiNMYhEI5bGuTa6LJcip0MaoDbdlmIc3SXplfiIm7POyV4SzgA1UjjOYsbzV75uu1Z7dobO4sWnIW9wNmjm6vF1-KOvmBk3pe8VuJHiPNPDLHCifQrMfOmlchyWwHSLUZ2itrP0u5qFe6DlbGp~Zl4zfUEeYt8dKe-krh8TPj58dTuBdGqGvybUMchiDlciSQ9TrOU9Hl4-WTuU5DcmPmPuHcFBu1v0JrVxpdUGlYw4QSjPEN00OS6~jL8mSYTKBxvcSKlytdsITZQdobCL2WK904PeHohWVc-3Jkhk8w__',
					name: '小小收藏家',
					id_number: 13289697,
					address: '深圳市',
					show_card_number: 35,
					fans_number: 323,
					like_favorite_count: '1.4k',
					signature: '⚡️ TCG ｜ 🏀 球星卡 🙈 新手卡牌玩家，请大家多多指教~',
					is_accreditation: false
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		emit: ['handleEidt'],
		methods: {
			handleEidt() {
				this.$emit('handleEidt')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-info-page {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.info-page-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-top-left {
		background: rgba(254, 168, 0, 0.2);
		display: flex;
		gap: 4rpx;
		align-items: center;
		padding-right: 16rpx;
		border-radius: 200rpx;
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
		gap: 48rpx;
	}
	
	.page-data-top {
		display: flex;
		gap: 40rpx;
		align-items: center;
	}
	
	.data-top-right {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		padding: 12rpx 0;
	}
	
	.top-right-name {
		font-weight: 600;
		font-size: 40rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.top-right-item {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
		opacity: 0.66;
	}
	
	.right-item {
		display: flex;
		align-items: center;
		gap: 4rpx;
		font-size: 22rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.page-data-canter {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.data-canter-left {
		display: flex;
		align-items: center;
		gap: 48rpx;
	}
	
	.canter-left-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rpx;
	}
	
	.left-item-number {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.left-item-title {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.data-canter-button {
		padding: 12rpx 32rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		border: 2rpx solid rgba(209, 209, 214, 1);
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
	}
	
	.page-data-signature {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 1);
	}
</style>