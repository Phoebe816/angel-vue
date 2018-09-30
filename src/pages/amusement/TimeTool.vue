<template>
<el-main style="margin-top:40px">
  <timeline style="height: 800px;" :videoimg="videoimg"></timeline>  
</el-main>
</template>
<script>
import TimeLine from './TimeLine'


export default {
	data() {
      return {
         videoimg:[{
           address: require("../../assets/img/babyphoto/1.jpg"), 
           altname: "宝宝照片",
           title: "测试用宝宝照片",
           time: 80
         },{
           address: require("../../assets/img/babyphoto/2.jpg"), 
           altname: "宝宝照片",
           title: "112233444444照片",
           time: 110
         }]
       }
    },
    components: {
      "timeline": TimeLine
    },
    methods: {
      
    },
    /*directives: {
      drag: {
        // 指令的定义
        bind: function (el) {
          let odiv = el;  //获取当前元素
          let self = this;
          oDiv.onmousedown = (e) => {
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;             
            document.onmousemove = (e)=>{
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX;  
              let top = e.clientY - disY;
              //移动当前元素
              odiv.style.left = left + 'px';
              odiv.style.top = top + 'px';
              // binding.value({x:e.pageX,y:e.pageY});
            };
            document.onmouseup = (e) => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        }
      }
    }*/
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'

</style>