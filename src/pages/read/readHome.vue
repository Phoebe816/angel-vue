<!-- 1、模板 -->
<template>
  <el-main style="margin-top:35px">   
     <el-container>
      <el-aside width="206px">
        <dl>
          <dd v-for="(item, index) of navlist" :key="navlist.index">
            <a href=item.pathTo target="_blank"> 
              <cite>
                <em :class=iconclass[index]></em>
                <span class="info">
                  <i>{{ item.navtitle }}</i>
                  <b>{{ item.contlength }}</b>
                </span>
              </cite>
            </a>
          </dd>
        </dl>
      </el-aside>
      <el-main style="padding: 0 30px;">
        <card></card>
      </el-main>
    </el-container> 
   
  </el-main>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import Card from './Card'
// import BookMenu from './BookMenu'

export default {
  name: 'read',
  data(){
  	return {
  	  isCollapse:false,
      iconclass:["el-icon-location","el-icon-location","el-icon-location","el-icon-location","el-icon-location"],
  		navlist:[
        { pathTo:"1", navtitle:"玄幻", contlength:111},
        { pathTo:"2", navtitle:"奇幻", contlength:111},
        { pathTo:"3", navtitle:"武侠", contlength:111},
        { pathTo:"4", navtitle:"仙侠", contlength:111},
        { pathTo:"5", navtitle:"都市", contlength:111},
        { pathTo:"6", navtitle:"现实", contlength:111},
        { pathTo:"7", navtitle:"军事", contlength:111},
        { pathTo:"8", navtitle:"历史", contlength:222},
        { pathTo:"9", navtitle:"科幻", contlength:222},
        { pathTo:"10", navtitle:"灵异", contlength:222},
        { pathTo:"11", navtitle:"耽美", contlength:222},
        { pathTo:"12", navtitle:"二次元", contlength:222}
      ]
  	
  	}
  },
  components:{
    "card":Card,
    // "bookmenu":BookMenu
  },
  methods:{
   
  }
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.el-aside{
  background #F0FFFF
  dl dd{
    width: 50%;
    height: 60px;
    float: left;
    a{
      display: block;
      color: #333;
      &:hover{
        color: #f00;
        b{
          color: #f00;
        }
      }
      cite{
        position: relative;
        display: block;
        overflow: hidden;
        width: 85px;
        height: 43px;
        padding-top: 17px;
        padding-left: 17px;
        em{
          float: left;
          width: 24px;
          height: 24px;
          margin: 2px 8px 0 0;
        }
        span{
          float: left;
          max-width: 42px;
          i{
              font: 14px/1 PingFangSC-Regular,'-apple-system',Simsun;
              white-space: nowrap;
          }
          b{
              font: 12px/1.5 Arial;
              color: #999;
          }
        }
      }
    }
  }
}


</style>