<template>
	<div class="show-title">
		<el-divider direction="vertical" style="height: 21px; border-radius: 3px;border-left: 5px solid #FD7A38;" />
		<div class="title">{{ title }}</div>
	</div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue'
const props = defineProps({
	title: String,
})
//使用父组件传递过来的值
const { title } = toRefs(props)
</script>

<style scoped lang="scss">
.show-title {
	font-size: 18px;
	font-weight: 600;
	letter-spacing: 0px;
	// line-height: 25px;
	color: rgba(0, 0, 0, 1);
	text-align: left;
	// vertical-align: center;
	vertical-align: text-bottom;
	display: flex;
	align-items: center;
}
</style>