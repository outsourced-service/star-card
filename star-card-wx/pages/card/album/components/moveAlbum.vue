<template>
	<view class="move-album">
		<view class="move-album-top">
			<view class="album-top-close"><uv-icon name="close" color="rgba(0, 0, 0, 0.44)" size="32rpx" bold></uv-icon></view>
			<view class="album-top-title">移动到卡册</view>
			<view class="album-top-button" @click="$emit('addAlbum')"><uv-icon name="plus" color="rgba(254, 168, 0, 1)" size="32rpx" bold></uv-icon>新建卡册</view>
		</view>
		<view class="move-album-list">
			<view class="album-list-item" v-for="(item, index) in albumList" :key="index">
				<view class="list-item-data">
					<view class="item-data-left">
						<uv-image lazyLoad :src="item.image" width="96rpx" height="96rpx" radius="12rpx"></uv-image>
						<view class="item-data-info">
							<view class="data-info-name">{{item.name}}</view>
							<uv-icon name="lock" color="rgba(0, 0, 0, 0.2)" v-if="item.is_lock" size="28rpx"></uv-icon>
							<uv-icon name="lock-open" color="rgba(0, 0, 0, 0.2)" v-else size="28rpx"></uv-icon>
						</view>
					</view>
					<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.44)" size="32rpx" bold></uv-icon>
				</view>
				<view class="list-item-line" v-if="albumList.length - 1 > index"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			albumList: {
				type: Array,
				default: () => ([{
					name: '科比',
					image: 'https://s3-alpha-sig.figma.com/img/89ba/ae6b/cc5944d4a2a72de4eff24f378093ab4f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K67uhAAaoKLCXx3CUbPDSKFY-TfMDIjcmWA~7xyp15GndCD7j7R8zM-qQVAUE4dMdsazzoStW92DDewkpNa-UEad3C5KNemVSpQab3bV5pBkNhQkjJT8jXbf01B6wHpTBhe1v7HZ-yVS-Vc6uCutZr6VGVGce2ghhzB6FxoLs7S5CYgFg3ko5NinjGRtRdXhPlo7CffEPc88G0iR260wssK2cd3aDsd21YE3sdpNXGBIoDs4m4fFTkybdMn9zUoCMqt80EyINwl7gklXxrcgRkGEMD6oWJA9EEMUExinmogEr0rqGbrhjZ4X4iQKl4B~WYa9N~MeeFSI0BH-BvFRiw__',
					is_lock: false
				}, {
					name: '欧文',
					image: 'https://s3-alpha-sig.figma.com/img/89ba/ae6b/cc5944d4a2a72de4eff24f378093ab4f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K67uhAAaoKLCXx3CUbPDSKFY-TfMDIjcmWA~7xyp15GndCD7j7R8zM-qQVAUE4dMdsazzoStW92DDewkpNa-UEad3C5KNemVSpQab3bV5pBkNhQkjJT8jXbf01B6wHpTBhe1v7HZ-yVS-Vc6uCutZr6VGVGce2ghhzB6FxoLs7S5CYgFg3ko5NinjGRtRdXhPlo7CffEPc88G0iR260wssK2cd3aDsd21YE3sdpNXGBIoDs4m4fFTkybdMn9zUoCMqt80EyINwl7gklXxrcgRkGEMD6oWJA9EEMUExinmogEr0rqGbrhjZ4X4iQKl4B~WYa9N~MeeFSI0BH-BvFRiw__',
					is_lock: true
				}, {
					name: '库里',
					image: 'https://s3-alpha-sig.figma.com/img/89ba/ae6b/cc5944d4a2a72de4eff24f378093ab4f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K67uhAAaoKLCXx3CUbPDSKFY-TfMDIjcmWA~7xyp15GndCD7j7R8zM-qQVAUE4dMdsazzoStW92DDewkpNa-UEad3C5KNemVSpQab3bV5pBkNhQkjJT8jXbf01B6wHpTBhe1v7HZ-yVS-Vc6uCutZr6VGVGce2ghhzB6FxoLs7S5CYgFg3ko5NinjGRtRdXhPlo7CffEPc88G0iR260wssK2cd3aDsd21YE3sdpNXGBIoDs4m4fFTkybdMn9zUoCMqt80EyINwl7gklXxrcgRkGEMD6oWJA9EEMUExinmogEr0rqGbrhjZ4X4iQKl4B~WYa9N~MeeFSI0BH-BvFRiw__',
					is_lock: false
				}, {
					name: '欧文',
					image: 'https://s3-alpha-sig.figma.com/img/89ba/ae6b/cc5944d4a2a72de4eff24f378093ab4f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K67uhAAaoKLCXx3CUbPDSKFY-TfMDIjcmWA~7xyp15GndCD7j7R8zM-qQVAUE4dMdsazzoStW92DDewkpNa-UEad3C5KNemVSpQab3bV5pBkNhQkjJT8jXbf01B6wHpTBhe1v7HZ-yVS-Vc6uCutZr6VGVGce2ghhzB6FxoLs7S5CYgFg3ko5NinjGRtRdXhPlo7CffEPc88G0iR260wssK2cd3aDsd21YE3sdpNXGBIoDs4m4fFTkybdMn9zUoCMqt80EyINwl7gklXxrcgRkGEMD6oWJA9EEMUExinmogEr0rqGbrhjZ4X4iQKl4B~WYa9N~MeeFSI0BH-BvFRiw__',
					is_lock: false
				}, {
					name: '库里',
					image: 'https://s3-alpha-sig.figma.com/img/89ba/ae6b/cc5944d4a2a72de4eff24f378093ab4f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K67uhAAaoKLCXx3CUbPDSKFY-TfMDIjcmWA~7xyp15GndCD7j7R8zM-qQVAUE4dMdsazzoStW92DDewkpNa-UEad3C5KNemVSpQab3bV5pBkNhQkjJT8jXbf01B6wHpTBhe1v7HZ-yVS-Vc6uCutZr6VGVGce2ghhzB6FxoLs7S5CYgFg3ko5NinjGRtRdXhPlo7CffEPc88G0iR260wssK2cd3aDsd21YE3sdpNXGBIoDs4m4fFTkybdMn9zUoCMqt80EyINwl7gklXxrcgRkGEMD6oWJA9EEMUExinmogEr0rqGbrhjZ4X4iQKl4B~WYa9N~MeeFSI0BH-BvFRiw__',
					is_lock: true
				}, {
					name: '科比',
					image: 'https://s3-alpha-sig.figma.com/img/89ba/ae6b/cc5944d4a2a72de4eff24f378093ab4f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K67uhAAaoKLCXx3CUbPDSKFY-TfMDIjcmWA~7xyp15GndCD7j7R8zM-qQVAUE4dMdsazzoStW92DDewkpNa-UEad3C5KNemVSpQab3bV5pBkNhQkjJT8jXbf01B6wHpTBhe1v7HZ-yVS-Vc6uCutZr6VGVGce2ghhzB6FxoLs7S5CYgFg3ko5NinjGRtRdXhPlo7CffEPc88G0iR260wssK2cd3aDsd21YE3sdpNXGBIoDs4m4fFTkybdMn9zUoCMqt80EyINwl7gklXxrcgRkGEMD6oWJA9EEMUExinmogEr0rqGbrhjZ4X4iQKl4B~WYa9N~MeeFSI0BH-BvFRiw__',
					is_lock: true
				}])
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		emit: ['addAlbum'],
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.move-album {
		height: 800rpx;
		background-color: #f6f7f9;
		display: flex;
		flex-direction: column;
		gap: 40rpx;
		padding: 40rpx 32rpx 0 32rpx;
	}
	
	.move-album-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	
	.album-top-close {
		width: 156rpx;
	}
	
	.album-top-title {
		font-size: 30rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.album-top-button {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		font-weight: 600;
		font-size: 30rpx;
		color: rgba(254, 168, 0, 1);
	}
	
	.move-album-list {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		gap: 32rpx;
		border-radius: 24rpx;
		padding: 32rpx 24rpx;
		box-shadow: 0 8rpx 40rpx 0 rgba(0, 0, 0, 0.05);
		overflow-y: auto;
		height: calc(800rpx - 32rpx - 32rpx - 40rpx - 40rpx);
	}
	
	.album-list-item {
		display: flex;
		flex-direction: column;
		gap: 32rpx;
	}
	
	.list-item-data {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.item-data-left {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}
	
	.item-data-info {
		display: flex;
		align-items: center;
		gap: 4rpx;
	}
	
	.data-info-name {
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.99);
	}
	
	.list-item-line {
		border-top: 1rpx solid rgba(229, 229, 234, 1);
	}
</style>