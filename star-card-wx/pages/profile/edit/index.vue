<template>
	<view class="edit-page">
		<view class="edit-page-item">
			<view class="page-item-cover">
				<uv-avatar :src="cover" size="160rpx"></uv-avatar>
			</view>
			<view class="page-item-from">
				<fakeForm :data="formData" @changeData="changeData"></fakeForm>
			</view>
		</view>
		<view class="edit-page-button" :style="'padding-bottom: ' + safeHeight + 'px'">
			<uv-button text="保存" :color="is_change ? '#fea800' : 'rgba(255, 220, 153, 1)'" size="large" shape="circle"
				:customStyle="{height: '88rpx'}" @click="handleConfirm"></uv-button>
		</view>
	</view>
</template>

<script>
	import fakeForm from './components/fakeForm.vue';
	export default {
		components: {
			fakeForm
		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				is_change: false,
				safeHeight: 0,
				formData: {
					user_name: '魔都兄弟球星卡社',
					user_id: 132568465,
					bg_img: 'https://s3-alpha-sig.figma.com/img/558b/692c/c9003e551f4cc5f282f8b48c8f419fe4?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DZuWShLdhyFaKjYQz~pScdCl08lCTdo6Fq2TDIkuOmipW9JHE5wpwiuLveSJRKi~dP6NqYmkAW7INUuyX74ln73GSD-KzphfDM7BXiEmzqfurTEUQoKS9xtRpNsslZLmucSwRcGWrssqSffXqI10NhIXQWYcBI~H9avAQ~KZ8e~0~y5AK2-Z5EenMV2avc-YGRx0fRg4iwiM8MnfipOZteC8N86fk5LIELDq-D-Pi8TkEyQdytBCdR8kNJ7Mx9y-945bXZclRCgVzX-CW9DvznULlUVDrEX95kHkUsFu0cokEHEF1xSCOg1YZRJTewzRzC-Xda5myZdnWwxAvwjXEQ__',
					signature: '🌟欢迎训练家！📍StarryCard代理，坐标深圳。',
					is_accreditation: true,
					time: '10:00-22:00',
					service: '宝可梦/篮球/足球/最多1行超过末尾省略',
					serviceType: '评级/开盒/PTCG道馆/代卖',
					is_shop: true,
					address: {
						address: '广东省深圳市南山区',
						address_detail: '桃源街道丽山路12号桑泰丹华园一期',
						house: '2A2D'
					}
				},
				cover: 'https://s3-alpha-sig.figma.com/img/558b/692c/c9003e551f4cc5f282f8b48c8f419fe4?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DZuWShLdhyFaKjYQz~pScdCl08lCTdo6Fq2TDIkuOmipW9JHE5wpwiuLveSJRKi~dP6NqYmkAW7INUuyX74ln73GSD-KzphfDM7BXiEmzqfurTEUQoKS9xtRpNsslZLmucSwRcGWrssqSffXqI10NhIXQWYcBI~H9avAQ~KZ8e~0~y5AK2-Z5EenMV2avc-YGRx0fRg4iwiM8MnfipOZteC8N86fk5LIELDq-D-Pi8TkEyQdytBCdR8kNJ7Mx9y-945bXZclRCgVzX-CW9DvznULlUVDrEX95kHkUsFu0cokEHEF1xSCOg1YZRJTewzRzC-Xda5myZdnWwxAvwjXEQ__'
			}
		},
		methods: {
			changeData(value) {
				const formDataString = encodeURIComponent(JSON.stringify(this.formData));
				uni.navigateTo({
					url: `/pages/profile/edit/edit?data=${formDataString}&type=${value}`
				});
			},
			handlePopupOpen() {
				this.enableScroll(false);
			},
			handlePopupClose() {
				this.enableScroll(true);
			},
			enableScroll(flag) {
				// H5 处理
				// #ifdef H5
				const pageEl = document.querySelector('.page');
				if (pageEl) {
					pageEl.style.overflow = flag ? 'auto' : 'hidden';
				}
				// #endif
			  
				// 小程序处理
				// #ifdef MP-WEIXIN
				if (!flag) {
					wx.pageScrollTo({
					scrollTop: 0,
					duration: 0
					});
				}
				// #endif
			}
		},
		mounted() {
			// #ifndef WEB
			this.safeHeight = this.$system.safeHeight();
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.edit-page {
		height: 100vh;
		width: 100vw;
		background-color: #f6f7f9;
		padding: 0 32rpx;
		position: relative;
	}
	
	.edit-page-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 36rpx;
		overflow-y: auto;
		padding: 16rpx 0;
		height: calc(100% - 88rpx - 42rpx - 100rpx);
		// padding-bottom: 250rpx;
	}
	
	.page-item-from {
		width: 100%;
	}
	
	.edit-page-button {
		width: calc(100vw - 64rpx);
		position: absolute;
		bottom: 0;
	}
</style>