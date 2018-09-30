//read模块路由
export default [
	{
		path:'/info',
		name:'info',
		component:() => import('@/pages/info/infoHome'),
		meta:{info:true}
	},
	{
		path:'/bookshelf',
		name:'bookshelf',
		component:() => import('@/pages/info/bookshelf'),
		meta:{info:true}
	},
	{
		path:'/read/submitSR',
		name:'submitSR',
		component:() => import('@/pages/info/submitSR'),
		meta:{info:true}
	},
	{
		path:'/serverInfo',
		name:'serverInfo',
		component:() => import('@/pages/info/SRInfo'),
		meta:{info:true}		
	},
	{
		path:'/shopCart',
		name:'shopCart',
		component:() => import('@/pages/info/shopCart'),
		meta:{info:true}
	}
]
