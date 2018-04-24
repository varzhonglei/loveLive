<template>  
    <div class='login-wrapper'>
        <form action="" id='login-form' class='well'>
            <h2 class='login-title'>LoveLive</h2>
            <h4 class='login-describe'>Please Login To Your Account</h4>
            <div class='input-wrapper'>
                <label for='userAccount'>账号</label>
                <input type="text" id='userAccount' v-model='account'>
            </div>
            <div class='input-wrapper'>
                <label for='password'>密码</label>
                <input type="password" id='password' v-model='password'>
            </div>
            <div class="control">
                <button type='button' @click='handLogin'>登陆</button>
            </div>
            <div class='login-foot'>
                <div onclick='alert("暂时无法找回密码，请重新注册")'>忘记密码</div>
                <div><router-link to='/signup'>注册账号</router-link></div>
            </div>
        </form>
        <alert v-show='mdState' @closeMd='closeMd' :message='message'></alert>
    </div>
</template>

<script>
    import { login } from '../../getData/getData.js'
    import { mapMutations } from 'vuex'
    import io from 'socket.io-client'
    import { baseUrl } from '../../config/env'

    export default {
        data(){
            return {
                account: '',
                password: '',
                mdState: false,
                message: 'something from father'
            }
        },
        methods:{
            ...mapMutations(['SET_USER_INFO', 'SET_SOCKET', 'INIT_SOCKET', 'ADD_NEW_MSG', 'ADD_NEW_MSGS']),
            handLogin () {
                let handMsgFromOne; 
                handMsgFromOne = ( msg ) => {
                    this.ADD_NEW_MSG(msg)
                }
                login({account: this.account, password: this.password}).then(( res ) =>{ 
                    //axios自动帮你把返回值转化为对象，不用调用 JSON.parse了
                    var val = res.data;
                    console.log(val)
                    if (val.loginState === 'loginSuccess') {
                        this.SET_USER_INFO( val.data );
                        let msgArr = this.msgFromChange(val.msgArr);
                        this.ADD_NEW_MSGS( msgArr );
                        this.SET_SOCKET( io.connect(baseUrl) );  
                        this.INIT_SOCKET();   
                        this.$store.state.socket.on('msgFromOne', handMsgFromOne);
                        this.$router.push({path: '/'})
                    }else {
                        this.message = val.loginState;
                        this.mdState = true;
                    }
                 })
            },
            closeMd (){
                this.mdState = false;
            },
            msgFromChange(arr){
                try{
                    return arr.map((item, index, arr)=>{
                        item.avatarUrl = item.from.avatarUrl;
                        item.userName = item.from.userName;
                        item.from = item.from._id
                        return item
                    })
                }catch(e){
                    console.log(e)
                    return []
                }
            }
        }
    }   
</script>

<style scoped>
h2{
    font-size: 4rem;
}
h4{
    font-size: 3.4rem;
}

.login-wrapper{
    font-size: 3rem;
    height: 100%;
    background-color: rgba(112, 128, 144, 0.5);
    overflow: hidden; /*触发bfc解决margin塌陷问题*/
}
.login-title{
    text-align: center;
    margin-top: 40px;
}
.login-describe{
    text-align: center;
    margin-bottom: 20px;
}
label{
    display: block;
    text-align: center;
    margin: 15px 0 5px 0;
}

.input-wrapper{
    padding: 0 20px;
}
.input-wrapper input:focus{
    box-shadow: 0 0 10px #333;
}

.login-wrapper input{
    display: block;
    width: 100%;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    background-color: antiquewhite;
}

.login-foot{
    position: absolute;
    padding: 15px;
    left:0;
    right: 0;
    bottom: 0;
    margin-bottom: 30px;
}
.login-foot div{
    float: right;
    margin: 0 10px;
}

.control{
    padding: 20px 30px;
    display: flex;
}
.control button{
    height: 30px;
    margin: 0 15px;
    border-radius: 5px
}
.control button{
    flex: 1 1 50px;
}
</style>