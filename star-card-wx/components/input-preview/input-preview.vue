<template>
	<view class="nvue-page-root">
		<view class="page-title">
			<view class="page-title__wrapper">
				<text class="page-title__text">{{title}}</text>
			</view>
		</view>
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">可自动聚焦的 input</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" focus placeholder="自动获得焦点" />
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view v-if="platform==='ios'&&!isNvue" class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">隐藏 iOS 软键盘上的导航条</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" placeholder="触摸其他地方收起键盘" @focus="onFocus" @blur="onBlur" />
				</view>
			</view>
			<!-- #endif -->
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">键盘右下角按钮显示为搜索</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">键盘右下角按钮显示为发送</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" confirm-type="send" placeholder="键盘右下角按钮显示为发送" />
				</view>
			</view>
			<!-- #endif -->
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">控制最大输入长度的 input</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" maxlength="10" placeholder="最大输入长度为10" />
				</view>
			</view>
			<!-- #ifndef MP-BAIDU -->
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">控制键盘的 input</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" ref="input1" @input="hideKeyboard" placeholder="输入123自动收起键盘" />
				</view>
			</view>
			<!-- #endif -->
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">数字输入的 input</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" type="number" placeholder="这是一个数字输入框" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">密码输入的 input</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" password type="text" placeholder="这是一个密码输入框" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">带小数点的 input</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" type="digit" placeholder="带小数点的数字键盘" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">身份证输入的 input</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" type="idcard" placeholder="身份证输入键盘" />
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">密码输入框</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" placeholder="请输入密码" :password="showPassword" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'input',
				focus: false,
				inputValue: '',
				showClearIcon: false,
				inputClearValue: '',
				changeValue: '',
				showPassword: true,
				src: '../../../static/eye-1.png',
				platform: '',
				isNvue: false,
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue = event.detail.value
			},
			replaceInput: function(event) {
				var value = event.detail.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.detail.value === '123') {
					uni.hideKeyboard();
				}
			},
			clearInput: function(event) {
				this.inputClearValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
				this.showClearIcon = false;
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			onFocus() {
				this.$mp.page.$getAppWebview().setStyle({
					softinputNavBar: 'none'
				})
			},
			onBlur() {
				this.$mp.page.$getAppWebview().setStyle({
					softinputNavBar: 'auto'
				})
			}
		},
		// onLoad() {
		// 	this.platform = uni.getSystemInfoSync().platform
		// 	// #ifdef APP-PLUS-NVUE
		// 	this.isNvue = true
		// 	// #endif
		// }
	}
</script>

<style scoped>
	.nvue-page-root {
		background-color: #F8F8F8;
		padding-bottom: 20px;
	}

	.page-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 35rpx;
	}

	.page-title__wrapper {
		padding: 0px 20px;
		border-bottom-color: #D8D8D8;
		border-bottom-width: 1px;
	}

	.page-title__text {
		font-size: 16px;
		height: 48px;
		line-height: 48px;
		color: #BEBEBE;
	}

	.title {
		padding: 5px 13px;
	}

	.uni-form-item__title {
		font-size: 16px;
		line-height: 24px;
	}

	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 8px 13px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.uni-input {
		height: 28px;
		line-height: 28px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
	}

	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-style: normal;
		width: 24px;
		height: 24px;
		line-height: 24px;
		color: #999999;
	}

	.uni-eye-active {
		color: #007AFF;
	}
</style>