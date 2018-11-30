<template>
    <div class="child">
        <h3>这里是子组件</h3>
        <h3>下面是匿名插槽</h3>
        <slot></slot>
        <h3>下面是具名插槽</h3>
        <!-- <slot name="up"></slot> -->
        <slot name="down"></slot>
        <h3>下面是作用域插槽</h3>
        <slot data="data"></slot>
    </div>
</template>
<script>

export default {
  name: 'demochild',
  data(){
  	return {
        data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
      }
  }
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
.child{
  background-color: #409EFF;
  text-align: center;
  font-size: 16px;
  padding-bottom: 5px;
  h3{
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0;
  }
}
</style>