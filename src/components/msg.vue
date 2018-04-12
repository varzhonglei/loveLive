<template>
    <div :class="{ 'message-item-wrap': true, 'my-msg': isMyMsg}">
        <div class='message-item-time'>{{msgItemTime}}</div>
        <div class='avatar-wrap'>
            <img :src="avatarUrl" alt="用户头像">
        </div>
        <div class='message-item-content-wrapper'>
            <div class='message-item-content'>{{msgItemContent}}</div>
            <svg viewBox="0 0 1025 1024" :class="{ 'sending-svg': true, 'is-send-success': isSendSuccess == 'wait' }"><path d="M1024 512c-1.28-66.848-15.776-133.504-42.592-194.464-26.688-60.992-65.472-116.256-113.056-161.92C820.8 109.92 764.416 73.792 703.36 49.952 642.368 26.016 576.768 14.592 511.968 16c-64.8 1.28-129.344 15.36-188.32 41.344-59.04 25.888-112.544 63.456-156.736 109.568S87.744 267.616 64.736 326.72C41.632 385.792 30.592 449.248 32 512c1.28 62.752 14.976 125.152 40.128 182.208C97.216 751.296 133.6 803.04 178.24 845.76c44.608 42.752 97.472 76.512 154.624 98.72C389.984 966.784 451.296 977.376 512 976c60.704-1.28 120.96-14.56 176.064-38.912C743.2 912.8 793.184 877.6 834.432 834.432c41.28-43.136 73.856-94.24 95.264-149.44 13.024-33.472 21.888-68.384 26.528-103.808 1.248 0.064 2.496 0.128 3.776 0.128 35.36 0 64-28.64 64-64 0-1.792-0.096-3.584-0.224-5.344h0.224zM922.304 681.952c-23.456 53.216-57.472 101.408-99.168 141.184s-91.008 71.2-144.256 91.776C625.664 935.584 568.576 945.376 512 944c-56.608-1.312-112.608-13.728-163.808-36.48-51.264-22.656-97.696-55.488-136-95.712s-68.512-87.776-88.32-139.072C104 621.44 94.656 566.528 96 511.968c1.312-54.56 13.344-108.416 35.264-157.696 21.856-49.312 53.504-93.984 92.256-130.816s84.544-65.856 133.888-84.864c49.344-19.072 102.144-28 154.624-26.656 52.512 1.312 104.224 12.928 151.552 34.048 47.36 21.056 90.24 51.488 125.632 88.768s63.2 81.28 81.376 128.672c18.24 47.392 26.784 98.048 25.408 148.512h0.224c-0.16 1.76-0.224 3.52-0.224 5.344 0 33.024 24.992 60.16 57.088 63.616-6.24 34.816-16.544 68.832-30.784 100.992z" p-id="889"></path></svg>
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
        },
        isSendSuccess: {
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
    border-radius: 50%;
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

.sending-svg{
    display: none;
    float: right;
    width: 2rem;
    height: 2rem; 
    margin: 1rem; 
    transform: rotate(0turn);
    opacity: 0.5;
    animation:my-rotate 1s linear infinite;
}

.is-send-success{
    display: block;
}

@keyframes my-rotate{
    0%{transform: rotate(0turn)}
    100%{transform: rotate(1turn)}
}

</style>

