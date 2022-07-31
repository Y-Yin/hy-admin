import variables from '@/styles/variables.scss'
// 快捷访问
const getters = {
    // token
    token: state=> state.user.token,
    // 用户信息
    userInfo:state=>state.user.userInfo,
    // true 表示用户信息已存在
    hasUserInfo: state =>{
        return JSON.stringify(state.user.userInfo) !== '{}'
    },
    // 用户名
    userName:state =>{
        if(JSON.stringify(state.user.userInfo) !== '{}'){
            return state.user.userInfo.username
        }
        return '用户名不存在'
    },
    // 通用css变量: 为什么要用vuex导出variables 呢，因为vuex 自带双向绑定
    cssVar:state=>variables,
    // 左侧路由列表打开状态还是收起状态
    sidebarOpened:state=> state.app.sidebarOpened

}

export default getters