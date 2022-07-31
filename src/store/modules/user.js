import { login,getUserInfo } from '@/api/sys'
import { setItem,getItem,removeAllItem } from '@/utils/storeage'
import { TOKEN } from '@/constant/index'
import { setTimeStamp } from '@/utils/auth' 
import router from '@/router'
export default {
    namespaced:true,
    state:()=>({
        token: getItem(TOKEN) ||  '',
        userInfo:{}
    }),
    mutations:{
        setToken(state,token){
            state.token = token
            setItem(TOKEN,token)         
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo
        }
    },
    actions:{
        // 登陆请求动作
        login(context,userInfo){
            const {  username,password  } = userInfo
            return new Promise((resolve,reject)=>{
                login({
                    username,
                    password
                }).then(data =>{
                    this.commit('user/setToken',data.token)
                    // 跳转
                    router.push('/')
                    // 保存登陆时间
                    setTimeStamp()
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        // 获取用户信息
        async getUserInfo(context){
            const res =  await getUserInfo()
            this.commit('user/setUserInfo',res)
            return res
        },
        // 退出登陆
        logout(){
            this.commit('user/setToken','')
            this.commit('user/setUserInfo',{})
            removeAllItem()
            router.push('/login')
        }
    },

}