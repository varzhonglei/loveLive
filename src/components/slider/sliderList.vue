<template>
    <div class="slider-content-wrap">
        <div class='userHeadImgWrap'>
            <img class='userHeadImg' src="../../images/bar.jpg" alt="用户头像">
            <div class='user-name'>{{userInfo.userName}}</div>
        </div>
        <ul>
            <li class="sidebar-item" @click='toFixInfo'>完善信息</li>
            <li class="sidebar-item">相册</li>
            <li class="sidebar-item">消息</li>
            <li class="sidebar-item">关于loveLive</li>
            <li class="sidebar-item">退出登陆</li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        },
        computed: {
            userInfo(){
                return this.$store.state.userInfo;
            }
        },
        methods:{
            toFixInfo () {
                this.$router.push('./fixInfo')
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
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
    }
    .user-name{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 3.4rem;
    }

    .sidebar-item{
        height: 40px;
        margin: 5px 0px;
        text-indent: 2em;
        line-height: 40px;
    }
</style>