<template>
  <view class="mp-circle-container">
    <canvas
      class="mp-circle"
      :style="{width:width+'px',height:height+'px'}"
      :canvas-id="'canvas'+canvasId"
    ></canvas>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data(){
   return{
     myForegroundColor:''
   }
  },
  props: {
    //   百分比
    progress: {
      type: Number,
      default: 0
    },
    //   id
    canvasId: Number,
    // 宽
    width: {
      type: Number,
      default: 150
    },
    // 高
    height: {
      type: Number,
      default: 150
    },
    //  线宽
    lineWidth: {
      type: Number,
      default: 5
    },
    // 背景圆的颜色
    backgroundColor: {
      type: String,
      default: "#cccccc"
    },
    //  绘制进度颜色
    foregroundColor: {
      type: String,
      default: "#b4d66e"
    }
  },
  created(){
   this.myForegroundColor=this.foregroundColor
  },
  mounted(){
      this.drawCircle()
  },
  methods:{
      drawCircle(){
        //   根据canvs id 拿到上下文
          const ctx = uni.createCanvasContext('canvas'+this.canvasId,this)
        //   console.log(ctx)
        // 设置颜色
        ctx.strokeStyle=this.backgroundColor;
        //设置线宽
        ctx.lineWidth=this.lineWidth
        // 画圆    圆心-宽------高             半径      0-起点弧度  Math.PI-180度
        ctx.arc(this.width/2,this.height/2,this.width/2-this.lineWidth,0,2*Math.PI);
        ctx.stroke()
        
        // 开启新路径 绘制进度圆
        ctx.beginPath()
        // 绘制进度颜色
        if(this.progress<=30){
           this.myForegroundColor='#ff0000'
        }else if(this.progress>30&&this.progress<=60){
          this.myForegroundColor='#ff783d'
        }else{
          this.myForegroundColor='#00ff00'
        }
           //设置线宽
        ctx.lineWidth=this.lineWidth
        // 设置颜色
        ctx.strokeStyle=this.myForegroundColor;
        // 设置线段两端样式
         ctx.setLineCap('round')
        // 绘制进度
        const eAngle = (this.progress/100)*2*Math.PI-0.5*Math.PI
        ctx.arc(this.width/2,this.height/2,this.width/2-this.lineWidth,-0.5*Math.PI,eAngle,false);
         ctx.stroke()
    

         // 开启新路径 绘制进数字
        ctx.beginPath()
         ctx.fillStyle = this.myForegroundColor
         const font_size = 12
         ctx.font = font_size+'px'
         if(this.progress>99){
           ctx.fillText(this.progress+'%',this.width/2-13,this.height/2+5)
         }else{
           ctx.fillText(this.progress+'%',this.width/2-10,this.height/2+5)

         }

            ctx.draw()
      }
  }
});
</script>
 
<style lang="less" scoped>
.mp-circle-container {
  position: relative;
.mp-circle {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
}
</style>