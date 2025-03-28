<template>
	<view class="popup-page">
		<view class="popup-page-top">
			<view class="page-top-label">
				<view class="top-label-title">
					<view v-if="type == 'submissionReview'">
						送评档位
					</view>
					<view v-if="type == 'signatureReview'">
						签字选项
					</view>
					<view v-if="type == 'sizeReview'">
						尺寸选项
					</view>
					<view v-if="type == 'serviceReview'">
						验品服务
					</view>
					<view v-if="type == 'courierReview'">
						快递公司
					</view>
					<uv-icon name="question-circle" color="rgba(0, 0, 0, 0.2)" size="32rpx" bold></uv-icon>
				</view>
				<view class="top-label-description">
					这里有一段描述
				</view>
			</view>
		</view>
		<view class="popup-page-size" v-if="type == 'sizeReview'">
			<view class="page-select-size" v-for="(item, index) in data">
				<view :class="item.selected ? 'select-size' : 'select-size-no'" @click="handleSelect(item.id, index)">
					<uv-image :src="item.cover.url" width="100%" height="280rpx" @click="handleSubtract"></uv-image>
					<view class="size-bottom-left">
						<view class="bottom-left-name">
							{{ item.name }}
						</view>
						<view class="bottom-left-price" v-if="item.price">
							+{{ item.price }}元/张
						</view>
					</view>
					<view class="size-bottom-right">
						{{ item.description }}
					</view>
					<view class="select-icon">
						<uv-icon name="checkmark-circle-fill" color="#fea800" size="44rpx" v-if="item.selected"></uv-icon>
						<view class="circle-ring" v-else></view>
					</view>
				</view>
			</view>
		</view>
		<view class="popup-page-select" v-else>
			<view class="page-select" v-for="(item, index) in data" v-if="type == 'submissionReview'">
				<cardLevelSelect :data="item" v-if="item.selected"></cardLevelSelect>
				<cardLevelSelectNo :data="item" v-else @handleSubmissionReview="handleSelect(item.id, index)"></cardLevelSelectNo>
			</view>
			<view class="page-select-signature" v-for="(item, index) in data" v-if="type == 'signatureReview'">
				<view :class="item.selected ? 'select-signature' : 'select-signature-no'" @click="handleSelect(item.id, index)">
					<uv-image :src="item.cover.url" width="100%" height="280rpx" @click="handleSubtract"></uv-image>
					<view class="select-signature-bottom">
						<view class="signature-bottom-left">
							<view class="bottom-left-name">
								{{ item.name }}
							</view>
							<view class="bottom-left-price" v-if="item.price">
								+{{ item.price }}元/张
							</view>
						</view>
						<view class="signature-bottom-right">
							{{ item.description }}
						</view>
					</view>
				</view>
				<view class="select-icon">
					<uv-icon name="checkmark-circle-fill" color="#fea800" size="44rpx" v-if="item.selected"></uv-icon>
					<view class="circle-ring" v-else></view>
				</view>
			</view>
			<view class="page-select" v-for="(item, index) in data" v-if="type == 'serviceReview'">
				<view class="select-service" @click="handleSelect(item.id, index)">
					<view class="select-service-left">
						<view class="service-left-top">
							<view class="left-top-name">
								{{ item.name }}
							</view>
							<view class="left-top-price" v-if="item.price">
								+{{ item.price }}元/张
							</view>
						</view>
						<view class="service-left-bottom">
							{{ item.description }}
						</view>
					</view>
					<view class="select-service-right">
						<uv-icon name="checkmark-circle-fill" color="#fea800" size="44rpx" v-if="item.selected"></uv-icon>
						<view class="circle-ring" v-else></view>
					</view>
				</view>
				<view class="select-service-line" v-if="index < data.length - 1"></view>
			</view>
			<view class="page-select" v-for="(item, index) in data" v-if="type == 'courierReview'">
				<view class="select-service" @click="handleSelect(item.id, index)">
					<view class="select-courier-left">
						<uv-image :src="item.img.url" width="64rpx" height="64rpx"></uv-image>
						<view class="left-top-name">
							{{ item.name }}
						</view>
					</view>
					<view class="select-service-right">
						<uv-icon name="checkmark-circle-fill" color="#fea800" size="44rpx" v-if="item.selected"></uv-icon>
						<view class="circle-ring" v-else></view>
					</view>
				</view>
				<view class="select-service-line" v-if="index < data.length - 1"></view>
			</view>
		</view>
		<view class="popup-page-button">
			<uv-button text="确认" color="#fea800" size="large" shape="circle" @click="confirm"></uv-button>
		</view>
	</view>
</template>

