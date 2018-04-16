<template>
    <div class='square'>
        <my-scroll  :data='squareActive' 
                    :pulldown='true' 
                    @pulldown='refreshDongTai'
                    :pullup='true'
                    @scrollToEnd='getOldDongTai'>
            <div class='content'>
                <div class="square-item" v-for='item in squareActive'>
                    <div class="square-item-userinfo-wrapper">
                        <img class='user-head-img' :src="item.whoPublish && item.whoPublish.avatarUrl"  @click='goUserDetailInfo(item.whoPublish && item.whoPublish._id)'  alt="用户头像">
                        <div class="square-item-username">{{item.whoPublish && item.whoPublish.userName}}</div>
                        <div class="square-icon-wrapper" @click='openComment(item._id, $event)'><svg class="icon"  viewBox="0 0 1024 1024" version="1.1"><path d="M184.32 891.667692c-12.603077 0-25.206154-2.363077-37.809231-7.876923-37.021538-14.966154-59.864615-49.624615-59.864615-89.009231v-275.692307c0-212.676923 173.292308-385.969231 385.969231-385.969231h78.76923c212.676923 0 385.969231 173.292308 385.969231 385.969231 0 169.353846-137.846154 307.2-307.2 307.2H289.083077l-37.021539 37.021538c-18.904615 18.116923-43.323077 28.356923-67.741538 28.356923zM472.615385 195.347692c-178.018462 0-322.953846 144.935385-322.953847 322.953846v275.692308c0 21.267692 15.753846 29.144615 20.48 31.507692 4.726154 2.363077 22.055385 7.876923 37.021539-7.08923l46.473846-46.473846c6.301538-6.301538 14.178462-9.452308 22.055385-9.452308h354.461538c134.695385 0 244.184615-109.489231 244.184616-244.184616 0-178.018462-144.935385-322.953846-322.953847-322.953846H472.615385z" fill="#7F7F7F" p-id="2438"></path><path d="M321.378462 512m-59.076924 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z" fill="#BFBFBF" p-id="2439"></path><path d="M518.301538 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z" fill="#BFBFBF" p-id="2440"></path><path d="M715.224615 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153846 0 59.076923 59.076923 0 1 0-118.153846 0Z" fill="#BFBFBF" p-id="2441"></path></svg></div>
                        <div class="square-icon-wrapper xin"><svg  class="icon" viewBox="0 0 1024 1024"><path d="M737.32128 142.264121c-87.171362 0-162.578796 22.773679-225.540779 134.118604-47.548946-94.462418-135.072325-135.281079-219.141022-137.445372l0-0.077771-5.330402 0c-0.034792 0-0.069585-0.001023-0.105401-0.001023l0 0.001023 0 0 0-0.001023c-0.025583 0-0.052189 0.001023-0.077771 0.001023l-3.958148 0 0 0.050142c-113.074312 2.165316-218.990596 95.248318-218.969107 265.001513 0 294.743908 448.282816 481.231229 448.282816 481.231229s447.319885-186.487322 447.319885-483.048621C959.818747 231.458559 851.370803 142.264121 737.32128 142.264121zM690.644191 694.155666c-69.032236 52.048423-139.222855 89.232301-178.221054 108.222817-39.11281-18.990516-109.507066-56.136531-178.731684-108.073414-87.417979-65.552995-191.628412-169.160701-191.628412-290.393833 0-61.809741 16.908088-112.799042 48.927339-147.410328 24.705682-26.710338 57.290821-41.863457 92.176352-42.940998l0 0.203638 9.471722 0c120.94149 2.950192 219.370243 192.793958 219.370243 192.793958s90.361007-182.169993 225.312582-189.662641c36.731576-2.039449 71.019497 14.753005 96.383164 41.495066 31.549553 33.251312 48.230468 82.954317 48.230468 143.703913C881.934912 524.350283 777.910721 628.411313 690.644191 694.155666z" p-id="1680" fill="#7F7F7F"></path></svg></div>
                        <div class="square-icon-wrapper xin" style="display:none"><svg class="icon" viewBox="0 0 1024 1024" version="1.1"><path d="M700.856275 155.542542c-74.768891 0-144.295384 72.696696-190.046381 127.260405C465.073224 228.226958 395.563104 155.542542 320.754305 155.542542c-134.789892 0-244.443291 105.780185-244.443291 235.799424 0 77.56968 39.277562 131.98808 70.844511 175.712931 91.752704 126.998439 322.464249 285.038872 332.234777 291.701618 9.410324 6.414083 20.424168 9.629311 31.401174 9.629311 11.005658 0 21.998013-3.215228 31.397081-9.629311 9.782807-6.662747 240.514819-164.703179 332.23887-291.701618 31.586392-43.723827 70.873164-98.143251 70.873164-175.712931C945.299567 261.321704 835.645145 155.542542 700.856275 155.542542L700.856275 155.542542zM700.856275 155.542542" p-id="1566"></path></svg></div>
                    </div>
                    <div class="square-contentText-wrapper">
                        <div class="square-contentText" >
                            {{item.content}}
                        </div>
                    </div>
                    <div class='reply-content-wrapper' v-for='innerItem in item.reply'>
                        <div v-if='innerItem.from && innerItem.to && (innerItem.from._id == getOwnId || (innerItem.to ? innerItem.to._id : "") == getOwnId )'
                             @click='openReply(innerItem.from._id, item._id, innerItem.from.userName, $event)'>
                            <span>{{innerItem.from.userName}}</span>回复<span>{{innerItem.to ? innerItem.to.userName : ''}}</span>:
                            {{innerItem.content}}
                        </div>
                    </div>
                    <div class="reply-input-wrapper" v-if='replyWho && replyDongTaiId === item._id'>  
                        <div class="input-reply-wrapper">   
                            <el-input
                                type="textarea"
                                autosize
                                :placeholder="'回复' + replyWhoName + ':'"
                                v-model="textarea">
                            </el-input>
                        </div>
                        <div class="send-reply-wrapper" @click='sendDongTaiReply(item._id, replyWho, $event)'>
                            <button>回复</button>
                        </div>
                    </div>
                    <div class="reply-input-wrapper" v-if='!replyWho && replyDongTaiId === item._id'>  
                        <div class="input-reply-wrapper">   
                            <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入内容"
                                v-model="textarea">
                            </el-input>
                        </div>
                        <div class="send-reply-wrapper" @click='sendDongTaiReply(item._id, item.whoPublish && item.whoPublish._id, $event)'>
                            <button>评论</button>
                        </div>
                    </div>
                </div>
            </div>
        </my-scroll>
        <alert v-show='mdState' @closeMd='closeMd' :message='message'></alert>
    </div>
