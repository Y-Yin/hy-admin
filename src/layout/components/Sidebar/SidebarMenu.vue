<template>
    <el-menu 
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true" 
    :background-color="$store.getters.cssVar.menuBg" 
    :text-color="$store.getters.cssVar.menuText" 
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
    >
        <SidebarItem v-for="item in routes" :key="item.path" :route="item"></SidebarItem>
    </el-menu>
</template>

<script setup>
import path from 'path'
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SidebarItem from './SidebarItem.vue'
import { getChildrenRoutes, filterRoutes , generateMenus } from '@/utils/router.js'


const router = useRouter()

const routes = computed(() => {
    const filterRoutesList = filterRoutes(router.getRoutes())

    console.log('generateMenus(filterRoutesList)',generateMenus(filterRoutesList))
    return generateMenus(filterRoutesList)
})

console.log('routes',routes.value)

// 处理默认激活项
const route = useRoute()
const activeMenu = computed(()=>{
    const { path } = route
    return path 
})


</script>

<style lang="scss" scoped>
</style>