import request from '@/utils/request'


// 登陆
export const login = (params)=>{
    return request({
        url:'/sys/login',
        method:'POST',
        data:params
    })
}

// 获取用户信息
export const getUserInfo = (params)=>{
    return request({
        url:'/sys/profile',
        method:'get',
        params
    })
}