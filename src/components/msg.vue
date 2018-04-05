<template>
    <div :class="{ 'message-item-wrap': true, 'my-msg': isMyMsg}">
        <div class='message-item-time'>{{msgItemTime}}</div>
        <div class='avatar-wrap'>
            <img :src="avatarUrl" alt="用户头像">
        </div>
        <div class='message-item-content-wrapper'>
            <div class='message-item-content'>{{msgItemContent}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
        avatarUrl: {
            default: '/static/img/bar.jpg',
            type: String
        },
        userName: {
            default: ''
        },
        msgItemTime: {
            default: '',
        },
        msgItemContent: {
            default: ''
        },
        isMyMsg: {
            default: false
        }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scope>
.message-item-wrap{
    min-height: 5rem;
    width: 100%;
}

.message-item-wrap::after{
    content: "";
    display: block;
    clear: both;
}

.message-item-time{
    text-align: center;
    color: #333;
}

.avatar-wrap{
    float: left;
    box-sizing: content-box;
    padding: 0.5rem;
    width: 5rem;
    height: 5rem;
}

.avatar-wrap img{
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
}

.message-item-content-wrapper{
    padding-top: 0.8rem;
    padding-left: 6.5rem;
    width: auto;
    min-height: 5rem;
    margin: 0.5rem;
}

.message-item-content{
    float: left;
    padding: 1rem;
    border-radius: 1rem;
    background: #fff;
    line-height: 120%;
}

.my-msg .message-item-content-wrapper{
    padding-left: 0rem;
    padding-right: 6.5rem;
}
.my-msg .message-item-content{
    background: #8ECB5A;
    float: right;
}

.my-msg .avatar-wrap{
    float: right;
}


</style>

