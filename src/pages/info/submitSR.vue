<template>
<el-main>
	<h3 class="sr_title">提交SR</h3>
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">    	
    	<el-row :gutter="20">
    		<el-col :span="12">
    			<el-form-item label="书名" prop="title" :rules="rules.required">
    				<el-input v-model="formData.title" placeholder="请输入书名"></el-input>
    			</el-form-item>
    		</el-col>
    		<el-col :span="12">
    			<el-form-item label="作者" prop="author" :rules="rules.required">
			    	<el-input v-model="formData.author" placeholder="作者"></el-input>
		    	</el-form-item>
    		</el-col>
    	</el-row>
    	<!-- <el-form-item label="问题描述" prop="srinfo" :rules="rules.required">
    		<el-input type="textarea" v-model="formData.srinfo" :autosize="size" placeholder="请输入问题描述"></el-input>
    	</el-form-item> -->
    	<el-row :gutter="20">
    		<el-col :span="12">
    			<el-form-item label="最近更新章节" prop="newsection" :rules="rules.required">
	    			<el-select v-model="formData.newsection" placeholder="最近更新章节">
			    		<el-option
			    		v-for="item in options" 
			    		:key="item.values" 
			    		:label="item.values" 
			    		:value="item.values"
			    		v-if="item.name === 'section'">
			    		</el-option>
	    			</el-select>
				</el-form-item>
    		</el-col>
    		<el-col :span="12">
    			<el-form-item label="更新时间" prop="updatetime" :rules="rules.required">
			    	<el-input v-model="formData.updatetime" placeholder="更新时间"></el-input>
		    	</el-form-item>
    		</el-col>
    	</el-row>
    	<el-form-item label="阅读进度" prop="schedule" :rules="rules.required">
	    	<el-input v-model="formData.schedule" placeholder="阅读进度"></el-input>
		</el-form-item> 
		<el-form-item label="分类" prop="classify" :rules="rules.required">
	    	<el-select v-model="formData.classify" placeholder="分类">
			    		<el-option
			    		v-for="item in options" 
			    		:key="item.values" 
			    		:label="item.values" 
			    		:value="item.values"
			    		v-if="item.name === 'TYPE'">
			    		</el-option>
	    			</el-select>
		</el-form-item>    	
    	<el-form-item label="对接人姓名">
    		<el-input v-model="formData.contname" placeholder="姓名"></el-input>
    	</el-form-item>    	
    	<el-form-item label="对接人电话" prop="conttel" :rules="[rules.required,rules.phoneNum]">
    		<el-input v-model="formData.conttel" placeholder="电话"></el-input>
    	</el-form-item>
    </el-form>
    <div class="sr_decs">trace文件等附件请提交SR后单独上传。</div>
    <div class="submit_btn">
		<el-button type="primary" @click="submitForm" class="mrgr30">提交</el-button>
		<router-link :to="'/serverRequest'">
			<el-button>取消</el-button>
		</router-link>
	</div>
</el-main>
</template>
<script>
import {validator,validCallback} from '@/utils'
import {getSROptions,submitSRApi} from '@/apis'
import {mapGetters} from 'vuex'
import router from '@/router'
export default {
	data(){
		return {
			options:[{
				name: 'TYPE',
				values: '玄幻'
			},{
				name: 'TYPE',
				values: '科幻'
			},{
				name: 'TYPE',
				values: '言情'
			},{
				name: 'section',
				values: '第12章'
			},{
				name: 'section',
				values: '第23章'
			}],
			formData:{},
			rules:validator,
			size:{minRows:4,maxRows:18}
		}
	},
	computed:{
		...mapGetters(['userInfo'])
	},
	methods:{
		submitForm(){
			validCallback(this,'form',() => {
				submitSRApi('sr/instSr',this.formData).then((response) => {
					if(response.status == 200){
						router.push('/read');
					}
				})
			})
		}
	},
	created(){
		let innerHeight = window.innerHeight;
		if(innerHeight > 615){
			this.size.minRows = (innerHeight - 615)/20 + 4
		}
	},
	mounted(){
		this.formData.contname = this.userInfo.account
		this.formData.conttel = this.userInfo.phoneNum
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.el-main{
	background-color $--background-color-base
}
.submit_btn{
	float right
	margin-right 30px
	.mrgr30{
		margin-right 30px
	}
}
.sr_decs{
	font-size: 12px;
    text-indent: 2em;
    color: #606266;
}
.sr_title{
	text-align center
	margin-bottom 20px
}
</style>