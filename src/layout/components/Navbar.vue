<template>
    <div class="navbar">
        <!-- left -->
        <div class="left-menu">
            <!-- 汉堡按钮 -->
            <Hamburger class="hamburger-container"></Hamburger>
        </div>
        <!-- right -->
        <div class="right-menu">
            <!-- 用户名称 -->
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    {{ $store.getters.userName }}
                    <i class="el-icon-s-tools"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                        <router-link to="/">
                            <el-dropdown-item>主页</el-dropdown-item>
                        </router-link>
                    </el-dropdown-menu>
                    <a target="__blank" href="#">
                        <el-dropdown-item>外链</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided @click="logout">退出登陆</el-dropdown-item>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Hamburger from '@/components/Hamburger'


const store = useStore()
const logout = () => {
    store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;


    .left-menu {
        height: 100%;

        .hamburger-container {
            height: 100%;
            transition: background 0.5s;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background: rgba(0, 0, 0, 0.1);
            }
        }
    }

    .right-menu {
        display: flex;
        align-items: center;
        padding-right: 16px;

        ::v-deep .avatar-container {
            cursor: pointer !important;
        }
    }
}
</style>