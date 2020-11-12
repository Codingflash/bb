<template>
    <el-container class="main-box">
        <el-header>
           <div class="logo"><img src="./logo.jpg" alt=""></div>
            <div class="nav">
                <el-menu mode="horizontal">
                    <el-menu-item index="1">指南</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            admin
                        </template>
                        <el-menu-item
                                index="2-1"><router-link to="/changepass">修改密码
                        </router-link></el-menu-item>
                        <el-menu-item index="2-2">退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-submenu index="1-1">
                        <template slot="title">
                           <i class="el-icon-menu"></i>
                            <span slot="title">分类管理</span>
                        </template>
                            <router-link to="/categoryadd">
                                <el-menu-item>分类添加</el-menu-item>
                            </router-link>
                            <router-link to="/categoryindex">
                                <el-menu-item>分类查看</el-menu-item>
                            </router-link>
                    </el-submenu>
                    <el-submenu index="2-1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">民宿管理</span>
                        </template>
                        <router-link to="/stayhomeadd">
                            <el-menu-item>民宿添加</el-menu-item>
                        </router-link>
                        <router-link to="/stayhomeindex">
                            <el-menu-item>民宿查看</el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    export default {
        name: "Main",


    }
</script>

<style scoped>
    .main-box{
        position: absolute;
        top: 0;left: 0;
        right: 0;bottom: 0;
    }
    .el-header {
        background-color: white;
        color: #333;

    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;

    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;

    }
    .el-header{
        display: flex;
        justify-content: space-between;
        background-color: #B3C0D1;
        color: white;

    }
    .el-header .nav{
        width: 200px;
        height: 100%;
        background: red;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
    .logo img{
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
    .tac{
        width: 555px;
        height: 555px;
    }
</style>