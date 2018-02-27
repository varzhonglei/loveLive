<template>
    <div class='nav'>
        <div><router-link tag='span' to='/'>主页</router-link></div>
        <ul>
            <router-link tag='li' to='/'>主页</router-link>
            <router-link tag='li'to='/friends'>好友</router-link>
            <router-link tag='li'to='/search'>搜索</router-link>
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

<style scoped>
    /*导航栏样式*/
    .nav{
        height: 50px;
        background: #2196f3;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%
    }
    .nav::after{
        content: '';
        display: block;
        clear: both;
    }
    .nav ul{
        float: right;
    }
    .nav ul li{
        float: right;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 5px;
        border-radius: 30%;
        color: #fff;
    }
    .nav ul li:first-child{
        margin-right: 30px;
    }
    .nav div{
        height: 40px;
        text-align: center;
        line-height: 40px;
        float: left;
        width: 50px;
        margin: 5px 5px 5px 50px;
        border-radius: 30%;
        font-size: 24px;
    }
    .nav div span{
        color: #fff;
    }
</style>