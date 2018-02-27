<template>
    <div>
        <nav-component></nav-component>
        <slider></slider>
        <div class='content-wrapper'>
            <div class='content-nav'>
                <ul>
                    <router-link tag='li' to='/'>广场</router-link>
                    <router-link tag='li' to='/actives'>活动</router-link>
                    <router-link tag='li' to='/random'>缘旦</router-link>
                </ul>
            </div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    import navComponent from '../../components/header.vue'
    import slider from '../../components/slider/slider.vue'
    export default { 
        components: { navComponent, slider }
    }
</script>

<style scoped>
    /*包裹以及导航样式 */
    .content-wrapper{
        margin-top: 55px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
    .content-nav{
        width: 100%;
        position: relative;
        left: 0;
        top: 0;
        background-color: #fff;
    }
    .content-nav ul{
        width: 100%;
        display: flex;
        padding: 0 20px;
    }
    .content-nav li{
        flex: 1 1 300px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        margin: 5px 18px;
        border-radius: 18px;
        background-color: #2196f3;
    }
    
</style>