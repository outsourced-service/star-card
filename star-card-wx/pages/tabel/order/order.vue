<template>
	<view>
		<input-preview />
		<tabBar :value='1' />
	</view>
</template>

<script>
	export default {
		components: {},
		componentPlaceholder: {},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				current: 1,
			}
		},
		methods: {},
		computed: {

		},
		onLoad: function(options) {},
		// 下来刷新
		onPullDownRefresh() {},
		// 上拉加载
		onReachBottom() {},
	}
</script>

<style scoped lang="scss">
</style>