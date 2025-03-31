<template>
	<view class="procedure-page">
		<view class="procedure-page-top">
			<view class="page-top-alert">
				还有
				<view class="top-alert-day">{{ calculateDaysDifference(evaluation.end_data, Date.now()) }}</view>
				天截单，之后抵达订单将被顺延至下一车
			</view>
			<view class="page-top-steps">
				<uv-steps :current="stepsCurrent" activeColor="#fea800">
					<uv-steps-item title="基础信息"></uv-steps-item>
					<uv-steps-item title="附加服务"></uv-steps-item>
					<uv-steps-item title="快递信息"></uv-steps-item>
				</uv-steps>
			</view>
			<orderPackageCard v-if="stepsCurrent == 2" :data="order" @handleBack="handleBackOne" @handleOpenDetail="handleOpenDetail"></orderPackageCard>
		</view>
		<view class="procedure-page-form" v-if="stepsCurrent == 0">
			<view class="page-form">
				<view class="page-form-title">寄回地址</view>
				<view class="page-form-card">
					<formAddress :data="addressData" :is_default="addressData.id == addressDefault ? true : false" @handleAddress="handleAddress" @handleAddressEidt="handleAddressEidt"></formAddress>
				</view>
			</view>
			<view class="page-form">
				<view class="page-form-title">送评信息</view>
				<view class="page-form-card">
					<formInfo :data="{showSignature, showSize}" :formData="formData" :submissionReviewData="submissionReviewData" 
						@handlePopup="handlePopup" @changeNumber="calculatePrice"></formInfo>
				</view>
			</view>
			<view class="page-form">
				<view class="page-form-title">其他信息</view>
				<view class="page-form-card">
					<formOther @handleNotes="handleNotes" :data="formData"></formOther>
				</view>
			</view>
		</view>
		<view class="procedure-page-form" v-if="stepsCurrent == 1">
			<view class="page-form">
				<view class="page-form-title">附加服务</view>
				<view class="page-form-card">
					<formAdditional @handleService="handlePopup('serviceReview')" :data="formData" :addressData="addressData" @handleInsurance="calculatePrice"></formAdditional>
				</view>
			</view>
		</view>
		<view class="procedure-page-form" v-if="stepsCurrent == 2">
			<view class="page-form">
				<view class="page-form-top">
					<view class="page-form-title">寄出快递信息<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon></view>
					<view class="page-form-guide">包装指南</view>
				</view>
				<view class="page-form-tip">请准确填写快递单号，并妥善包装卡牌；因玩家自身造成的包裹丢失、损坏、延误等，由玩家自行负责。</view>
				<view class="page-form-card">
					<courierCard :data="formData" @handleCourier="handlePopup('courierReview')"></courierCard>
				</view>
			</view>
		</view>
		<view class="procedure-page-nav">
			<view class="page-nav-price" v-if="stepsCurrent == 0 || stepsCurrent == 1">
				<view class="nav-price-text">预计总价</view>
				<view class="nav-price-icon">￥</view>
				<view class="nav-price-num">{{formData.total_price}}</view>
				<view class="nav-price-tip" @click="handleOpenDetail">
					查看明细
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.66)" size="20rpx" bold></uv-icon>
				</view>
			</view>
			<view class="page-nav-safety" v-else>
				<uv-checkbox v-model="is_safety" shape="circle" activeColor="#fea800" @change="handleSafety">
					<view class="nav-safety-text">
						我已知晓
						<view class="nav-safety">
							《代送评注意事项》
						</view>
						与
						<view class="nav-safety">
							《保险说明》
						</view>
					</view>
				</uv-checkbox>
			</view>
			<view class="page-nav-line"></view>
			<view class="page-nav-button-one" v-if="stepsCurrent == 0">
				<uv-button text="下一步" color="#fea800" size="large" shape="circle" @click="handleNext"></uv-button>
			</view>
			<view class="page-nav-button-two" v-if="stepsCurrent == 1">
				<view class="nav-button">
					<uv-button text="上一步" color="#fff6e5" size="large" shape="circle" :customStyle="{color: 'rgba(254, 168, 0, 1)'}" @click="handleBack"></uv-button>
				</view>
				<view class="nav-button">
					<uv-button text="下一步" color="#fea800" size="large" shape="circle" @click="handleNext"></uv-button>
				</view>
			</view>
			<view class="page-nav-button-two" v-if="stepsCurrent == 2">
				<view class="nav-button">
					<uv-button text="稍后寄出" :plain="true" color="#fea800" size="large" shape="circle" :customStyle="{color: 'rgba(254, 168, 0, 1)'}"></uv-button>
				</view>
				<view class="nav-button">
					<uv-button text="确认寄出" color="#fea800" size="large" shape="circle"></uv-button>
				</view>
			</view>
		</view>
		<uv-popup ref="popup" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
			<formPopup :data="evaluationData" :type="evaluationType" @confirm="confirm"></formPopup>
		</uv-popup>
		<uv-popup ref="popupDetail" mode="bottom" round="40rpx" closeable safeAreaInsetBottom>
			<formPopupDetail :data="evaluation" :formData="formData"></formPopupDetail>
		</uv-popup>
	</view>
