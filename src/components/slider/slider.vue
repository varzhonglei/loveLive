<template>
    <div class='slider'>
        <div class='slider-botton' @click='showSlider'>
            <div class='new-msg-red-point' v-show='getNewMsgsLen != 0 || getNewReplysLen != 0'></div>
        </div>
        <slider-middleware :slider-if-show='sliderIfShow' @handHideSlider='handHideSlider'></slider-middleware>
    </div>
</template>

<script>
    //本意是取侧边栏sidebar的。我之前以为slider是侧边栏的意思。。。mmp
    import sliderMiddleware from './sliderMiddleware.vue';
    import { mapGetters } from 'vuex';

    export default{
        components: { sliderMiddleware },
        data(){
            return {
                sliderIfShow: false
            }
        },
        computed:{
            ...mapGetters(['getNewMsgsLen', 'getNewReplysLen'])
        },
        methods:{
            showSlider(){
                this.sliderIfShow = true;
            },
            handHideSlider(){
                this.sliderIfShow = false;
            }
        }
    }
</script>

<style>
    /*侧边栏样式*/
    .slider{
        height: 100%;
        width: 0;
    }
    .slider-botton{
        position: fixed;
        z-index: 99;
        left: 15px;
        top: 15px;
        width: 20px;  
        height: 20px;  
        border-top: 4px solid #fff;  
        border-bottom: 4px solid #fff;  
        background-color: #fff;  
        padding: 4px 0;  
        background-clip: content-box;
    }
    .slider-botton .new-msg-red-point{
        top: -10px;
        right: -5px;
    }
</style>