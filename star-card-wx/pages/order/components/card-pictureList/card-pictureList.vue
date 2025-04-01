<template>
	<view class="card-picture-list">
		<uv-collapse ref="collapse" :value="['1']" :border="false">
			<uv-collapse-item title="卡牌信息" name="1" :border="true">
				<template #label>
					<view v-if="label === '已出分'" class="label justify-center align-center"
						style="display: inline-flex;gap:2px;background: #FEA80033;">
						<svg width="14" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M8.39845 2.25C8.60569 2.25 8.79103 2.38016 8.86295 2.57623L9.69041 4.83196L11.9266 5.66666C12.121 5.73921 12.25 5.92616 12.25 6.13522C12.25 6.34428 12.121 6.53123 11.9266 6.60378L9.69041 7.43848L8.86295 9.69421C8.79103 9.89027 8.60569 10.0204 8.39845 10.0204C8.1912 10.0204 8.00587 9.89027 7.93395 9.69421L7.10648 7.43848L4.8703 6.60378C4.67593 6.53123 4.5469 6.34428 4.5469 6.13522C4.5469 5.92616 4.67593 5.73921 4.8703 5.66666L7.10648 4.83196L7.93395 2.57623C8.00587 2.38016 8.1912 2.25 8.39845 2.25ZM4.20311 7.79574C4.38608 7.79574 4.55414 7.8975 4.6402 8.06038L5.35645 9.54167L6.37787 9.91809C6.55669 10.006 6.66604 10.1932 6.65552 10.3936C6.64501 10.594 6.51669 10.7686 6.32967 10.837L5.35913 11.1917L4.65361 12.7496C4.57305 12.9275 4.397 13.0417 4.20311 13.0417C4.00922 13.0417 3.83317 12.9275 3.75261 12.7496L3.04709 11.1917L2.07655 10.837C1.88953 10.7686 1.76121 10.594 1.7507 10.3936C1.74019 10.1932 1.84953 10.006 2.02835 9.91809L3.04977 9.54167L3.76603 8.06038C3.85208 7.8975 4.02014 7.79574 4.20311 7.79574Z"
								fill="#FEA800" />
						</svg>
						<text style="color: #FEA800;font-weight:600;">{{label}}</text>
					</view>
					<view v-else class="label" style="display: inline-block;">
						<text>{{label}}</text>
					</view>
				</template>
				<view class="picture-container flex-row" style="gap:10px;">
					<uv-image v-for="(item,index) in displayUrls" :key="index" :src="ImageFormatWebp(item)"
						mode="aspectFit" width="90px" height="90px" bgColor="#F2F3F6" webp radius="8px"
						@click="$previewImage({current:index,urls:urls})" />
					<view v-if="urls.length -3 > 0" class="more-pictures" @click="$previewImage({urls:urls})">
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
		padding: 38.17rpx 0 30.53rpx;


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