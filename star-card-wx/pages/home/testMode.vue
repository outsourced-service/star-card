<template>
  <view class="container">
    <!-- 3D场景容器 -->
    <xr-scene id="xr-scene" @ready="handleSceneReady"></xr-scene>
    
    <!-- 卡片信息浮层 -->
    <view class="card-overlay">
      <view class="header">
        <text class="time">9:41</text>
      </view>
      
      <view class="card-content">
        <view class="card-title">评级卡详情</view>
        <view class="card-number">编号：0016807192</view>
        <view class="card-name">2023 Donruss Elite Sidy Cissoko Pen Pals Auto–Black 1/1 PSA/DNA Certification</view>
        
        <view class="spec-table">
          <view class="row">
            <text class="label">卡品</text>
            <text class="value">GEM MINT 9.5</text>
          </view>
          <view class="row">
            <text class="label">签字</text>
            <text class="value">AUTO 10</text>
          </view>
        </view>

        <view class="stock-info">
          <view class="stock-item">
            <text>当前评分存量</text>
            <text class="num">159</text>
          </view>
          <view class="stock-item">
            <text>更高评分存量</text>
            <text class="num">12</text>
          </view>
        </view>

        <view class="generate-info">
          <text>图片生成于 2024年11月22日</text>
        </view>
      </view>

      <view class="footer">
        <view class="service">星卡快送帮您一步直达卡牌送评</view>
        <view class="actions">
          <text>卡牌交换 - 卡牌展示</text>
        </view>
        <view class="card-type">Pals Auto–Black 1/1 PSA/DNA</view>
      </view>
    </view>

    <!-- 操作按钮组 -->
    <view class="action-buttons">
      <button class="btn share" @tap="shareWx">发送给朋友</button>
      <button class="btn collect">收藏</button>
      <button class="btn save">保存到相册</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scene: null,
      cardInfo: {
        number: '0016807192',
        name: '2023 Donruss Elite Sidy Cissoko Pen Pals Auto–Black 1/1 PSA/DNA Certification',
        grade: 'GEM MINT 9.5',
        signature: 'AUTO 10',
        currentStock: 159,
        higherStock: 12,
        generateDate: '2024年11月22日'
      }
    }
  },
  methods: {
    handleSceneReady(e) {
      this.scene = e.detail.value;
      this.init3DContent();
    },
    
    async init3DContent() {
      // 创建3D卡片背景
      const card = this.scene.createElement('xr-mesh', {
        geometry: 'plane',
        position: '0 0 -1',
        scale: '1.2 1.8 1',
        material: 'color:#FFFFFF'
      });
      
      // 添加3D文字
      const createText = (content, position) => {
        return this.scene.createElement('xr-text', {
          text: content,
          fontSize: 0.08,
          color: '#333333',
          position: position
        });
      };

      await this.scene.ready;
      this.scene.appendChild(card);
      this.scene.appendChild(createText(this.cardInfo.number, '-0.5 0.8 -0.9'));
      this.scene.appendChild(createText(this.cardInfo.name, '-0.5 0.6 -0.9'));
    },

    async shareWx() {
      try {
        if (!this.scene?.share?.supported) {
          uni.showToast({ title: '当前环境不支持分享', icon: 'none' });
          return;
        }

        uni.showLoading({ title: '生成分享图中...' });
        
        const { tempFilePath } = await this.scene.share.captureToLocalPath({
          type: 'jpg',
          quality: 0.95
        });

        await wx.shareImageMessage({
          image: tempFilePath
        });

      } catch (err) {
        console.error('分享失败:', err);
        uni.showToast({ title: '分享失败', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  padding: 40rpx;
  
  .header {
    text-align: center;
    .time {
      font-size: 36rpx;
      color: #333;
    }
  }

  .card-content {
    margin-top: 80rpx;
    .card-title {
      font-size: 48rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    .card-number {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 30rpx;
    }
    .card-name {
      font-size: 32rpx;
      line-height: 1.5;
      margin-bottom: 40rpx;
    }

    .spec-table {
      .row {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0;
        border-bottom: 1px solid #eee;
        .label {
          color: #999;
        }
        .value {
          font-weight: bold;
        }
      }
    }

    .stock-info {
      display: flex;
      margin-top: 40rpx;
      .stock-item {
        flex: 1;
        text-align: center;
        .num {
          display: block;
          font-size: 48rpx;
          color: #fea800;
          margin-top: 10rpx;
        }
      }
    }

    .generate-info {
      text-align: center;
      color: #999;
      margin-top: 60rpx;
      font-size: 24rpx;
    }
  }

  .footer {
    position: absolute;
    bottom: 40rpx;
    left: 0;
    right: 0;
    text-align: center;
    
    .service {
      color: #fea800;
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }
    .actions {
      color: #333;
      margin-bottom: 10rpx;
    }
    .card-type {
      color: #666;
      font-size: 24rpx;
    }
  }
}

.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #fff;
  padding: 20rpx;
  box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.1);
  
  .btn {
    flex: 1;
    margin: 0 10rpx;
    font-size: 28rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    
    &.share {
      background: #07C160;
      color: white;
    }
    &.collect {
      background: #fea800;
      color: white;
    }
    &.save {
      background: #f0f0f0;
      color: #333;
    }
  }
}
</style>