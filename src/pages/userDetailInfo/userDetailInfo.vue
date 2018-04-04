<template>
    <div>
        <div class='backBtnWrap'>
            <div class='backBtnWrap2' @click='back'>
                <svg version="1.1" viewBox="0 0 1000 1000" >
                    <g><path d="M717.7,990L227.7,498.9L715.5,10l54.6,54.5L336.6,498.9l435.6,436.6L717.7,990z"/></g>
                </svg>
                <div class='backText'>返回</div>
            </div>
        </div>

        <div class='userImgWrap'>
            <img src="../../images/bar.jpg">
            <div class='imgStyle'></div>
        </div>

        <div class='baseInfo'>
            <h2>基础资料</h2>
            <ul>
                <li>
                    <div>是否互相记住</div>
                    <div>123</div>
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

    export default {
        data() {
            return {
                baseUserInfo: {
                    sex: '未获取',
                    age: '未获取',
                    education: '未获取',
                    constellation: '未获取',
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
                console.log(22)
            }
        }
    }

</script>

<style scoped>
/*用户头像样式*/
.userImgWrap{
    position: relative;
    left: 0;
    right: 0;
}
.userImgWrap img{
    width: 100%;
    height: 31rem;
}
.userImgWrap .imgStyle{
    position: absolute;
    bottom: 0;
    border-width: 5rem 50vw 5rem 50vw;
    border-color: transparent #fff #fff transparent;
    border-style: solid;
}

.foot-bar-wrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3.5rem;
    display: flex;
}

.foot-bar{
    flex: 1;
    border: 0.5px solid rgba(240,240,240,0.9);
    margin-right: 1px;
    line-height: calc(3.5rem - 1px);
    text-align: center;
}

.foot-bar:nth-of-type(2){
    background: #2196f3;
}


</style>
