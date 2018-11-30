<!-- 1、模板 -->
<template>
  <el-header class="portal_file_all" style="height: 65px;padding: 0;"> 
    <div class="portal_header_content" >
      <div class="portal_logo">
        <img class="portal_header_img" src="../../assets/propaganda/headerthemeimgstwo/home_logo.png">
      </div>     
      <div class="portal_header_nav" ref="topnavBox"> 
        <ul id="portalTabUl" class="portal_ul_tab">          
          <li 
            v-for="(navtitle, index) of navTitle" 
            :key="navtitle.id"
            :router=navtitle.pathTo
            @click="active=index;">            
            <!-- <span slot="title"> {{ navtitle.name }} </span> -->
            <router-link :to=navtitle.pathTo class="spanborder" :class="{'nav-active':index===active}" > {{ navtitle.name }} </router-link>        
          </li>           
        </ul>
      </div> 
      <div class="portal_header_right">       
        <ul class="portal_header_icon" v-if="userInfo">          
          
          <li>
            <el-dropdown @command="handleCommand" class="header-menu-user" trigger="click">
              <span class="el-dropdown-link cursor-pointer">    
                <img id="portal_userIcon" src="../../assets/propaganda/headerthemeimgstwo/home_user.png" alt="" style="width: 20px;height: 23px;">          
                <span style="margin:0 6px;">{{userInfo.account ? userInfo.account : userInfo.phoneNum}}</span> 
                <i class="el-icon-arrow-down"></i>              
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="'/info'">
                    修改密码
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="'/info'" tag="span">
                    修改头像
                  </router-link>
                </el-dropdown-item> 
                <el-dropdown-item>
                  <router-link :to="'/info'" tag="span">
                    关于
                  </router-link>
                </el-dropdown-item> 
                <el-dropdown-item command="exit" class="cursor-pointer">                
                  退出               
                </el-dropdown-item>      
              </el-dropdown-menu>
            </el-dropdown>
          </li>

          <li>
            <el-popover
              popper-class="messagePopper"
              placement="bottom"
              width="300"
              v-model="visiblity"
              trigger="click">
              <div class="messageBox">
                <div class="title">消息</div>
                <div class="message" v-if="messageData.length === 0">暂无消息</div>
                <div v-else>
                  <div class="message" v-for="item in messageData" @click="readMessage(item.id)">
                    <router-link :to="{
                      name:item.route,
                      query:{
                        messageId:item.rid
                      }
                    }">{{'【' + item.message + '】'}}</router-link>
                    <span>{{item.message_time}}</span>
                  </div>
                </div>
              </div>
              <el-badge slot="reference" :value="messageData.length" class="item myBadge">
                <img src="../../assets/propaganda/headerthemeimgstwo/home_message.png" style="vertical-align: middle;width: 18px;height: 24px;" />             
              </el-badge>
            </el-popover>
          </li>
          <li>
            <img src="../../assets/propaganda/IM.png" style="vertical-align: middle;" />  
          </li>
        </ul>
        <ul class="usermsg" v-else>   
           <li class="userlist">
              <router-link to="/login" id="loginIn" class="system">登录</router-link>
              <span>｜</span>
              <router-link to="/register" class="system"> 注册 </router-link>
           </li>         
        </ul> 
      </div>
    </div>         
  </el-header>
