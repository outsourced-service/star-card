<template>
	<view class="custom-page">
		<view class="custom-list">
			<view class="custom-card" v-for="(item, index) in data" :key="index">
				<uni-card spacing="0" padding="0" margin="0" :border="false"
					shadow="0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.04)">
					<template v-slot:cover>
						<view class="custom-cover">
							<uv-image :src="item.image" mode="aspectFill" width="calc((100vw - 48rpx - 12rpx) / 2)"
								height="348rpx"></uv-image>
						</view>
					</template>
					<view class="custom-title">
						<view class="custom-title-top">
							<view class="custom-tag">
								<view class="tag">
									<uv-text :text="item.type" color="#fff" size="20rpx" lineHeight="40rpx"
										:custom-style="{fontWeight: 700, letterSpacing: '0.12rpx'}" lines="1"></uv-text>
								</view>
								<uv-text :text="item.ot" color="#fea800" size="20rpx" lineHeight="26rpx"
									:custom-style="{fontWeight: 700, letterSpacing: '0.12rpx', width: 'auto'}"
									lines="1"></uv-text>
							</view>
							<uv-text :text="item.card_number" color="rgba(0, 0, 0, 0.33)" size="20rpx"
								lineHeight="26rpx" lines="1"></uv-text>
						</view>
						<uv-text :text="item.card_name" color="#000" size="28rpx" lineHeight="40rpx"
							:custom-style="{fontWeight: 600}" lines="3"></uv-text>
						<view class="custom-title-tags">
							<uv-tags :text="item.eng_publisher" plain color="rgba(0, 0, 0, 0.44)"
								bgColor="rgba(242, 243, 246, 1)" borderColor="rgba(242, 243, 246, 1)" shape="circle"
								size="mini"></uv-tags>
							<uv-tags :text="item.eng_category" plain color="rgba(0, 0, 0, 0.44)"
								bgColor="rgba(242, 243, 246, 1)" borderColor="rgba(242, 243, 246, 1)" shape="circle"
								size="mini"></uv-tags>
						</view>
						<view class="custom-bottom">
							<view class="custom-bottom-user">
								<uv-avatar :src="item.user.avatar" size="40rpx"></uv-avatar>
								<uv-text :text="item.user.nickname" color="rgba(0, 0, 0, 0.66)" size="22rpx"
									lineHeight="26rpx" lines="1"></uv-text>
							</view>
							<view class="custom-bottom-like" @click="handleLike(item.is_like, index)">
								<uv-icon v-if="item.is_like" name="heart-fill" color="#fea800" size="32rpx"></uv-icon>
								<uv-icon v-else name="heart" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
								{{item.like_number}}
							</view>
						</view>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CardModeTwo',
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
			handleLike(value, index) {
				this.data[index].is_like = !value
				if (value) {
					this.data[index].like_number -= 1
				} else {
					this.data[index].like_number += 1
				}
			}
		},
		options: {
			styleIsolation: 'shared'
		},
	};
</script>

<style scoped lang="scss">
	.custom-list {
		width: calc(100vw - 48rpx);
		display: flex;
		/* 使用 flex 布局 */
		flex-wrap: wrap;
		/* 允许换行 */
		justify-content: space-between;
		/* 项目之间的间隔均匀分布 */
		margin: 24rpx;
		gap: 12rpx;
	}

	.custom-card {
		width: calc((100vw - 48rpx - 12rpx) / 2);
		// height: 620rpx;
		margin-bottom: 20rpx;
		/* 10px * 2 */
	}

	.custom-card ::v-deep .uni-card {
		border-radius: 16rpx !important;
		/* 8px * 2 */
		overflow: hidden;
		/* 防止子元素溢出 */
		// height: 620rpx; 
	}

	.custom-title {
		padding: 20rpx;
		/* 7px 10px * 2 */
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 20rpx;
	}

	.custom-title-top {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.custom-tag {
		display: flex;
		background-color: #fff6e5;
		border-radius: 8rpx;
		/* 4px * 2 */
		height: 32rpx;
		/* 16px * 2 */
		align-items: center;
		padding-right: 12rpx;
		/* 6px * 2 */
	}

	.tag {
		background-color: #fea800;
		height: 32rpx;
		/* 16px * 2 */
		font-size: 20rpx;
		/* 10px * 2 */
		border-radius: 8rpx;
		/* 4px * 2 */
		display: flex;
		align-items: center;
		padding: 0 12rpx;
		/* 0 6px * 2 */
		margin-right: 12rpx;
		/* 6px * 2 */
	}

	.custom-title-tags {
		display: flex;
		align-items: center;
		gap: 10rpx;
	}

	.custom-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.custom-bottom-user {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.custom-bottom-like {
		display: flex;
		align-items: center;
		gap: 8rpx;
		font-weight: 400;
		font-size: 24rpx;
		line-height: 26rpx;
	}
</style>