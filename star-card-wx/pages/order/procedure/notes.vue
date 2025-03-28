<template>
	<view class="page">
		<uv-textarea v-model="note" placeholder="例：请按标签顺序送评" border="none" :customStyle="{borderRadius: '32rpx', padding: '40rpx 32rpx'}" height="320rpx"></uv-textarea>
		<view class="page-form">
			<view class="page-form-top">
				<view class="page-form-title">快捷标签</view>
				<view class="page-form-guide" @click="is_eidt = true" v-if="!is_eidt">编辑</view>
				<view class="page-form-guide" @click="is_eidt = false" v-else>完成</view>
			</view>
			<view class="page-tag-list">
				<view class="tag-list-item" v-for="(item, index) in noteList" :key="index" @click="handleNoteTag(item)">
					{{item}}
					<view class="list-item-icon" v-if="is_eidt" @click="handleEidt(index)">
						<uv-icon name="close-circle-fill" color="rgba(174, 174, 178, 1)" size="32rpx"></uv-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="page-bottom-button">
			<uv-button text="保存" color="#fea800" size="large" shape="circle" @click="handleAddNote"></uv-button>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
		},
		data() {
			return {
				note: '',
				noteList: [
					'请按照摆放顺序送评', '请倒叙排列', '备注信息例子', '快捷标签最大宽度240px，最多1行'
				],
				is_eidt: false
			}
		},
		methods: {
			handleEidt(index) {
				this.noteList.splice(index, 1)
			},
			handleNoteTag(value) {
				if(this.is_eidt) {
					
				} else {
					this.note = value
				}
			},
			handleAddNote() {
				uni.$emit('returnNote', {
					note: this.note
				})
				uni.navigateBack()
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	body {
		background-color: #f2f3f6 !important;
	}
	
	.page {
		background-color: #f2f3f6;
		padding: 32rpx;
		display: flex;
		flex-direction: column;
		gap: 56rpx;
	}
	
	.page-form {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
	
	.page-form-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.page-form-title {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.99);
		display: flex;
		gap: 8rpx;
		align-items: center;
	}
	
	.page-form-guide {
		font-weight: 500;
		font-size: 26rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.page-tag-list {
		display: flex;
		flex-wrap: wrap; // 允许元素换行
		gap: 16rpx; // 设置元素之间的间隔
	}
	
	.tag-list-item {
		border: 2rpx solid rgba(195, 195, 195, 1);
		opacity: 0.8;
		border-radius: 16rpx;
		border-width: 2rpx;
		padding: 16rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.99);
		max-width: 480rpx;
		// margin-right: 16rpx;
		margin-top: 8rpx;
		width: auto; // 宽度自适应内容
		max-width: 480rpx; // 最大宽度为 480rpx
		display: inline-block; // 使元素以行内块元素显示，以支持宽度自适应
		position: relative; /* 添加相对定位 */
	}
	
	.list-item-icon {
		position: absolute;
		top: -12rpx;
		right: -12rpx;
	}
	
	.page-bottom-button {
		position: fixed;
		bottom: 0;
		// margin: 0 32rpx 40rpx 32rpx;
		padding-bottom: 80rpx;
		width: calc(100vw - 64rpx);
	}
</style>