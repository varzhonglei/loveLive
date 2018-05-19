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
            <my-scroll :data='messages'
                       :refreshToBottom='true'
                       :pulldown='true' 
                       @pulldown='getHistory'>
                <div class='need-min-height'>
                    <!-- <div style="text-align:center">下拉获取历史</div> -->
                    <div v-for="item in messages">
                        <msg :avatarUrl='item.avatarUrl' 
                             :msgItemContent='item.msgItemContent' 
                             :isMyMsg='item.from == getOwnId' 
                             :isSendSuccess='item.isSendSuccess'></msg>
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
    import { getItem, setItem } from '../../utils/localStorage.js'
    import { clearReadMsg } from '../../getData/getData.js'

    export default { 
        data(){
            return {
                textarea: '',
                messages: []
            }
        },
        computed:{
            ...mapGetters(['getChatMan', 'getSocket', 'getOwnId', 'getOwnAvatarUrl', 'getOwnUserName', 'getTheOneMsg'])
        },
        components: {  msg, myScroll },

        created(){ 
            this.init();
        },
        beforeDestroy(){
            //取消即时在先聊天的监听
            this.getSocket.removeEventListener('msgFromOne', this.msgFromOne);
            this.getSocket.removeEventListener('sendSuccess', this.sendSuccess);
        },
        methods: {
            ...mapMutations(['REMOVE_NEW_MSGS', 'ADD_NEW_MSG']),
            back(){
                this.$router.go(-1)
            },
            sendMsg(){
                let theOne_id = this.$route.params.user_id,
                    message = this.textarea,
                    own_id = this.getOwnId,
                    avatarUrl = this.getOwnAvatarUrl,
                    userName = this.getOwnUserName,
                    date = new Date(),
                    theLocalFormat = {  from: own_id, 
                                        msgItemContent: message, 
                                        avatarUrl: avatarUrl, 
                                        userName: userName,
                                        msgItemTime: date,
                                        isSendSuccess: 'wait' }; 
                // console.log({ own_id: own_id, theOne_id: theOne_id, message: message, date: date });
                this.getSocket.emit('msgToOne', { own_id: own_id, theOne_id: theOne_id, message: message, date: date });
                this.messages = [ ...this.messages, theLocalFormat];
                this.textarea = '';
            },
            async init(){
                if ( !this.getChatMan.userName || !this.getOwnId ){
                    this.$router.replace('/friends')
                }
                let theOne_id = this.$route.params.user_id; 
                let uniqueKey = this.getOwnId + theOne_id;

                var localHistory = getItem(uniqueKey); //从本地缓存中拿历史消息
                if ( localHistory ){  
                    if (localHistory.length > 400) localHistory = localHistory.slice(200) //清除过多的消息缓存
                    localHistory = [...localHistory, ...this.getTheOneMsg(theOne_id)];//从store中取出该人的未读消息
                    setItem(uniqueKey, localHistory);
                    this.messages = [...localHistory];
                }else{
                    let theOneNews = this.getTheOneMsg(theOne_id);
                    setItem(uniqueKey, theOneNews);
                    this.messages = [...theOneNews]
                }

                clearReadMsg(theOne_id).then(
                    (res) => { console.log(res.data.msg) }
                );//清除服务器端未读消息

                this.REMOVE_NEW_MSGS(theOne_id);//参数可以是对象，和字符串

                this.msgFromOne = (obj) => { 
                    //有新消息来分类处理，当前聊天人：  1存入本地缓存，2清除全局消息提醒，3更新消息
                    //                  非当前聊天人： 推入全局消息
                    if ( obj.from === theOne_id){
                        let msgArr = getItem(uniqueKey);
                        if ( msgArr ){ //有历史聊天记录
                            msgArr.push(obj)
                            setItem(uniqueKey, msgArr) //用对话人_id 做存储的key
                        }else{
                            setItem(uniqueKey, [obj])
                        }
                        setTimeout(()=>{ this.REMOVE_NEW_MSGS(obj) }, 17);//在全局推入新消息后，把其取出
                        
                    }else{
                        this.ADD_NEW_MSG(obj);
                    }
                    this.messages = [...this.messages, obj];
                }

                this.sendSuccess = (obj) => {
                    let date = obj.date;
                    let theMsg = this.messages.find(function (item){
                        return new Date(item.msgItemTime).toString() === new Date(date).toString()
                    })
                    if (theMsg) theMsg.isSendSuccess = ''; //如果有这条消息的话，至空串表示发送成功

                    let msgArr = getItem(uniqueKey);
                    if ( msgArr ){ //有历史聊天记录
                        msgArr.push(theMsg)
                        setItem(uniqueKey, msgArr)
                    }else{
                        setItem(uniqueKey, [theMsg])
                    }
                }

                //socket对象不需要等到创建连接后 才绑定监听事件
                this.getSocket.on('msgFromOne', this.msgFromOne)
                this.getSocket.on('sendSuccess', this.sendSuccess)
            },
            getHistory(){

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

    .need-min-height{
        min-height: 102%;
        background: rgb(242,242,242);
    }

</style>
