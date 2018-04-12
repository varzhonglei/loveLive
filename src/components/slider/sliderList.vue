<template>
    <div class="slider-content-wrap">
        <div class='userHeadImgWrap'>
            <img class='userHeadImg' :src="userInfo.avatarUrl" alt="用户头像">
            <div class='user-name'>{{userInfo.userName}}</div>
        </div>
        <ul>
            <li class="sidebar-item" @click='toFixInfo'>完善信息</li>
            <li class="sidebar-item">相册</li>
            <li class="sidebar-item">
                <div class='newMsgAlert' @click='goToCheckNewMsgs'>
                    <div class='wrapper-sidebar-svg'>
                        <svg viewBox="0 0 1024 1024" ><path d="M798.408 569.848v-88.407c0-124.764-89.85-229.568-211.378-259.101v-1.493c0-41.949-31.487-75.954-70.328-75.954-38.838 0-70.328 34.004-70.328 75.954v1.733c-121.026 29.856-210.392 134.428-210.392 258.856v72.751h-0.059c1.453 89.798-70.493 107.41-70.493 155.882s39.292 67.386 87.767 67.386h122.755c1.714 58.393 64.233 105.335 141.109 105.335s139.395-46.938 141.109-105.335h122.438c48.475 0 87.771-18.91 87.771-67.386 0.005-45.503-63.661-64.015-69.969-140.22zM517.151 847.314c-58.389 0-105.722-30.723-105.722-68.625 0-0.413 0.010-0.825 0.026-1.239h211.395c0.010 0.413 0.026 0.822 0.026 1.239-0.005 37.901-47.336 68.625-105.727 68.625zM833.375 712.797c-2.197 22.761-32.25 30.008-51.159 30.008h-530.469c-14.482 1.97-51.705-5.107-51.156-29.513v-6.198c0.483-22.037 54.625-40.822 70.179-118.866v-34.038h-0.557v-66.675c0-119.753 91.718-218.82 211.063-235.378v-29.628c0-23.405 15.775-42.378 35.235-42.378s35.235 18.973 35.235 42.378v29.588c119.477 16.445 211.34 115.569 211.34 235.419v66.674h-0.205v30.694h0.273c0.712 56.066 69.668 102.662 70.217 119.522l0.005 8.391z" fill="#333333" p-id="3285"></path></svg>
                        <div class='new-msg-red-point' v-show='getNewMsgsLen != 0 || getNewReplysLen != 0'></div>
                    </div>
                    <span>消息</span>  
                </div>
            </li>
            <li class="sidebar-item">关于loveLive</li>
            <li class="sidebar-item" @click='handSignout'>退出登陆</li>
        </ul>
        <alert v-show='isShowModel' @closeMd='closeMd' :message='signOutMessage'></alert>
    </div>
</template>

<script>

    import { signout } from '../../getData/getData.js'
    import { setCookie } from '../../utils/utils.js'
    import { mapMutations, mapGetters } from 'vuex'
    export default{
        data(){
            return {
                isShowModel: false,
                signOutMessage: '登出失败'
            }
        },
        computed: {
            ...mapGetters(['getNewMsgsLen', 'getNewReplysLen']),
            userInfo(){
                return this.$store.state.userInfo;
            }
        },

        methods:{
            ...mapMutations(['SIGN_OUT']),
            toFixInfo () {
                this.$router.push('./fixInfo')
            },
            handSignout (){
                signout().then((val)=>{
                    var message = val.data.message;
                    if ( message === '登出成功' ){
                        this.signOutMessage = message;
                        this.isShowModel = true;
                        setCookie('connect.sid', '', -1);
                        this.$store.commit('SIGN_OUT');
                        this.$router.push('./login');
                    }
                })
            },
            closeMd(){
                this.isShowModel = false
            },
            goToCheckNewMsgs(){
                this.$router.push('./checkNewMsgs')
            }
        }
    }

</script>

<style>
    .slider-content-wrap{
        width: 60%;
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
        text-indent: 1.5em;
        line-height: 40px;
    }

    .newMsgAlert{
        height: 100%;
    }
    .newMsgAlert *{
        vertical-align: middle;
    }
    .newMsgAlert svg{
        height: 40px;
        width: 40px;
    }
    .wrapper-sidebar-svg{
        position: relative;
        text-indent: 0; /* 不手动清楚会继承父亲的 text-indent */
        display: inline-block;
    }

</style>