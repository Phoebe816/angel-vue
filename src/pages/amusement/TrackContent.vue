<template>
<div class="track" :style="'width:'+width+'px;'">
	<div class="track_name" @contextmenu.prevent="showRightMenu(track.order, $event)">
		<div class="track_top">
			<div class="track_menu" ></div>
			<div class="track_label">{{ track.name }}</div> 
		</div>
		<ul class="rightlist" ref="rightNav" v-if="rightNavshow" :style="'top:'+rightmenu.top+'px;left:'+rightmenu.left+'px;'">
			<li @click.stop.prevent = "clickRightMenu(track, item.order, $event)" v-for="(item, index) in rightlist">
				<i class="iconfont" :class="item.class"></i><span>{{ item.nav }}</span>
			</li>
		</ul>
	</div>
	<div class="track_container">
			<!-- <div class="videobar" :style="'width:'+ item.width+'px;left:'+ item.left+'px;'"
				v-for="(item, index) in videoNum" :key="index">
				<div class="clip_top">
					<div class="track_menu"></div>
					<div class="clip_title" :title="item.title">{{ item.title }}</div>
				</div>
				<img :src="item.address" :alt="item.altname">
				<div class="resizable-handle resizable-e" @mousedown="resize(index, l)"></div>
				<div class="resizable-handle resizable-w" @mousedown="resize(index, w)"></div>
			</div> -->
	</div>
	<div class="track_mask" v-if="track.ismask"></div>
</div>
</template>
<script>
export default {
  name: "trackc",
  data(){
  	return{
  		// videoNum: 1
  		rightlist: [{
  			order: 1,
  			class: 'icon-icon_add',
  			nav: "在其上添加轨道"
  		},{
  			order: 2,
  			class: 'icon-icon_add',
  			nav: "在其下添加轨道"	
  		},{
  			order: 3,
			class: 'icon-rewrite',
  			nav: "重命名轨道"	
  		},{
  			order: 4,
  			class: 'icon-locking',
  			nav: "锁定轨道"	
  		},{
  			order: 5,
  		  	class: 'icon-icon_less',
  			nav: "删除轨道"		
  		}]
  	}
  },
  props: {
  	 track: {
  	 	type: Object
  	 },
  	 width: {
  	 	type: Number
  	 },
  	 rightNavshow: {
  	 	type: Boolean
  	 },
  	 rightmenu: {
  	 	type: Object
  	 }
  	/* videoNum: {
  	 	type: Array
  	 }*/
  },
  methods: {
	  	showRightMenu (order, e) {
	  		this.$emit('showRightMenu', order, e);	  	
	  	},
	  	clickRightMenu (track, btn, e) {
	  		this.$emit('clickRightMenu', track, btn, e);	 
	  	}
   }
}
</script>
<style scoped lang="stylus" rel="stylesheet">
	@import '../../assets/css/index.styl'
	.icon-icon_add{
		color: #6B8E23;
	}
	.icon-locking{
		color: #5F9EA0;
	}
	.icon-icon_less{
		color: #EE7621;
	}
	.icon-rewrite {

	}
	.track{
		height: 64px;
		margin-bottom: 8px;
		box-shadow: 0px 0px 10px #000;
		border-radius: 8px;
		border: 1px solid #4B92AD;
		display: flex;
		position: relative;
	}
	.track_name {
	    width: 140px;
	    height: 100%;
	    color: #fff;
	    font-size: 9pt;
	    background-color: #000;    
		flex: none;	
		border-top-left-radius: 8px;
	    border-bottom-left-radius: 8px;
	    .track_top {
		    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.20)), color-stop(100%,rgba(255,255,255,0)));
		    border-top-left-radius: 8px;
		    border-bottom-left-radius: 8px;
		    align-items: flex-end;
		    display: flex;
		    padding: 2px;
			.track_label {
				flex: auto;
			    padding-left: 4px;
			    text-shadow: 0 0 10px #ffffff;
			}
		}
		.rightlist {
			position: absolute;
			width: 150px;
			background: #424242;
			font-size: 12px;
			box-shadow: 3px 3px 3px #000;
			z-index: 10001
			li{
				padding: 5px;
				cursor: default;
				span{
					margin-left: 5px;
					color: #fff;
				}
				&:hover{
					background: #6495ED;
				}
				
			}
		}	
	}
	.track_menu {
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
	.track_container{
		width: calc(100% - 140px);
	    background-color: #000;
	    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(50,50,50,1)), color-stop(100%,rgba(6,6,6,1)));
	    border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	    height: 100%;
	    flex: auto;
	    position: relative;
	    font-size: 9pt;
	}
	.track_mask{
		width: calc(100% - 140px);
	    background-color: rgba(0,0,0,0);
	    border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	    height: 100%;
	    flex: auto;
	    position: absolute;
	    left: 140px;
	    top: 0;
	    z-index: 99999;
	}

</style>
