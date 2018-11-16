<!-- 1、模板 -->
<template>
  <el-container :class="['app uf-col']">    
    <template v-if="$route.meta.fullScreen">
      <router-view></router-view>
    </template>
    <template v-else-if="$route.meta.homePages">
      <Nav></Nav>
      <router-view style="margin-top:40px"></router-view>
      <Footer></Footer>
    </template>  
    <template v-else-if="$route.meta.webapp">
      <webappHeader></webappHeader>
      <!-- <Nav></Nav> -->
      <router-view style="margin-top:65px"></router-view>
      <Footer></Footer>
    </template>  
    <!-- 下面展示登录之后的内容   v-else-if="$route.fullPath != '/'"解决主页一闪而过的现象-->
    <template v-else-if="$route.meta.info">   
      <Header></Header>
      <el-container>
        <Menu></Menu>
        <router-view :key="activeQuery"></router-view>
      </el-container>
    </template> 
    <template v-else-if="$route.meta.amusement">   
      <Nav></Nav>
      <el-container>
        <Menu></Menu>
        <router-view :key="activeQuery"></router-view>
      </el-container>
    </template> 
  </el-container>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import Nav from '@/components/Topnav'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import webappHeader from '@/components/dyPropaganda/webappHeader'
import Footer from '@/components/dyPropaganda/Footer'

export default {
  name: 'App',
  components: {
    Nav,
    Header,
    Menu,
    webappHeader,
    Footer
  },
  computed:{
    activeQuery(){
      return this.$route.query + new Date()
    }
  }
}
</script>
<!-- 3、样式：解决样式 -->
<style lang="stylus" rel="stylesheet/stylus">
.app {
  position relative
  width 100%
  height 100%
  flex-direction: column
}
html,body{
  margin:0
  padding:0
  height:100%
}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.el-tooltip__popper.is-light.tooltipStyle{
  border 1px solid #eee
  width 80px
  word-break break-all
}
.el-tooltip__popper.is-light.tips{
  border 1px solid #eee
}
.el-tooltip__popper.is-light.tips .popper__arrow{
  border-color #ddd transparent
}
.el-tooltip__popper.is-light.tooltipStyle .popper__arrow{
  border-color transparent #ddd
}

.el-popover.el-popper.messagePopper{
  margin 0px
  padding 0px
  border 1px solid #ddd
  .messageBox{
    font-size 12px
    max-height 336px
    overflow-y auto
    .title{
      text-align center
      padding 10px 15px
      line-height 30px
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
    .message{
      font-size 12px
      padding 10px 15px
      line-height 18px
      border-bottom: 1px solid #ddd;
    }
  }
}
.el-menu--vertical .el-menu--popup{
    min-width 100px
  }
</style>

