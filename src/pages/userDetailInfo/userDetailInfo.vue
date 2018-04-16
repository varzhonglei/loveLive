<template>
    <div class='user-detail-info-wrap'>
        <div class='backBtnWrap'>
            <div class='backBtnWrap2' @click='back'>
                <svg version="1.1" viewBox="0 0 1000 1000" >
                    <g><path d="M717.7,990L227.7,498.9L715.5,10l54.6,54.5L336.6,498.9l435.6,436.6L717.7,990z"/></g>
                </svg>
                <div class='backText'>返回</div>
            </div>
        </div>

        <div class='userImgWrap'>
            <div class='img-padding-wrapper'>
                <img :src="this.baseUserInfo.avatarUrl"  alt='用户头像'>
            </div>
            <div class='imgStyle'></div>
        </div>

        <div class='baseInfo'>
            <div class='userName'>{{baseUserInfo.userName}}</div>
            <h3>基础资料</h3>
            <ul>
                <li>
                    <div>是否互加好友</div>
                    <div>功能待实现</div>
                </li>
                <li>   
                    <div>性别</div>
                    <div>{{baseUserInfo.sex}}</div> 
                </li>
                <li>   
                    <div>年龄</div>
                    <div>{{baseUserInfo.age}}</div>
                </li>
                <li>   
                    <div>学历</div>
                    <div>{{baseUserInfo.education}}</div>
                </li>
                <li>   
                    <div>星座</div>
                    <div>{{baseUserInfo.constellation}}</div>
                </li>
            </ul>
        </div>

        <div class='foot-bar-wrapper'>
            <div class='foot-bar' @click='remenberYou'>
                加好友
            </div>
            <div class='foot-bar' @click='startChat'>
                发消息
            </div>
        </div>

        <alert v-show='mdState' @closeMd='closeMd' :message='mdMessage'></alert>
    </div>
</template>

<script>
    import alert from '../../components/alert.vue'
    import { addFriend, getOtherInfo } from '../../getData/getData.js'
    import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
                baseUserInfo: {
                    userName: '未获取',
                    sex: '未获取',
                    age: '未获取',
                    education: '未获取',
                    constellation: '未获取',
                    avatarUrl: '#'
                },
                mdState: false,
                mdMessage: 'something from father'
            }
        },
        components: { alert },
        created(){
            var own_id = this.$store.state.userInfo._id,
                other_id = this.$route.params.user_id;
            if ( own_id === other_id ) this.$router.replace('/fixInfo')
            getOtherInfo( own_id, other_id ).then((val)=>{
                this.baseUserInfo = Object.assign({}, this.baseUserInfo, val.data.data) 
            })
        },
        methods: {
            ...mapMutations(['SET_CHAT_MAN']),
            back() {
                this.$router.go(-1)
            },
            closeMd(){
                this.mdState = false;
            },
            async remenberYou(){
                var own_id = this.$store.state.userInfo._id,
                    other_id = this.$route.params.user_id;
                var val = await addFriend(own_id, other_id);
                var msg = val.data.msg;
                if ( msg === 'success'){
                    this.mdMessage = '添加成功'
                }else{
                    this.mdMessage = msg
                }
                this.mdState = true
            },
            startChat(){
                let thePerson = {
                    _id: this.$route.params.user_id,
                    avatarUrl: this.baseUserInfo.avatarUrl,
                    userName: this.baseUserInfo.userName
                }
                this.SET_CHAT_MAN(thePerson);
                this.$router.push('/chat/' + thePerson._id);
            }
        }
    }

</script>

<style scoped>

.user-detail-info-wrap{
    margin-bottom: 40px;  
}

/*用户头像样式*/
.userImgWrap{
    position: relative;
    left: 0;
    right: 0;
}

.img-padding-wrapper{
    position: relative;
    width: 100%;
    padding-top: 100%;
    height: 0;
}

.userImgWrap img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.userImgWrap .imgStyle{
    position: absolute;
    bottom: -1px;
    border-width: 5rem 50vw 5rem 50vw;
    border-color: transparent #fff #fff transparent;
    border-style: solid;
}
.userImgWrap .changeUserImg{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.8rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    z-index: 101;
    font-size: 3.4rem;
}


.userName{
    text-align: center;
    color: #f40;
    font-size: 4.5rem;
}


.foot-bar-wrapper{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    display: flex;
}

.foot-bar{
    flex: 1;
    background: #fff;
    border: 0.5px solid rgba(240,240,240,0.9);
    margin-right: 1px;
    line-height: calc(40px - 1px);
    text-align: center;
}

.foot-bar:nth-of-type(2){
    background: #2196f3;
}


</style>
