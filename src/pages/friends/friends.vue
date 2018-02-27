<template>
    <div>
        <nav-component></nav-component>
        <slider></slider>
        <div class='content-wrap'>
            <ul>
                <li @click='test'>我是好友1</li>
                <li>我是好友2</li>
                <li>我是好友3</li>
            </ul>
            <img src="../../images/barsang.jpg" alt="">
        </div>
    </div>
</template>

<script>
    import navComponent from '../../components/header.vue'
    import slider from '../../components/slider/slider.vue'
    import { test } from '../../getData/getData.js'
    export default { 
        data(){
            return {}
        },
        methods:{
            test(){
                test('wo shi nei rong').then(val => console.log(val))
            }
        },
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