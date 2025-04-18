<template>
  <view class="edit-page" :style="'padding-top:' + offsetTop + 'px'">
    <uv-navbar :title="navbarTitle" @leftClick="leftClick" bg-color="#fff" :titleStyle="{fontSize: '28rpx'}"></uv-navbar>
    <view class="edit-page-form" v-if="type != 'service' && type != 'serviceType'">
      <!-- 名字 -->
      <uni-easyinput maxlength="24" :inputBorder="false" :clearable="false" v-if="type == 'name'"
        v-model="data.user_name" focus placeholder="请输入名字">
        <template v-slot:suffix>
          <text style="color: #000; opacity: 1;">2-24</text>
        </template>
      </uni-easyinput>
      <!-- 简介 -->
      <uv-textarea v-if="type == 'signature'" maxlength="100" count v-model="data.signature" placeholder="请输入简介" border="none" :customStyle="{borderRadius: '32rpx', padding: '18rpx 18rpx 14rpx 18rpx'}" height="320rpx"></uv-textarea>
      <!-- 地址 -->
      <view class="page-form" v-if="type == 'address'">
        <uni-forms ref="form" :modelValue="data" label-width="148rpx" border>
          <uni-forms-item label="所在地">
            <uni-easyinput v-model="data.address.address" placeholder="设置所在地" :inputBorder="false" suffixIcon="location" suffixIconStyle="color: #fda700" @iconClick="handleChooseLocation" />
          </uni-forms-item>
          <uni-forms-item label="详细地址">
            <view class="textarea-wrapper">
              <textarea class="custom-textarea" v-model="data.address.address_detail" placeholder="设置详细地址" auto-height show-confirm-bar="false" />
            </view>
          </uni-forms-item>
          <uni-forms-item label="门牌号">
            <uni-easyinput v-model="data.address.house" placeholder="例：2号楼2单元10层107" :inputBorder="false" />
          </uni-forms-item>
        </uni-forms>
      </view>
      <!-- 营业时间 -->
      <view class="page-form" v-if="type == 'time'">
        <uni-forms ref="form" :modelValue="data" label-width="148rpx" border>
          <uni-forms-item label="开门时间">
			<view class="page-form-time" @click="selectOpenTime">
				<view class="form-time-text" v-if="data.openTime">{{data.openTime}}</view>
				<view class="form-time-no" v-else>设置开门时间</view>
				<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="28rpx" bold></uv-icon>
			</view>
          </uni-forms-item>
          <uni-forms-item label="关门时间">
			<view class="page-form-time" @click="selectCloseTime">
				<view class="form-time-text" v-if="data.closeTime">{{data.closeTime}}</view>
				<view class="form-time-no" v-else>设置关门时间</view>
				<uv-icon name="arrow-right" color="rgba(0, 0, 0, 0.2)" size="28rpx" bold></uv-icon>
			</view>
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>
    <view class="edit-page-service" v-else-if="type == 'service'">
      <view class="page-service-item" v-for="(item, index) in serviceList" :key="index">
        <view class="service-item-title">{{item.title}}</view>
        <view class="service-item-tag">
          <view
            class="item-tag-text"
            :class="isSelected(index, indexName) ? 'item-tag-text-select' : ''"
            v-for="(itemName, indexName) in item.list"
            :key="indexName"
            @click="toggleSelect(index, indexName)"
          >
            {{itemName.name}}
          </view>
        </view>
      </view>
    </view>
	<view class="edit-page-type" v-else-if="type == 'serviceType'">
		<view class="item-tag-text" v-for="(itemType, indexType) in selectTypeList" :key="indexType" v-if="selectTypeList.length > 0" style="color: rgba(0, 0, 0, 1);">
			{{itemType}}<uv-icon name="close" color="rgba(0, 0, 0, 0.2)" size="32rpx" @click="deletePicker(indexType)"></uv-icon>
		</view>
		<view class="item-tag-text" style="color: rgba(0, 0, 0, 0.33);" @click="openPicker" v-if="selectTypeList.length < 6">添加类别<uv-icon name="plus" color="rgba(0, 0, 0, 0.2)" size="32rpx"></uv-icon></view>
	</view>
    <view class="edit-page-button" :style="'padding-bottom: ' + safeHeight + 'px'">
		<view class="page-select-number" v-if="type == 'service'">{{serviceSelect.length}}/6</view>
		<view class="page-select-number" v-if="type == 'serviceType'">{{selectTypeList.length}}/6</view>
		<uv-button text="确认" color="#fea800" size="large" shape="circle" :customStyle="{height: '88rpx'}" @click="handleConfirm"></uv-button>
    </view>
	<uv-picker ref="picker" title="添加类别" :columns="columns" @confirm="confirm" @change="change"></uv-picker>
	<uv-datetime-picker 
		ref="datetimePicker" 
		v-model="value" 
		mode="time" 
		:minHour="minHour"
		:minMinute="minMinute"
		@confirm="confirmTime">
	</uv-datetime-picker>
  </view>
