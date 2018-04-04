<template>
    <div class='message-item-wrap'>
        <div class='message-item-time'>{{msgItemTime}}</div>
        <span>{{userName}}</span>
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
            default: '/static/img/barsang.jpg',
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
    padding: 1rem;
    border-radius: 1rem;
    background: #fff;
    line-height: 120%;
}

</style>

