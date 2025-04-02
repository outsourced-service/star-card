<template>
	<view class="horizontal-list">
		<scroll-view scroll-x class="" style="white-space: nowrap; width: 100%;">
			<view class="card-list">
				<image class="cursor-pointer"
					src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCQkJCQk8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMjIiIC8+CgkJCQkJPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgcng9IjE2IiBzdHJva2U9IndoaXRlIiAvPgoJCQkJCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgoJCQkJCQlkPSJNMTUuODc1IDE1Ljg3NVYxMC41NjI1SDE3LjEyNVYxNS44NzVIMjIuNDM3NVYxNy4xMjVIMTcuMTI1VjIyLjQzNzVIMTUuODc1VjE3LjEyNUgxMC41NjI1VjE1Ljg3NUgxNS44NzVaIgoJCQkJCQlmaWxsPSJ3aGl0ZSIgLz4KCQkJCTwvc3ZnPg=="
					style="min-width: 66rpx; width: 66rpx; height: 66rpx;" @click="$emit('add')" />
				<view v-for="(card, index) in cards" :key="index" class="card cursor-pointer">
					<uv-image :src="ImageFormatWebp(card.cover)" mode="aspectFit" width="36" height="36" shape="circle"
						bgColor="#F2F3F6" webp radius="8px" @click="$previewImage({ current: index, urls: urls })" />
					<view class="card-info">
						<uv-text class="card-title" mode="text" :lines="1" :text="card.title" color="#FFFFFF"
							size="24rpx" line-height="16px">
						</uv-text>
						<text class="card-count">{{ card.count }} 张</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: "card-cardbook-horizontalList",
	props: {
		cards: {
			type: Array,
			default: () => new Array(3).fill({
				cover: 'https://s3-alpha-sig.figma.com/img/9fd0/d949/91f3db9af898cb3ff3578de1f7b2340e?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tiwAlSnQMGhmwzbalTJ-Az-MnvYt6E-NHBpZe8Gkk4Uh9BiNMYhEI5bGuTa6LJcip0MaoDbdlmIc3SXplfiIm7POyV4SzgA1UjjOYsbzV75uu1Z7dobO4sWnIW9wNmjm6vF1-KOvmBk3pe8VuJHiPNPDLHCifQrMfOmlchyWwHSLUZ2itrP0u5qFe6DlbGp~Zl4zfUEeYt8dKe-krh8TPj58dTuBdGqGvybUMchiDlciSQ9TrOU9Hl4-WTuU5DcmPmPuHcFBu1v0JrVxpdUGlYw4QSjPEN00OS6~jL8mSYTKBxvcSKlytdsITZQdobCL2WK904PeHohWVc-3Jkhk8w__',
				title: 'PIKACHUPIKACHU',
				count: 14
			})
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
	}
}
</script>

<style lang="scss">
.horizontal-list {
	width: 100%;
	min-height: 20px;
	background: #000;

	::v-deep .uv-text__value {
		flex: 1
	}

	.card-list {
		min-width: 100%;
		display: flex;
		align-items: center;
		gap: 12px;

		.card {
			width: 130px;
			padding: 14rpx;
			border-radius: 8px;
			gap: 8px;
			background: #FFFFFF29;
			box-shadow: 0px 0px 6px 0px #0000000A;
			display: flex;

			.card-info {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				gap: 4px;
				flex: 1;

				.card-count {
					font-family: PingFang SC;
					font-weight: 300;
					font-size: 20rpx;
					line-height: 13px;
					letter-spacing: 0.06px;
					vertical-align: middle;
					color: #FFFFFF;
				}
			}
		}
	}
}
</style>