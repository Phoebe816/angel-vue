<!-- 1、模板 -->
<template>
  <el-main style="margin-top:40px">   
    <el-container>
      <el-aside width="150px">
        <asidemenu :iconclass="iconclass" 
        :isCollapse="isCollapse" 
        :navlist="navlist" 
        @handleSelect="handleSelect">
        </asidemenu>
      </el-aside>
      <el-main style="padding: 0 50px;">
        <carousel></carousel>
      </el-main>
    </el-container>      
  </el-main>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import Carousel from './Carousel'
import AsideMenu from '@/components/AsideMenu'

export default {
  name: 'pregnant',
  data(){
  	return {
  	  isCollapse:false,
      iconclass:["el-icon-location","el-icon-location","el-icon-location","el-icon-location","el-icon-location"],
  		navlist:[
        { index:"1", navtitle:"待产包", classify:[
            {name:"玄幻", index2:"1-1"},
            {name:"奇幻", index2:"1-2"}
          ]},
        { index:"2", navtitle:"孕周", classify:[
            {name:"武侠", index2:"2-1"},
            {name:"仙侠", index2:"2-2"}
          ]},
        { index:"3", navtitle:"奶粉", classify:[
            {name:"IT", index2:"3-1"},
            {name:"会计", index2:"3-2"},
            {name:"销售", index2:"3-3"}         
          ]},
        { index:"4", navtitle:"辅食", classify:[
            {name:"早教", index2:"4-1"},
            {name:"语文", index2:"4-2"},
            {name:"英语", index2:"4-3"}            
          ]}
      ]
  	
  	}
  },
  components:{
    "carousel":Carousel,
    "asidemenu":AsideMenu   
  },
  methods:{
    handleSelect(key, keyPath) {
        
    }
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped>

</style>