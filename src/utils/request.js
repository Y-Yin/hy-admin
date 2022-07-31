import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from './auth'
import store from '@/store'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout:5000,
})


// 请求拦截器
service.interceptors.request.use(config =>{
    // token 存在
    if(store.getters.token){
        // 前端校验登陆是否超时
        if(isCheckTimeout()){
            store.dispatch('user/logout')
            return Promise.reject(new Error('token失效了'))
        }

        config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
},error =>{
    return Promise.reject(error)
})


// 响应拦截器
service.interceptors.response.use(
    response=>{
        // 判断请求是否成功
        // 成功返回解析后到数据
        // 失败（请求成功，业务失败），消息提示
        const { code , data={} , msg='' } = response.data
        if(code === 200){
            return data
        }else{
            ElMessage.error(msg || '请求出错啦～')
            // 既然业务出错，那就不能让业务上走成功的then回调，而是直接返回 Promise.reject
            return Promise.reject(new Error(msg))
        }
    },
    error=>{
        ElMessage.error(error.message)
        return Promise.reject(new Error(error))
    }
)


export default service