</template>

<script>
    import myScroll from '../../../components/scroll.vue'
    import { getSquareActive, dongTaiReply } from '../../../getData/getData.js'
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return{
                squareActive: {}, 
                replyDongTaiId: '', 
                textarea: '', 
                mdState: false,
                message: '',
                replyWho: '',
                replyWhoName: ''
            }
        },
        computed:{
            ...mapGetters(['getOwnId'])
        },
        components: { myScroll },
        created(){
            var getOptions = {
                getType: 'INIT',
                getNum: 8
            }
            getSquareActive(getOptions).then( ( res ) => { 
                if(res.data.data){
                    this.squareActive = res.data.data
                }
            })
        },
        methods:{
            refreshDongTai(){
                var counterpart_time = this.squareActive[0].meta.updateAt
                var getOptions = {
                    getType: 'REFRESH',
                    getNum: 8,
                    counterpart_time: counterpart_time
                }
                getSquareActive(getOptions).then( ( res ) => { 
                    if(res.data.data){
                        this.squareActive = [...res.data.data, ...this.squareActive]
                    }
                })
            },
            getOldDongTai (){
                var counterpart_time = this.squareActive[this.squareActive.length - 1].meta.updateAt
                var getOptions = {
                    getType: 'GET_OLD',
                    getNum: 8,
                    counterpart_time: counterpart_time
                }
                getSquareActive(getOptions).then( ( res ) => { 
                    if(res.data.data){
                        this.squareActive = [...this.squareActive, ...res.data.data]
                    }
                })
            },
            goUserDetailInfo(_id){
                this.$router.push('/userDetailInfo/' + _id)
            },
            openReply(replyWho, dongTai_id, replyWhoName, event){
                if (event.isTrusted === false){ //可能是在scroll组件下，会多派发几次事件，不同浏览器行为还不一样
                    if ( replyWho !== this.$store.state.userInfo._id ){
                        this.replyWho = replyWho;
                        this.replyWhoName = replyWhoName;
                        this.openComment(dongTai_id, event, true)
                    }
                }
            },
            openComment(dongTai_id, event, isVirtual){
                if (event.isTrusted === false){ 
                    if (!isVirtual){
                        this.replyWho = '';
                        this.replyWhoName = ''
                    }
                    if (dongTai_id === this.replyDongTaiId){
                        this.replyDongTaiId = '';
                    }else{
                        this.replyDongTaiId = dongTai_id;
                    }
                }
            },
            async sendDongTaiReply(dongTai_id, to, event){
                if (event.isTrusted === true) { //不知为何脚本会多生成两次事件, isTrusted描述是真实有click点击而产生的
                    let data = {
                        data:{
                            dongTai_id: dongTai_id,
                            content: this.textarea,
                            to: to,
                            from: this.$store.state.userInfo._id
                        }
                    };
                    let res =  await dongTaiReply(data);

                    let theDongTai =  this.squareActive.find((item)=>{
                            return item._id == dongTai_id
                        })
                    theDongTai.reply.push({
                        _id: dongTai_id,
                        content: this.textarea,
                        to: {
                            _id: this.replyWho ? this.replyWho : theDongTai.whoPublish._id,
                            userName: this.replyWhoName ? this.replyWhoName : theDongTai.whoPublish.userName
                        },
                        from:{
                            _id: this.$store.state.userInfo._id,
                            userName: this.$store.state.userInfo.userName,
                        }
                    }) //这里的数据不需要响应式，就直接push了

                    this.replyDongTaiId = '';
                    this.message = res.data.msg;
                    this.mdState = true;
                }
            },
            closeMd(){
                this.mdState = false;
            }
        }
    }
