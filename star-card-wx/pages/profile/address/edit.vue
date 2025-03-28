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
					<uni-easyinput v-model="formData.name" placeholder="设置所在地" :inputBorder="false" suffixIcon="location" suffixIconStyle="color: #fda700"/>
					 <!-- <uv-input placeholder="设置所在地" border="none" v-model="formData.name" suffixIcon="map" suffixIconStyle="color: #fda700"></uv-input> -->
				</uni-forms-item>
				<uni-forms-item label="详细地址" >
					<uni-easyinput v-model="formData.address_detail" placeholder="设置详细地址" :inputBorder="false" autoHeight type="textarea"/>
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
					set_default_num: ""
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
</style>