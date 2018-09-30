<template>     
   <el-col :span="24" style="overflow: hidden;">    
    <dl>
      <dd v-for="(item, index) of navlist" :key="navlist.index" >
        <a href=item.pathTo target="_blank"> 
          <cite>
            <em class="iconfont">{{ iconclass[index] }}</em>
            <span class="info">
              <i>{{ item.navtitle }}</i>
              <b>{{ item.contlength }}</b>
            </span>
          </cite>
        </a>
      </dd>
    </dl>
  </el-col>
</template>
<!-- 2、行为：处理逻辑 -->
<script>


export default {
  name: 'asidemenu',
  data(){
    return{
     
    }
  },
  props:{
    navlist:{
      type:Array
    },
    iconclass:{
      type:Array
    } 
  },
  methods: {
      
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
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