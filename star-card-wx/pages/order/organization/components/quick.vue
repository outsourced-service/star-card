<template>
  <view class="quick-page">
    <!-- 图片 -->
    <uv-image lazyLoad height="360rpx" width="100vw" src="https://s3-alpha-sig.figma.com/img/5e26/113b/1909d6f0c7f7837b5b21cf88ff6e32d3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=i71xdj-Hn3MNe3E179RfMmoVLAHScW3~xzm8VqauFls-ZF1rioOrdUtgmBN1eWq~UOVLsIi7S21sodOaEWV-Gq6SXykhcJ3zsqt9NjWjlhT7yGUU~o~BwbdupN0g65~bMa0pu94zwfXZ3VULgUsh4fMsHKQUR~b-MTiflB4SDvMRDIiApituBmLVVp~AkOOqdtkE7RNwJm2SvdkKYSvCjJ79n0XtbT3IWYMmM2OSYURZkqT1aQkU0gRVF3wSrNUQslV~qmQGlWwRBa0cd5OGm5MATQ~Pdw4ol~86ijTq8Lv~s5ugb1FFUWVacPvZN6AxLmZQvI03~mUC0sJgdXHjkw__"></uv-image>

    <!-- 背景渐变层 -->
    <view class="quick-page-bg"></view>
	
	<view class="quick-page-card">
		<view class="card-list">
			<view class="card-list-item" v-for="(item, index) in quickList" :key="index">
				<uv-image lazyLoad height="112rpx" width="112rpx" :src="item.icon"></uv-image>
				<view class="list-item-text">{{item.name}}</view>
			</view>
		</view>
		<uv-button text="评级咨询" size="large" :plain="true" shape="circle" :customTextStyle="{color: 'rgba(0, 0, 0, 0.99)'}"></uv-button>
	</view>
  </view>
</template>

<script>
export default {
  options: {
    styleIsolation: 'shared'
  },
  data() {
    return {
		quickList: [
			{
				name: '送评须知',
				icon: 'https://fz-zion-static.functorz.com/202503220206/b25d3b88b72980d6b2269175e9c12450/project/2000000000380240/images/YoEwQm0XSCXS29mr5IXJLg==.png?x-oss-process=image/resize,h_500,w_500,m_lfit',
				path: ''
			},
			{
				name: '送评流程',
				icon: 'https://fz-zion-static.functorz.com/202503220206/e80fc09d548e23589b2944c7765b9e0e/project/2000000000380240/images/cK3OEggON9g0U5IUCuKGaQ==.png?x-oss-process=image/resize,h_500,w_500,m_lfit',
				path: ''
			},
			{
				name: '机构介绍',
				icon: 'https://fz-zion-static.functorz.com/202503220206/a5cd63c77ec7aadb28b798f6db820415/project/2000000000380240/images/qR4vgER-JNzFeNcSPsVHUQ==.png?x-oss-process=image/resize,h_500,w_500,m_lfit',
				path: ''
			},
			{
				name: '评级标准',
				icon: 'https://fz-zion-static.functorz.com/202503220206/c4e4ed936f8a26580dcc9fa8bbe9aa1d/project/2000000000380240/images/H9j2ULrCfwqAfDToalxXQQ==.png?x-oss-process=image/resize,h_500,w_500,m_lfit',
				path: ''
			}
		]
	};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.quick-page {
	height: 720rpx;
	position: relative; /* 父容器设置为相对定位 */
	background-color: #f1f1f6;
	width: 100vw;
}

.quick-page-bg {
	position: absolute; /* 绝对定位 */
	top: 0; /* 从顶部开始 */
	left: 0; /* 从左侧开始 */
	width: 100%; /* 宽度与父容器一致 */
	height: 360rpx; /* 高度与图片一致 */
	background: linear-gradient(180deg, rgba(242, 242, 247, 0) 72%, #F2F2F7 100%);
	z-index: 2; /* 确保在图片上方 */
}

.quick-page-card {
	display: flex;
	flex-direction: column;
	position: relative; /* 确保有定位 */
	margin: 0 24rpx;
	background-color: #fff;
	border-radius: 40rpx;
	padding: 32rpx;
	gap: 32rpx;
	margin-top: -40rpx;
	z-index: 4;
}

.card-list {
	display: flex;
	justify-content: space-between;
	// margin: 0 40rpx;
	padding: 0 40rpx;
}

.card-list-item {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.list-item-text {
	font-weight: 400;
	font-size: 28rpx;
	color: rgba(0, 0, 0, 0.99);
}
</style>