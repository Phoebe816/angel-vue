<template>
  <el-header height="48px">
    <div class="header-cloud">
      <router-link :to="'/'" title="天使网首页">
       <img class="logoImage" src="@/assets/angel1.png" height="48">
      </router-link>
      <span>天使网</span>
    </div>
    <div class="header-menu">
      <div><!-- v-if="userInfo && userInfo.roleName === 'user'" -->
        <el-badge :value="shopCartNum" class="item2 myBadge" :hidden="shopCartNum === 0">
          <router-link :to="'/shopCart'" tag="span" :style="{color:'#fff'}">
            <i class="iconfont icon-icon-gouwuche"></i>
            <span class="messageText">购物车</span>
          </router-link>
        </el-badge>
      </div>
      <div>
        <el-popover
          popper-class="messagePopper"
          placement="bottom"
          width="300"
          v-model="visiblity"
          trigger="click">
          <div class="messageBox">
            <div class="title">通知</div>
            <div class="message" v-if="messageData.length === 0">暂无通知</div>
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
          <el-badge slot="reference" :value="messageData.length" class="item myBadge" :hidden="messageData.length === 0">
            <i class="messageStyle iconfont icon-tongzhi"></i>
            <span class="messageText">通知</span>
          </el-badge>
        </el-popover>
      </div>
      <el-dropdown
        @command="handleCommand"
        class="header-menu-user"
        trigger="click">
        <span class="el-dropdown-link">
          <i class="messageStyle iconfont icon-icon"></i>
          <span class="messageText">{{userInfo.account ? userInfo.account : userInfo.phoneNum}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="'/userInfo'">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import {loginOutApi,getAllMessageApi,readMessageApi} from '@/apis'
import {mapGetters,mapActions} from 'vuex'
export default{
  name: 'Header',
  data(){
    return {
      messageData:[],
      visiblity:false,
      shopCartCount:0
    }
  },
  computed:{
    ...mapGetters(['userInfo','shopCartNum'])
  },
  methods:{
    ...mapActions(['UserLoginOut','ChangeShopCart']),
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
          this.messageData = res.data.messages
          this.ChangeShopCart(res.data.cart)
          debugger
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
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/index.styl'
.el-header {
  color $--color-white
  background-color $--background-color-header
}
.header-cloud {
  height 100%
  width 20%  
  vertical-align middle
  display inline-block
  .logoImage{  
    height 100%
    margin-right 0.2%
    margin-top -3%
    vertical-align middle
  }
  & span{
    font-size 18px
    vertical-align middle 
    display inline-block  
    height 100%
    line-height 48px 
  }
}
.header-menu {
  float right
  height 48px
  & > div {
    position relative
    display inline-block
    vertical-align middle
    height inherit
    padding-left 16px
  }
  & i{   
    vertical-align middle
    cursor pointer
  }
}

.header-menu-user {
  cursor pointer
  line-height 48px
  & .el-dropdown-link {
    cursor pointer
    color $--color-white
  }
}

.messageText{
  line-height 48px
  font-size 12px
  vertical-align middle
  &:hover{
    cursor pointer
  }
}
.el-badge.item /deep/ .el-badge__content.is-fixed {
  margin-top: 15px;
  margin-right:25px;
  border: none;
}
.el-badge.item2 /deep/ .el-badge__content.is-fixed {
  margin-top: 15px;
  margin-right:35px;
  border: none;
}

.el-badge.myBadge /deep/ .el-badge__content{
  font-size 10px
  height 15px
  line-height 15px
  padding 0px 4px
}
</style>
