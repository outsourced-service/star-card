<template>
	<view>
		<CategoryTagList :tabList="tabList" @tabChange="tabChange" @tagChange="tagChange"></CategoryTagList>
		{{a1}}
		{{a2}}
	</view>
</template>

<script>
	import CategoryTagList from './components/CategoryTagList.vue'
	import { tabList } from '../../mock/CategoryTagList.js'
	
	export default {
		data() {
			return {
				tabList: tabList,
				a1: tabList[0].name,
				a2: tabList[0].tagList[0].name
			}
		},
		components: {
			CategoryTagList
		},
		methods: {
			tabChange(name) {
				this.a1 = name
			},
			tagChange(name) {
				this.a2 = name
			}
		},
		onLoad() {
		}
	}
</script>

<style>
</style>