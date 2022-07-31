import router from '@/router'
import store from '@/store'
import { IS_ACTIVE_LOG_OUT } from '@/constant/index'
/**
 * 路由前置守卫   to 要到哪去 ， from 要从哪里来 ， next 是否要去
*/


// 白名单
const whiteList = ['/login']

router.beforeEach(async (to,from,next)=>{
    //1.用户已登陆，则不允许进入login
    //2.用户未登陆，只允许进入login
    if(store.getters.token){
        if(to.path === '/login'){
            next('/')
        }else{
            // 判断用户信息是否存在
            if(!store.getters.hasUserInfo && IS_ACTIVE_LOG_OUT){
                await store.dispatch('user/getUserInfo')
            }
            next()
        }
    }else{
        if(whiteList.includes(to.path)){
            next()
        }else{
            next('/login')
        }
    }   
})
