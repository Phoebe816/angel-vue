<!-- 1、模板 -->
<template>
  <el-main v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">   
    <el-row class="search-edit" >
      <el-col :span="12"> 
	  	<el-button icon="el-icon-search" type="success" plain round>知识库搜索答案</el-button>
	  </el-col>
      <el-col :span="12">
      	<router-link :to="'/read/submitSR'">
	  		<el-button icon="el-icon-edit" type="success" plain round>提交SR</el-button> 
	  	</router-link>
	  </el-col>
	</el-row>
  </el-main>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import {getServerListApi} from '@/apis'
import {mapGetters} from 'vuex'
export default {
  data(){
  	return {
  	
  		loading:false,
  	
  	}
  },
  computed: {
  	...mapGetters(['userInfo'])
  },
  methods: {
  	
   
  },
  mounted(){
    // this.params.status = this.$route.params.type
   
  }
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.search-edit{	
	text-align center
    padding 30px
}

</style>