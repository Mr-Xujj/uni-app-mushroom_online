<template>
  <view class="course-container">
	<navigator :url="'/pages/course-detail/index?id='+item.id" class="course-item" v-for="item in courses" :key="item.id">
		<image :src="item.icon" alt="" />
		<text class="title">{{item.title}}</text>
		<text class="subtitle">{{item.subtitle}}</text>
		<text class="level" v-if="item.level === 1">初级</text>
		<text class="level" v-else-if="item.level === 2">中级</text>
		<text class="level" v-else-if="item.level === 3">高级</text>
	</navigator>
</view>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
      data(){
          return{
            
          }
      },
      props:{
          courses:{
             type:Array,
             default:[]
          }
      }
})
</script>

<style lang="less" scoped>
.course-container {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32rpx;
}

.course-item {
  margin-left: 32rpx;
  margin-top: 32rpx;
  border-radius: 12rpx;
  background-color: white;
  width: 333rpx;
  height: 368rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.course-item image {
  margin-top: 58rpx;
  width: 124rpx;
  height: 124rpx;
}

.course-item  .title {
  margin-top: 28rpx;
  color: #333;
  font-weight: bold;
  font-size: 32rpx;
}

.course-item  .subtitle {
  color: #a8a8a8;
  font-size: 22rpx;
  margin-top: 12rpx;
}

.course-item  .level {
  margin-top: 20rpx;
  color: #ffb37a;
  text-align: center;
  font-size: 24rpx;
  line-height: 32rpx;
  width: 92rpx;
  height: 32rpx;
  border: 2rpx solid rgba(255, 179, 122, 1);
  opacity: 1;
  border-radius: 16rpx;
}
</style>