<template>
  <view class="weui-search-bar__box">
    <icon class="weui-icon-search_in-box" type="search" color="#ff8d44" size="14"></icon>
    <view class="weui-search-bar__input" @click="gotosearch">
      <text>{{tips}}</text>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
//   子组件接收参数 props
  props: {
    tips: {
      type: String,
      default: "请输入搜索关键字" // 不传默认
    }
  },
  methods:{
      gotosearch(){
          uni.navigateTo({
              url:'/pages/search/search'
          })
      }
  }
});
</script>

<<style lang="less" scoped>
@weuiSearchBarHeight: 28px;
.weui-icon-search_in-box {
  position: absolute;
  left: 8px;
  top: 7px;
}
.weui-search-bar__box {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  margin-bottom: 8px;
}
.weui-search-bar__input {
  height: @weuiSearchBarHeight;
  line-height: @weuiSearchBarHeight;
  font-size: 14px;
  color: #999;
}
</style>