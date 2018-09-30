<template>     
<el-row style="margin:20px 0;">
  <el-col :span="4" v-for="(item, index) in photo" :key="index">
    <el-card :body-style="{ padding: '0px' }" shadow="always">
      <img :src=item.address class="image" :alt=item.altname>
      <div style="padding: 14px;">
        <span>{{ item.altname }}</span>
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
  name: 'card',
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
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>