</template>

<script>
export default {
  components: {},
  options: {
    styleIsolation: 'shared'
  },
  data() {
    return {
      safeHeight: 0,
      offsetTop: 44,
      navbarTitle: '',
      type: '',
      data: {},
      serviceList: [
        { 
          title: '评级',
          list: [{name: '评级', id: 1}, {name: '开盒', id: 2}, {name: 'PTCG道馆', id: 3}, {name: '国内代卖', id: 4}, {name: 'eBay代购', id: 5},
               {name: 'Goldin代卖', id: 6}, {name: 'Goldin代购', id: 7}, {name: 'PWCC代卖', id: 8}, {name: 'PSA评级', id: 9}, {name: 'BGS评级', id: 10}]
        },
        {
          title: '道馆',
          list: [{name: '国内代卖', id: 1}, {name: 'eBay代购', id: 2}, {name: 'Goldin代卖', id: 3}, {name: 'Goldin代购', id: 4}, {name: 'PWCC代卖', id: 5},
                {name: 'PSA评级', id: 6}, {name: 'BGS评级', id: 7}, {name: 'CGC评级', id: 8}, {name: 'SGC评级', id: 9}]
        }
      ],
      serviceSelect: [] ,// 存储选中的标签
	  selectTypeList: ['宝可梦'],
	  columns: [
			['TCG', '体育', '非体育'],
			['宝可梦', '海贼王', 'WS黑白双翼', '龙珠', 'Lorcana', '游戏王', '其他TCG']
		],
		columnData: [
			['宝可梦', '海贼王', 'WS黑白双翼', '龙珠', 'Lorcana', '游戏王', '其他TCG'],
			['篮球', '足球', '棒球', '橄榄球', '赛车', '其他体育'],
			['漫威', '权力的游戏', 'DC', '哈利波特', '小马宝莉', '其他非体育']
		],
		minHour: 0,
		minMinute: 0,
		nowPickerTime: ''
    }
  },
  methods: {
	  confirmTime(e) {
		  if(this.nowPickerTime == 'openTime') {
			  this.data.openTime = e.value;
		  } else {
			  this.data.closeTime = e.value;
		  }
	  },
	  selectCloseTime() {
		  if(this.data.openTime) {
			  const [hours, minutes] = this.data.openTime.split(":").map(Number);
			  this.minHour = hours;
			  this.minMinute = minutes;
			  this.$refs.datetimePicker.open();
			  this.nowPickerTime = 'closeTime';
		  } else {
			  uni.showToast({
			  	title: '请先选择开门时间',
				icon: 'none'
			  })
		  }
	  },
	  selectOpenTime() {
		  this.minHour = 0;
		  this.minMinute = 0;
		  this.$refs.datetimePicker.open();
		  this.nowPickerTime = 'openTime';
	  },
	  deletePicker(index) {
		  this.selectTypeList.splice(index, 1);
	  },
	  openPicker() {
		  this.$refs.picker.open();
	  },
	  confirm(e) {
			if(this.selectTypeList.length >= 6) {
				uni.showToast({
					title: "最多可选6个",
					icon:'none'
				})
			} else {
				this.selectTypeList.push(e.value[1])
			}
		},
		change(e) {
			const { columnIndex , index} = e
			if (columnIndex === 0) {
				this.$refs.picker.setColumnValues(1, this.columnData[index])
			}
		},
	  handleConfirm() {
		  
	  },
    handleChooseLocation() {
      uni.chooseLocation({
        success: (res) => {
          // 更新地址信息
          this.data.address.address = res.address;
          this.data.address.address_detail = res.name;
          // 解析地址获取省市区
          const addressParts = res.address.split(/省|市|区|自治区|特别行政区/);
          this.data.address.province = addressParts[0] + (res.address.includes('省') ? '省' : '');
          this.data.address.city = addressParts[1] ? addressParts[1] + '市' : '';
          this.data.address.area = addressParts[2] ? addressParts[2] + '区' : '';
          this.data.address.address = this.data.address.province + this.data.address.city + this.data.address.area;
        },
        fail: (err) => {
          console.error('选择地址失败：', err);
          uni.showToast({
            title: '选择地址失败',
            icon: 'none'
          });
        }
      });
    },
    leftClick() {
      uni.navigateBack();
    },
    getNavbarTitle(value) {
      if (value == 'name') return (this.navbarTitle = '名字');
      if (value == 'signature') return (this.navbarTitle = '简介');
      if (value == 'address') return (this.navbarTitle = '店铺地址');
      if (value == 'time') return (this.navbarTitle = '营业时间');
      if (value == 'service') return (this.navbarTitle = '经营服务');
      if (value == 'serviceType') return (this.navbarTitle = '经营类别');
    },
    toggleSelect(categoryIndex, itemIndex) {
      const key = `${categoryIndex}-${itemIndex}`;
      const index = this.serviceSelect.indexOf(key);
      if (index === -1) {
		if(this.serviceSelect.length >= 6) {
			uni.showToast({
				title: "最多可选6个",
				icon:'none'
			})
		} else {
			this.serviceSelect.push(key);
		}
      } else {
		  this.serviceSelect.splice(index, 1);
      }
    },
    isSelected(categoryIndex, itemIndex) {
      return this.serviceSelect.includes(`${categoryIndex}-${itemIndex}`);
    }
  },
  onLoad(option) {
    this.type = option.type;
    this.getNavbarTitle(option.type);
    this.data = JSON.parse(decodeURIComponent(option.data));
	console.log(this.selectTypeList)
  },
  mounted() {
    // #ifndef WEB
    this.safeHeight = this.$system.safeHeight();
    this.offsetTop = this.$system.BarHeight();
    // #endif
  }
};
</script>

