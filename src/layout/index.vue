<template>
    <div class="app-wrapper" 
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
    >
        <!-- 左侧menu -->
        <Sidebar 
            class="sidebar-container" 
            :style="{backgroundColor:variables.menuBg}"
        >
        </Sidebar>
        <div class="main-container">
            <div class="fixed-header">
                <!-- 顶部navbar -->
                <Navbar></Navbar>
            </div>
            <!-- 内容区  -->
            <AppMain></AppMain>
        </div>

    </div>
</template> 

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/styles/variables.scss'


</script>


<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper{
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}

.fixed-header{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWith});
    transition: width 0.3s;
} 

.hideSidebar .fixed-header{
    width: calc(100% - #{$hideSidebarWith});
}


</style>