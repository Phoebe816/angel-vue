const Mock = require("mockjs")
const Random = Mock.Random;

Mock.mock('/api/pwdLogin','post',function(options){
	return Mock.mock({
        "operateCallBackObj|1": [{
            'account': '@cname',
            'id|+1': 88,            
            'phoneNum|1':['18086011561'],
			'password|1':['123456hua']			
        }],
        'operateMessage|1':['手机号不存在','密码错误'],
		'success|1':[true]
    });
})


Mock.mock('/api/smsLogin','post',{
	'operateMessage|1':['手机号不存在','验证码错误'],
	'success|1':[true,false]
})

Mock.mock('/api/user/verifiedPhoneNum','get',{
	'success|1':[false]
})

Mock.mock(/\/api\/code\/getSmsCode/,'get',{
	'operateMessage|1':['手机号不存在','发送成功','发送失败'],
	'success|1':[true,false]
})

Mock.mock('/api/loginout','get',{
	'operateMessage|1':['登出成功'],
	'success|1':[true]
})

Mock.mock('/api/user/register','post',{
	'operateMessage|1':['注册成功'],
	'failMessage|1':['注册失败'],
	'success|1':[true]
})

Mock.mock('/api/user/perfectInfo','post',{
	'operateMessage|1':['保存成功'],
	'failMessage|1':['保存失败'],
	'success|1':[true]
})

Mock.mock(/\/api\/findRemoteDbinfos/,'get',{
	'packetInfo|3':{
		'databaseType|1':['ORACLE DATABASE','MYSQL DATABASE'],
		'system':'@NAME',
		'packet|1':['RACADB_20180119210924','RACADB_20180119210925','RACADB_20180119210926'],
		'version|1':['2.2.1','2.2.3','2.2.2'],
		'top':'@integer(1,10)',
		'awr':'@integer(1,10)',
		'topSegment':'@integer(1,10)',
		'monitorLog':'@integer(1,60)',
		'collectLog':'@integer(1,60)',
		'alarmLog':'@integer(1,60)',
		'collectTime':'@now'
	}
})

Mock.mock('/api/user/getHomepageOverview','get',{
	'array|20':[{
		'count':'@integer(1,10)',
		'type':'@integer(0,2)',
		'info|1':['orderinfo','dbinfo','reptinfo','revwinfo','srinfo','docinfo','consinfo','remoinfo','continfo']
	}]
})

Mock.mock('/api/findUserMessages','get',{
		'cart':'@integer(1,5)',
		'messages|1-4':['orderinfo','dbinfo','reptinfo','revwinfo'],
		'account': '@cname',
        'id|+1': 88,          
		'phoneNum|1':['18086011561'],
		'operateMessage|1':['登录成功'],
		'success|1':[true]
})

Mock.mock(/\/api\/sr/,'get',{
		'list|1-20':[{
		'author':'@NAME',
		'title':'@NAME',
		'schedule|1':['已读完','第10章','第20章','第30章'],
		'newsection|1':['2.2.1','2.2.3','2.2.2'],
		'updatetime':'@now'
	}]
})

Mock.mock('/api/sr/instSr','post', function(options){
	return Mock.mock({
        "user|1-3": [{
            'name': '@cname',
            'id|+1': 88
        }]
    });
})