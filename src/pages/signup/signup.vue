<template>  
    <div class='signup-wrapper'>
        <form action="" id='signip-form'>
            <h2 class='signup-title'>Welcome To LoveLive</h2>
            <h4 class='signup-describe'>Signup Your Own Account Now</h4>
            <div class='input-wrapper'>
                <label for='userAccount'>账号</label>
                <input v-model='account' type="text" id='userAccount'>
            </div>
            <div class='input-wrapper'>
                <label for='password'>密码</label>
                <input v-model='password' type="password" id='password'>
            </div>
            <div class="control">
                <router-link tag='button' to='/login'>返回登陆</router-link>
                <button type='button' @click='handSignup'>注册</button>
            </div>
            <div class='signup-foot'>
                <div>✔&nbsp;我已阅读并同意金安的协议</div>
            </div>
        </form>
    </div>
</template>

<script>
    import { signup } from '../../getData/getData.js'
    export default {
        data(){
            return {
                account: '',
                password: ''
            }
        },
        methods:{
            handSignup () {
                var user = {
                            user: {
                                account: this.account, 
                                password: this.password
                            }
                        };
                signup(user).then(
                    ( val ) => { 
                        if (val.data == 'signupSuccess'){
                            this.$router.push( {path: '/login'} );
                        } else if (val.data == '该账户已被注册') {
                            alert( val.data )
                        }
                    }
                )
            }
        }
    }   
</script>

<style scoped>
    .signup-wrapper{
        height: 100%;
        background-color: rgba(112, 128, 144, 0.5);
        overflow: hidden; /*触发bfc解决margin塌陷问题*/
    }
    .signup-title{
        text-align: center;
        margin-top: 40px;
    }
    .signup-describe{
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

    .signup-wrapper input:focus{
        box-shadow: 0 0 10px #333;
    }

    .signup-wrapper input{
        display: block;
        width: 100%;
        height: 30px;
        padding: 5px;
        border-radius: 5px;
        background-color: antiquewhite;
    }

    .signup-foot{
        position: absolute;
        padding: 15px;
        left:0;
        right: 0;
        bottom: 0;
        margin-bottom: 30px;
        text-align: center;
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
    .control button:nth-of-type(1){
        flex: 1 1 50px;
    }
    .control button:nth-of-type(2){
        flex: 1 1 80px;
    }
</style>