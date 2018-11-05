<template>
<el-main style="margin-top:40px">
  <div class="videocontainer">
	        <div v-for="(item, index) in videoimg" :key="index" class="video-img" 
            @mousedown.prevent="imgmove(index, item, $event)"
	        	:class="{ selectImg: index === moveimg }">
	           <img :src="item.address" :alt="item.altname" class="bigimg" />
	           <h4>{{ item.title }}</h4>
	           <img v-if="index === moveimg" :src="item.address" :alt="item.altname" :class="{cursorTo: index === moveimg && upAllowed}"
	           		:style="'left:'+imgleft+'px;top:'+imgtop+'px;'" class="moveimg" ref="moveImg" />
	        </div>
	</div>
  <timeline style="height: 600px;" :videolist="videolist" :newVideoList="newVideoList" ref="timeline"  :tickSize="tickSize"
       :upAllowed="upAllowed" :trackNum="trackNum" :dragAreaHeight="dragAreaHeight" :trackHight="trackHight"></timeline>  
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
          }],
          upAllowed: false,
          moveimg: -1,
          imgleft: 0,
          imgtop: 0,
          videolist: [],
          newVideoList: {}, //预览的数据
          trackNum: [{ //轨道数据
            order: 1,
            name: "Track 1",
            ismask: false
          },{
            order: 2,
            name: "Track 2",
            ismask: false
          },{
            order: 3,
            name: "Track 3",
            ismask: false
          },{
              order: 4,
            name: "Track 4",
            ismask: false
          }],  	
          trackHight: 72, //轨道高度，包括边距
          tickSize: 35, //一个小刻度代表多少px
          sliderSec: 1 //一个大刻度代表多少秒
       }
    },
    components: {
      "timeline": TimeLine
    },
    computed: {
      dragAreaHeight () { //轨道区域高度
	  		return (this.trackNum.length - 1) * this.trackHight;
	  	}
    },
    methods: {
          // 资源拖入
        imgmove (index, item, e) {  
        this.moveimg = index;
          let odiv = e.target,
        oTarget = document.getElementById('dragArea'),  
            disX = odiv.getBoundingClientRect().left + 30, 
        disY = odiv.getBoundingClientRect().top + 20;
        this.newVideoList = {...item, width: 0, left: 0, top: 0, track:''};
        document.onmousemove = (e)=>{    
          this.imgleft = e.clientX - disX;  
          this.imgtop = e.clientY - disY;			
          // this.dropto(item, e);
          this.dropto(item, e);
        };
        document.onmouseup = (e) => {
          this.moveimg = -1;
          this.imgleft = 0;
          this.imgtop = 0;
          this.upAllowed = false;
          // this.dropto(item, e);
          this.dropto(item, e);
          if(this.upAllowed){
            this.videolist.push(this.newVideoList);
          }			
          this.upAllowed = false;
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }, 
      // 生成剪辑预览
      dropto (item, e) {
        debugger
        let	oTarget = document.getElementById('dragArea'),  
          topLimit = e.clientY - oTarget.getBoundingClientRect().top,//getBoundingClientRect用于获取某个元素相对于视窗的位置集合。
          i = Math.round(Math.min(topLimit,this.dragAreaHeight)/this.trackHight);  //在第几个轨道上
        if (topLimit >= 0 && !this.trackNum[i].ismask) {
          this.upAllowed = true;
          this.newVideoList.width = (item.time/this.sliderSec)*this.tickSize;
          this.newVideoList.left = e.clientX - oTarget.getBoundingClientRect().left;	
          this.newVideoList.top = this.trackHight*i;	
          this.newVideoList.track = this.trackNum[i].order;	
          this.newVideoList.id = this.GenNonDuplicateID(3);	
        }else{
          this.upAllowed = false;
        }		
        console.log("this.newVideoList",this.newVideoList)
      },
      //生成id
      GenNonDuplicateID (randomLength){
        return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
      }
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
  .cursorTo{
		cursor: default!important;
	}
	.videocontainer{
	  height: 200px;
	  border: 3px solid #000;
	  background: #fff;
	  padding: 5px;
	  position: relative;
	  .video-img{
	    width: 150px;
	    border: 1px solid #ccc;
	    background: #E0FFFF;
	    position: relative;
	    display: inline-block;
	    margin: 5px;
	    .bigimg{
	      width: 100%;
	      height: 120px;
	    }
	    .moveimg{
	    	position: absolute;
	    	z-index:999999;
			width : 60px;
			height: 32px;
			cursor: not-allowed;
	    }
	    h4{
	      margin: 0;
	      font-size: 12px;
	    }
	  }
	  .selectImg{
		border: 1px solid #f00;
	  }
	}
</style>