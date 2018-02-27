<template>
    <div>
        <nav-component></nav-component>
        <slider></slider>
        <div class='content-wrap'>
            <span>搜索</span>
            <input type="text">
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
    .content-wrap{
        margin-top: 55px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
</style>