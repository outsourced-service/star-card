<script>
	import * as wxMiniLogin from "@/api/login/wxMiniLogin"
	export default {
		onLaunch: function() {
			wxMiniLogin.getCode().then(res => {
				console.log(res);
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/common/index.scss';
	@import '@/uni_modules/uni-scss/index.scss';
	@import '@/uni_modules/uv-ui-tools/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>