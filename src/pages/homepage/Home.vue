<!-- 1、模板 -->
<template>
  <el-main style="margin-top:40px">    
    <el-container>
      <el-aside width="150px">
        <homemenu></homemenu>
      </el-aside>
      <el-main style="padding: 0 50px;">
        
      </el-main>
    </el-container> 
    <photowall></photowall>
    <el-container>
    </el-container>
  </el-main>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import Homemenu from './Homemenu'
import Photowall from './Photowall'

export default {
  name: 'home',
  data(){
    return {
        
      }
    },
  components:{
    "homemenu":Homemenu,
    "photowall":Photowall
   
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.el-main{
  padding 20px 50px;
}
</style>

