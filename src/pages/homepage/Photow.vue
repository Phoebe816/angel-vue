<!-- 1、模板 -->
<template>     
<el-row style="margin:20px 0;">
  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/img/babyphoto/1.jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>
<!-- 2、行为：处理逻辑 -->
<script>

export default {
  name: 'photowall',
  data(){
    return{
      photo:[
        {address: require("../../assets/img/babyphoto/1.jpg"), altname:"宝宝照片"},
        {address: require("../../assets/img/babyphoto/2.jpg"), altname:"宝宝照片"},
        {address: require("../../assets/img/babyphoto/3.jpg"), altname:"宝宝照片"},
        {address: require("../../assets/img/babyphoto/4.jpg"), altname:"宝宝照片"},
        {address: require("../../assets/img/babyphoto/5.jpg"), altname:"宝宝照片"},
        {address: require("../../assets/img/babyphoto/6.jpg"), altname:"宝宝照片"}
      ],
      currentDate: new Date()
    }
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped>

</style>