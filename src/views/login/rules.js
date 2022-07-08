export const validatePassword = () =>{
    return (rule,value,callback)=>{
        if(value.length < 5){
            callback(new Error('密码不能少于6位'))
        }else{
            callback()
        }
    }
}