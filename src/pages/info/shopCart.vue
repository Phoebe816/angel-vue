<!-- 1、模板 -->
<template>
  <el-main v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">   
    <el-row class="search-edit">
      <el-col :span="12">
      	<router-link :to="'/read'">
	  		<span class="cart">购物车</span> 
	  	</router-link>
	  </el-col>
      <el-col :span="12"> 
	  	<div>
		  <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input5" class="input-with-select">
		    <el-select v-model="select" slot="prepend" placeholder="宝贝">
		      <el-option label="宝贝" value="1"></el-option>
		      <el-option label="店铺" value="2"></el-option>
		    </el-select>
		    <el-button slot="append">搜索</el-button>
		  </el-input>
		</div>
	  </el-col>
      
	</el-row>   
    
  
   
  </el-main>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import {getServerListApi} from '@/apis'
import {mapGetters} from 'vuex'


export default {
  name: 'shopCart',
  data(){
  	return{
  		loading:false,
  		input5: '',
      	select: ''
  	}
  }
 /* mounted: function() {
    document.getElementsByTagName("html")[0].className="gwh_gamegb"; 
  }*/
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
  .cart {
	font-size: 20px;
	color: $--color-black;
  }
 .el-select /deep/ .el-input {
    width: 100px;
  }
  
  .el-input--prefix /deep/ .el-input__inner{
  	
  	
  }
  .input-with-select /deep/ .el-input-group__prepend {
    
  }
</style>