export default {
    namespaced:true,
    state:()=>({
        // 左侧路由栏到状态是打开还是收起
        sidebarOpened:true
    }),
    mutations:{
        triggerSidebarOpened(state){
            state.sidebarOpened = !state.sidebarOpened
        }
    }
}