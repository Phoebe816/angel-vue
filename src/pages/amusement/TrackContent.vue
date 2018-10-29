<template>
<div class="track">
	<div class="track_name" @contextmenu.prevent="showRightMenu(track.order, $event)">
		<div class="track_top">
			<div class="track_menu" ></div>
			<div class="track_label">{{ track.name }}</div> 			
		</div>
		<i class="locking-track iconfont icon-locking" v-if="track.ismask" 
			@click="track.ismask=!track.ismask" title="点击解锁轨道"></i>
		<ul class="rightlist" ref="rightNav" v-if="rightNavshow" :style="rightmenu.top+'px;left:'+rightmenu.left+'px;'">
			<li @click.stop.prevent = "clickRightMenu(track, item.order, $event)" v-for="(item, index) in rightlist">
				<i class="iconfont" :class="item.icon"></i>
				<span>{{ item.nav }}</span>
			</li>
		</ul>
	</div>	
	<div class="track_mask" v-if="track.ismask" :style="{width: trackwidth + 'px'}"></div>
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
  			icon: 'icon-icon_add',
  			nav: "在其上添加轨道"
  		},{
  			order: 2,
  			icon: 'icon-icon_add',
  			nav: "在其下添加轨道"	
  		},{
  			order: 3,
			icon: 'icon-rewrite',
  			nav: "重命名轨道"	
  		},{
  			order: 4,
  			icon: 'icon-locking',
  			nav: "锁定轨道"	
  		},{
  			order: 5,
  		  	icon: 'icon-icon_less',
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
  	 },
  	 trackwidth: {
  	 	type: Number
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
	.icon-icon_add{
		color: #6B8E23;
	}
	.icon-locking, .icon-kaisuohuansuo{
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
		box-shadow: 0px 0px 10px #000;
		border-top-left-radius: 8px;
	    border-bottom-left-radius: 8px;
		border-top: 1px solid #4B92AD;
		border-bottom: 1px solid #4B92AD;
		border-left: 1px solid #4B92AD;
		box-sizing :border-box;
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
		.locking-track{
			position: absolute;
			right: 5px;
			bottom: 5px;
		}
		.rightlist {
			position: absolute;
			width: 150px;
			background: #424242;
			font-size: 12px;
			box-shadow: 3px 3px 3px #000;
			z-index: 100010
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
	    cursor: not-allowed;
	}

</style>
