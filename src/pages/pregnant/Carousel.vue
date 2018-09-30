<template>     
   	<el-carousel :interval="2000" type="card" height="500px">
	    <el-carousel-item>
        <img src="../../assets/img/babyphoto/1.jpg" alt="宝宝照片" />        
	    </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/babyphoto/2.jpg" alt="宝宝照片" />        
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/babyphoto/3.jpg" alt="宝宝照片" />        
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/babyphoto/4.jpg" alt="宝宝照片" />        
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/babyphoto/5.jpg" alt="宝宝照片" />        
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/img/babyphoto/6.jpg" alt="宝宝照片" />        
      </el-carousel-item>
  	</el-carousel>
</template>
<!-- 2、行为：处理逻辑 -->
<script>


export default {
  name: 'carousel',
  data(){
    return{

    }
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
  .el-carousel{
   
   }
  .el-carousel__item img {
    display:block;    
    height: 100%;
    width: 100%;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    
  }
</style>