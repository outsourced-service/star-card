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
							<text>{{ address.addressInfo }}</text>
						</view>

						<image class="cursor-pointer"
							src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCQkJCQkJCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgoJCQkJCQkJCWQ9Ik0xMS41ODI4IDIuMDM3NUMxMi4wNzEgMS41NDkzNSAxMi44NjI0IDEuNTQ5MzUgMTMuMzUwNiAyLjAzNzVMMTUuNjc3OSA0LjM2NDg3QzE2LjE2NjEgNC44NTMwMyAxNi4xNjYxIDUuNjQ0NDggMTUuNjc3OSA2LjEzMjY0TDcuMTU3MTcgMTQuNjUzNEM2Ljk1ODI1IDE0Ljg1MjMgNi42OTgwNSAxNC45NzgzIDYuNDE4NjQgMTUuMDExMUwzLjg5OTA4IDE1LjMwNkMzLjExODMgMTUuMzk3NSAyLjQ0Nzk2IDE0Ljc1NCAyLjUwNzI5IDEzLjk3MDJMMi43MDYzIDExLjM0MUMyLjcyODg2IDExLjA0MjkgMi44NTc0OCAxMC43NjI4IDMuMDY4ODUgMTAuNTUxNUwxMS41ODI4IDIuMDM3NVpNMTAuOTYxNSA1LjAxNTg1TDEyLjY5OTYgNi43NTM5NkwxNC4yMDQ4IDUuMjQ4NzZMMTIuNDY2NyAzLjUxMDY0TDEwLjk2MTUgNS4wMTU4NVpNMTEuNTIxMSA3LjkzMjQ4TDkuNzgyOTggNi4xOTQzNkw0LjM1NjU2IDExLjYyMDhMNC4yMDczNiAxMy41OTE5TDYuMDgxMDMgMTMuMzcyNUwxMS41MjExIDcuOTMyNDhaTTE3LjUgMTguMzMzMkwyLjUgMTguMzMzMlYxNi42NjY1TDE3LjUgMTYuNjY2NVYxOC4zMzMyWiIKCQkJCQkJCQlmaWxsPSIjRkVBODAwIiAvPgoJCQkJCQk8L3N2Zz4="
							style="width: 40rpx; height: 40rpx;" @click="$emit('edit')" />
					</view>
					<uv-line dashed></uv-line>
					<view class="flex-row align-center">
						<text class="orderTitle">寄回单号：</text>
						<uv-text mode="text" :lines="1" :text="orderID" suffixIcon="moments" color="#FEA800"
							size="24rpx" line-height="16px" decoration="underline" @click="$setClipboardData({
								data: orderID,
								success: success
							})">
							<template #suffixIcon>
								<image class="cursor-pointer"
									src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyBjbGFzcz0iY3Vyc29yLXBvaW50ZXIiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBmaWxsPSJub25lIgoJCQkJCQkJCQl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJCQkJCQkJCQk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKCQkJCQkJCQkJCWQ9Ik05LjUgMkg1VjFIOS41QzEwLjA1MjMgMSAxMC41IDEuNDQ3NzIgMTAuNSAyVjcuNUg5LjVWMlpNMS41IDRDMS41IDMuNDQ3NzIgMS45NDc3MSAzIDIuNSAzSDcuNUM4LjA1MTIzIDMgOC41IDMuNDQ1ODYgOC41IDMuOTk5MTlWMTAuMDAyMUM4LjUgMTAuNTU2MyA4LjA1MSAxMSA3LjUwMDY1IDExSDIuNDk4ODhDMS45NDUxMyAxMSAxLjUgMTAuNTUwOCAxLjUgMTBWNFpNNy41IDRIMi41VjEwSDcuNVY0WiIKCQkJCQkJCQkJCWZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNDQiIC8+CgkJCQkJCQkJPC9zdmc+"
									style="width: 24rpx; height: 24rpx;margin-left: 9.54rpx;" @click="$emit('edit')" />
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
	computed: {},
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

	::v-deep .uv-collapse-item__content__text {
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