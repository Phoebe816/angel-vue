import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'

import pages from './pages'
import system from './system'
import info from './info'
import amuse from './amusement'
import read from './read'
import webapp from './webapp'

Vue.use(Router)
    // 配置路由
const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('@/pages/homepage/Home'), //路由懒加载,即按需加载
        meta: { homePages: true }
    },
    ...system,
    ...pages,
    ...info,
    ...amuse,
    ...read,
    ...webapp
]

const router = new Router({
    mode: 'history', //去掉地址里面的#/
    routes,
    scrollBehavior(to, from, savedPosition) { //设置滚动行为
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    // console.log('111-', JSON.stringify(to), JSON.stringify(from))
    const token = store.getters.userInfo
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (token && token != "undefined") { //判断用户是否登录			
            if (Object.keys(from.query).length === 0) {
                next()
            } else {
                let redirect = from.query.redirect
                if (to.path === redirect) {
                    next()
                } else {
                    next({ path: redirect })
                }
            }
        } else {
            if (to.path === "/login") {
                next()
            } else {
                next({
                    path: "/login",
                    query: { redirect: to.fullPath } //将目的路由地址存入login的query中
                })
            }
        }

    } else {
        if (Object.keys(from.query).length === 0) { //判断路由来源是否有query，处理不是目的跳转的情况
            next()
        } else {
            let redirect = from.query.redirect //如果来源路由有query
            if (to.path === redirect) { //这行是解决next无限循环的问题
                next()
            } else {
                if (Object.keys(to.query).length > 0) { //加上query之后，就判断它有了query，就next()跳转进去
                    next()
                } else { //第一次跳转to路由是没有query的，我们需要加上query来记录我们需要的目标路由
                    next({
                        path: to.path,
                        query: { redirect: redirect }
                    })
                }
            }
        }
    }
    return
})

/*router.beforeEach((to, from ,next) => {
	const token = store.getters.userInfo
	if(to.matched.some(record => record.meta.requireAuth || record.meta.homePages)){
		//路由元信息requireAuth:true，或者homePages:true，则不做登录校验		
		if(Object.keys(from.query).length === 0){  //判断路由来源是否有query，处理不是目的跳转的情况
			next()
		}else{
			let redirect = from.query.redirect  //如果来源路由有query
			if(to.path === redirect){   //这行是解决next无限循环的问题
				next()
			}else{
				if(Object.keys(to.query).length > 0){ //加上query之后，就判断它有了query，就next()跳转进去
					next()
				}else{//第一次跳转to路由是没有query的，我们需要加上query来记录我们需要的目标路由
					next({
			          	path:to.path,
			          	query: {redirect: redirect}
			        })
				}
			}
		}
	}else{
		if(token&&token!="undefined"){    //判断用户是否登录	
		debugger		
			if(Object.keys(from.query).length === 0){
				next()
			}else{
				let redirect = from.query.redirect
				if(to.path === redirect){
					next()
				}else{
					next({path:redirect})
				}
			}
		}else{
			if(to.path==="/login"){
			    next()
			}else{
				next({
		          	path:"/login",
		          	query: {redirect: to.fullPath}   //将目的路由地址存入login的query中
		        })
			}
		}
	}
	return
})*/

export default router