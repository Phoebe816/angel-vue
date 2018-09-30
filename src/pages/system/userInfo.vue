<template>
<el-main>
	<div class="bg_gray">
		<h5>查看、完善账户信息，或更新个人信息。</h5>
	</div>
	<div class="submitForm">
		<el-form ref="userInfo" :model="userInfo" label-width="150px">
			<h5>账号信息</h5>
			<el-form-item label="手机号">
				{{userInfo.phoneNum}}
			</el-form-item>
			<el-form-item label="用户名">
				<el-input v-model="userInfo.account"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="userInfo.email"></el-input>
			</el-form-item>
			<h5>基础信息</h5>
			<el-form-item label="公司/个人名称">
		    	<el-input v-model="userInfo.company"></el-input>
		  	</el-form-item>
		  	<el-form-item label="行业">
				<el-select v-model="userInfo.industry" placeholder="请选择行业" :style="{width:'100%'}">
					<el-option v-for="value in trade" :key="value" :label="value" :value="value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色">
				<el-select v-model="userInfo.post" placeholder="请选择角色" :style="{width:'100%'}">
					<el-option v-for="value in roles" :key="value" :label="value" :value="value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="数据规模">
				<el-select v-model="userInfo.description" placeholder="请选择数据规模" :style="{width:'100%'}">
					<el-option v-for="value in records" :key="value" :label="value" :value="value"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<hr>
		<div class="btn_right">
			<el-button type="primary" @click="submitForm">保存</el-button>
		</div>
	</div>
</el-main>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import {submitLoginApi} from '@/apis'
export default {
	data(){
		return {
			trade:['金融服务','通信运营','能源交通','政府/公共事业','制造业/商贸','其他'],
			roles:['DBA','研发','主管','CTO','其他'],
			records:['1个人，2套库，100GB','3个人，10套库，1TB','10个人，100套库，1PB','其他']
		}
	},
	computed:{
		...mapGetters(['userInfo'])
	},
	methods:{
		...mapActions(['UserLogin']),
		submitForm(){
			submitLoginApi('user/perfectInfo',this.userInfo).then((res)=>{
				if(res.status === 200){
					this.UserLogin(this.userInfo)
					this.$message({
						message:res.data.operateMessage,
						type:res.data.success === true ? 'success' : 'error'
					})
				}
			})
		}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
</style>