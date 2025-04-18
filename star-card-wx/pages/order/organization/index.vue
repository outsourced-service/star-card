<template>
	<view class="page">
		<quick></quick>
		<uv-sticky :offsetTop="0" >
			<view class="tabs">
				<tabs :tabList="tabList" :activeTextSize="'34rpx'" :activeTextLineHeight="'42rpx'" 
					:inactiveTextSize="'32rpx'" :inactiveTextLineHeight="'42rpx'" @tabChange="tabChange"></tabs>
			</view>
		</uv-sticky>
		<view class="page-list" v-if="tab == '线上送评'">
			<cardOne :data="topInfo"></cardOne>
			<view class="custom-list">
				<cardTwo v-for="(item, index) in evaluationList" :key="index" :data="item" @handleCard="handleItem()"></cardTwo>
			</view>
		</view>
		<view class="page-list" v-if="tab == '线下送评'">
			<addressTip></addressTip>
			<uv-collapse :border="false" :value="openCollapse">
				<uv-collapse-item v-for="(item, index) in tags" :key="index" :title="item" :name="item">
					<view class="custom-list-offline">
						<evaluationItem v-for="(itemEvaluation, indexEvaluation) in evaluationList" :key="indexEvaluation" :data="itemEvaluation" @handleCard="handleItem()"></evaluationItem>
					</view>
				</uv-collapse-item>
			</uv-collapse>
		</view>
	</view>
</template>

<script>
	import quick from './components/quick.vue';
	import cardOne from './components/cardOne.vue';
	import cardTwo from './components/cardTwo.vue';
	import addressTip from './components/addressTip.vue';
	import evaluationItem from './components/evaluationItem.vue';
	
	import {
		evaluationList
	} from '/mock/evaluation';
	export default {
		options: {
		    styleIsolation: 'shared'
		},
		components: {
			quick,
			cardOne,
			cardTwo,
			addressTip,
			evaluationItem
		},
		data() {
			return {
				tabList: [
					{ name: '线上送评' }, { name: '线下送评' }
				],
				topInfo: {
					title: 'PSA现场评级',
					tip: '12月批次',
					end_data: 1745439121
				},
				evaluationList: evaluationList,
				tab: '线上送评',
				offsetTop: 0,
				tags: [
				  '北京', '上海', '广州', '深圳'
				]
			}
		},
		methods: {
			tabChange(value) {
				this.tab = value
			},
			handleItem() {
				console.log('ew')
				uni.navigateTo({
					url: '/pages/order/procedure/index'
				})
			}
		},
		mounted() {
			// #ifndef WEB
			this.offsetTop = this.$system.BarHeight();
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f1f1f6;
	}
	
	.tabs {
		padding-top: 40rpx;
		background-color: #fff;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
	}
	
	.page-list {
		background-color: #fff;
		padding: 48rpx 32rpx;
	}
	
	.custom-list {
		width: calc(100vw - 64rpx);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 16rpx;
		margin-top: 48rpx;
	}

	.custom-list > cardTwo {
		width: calc(50% - 8rpx); /* 每个卡片占50%的宽度，减去间隙的一半 */
		box-sizing: border-box; /* 确保 padding 和 border 不影响宽度 */
	}
	
	.custom-list-offline {
		display: flex;
		flex-direction: column;
	}
</style>