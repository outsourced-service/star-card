<template>
	<view class="card-picture-list">
		<uv-collapse ref="collapse" :value="value" :border="false" @close="onClose" @open="onOpen">
			<uv-collapse-item title="卡牌信息" name="1" :border="value.includes('1')">
				<template #label>
					<view v-if="label === '已出分'" class="label justify-center align-center"
						style="display: inline-flex;gap:2px;background: #FEA80033;">
						<image
							src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCQkJCQkJCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgoJCQkJCQkJCWQ9Ik04LjM5ODQ1IDIuMjVDOC42MDU2OSAyLjI1IDguNzkxMDMgMi4zODAxNiA4Ljg2Mjk1IDIuNTc2MjNMOS42OTA0MSA0LjgzMTk2TDExLjkyNjYgNS42NjY2NkMxMi4xMjEgNS43MzkyMSAxMi4yNSA1LjkyNjE2IDEyLjI1IDYuMTM1MjJDMTIuMjUgNi4zNDQyOCAxMi4xMjEgNi41MzEyMyAxMS45MjY2IDYuNjAzNzhMOS42OTA0MSA3LjQzODQ4TDguODYyOTUgOS42OTQyMUM4Ljc5MTAzIDkuODkwMjcgOC42MDU2OSAxMC4wMjA0IDguMzk4NDUgMTAuMDIwNEM4LjE5MTIgMTAuMDIwNCA4LjAwNTg3IDkuODkwMjcgNy45MzM5NSA5LjY5NDIxTDcuMTA2NDggNy40Mzg0OEw0Ljg3MDMgNi42MDM3OEM0LjY3NTkzIDYuNTMxMjMgNC41NDY5IDYuMzQ0MjggNC41NDY5IDYuMTM1MjJDNC41NDY5IDUuOTI2MTYgNC42NzU5MyA1LjczOTIxIDQuODcwMyA1LjY2NjY2TDcuMTA2NDggNC44MzE5Nkw3LjkzMzk1IDIuNTc2MjNDOC4wMDU4NyAyLjM4MDE2IDguMTkxMiAyLjI1IDguMzk4NDUgMi4yNVpNNC4yMDMxMSA3Ljc5NTc0QzQuMzg2MDggNy43OTU3NCA0LjU1NDE0IDcuODk3NSA0LjY0MDIgOC4wNjAzOEw1LjM1NjQ1IDkuNTQxNjdMNi4zNzc4NyA5LjkxODA5QzYuNTU2NjkgMTAuMDA2IDYuNjY2MDQgMTAuMTkzMiA2LjY1NTUyIDEwLjM5MzZDNi42NDUwMSAxMC41OTQgNi41MTY2OSAxMC43Njg2IDYuMzI5NjcgMTAuODM3TDUuMzU5MTMgMTEuMTkxN0w0LjY1MzYxIDEyLjc0OTZDNC41NzMwNSAxMi45Mjc1IDQuMzk3IDEzLjA0MTcgNC4yMDMxMSAxMy4wNDE3QzQuMDA5MjIgMTMuMDQxNyAzLjgzMzE3IDEyLjkyNzUgMy43NTI2MSAxMi43NDk2TDMuMDQ3MDkgMTEuMTkxN0wyLjA3NjU1IDEwLjgzN0MxLjg4OTUzIDEwLjc2ODYgMS43NjEyMSAxMC41OTQgMS43NTA3IDEwLjM5MzZDMS43NDAxOSAxMC4xOTMyIDEuODQ5NTMgMTAuMDA2IDIuMDI4MzUgOS45MTgwOUwzLjA0OTc3IDkuNTQxNjdMMy43NjYwMyA4LjA2MDM4QzMuODUyMDggNy44OTc1IDQuMDIwMTQgNy43OTU3NCA0LjIwMzExIDcuNzk1NzRaIgoJCQkJCQkJCWZpbGw9IiNGRUE4MDAiIC8+CgkJCQkJCTwvc3ZnPg=="
							style="width: 28rpx; height: 28rpx;" />
						<text style="color: #FEA800;font-weight:600;">{{ label }}</text>
					</view>
					<view v-else class="label" style="display: inline-block;">
						<text>{{ label }}</text>
					</view>
				</template>
				<view class="picture-container flex-row" style="gap:10px;">
					<uv-image v-for="(item, index) in displayUrls" :key="index" :src="ImageFormatWebp(item)"
						mode="aspectFit" width="90px" height="90px" bgColor="#F2F3F6" webp radius="8px"
						@click="$previewImage({ current: index, urls: urls })" />
					<view v-if="urls.length - 3 > 0" class="more-pictures" @click="$previewImage({ urls: urls })">
						<uv-text :text="`+${urls.length - 3}`" align="center" size="22.9rpx" color="#000000A8"
							line-height="30.53rpx" bold></uv-text>
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
			urls: {
				type: Array,
				default: () => new Array(10).fill(
					"https://s3-alpha-sig.figma.com/img/9fd0/d949/91f3db9af898cb3ff3578de1f7b2340e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tiwAlSnQMGhmwzbalTJ-Az-MnvYt6E-NHBpZe8Gkk4Uh9BiNMYhEI5bGuTa6LJcip0MaoDbdlmIc3SXplfiIm7POyV4SzgA1UjjOYsbzV75uu1Z7dobO4sWnIW9wNmjm6vF1-KOvmBk3pe8VuJHiPNPDLHCifQrMfOmlchyWwHSLUZ2itrP0u5qFe6DlbGp~Zl4zfUEeYt8dKe-krh8TPj58dTuBdGqGvybUMchiDlciSQ9TrOU9Hl4-WTuU5DcmPmPuHcFBu1v0JrVxpdUGlYw4QSjPEN00OS6~jL8mSYTKBxvcSKlytdsITZQdobCL2WK904PeHohWVc-3Jkhk8w__"
				)
			},
			label: {
				type: String,
				default: "已出分"
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				value: ['1'],
			};
		},
		computed: {
			displayUrls() {
				return this.urls.slice(0, 3);
			}
		},
		methods: {
			ImageFormatWebp(src) {
				// #ifdef MP-WEIXIN
				return src + this.$ImageFormatWebp
				// #endif
				// #ifndef MP-WEIXIN
				return src
				// #endif
			},
			handlePictureClick(index) {
				// 点击图片时的处理逻辑
				this.$emit('picture-click', index);
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

		::v-deep .uv-collapse-item__content__text {
			padding: 16px;
		}

		::v-deep .uv-cell__body {
			padding: 38.17rpx 22.9rpx 22.9rpx 22.9rpx;

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

		.picture-container {
			position: relative;
		}

		.more-pictures {
			flex: 1;
			max-width: 89.69rpx;
			background: #F2F3F6;
			display: flex;
			align-items: center;
			justify-content: center;

		}

		.label {
			padding: 6rpx 19.08rpx;
			width: fit-content;
			height: fit-content;
			min-height: 36.26rpx;
			border-radius: 1000px;
			gap: 3px;
			background: #00000008;
			font-family: PingFang SC;
			font-weight: 400;
			font-size: 20.99rpx;
			letter-spacing: 0.06px;
			color: #00000054;
			margin-left: 7.63rpx;
		}
	}
</style>