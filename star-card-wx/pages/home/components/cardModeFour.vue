<template>
	<view class="custom-card" v-for="(item, index) in data" :key="index">
		<uni-card spacing="30rpx 24rpx 30rpx 24rpx" padding="0" margin="24rpx" :border="false"
			shadow="0rpx 8rpx 40rpx 0rpx rgba(0, 0, 0, 0.05)">
			<template v-slot:title>
				<view class="custom-top">
					<view class="custom-top-left">
						<view class="top-left-title">
							<view class="left-title">
								<uv-text :text="item.name" color="rgba(0, 0, 0, 0.99)" size="32rpx" lineHeight="42rpx"
									:custom-style="{fontWeight: 600}"></uv-text>
							</view>
							<view class="left-line"></view>
							<view class="custom-bottom-text">
								{{item.card_number}}张
								&nbsp;·&nbsp;
								{{item.favorite_number}}人收藏
							</view>
						</view>
						<uv-text :text="item.introduction" color="rgba(0, 0, 0, 0.66)" size="24rpx"
							lineHeight="32rpx"></uv-text>
					</view>
					<view class="custom-top-like">
						<uv-button v-if="!item.is_favorite" @click="handleFavorite(item.is_favorite, index)"
							iconColor="#fff" iconSize="30rpx" icon="heart" text="收藏" color="rgba(254, 168, 0, 1)"
							shape="circle"
							:custom-style="{height: '58rpx', width: '126rpx', fontSize: '24rpx'}"></uv-button>
						<uv-button v-else @click="handleFavorite(item.is_favorite, index)" iconColor="#fea800"
							iconSize="30rpx" icon="heart-fill" text="已收藏" :plain="true" color="rgba(0, 0, 0, 0.44)"
							shape="circle"
							:custom-style="{height: '58rpx', width: '150rpx', fontSize: '24rpx !important', borderColor: 'rgba(229, 229, 234, 1)'}"></uv-button>
					</view>
				</view>
			</template>
			<view class="horizontal-list">
				<view class="list-container">
					<view v-for="(cardItem, cardIndex) in item.card_list" :key="cardIndex">
						<uv-image :src="cardItem.image" mode="aspectFill" width="162rpx" height="236rpx"
							radius="8rpx"></uv-image>
					</view>
				</view>
			</view>
			<view class="custom-bottom">
				<view class="custom-bottom-user">
					<uv-avatar :src="item.user.avatar" size="40rpx"></uv-avatar>
					<uv-text :text="item.user.nickname" color="rgba(0, 0, 0, 0.66)" size="22rpx" lineHeight="26rpx"
						lines="1"></uv-text>
				</view>
				<view class="custom-bottom-text">
					{{item.user.city}}
					&nbsp;·&nbsp;
					{{item.user.follow_number}}
					+人关注
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			},
		},
		data() {
			return {}
		},
		methods: {
			handleFavorite(value, index) {
				this.data[index].is_favorite = !value
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		mounted() {}
	};
</script>

<style scoped lang="scss">
	.custom-card {
		/* width: 738rpx; */
		/* 369px * 2 */
		// height: 660rpx; /* 330px * 2 */
	}

	.custom-card ::v-deep .uni-card {
		border-radius: 24rpx !important;
		/* 12px * 2 */
		overflow: hidden;
		/* 防止子元素溢出 */
		// height: 660rpx; /* 330px * 2 */
	}

	.custom-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 28rpx;
		align-items: flex-start;
	}

	.custom-top-left {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		/* 8px * 2 */
	}

	.top-left-title {
		display: flex;
		gap: 16rpx;
		align-items: center;
	}

	.left-line {
		width: 2rpx;
		background-color: rgba(209, 209, 214, 1);
		height: 32rpx;
	}

	.custom-top-like ::v-deep .uv-button__text {
		font-size: 24rpx !important;
	}

	.horizontal-list {
		overflow-x: auto;
	}

	.list-container {
		display: flex;
		flex-direction: row;
		gap: 20rpx;
		/* 10px * 2 */
	}

	.custom-bottom {
		display: flex;
		align-items: center;
		gap: 24rpx;
		margin-top: 28rpx;
	}

	.custom-bottom-user {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.custom-bottom-text {
		display: flex;
		color: rgba(0, 0, 0, 0.33);
		font-size: 22rpx;
		/* 11px * 2 */
		align-items: center;
	}
</style>