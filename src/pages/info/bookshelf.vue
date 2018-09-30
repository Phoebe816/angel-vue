<template>
  <el-main v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">   
    <el-row class="search-edit" >
      <el-col :span="12"> 
	  	<el-button icon="el-icon-search" type="success" plain round>搜索书籍</el-button>
	  </el-col>
      <el-col :span="12">
      	<router-link :to="'/read/submitSR'">
	  		<el-button icon="el-icon-edit" type="success" plain round>加入书架</el-button> 
	  	</router-link>
	  </el-col>
	</el-row>
	<el-row type="flex" class="bookshell">
	  <el-col :span="21"> 
	  	<h2>我的书架</h2>共<strong>{{ total }}</strong>本书籍
	  </el-col>
      <el-col :span="3">
      	<el-dropdown>
		  <el-button type="primary">
		    更新时间<i class="el-icon-arrow-down el-icon--right"></i>
		  </el-button>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item>更新时间</el-dropdown-item>
		    <el-dropdown-item>阅读时间</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	  </el-col>
	</el-row>
	<el-table
		ref="multipleTable"
	    :data="lovebook"
	    tooltip-effect="dark"
	    @selection-change="handleSelectionChange"
	    style="width: 100%">
	    <el-table-column type="selection" width="55"></el-table-column>
	    <el-table-column prop="title" label="书名" width="180">
	    	<template slot-scope="scope">
	    		<span>{{ scope.row.title }}</span>/<span>{{ scope.row.classify }}</span>
	    	</template>
	    </el-table-column>	
	    <el-table-column prop="newsection" label="最近更新章节" width="180">
	    	<template slot-scope="scope">
	    		<span>{{ scope.row.newsection }}</span>
	    	</template>
	    </el-table-column>
	    <el-table-column prop="author" label="作者" width="180">
	    	<template slot-scope="scope">
	    		<span>{{ scope.row.author }}</span>
	    	</template>
	    </el-table-column>  
	    <el-table-column prop="updatetime" label="更新时间">
	    	<template slot-scope="scope">
	    		<span>{{ scope.row.updatetime }}</span>
	    	</template>
	    </el-table-column>
	    <el-table-column prop="schedule" label="阅读进度">
	    	<template slot-scope="scope">
	    		<span>{{ scope.row.schedule }}</span>
	    	</template>
	    </el-table-column>
	    <el-table-column fixed="right" label="操作" width="100">
	      <template slot-scope="scope">
	        <el-button @click.native.prevent="deleteRow(scope.$index, lovebook)" type="text" size="small">删除</el-button>        
	      </template>
	    </el-table-column>
  	</el-table>
   	<Pagination
	    :curPageIdx="params.pageNum"
	    :limit="params.pageSize"
	    :count="total"
	    @changePage="setParams">
  	</Pagination>   
  </el-main>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import {getServerListApi} from '@/apis'
import {mapGetters} from 'vuex'
import Pagination from '@/components/Pagination'
export default {
  data(){
  	return {
  		multipleSelection: [],  //全选
  		lovebook: [], 
  		loading:true,
  		total:0, 		
  		params: {
	        pageNum: 1,
	        pageSize: 10
      	}
  	}
  },
  computed: {
  	...mapGetters(['userInfo'])
  },
  components:{
    Pagination
  }, 
  methods: {
  	setParams(type, val){      	 
      if(type === 'curPageId'){
        this.params.pageNum = val;
      }else{
        this.params.pageNum = 1;
        this.params.pageSize = val;
      }
        this.fetchData();              
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);
        this.total = rows.length;
    },
    fetchData(){
      getServerListApi(this.params).then((response) => {
        if(response.status == 200){          
          this.lovebook = response.data.list;
          this.total = response.data.list.length;
          this.loading = false;
        }
      })
    },
    queryList(){
      this.fetchData()
    }
  },
  mounted(){
    // this.params.status = this.$route.params.type
    this.fetchData()
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
.bookshell{
	background $--background-color-base
	padding 15px
	height 45px
	align-item center
	font-size 14px
	color $--color-text-regular
	border-bottom 1px solid $--color-border-1
	h2{
		display: inline-block;
		line-height: 1px;
		margin-right 10px
		font-weight 600
		color $--color-text-primary
		margin-top -50%
	}
	button{
		margin-top -50%
	}
}
</style>