<template>
	<view class="popup-filter">
		<view class="popup-filter-title">筛选</view>
		<view class="popup-filter-canter" :style="'height: calc(100vh - 320rpx - ' + safeHeight * 2 + 'rpx)'">
			<view class="filter-canter-item">
				<view class="canter-item-title">评级机构</view>
				<view class="canter-item-list">
					<view class="item-list-data" :class="isSelected('evaluation', index) ? 'item-list-data-select' : ''"
						v-for="(item, index) in evaluationList" :key="item.id"
						@click="toggleSelect('evaluation', index)">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="filter-canter-item">
				<view class="canter-item-title">卡牌种类</view>
				<view class="canter-item-list">
					<view class="item-list-data" :class="isSelected('type', index) ? 'item-list-data-select' : ''"
						v-for="(item, index) in cardTypeList" :key="item.id" @click="toggleSelect('type', index)">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="filter-canter-item">
				<view class="canter-item-title">卡牌类别</view>
				<view class="canter-item-list">
					<view class="item-list-data" :class="isSelected('category', index) ? 'item-list-data-select' : ''"
						v-for="(item, index) in cardCategoryList" :key="item.id"
						@click="toggleSelect('category', index)">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="filter-canter-item">
				<view class="canter-item-title">卡牌系列</view>
				<view class="canter-item-list">
					<view class="item-list-data" :class="isSelected('series', index) ? 'item-list-data-select' : ''"
						v-for="(item, index) in cardSeriesList" :key="item.id" @click="toggleSelect('series', index)">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="filter-canter-item">
				<view class="canter-item-title">罕贵度</view>
				<view class="canter-item-list">
					<view class="item-list-data" :class="isSelected('rarity', index) ? 'item-list-data-select' : ''"
						v-for="(item, index) in rarityList" :key="item.id" @click="toggleSelect('rarity', index)">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
		<view class="popup-filter-button">
			<uv-button text="重置筛选" color="rgba(255, 246, 229, 1)" size="large" shape="circle"
				:customStyle="{color: 'rgba(254, 168, 0, 1)', width: '260rpx'}" @click="handleReset"></uv-button>
			<uv-button text="确定" color="#fea800" size="large" shape="circle"
				:customStyle="{width: '260rpx'}" @click="handleConfirm"></uv-button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		options: {
			styleIsolation: 'shared'
		},
		props: {
			safeHeight: {
				type: Number,
				default: () => (0)
			},
			evaluationList: {
				type: Object,
				default: () => ([{
					name: 'PSA',
					id: 1
				}, {
					name: 'BGS',
					id: 2
				}, {
					name: 'SGC',
					id: 3
				}, {
					name: 'CGC',
					id: 4
				}, {
					name: 'CCIC',
					id: 5
				}, {
					name: 'PSA',
					id: 6
				}, {
					name: 'BGS',
					id: 7
				}, {
					name: 'SGC',
					id: 8
				}, {
					name: 'CGC',
					id: 9
				}, {
					name: 'CCIC',
					id: 10
				}])
			},
			cardTypeList: {
				type: Object,
				default: () => ([{
					name: '评级卡',
					id: 1
				}, {
					name: '裸卡',
					id: 2
				}, {
					name: '原封砖',
					id: 3
				}, {
					name: '评级卡',
					id: 4
				}, {
					name: '裸卡',
					id: 5
				}, {
					name: '原封砖',
					id: 6
				}, {
					name: '评级卡',
					id: 7
				}, {
					name: '裸卡',
					id: 8
				}, {
					name: '原封砖',
					id: 9
				}])
			},
			cardCategoryList: {
				type: Object,
				default: () => ([{
					name: '篮球',
					id: 1
				}, {
					name: '足球',
					id: 2
				}, {
					name: 'TCG',
					id: 3
				}, {
					name: 'PTCG',
					id: 4
				}])
			},
			cardSeriesList: {
				type: Object,
				default: () => ([{
					name: '宝可梦',
					id: 1
				}, {
					name: '迪士尼',
					id: 2
				}])
			},
			rarityList: {
				type: Object,
				default: () => ([{
					name: '小',
					id: 1
				}, {
					name: '于',
					id: 2
				}, {
					name: '2',
					id: 3
				}, {
					name: '字',
					id: 4
				}, {
					name: '小',
					id: 5
				}, {
					name: '于',
					id: 6
				}, {
					name: '2',
					id: 7
				}, {
					name: '字',
					id: 8
				}, {
					name: '小',
					id: 9
				}, {
					name: '于',
					id: 10
				}, {
					name: '2',
					id: 11
				}, {
					name: '字',
					id: 12
				}])
			}
		},
		data() {
			return {
				evaluationSelectIndex: [], // 评级机构选中索引
				typeSelectIndex: [], // 卡牌种类选中索引
				categorySelectIndex: [], // 卡牌类别选中索引
				seriesSelectIndex: [], // 卡牌系列选中索引
				raritySelectIndex: [] // 罕贵度选中索引
			};
		},
		emit: ['handleConfirm'],
		methods: {
			handleConfirm() {
				this.$emit('handleConfirm')
			},
			handleReset() {
				this.evaluationSelectIndex = []; // 评级机构选中索引
				this.typeSelectIndex = []; // 卡牌种类选中索引
				this.categorySelectIndex = []; // 卡牌类别选中索引
				this.seriesSelectIndex = []; // 卡牌系列选中索引
				this.raritySelectIndex = []; // 罕贵度选中索引
			},
			// 切换选中状态
			toggleSelect(type, index) {
				switch (type) {
					case 'evaluation':
						this.evaluationSelectIndex.includes(index) ?
							this.evaluationSelectIndex.splice(this.evaluationSelectIndex.indexOf(index), 1) :
							this.evaluationSelectIndex.push(index);
						break;
					case 'type':
						this.typeSelectIndex.includes(index) ?
							this.typeSelectIndex.splice(this.typeSelectIndex.indexOf(index), 1) :
							this.typeSelectIndex.push(index);
						break;
					case 'category':
						this.categorySelectIndex.includes(index) ?
							this.categorySelectIndex.splice(this.categorySelectIndex.indexOf(index), 1) :
							this.categorySelectIndex.push(index);
						break;
					case 'series':
						this.seriesSelectIndex.includes(index) ?
							this.seriesSelectIndex.splice(this.seriesSelectIndex.indexOf(index), 1) :
							this.seriesSelectIndex.push(index);
						break;
					case 'rarity':
						this.raritySelectIndex.includes(index) ?
							this.raritySelectIndex.splice(this.raritySelectIndex.indexOf(index), 1) :
							this.raritySelectIndex.push(index);
						break;
				}
			},
			// 判断是否选中
			isSelected(type, index) {
				switch (type) {
					case 'evaluation':
						return this.evaluationSelectIndex.includes(index);
					case 'type':
						return this.typeSelectIndex.includes(index);
					case 'category':
						return this.categorySelectIndex.includes(index);
					case 'series':
						return this.seriesSelectIndex.includes(index);
					case 'rarity':
						return this.raritySelectIndex.includes(index);
					default:
						return false;
				}
			}
		},
		mounted() {}
	};
