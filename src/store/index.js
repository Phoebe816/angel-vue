import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'
Vue.use(Vuex)

import inspection_store from './modules/inspection'
import common_store from './modules/common'

const store = new Vuex.Store({
  	modules:{
    	inspection:inspection_store,
    	common:common_store
  	},
  	state:{
		userInfo:null,
		token:sessionStorage.getItem('token')
	},
	getters:{
		userInfo(state){
			if(!state.userInfo){
				state.userInfo = sessionStorage.getItem('userInfo');
			}
			return state.userInfo
		}
	},
	mutations:{
		LOGIN:(state,data) => {
			state.userInfo = data;
			sessionStorage.setItem('userInfo',JSON.stringify(data));
		},
		LOGOUT:(state) => {
			state.userInfo = null;
			sessionStorage.removeItem('userInfo');
		}
	},
	actions:{
		UserLogin({commit},data){
			commit('LOGIN',data)
		},
		UserLoginOut({commit},data){
			commit('LOGOUT',data)
		}
	}
})

export default store
/*sessionStorage 是HTML5新增的一个会话存储对象，用于临时保存同一窗口(或标签页)的数据，
在关闭窗口或标签页之后将会删除这些数据。
string sessionStorage.key(int index) ：
返回当前 sessionStorage 对象的第index序号的key名称。若没有返回null。

方法 string sessionStorage.getItem(string key) ：返回键名(key)对应的值(value)。若没有返回null。

方法 void sessionStorage.setItem(string key, string value) ：
该方法接受一个键名(key)和值(value)作为参数，将键值对添加到存储中；如果键名存在，则更新其对应的值。

方法 void sessionStorage.removeItem(string key) ：将指定的键名(key)从 sessionStorage 对象中移除。

方法 void sessionStorage.clear() ：清除 sessionStorage 对象所有的项。*/