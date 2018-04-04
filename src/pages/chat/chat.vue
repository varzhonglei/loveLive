<template>
    <div class='chat-wrap'>
        <div class='backBtnWrap'>
            <div class='backBtnWrap2' @click='back'>
                <svg version="1.1" viewBox="0 0 1000 1000" >
                    <g><path d="M717.7,990L227.7,498.9L715.5,10l54.6,54.5L336.6,498.9l435.6,436.6L717.7,990z"/></g>
                </svg>
                <div class='backText'>返回</div>
            </div>
        </div>

        <div class='chat-head'>
            <div class='chat-name'>
                <span>someone</span>
            </div>
        </div>

        <div class='chat-content'>
            <my-scroll>
                <div>
                    <div v-for="item in messages">
                        <msg :avatarUrl='item.avatarUrl' :msgItemContent='item.msgItemContent'></msg>
                    </div> 
                </div>
            </my-scroll>
        </div>

        <div class='chat-foot'>
            <div class='msg-input-wrapper'>
                <el-input
                    v-model="textarea"
                    placeholder="请输入内容">
                </el-input>
            </div>
            <div class="msg-send-wrapper">
                <el-button type="primary">发送</el-button> 
            </div>
        </div>
    </div>
</template>


<script>
    import msg from '../../components/msg.vue'
    import myScroll from '../../components/scroll.vue'

    export default { 
        data(){
            return {
                textarea: '',
                messages: [ { avatarUrl: "/static/img/barsang.jpg", userName: 'haha', msgItemContent: `
                    绥芬河市疾控黑色的开发和客户数据库的发挥可接受的发挥快速减肥后开始环境科斯蒂哈发后开始环境科斯后开始环境科斯后开始环境科斯
                `, msgItemTime: 'hahaha' },
                            { avatarUrl: "/static/img/barsang.jpg", userName: 'haha', msgItemContent: "sfsf", msgItemTime: 'hahaha' } ,
                            { avatarUrl: "/static/img/barsang.jpg", userName: 'haha', msgItemContent: "sfsf", msgItemTime: 'hahaha' } ,
                            { avatarUrl: "/static/img/barsang.jpg", userName: 'haha', msgItemContent: "sfsf", msgItemTime: 'hahaha' } ,
                            { avatarUrl: "/static/img/barsang.jpg", userName: 'haha', msgItemContent: "sf的发挥快速减肥后开始环境科斯蒂哈发后开始环境科斯后开始环境科斯后开始环境科sf", msgItemTime: 'hahaha' } ,
                            { avatarUrl: "/static/img/barsang.jpg", userName: 'haha', msgItemContent: "s的发挥快速减肥后开始环境科斯蒂哈发后开始环境科斯后开始环境科斯后开始环境科fsf", msgItemTime: 'hahaha' } ,
                            { avatarUrl: "/static/img/barsang.jpg", userName: 'haha', msgItemContent: "sf的发挥快速减肥后开始环境科斯蒂哈发后开始环境科斯后开始环境科斯后开始环境科sf", msgItemTime: 'hahaha' }  ]
            }
        },
        components: {  msg, myScroll },
        methods: {
            back(){
                this.$router.go(-1)
            }
        }
    }

</script>

<style scoped>
 
    .chat-wrap{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(248,248,248,0.9);
    }
    .chat-head{
        height: 8%;
    }
    .chat-head .chat-name{
        /*text-align: center;
        line-height: 4rem;*/
        /*行高的百分比是按照字体的大小设置*/
        height: 100%;
        position: relative;
    }
    .chat-head .chat-name span{
        /*vertical-align: middle;*/
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    
    .chat-content {
        height: 82%;
        overflow: hidden;
    }

    .chat-foot{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10%;
        color: #fff;
        display: flex;
        align-items: center;
    }

    .msg-send-wrapper{
        flex: 1;
    }

    .msg-input-wrapper{
        flex: 8;
    }

</style>