</template>
<!-- 2、行为：处理逻辑 -->
<script>
import {loginOutApi,getAllMessageApi,readMessageApi} from '@/apis'
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'topnav',
  props:["Lists"],
  data: function(){
    return {
      navTitle:[
        { name: "首页", pathTo: "/", id:"homePage"},
        { name: "孕育", pathTo: "/pregnant", id:"pregnantPage"},
        { name: "购物", pathTo: "/shopping", id:"shoppingPage"},
        { name: "旅游", pathTo: "/tour", id:"tourPage"},             
        { name: "互助", pathTo: "/mutualaid", id:"mutualAidPage"},
        { name: "阅读", pathTo: "/read", id:"read"},
        { name: "娱乐", pathTo: "/amusement", id:"amusement"},
        { name: "宣管", pathTo: "/dypropaganda", id:"propaganda"}     
      ],
      current: 0,
      active: 0,
      shopCartCount:0,
      messageData:[],
      visiblity:false,
      restaurants: [],
      state3: ''   
    }
  },
  watch:{
    $route(to,from){
      this.active = this.navTitle.findIndex(item => {
        return item.pathTo === to.path;
      });
    }
  },
  computed: {
    ...mapGetters(['userInfo','shopCartNum'])
  },
  methods: {
    ...mapActions(['UserLoginOut','ChangeShopCart']),
    diamondMove(index){
      var oDiamond = document.getElementById("diamond");    
      this.current = index;         
      var Target = oDiamond.offsetWidth*index;            
      oDiamond.style.left = Target + 'px';       
    },
    handleCommand(command){     
      if(command === 'exit'){
        loginOutApi().then((res) => {
          if(res.status === 200){
            let _data = res.data;
            if(_data.success === true){
              this.$router.push('/login');
              this.UserLoginOut();
            }
            this.$message({
              message:_data.operateMessage,
              type:_data.success === true ? 'success' : 'error'
            })
          }
        }) 
      }   
    },
   fetchData(){
      getAllMessageApi().then(res => {
        if(res.status === 200){
          this.ChangeShopCart(res.data.cart)         
        }
      })
    },
    readMessage(id){
      this.visiblity = false
      readMessageApi(id).then(res => {
        if(res.status === 200){
          this.fetchData()
        }
      })
    },
    querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadQuery() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" }
      ];
    },     
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    }          
  },
  mounted(){   
    this.fetchData();
    this.restaurants = this.loadQuery();  
    this.active = this.navTitle.findIndex(item => {
        return item.pathTo === this.$route.path;
    });
  }
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl' 
.portal_file_all {
    width: 100%;
    background: linear-gradient(to right, #4B8ADC , #8ACFEE);
    position:fixed;
    z-index:99;
    min-width:800px;
    .portal_header_content{
      width: 100%;
      height: 100%;
      background: url('../../assets/propaganda/headerthemeimgstwo/top_bg.png') no-repeat;
      background-size: 100% 100%;
      box-shadow: 0 2px 3px #e0e0e0;
      .portal_logo {
        float: left;
        width: 333px;
        .portal_header_img {
            display: inline-block;
            margin-top: 9px;
            margin-left: 30px;
        }
      }
      .portal_header_nav {
          float: left;
          .portal_ul_tab>li {
              float: left;
              width: 100px;
              height: 65px;
              text-align: center;
              font-size: 16px;
              font-family: "Microsoft YaHei";
              color: #fff;
              line-height: 65px;
              .spanborder{
                  display: inline-block;
                  height: 100%;
                  width: 65px;
                  text-align: center;
                  font-size: 16px;
                  font-family: "Microsoft YaHei";
                  color: #fff;
                  line-height: 65px;                  
                  color: #fff;
                  box-sizing: border-box;
                  border-top: 4px solid transparent; 
                  &:hover{
                    font-weight: bold;
                    border-top: 4px solid #3F3F9A; 
                  }    
              }
              .nav-active{
                font-weight: bold;
                border-top: 4px solid #3F3F9A;    
              }
          }
      }
      .portal_header_right {
          float: right;
          height: 65px;
          line-height: 65px;
          width: 350px;
          .portal_header_icon {
              margin-right: 40px;
              li{
                float: right;
                margin-left: 40px;
                position: relative;
              }
          }
      }
    }
    
}
 .usermsg{
    float: right;     
    margin-right: 30px; 
    .userlist{
      font-size: 16px;
    }  
 }
 .system:hover{
    color:#FF83FA;
 }
.el-dropdown{
  color:#fff;
  vertical-align: middle;
}
.el-dropdown-menu__item{
  text-align: center;
}
.icon-information-blue{
  font-size: 24px;
}
.el-dropdown-link{
  display: flex;
  align-items: center;
}
.el-badge /deep/ .el-badge__content{
  background-color: #3F3F9A;
}
.el-badge /deep/ .el-badge__content.is-fixed{
  top: 16px;
}
</style>