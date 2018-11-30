<template>
    <div class="father">
        <h3>这里是父组件</h3>
        <DemoChild>
            <div class="tmpl">
              <span>菜单1</span>
              <span>菜单2</span>
              <span>菜单3</span>
              <span>菜单4</span>
              <span>菜单5</span>
              <span>菜单6</span>
            </div>
            <div class="tmpl" slot="up">
              <span>菜单+1</span>
              <span>菜单+2</span>
              <span>菜单+3</span>
              <span>菜单+4</span>
              <span>菜单+5</span>
              <span>菜单+6</span>
            </div>
            <div class="tmpl" slot="down">
              <span>菜单-1</span>
              <span>菜单-2</span>
              <span>菜单-3</span>
              <span>菜单-4</span>
              <span>菜单-5</span>
              <span>菜单-6</span>
            </div>
            <template slot-scope="user">
              <div class="tmpl">
                <span v-for="item in user.data">{{item}}</span>
              </div>
            </template>
        </DemoChild>
    </div>
</template>
<script>
import DemoChild from './DemoChild'
export default {
  name: 'demofather',
  components: {
    DemoChild
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
.father{
  background: #ddd;
  text-align: center;
  padding-bottom: 20px;
  h3{
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0;
  }
  .tmpl{
    margin-bottom: 10px;
    span{
      display: inline-block;
      width: 80px;
      height: 50px;
      line-height: 50px;
      border: 1px solid red;
      margin: 0 5px;
    }
  }
}

</style>