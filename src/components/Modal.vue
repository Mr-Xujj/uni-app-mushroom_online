<template>
<!-- 背景 -->
  <view class="modal-mask" @click="closeModel" v-show="visible">
      <!-- 内容 -->
    <view @click.stop="Bubbling" class="modal-content">
      <view class="modal-title" >{{ title }}</view>
      <view class="modal-body">
          <!-- 子组件slot标签会被（在父组件中导入子组件---子组件标签中的标签内容会替换slot标签） -->
        <slot></slot> 
      </view>
      <view @click.stop="postComment" class="modal-action">{{confirmText}}</view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
   props:{
       visible:Boolean,
       title:String,
       confirmText:{
           type:String,
           default:'提交'
       }
   },
   methods:{
       closeModel(){
           this.$emit('close')
       },
    //    阻止事件冒泡
       Bubbling(){
         console.log('666')
       },
    //    提交
       postComment(){
           this.$emit('Submission')
       }
   }
})
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  transition: all 0.2s ease-in-out;
}
.modal-content {
  margin: 300rpx auto 0;
  width: 600rpx;
  border-radius: 7px;
  padding: 15px 15px 10px 15px;
  // position:relative;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  background-clip: padding-box;
  overflow: hidden;
}
.modal-title {
  padding: 6px 15px 15px;
  margin: 0;
  font-size: 18px;
  line-height: 1;
  color: #1c2438;
  text-align: center;
}
.modal-body {
  margin-bottom: 50rpx;
  font-size: 14px;
  color: #80848f;
  height: 100%;
  line-height: 1.5;
  overflow: auto;
}
.modal-action {
  border-top: 1px solid #e0e0e0;
  margin-top: 30rpx;
  padding-top: 10rpx;
  height: 80rpx;
  line-height: 80rpx;
  color: #ff994d;
  font-size: 16px;
  text-align: center;
}
</style>