<script>
	import addInterceptor from "@/addInterceptor";
	import {
		getUserInfo
	} from "@/api/user/index";
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			addInterceptor();
			// await getUserInfo();
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