export default [  
  { 
    path:"/music", 
    name:'music',
    component:() => import('@/pages/amusement/Music'),
    meta:{homePages:true,amusement:true}
  },
  
  { 
    path:"/timetool", 
    name:'timetool',
    component:() => import('@/pages/amusement/TimeTool'),
    meta:{homePages:true,amusement:true}
  },
 
]