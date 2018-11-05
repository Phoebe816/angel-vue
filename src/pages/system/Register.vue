<template>	
    <el-main class="register-container horizontal-center">    	
    	<h1 class="register-header">
        	<router-link to="/" title="天使网首页" class="register-tohome">天使网</router-link>| 用户注册
        </h1>                
		<div class="register-card">	
			<div class="register-welcome">欢迎注册天使网</div>
			<el-container>
				<el-main class="register-form">			
					<el-form					
						:label-position="labelPosition"
						label-width="90px"
						size="medium"
						ref="register"
						:model="register"
						:rules="rules"
						status-icon>	
						<el-form-item prop="userName" label="用户名">
							<el-input v-model="register.userName" placeholder="请输入用户名" class="code-input"></el-input>
						</el-form-item>						
						<el-form-item prop="phoneNum" label="手机号">
							<el-input v-model="register.phoneNum" placeholder="可用于登录和找回密码" class="code-input"></el-input>
						</el-form-item>
						<el-form-item prop="password" label="密码">
							<el-input type="password" v-model="register.password" placeholder="请设置登录密码" class="code-input"></el-input>
						</el-form-item>	
						<el-form-item prop="password" label="确认密码">
							<el-input type="password" v-model="register.password" placeholder="请重新输入密码" class="code-input"></el-input>
						</el-form-item>	
						<el-form-item prop="email" label="邮箱">
							<el-input type="email" v-model="register.password" placeholder="请重新输入邮箱" class="code-input"></el-input>
						</el-form-item>								
						<!-- <el-form-item prop="smsCode" :rules="rules.required">
							<el-input v-model="register.smsCode" class="code-input" placeholder="验证码"></el-input>
							<el-button @click="getCode" :disabled="codeDisabled">{{countdown == 60 ? '免费获取验证码' : '重新发送(' + countdown + ')'}}</el-button>
						</el-form-item> -->
						<el-form-item size="large">
							<el-button type="primary" class="code-input" :disabled="disabled"
							@click="onSubmit('register')">立即注册</el-button>					
						</el-form-item>
					</el-form>
				</el-main>
				<el-aside>					
					<h3 class="border-dash">我已注册，<router-link :to="{path:'/login'}">直接登录</router-link></h3>
					<h3 class="reg-sms-title">快速注册</h3>         			            
            		<p class="reg-sms-qrcode">
               		<!-- 二维码扫描 -->
               			<span>请使用微信进行扫码</span>
	                	<img src=""> 	                
		            </p>		         					
				</el-aside>
			</el-container>
		</div>		
	</el-main>
</template>
<script>
import {validator,getVeriCode} from '@/utils'
import {submitLoginApi,validPhoneApi} from '@/apis'
import {mapActions} from 'vuex'
export default {
	name:'register',
	data(){
		return {
			register:{},
			rules:validator,
			countdown:60,
			codeDisabled:false,
			labelPosition:'right',
			disabled:false
		}
	},
	methods:{
		onSubmit(formName){
			this.disabled = true;
			this.$refs[formName].validate((valid) => {
				if(valid){
					submitLoginApi('user/register',this.register).then((res)=>{
						if(res.status === 200){
							let type = "error";
							debugger
							this.disabled = false;
							if(res.data.success === true){
								type = "success";
								this.$router.push({
									name: 'perfectInfo',
									params: {
										userName: res.data.userName,
										phoneNum: res.data.phoneNum,
										password: res.data.password
									}
								});
							}
							this.$message({
								message:res.data.operateMessage,
								type:type
							})
						}
					})
				}
			})
		},
		getCode(){
			validPhoneApi(this.register.phoneNum).then((res) => {
				if(res.status === 200){
					if(res.data){
						this.$message({
							message:'手机号已注册',
							type:'error'
						})
					}else{
						getVeriCode(this,'register',this.register.phoneNum,false)
					}
				}
			})
		}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet">
@import '../../assets/css/index.styl'
.register-container{  
  width:75%;   
  max-width : 900px; 
  .register-card{   
    width:100%;   
    border-radius: 8px;     
    box-shadow: 5px 5px 5px;  
    background: $--background-color-base;    
    .register-welcome{     
        height: 40px;
        font:normal 15px Verdana;
        line-height: 40px;
        text-indent: 1em;   
        border-radius: 8px 8px 0px 0px;    
        background: $--background-color-wel; 
    }  
    .register-form{
      padding: 40px;
      width:65%;        
      font-weight: bold;          
    }
    button{      
      font-size: 16px;
      background: $--background-color-skyblue;  
      color: $--color-black;  
      font-weight: bold;
      border: 1px solid $--color-border-1; 
      transition: all 2s;
      &:hover{
         background: $--background-color-blue;
      }
    }
    .el-aside{
      margin: 40px 0px;  
      padding:0px 20px; 
      font-size: 1.6rem;
      color: $--color-black; 
      border-left: 1px solid $--color-border-1;         
    }
  }
}
.el-aside a{
	color: $--color-ablue;
}
</style>
