<template>
	<view class="page-address">
		<view class="page-address-form">
			<uni-forms ref="form" :modelValue="formData" label-width="148rpx" border>
				<uni-forms-item label="收货人" >
					<uni-easyinput v-model="formData.consignee" placeholder="请输入收货人姓名" :inputBorder="false"/>
				</uni-forms-item>
				<uni-forms-item label="联系电话" >
					<uni-easyinput v-model="formData.phone" placeholder="请输入联系电话" :inputBorder="false"/>
				</uni-forms-item>
				<uni-forms-item label="所在地" >
					<uni-easyinput v-model="formData.address" placeholder="设置所在地" :inputBorder="false" suffixIcon="location" suffixIconStyle="color: #fda700" @iconClick="handleChooseLocation"/>
				</uni-forms-item>
				<uni-forms-item label="详细地址" >
					<view class="textarea-wrapper">
						<textarea class="custom-textarea" v-model="formData.address_detail" placeholder="设置详细地址" auto-height show-confirm-bar="false"/>
					</view>
				</uni-forms-item>
				<uni-forms-item label="门牌号">
					<uni-easyinput v-model="formData.house" placeholder="例：2号楼2单元10层107" :inputBorder="false"/>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="page-address-default">
			<view class="address-default-left">
				<view class="default-left-title">
					设置默认地址
				</view>
				<view class="default-left-tip">
					每次下单默认使用该地址
				</view>
			</view>
			<view class="address-default-right">
				<uv-switch v-model="is_default" activeColor="#fea800" @change="handleDefault"></uv-switch>
			</view>
		</view>
		<view class="page-address-button">
			<uv-button text="保存" color="#fea800" size="large" shape="circle" @click="handleAdd"></uv-button>
		</view>
	</view>
</template>

<script>
	import {
		addressList
	} from '/mock/address';
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
		},
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			}
		},
		data() {
			return {
				formData: {
					consignee: '',
					phone: '',
					address_detail: '',
					house: '',
					province: "",
					city: "",
					area: "",
					set_default_num: "",
					address: '',
				},
				is_default: false,
				addressList: addressList
			}
		},
		methods: {
			handleDefault(value) {
				if(value) {
					this.formData.set_default_num = Date.now();
				} else {
					this.formData.set_default_num = ''
				}
			},
			handleChooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						// 更新地址信息
						this.formData.address = res.address
						this.formData.address_detail = res.name
						// 解析地址获取省市区
						const addressParts = res.address.split(/省|市|区|自治区|特别行政区/)
						this.formData.province = addressParts[0] + (res.address.includes('省') ? '省' : '')
						this.formData.city = addressParts[1] ? addressParts[1] + '市' : ''
						this.formData.area = addressParts[2] ? addressParts[2] + '区' : ''
						this.formData.address = this.formData.province + this.formData.city + this.formData.area
					},
					fail: (err) => {
						console.error('选择地址失败：', err)
						uni.showToast({
							title: '选择地址失败',
							icon: 'none'
						})
					}
				})
			}
		},
		mounted() {
		},
		onLoad(option) {
			if(option.id) {
				this.formData = this.addressList.find(item => item.id == option.id)
			}
			if(option.defaultId == option.id) {
				this.is_default = true
			}
			this.formData.address = this.formData.province + this.formData.city + this.formData.area
			console.log(this.formData.address)
		}
	}
</script>

<style lang="scss" scoped>
	.page-address {
		display: flex;
		flex-direction: column;
		padding: 32rpx;
		gap: 24rpx;
		background-color: #f6f7f9;
	}
	
	.page-address-form {
		background-color: #fff;
		padding: 0 32rpx;
		border-radius: 32rpx;
	}
	
	.page-address-form ::v-deep .uniui-location:before {
		color: #fda700;
	}
	
	.page-address-default {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 32rpx;
		border-radius: 32rpx;
	}
	
	.address-default-left {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.default-left-title {
		font-weight: 400;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.9);
	}
	
	.default-left-tip {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.page-address-button {
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