</script>

<style lang="scss" scoped>
	.popup-filter {
		width: 600rpx;
		padding-top: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popup-filter-title {
		font-weight: 600;
		font-size: 32rpx;
		text-align: center;
		color: rgba(0, 0, 0, 0.9);
		margin-bottom: 40rpx;
	}

	.popup-filter-canter {
		width: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 48rpx;
		padding: 0 32rpx;
	}

	.filter-canter-item {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.canter-item-title {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}

	.canter-item-list {
		display: flex;
		flex-wrap: wrap;
		/* 允许子元素换行 */
		gap: 16rpx;
		/* 子元素之间的间距 */
	}

	.item-list-data {
		height: 64rpx;
		display: flex;
		align-items: center;
		opacity: 0.8;
		padding: 0 28rpx;
		border-radius: 200rpx;
		background: rgba(0, 0, 0, 0.05);
		font-size: 24rpx;
		color: rgba(0, 0, 0, 0.66);
	}

	.item-list-data-select {
		height: 64rpx;
		display: flex;
		align-items: center;
		opacity: 0.8;
		padding: 0 26rpx;
		border-radius: 200rpx;
		border-width: 2rpx;
		background: rgba(254, 168, 0, 0.1);
		border: 2rpx solid rgba(254, 168, 0, 1);
		// font-weight: 600;
		font-size: 24rpx;
		color: rgba(254, 168, 0, 1);
	}

	.popup-filter-button {
		width: 100%;
		height: 184rpx;
		display: flex;
		justify-content: space-between;
		padding: 16rpx 32rpx 80rpx 32rpx;
		border-top-width: 2rpx;
		margin-top: 32rpx;
	}
</style>