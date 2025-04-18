<template>
	<view class="page-edit" :style="is_popup ? 'padding: 0;' : 'height: 100vh; width: 100vw;'">
		<view class="page-edit-form">
			<uni-forms ref="form" :modelValue="formData" label-width="148rpx" border>
				<uni-forms-item label="卡册标题" >
					<uni-easyinput v-model="formData.name" placeholder="请填写卡册标题" :inputBorder="false"/>
				</uni-forms-item>
				<uni-forms-item label="背景图" >
					<template v-slot:label>
						<view class="edit-form-label">背景图</view>
					</template>
					<view class="edit-form-bg">
						<view class="form-bg-image">
							<uv-image v-if="!formData.bgImg.url" width="96rpx" height="96rpx" radius="8rpx" src="https://s3-alpha-sig.figma.com/img/9fd2/aa53/906aa6c17e0d5471bc722b1d849ab77d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oGNoyWG0e~ZeEFtZskOd7aOAW84-88TTN0sM9snsuoaoxemMvAixObvSIbbGCSdbPE4vXn2vopv5oEwx4ed7~gyG~BZjKXEvBAb9YxQVIVk5w4UMx8nJ-ASwUHRu2ZydHeNZdPdmnexKuUOhcU8TbRCZuvvB-oe8M5a7gXt5pUkavVNyk43GVuCXQirXKdO77ehkE2iUcJ34obJ5gw8BeHSjmeTpYdXW2dwDTkR2L1JPzm9zyrwTkww7iJW3Dz0yvaJZaLibsp-KoPeD~XKSJlJHltKJvULtOboz9iV9kq6CaNxetcvmtsorSJc-RZHZqVvyNBYYMucDHiS6EHsNyg__"></uv-image>
						</view>
						<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon>
					</view>
				</uni-forms-item>
				<uni-forms-item label="卡册简介">
					<view style="padding-left: 20rpx;">
						<uni-easyinput type="textarea" v-model="formData.signature" placeholder="请填写" :inputBorder="false"/>
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="page-edit-default">
			<view class="edit-default-left">
				<view class="default-left-title">
					<uv-icon name="lock-open" color="rgba(0, 0, 0, 0.66)" size="32rpx"></uv-icon>公开此卡册
				</view>
				<view class="default-left-tip">
					关闭后，他人将无法查看此卡册内容
				</view>
			</view>
			<view class="edit-default-right">
				<uv-switch v-model="formData.is_public" activeColor="#fea800" @change="handleDefault"></uv-switch>
			</view>
		</view>
		<view class="page-edit-default">
			<view class="edit-default-left">
				<view class="default-left-title">
					<uv-icon name="tags" color="rgba(0, 0, 0, 0.66)" size="32rpx"></uv-icon>加入精选卡册
				</view>
				<view class="default-left-tip">
					打开后，此卡册将在您的首页精选展示
				</view>
			</view>
			<view class="edit-default-right">
				<uv-switch v-model="formData.is_curated" activeColor="#fea800" @change="handleDefault"></uv-switch>
			</view>
		</view>
		<view class="page-edit-default" style="margin-bottom: 32rpx;">
			<view class="edit-default-left">
				<view class="default-left-title">
					置顶卡册
				</view>
			</view>
			<view class="edit-default-right">
				<uv-switch v-model="formData.is_set_top" activeColor="#fea800" @change="handleDefault"></uv-switch>
			</view>
		</view>
		<view class="page-edit-button" v-if="!is_popup">
			<uv-button text="保存" color="#fea800" size="large" shape="circle" @click="handleAdd"></uv-button>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
		},
		props: {
			data: {
				type: Object,
				default: () => ({}),
			},
			is_popup: {
				type: Boolean,
				default: () => (false),
			}
		},
		data() {
			return {
				formData: {
					name: '',
					signature: '',
					bgImg: {
						url: ''
					},
					is_public: true,
					is_curated: false,
					is_set_top: false
				}
			}
		},
		methods: {
			handleDefault(value) {
				if(value) {
					this.formData.set_default_num = Date.now();
				} else {
					this.formData.set_default_num = ''
				}
			}
		},
		mounted() {
		},
		onLoad(option) {
			if(option.type == 'curated') {
				this.formData.is_curated = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-edit {
		display: flex;
		flex-direction: column;
		padding: 32rpx;
		gap: 24rpx;
		background-color: #f6f7f9;
	}
	
	.page-edit-form {
		background-color: #fff;
		padding: 0 32rpx;
		border-radius: 32rpx;
	}
	
	.page-edit-form ::v-deep .uniui-location:before {
		color: #fda700;
	}
	
	.edit-form-label {
		display: flex;
		align-items: center;
		text-align: left;
		font-size: 14px;
		color: #606266;
		width: 148rpx;
	}
	
	.edit-form-bg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12rpx 0 12rpx 20rpx;
	}
	
	.page-edit-default {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 32rpx;
		border-radius: 32rpx;
	}
	
	.edit-default-left {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.default-left-title {
		display: flex;
		align-items: center;
		gap: 4rpx;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.9);
	}
	
	.default-left-tip {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.page-edit-button {
		position: fixed;
		bottom: 0;
		// margin: 0 32rpx 40rpx 32rpx;
		padding-bottom: 80rpx;
		width: calc(100vw - 64rpx);
	}

	.textarea-wrapper {
		width: 100%;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		min-height: 70rpx;
	}
	
	.custom-textarea {
		width: 100%;
		min-height: 44rpx;
		height: 44rpx;
		line-height: 44rpx;
		font-size: 28rpx;
		padding: 0;
		margin-right: 20rpx;
		background-color: transparent;
	}
</style>