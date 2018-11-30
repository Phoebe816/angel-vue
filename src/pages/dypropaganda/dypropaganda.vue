<!-- 1、模板 -->
<template>
  <el-main style="background: #fff;padding: 0;">   
    <div class="re-content">
        <div class="search-container">
            <div class="classify-search flex-box" id="classify_search">
                <div style="flex: none;width: 70px;height: 26px;">
                    <span class="manu_label">公告状态：</span>
                </div>
                <div class="flex-box classify-label-container" id="status_container">
                    <span class="classify-label active" data-value="">全 部</span>
                    <span class="classify-label" data-value="2">已发</span>
                    <span class="classify-label" data-value="3">撤回</span>
                    <span class="classify-label" data-value="1">草稿</span>
                </div>
            </div>
            <div class="classify-search flex-box">
                <div style="flex: none;width: 70px;height: 100%;">
                    <span class="manu_label">发布日期：</span>
                </div>
                <div class="flex-box classify-label-container" id="classify_time_search">
                    <span class="classify-label active">全 部</span>
                    <span class="classify-label">今天</span>
                    <span class="classify-label">近一周</span>
                    <span class="classify-label">近一月</span>
                    <span class="classify-label">近一年</span>
                </div>
            </div>
            <div class="search-tool flex-box" style="height: 58px;line-height: 58px;margin-bottom: 16px;">
                <div style="flex: auto;" class="flex-box">
                    <span style="width: 56px;">关键字：</span>
                    <input type="text" id="select_article" class="article-search" placeholder="标题、上报单位、正文、选题地址">
                    <button class="btn btn-blue" id="search_btn">检索</button>
                    <button class="btn btn-default" id="reset_btn" style="margin-left: 6px;">重置</button>
                </div>
            </div>
            <div class="flex-box new-notice-btns" id="new_notice_btn">
                <span class="addnotice-icon"></span>
                <span>新建公告</span>
            </div>
        </div>
        <!-- 文章列表 -->
        <div class="notice-container-all" id="article_container_all">
            <Demo></Demo>           
        </div>
    </div>
  </el-main>
</template>
<!-- 2、行为：处理逻辑 -->

<script>
import Demo from './Demo'


export default {
  name: 'dypropaganda',
  components:{
  	Demo
  }
 /* mounted: function() {
    document.getElementsByTagName("html")[0].className="gwh_gamegb"; 
  }*/
 
}
</script>
<!-- 3、样式：解决样式 -->
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.re-content {
    width: 100%;
    max-width: 1210px;
    margin: 0 auto;
    height: 100%;
    padding: 16px 20px 29px;
    position: relative;
    box-sizing: border-box;
    .search-container{
    	padding: 0 12px;
    	font-size: 14px;
    	.classify-search{
    		border-bottom: 1px dotted #CECECE;
		    height: 44px;
		    line-height: 26px;
		    box-sizing: border-box;
		    padding: 9px 0;
		    align-items: flex-start;
		    .classify-label-container {
			    width: calc(100% - 140px);
			    flex-wrap: wrap;
			    overflow: hidden;
			    height: 100%;
			    box-sizing: border-box;
			    margin-left: 10px;
			    .classify-label {
				    width: 62px;
				    padding: 0 7px;
				    display: inline-block;
				    box-sizing: border-box;
				    cursor: pointer;
				    flex: none;
				    height: 26px;
				    line-height: 26px;
				}
				.active {
				    color: #4B8ADD;
				}
			}
    	}
    	.article-search {
		    width: 270px;
		    height: 32px;
		    margin: 0 12px;
		    border: 1px solid #CFCFCF;
		    border-radius: 4px;
		    padding: 0 9px;
		    box-sizing: border-box;
		}
		.new-notice-btns {
		    border: 1px solid #4B8ADD;
		    border-radius: 4px;
		    width: 108px;
		    height: 32px;
		    box-sizing: border-box;
		    cursor: pointer;
		    font-size: 14px;
		    color: #4B8ADD;
		    .addnotice-icon {
			    background: url('../../assets/propaganda/add_normal.svg') center no-repeat;
			    width: 38px;
			    height: 100%;
			}
		}
    }
}
.flex-box{
	display: flex;
	align-items: center;
}
.btn {
    border-radius: 4px;
    width: 50px;
    height: 32px;
    cursor: pointer;
    outline: none;
    border: 1px solid transparent;
}
.btn-blue {
    background: #4B8ADD;
    color: #FFF;
    border-color: #4B8ADD;
    box-shadow: none;
}
.btn-default {
    background: #FFFFFF;
    border: 1px solid #CFCFCF;
}
input{
	outline: none;
}
</style>