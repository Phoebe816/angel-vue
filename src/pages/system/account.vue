<template>
<el-main>
	<div class="bg_gray">
		<h5>管理员账户新增子账户信息。</h5>
	</div>
	<div class="submitForm">
		<el-form 
			ref="accountInfo" 
			:model="accountInfo" 
			:rules="rules" 
			label-width="150px"
			status-icon>
			<h5>账号信息</h5>
			<el-form-item prop="phoneNum" label="手机号">
				<el-input v-model="accountInfo.phoneNum" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item prop="password" label="密码">
				<el-input type="password" v-model="accountInfo.password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="roleName" :rules="rules.required">
				<el-select v-model="accountInfo.roleName" placeholder="请选择用户角色" :style="{width:'100%'}">
					<el-option 
						v-for="item in roles" 
						:key="item.value" 
						:label="item.label" 
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="等级" prop="grade" :rules="rules.required">
				<el-select v-model="accountInfo.grade" placeholder="请选择用户等级" :style="{width:'100%'}">
					<el-option 
						v-for="(item,index) in grades" 
						:key="index" 
						:label="item" 
						:value="index">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="用户名称">
				<el-input v-model="accountInfo.account" placeholder="请输入用户姓名"></el-input>
			</el-form-item>
			<el-form-item prop="email" label="邮箱">
				<el-input v-model="accountInfo.email" placeholder="请输入用户邮箱"></el-input>
			</el-form-item>
		</el-form>
		<hr>
		<div class="btn_right">
			<el-button type="primary" @click="submitForm">添加</el-button>
		</div>
	</div>
</el-main>
</template>
<script type="ecmascript-6">
import {submitLoginApi} from '@/apis'
import {validator,validCallback} from '@/utils'
export default {
	data(){
		return {
			accountInfo:{},
			roles:[{value:'user',label:'普通用户'},{value:'dba',label:'DBA'}],
			grades:['注册用户','标准云服务','高级云服务','专家云服务','平台管理员','平台销售'],
			rules:validator
		}
	},
	methods:{
		submitForm(){
			validCallback(this,'accountInfo', () => {
				submitLoginApi('user/addAdminUserInfo',this.accountInfo).then((res)=>{
					if(res.status === 200){
						let type = 'error';
						if(res.data.success === true){
							type = 'success';
							this.accountInfo = {};
						}
						this.$message({
							message:res.data.operateMessage,
							type:type
						})
					}
				})
			})
		}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
</style>