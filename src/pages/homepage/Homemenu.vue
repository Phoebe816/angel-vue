<template>     
   <el-col :span="24">    
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" 
      text-color="#666"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      @select="handleSelect" v-for="(item, index) of navlist" :key="index">      
      <el-submenu :index="item.index" >
       <template slot="title">{{ item.navtitle }}</template>
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
  name: 'homemenu',
  data(){
    return{
      activeIndex: '1',
      isCollapse: true,
      navlist:[
        { index:"1", navtitle:"孕期百科", classify:[
            {name:"孕期食谱", index2:"1-1"},
            {name:"胎教", index2:"1-2"},
            {name:"孕妇操", index2:"1-3"},
            {name:"待产包", index2:"1-4"},
            {name:"孕周知识", index2:"1-5"}
          ]},
        { index:"2", navtitle:"育儿百科", classify:[
            {name:"早教", index2:"2-1"},
            {name:"奶粉", index2:"2-2"},
            {name:"辅食", index2:"2-3"},
            {name:"儿歌", index2:"2-4"},
            {name:"玩具", index2:"2-5"}
          ]},
        { index:"3", navtitle:"工作中心", classify:[
            {name:"IT", index2:"3-1"},
            {name:"会计", index2:"3-2"},
            {name:"销售", index2:"3-3"}         
          ]},
        { index:"4", navtitle:"教育中心", classify:[
            {name:"早教", index2:"4-1"},
            {name:"语文", index2:"4-2"},
            {name:"英语", index2:"4-3"},
            {name:"数学", index2:"4-4"},
            {name:"理科综合", index2:"4-5"},
            {name:"文科综合", index2:"4-5"}
          ]},
        { index:"5", navtitle:"新闻中心", classify:[
            {name:"国家大事", index2:"5-1"},
            {name:"国际新闻", index2:"5-2"},
            {name:"英语", index2:"5-3"},
            {name:"数学", index2:"5-4"},
           
          ]},
        { index:"6", navtitle:"购物中心", classify:[
            {name:"服装", index2:"6-1"},
            {name:"食品", index2:"6-2"},
            {name:"婴儿辅食", index2:"6-3"},
            {name:"日用百货", index2:"6-4"},
           
          ]},
        { index:"7", navtitle:"跳蚤市场", classify:[
            {name:"服装", index2:"7-1"},
            {name:"书籍", index2:"7-2"},
            {name:"儿童玩具", index2:"7-3"},
            {name:"日用百货", index2:"7-4"},
           
          ]},
        { index:"amusement", navtitle:"音乐/视频", classify:[
            {name:"天使专辑", index2:"amusement"},
            {name:"宝宝视频", index2:"amusement"},
            {name:"电影频道", index2:"amusement"},
            {name:"电视剧", index2:"amusement"},
            {name:"综艺节目", index2:"amusement"},
           
          ]},
        { index:"10", navtitle:"游戏天地", classify:[
            {name:"益智游戏", index2:"10-1"},
            {name:"棋牌游戏", index2:"10-2"},
            {name:"网页小游戏", index2:"10-3"},
           
          ]},
        { index:"9", navtitle:"天使阅读", classify:[
            {name:"玄幻", index2:"9-1"},
            {name:"科幻", index2:"9-2"},
            {name:"仙侠", index2:"9-3"},
            {name:"都市", index2:"9-4"},
            {name:"历史", index2:"9-5"}
          ]},
        { index:"11", navtitle:"常用网址", new:true, classify:[
            {name:"淘宝网", index2:"https://www.taobao.com/"},
            {name:"智联招聘", index2:"https://www.zhaopin.com/"},
            {name:"百度一下", index2:"https://www.baidu.com/"},
            {name:"起点中文网", index2:"https://www.qidian.com/"},
            {name:"博客园", index2:"https://www.cnblogs.com/"}
          ]}
      ]
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        
      }
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
    width: 80%; 
  }
  .el-menu-item, .el-submenu /deep/ .el-submenu__title{
    height 48px
    line-height 48px    
  }
  
  .el-submenu /deep/ .el-submenu__icon-arrow{
    display block!important
  }  


</style>