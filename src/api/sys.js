import request from '@/utils/request'


// 登陆
export function login(params){
    return request({
        url:'/sys/login',
        method:'POST',
        data:params
    })
}