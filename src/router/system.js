//系统模块
export default [
	{
	    path: '/login', 
	    name: 'login',
	    component:() => import('@/pages/system/Login'),
	    meta:{fullScreen:true}
	},
	{ 
    	path:"/register", 
    	name:'register',
    	component:() => import('@/pages/system/Register'),
    	meta:{fullScreen:true} 
   	 	// meta:{ title:'天使网注册'}
    },
    {
		path:'/resetPassword',
		name:'resetPassword',
		component:() => import('@/pages/system/resetPassword'),
		meta:{fullScreen:true}
	},
	{
		path:'/perfectInfo/:userName/:phoneNum/:password',
		name:'perfectInfo',
		component:() => import('@/pages/system/perfectInfo'),
		meta:{requireAuth:true,fullScreen:true}
	},
	{
		path:'/account',
		name:'account',
		component:() => import('@/pages/system/account'),
		meta:{requireAuth:true}
	}
]