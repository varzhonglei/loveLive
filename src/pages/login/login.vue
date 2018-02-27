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
    </div>
</template>

<script>
    import { login } from '../../getData/getData.js'
    export default {
        data(){
            return {
                account: '',
                password: ''
            }
        },
        methods:{
            handLogin () {
                login({account: this.account, password: this.password}).then(( val ) =>{ 
                    if (val.data === 'loginSuccess') {
                        this.$router.push({path: '/'})
                    }else {
                        alert(val.data)
                    }
                 })
            }
        }
    }   
</script>

<style scoped>
.login-wrapper{
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