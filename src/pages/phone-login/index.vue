<template>
  <view class="phone-login-container">
    <text class="phone-validate">手机号验证</text>
    <text class="subtitle">用于即使获取课程最新信息</text>
    <view class="content">
      <input class="phone" v-model="phone" placeholder="请输入您的手机号" type="number" />
      <view
        @click="getVcode"
        class="get_vcode"
        :style="{color:isCountDown?'#00ff00':'#000000'}"
      >{{tips}}</view>
      <input class="vcode" v-model="vcode" placeholder="请输入验证码" type="number" />
    </view>
    <view class="phone-login">
      <image @click="phoneLogin" src="/static/images/phone_login@2x.png" alt />
    </view>
  </view>
</template>

<script lang="ts">
import {fetch} from '../../utils/fetch'
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      phone: "17704051019",
      vcode: "",
      tips: "获取验证码...",
      timer: 0, // 定义一个定时器
      conut: 5, // 倒计时秒数
      isCountDown: false // 是否倒计时
    };
  },
  methods: {
      // 获取验证码
    async getVcode() {
      //  1.非空正则校验
      if (this.phone.trim().length === 0) {
        uni.showToast({
          title: "手机号不能为空",
          duration: 2000,
          icon: "none"
        });
        return;
      }
      const num = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!num.test(this.phone)) {
        uni.showToast({
          title: "手机号不合法",
          duration: 2000,
          icon: "none"
        });
        return
      }

      // 2.倒计时
    //   如果正在执行倒计时不执行以下代码
    if(this.isCountDown) return // 第一次是false所以往下走，第二次变成true直接return

     this.isCountDown = true 
     this.tips = `${this.conut}`

     this.timer = setInterval(()=>{
         if(this.conut<=1){
             this.isCountDown = false
             this.conut = 5
             this.tips = '获取验证码'
             clearInterval(this.timer)
             return
         }
        
        this.conut--
        this.tips = `${this.conut}`
     },1000)
    
      // 3.发请求
      const result = await fetch({
          url:'user/vcode',
          isNeedAuth:false,
          data:{
              phone:this.phone
          }
      })
    //   console.log(result)
      if(result.data.status===0){
          uni.showToast({
              title:`${result.data.vcode}`,
              icon:'none',
              duration:3000
          })
      }
      
    },
      // 点击登录
    async phoneLogin(){
        const  result = await fetch({
            url:'user/login',
            data:{
                phone:this.phone,
                vcode:this.vcode
            },
            tips:'玩命加载中...',
            method:'POST',
            isNeedAuth:false

        })
        console.log(result)
        if(result.data.status===0){
            uni.setStorageSync('my__token',result.data.token) // 保存token
            uni.showToast({
                 title:`${result.data.message}`,
                icon:'none',
                duration:2000
            })
            uni.reLaunch({ //关闭所有页面--跳到指定页面
                url:'/pages/home/home'
            })
        }else{
             uni.showToast({
                 title:`${result.data.message}`,
                icon:'none',
                duration:2000
            })
        }
    }
    
  }
});
</script>

<style lang="less" scoped>
.phone-login-container {
  padding: 20rpx 68rpx;
}

.phone-login-container .phone-validate {
  margin-top: 150rpx;
  color: #393939;
  font-size: 40px;
}

.phone-login-container .subtitle {
  margin-top: 30rpx;
  color: #a8a8a8;
  font-size: 30rpx;
  display: inline-block;
}

.phone-login-container .content {
  margin-top: 150rpx;
  height: 250rpx;
  position: relative;
}

.phone-login-container .content .phone {
  height: 100rpx;
  font-size: 15px;
  position: relative;
}

.phone-login-container .content .get_vcode {
  position: absolute;
  right: 0;
  top: 20rpx;
  width: 164rpx;
  height: 56rpx;
  text-align: center;
  line-height: 56rpx;
  font-size: 24rpx;
  color: #a8a8a8;
  border: 1px solid rgba(168, 168, 168, 1);
  border-radius: 20px;
  z-index: 2;
}

.phone-login-container .content .vcode {
  margin-top: 30px;
  height: 100rpx;
  font-size: 15px;
  position: relative;
}

.phone-login-container .content .vcode::after {
  content: "";
  position: absolute;
  background-color: #e9e9e9;
  left: 0;
  right: 0;
  height: 1px;
  bottom: 1px;
}

.phone-login-container .content .phone::after {
  content: "";
  position: absolute;
  background-color: #e9e9e9;
  left: 0;
  right: 0;
  height: 1px;
  bottom: 1px;
}

.phone-login-container .phone-login {
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-login-container .phone-login image {
  width: 568rpx;
  height: 98rpx;
}
</style>