<template>
  <view class="container">
      <view class="star-bg">
      <image v-for="item in 5"
        :key="item"
        src="/static/images/star_empty@2x.png"
        alt
      />
    </view>

     <view class="star">
      <image
        v-for="item in myScore"
        :key="item"
        src="/static/images/star_fill@2x.png"
        alt
      />
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(){
      return{
         myScore:0
      }
  },
  props:{
    score:{
      type:Number,
      default:5
    }
  },
  created(){
    this.myScore=this.score
  }

})
</script>

<style lang="less" scoped>
.container {
  position: relative;
}
.star,
.star-bg {
  float: left;
  display: flex;
  height: 50rpx;
  align-items: center;
  image {
    width: 38rpx;
    height: 36rpx;
  }
}
.star {
  position: absolute;
  top: 0;
  left: 0;
}
</style>