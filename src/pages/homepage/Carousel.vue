<!-- 1、模板 -->
<template>     
  <el-carousel height="100%">
      <el-carousel-item v-for="(item, index) in photo" :key="index">
        <img :src="item.address" :alt="item.altname" />  
      </el-carousel-item>
  </el-carousel>
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
      ]
    }
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped>
 .el-carousel{
    height: 100%;
 }
  .el-carousel__item img {
    display:block;    
    height: 100%;
    width: 100%;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    
  }
</style>