</script>

<style lang="scss"> 
     /*故意不封闭， 与checkNewMsgs共享*/
     /*广场样式*/
     $userinfo-item-height: 7rem;
     $user-head-img-width: 6.5rem;

    .square{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .square .wrapper{
        height: 100%;
    }
    .square .square-item{
        border-bottom: 3px solid #ccc; 
        padding: 3px 20px;
    }
    .square-item-userinfo-wrapper{
        margin-top: 1rem;
        height: $userinfo-item-height;
        width: 100%;
    }
    .square .user-head-img{
        width: $user-head-img-width;
        height: $user-head-img-width;
        border-radius: 10%;
        float: left;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .square-item-username{
        vertical-align: top;
        font-size: 3.4rem;
        height: $userinfo-item-height /2;
        display: inline-block;
        width: 55%;
        height: 100%;
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .square-icon-wrapper{
        float: right;
        margin-top: $userinfo-item-height * 0.7;
    }
    .xin{
        margin-right: 0.5rem;
    }
    .icon{
        height: $userinfo-item-height /2.5;
        width: $userinfo-item-height /2.5;
    }
    .square-contentText-wrapper{
        margin-bottom: 2rem;
        min-height: $user-head-img-width / 2;
    }
    .square-contentText{
        font-size: 2.3rem;
        color: #555;
    }

    .reply-input-wrapper{
        position: relative;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10%;
        color: #fff;
        display: flex;
        align-items: center;
    }
    .input-reply-wrapper{
        font-size: 3.4rem;
        flex: 10;
    }
    .send-reply-wrapper{
        font-size: 3.4rem;
        flex: 2;
    }
    .send-reply-wrapper button{
        width: 100%;
        height: 33px;
        background-color: #2196f3;
        border-radius: 3px;
        transition-property: initial;
        transition-duration: 0.1s;
        transition-timing-function: initial;
        transition-delay: initial;
    }
    .send-reply-wrapper button:active{
        background-color: #50d0f0;
    }

    .reply-content-wrapper{
        background: #f6f6f6;
    }
    .reply-content-wrapper span{
        color: #24a1aa;
    }

</style>