<script>
	import cardLevelSelect from './cardLevelSelect.vue';
	import cardLevelSelectNo from './cardLevelSelectNo.vue';
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
			cardLevelSelect,
			cardLevelSelectNo
		},
		props: {
			data: {
				type: Object,
				required: true,
				default: () => ({}),
			},
			type: {
				type: String,
				required: true,
				default: () => (''),
			}
		},
		data() {
			return {
				selectId: 0,
				selectIndex: null
			}
		},
		emit: ['confirm'],
		methods: {
			handleSelect(id, index) {
				const oldIndex = this.data.findIndex(item => item.selected == true)
				this.data[index].selected = true
				if(oldIndex >= 0) {
					this.data[oldIndex].selected = false
				}
				this.selectId = id
				this.selectIndex = index
			},
			confirm() {
				this.$emit('confirm', this.selectId, this.selectIndex, this.type)
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.popup-page {
		padding: 32rpx;
		max-height: 60vh;
	}
	
	.popup-page-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.page-top-label {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
	}
	
	.top-label-title {
		display: flex;
		font-weight: 400;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
		gap: 4rpx;
	}
	
	.top-label-description {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.popup-page-select {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		margin-top: 40rpx;
		overflow-y: auto;
		max-height: calc(60vh - 72rpx - 40rpx - 96rpx - 64rpx);
		margin-bottom: 64rpx;
	}
	
	.popup-page-size {
	    display: flex;
	    flex-direction: column;
	    overflow-y: auto;
		margin-top: 40rpx;
	    max-height: calc(60vh - 72rpx - 40rpx - 96rpx - 64rpx); /* 可以根据需要调整最大高度 */
		margin-bottom: 64rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between; // 确保项目从左到右排列
		gap: 20rpx; // 设置项目之间的间隔
	}
	
	.page-select-size {
		// display: flex;
		// flex-wrap: wrap;
		// justify-content: space-between; // 确保项目从左到右排列
		// gap: 20rpx; // 设置项目之间的间隔
		width: calc((100vw - 64rpx - 24rpx) / 2 - 20rpx); /* 调整宽度以适应一行两个 */
	}
	
	.page-select-signature {
		position: relative; /* 添加相对定位 */
	}
	
	.select-signature {
		display: flex;
		flex-direction: column;
		border: 2rpx solid rgba(254, 168, 0, 1);
		padding-bottom: 24rpx;
		gap: 24rpx;
		border-radius: 16rpx;
		border-width: 2rpx;

	}
	
	.select-signature-no {
		display: flex;
		flex-direction: column;
		border: 2rpx solid rgba(0, 0, 0, 0.1);
		padding-bottom: 24rpx;
		gap: 24rpx;
		border-radius: 16rpx;
		border-width: 2rpx;
	}
	
	.select-signature-bottom {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 0 16rpx;
	}
	
	.signature-bottom-left {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
	}
	
	.bottom-left-name {
		font-weight: 600;
		font-size: 30rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.bottom-left-price {
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		color: rgba(254, 168, 0, 1);
	}
	
	.signature-bottom-right {
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		color: rgba(174, 174, 178, 1);
	}
	
	.select-size {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2rpx solid rgba(254, 168, 0, 1);
		padding-bottom: 16rpx;
		gap: 16rpx;
		border-radius: 16rpx;
		border-width: 2rpx;
		width: calc((100vw - 64rpx - 24rpx) / 2 - 20rpx); /* 调整宽度以适应一行两个 */
		margin-bottom: 20rpx; /* 添加下边距 */
		position: relative;
	}
	
	.select-size-no {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2rpx solid rgba(0, 0, 0, 0.1);
		padding-bottom: 16rpx;
		gap: 16rpx;
		border-radius: 16rpx;
		border-width: 2rpx;
		width: calc((100vw - 64rpx - 24rpx) / 2 - 20rpx); /* 调整宽度以适应一行两个 */
		margin-bottom: 20rpx; /* 添加下边距 */
		position: relative;
	}
	
	.size-bottom-left {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
	}
	
	.bottom-left-name {
		font-weight: 600;
		font-size: 30rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.bottom-left-price {
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		color: rgba(254, 168, 0, 1);
	}
	
	.size-bottom-right {
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		color: rgba(174, 174, 178, 1);
	}
	
	.select-icon {
		position: absolute;
		top: 16rpx;
		right: 16rpx;
	}
	
	.circle-ring {
	    width: 40rpx;       /* 圆环的宽度 */
	    height: 40rpx;      /* 圆环的高度 */
	    border: 2rpx solid #d1d1d6; /* 圆环的边框 */
	    border-radius: 50%;  /* 圆环的圆角半径为宽度和高度的50% */
	    background: transparent; /* 背景透明 */
	}
	
	.select-service {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.select-service-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rpx;
	}
	
	.select-courier-left {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}
	
	.service-left-top {
		display: flex;
		gap: 16rpx;
	}
	
	.left-top-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.left-top-price {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.service-left-bottom {
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.33);
	}
	
	.select-service-right {
		display: flex;
		align-items: center;
	}
	
	.select-service-line {
		border-top: 2rpx rgba(209, 209, 214, 1) dashed;
		margin: 32rpx 0 8rpx 0;
	}
</style>