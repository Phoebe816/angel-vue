<template>
<div>
<div class="videocontainer">
        <div v-for="(item, index) in videoimg" class="video-img" @mousedown.prevent="imgmove(index, item, $event)"
        	:class="{ selectImg: index === moveimg }">
           <img :src="item.address" :alt="item.altname" />
           <h4>{{ item.title }}</h4>
           <img v-if="index === moveimg" :src="item.address" :alt="item.altname" 
           		:style="'left:'+imgleft+'px;top:'+imgtop+'px;'" class="moveimg" ref="moveImg" />
        </div>
      <!-- </draggable> -->
</div>
<div class="cut-tool">
	<div class="operate-btns">
		<button @click="trackAdd" title="在最后面增加轨道">
			<i class="iconfont icon-blueadd-circle"></i>
		</button>
		<button @click="trackLess" title="减少最后一个轨道">
			<i class="iconfont icon-blueless-circle"></i>
		</button>
		<button class="nonebtn" @click.stop.prevent="cutvideo">
			<i class="iconfont icon-bluecut"></i>
		</button>
		<button class="nonebtn" @click="deletevideo">
			<i class="iconfont icon-bluedelete"></i>
		</button>
		<el-slider v-model="sliderSec"></el-slider>
		<span>{{sliderSec}}秒</span>
	</div>
	<div class="timelinebody">
		<!-- 标尺 -->
		<div class="ruler-control">
			<div id="ruler_label" class="ruler_label" @click="sliderLeft = 0;sliderRun();">
				<div id="ruler_time" class="ng-binding">{{ sectime }}</div>
			</div>
			<div class="slider">			
				<canvas id="ruler" :width="rulerWidth" :height="rulerHight" 
					@click="canvasclick"></canvas>
				<!-- 滑块线 -->
			    <div id="slider" class="slider_runway">
			        <div  class="playhead-top"></div>
			        <div class="playhead-line" :style="'height:'+ lineHeight + 'px;'"></div>	       
			    </div>
			</div>
		</div>
		<!-- 轨道 -->
		<div class="track-container">
			<trackc v-for="(item, index) in trackNum" :key="item.order" 
					:track="item" 
					:width="trackwidth"
					@showRightMenu="showRightMenu" 
					:rightNavshow="rightNavNum === item.order"
					@clickRightMenu="clickRightMenu" 
					:rightmenu="rightmenu"></trackc>	
			<div class="dragArea" id="dragArea">	
				<videoimg v-for="(item, index) in videolist" :key='item.time + index' 
					@selectVideo="selectVideo(index)" @resize="resize" @dragstart="dragstart"
					:videoNum="item" :class="{selectedred: index == current}">				
				</videoimg>	
			</div>		
		</div>		
    </div>	
