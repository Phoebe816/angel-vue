export default {
	state:{
		shopCartNum:0,
		messageNum:0
	},
	getters:{
		shopCartNum(state){
			if(state.shopCartNum == 0){
				state.shopCartNum = sessionStorage.getItem('shopCartNum')
			}
			return state.shopCartNum
		},
		messageNum(state){
			if(state.messageNum == 0){
				state.messageNum = sessionStorage.getItem('messageNum')
			}
			return state.messageNum
		}
	},
	mutations:{
		setShopCart(state,data){
			state.shopCartNum = data
			sessionStorage.setItem('shopCartNum',data)
		},
		setMessageNum(state,data){
			state.messageNum = data
			sessionStorage.setItem('messageNum',data)
		}
	},
	actions:{
		ChangeShopCart({commit},data){
			commit('setShopCart',data)
		},
		ChangeMessageNum({commit},data){
			commit('setMessageNum',data)
		}
	}
}