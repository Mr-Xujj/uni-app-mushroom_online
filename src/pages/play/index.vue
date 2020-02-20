<template>
  <view class="play-container" v-if="course_detail">
          <!-- 1.0 封面图--视频 -->
       <view class="cover_image">
            <video @play="videoPlay" id="videoId"   :src="playUrl" controls></video>
      </view>

        <!-- 2.0 简介 -->
        <viwe class="introduction">
              <view class="title-and-info">
                 <text class="title">{{course_detail.course.title}}</text>
                   <text class="info">
                      <text>{{course_detail.course.study_count}}人学过</text>
                      <text>难度:{{level}}</text>
                      <text>时长:{{course_detail.course.course_duration}}</text>
                 </text>
              </view>
             <!-- 我要评价 -->
             <model @Submission="postComment" @close="closeModel" :visible="isShowModel">
               <view>
                 <textarea v-model="content" placeholder="请输入要评价的内容！！！" rows="5"/>
               </view>
                <view style="margin-top:10rpx;">
                      <text>评分：</text>
                      <view style="float:right;margin-right:300rpx;margin-top:-5rpx;">
                         <Star :score="scoress" />
                         <!-- @changeScore="getChangeSocre" :readonly="false" -->
                      </view>
                </view>
             </model>
              <view class="comment">
                 <image @click="evaluate" src="/static/images/evaluate@2x.png" alt />
             </view>
        </viwe>

          <!-- 3.0 课程进度 -->
    <view class="course-progress">
      <view class="title">课程进度</view>
      <view class="catelog-container">
        <view @click="playOneVideo(index)"  v-for="(item,index) in course_detail.videos" :key="item.id" class="course-item">
          <text :class="{'active' : index === playIndex}">{{index+1}}.{{item.name}}</text>
          <text v-if="item.is_study == 1" class="studied">已学习</text>
          <text v-else :class="['time',index === playIndex ? 'active' : '']">{{item.duration}}</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import Vue from 'vue'
import {fetch } from '../../utils/fetch'
import Model from '../../components/Modal'
import Star from '../../components/Star'

export default Vue.extend({
  components:{
         Model,
         Star
  },
    data(){
        return{
            course_detail:null,
            id:null,
            playUrl:null, // 正在播放视频的Url  
            playIndex:0, // 当前播放索引
            isValideRight:false, // 是否校验过播放权限
            isShowModel:false, // 是否显示评论框
            content:'',//评价内容
            scoress:5 // 评价分数
        }

    },
    // 计算属性
    computed: {
       level(){
           if(!this.course_detail) return null
            switch (this.course_detail.course.level) {
            case 1:{
                return '初级';
                 break;
            }
            case 2:{
                return '中级';
                 break;
            }
                
            case 3:{
                return '高级';
                 break;
            }
                
        
            default:
                return '超级'
                break;
        }
       }
    },
 onLoad(options){
  this.id=options.id
    this.getCourseDetailData()
 },

 methods:{
       async getCourseDetailData(){
           const res = await fetch({
               url:`course/play/${this.id}`
           })
           if(res.data.status===0){
            //    console.log(res.data.message)
               this.course_detail=res.data.message
               this.playUrl=res.data.message.videos[0].video_url
           }
       },
      //  点击遮罩层关闭评价框
       closeModel(){
         this.isShowModel = false
       },
      //  评价
     async evaluate(){
          const res = await fetch({
            url:"study/complete",
            data:{
              course_id:this.id
            }
          })
          // console.log(res)
          if(res.data.status===0){
            if(!res.data.complete){
              uni.showModal({
                title: '提示',
                content: '请不要妄下断论，OUT',
                showCancel:false,
               confirmColor:'#00ff00',
              });
              return;
            }
          // 打开评论框
            this.isShowModel=true
          }
    },
      //  提交评价
     async postComment(){
        if(this.content.trim().length===0){
          uni.showToast({
            title: '评价内容不能为空',
            duration: 2000,
            icon:'none'
          });
          return;
        }
        const res = await fetch({
          url:'comment/create',
          method:'POST',
          data:{
            course_id:this.id,
            content:this.content,
            score:this.scoress
          }
        })
        // console.log(res)
        if(res.data.status===0){
          uni.showToast({
            title: res.data.message,
            icon:'success',
            duration: 2000
          });
          this.content=''
          this.scoress =5
          this.closeModel()
        }
      },
      //    @play 	当开始/继续播放时触发play事件
       videoPlay(){
         if(!this.isValideRight){
           this.playOneVideo(0)
         }
       },
    //    点击播放
   async playOneVideo(index){
    //    切换到选中的指引
        this.playIndex=index
        // 停止播放
        uni.createVideoContext('videoId').pause()
           const isCanPlay = await this.validatePlay() // 返回值为true--已购买或false--没有购买
          //  console.log('isCanPlay----',isCanPlay)
           if(!isCanPlay){ // 返回false没有购买              
                 uni.showModal({
                       title: '提示',
                       content: '您还没有购买 \n 请先购买后-再来播放哦~',
                       confirmText:'去购买',
                       confirmColor:'#00ff00',
                       success: res=> {
                           if (res.confirm) {
                              //  console.log('用户点击确定');
                               uni.navigateTo({
                                    url: `/pages/pay/index?id=${this.id}&title=${this.course_detail.course.title}&price=${this.course_detail.course.price}&cover_image_url=${this.course_detail.course.cover_image_url}`
                               });
                           } 
                       }
                });
               return
           }
          //  保存视频id
          const videoID = this.course_detail.videos[index]
        //    有权限 点击播放
            this.playUrl=this.course_detail.videos[index].video_url
            setTimeout(()=>{
              uni.createVideoContext('videoId').play()
            },2000)

            // 发请求到后台记录已播放
            const res = await fetch({
              url:'study/video',
              method:"POST",
              data:{
                course_id:this.id,
                video_id:videoID.id              
              }
            })
            // console.log(res)
            if(res.data.status===0){
              videoID.is_study = 1
            }

    },
    //  发请求 查看课程是否购买
    async validatePlay(){
          const res =  await fetch({
                url:'order/info',
                data:{
                    course_id:this.id
                }
            })
            if(res.data.status===0){
               if(res.data.message.pay_status===0){
                  return Promise.resolve(false) // 没有购买
              }else{
                this.isValideRight = true // 才会走play校验 当开始/继续播放时触发play事件
                  return Promise.resolve(true)
              }
            }else{
                  return Promise.resolve(false)
            }
    }
 }
})
</script>

