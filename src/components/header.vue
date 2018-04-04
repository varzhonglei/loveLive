<template>
    <div class='nav'>
        <ul class='nav-left'>
            <li></li>
            <li><router-link tag='span' to='/'>主页</router-link></li>
        </ul>
        <ul class="nav-right">
            <router-link tag='li' to='/'>主页</router-link>
            <router-link tag='li' to='/friends'>好友</router-link>
            <router-link tag='li' to='/search'>搜索</router-link>
        </ul>
    </div>
</template>

<script>
    export default{
        data (){
            return{
            }
        }  
    }
</script>

<style lang='scss' scoped>
    /*导航栏样式*/
    .nav{
        height: 50px;
        background: #2196f3;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
    }
    .nav::after{
        content: '';
        display: block;
        clear: both;
    }
    .nav .nav-right{
        float: right;
        display: flex;
        width: 50%;
    }
    
    .nav .nav-right li{
        flex: 1 1 40px;
        float: right;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 5px;
        border-radius: 30%;
        color: #fff;
    }

    .nav .nav-left{
        display: flex;
        height: 40px;
        text-align: center;
        line-height: 40px;
        float: left;
        width: 29%;
        margin: 5px 0;
        border-radius: 30%;
    }
    .nav-left li{
        flex: 1;
    }
    .nav .nav-left span{
        color: #fff;
    }
</style>