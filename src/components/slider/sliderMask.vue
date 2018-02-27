<template>
    <div class="mask" @click='hideSlider'></div>
</template>

<script>
    export default{
        methods:{
            hideSlider(){
                this.$emit('tempHandHideSlider')
            }
        }
    }

</script>

<style>
    .mask{
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 99;
        background-color: rgba(120,120,120,0.5)
    }
</style>