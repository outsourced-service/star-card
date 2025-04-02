<template>
	<view class="card-picture-list">
		<uv-collapse ref="collapse" :value="value" :border="false" @close="onClose" @open="onOpen">
			<uv-collapse-item title="寄回信息" name="1" :border="value.includes('1')">
				<view class="picture-container flex-col" style="gap:16px;">
					<view class="address align-center">
						<view class="flex-1 flex-col">
							<view class="name flex-row" style="gap: 6px;">
								<uv-text mode="name" :text="address.name" format="encrypt"></uv-text>
								<uv-text mode="phone" format="encrypt" :text="address.phone" :call="false"></uv-text>
							</view>
							<text>{{address.addressInfo}}</text>
						</view>
						<svg class="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none"
							xmlns="http://www.w3.org/2000/svg" @click="$emit('edit')">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M11.5828 2.0375C12.071 1.54935 12.8624 1.54935 13.3506 2.0375L15.6779 4.36487C16.1661 4.85303 16.1661 5.64448 15.6779 6.13264L7.15717 14.6534C6.95825 14.8523 6.69805 14.9783 6.41864 15.0111L3.89908 15.306C3.1183 15.3975 2.44796 14.754 2.50729 13.9702L2.7063 11.341C2.72886 11.0429 2.85748 10.7628 3.06885 10.5515L11.5828 2.0375ZM10.9615 5.01585L12.6996 6.75396L14.2048 5.24876L12.4667 3.51064L10.9615 5.01585ZM11.5211 7.93248L9.78298 6.19436L4.35656 11.6208L4.20736 13.5919L6.08103 13.3725L11.5211 7.93248ZM17.5 18.3332L2.5 18.3332V16.6665L17.5 16.6665V18.3332Z"
								fill="#FEA800" />
						</svg>
					</view>
					<uv-line dashed></uv-line>
					<view class="flex-row align-center">
						<text class="orderTitle">寄回单号：</text>
						<uv-text mode="text" :lines="1" :text="orderID" suffixIcon="moments" color="#FEA800"
							size="24rpx" line-height="16px" decoration="underline" @click="$setClipboardData({
							data:orderID,
							success:success
						})">
							<template #suffixIcon>
								<svg class="cursor-pointer" style="margin-left: 9.54rpx;" width="12" height="12"
									viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M9.5 2H5V1H9.5C10.0523 1 10.5 1.44772 10.5 2V7.5H9.5V2ZM1.5 4C1.5 3.44772 1.94771 3 2.5 3H7.5C8.05123 3 8.5 3.44586 8.5 3.99919V10.0021C8.5 10.5563 8.051 11 7.50065 11H2.49888C1.94513 11 1.5 10.5508 1.5 10V4ZM7.5 4H2.5V10H7.5V4Z"
										fill="black" fill-opacity="0.44" />
								</svg>
							</template>
						</uv-text>
					</view>
				</view>
			</uv-collapse-item>
		</uv-collapse>
	</view>
</template>

<script>
	export default {
		name: "card-pictureList",
		props: {
			orderID: {
				type: String,
				default: "SF20389724896856"
			},
			address: {
				type: Object,
				default: () => ({
					name: '王先生',
					phone: '18610801301',
					addressInfo: '广东省深圳市南山区打石一路与留新三街交叉口西北方向84米万科云城六期3栋A座1106'
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		emit: ['edit'],
		data() {
			return {
				value: ['1']
			};
		},
		computed: {
			displayUrls() {
				return this.urls.slice(0, 3);
			},
		},
		methods: {
			success(res) {
				uni.showToast({
					icon: "none",
					title: '复制成功',
					duration: 2000
				});
			},

			onOpen(v) {
				this.value.push(v)
			},
			onClose(v) {
				this.value = this.value.find(i => i != v) || []
			}
		}
	}
</script>

<style lang="scss">
	.card-picture-list {
		width: 100%;
		min-height: 62.98rpx;
		border-radius: 32rpx;
		box-shadow: 0px 2px 8px 0px #0000001A;
		
		::v-deep .uv-collapse-item__content__text{
			padding: 16px;
		}

		::v-deep .uv-cell__body {
			padding: 40rpx 24rpx 24rpx 24rpx;
			
			.uv-cell__title {
				flex-direction: row;
				align-items: center;

				.uv-cell__title-text {
					color: #000000FC;
					font-family: PingFang SC;
					font-weight: 600;
					font-size: 32rpx;
					line-height: 40.08rpx;
					margin-right: 8rpx;
				}
			}
		}

		::v-deep .uv-text {
			align-items: flex-end
		}

		.orderTitle {
			font-family: PingFang SC;
			font-weight: 400;
			font-size: 24.81rpx;
			line-height: 32rpx;
			letter-spacing: 0px;
			vertical-align: middle;
			color: #00000054;
		}


		.address {

			gap: 16px;

			.flex-1 {
				background: #F2F3F6;
				border: 1px solid #E5E5EA;
				border-radius: 4px;
				padding: 12px;
				gap: 8px;

				::v-deep .uv-text {
					flex: none;
					width: fit-content;
				}

				text,
				::v-deep .uv-text__value {
					font-family: PingFang SC !important;
					font-weight: 400 !important;
					font-size: 13px !important;
					line-height: 16px !important;
					letter-spacing: 0px;
					vertical-align: middle;
					color: #00000070 !important;
				}

				.name {
					text {
						font-size: 12px !important;
						line-height: 16px !important;
					}
				}
			}
		}
	}
</style>