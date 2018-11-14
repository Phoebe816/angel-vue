<template>
<el-main>
  <el-container>
      <el-aside width="150px">
        <asidemenu :iconclass="iconclass" 
        :isCollapse="isCollapse" 
        :navlist="navlist">
        </asidemenu>
      </el-aside>
      <el-main style="padding: 0 20px;">
      
      </el-main>
  </el-container>    
  <!-- <timeline style="height: 600px;margin: 20px 0;"></timeline>   -->
</el-main>
</template>
<script>

import AsideMenu from '@/components/AsideMenu'
import Music from './Music.vue'
// import TimeLine from './TimeLine'

export default {
	data() {
      return {
        isCollapse:false,
        iconclass:["el-icon-location","el-icon-location","el-icon-location"],
        navlist:[
          { index:"music", navtitle:"音乐", classify:[
              {name:"胎教音乐", index2:"1-1"},
              {name:"儿歌", index2:"music"},
              {name:"流行歌曲", index2:"music"}
            ]},
          { index:"1", navtitle:"视频", classify:[
              {name:"动画片", index2:"1-1"},
              {name:"宝宝视频", index2:"1-2"}
            ]}, 
          { index:"game", navtitle:"游戏", classify:[
              {name:"益智游戏", index2:"1-1"},
              {name:"网页小游戏", index2:"1-2"}
            ]},
          { index:"tool", navtitle:"工具", classify:[
              {name:"刻度工具", index2:"timetool"},
            ]}
        ]
      };
    },
    components:{
      "asidemenu":AsideMenu,
   		"music": Music,
      // "timeline": TimeLine
    },
    methods: {
      
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'

</style>