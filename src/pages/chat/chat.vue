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
                <span>{{getChatMan.userName}}</span>
            </div>
        </div>

        <div class='chat-content'>
            <my-scroll :data='messages'>
                <div class='need-min-height'>
                    <div v-for="item in messages">
                        <msg :avatarUrl='item.avatarUrl' :msgItemContent='item.msgItemContent' :isMyMsg='item._id == getOwnId'></msg>
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
                <el-button type="primary" @click='sendMsg'>发送</el-button> 
            </div>
        </div>
    </div>
</template>


<script>
    import msg from '../../components/msg.vue'
    import myScroll from '../../components/scroll.vue'
    import { mapMutations, mapGetters } from 'vuex'

    export default { 
        data(){
            return {
                textarea: '',
                messages: []
            }
        },
        computed:{
            ...mapGetters(['getChatMan', 'getSocket', 'getOwnId'])
        },
        components: {  msg, myScroll },

        created(){
            if ( !this.getChatMan.userName || !this.getOwnId ){
                this.$router.replace('/friends')
            }
            //socket对象不需要等到创建连接后 才绑定监听事件
            this.getSocket.on('msgFromOne', (obj) => {
                this.messages = [...this.messages, obj];
            })
        },

        methods: {
            back(){
                this.$router.go(-1)
            },
            sendMsg(){
                let theOne_id = this.$route.params.user_id,
                    message = this.textarea,
                    own_id = this.getOwnId;
                console.log(new Date())
                this.getSocket.emit('msgToOne', { own_id: own_id, theOne_id: theOne_id, message: message });
                this.textarea = '';
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