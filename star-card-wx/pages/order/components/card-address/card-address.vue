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

						<icon-base64 name="edit" iconStyle="width: 40rpx; height: 40rpx;" @onClick="$emit('edit')" />
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
								<icon-base64 name="cody"
									iconStyle="width: 24rpx; height: 24rpx;margin-left: 9.54rpx;" />
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