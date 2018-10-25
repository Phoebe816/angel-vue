<template>
<div class="videobar" @click.stop.prevent = "selectVideo" 
	@mousedown.stop.prevent="dragstart(videoNum, $event)"
	:style="'width:'+ videoNum.width+'px;left:'+ videoNum.left+'px;top:'+videoNum.top+'px;'">
	<div class="clip_top">
		<div class="clip_menu"></div>
		<div class="clip_title" :title="videoNum.title">{{ videoNum.title }}</div>
	</div>
	<img :src="videoNum.address" :alt="videoNum.altname">
	<div class="resizable-handle resizable-e" @mousedown.stop.prevent="resize(videoNum, 'L', $event)"></div>
	<div class="resizable-handle resizable-w" @mousedown.stop.prevent="resize(videoNum, 'W', $event)"></div>
</div>
</template>
<script>
export default {
  name: "videoimg",
  data(){
  	return{
  		// videoNum: 1

  	}
  },
  props: {
  	 videoNum: {
  	 	type: Object
  	 }
  },
  methods: {
      resize (data, derect, e) {
      	this.$emit('resize', data, derect, e);
      },
      selectVideo () {
      	this.$emit('selectVideo');
      },
      dragstart (data, e) {
      	this.$emit('dragstart', data, e);
      }
   }
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.videobar{
	position: absolute;
    z-index: 1000;
    display: inline-block;
    cursor: move;
    color: #fff;
    min-width: 0px;
    height: 64px;   
    background-color: #ef7f00;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(82,82,82,1)), color-stop(100%,rgba(34,38,40,1)));
    border-radius: 8px;
    border: 1px solid #4b92ad;
    border-left: 2px solid #4b92ad;
    border-right: 2px solid #4b92ad;
    box-shadow: 0px 0px 10px #000;
    opacity: 0.95;
    box-sizing: border-box;
	overflow: hidden;
    .clip_top {
	    display: -webkit-flex;
	    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.20)), color-stop(100%,rgba(255,255,255,0)));
	    border-radius: 8px;
	    overflow: hidden;
	    align-items: center;	
	    height: 20px;
	    .clip_menu {
		    cursor: pointer;
		    margin: 0 4px;
		    width: 12px;
		    height: 12px;
		    flex: none;
		    background: url('../../assets/menu.png') center;
		    &:hover {
		    	background: url('../../assets/menu_hover.png') center;
		    }
		}
	    .clip_title{
	    	cursor: move;
		    min-width: 0px;
		    margin-left: 2px;
		    color: #fff;
		    font-weight: bold;
		    white-space: nowrap;
		    overflow: hidden;
		    text-overflow: ellipsis;
	    }    
	}
	img{
		height:38px;
		margin-left: 5px;
	}
	.resizable-handle{
		position: absolute;
	    font-size: 0.1px;
	    display: block;
	    -ms-touch-action: none;
	    touch-action: none;
	    width: 7px;
	    top: 0;
	    height: 100%;
	    z-index: 1001;
	}
	.resizable-w {
	    cursor: w-resize;
	    right: -5px;
	}
	.resizable-e {
	    cursor: e-resize;	    
	    left: -5px;
	}
}

</style>
