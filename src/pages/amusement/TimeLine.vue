<template>	
	<div class="cut-tool">
		<div class="operate-btns">
			<button @click="trackAdd" title="在最后面增加轨道">
				<i class="iconfont icon-blueadd-circle"></i>
			</button>
			<button @click="trackLess" title="减少最后一个轨道">
				<i class="iconfont icon-blueless-circle"></i>
			</button>
			<button class="nonebtn" title="剪切" @click.stop.prevent="cutvideo">
				<i class="iconfont icon-bluecut"></i>
			</button>
			<button class="nonebtn" title="删除" @click="deletevideo">
				<i class="iconfont icon-bluedelete"></i>
			</button>
			<button class="nonebtn" title="标记时间点" @click="signBar">
				<i class="iconfont icon-biaoji"></i>
			</button>
			<button class="nonebtn" title="前一个标记" @click="preBar">
				<i class="iconfont icon-houtui"></i>
			</button>
			<button class="nonebtn" title="后一个标记" @click="nextBar">
				<i class="iconfont icon-qianjin"></i>
			</button>
			<button class="nonebtn" title="播放/暂停" @click="videoPlay" >
				<i class="iconfont" :class="{'icon-bofang': !playNow, 'icon-zanting': playNow}"></i>
			</button>
			<el-slider v-model="sliderSec" :min="1" :max="800" @change="drawRuler"></el-slider>
			<span >{{sliderSec}}秒</span>		
		</div>
		<div class="timelinebody">
			<!-- 标尺 -->
			<div class="ruler-control">
				<div id="ruler_label" class="ruler_label" @click="sliderLeft = 0;">
					<div id="ruler_time" class="ng-binding">{{ sectime }}</div>				
				</div>
				<div class="slider">	
					<div class="ruler-canvas" ref="rulerCanvas">
						<canvas id="ruler" :width="rulerWidth" :height="rulerHight" style="margin-bottom:3px;"
							@click="canvasclick"></canvas>	
					</div>	
					<div class="hidescroll"></div>
					<!-- 标记点 -->
					<div class="signdot" v-for="item in signList" :key="item.id" :style="{left: item.left + 'px'}"></div>
					<!-- 滑块线 -->
				    <div id="slider" class="slider_runway" :style="{left: sliderLeft + 'px'}">
				        <div  class="playhead-top" @mousedown.prevent="sliderMove"></div>
				        <div class="playhead-line" :style="{height: lineHeight + 'px'}"></div>	       
				    </div>
					<div class="divide-line" v-if="absorb" :style="{left: absorbLeft + 'px', height: lineHeight + 'px'}"></div>
				</div>
			</div>
			<!-- 轨道 -->	
			<div class="track-ruler-container" id="track_ruler">
				<div>
					<trackc v-for="(item, index) in trackNum" :key="item.order" 
							:track="item" 
							:trackwidth="trackwidth"
							@showRightMenu="showRightMenu" 
							:rightNavshow="rightNavNum === item.order"
							@clickRightMenu="clickRightMenu" 
							:rightmenu="rightmenu"></trackc>
				</div>				
				<div class="dragArea" id="dragArea" ref="trackDragArea"
					style="min-height: 100%;" 
					:style="{ width: trackwidth + 10 + 'px', height: dragAreaHeight + trackHight+'px'}">
					<div class="track_container" :style="{ width: trackwidth + 'px'}"
						v-for="(item, index) in trackNum" :key="index + item.order"></div>
					<videoimg v-for="(item, index) in videolist" :key='item.id + index' 
						@selectVideo="selectVideo(index)" @resize="resize" @dragstart="dragstart"
						:videoNum="item" :class="{selectedred: index === current, overlapBg: !item.address, 'move-zIndex': moving === item.id}">				
					</videoimg>	
					<videoimg  :videoNum="newVideoList" v-if="upAllowed" class="move-zIndex">				
					</videoimg>	
				</div>	
			</div>
			<!-- 自定义水平滚动条 -->
			<div class="scroll-horizontal" ref="scrollHorizontal">
					<div style="height:1px" :style="{ width: trackwidth + 'px'}"></div>
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
		signList: [],  		
		playNow: false,			
  		// sectime: "",
  		rulerHight: 42,
  		sliderLeft: 0,  //红线的left
  		current: -1,
		timer: null,
  		rightNavNum: 0,
  		rightmenu: {
  			top: 0,
  			left: 0
		  },
		setLeftArr: [],//标记集合
		absorb: false,
		moving: '',
		absorbLeft: 0, //吸附线的left
		sliderSec: 1 //一个大刻度代表多少秒
  	}
  },
  props: {
  	/*  videoimg: {
  	 	type: Array
	   } */
	   videolist: {
		   type: Array
	   },
	   newVideoList: { //预览的数据
		   type: Object
	   },
	   upAllowed: {
		   type: Boolean
	   },
	   trackNum: { //轨道数据
		   type: Array
	   },
	   trackHight: {
		   type: Number
	   },
	   tickSize: {  //一个小刻度代表多少px
		   type: Number 
	   },
	   dragAreaHeight: {
		   type: Number
	   }
  },
  components: {
  	"trackc": TrackContent,
  	"videoimg": VideoImg
  },
  computed: {
	    rulerWidth () {  //刻度尺宽度
			let w = Math.ceil((600/this.sliderSec)*this.tickSize)+5,
				mw = w>1000?w:1000
			return mw;
		},
		time () {  //滑块线所在的地方代表的时间
			return this.sliderLeft*this.sliderSec/(this.tickSize*2);
		},
	  	sectime () {  //刻度左侧时间显示
	  		let text = this.secondsToTime(this.time);
			return [text.hour, text.min, text.sec, text.frame].join(":");
	  	},
	  	trackwidth () { //轨道宽度
	  		return this.rulerWidth - 2;
		  },	 	
	  	lineHeight () {  //分隔线、滑块线的长度
	  		return this.trackNum.length * this.trackHight + 10 
	  	}
  },
  watch: {
	    sliderSec: function (newsliderSec, oldsliderSec) {
			this.sliderSec = newsliderSec;
			for (let item of this.videolist){
				item.width = (item.time/this.sliderSec)*this.tickSize;
			}
			this.drawRuler();
		},
  },
  methods: {
  	//标记打点
	signBar () {
		let leftArr = this.signList.filter(item => item.left===this.sliderLeft)
		if(leftArr.length > 0){
			return true
		}
		let newsign = {
				left: this.sliderLeft,
				id: Math.round(Math.random()*100)
			},
			arr = [...this.signList];
		this.signList.push(newsign);		
		this.signList.sort(this.compare("left"))
		console.log("signList:",this.signList)
	},
	//排序
	compare (prop) {
		return (obj1, obj2) => {
			let val1 = obj1[prop];
			let val2 = obj2[prop];
			if (val1 < val2) {
				return -1;
			} else if (val1 > val2) {
				return 1;
			} else {
				return 0;
			}         
		}   
	},
	//生成标记的left集合
	setCancat () {
		let currentData = this.videolist[this.current];
		let leftTrack = this.videolist.filter(item => {
			return item.track === currentData.track;
		})
		let leftArr1 = leftTrack.map(item => {
			return item.left;
		})
		let leftArr2 = leftTrack.map(item => {
			return item.left + item.width;
		})
		let leftArr3 = this.signList.map(item => {
			return item.left;
		})
		let leftArr = [...leftArr1, ...leftArr2, ...leftArr3];
		this.setLeftArr = Array.from(new Set(leftArr));
		this.setLeftArr.sort((a, b) => {
			  return a-b; 
		})
		console.log("setLeftArr:",this.setLeftArr)
	},
	//前一个标记
	preBar () {		
		this.setCancat ();
		let nextIndex = this.setLeftArr.findIndex( item => {
				return item >= this.sliderLeft
		})
		if(nextIndex===0){
			this.$message({
	          message: '前面没有标记了',
	          type: 'warning'
	        });
	        return
		}
		this.sliderLeft = this.setLeftArr[nextIndex-1];
	},
	// 后一个标记
	nextBar () {
		this.setCancat ();
		let nextIndex = this.setLeftArr.findIndex((item, index) => {
				return item > this.sliderLeft
		})
		if(nextIndex < 0){
			this.$message({
	          message: '后面没有标记了',
	          type: 'warning'
	        });
	        return
		}
		this.sliderLeft = this.setLeftArr[nextIndex];
		// if(this.setLeftArr[nextIndex]>)
	},
	// 播放
	videoPlay () {
		this.playNow = !this.playNow;
		if(this.playNow){
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.sliderLeft += (this.tickSize*2/this.sliderSec)/50;
			}, 20)			
		}else{
			clearInterval(this.timer);  
		}
	},
	// 键盘控制滑块线运动
	sliderKey (direct) {
		clearInterval(this.timer);	
		this.timer = setInterval(() => {
			if(direct ==='right'){
				this.sliderLeft++;
			}else if(this.sliderLeft>0){
				this.sliderLeft--;
			}				
		}, 30)			
		 

	},
	// 滑块线运动
	sliderMove (e) {
		let odiv = document.getElementById('slider');// 获取目标元素
		//计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
		let x = e.clientX - odiv.offsetLeft;
		let limit = document.getElementById('track_ruler').offsetWidth - 6; //框的宽度
		console.log(odiv.offsetLeft)
		document.onmousemove = (e) => {
			// 获取拖拽元素的位置
			let left = e.clientX - x;			
			// 判断范围
			if (left <= 0) {
				left = 0;
			} else if (left >= limit){
				left = limit;
			}
			this.sliderLeft = left;			
		}
		// 为了防止 火狐浏览器 拖拽阴影问题
		document.onmouseup = (e) => {
			document.onmousemove = null;
			document.onmouseup = null
		}
	},
	// 轨道右侧菜单
  	showRightMenu (order, e) {
  		this.rightNavNum = order;  
  		let oTarget = document.getElementById('dragArea');
  		this.rightmenu.left = e.clientX;
  		this.rightmenu.top = e.clientY - oTarget.getBoundingClientRect().top - (order-1)*this.trackHight;	
  		document.onclick = (e)=>{    
        	this.rightNavNum = 0;
        	this.rightmenu.left = 0;        	
      };	
  	},
  	// 轨道右侧菜单点击事件
  	clickRightMenu (track, btn, e) {
  		let trackIndex = this.trackNum.findIndex((item, index) => {
				return item.order === track.order;
		})
  		switch (btn){
  			case 1: {
  				let neworder = this.trackNum.length + 1,
		  			newname = "Track new" + neworder,
		  			newtrack = {
			  			order: neworder,
			  			name: newname,
			  			ismask: false
			  		}
			  	this.trackNum.splice(trackIndex, 0, newtrack);
  			}
  			break;
  			case 2: {
  				let neworder = this.trackNum.length + 1,
		  			newname = "Track new" + neworder,
		  			newtrack = {
			  			order: neworder,
			  			name: newname,
			  			ismask: false
			  		}
			  	this.trackNum.splice(trackIndex+1, 0, newtrack);
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
  				track.ismask = !track.ismask;
  			}
  			break;
  			case 5: {
  				this.trackNum.splice(trackIndex, 1)
  			}
  			break;
  		}
  		this.rightNavNum = 0;
  	},
  	trackAdd () {
  		let neworder = this.trackNum.length + 1,
  			newname = "Track new" + neworder,
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
  	//片段宽度拖动
  	resize (data, direct, e) {
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
			data.time = (data.width/this.tickSize)*(this.sliderSec/2);
			document.onmousemove = null;
			document.onmouseup = null;
        };
    },
    //剪辑拖拽
    dragstart (data, e) {
    	let self = this;
    	let startTop = data.top,
    		startLeft = data.left,
    		top = e.clientY - data.top,
    		left = e.clientX - data.left;
    	document.onmousemove = (e)=>{    
			data.left = e.clientX - left;
			data.top = e.clientY - top;  
			this.moving = data.id || '';
    		if (data.left <= 0) {    			
        		 data.left = 0;
    		}	
    		if (data.top <= 0) {
    			data.top = 0;
    		}else if (data.top >= self.dragAreaHeight) {
    			data.top = self.dragAreaHeight;
			} 
			let Leftline = this.videolist.map(item => {   //所有剪辑的右侧值集合
				item = item.left + item.width;
				return item
			}).find( item => {				
				return  Math.abs(data.left - item) < 8
			})						
			let rightLine = this.videolist.map(item => {   //所有剪辑的右侧值集合
				return item.left
			}).find( item => {				
				return  Math.abs(data.left + data.width - item) < 8
			})						
			// console.log("Leftline:",Leftline,"rightLine:",rightLine)
			// 吸附线出现判断
			if(Leftline || rightLine){
				this.absorbLeft = Leftline || rightLine;
				this.absorb = true;
				data.left = Leftline || rightLine-data.width;
			}else{
				this.absorb = false;
			}
        };
        document.onmouseup = (e) => {      
			let i = Math.round(data.top/self.trackHight); 	
			this.moving = '';
			if (this.trackNum[i].ismask) { // 轨道锁定时 
				data.top = startTop;
				data.left = startLeft;
			}else{   // 轨道没有锁定时 
				data.top = self.trackHight*i; 
				data.track = this.trackNum[i].order;
				if(data.id){
					// this.overlap (data);
				}				
			}
			this.absorb = false;  	
            document.onmousemove = null;
            document.onmouseup = null;
        };
	},
	//重叠处理
	overlap (data) {
		let overlapList = this.videolist.filter(item => {
			return item.track === data.track && item.id != data.id;
		})
		console.log("overlapList:",overlapList)
		let L = data.left, R = data.left + data.width;
		debugger
		for (let value of overlapList) {
			let vR = value.width + value.left;
			if(value.left <= L && vR - L >= 0){
				let w = Math.min(vR - L, data.width),
					lap = {left: L, width: w, top: value.top};
				this.videolist.push(lap);
			}else if(value.left > L && value.left < R){
				let w = Math.min(value.width, R - value.left),
					lap = {left: value.left, width: w, top: value.top};
				this.videolist.push(lap);
			}
		}
	},
  	selectVideo (index) {
  		this.current = index;
  	},
  	deletevideo () {
  		this.videolist.splice(this.current, 1);
  		this.current = -1;
  	},
  	//片段剪切
  	cutvideo () {
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
  		if ( newwidth <= 0 || addwidth<=0) {
  			this.$message({
	          message: '标尺不在选中片段内',
	          type: 'warning'
	        });
	        return
  		}		
  		origin.width = newwidth;
		origin.time = (newwidth/this.tickSize)*(this.sliderSec/2);
		origin.id = this.GenNonDuplicateID(3);
  		addData.left = x;
  		addData.width = addwidth;
		addData.time = (addwidth/this.tickSize)*(this.sliderSec/2);
		addData.id = this.GenNonDuplicateID(3);
  		this.videolist.splice(index, 1, origin);
		this.videolist.splice(index+1, 0, addData);
		console.log("videolist:",this.videolist)
  	},
  	canvasclick(e){
  		this.sliderLeft = e.offsetX;
	  },
	//生成id
	GenNonDuplicateID (randomLength){
	return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
	},
  	// 时间转换
  	secondsToTime(secs){
  		// calculate time of playhead
		let milliseconds = secs * 1000,
		    secsint = Math.floor(milliseconds/1000), //secs的整数部分,总秒数
		    milli = milliseconds % 1000, //secs的小数部分
		    sec = secsint % 60,             //秒
		    min = Math.floor(secsint/60) % 60,   //分		
		    hour = Math.floor(secsint/3600) % 24,   //小时
		    // frame = Math.round((milli / 1000.0) * 24) + 1;
		    frame = Math.floor((milli / 1000.0) * 25); //1秒等于25帧
		hour = ("000"+hour).slice(-2);
		min = ("000"+min).slice(-2);
		sec = ("000"+sec).slice(-2);
		// milli = ("000"+milli).slice(-2);
		frame = ("000"+frame).slice(-2);		
	    return { "hour":hour, "min":min, "sec":sec, "frame":frame };
  	},	
	// 画标尺
	drawRuler(){
		let myCanvas = document.getElementById("ruler"),
			w = this.rulerWidth,
			h = this.rulerHight,
		    c = myCanvas.getContext("2d"),
		    shotLine = Math.floor(h*3/4),
		    longLine = Math.floor(h/2),
		    scaleh = Math.floor(h/3),
		    tickSize = this.tickSize,
		    ratio = w / tickSize;
		c.clearRect(0, 0, w, h);
		c.strokeStyle = '#ccc';
		c.fillStyle = '#ccc';
		c.beginPath();
		c.font="12px Arial";
		for (let i = 0; i < ratio; i++) {			
			if (i%2===0) {
				let sec = this.sliderSec*i/2,
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
	},
	timetext(secs, len){
		let text = this.secondsToTime(secs), scale = '';
		if (len === 3) {
			scale = [text.hour, text.min, text.sec].join(":");
		} else {
			scale = [text.hour, text.min, text.sec, text.frame].join(":");
		}		
		return scale
	}
  },
  mounted(){
	    this.drawRuler();
	    document.onkeyup = (e) => {
			if(e.keyCode === 46){
				this.deletevideo();
			}
			if(e.ctrlKey && e.keyCode === 67){
				this.newVideoList = {...this.videolist[this.current]};
				console.log("newVideoList:",this.newVideoList)
			}
			if(e.ctrlKey && e.keyCode === 86){
				this.videolist.push(this.newVideoList);
				this.newVideoList = {};
			}
			if(e.keyCode === 37 || e.keyCode ===40){
				/* if(this.sliderLeft>0){
					this.sliderLeft--;
				} */
				clearInterval(this.timer); 
			}
			if(e.keyCode === 38 || e.keyCode ===39){					
				// this.sliderLeft++;	
				clearInterval(this.timer); 		
			}
		}
		document.onkeydown = (e) => {
			if(e.keyCode === 37 || e.keyCode ===40){
				this.sliderKey('left');
			}
			if(e.keyCode === 38 || e.keyCode ===39){					
				this.sliderKey('right');	
			}
		}
		// 让标尺的水平滚动跟随轨道滚动
		let scrollHorizontal = this.$refs.scrollHorizontal;
		scrollHorizontal.addEventListener('scroll', () => {
			this.$refs.trackDragArea.scrollLeft = scrollHorizontal.scrollLeft;
			this.$refs.rulerCanvas.scrollLeft = scrollHorizontal.scrollLeft;

		}, false)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet">
	::-webkit-scrollbar {
	    width: 5px;
	    height: 5px;
	    background: #000000;
	}
	::-webkit-scrollbar-thumb{
		background: #4b92ad;
		border-radius: 8px;
	}
	

	.cut-tool{
		height: calc(100% - 200px);
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
			height: calc(100% - 35px);
			overflow: hidden;		
			box-sizing: border-box;
			position: relative;
			.track-ruler-container{
				position: relative;
				height: calc(100% - 48px);
				width: 100%;
				overflow: scroll;
				display: flex;		
				.dragArea{
					position: relative;
					overflow-x: scroll;	
					overflow-y: hidden;			
					.selectedred{
						border-left: 2px solid red!important;
						border-right: 2px solid red!important;
						z-index: 9990;
					}
					.track_container{
						background-color: #000;
						background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(50,50,50,1)), color-stop(100%,rgba(6,6,6,1)));
						border-top-right-radius: 8px;
						border-bottom-right-radius: 8px;
						height: 100%;
						flex: auto;
						position: relative;
						font-size: 9pt;
						height: 64px;
						border-top: 1px solid #4b92ad;
						border-bottom: 1px solid #4b92ad;
						border-right: 1px solid #4b92ad;
						box-sizing :border-box;
						margin-bottom: 8px;					
					}
				}
				
			}
			.scroll-horizontal{
					position : absolute;
					bottom: 0;
					left: 145px;
					width: calc(100% - 155px);
					height: 6px;
					z-index: 99999;
					overflow-x: scroll;
			}
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
			width: calc(100% - 145px);			
			.ruler-canvas{
				height:100%;
				width:100%;
				overflow-x: scroll;
			}
			.hidescroll{
				width:100%;
				height:5px;
				position: absolute;
				top:48px;
				background: #2d2626;
			}
			.signdot{
				position: absolute;
				z-index: 9990;
				top: 31px;
				width:15px;
				height:15px;
				transform: translateX(-50%);
				background: url('../../assets/blue.png') center no-repeat;
			}
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
			.divide-line{
				position: absolute;
				z-index: 9998;
				top: 48px;
				background: #4b92ad;
				width:1px;
			}
		}
	}
	
	


 
</style>