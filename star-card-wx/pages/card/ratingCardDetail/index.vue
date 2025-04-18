<template>
	<view class="page">
		<view class="page-swiper">
			<swiper class="page-swiper-box" :current="swiperIndex">
				<swiper-item v-for="(item, index) in cardInfoImg" :key="index">
					<uv-image :src="item" width="400rpx" height="640rpx"></uv-image>
				</swiper-item>
			</swiper>
			<view class="page-swiper-text">星卡快送技术支持</view>
		</view>
		<view class="page-info">
			<view class="page-info-top">
				<dataInfo :noUser="true" :data="cardInfo"></dataInfo>
			</view>
			<view class="page-info-item">
				<view class="info-item-rating">
					<infoRating :data="cardInfo" @handleOpenScore="handleOpenScore"></infoRating>
				</view>
				<view class="info-item-card">
					<cardInfo></cardInfo>
				</view>
			</view>
		</view>
		<view class="page-feature">
			<view class="page-feature-button" @click="shareWx">
				<uv-icon name="share-square" color="#fea800" size="40rpx"></uv-icon>
				<view class="feature-button-text">分享</view>
			</view>
			<view style="border-top: 2rpx solid rgba(242, 242, 247, 1)"></view>
			<view class="page-feature-button" @click="sharePoster">
				<uni-icons type="image" color="#fea800" size="40rpx"></uni-icons>
				<view class="feature-button-text">
					生成<br>海报</br>
				</view>
			</view>
		</view>
	</view>
	<uv-popup ref="scoreDetailPopup" mode="center" round="40rpx" closeable>
		<popupScoreDetail :list="scoreList"></popupScoreDetail>
	</uv-popup>
</template>

<script>
	import dataInfo from "../components/data-info/data-info.vue";
	import infoRating from "../components/info-rating/info-rating.vue";
	import cardInfo from "../components/card-info/card-info.vue";
	import popupScoreDetail from "../components/popup-score-detail/popup-score-detail.vue";
	import cardSwiper from "../components/card-swiper/card-swiper.vue";
	
	export default {
		components: {
			dataInfo,
			infoRating,
			cardInfo,
			popupScoreDetail,
			cardSwiper
		},
		props: {
		},
		options: {
		    styleIsolation: 'shared'
		},
		computed: {
		},
		data() {
			return {
				cardInfoImg: [{
					url: 'https://s3-alpha-sig.figma.com/img/d482/b2b0/4cedb767c246b857db81b04cbf5d8cac?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sgoAVOWC5vAKqRt2pbyTwHR4arazraelJfB5KwYpvMDujHKQFZjgvGjYGWHzkm1PUBiQttMAReAfFpGpbQwp31jfKELeAbTHVLMHy2lRJnGgrrVp1y17hnyt5Dxc-EeqC7swAIOhkAWfTNpKhjAjRWP8B~g16YR4wPHDh82u5jOWxxG845I~FiHzVLnq2n3lBuwyjUbizupS8lb97CJ3cu7DGXX4oVPlhGPJoYF8hpo5Ogs8t1jxL1jn3YmZvzTn4r6o5P7Pyh8vgcDkqjqMFYRX56kh70buaqTVE9zX24rTx7aUupglcwZv94xHSMcNBg5y0qRVpJjom2JjCO939w__'
				}, {
					url: 'https://s3-alpha-sig.figma.com/img/d482/b2b0/4cedb767c246b857db81b04cbf5d8cac?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sgoAVOWC5vAKqRt2pbyTwHR4arazraelJfB5KwYpvMDujHKQFZjgvGjYGWHzkm1PUBiQttMAReAfFpGpbQwp31jfKELeAbTHVLMHy2lRJnGgrrVp1y17hnyt5Dxc-EeqC7swAIOhkAWfTNpKhjAjRWP8B~g16YR4wPHDh82u5jOWxxG845I~FiHzVLnq2n3lBuwyjUbizupS8lb97CJ3cu7DGXX4oVPlhGPJoYF8hpo5Ogs8t1jxL1jn3YmZvzTn4r6o5P7Pyh8vgcDkqjqMFYRX56kh70buaqTVE9zX24rTx7aUupglcwZv94xHSMcNBg5y0qRVpJjom2JjCO939w__'
				}],
				cardInfo: {
					id: '0016807181',
					tagList: [
						'Kobe Bryant', 'Auto 10'
					],
					name: '2023 Critical Blow #BT22138 Bursting Rage SEC ritical Blow #BT',
					is_collection: false,
					height_number: 12,
					now_number: 159,
					card_quality: 'NEar mint 8',
					sign: 'Auto 10'
				},
				scoreList: [
					{ name: '居中', number: 9.5 }, { name: '卡角', number: 9.5 }, { name: '居中', number: 9.5 }, { name: '卡角', number: 9.5 },
					{ name: '居中', number: 9.5 }, { name: '卡角', number: 9.5 }, { name: '居中', number: 9.5 }, { name: '卡角', number: 9.5 },
					{ name: '居中', number: 9.5 }, { name: '卡角', number: 9.5 }, { name: '居中', number: 9.5 }, { name: '卡角', number: 9.5 }
				]
			}
		},
		emit: [],
		methods: {
			sharePoster() {
				// 生成海报的逻辑
			},
			shareWx() {
				uni.showShareMenu({
					withShareTicket: true,
					success: () => {
						console.log('分享弹窗')
					}
				})
			},
			handleOpenScore() {
				this.$refs.scoreDetailPopup.open();
			}
		},
		onLoad() {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100vh;
	}
	
	.page-swiper {
		// width: 393;
		// height: 411;
		gap: 40rpx;
		padding-bottom: 64rpx;
		padding-top: 44rpx;
		border-radius: 16rpx;
		background: rgba(242, 243, 246, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: -40rpx;
		z-index: 8;
	}
	
	.page-swiper-box {
		width: 400rpx;
		height: 640rpx;

	}
	
	.page-swiper-text {
		display: flex;
		gap: 8rpx;
		align-items: baseline;
		font-family: PingFang SC;
		font-weight: 600;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.2);
	}
	
	.page-info {
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 56rpx;
		padding: 48rpx 32rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		background-color: #fff;
	}
	
	.page-info-item {
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.page-feature {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		border-top-left-radius: 16rpx;
		border-bottom-left-radius: 16rpx;
		padding: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.1);
		
		position: absolute;
		top: 64rpx; 
		right: 0;
		z-index: 20;
	}
	
	.page-feature-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12rpx;
	}
	
	.feature-button-text {
		font-weight: 600;
		font-size: 22rpx;
		line-height: 26rpx;
		color: rgba(0, 0, 0, 0.44);
	}
</style>