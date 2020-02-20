<template>
  <view>
    <course-list :courses="courses"/>
  </view>
</template>

<script lang="ts">
import CourseList from '../../components/CourseList.vue'
import Vue from 'vue'
import { fetch } from '../../utils/fetch'
export default Vue.extend({
  components:{
   CourseList
  },
  data(){
      return{
         courses:[]
      }
  },
 async onLoad(){
    const result = await fetch({
       url:'course/list',
       data:{

       }
    })
    // console.log(result)
    if(result.data.status === 0){
        this.courses = result.data.message
    }
  }
}) 
</script>

<style>

</style>