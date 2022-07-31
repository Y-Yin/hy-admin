<template>
    <div>
        <div class="topBox">LOGO</div>
        <SidebarMenu></SidebarMenu>
    </div>
    
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'

</script>

<style lang="scss" scoped>
.topBox{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>