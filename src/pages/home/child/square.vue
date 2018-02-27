<template>
    <div class='square'>
        <my-scroll class='wrapper'
                    :data='squareActive'>
            <div class='content'>
                <div class="square-item" v-for='item in squareActive'>
                    <div>
                        <img :src="item.userHeadUrl" alt="">
                        <div>{{item.userName}}</div>
                    </div>
                    <div>{{item.context}}</div>
                    <div>
                        <img :src="item.activeImgUrl" alt="">
                    </div>
                </div>
            </div>
        </my-scroll>
    </div>
</template>

<script>
    import myScroll from '../../../components/scroll.vue'
    import { getSquareActive } from '../../../getData/getData.js'
    export default{
        data(){
            return{
                squareActive: {},
            }
        },
        components: { myScroll },
        created(){
            var thisVm = this;
            getSquareActive().then( function( res ){ thisVm.squareActive = res.data  })
        },
    }
</script>

<style scoped>
     /*广场样式*/
    .square{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .square .wrapper{
        height: 100%;
    }
    .square .square-item{
        height: 150px;
        border-bottom: 1px solid #b40; 
        padding: 3px 30px;
    }
</style>