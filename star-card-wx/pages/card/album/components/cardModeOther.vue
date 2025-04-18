<template>
	<view class="custom-page">
		<view class="custom-list">
			<view class="custom-card" v-for="(item, index) in data" :key="index">
				<uni-card spacing="0" padding="28rpx 24rpx 24rpx 16rpx" margin="0" :border="false"
					shadow="0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.04)">
					<view class="custom-card">
						<view class="custom-card-select" v-if="is_select">
							<uni-icons type="circle" size="40rpx" color="#d1d1d6" v-if="!item.is_select" @click="handleSelected(index)"></uni-icons>
							<uni-icons type="checkbox-filled" size="40rpx" color="#fea800" v-else @click="handleSelectNo(index)"></uni-icons>
						</view>
						<view class="custom-card-item">
							<view class="card-item-image">
								<uv-image :src="item.image" mode="aspectFill" width="200rpx" radius="16rpx"
									height="288rpx"></uv-image>
								<view class="card-item-sale" v-if="item.on_sale">上架中</view>
							</view>
							<view class="card-item-info" :style="is_select ? 'width: calc(100% - 200rpx - 24rpx - 40rpx - 16rpx);' : 'width: calc(100% - 200rpx - 24rpx);'">
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
								</view>
								<view class="custom-bottom">
									<view class="custom-bottom-like" @click="handleLike(item.is_like, index)">
										<uv-icon v-if="item.is_like" name="heart-fill" color="#fea800" size="32rpx"></uv-icon>
										<uv-icon v-else name="heart" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
										{{item.like_number}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
import { date } from '../../../../uni_modules/uv-ui-tools/libs/function/test';

	export default {
		name: 'CardModeTwo',
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			is_select: {
				type: Boolean,
				default: () => (false),
			}
		},
		data() {
			return {
				selectCard: ['handleSelected', 'handleSelectNo']
			}
		},
		methods: {
			handleSelected(index) {
				this.$emit('handleSelected', index)
			},
			handleSelectNo(index) {
				this.$emit('handleSelectNo', index)
			},
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
		// width: calc(100vw - 48rpx);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}
	
	.custom-card {
		width: 100%;
		display: flex;
		gap: 16rpx;
	}
	
	.custom-card ::v-deep .uni-card {
		border-radius: 16rpx !important;
		/* 8px * 2 */
		overflow: hidden;
		/* 防止子元素溢出 */
		// height: 620rpx; 
	}
	
	.custom-card-select {
		display: flex;
		align-items: center;
	}
	
	.custom-card-item {
		display: flex;
		gap: 24rpx;
		align-items: center;
		width: 100%;
	}
	
	.card-item-image {
		border-radius: 16rpx;
	}
	
	.card-item-sale {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom-width: 8rpx;
		background: rgba(52, 199, 89, 0.66);
		font-weight: 600;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 1);
		position: absolute;
		bottom: 0; 
		padding: 12rpx 0;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}
	
	.card-item-info {
		width: calc(100% - 200rpx - 24rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 288rpx;
	}

	.custom-title {
		display: flex;
		flex-direction: column;
		gap: 8rpx;
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
		justify-content: flex-end;
		width: 100%;
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