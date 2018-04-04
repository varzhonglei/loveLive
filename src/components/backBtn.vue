<template>
    <div class='component-back-btn-wrapper' @click='back'>
        <div class='flex-wrapper'>
            <svg version="1.1" viewBox="0 0 1000 1000" >
                <g><path d="M717.7,990L227.7,498.9L715.5,10l54.6,54.5L336.6,498.9l435.6,436.6L717.7,990z"/></g>
            </svg>
            <div class='backText'>返回</div>
        </div>
    </div>
</template>

<script>
    export default{
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss">
.component-back-btn-wrapper{
    height: 100%;
    display: inline-block;
}
.flex-wrapper{
    display: flex;
    align-items: center;
    height: 100%;
}
.component-back-btn-wrapper svg{
    width: 2rem;
    height: 2rem;
}
.component-back-btn-wrapper .backText{
    display: inline-block;
    height: 2rem;
    line-height: 2rem;
    font-size: 3rem;
}
</style>