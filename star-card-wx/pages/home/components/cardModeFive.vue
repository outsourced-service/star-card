<template>
	<view class="flex-1 width-full">
		<uni-card class="card" :is-shadow="false" :border="false" spacing="28rpx 0rpx" margin="0" padding="0">
			<template v-slot:title>
				<view class="flex-row width-full" style="gap: 24rpx;">
					<uv-avatar :src="model.avatar" size="96rpx" :customStyle="{
                        border: '1px solid rgba(234, 234, 239)'
                    }" />
					<view class="flex-1 flex-col" style="gap: 6px;">
						<view class="align-center flex" style="gap: 5px;">
							<text class="title">{{ model?.name }}</text>
							<uv-tags text="店" size="mini" type="warning"></uv-tags>
						</view>
						<uv-text :text="model.description" lines="1" size="24rpx" lineHeight="32rpx"
							color="rgba(0, 0, 0, 0.66)" />
						<view class="flex-row flex-row" style="gap: 8rpx;">
							<uv-tags v-for="(item, index) in (model?.tags ?? [])" :key="index" :text="item" size="mini"
								shape="circle" bgColor="#0000000D" color="#00000070" borderColor="#00000000" />
						</view>

					</view>
					<view class="" style="margin: auto 0;">
						<button class="buttonText followed" :class="{
                            activat: model.followed
                        }">{{ model.followed ? '已关注' : '关注' }}</button>
					</view>
				</view>
				<view v-if="model.identity" class="flex-row align-center" style="margin: 24rpx 0 0 120rpx; gap: 4px;">
					<uv-icon name="map" color="#FEA800" size="36rpx" />
					<text class="text address">{{ model.address }}</text>
					<text class="text distance">距您{{ model.distance }}</text>
				</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name: 'CardModeFive',
		props: {
			model: {
				type: Object,
				required: true,
				default: () => ({
					avatar: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
					name: '张三',
					identity: '店',
					badge: '/static/badge1.png',
					level: 'S1钻石商家',
					description: '资深十年广东老卡社，欢迎收卡换卡，到店交流~',
					tags: ['宝可梦', '篮球', '足球'],
					address: '北京市',
					distance: '2.5km',
					followed: false,
				})
			}
		},
		methods: {

		}
	};
</script>

<style scoped lang="scss">
	.title {
		font-family: PingFang SC;
		font-weight: 600;
		font-size: 30rpx;
		line-height: 40rpx;
		letter-spacing: -0.46rpx;
	}

	.followed {
		border: 1px solid rgba(229, 229, 234, 1);
		border-radius: 100px;
		border-width: 1px;
		padding-top: 6px;
		padding-right: 16px;
		padding-bottom: 6px;
		padding-left: 16px;
		background-color: #fff;
		font-family: PingFang SC;
		font-weight: 600;
		font-size: 24rpx;
		line-height: 140%;
		letter-spacing: 0%;
		vertical-align: middle;
		color: rgba(0, 0, 0, 0.44);

		&.activat {
			border-color: rgba(254, 168, 0, 1);
			color: rgba(254, 168, 0, 1);
		}
	}

	.text {
		font-family: PingFang SC;
		font-weight: 400;
		letter-spacing: 0px;
		vertical-align: middle;
		font-size: 24rpx;
		line-height: 32rpx;

		&.address {
			color: #000000A8;
		}

		&.distance {
			color: #00000054;
		}
	}
</style>