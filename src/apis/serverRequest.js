import {
	ajax,
	BASEURL
} from '@/utils'

//获取sr列表api
export const getServerListApi = (params = {}) => ajax({url:BASEURL + 'sr',params:params})

//获取sr列表详细数据api
export const getServerListInfoApi = (id) => ajax({url:BASEURL + 'sr/' + id})

//获取sr问答数据api
export const getAqInfoApi = (id) => ajax({url:BASEURL + 'sr/aq/' + id})

//提交SR获取下拉选项
export const getSROptions = () => ajax({url:BASEURL + 'sr/pa'})

//SR模块下公共的提交方法
export const submitSRApi = (url,params = {}) => ajax({
	url:BASEURL+url,
	method:'post',
	data:JSON.stringify(params),
	headers:{'Content-Type':'application/json'}
})

//关闭SR
export const closeSRApi = (id) => ajax({
	url:BASEURL + 'sr/close/' + id,
	method:'post'
})
