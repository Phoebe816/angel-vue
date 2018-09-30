<template>
	<el-card class="vertical-horizontal">
		<div slot="header" class="text-center">注册：完善信息</div>
		<el-form
			ref="perfectInfo"
			:model="perfectInfo"
			:rules="rules"
			size="mini"
			label-width="20%"
			status-icon>
			<el-form-item prop="account" label="姓名">
				<el-input v-model="perfectInfo.account" placeholder="请输入真实姓名"></el-input>
			</el-form-item>					
			<el-form-item prop="email" :rules=[rules.email] label="邮箱">
				<el-input v-model="perfectInfo.email" placeholder="邮箱"></el-input>
			</el-form-item>
			<el-form-item label="公司名称">
				<el-input v-model="perfectInfo.company" placeholder="公司名称或个人"></el-input>
			</el-form-item>
			<el-form-item label="行业">
				<el-select v-model="perfectInfo.industry" placeholder="请选择行业" :style="{width:'100%'}">
					<el-option v-for="value in trade" :key="value" :label="value" :value="value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色">
				<el-select v-model="perfectInfo.post" placeholder="请选择角色" :style="{width:'100%'}">
					<el-option v-for="value in roles" :key="value" :label="value" :value="value"></el-option>
				</el-select>
			</el-form-item>			
			<el-form-item>
				<el-button type="primary" @click="onSubmit('perfectInfo')">提交</el-button>
			</el-form-item>
		</el-form>
		<hr>
		<p class="text-center">如果您已有账号，则直接 <router-link :to="{path:'/login'}">登录</router-link></p>
	</el-card>
</template>
<script>
import {validator} from '@/utils'
import {submitLoginApi} from '@/apis'
import {mapActions} from 'vuex'
export default {
	name:'perfectInfo',
	data(){
		return {
			perfectInfo:{},
			rules:validator,
			trade:['金融服务','通信运营','能源交通','政府/公共事业','制造业/商贸','其他'],
			roles:['DBA','研发','主管','CTO','其他']
		}
	},
	methods:{
		...mapActions(['UserLogin']),
		onSubmit(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					submitLoginApi('user/perfectInfo',this.perfectInfo).then((res)=>{
						if(res.status === 200){
							let type = 'error'
							if(res.data.success === true){
								type = 'success';
								submitLoginApi('pwdLogin',this.perfectInfo).then((res)=>{
									if(res.status === 200){
										let _data = res.data;
										if(_data.success === true){
											this.UserLogin(_data.operateCallBackObj);
											this.$router.push('/login');
										}
									}
								})
							}
							this.$message({
								message:res.data.operateMessage,
								type:type
							})
						}
					})
				}
			})
		}
	},
	created(){
		this.perfectInfo.userName = this.$route.params.userName;
		this.perfectInfo.phoneNum = this.$route.params.phoneNum;
		this.perfectInfo.password = this.$route.params.password;
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.el-card{
	font-size 14px
	width 60%
	.el-form{
		padding-right 30px
		.el-button{
			width 100%
		}
	}
}
</style>