</div>
</div>
</template>
<script>
import TrackContent from './TrackContent'
import VideoImg from './VideoImg'
export default {
  name:'timeline',
  data(){
  	return {
  		imgleft: 0,
  		imgtop: 0,
  		trackNum: [{
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
  		videolist: [],
  		time: 0,
  		trans: 8, //一个刻度代表多少秒
  		tickSize: 30, //一个刻度代表多少px
  		// sectime: "",
  		rulerWidth: 1424,
  		rulerHight: 42,
  		sliderLeft: 0,  //红线的left
  		current: -1,
  		moveimg: -1,
  		trackHight: 74,
  		rightNavNum: 0,
  		rightmenu: {
  			top: 0,
  			left: 0
  		},
  		sliderSec: 1
  	}
  },
  props: {
  	 videoimg: {
  	 	type: Array
  	 }
  },
  components: {
  	"trackc": TrackContent,
  	"videoimg": VideoImg
  },
  computed: {
	  	sectime () {
	  		let text = this.secondsToTime(this.time);
			return [text.hour, text.min, text.sec, text.frame].join(":");
	  	},
	  	trackwidth () {
	  		return this.rulerWidth +100;
	  	},
	  	dragAreaHeight () {
	  		return (this.trackNum.length - 1) * this.trackHight
	  	},
	  	lineHeight () {
	  		return this.trackNum.length * this.trackHight + 10 
	  	}
		/*trackVideoTime: {
			get: function() {
				let t = [], obj = {track: 1, videolist: []};
				for (let i = 0; i < this.trackNum; i++) {
					let obj1 = {...obj};
					t.push(obj1);
					obj.track ++;
				}
				return t
			},
			set: function(newValue) {
				this.trackNum = newValue.length;
			}		
		}*/
  },
  methods: {
  	showRightMenu (order, e) {
  		debugger
  		this.rightNavNum = order;  
  		let oTarget = document.getElementById('dragArea');
  		this.rightmenu.left = e.clientX;
  		this.rightmenu.top = e.clientY - oTarget.getBoundingClientRect().top - (order-1)*this.trackHight;	
  		document.onclick = (e)=>{    
        	this.rightNavNum = 0;
        	this.rightmenu.left = 0;        	
      };	
  	},
  	clickRightMenu (track, btn, e) {
  		switch (btn){
  			case 1: {
  				let neworder = this.trackNum.length + 1,
		  			newname = "Track " + neworder,
		  			newtrack = {
			  			order: neworder,
			  			name: newname,
			  			ismask: false
			  		}
			  	this.trackNum.splice(track.order-1, 0, newtrack);
  			}
  			break;
  			case 2: {
  				let neworder = this.trackNum.length + 1,
		  			newname = "Track " + neworder,
		  			newtrack = {
			  			order: neworder,
			  			name: newname,
			  			ismask: false
			  		}
			  	this.trackNum.splice(track.order, 0, newtrack);
  			}
  			break;
  			case 3: {
  				this.$prompt('重命名轨道', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputValue: track.name,
		          inputPattern: /\S/,
		          inputErrorMessage: '轨道名称不可为空'
		        }).then(({ value }) => {
		          track.name=value
		          this.$message({
		            type: 'success',
		            message: '保存成功 '
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消修改'
		          });       
		        });
  			}
  			break;
  			case 4: {
  				track.ismask = true;
  			}
  			break;
  			case 5: {
  				this.trackNum.splice(track.order-1, 1)
  			}
  			break;
  		}
  		this.rightNavNum = 0;
  	},
  	trackAdd () {
  		let neworder = this.trackNum.length + 1,
  			newname = "Track " + neworder,
  			newtrack = {
	  			order: neworder,
	  			name: newname,
	  			ismask: false
	  		}
	  	this.trackNum.push(newtrack);
  	},
  	trackLess () {
  		this.trackNum.pop();
  	},
  	imgmove (index, item, e) {  
  	  this.moveimg = index;
  	  let odiv = e.target;    //获取目标元素     
      let disX = e.clientX - odiv.offsetLeft, 
          disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e)=>{    
        this.imgleft = e.clientX - disX;  
        this.imgtop = e.clientY - disY;
      };
      document.onmouseup = (e) => {
      	this.moveimg = -1;
      	this.imgleft = 0;
      	this.imgtop = 0;
      	let oTarget = document.getElementById('dragArea'), 
      		newdata = {...item, width: 0, left: 0, top: 0},
      		topLimit = e.clientY - oTarget.getBoundingClientRect().top,//getBoundingClientRect用于获取某个元素相对于视窗的位置集合。
      		bottomLimit = this.dragAreaHeight,   //放到最下面一个轨道的top值
      		i = Math.round(topLimit/this.trackHight);  //在第几个轨道上
      	if (topLimit >= 0) {
      		newdata.width = (item.time/this.trans)*this.tickSize;
  			newdata.left = e.clientX - oTarget.getBoundingClientRect().left;
  			newdata.top = topLimit > bottomLimit ? bottomLimit : this.trackHight*i;
  			this.videolist.push(newdata);
  			this.$forceUpdate();
      	}  		
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }, 
  	resize (data, direct, e) {
      	debugger
    	let disR = e.clientX - data.width, //右边拖动
    		disX = e.clientX + data.width, 
    		disL = e.clientX - data.left;
        e.stopPropagation(); 
        console.log(disX)          
        document.onmousemove = (e)=>{        	
        	if (direct =='L') {
        		data.left = e.clientX - disL;
        		data.width = disX - e.clientX;
        	} 
        	if (direct =='W') {
        		data.width = e.clientX - disR;
        	}          	
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
    },
    dragstart (data, e) {
    	let self = this;
    	debugger
    	let top = e.clientY - data.top,
    		left = e.clientX - data.left;
    	document.onmousemove = (e)=>{    
    		if (data.left >= 0) {    			
        		data.left = e.clientX - left; 
    		}else{
        		data.left = 0; 
    		}   	
    		if (data.top < 0) {
    			data.top = 0;
    		}else if (data.top > self.dragAreaHeight) {
    			data.top = self.dragAreaHeight;
    		}else {
    			data.top = e.clientY - top;  
    		}	 
        };
        document.onmouseup = (e) => {
        	let i = Math.round(data.top/self.trackHight)
        	data.top = self.trackHight*i;        	
            document.onmousemove = null;
            document.onmouseup = null;
        };
    },
  	selectVideo (index) {
  		this.current = index;
  	},
  	deletevideo () {
  		this.videolist.splice(this.current, 1);
  		this.current = -1;
  	},
  	cutvideo () {
  		debugger
  		let index = this.current;
  		if (index < 0) {
  			this.$message({
	          message: '请先选择一条需要剪切的片段',
	          type: 'warning'
	        });
	        return
  		}
  		let	x = this.sliderLeft,
  			origin = this.videolist[index],
  			newwidth = x - origin.left,
  			addwidth = origin.width - newwidth,
  			addData = {...origin};  
  		if ( newwidth <= 0) {
  			this.$message({
	          message: '请移动标尺到需要剪切的地方',
	          type: 'warning'
	        });
	        return
  		}		
  		origin.width = newwidth;
  		origin.time = (newwidth/this.tickSize)*this.trans;
  		addData.left = x;
  		addData.width = addwidth;
  		addData.time = (addwidth/this.tickSize)*this.trans;
  		this.videolist.splice(index, 1, origin);
  		this.videolist.splice(index+1, 0, addData);
  	},
  	canvasclick(e){
  		this.sliderLeft = e.offsetX;
  		this.sliderRun();
  	},
  	sliderRun(){
  		let x = this.sliderLeft,
  			slider = document.getElementById("slider");
  		this.time = x*this.trans/this.tickSize;
  		slider.style.left = x + 'px';
  	},
  	secondsToTime(secs){
  		// calculate time of playhead
		let milliseconds = secs * 1000,
		    secsint = Math.floor(milliseconds/1000), //secs的整数部分,总秒数
		    milli = milliseconds % 1000, //secs的小数部分
		    sec = secsint % 60,             //秒
		    min = Math.floor(secsint/60) % 60,   //分		
		    hour = Math.floor(secsint/3600) % 24,   //小时
		    // frame = Math.round((milli / 1000.0) * 24) + 1;
		    frame = Math.floor((milli / 1000.0) * 24);
		hour = ("000"+hour).slice(-2);
		min = ("000"+min).slice(-2);
		sec = ("000"+sec).slice(-2);
		// milli = ("000"+milli).slice(-2);
		frame = ("000"+frame).slice(-2);		
	    return { "hour":hour, "min":min, "sec":sec, "frame":frame };
  	},
	timetext(secs, len){
		let text = this.secondsToTime(secs), scale = '';
		if (len === 3) {
			scale = [text.hour, text.min, text.sec].join(":");
		} else {
			scale = [text.hour, text.min, text.sec, text.frame].join(":");
		}		
		return scale
	},
	drawRuler(){
		let myCanvas = document.getElementById("ruler"),
			w = this.rulerWidth,
			h = this.rulerHight,
		    c = myCanvas.getContext("2d"),
		    shotLine = Math.floor(h*3/4),
		    longLine = Math.floor(h/2),
		    scaleh = Math.floor(h/3),
		    tickSize = this.tickSize,
		    ratio = Math.floor(w / tickSize);
		c.clearRect(0, 0, w, h);
		c.strokeStyle = '#ccc';
		c.fillStyle = '#ccc';
		c.beginPath();
		c.font="12px Arial";
		for (let i = 0; i < ratio; i++) {			
			if (i%2===0) {
				let sec = this.trans*i,
					s = this.timetext(sec, 3),
					x = 0 + tickSize * i;
				c.moveTo(x, h);
				c.lineTo(x, longLine);
				if (i!==0) {
					c.textAlign="center";
					c.fillText(s, x, scaleh);					
				}
			} else {
				c.moveTo(0 + tickSize * i, h);
				c.lineTo(0 + tickSize * i, shotLine);
			}	
		}
		c.stroke();
	}
  },
  mounted(){
  	this.drawRuler();
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet">
	@import '../../assets/css/index.styl'
	.videocontainer{
	  height: 250px;
	  border: 3px solid #000;
	  background: #fff;
	  padding: 5px;
	  position: relative;
	  .video-img{
	    width: 150px;
	    border: 1px solid #ccc;
	    background: #E0FFFF;
	    cursor: move;
	    position: relative;
	    display: inline-block;
	    margin: 5px;
	    img{
	      width: 100%;
	      height: 120px;
	    }
	    .moveimg{
	    	position: absolute;
	    	z-index:9999;
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

	.cut-tool{
		height: calc(100% - 250px);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(14,14,14,1)), color-stop(100%,rgba(125,126,125,1)));	
		.operate-btns{
			height:30px;
			background: #EDEDED;
			border: 2px solid #000;
			border-radius: 2px;
			padding-left: 5px;
			.el-slider {
				display: inline-block;
				margin-left:20px;
				height: 80%;
				width: 72%;
				/deep/ .el-slider__runway{
					margin: 14px 0;
					background-color: #919baf;				
				}
			}
			span{
				display: inline-block;
				height: 100%;
				line-height: 34px;
				font-size: 16px;
				margin-left: 10px;
			}
			button{
				border-width:1px;
				background: none;
				padding: 0;
				outline: none;
				border-radius: 50%;
				display: inline-block;
				.iconfont{
					color: #29bffd;
					font-size: 24px;
					cursor: pointer;
				}
			}	
			.nonebtn{
				border: none;
			}	
		}
		.timelinebody{
			padding: 0 5px;
			height: calc(100% - 30px);
			overflow: auto;
		}
	}
	.ruler-control{
		display: flex;
		.ruler_label {
		    height: 48px;
		    width: 140px;
		    line-height: 48px;
		    // margin-bottom: 4px;
		    z-index:99999;
		    display: inline-block;
		    background: #000;
		    cursor: pointer;
		    flex: none;
		    .ng-binding{
				font-size: 13pt;
			    color: #c8c8c8;
			    padding-left: 10px;
			}
		}
		.slider{
			position: relative;
			.slider_runway{
				top: 2px;
				transform: translateX(-50%);
				position: absolute;
				z-index: 9998;
				.playhead-top{
				    margin-top: 12px;
				    width: 25px;
				    height: 32px;
				    background-image: url('../../assets/play_head.png');
				    opacity: 1;
				}
				.playhead-line {
				    top: 32px;
				    margin-left: 12px;
				    width: 1px;
				    background-color: #ff0024;
				    opacity: 1;
				}
			}
		}
	}
	.track-container{
		position: relative;
		.dragArea{
			position: absolute;
			height: 100%;
			top: 1px;
			left: 140px;
			.selectedred{
				border-left: 2px solid red!important;
			    border-right: 2px solid red!important;
			    z-index: 9990;
			}
		}
	}
	::-webkit-scrollbar {
	    width: 6px;
	    height: 6px;
	    background: #000000;
	}
</style>