<template>     
   <el-col :span="24" style="overflow-x: hidden;">    
    <el-menu :default-active="item.index" class="el-menu-demo" 
      text-color="#666"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      @select="handleSelect" v-for="(item, index) of navlist" :key="index">      
      <el-submenu :index="item.index" >
       <template slot="title">
          <i :class="iconclass[index]"></i>
          <span slot="title">{{ item.navtitle }}</span>
       </template>
       <el-menu-item v-for="(itemChild, index) in item.classify" :key="index" :index="'/'" v-if="item.new" target="_blank">       
        <a :href=itemChild.index2 target="_blank">{{ itemChild.name}}</a>          
       </el-menu-item>
       <el-menu-item v-for="(itemChild, index) in item.classify" :key="index" :index="itemChild.index2" v-if="!item.new">
          {{ itemChild.name}}
       </el-menu-item>
     </el-submenu>      
    </el-menu>    
  </el-col>
</template>
<!-- 2、行为：处理逻辑 -->
<script>


export default {
  name: 'asidemenu',
  data(){
    return{
      activeIndex: '1'
    }
  },
  props:{
    isCollapse:{
      type:Boolean
    },
    navlist:{
      type:Array
    },
    iconclass:{
      type:Array
    } 
  },
  methods: {
      handleSelect(key, keyPath) {
        // this.$emit("handleSelect",key, keyPath)
      }
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../assets/css/index.styl'
  .el-menu{
    background $--background-color-nav
   }
  .el-menu--collapse {
    width: 90%; 
  }
  .el-menu-item, .el-submenu /deep/ .el-submenu__title{
    height 48px
    line-height 48px    
  }
  
  .el-submenu /deep/ .el-submenu__icon-arrow{
    display block!important
  }  

</style>