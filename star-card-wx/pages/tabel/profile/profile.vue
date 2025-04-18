<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<navbar title=''></navbar>
		<topInfoShow :data="userInfo"></topInfoShow>
		<view class="page-item">
			<quickCard></quickCard>
			<cardCabinet :data="cardList" :number="userInfo.new_card_number"></cardCabinet>
			<functionList></functionList>
		</view>
		<!-- <tabBar :value='4' /> -->
		<tabBar value='我的' />
	</view>
</template>

<script>
	import topInfoShow from '/pages/profile/components/topInfoShow.vue';
	import quickCard from '/pages/profile/components/quickCard.vue';
	import cardCabinet from '/pages/profile/components/cardCabinet.vue';
	import functionList from '/pages/profile/components/functionList.vue';
	import { user } from '@/api/gloabal/index';

	import userCardCabinet from '@/api/card/userCardCabinet';
	
	import {
		userInfo
	} from '/mock/users';
	import {
		cardList
	} from '/mock/cards';

	export default {
		components: {
			topInfoShow,
			quickCard,
			cardCabinet,
			functionList
		},
		data() {
			return {
				userInfo: userInfo,
				cardList: cardList
			}
		},
		onShow() {
			user.getUserInfo().then(res => {
				this.userInfo = res
			})

			userCardCabinet.getPublicCardCabinet(3)
		},
		methods: {},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		background: linear-gradient(180deg, #FECB66 0%, #FFFFFF 54.32%);
	}

	.page-item {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		gap: 16rpx !important;
		padding: 32rpx 24rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		margin-top: -20rpx;
		box-shadow: 0rpx 4rpx 40rpx 0rpx rgba(0, 0, 0, 0.05);
	}
</style><template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<navbar title=''></navbar>
		<topInfoShow :data="userInfo"></topInfoShow>
		<view class="page-item">
			<quickCard></quickCard>
			<cardCabinet :data="cardList" :number="userInfo.new_card_number"></cardCabinet>
			<functionList></functionList>
		</view>
		<!-- <tabBar :value='4' /> -->
		<tabBar :value='2' />
	</view>
</template>

<script>
	import topInfoShow from '/pages/profile/components/topInfoShow.vue';
	import quickCard from '/pages/profile/components/quickCard.vue';
	import cardCabinet from '/pages/profile/components/cardCabinet.vue';
	import functionList from '/pages/profile/components/functionList.vue';
	import { user } from '@/api/gloabal/index';

	import userCardCabinet from '@/api/card/userCardCabinet';
	
	import {
		userInfo
	} from '/mock/users';
	import {
		cardList
	} from '/mock/cards';

	export default {
		components: {
			topInfoShow,
			quickCard,
			cardCabinet,
			functionList
		},
		data() {
			return {
				userInfo: userInfo,
				cardList: cardList
			}
		},
		onShow() {
			user.getUserInfo().then(res => {
				this.userInfo = res
			})

			userCardCabinet.getCardCabinetDetail().then(res => {
				this.cardList = res
			})
		},
		methods: {},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		background: linear-gradient(180deg, #FECB66 0%, #FFFFFF 54.32%);
	}

	.page-item {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		gap: 16rpx !important;
		padding: 32rpx 24rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		margin-top: -20rpx;
		box-shadow: 0rpx 4rpx 40rpx 0rpx rgba(0, 0, 0, 0.05);
	}
</style><template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<navbar title=''></navbar>
		<topInfoShow :data="userInfo"></topInfoShow>
		<view class="page-item">
			<quickCard></quickCard>
			<cardCabinet :data="cardList" :number="userInfo.new_card_number"></cardCabinet>
			<functionList></functionList>
		</view>
		<!-- <tabBar :value='4' /> -->
		<tabBar :value='2' />
	</view>
</template>

<script>
	import topInfoShow from '/pages/profile/components/topInfoShow.vue';
	import quickCard from '/pages/profile/components/quickCard.vue';
	import cardCabinet from '/pages/profile/components/cardCabinet.vue';
	import functionList from '/pages/profile/components/functionList.vue';
	import { user } from '@/api/gloabal/index';

	import userCardCabinet from '@/api/card/userCardCabinet';
	
	import {
		userInfo
	} from '/mock/users';
	import {
		cardList
	} from '/mock/cards';

	export default {
		components: {
			topInfoShow,
			quickCard,
			cardCabinet,
			functionList
		},
		data() {
			return {
				userInfo: userInfo,
				cardList: cardList
			}
		},
		onShow() {
			user.getUserInfo().then(res => {
				this.userInfo = res
			})

			userCardCabinet.getCardCabinetDetail().then(res => {
				this.cardList = res
			})
		},
		methods: {},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		background: linear-gradient(180deg, #FECB66 0%, #FFFFFF 54.32%);
	}

	.page-item {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		gap: 16rpx !important;
		padding: 32rpx 24rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		margin-top: -20rpx;
		box-shadow: 0rpx 4rpx 40rpx 0rpx rgba(0, 0, 0, 0.05);
	}
</style><template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<navbar title=''></navbar>
		<topInfoShow :data="userInfo"></topInfoShow>
		<view class="page-item">
			<quickCard></quickCard>
			<cardCabinet :data="cardList" :number="userInfo.new_card_number"></cardCabinet>
			<functionList></functionList>
		</view>
		<!-- <tabBar :value='4' /> -->
		<tabBar :value='2' />
	</view>
</template>

<script>
	import topInfoShow from '/pages/profile/components/topInfoShow.vue';
	import quickCard from '/pages/profile/components/quickCard.vue';
	import cardCabinet from '/pages/profile/components/cardCabinet.vue';
	import functionList from '/pages/profile/components/functionList.vue';
	import { user } from '@/api/gloabal/index';

	import userCardCabinet from '@/api/card/userCardCabinet';
	
	import {
		userInfo
	} from '/mock/users';
	import {
		cardList
	} from '/mock/cards';

	export default {
		components: {
			topInfoShow,
			quickCard,
			cardCabinet,
			functionList
		},
		data() {
			return {
				userInfo: userInfo,
				cardList: cardList
			}
		},
		onShow() {
			user.getUserInfo().then(res => {
				this.userInfo = res
			})

			userCardCabinet.getCardCabinetDetail().then(res => {
				this.cardList = res
			})
		},
		methods: {},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		background: linear-gradient(180deg, #FECB66 0%, #FFFFFF 54.32%);
	}

	.page-item {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		gap: 16rpx !important;
		padding: 32rpx 24rpx;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		margin-top: -20rpx;
		box-shadow: 0rpx 4rpx 40rpx 0rpx rgba(0, 0, 0, 0.05);
	}
</style>