<template>
    <div class="slider-content-wrap">
        <div class='userHeadImgWrap'>
            <img class='userHeadImg' src="../../images/bar.jpg" alt="用户头像">
        </div>
        <ul>
            <li class="sidebar-item" @click='toFixInfo'>完善信息</li>
            <li class="sidebar-item">选项2</li>
            <li class="sidebar-item">选项3</li>
            <li class="sidebar-item">选项4</li>
        </ul>
    </div>
</template>

<script>
    
    export default{
        data(){
            return {}
        },
        methods:{
            toFixInfo () {
                console.log(1)
            }
        }
    }

</script>

<style>
    .slider-content-wrap{
        width: 18rem;
        background-color: #fafafa;
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
    }
    .userHeadImgWrap{
        padding: 20px 20px 20px 20px;
    }
    .userHeadImg{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .sidebar-item{
        height: 40px;
        margin: 5px 0px;
        text-indent: 2em;
        line-height: 40px;
    }
</style>