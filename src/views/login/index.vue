<template>
    <div class="login-container">
        <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
            <div class="title-container">
                <h3 class="title">用户登陆</h3>
            </div>
            <!-- username -->
            <el-form-item prop="username">
                <span class="svg-container">
                    <SvgIcon icon="user"></SvgIcon>
                </span>
                <el-input  v-model="loginForm.username" placeholder="username" name="username" type="text"></el-input>
            </el-form-item>

            <!-- password -->
            <el-form-item prop="password">
                <span class="svg-container">
                    <SvgIcon icon="password"></SvgIcon>
                </span>
                <el-input 
                v-model="loginForm.password" 
                placeholder="password" 
                name="password"
                :type="passwordType"
                >
                </el-input>
                <span class="svg-container show-pwd" @click="onChangePwdType">
                    <SvgIcon :icon="passwordType === 'password' ? 'eye' : 'eye-open' "></SvgIcon>
                </span> 
            </el-form-item>

            <!-- 登陆按钮 -->
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="handlerLogin">登陆</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules'
import axios from 'axios'

// 数据源
const loginForm = ref({
    username: 'admin',
    password: 'admin'
})

// 验证规则
const loginRules = ref({
    username: [
        {
            required: true,
            trigger: 'blur',
            message: '用户名为必填项'
        }
    ],
    password: [
        {
            required: true,
            trigger: 'blur',
            validator:validatePassword()
        }
    ]
})


// 处理密码框文本显示
const passwordType = ref('password')



const onChangePwdType = () =>{
    if(passwordType.value === 'password'){
        passwordType.value = 'text'
    }else{
        passwordType.value = 'password'
    }
}

// 登陆
const store = useStore()
const loginFormRef = ref(null)
const handlerLogin = () =>{
    // axios.get('/table/list',{params:{xxx:1}}).then(res=>{
    //     console.log('res',res)
    // })
    //1.进行表单校验
    //2.触发登陆动作
    //3.进行登陆后处理
    loginFormRef.value.validate(valid=>{
        if(!valid) return
        store.dispatch('user/login',loginForm.value).then(res=>{
            // 登陆后的处理
            if(res.code === 200){
                console.log('登陆成功',res)
            }else{
                console.log(res)
            }
            
        }).catch(err=>{})
    })

}


</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        ::v-deep .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }


        ::v-deep .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: none;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                caret-color: $cursor;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0 auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }


}
</style>
