<template>
  <view class="home-container">
        <search-bar tips="搜索课程"/>
	  <!-- 轮播图 -->
	<swiper autoplay circular indicator-active-color="#r0r0r9" :interval="3000" indicator-dots='true'>
		<!--  声明式导航 navigator -->
		<navigator :url="'/pages/course-detail/index?id='+item.course_id" v-for="item in swipers" :key="item.id">
			<swiper-item> 
				<image :src="item.img_url"></image>
			</swiper-item>
		</navigator>
	</swiper>

	<!-- 推荐课程 -->
	<view>
		<view class="tips">
			<text class="tip">推荐课程</text>
			<image @click="goToCoursePage" src="/static/images/arrow@2x.png" alt="" />
		</view>
		<scroll-view scroll-x class="course-container">
			<navigator :url="'/pages/course-detail/index?id='+item.relation_id" class="course-item" v-for="item in course" :key="item.id">
				<image :src="item.icon" alt="" />
			</navigator>
		</scroll-view>
	</view>

	<!-- 热门视频 -->
	<view>
		<view class="tips">
			<text class="tip">热门视频</text>
			<image @click="goToCourseDetail(3)"  src="/static/images/arrow@2x.png" alt="" />
		</view>
		<view class="hot-video">
			<navigator :url="'/pages/course-detail/index?id='+item.course_id" class="video-item" v-for="item in videos" :key="item.id">
				<image :src="item.cover_photo_url" alt="" />
				<text class="title">{{item.name}}</text>
				<text class="subtitle">{{item.view_count}}人已观看</text>
			</navigator>
		</view>
	</view>
  </view>
</template>

<script lang="ts">
import SearchBar from '../../components/SearchBar.vue'
import { fetch } from '../../utils/fetch'
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
	  swipers:[], // 轮播图数据
	  course:[],  //课程
	  videos:[] // 视频
    };
  },
  components:{
	  SearchBar
  },
  onLoad() {
	  this.getSwipersData()

	  this.getCourseData()

	  this.getVideosData()
  },
  methods: {
	  async getSwipersData(){
		  const swipers = await fetch({
			  url:'home/swipers',
			  data:{

			  },
			  isNeedAuth:true
		  })
		//   console.log(swipers)
		  if(swipers.data.status===0){
			this.swipers =  swipers.data.message
		  }
	  },
	  async getCourseData(){
		  const course = await fetch({
			  url:'home/course',
			  data:{

			  },
			  isNeedAuth:true
		  })
		//   console.log(course)
		  if(course.data.status===0){
			this.course =  course.data.message
		  }
	  },
	  async getVideosData(){
		  const videos = await fetch({
			  url:'home/video',
			  data:{

			  },
			  isNeedAuth:true
		  })
		//   console.log(videos)
		  if(videos.data.status===0){
			this.videos =  videos.data.message
		  }
	  },
	//   编程式导航
	  goToCoursePage(){
		//   跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
         uni.switchTab({
			 url:'/pages/course/course'  // 课程页面
		 })
	  },
	  goToCourseDetail(id){
		//   保留当前页面，跳转到应用内的某个页面，可以返回到原页面。
         uni.navigateTo({
			 url:`/pages/course-detail/index?id=${id}`
		 })
	  }
  }
});
</script>

<style lang="less" scoped>
.home-container {
  padding: 20rpx;
  background-color: #fff;
}

swiper {
  width: 100%;
  height: 342rpx;
}

swiper-item {
  width: 100%;
  height: 100%;
}

swiper-item image {
  width: 100%;
  height: 100%;
}

.tips {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tips .tip {
  font-size: 36rpx;
  font-weight: 700;
  color: #212121;
}

.tips image {
  width: 48rpx;
  height: 48rpx;
}

.course-container {
  height: 170rpx;
  white-space: nowrap;
}

.course-item {
  width: 296rpx;
  height: 168rpx;
  display: inline-block;
  margin-right: 32rpx;
}

.course-item image {
  width: 100%;
  height: 100%;
}

.hot-video {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.hot-video .video-item {
  width: 340prx;
  display: flex;
  flex-direction: column;
}

.video-item image {
  width: 340rpx;
  height: 210rpx;
  border-radius: 12rpx;
}

.video-item .title {
  margin-top: 15rpx;
  color: #262626;
  font-size: 26rpx;
}

.video-item .subtitle {
  margin-top: 15rpx;
  margin-bottom: 15rpx;
  color: red;
  font-size: 18rpx;
}
</style>