</template>

<script>
	import formAddress from './components/formAddress.vue';
	import formInfo from './components/formInfo.vue';
	import formOther from './components/formOther.vue';
	import formAdditional from './components/formAdditional.vue';
	import orderPackageCard from './components/orderPackageCard.vue';
	import courierCard from './components/courierCard.vue';
	import formPopup from './components/popup.vue';
	import formPopupDetail from './components/formPopupDetail.vue';
	import { timestampToDateString, calculateDaysDifference } from '../getData';
	import {
		evaluation
	} from '/mock/evaluation';
	import {
		order
	} from '/mock/order';
	import {
		addressList, courierList
	} from '/mock/address';
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
			formAddress,
			formInfo,
			formOther,
			formAdditional,
			orderPackageCard,
			courierCard,
			formPopup,
			formPopupDetail
		},
		data() {
			return {
				evaluation: evaluation,
				courierList: courierList,
				order: order,
				stepsCurrent: 0,
				is_safety: '',
				addressId: 8,
				addressData: {},
				addressList: addressList,
				formData: {
					// 档位
					evaluation_insurance_id: 0,
					evaluation_insurance_name: '',
					evaluation_insurance_price: 0,
					// 签字选项
					signature: '',
					signature_id: 0,
					signatureNum: 0,
					// 尺寸选项
					size: '',
					sizeNum: 0,
					size_id: 0,
					// 张数
					number: 0,
					// 备注
					note: '',
					// 图片
					img: null,
					is_img: false,
					// 投保
					is_insurance: false,
					insurance: 0,
					// 验品服务
					is_service: false,
					service: '',
					serviceNum: 0,
					service_id: 0,
					// 地址信息
					addressData: {},
					// 快递公司
					courier: '',
					courier_id: 0,
					// 总价
					total_price: 0,
					discount_price: 0,
					rating_price: 0,
					additional_price: 0
				},
				evaluationData: [],
				evaluationType: '',
				submissionReviewData: {},
				showSignature: false,
				showSize: false,
				addressDefault: 8
			}
		},
		methods: {
			timestampToDateString,
			calculateDaysDifference,
			handleNext() {
				this.stepsCurrent++
			},
			handleBack() {
				this.stepsCurrent--
			},
			handleBackOne() {
				this.stepsCurrent = 0
			},
			handleSafety(value) {
				this.is_safety = value;
			},
			handleAddress() {
			    uni.$once('returnAddressId', (e) => {
			        this.addressId = e.address_id;
					this.addressDefault = e.address_default;
			        this.addressData = this.addressList.find(item => item.id == e.address_id);
					this.formData.addressData = this.addressData
			    })
			    uni.navigateTo({
			        url: '/pages/profile/address/index?id=' + this.formData.addressData.id
			    })
			},
			handleAddressEidt() {
				uni.navigateTo({
					url: '/pages/profile/address/edit?id=' + this.formData.addressData.id + '&defaultId=' + this.addressDefault
				})
			},
			handleNotes() {
				uni.$once('returnNote', (e) => {
					this.formData.note = e.note
				})
				uni.navigateTo({
				    url: '/pages/order/procedure/notes'
				})
			},
			handleOpenDetail() {
				this.$refs.popupDetail.open();
			},
			calculatePrice() {
				this.formData.rating_price = Number(((this.formData.evaluation_insurance_price + this.formData.signatureNum + this.formData.sizeNum) * this.formData.number).toFixed(2));
				if(this.formData.number >= 50) {
					this.formData.discount_price = Number((this.formData.rating_price - (this.formData.rating_price * 0.95)).toFixed(2))
				} else if (this.formData.number >= 15) {
					this.formData.discount_price = Number((this.formData.rating_price - (this.formData.rating_price * 0.98)).toFixed(2))
				} else {
					this.formData.discount_price = 0
				}
				if (this.formData.insurance) {
					this.formData.insurance = String(Number(this.formData.insurance))
				}
				const insurance = Number(this.formData.insurance)
				const serviceNum = Number(this.formData.serviceNum)
				this.formData.additional_price = Number((insurance + (insurance / 20) + (serviceNum * this.formData.number) + (serviceNum * this.formData.number / 20)).toFixed(2))
				this.formData.total_price = Number((this.formData.rating_price - this.formData.discount_price + this.formData.additional_price).toFixed(2))
			},
			handlePopup(value) {
				this.evaluationType = value
				if(value == 'submissionReview') {
					this.evaluationData = this.evaluation.evaluation_insurance.map(item => {
					    return {
					        ...item,
					        selected: this.formData.evaluation_insurance_id == item.id ? true : false
					    };
					});
				} else if(value == 'signatureReview') {
					this.evaluationData = this.submissionReviewData.evaluation_insurance_info.filter(item => item.type == '签字选项')
					this.evaluationData = this.evaluationData.map(item => {
					    return {
					        ...item,
					        selected: this.formData.signature_id == item.id ? true : false
					    };
					});
				} else if(value == 'sizeReview') {
					this.evaluationData = this.submissionReviewData.evaluation_insurance_info.filter(item => item.type == '尺寸选项')
					this.evaluationData = this.evaluationData.map(item => {
					    return {
					        ...item,
					        selected: this.formData.size_id == item.id ? true : false
					    };
					});
				} else if(value == 'serviceReview') {
					this.evaluationData = this.submissionReviewData.evaluation_insurance_info.filter(item => item.type == '验品服务')
					this.evaluationData = this.evaluationData.map(item => {
					    return {
					        ...item,
					        selected: this.formData.service_id == item.id ? true : false
					    };
					});
				} else if(value == 'courierReview') {
					this.evaluationData = this.courierList;
				}
				this.$refs.popup.open();
			},
			confirm(id, index, type) {
				if(type == 'submissionReview') {
					this.formData.evaluation_insurance_id = id;
					this.submissionReviewData = this.evaluation.evaluation_insurance[index];
					this.formData.evaluation_insurance_name = this.submissionReviewData.name;
					this.formData.evaluation_insurance_price = this.submissionReviewData.price;
					if(this.submissionReviewData.evaluation_insurance_info.find(item => item.type == '签字选项')) {
						this.showSignature = true
					} else {
						this.showSignature = false
					}
					if(this.submissionReviewData.evaluation_insurance_info.find(item => item.type == '尺寸选项')) {
						this.showSize = true
					} else {
						this.showSize = false
					}
					this.formData.signature_id = 0;
					this.formData.signature = '';
					this.formData.signatureNum = 0;
					this.formData.size_id = 0;
					this.formData.size = '';
					this.formData.sizeNum = 0;
					this.formData.service_id = 0;
					this.formData.service = '';
					this.formData.serviceNum = 0;
					this.formData.courier_id = 0;
					this.formData.courier = '';
				} else if(type == 'signatureReview') {
					this.formData.signature_id = id;
					this.formData.signature = this.evaluationData[index].name;
					this.formData.signatureNum = this.evaluationData[index].price;
				} else if(type == 'sizeReview') {
					this.formData.size_id = id;
					this.formData.size = this.evaluationData[index].name;
					this.formData.sizeNum = this.evaluationData[index].price;
				} else if(type == 'serviceReview') {
					this.formData.service_id = id;
					this.formData.service = this.evaluationData[index].name;
					this.formData.serviceNum = this.evaluationData[index].price;
				} else if(type == 'courierReview') {
					this.formData.courier_id = id;
					this.formData.courier = this.evaluationData[index].name;
				}
				this.calculatePrice();
				this.$refs.popup.close();
			}
		},
		mounted() {
			this.timestampToDateString()
			this.calculateDaysDifference()
			this.addressData = this.addressList.find(item => item.id == this.addressId)
			this.formData.addressData = this.addressData
		}
	}