<style lang="less" scoped>
.play-container {
  background-color: #efefef;
  position: relative;
  .cover_image {
    width: 750rpx;
    height: 434rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 750rpx;
      height: 434rpx;
    }
    video {
      width: 750rpx;
      height: 434rpx;
    }
  }
  .introduction {
    z-index: 3;
    position: absolute;
    margin-top: -10rpx;
    border-radius: 16px 16px 0px 0px;
    border-bottom: 1px solid #f5f5f5;
    left: 0;
    right: 0;
    height: 192rpx;
    background-color: #ffffff;
    padding: 38rpx 32rpx;
    display: flex;
    align-items: center;
    .title-and-info {
      flex: 1;
      .title {
        color: #343434;
        font-size: 24px;
        font-weight: bold;
      }
      .info {
        margin-top: 12rpx;
        height: 34rpx;
        line-height: 34rpx;
        color: #818181;
        font-size: 12px;
        display: block;
        text {
          padding-right: 15rpx;
        }
        text:nth-child(2),
        text:nth-child(3) {
          padding-left: 15rpx;
        }
        text:nth-child(2) {
          position: relative;
          &::before {
            position: absolute;
            content: '';
            background-color: #ebebeb;
            left: 0rpx;
            width: 1px;
            top: 8rpx;
            height: 20rpx;
          }
          &::after {
            position: absolute;
            content: '';
            background-color: #ebebeb;
            right: 0rpx;
            width: 1px;
            top: 8rpx;
            height: 20rpx;
          }
        }
      }
    }
    .comment {
      margin-top: 32rpx;
      image {
        width: 198rpx;
        height: 80rpx;
      }
    }
  }
  .course-progress {
    margin-top: 222rpx;
    padding: 44rpx 32rpx;
    background-color: #fff;
    .title {
      color: #343434;
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: 800;
    }
    .catelog-container {
      .course-item {
        display: flex;
        justify-content: space-between;
      }
      text {
        color: #636363;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
      }
      .studied {
        float: right;
        margin-top: 16rpx;
        font-size: 10px;
        text-align: center;
        color: #aaaaaa;
        background-color: #f5f5f5;
        border-radius: 12rpx;
        width: 98rpx;
        height: 48rpx;
        line-height: 48rpx;
      }
      .time {
        float: right;
      }
      .active {
        color: #ff5e00;
      }
    }
  }
}
.comment-content {
  label {
    width: 100rpx;
  }
  textarea {
   
    width: 100%;
    height: 200rpx;
  }
}
</style>