import { login } from '@/api/sys'

export default {
    namespaced:true,
    state:()=>({}),
    mutations:{},
    actions:{
        // 登陆请求动作
        login(context,userInfo){
            const {  username,password  } = userInfo
            return new Promise((resolve,reject)=>{
                login({
                    username,
                    password
                }).then(data =>{
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    },

}