</script>

<style lang="scss" scoped>
	.procedure-page {
		background-color: #f2f2f7;
		width: 100vw;
		padding-bottom: 300rpx;
	}
	
	.page-top-alert {
		background-color: rgba(255, 246, 229, 1);
		display: flex;
		padding: 12rpx 0;
		justify-content: center;
		align-items: center;
		gap: 16rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: rgba(224, 148, 0, 1);
	}
	
	.top-alert-day {
		color: rgba(224, 148, 0, 1);
		font-weight: 600;
		font-size: 26rpx;
	}
	
	.page-top-steps {
		background-color: #ffffff;
		margin: 56rpx 32rpx 0 32rpx;
		border-radius: 32rpx;
		padding: 40rpx 32rpx 32rpx 32rpx;
	}
	
	.procedure-page-form {
		display: flex;
		flex-direction: column;
		gap: 56rpx;
		margin: 56rpx 0;
	}
	
	.page-form {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
		padding: 0 32rpx;
	}
	
	.page-form-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
		display: flex;
		gap: 8rpx;
		align-items: center;
	}
	
	.page-form-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-form-guide {
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.page-form-tip {
		font-weight: 400;
		font-size: 26rpx;
		line-height: 32rpx;
		color: rgba(0, 0, 0, 0.2);
	}
	
	.procedure-page-nav {
		display: flex;
		flex-direction: column;
		box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
		background-color: rgba(255, 255, 255, 1);
		// width: 100vw;
		width: calc(100vw - 64rpx);
		gap: 20px;
		border-top-width: 2rpx;
		padding: 24rpx 32rpx;
		z-index: 10;
		position: fixed;
		bottom: 0;
	}
	
	.page-nav-price {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
	}
	
	.nav-price-text {
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.nav-price-icon {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.nav-price-num {
		font-weight: 600;
		font-size: 44rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.nav-price-tip {
		font-weight: 600;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 0.66);
		display: flex;
		align-items: baseline;
		gap: 4rpx;
	}
	
	.page-nav-safety {
		display: flex;
		margin-top: 4rpx;
		align-items: center;
	}
	
	.nav-safety-text {
		display: flex;
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
		align-items: center;
		margin-bottom: 2rpx;
	}
	
	.nav-safety {
		color: rgba(254, 168, 0, 1);
	}
	
	.page-nav-line {
		border-top: 2rpx dashed rgba(209, 209, 214, 1)
	}
	
	.page-nav-button-one {
		margin-bottom: 40rpx;
	}
	
	.page-nav-button-two {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}
	
	.nav-button {
		width: calc((100vw - 80rpx) / 2);
	}
</style>