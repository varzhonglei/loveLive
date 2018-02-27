<template>
    <div class='slider-wrap'>
        <transition name='sliderOutIn'>
            <slider-list v-if='sliderIfShow'></slider-list>
        </transition>
        <transition name='mask'>
            <slider-mask v-if='sliderIfShow' @tempHandHideSlider='tempHandHideSlider'></slider-mask>
        </transition>
    </div>
</template>

<script>
        import sliderList from './sliderList.vue'
        import sliderMask from './sliderMask.vue'
        export default{
            data(){
                return {
                }
            },
            components: { sliderList, sliderMask },
            props: ['sliderIfShow'],
            methods:{
                tempHandHideSlider(){
                    this.$emit('handHideSlider')
                }
            }
        }
</script>
<style>
    .slider-wrap{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 0;
        z-index: 100;
    }

    .sliderOutIn-enter{
        transform: translateX(-100%)
    }
    .sliderOutIn-enter-to{
        transform: translateX(0)
    }
    .sliderOutIn-enter-active{
        transition: 1s
    }

    .sliderOutIn-leave{
        transform: translateX(0%)
    }
    .sliderOutIn-leave-to{
        transform: translateX(-100%)
    }
    .sliderOutIn-leave-active{
        transition: 1s
    }

    .mask-enter{
        opacity: 0
    }
    .mask-enter-to{
        opacity: 0.7
    }
    .mask-enter-active{
        transition: 1s
    }

</style>