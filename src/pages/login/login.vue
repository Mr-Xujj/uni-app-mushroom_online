<template>
  <view class="login-container">
    <image class="logo" src="/static/images/logo@2x.png" alt />
    <text class="title">蘑菇在线</text>
    <image class="login-tips" src="/static/images/login_tips@2x.png" alt />
    <button open-type="getUserInfo" @getuserinfo="wxLogin" plain class="wx-login-button">
      <image class="wx-login-img" src="/static/images/wx_login@2x.png" alt />
    </button>
    <text @click="phoneLogin" class="phone-login">手机号登录</text>
    <text class="bottom-tip">Copyright © 2019 蘑菇在线</text>
  </view>
</template>

<script lang="ts">
import { fetch } from "../../utils/fetch";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  methods: {
    wxLogin(e: any) {
      //   console.log(e.detail);
      //   如果用户拒绝 直接return
      if (e.detail.errMsg === "getUserInfo:fail auth deny") return;

      //   结构赋值语法
      const { avatarUrl: avatar, nickName: nickname } = e.detail.userInfo;

      //  调用uni-app uni.login
      uni.login({
        success: ({ code }) => {
          // console.log(code, avatar,nickname )
          fetch({
            url: "user/wxlogin",
            method: "POST",
            data: {
              code,
              avatar,
              nickname
            },
            tips: "微信登录中..."
          }).then((res: any) => {
            // console.log(res)
            if (res.data.status === 0) {
              uni.showToast({
                title: "登录成功0.0",
                duration: 2000,
                icon: "none"
              });

              //   保存token
              uni.setStorageSync("my__token", res.data.token);

              //  关闭所有页面，打开到应用内的某个页面。
              uni.reLaunch({
                url: "/pages/home/home"
              });
            }
          });
        }
      });
    },
    phoneLogin(){
      uni.navigateTo({
        url:'/pages/phone-login/index'
      })
    }
  }
});
</script>

<style lang='less' scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    margin-top: 180rpx;
    width: 212rpx;
    height: 212rpx;
  }
  .title {
    color: #333333;
    font-size: 24px;
    margin-top: 20rpx;
  }
  .login-tips {
    margin-top: 30rpx;
    height: 34rpx;
    width: 292rpx;
    position: relative;
  }
  .wx-login-button {
    margin-top: 200rpx;
    width: 568rpx;
    height: 98rpx;
    padding: 0;
    border: none;
  }
  .wx-login-img {
    // margin-top:200rpx;
    width: 568rpx;
    height: 98rpx;
  }
  .phone-login {
    margin-top: 40rpx;
    color: #333333;
    font-size: 15px;
  }
  .bottom-tip {
    color: #a8a8a8;
    font-size: 10px;
    position: absolute;
    bottom: 40rpx;
  }
}
.wx-login-container {
  position: relative;
  .wx-login-tip1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 450rpx;
    padding-top: 50rpx;
    image {
      width: 198rpx;
      height: 198rpx;
    }
    p {
      color: #bebebe;
      margin-top: 50rpx;
      font-size: 13px;
    }
  }
  .wx-login-tip1-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 500rpx;
    background: rgba(0, 0, 0, 1);
    opacity: 0.16;
  }
}
</style>