<style lang="scss" scoped>
.edit-page {
  height: 100vh;
  width: 100vw;
  background-color: #f6f7f9;
}

.edit-page-form {
  background-color: #fff;
  margin: 32rpx;
  border-radius: 32rpx;
  padding: 14rpx;
}

.page-form {
  padding: 0 18rpx;
  margin: -14rpx 0;
  ::v-deep {
      /* 修改禁用输入框背景 */
      .uni-easyinput--disabled {
        background-color: #fff !important;
      }
  
      /* 移除禁用状态边框（可选） */
      .uni-easyinput__content.is-disabled {
        border-color: transparent !important;
      }
  
      /* 修复点击区域颜色（可选） */
      .uni-easyinput.is-disabled .uni-easyinput__content {
        background-color: #fff !important;
      }
    }
}

.page-form ::v-deep .uniui-location:before {
  color: #fda700;
}

.textarea-wrapper {
  width: 100%;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  min-height: 70rpx;
}

.custom-textarea {
  width: 100%;
  font-size: 28rpx;
  padding: 0;
  margin-right: 20rpx;
  background-color: transparent;
}

.page-form-time {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding-left: 20rpx;
}

.form-time-text {
	font-size: 28rpx;
	color: rgba(0, 0, 0, 0.99);
}

.form-time-no {
	font-size: 28rpx;
	color: rgba(0, 0, 0, 0.2);
}

.edit-page-service {
  margin: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.page-service-item {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.service-item-title {
  font-size: 26rpx;
  color: rgba(0, 0, 0, 0.33);
}

.service-item-tag {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.item-tag-text {
  height: 84rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 28rpx;
  border-radius: 24rpx;
  background-color: rgba(255, 255, 255, 1);
  font-size: 30rpx;
  color: rgba(0, 0, 0, 0.66);
  border: 2rpx solid rgba(255, 255, 255, 1);
  gap: 16rpx;
}

.item-tag-text-select {
  height: 84rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 28rpx;
  border-radius: 24rpx;
  font-size: 30rpx;
  background: rgba(255, 246, 229, 1);
  border: 2rpx solid rgba(254, 168, 0, 1);
  color: rgba(254, 168, 0, 1);
}

.edit-page-type {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	margin: 32rpx;
}

.edit-page-button {
  padding: 0 32rpx;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.page-select-number {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 24rpx;
	font-size: 26rpx;
	color: rgba(0, 0, 0, 0.33);
	margin-right: 16rpx;
}

/* 设置 suffixIcon 的样式 */
.page-form ::v-deep .uniui-right:before {
  font-size: 32rpx;
  color: rgba(0, 0, 0, 0.2);
  font-weight: 600;
}

/* 设置禁用时的背景色为白色 */
.page-form ::v-deep .uni-easyinput--disabled {
  background-color: #fff !important;
}

.page-form ::v-deep .uni-easyinput__content {
  background-color: #fff !important;
}
.page-form ::v-deep .is-disabled {
  background-color: #fff !important;
}
</style>