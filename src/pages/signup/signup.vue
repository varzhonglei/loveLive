<template>  
<div>
    <div class='signup-wrapper'>
        <form action="#" id='signip-form'>
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
            <div class='input-wrapper'>
                <label for='passwordCheck'>确认密码</label>
                <input v-model='passwordCheck' type="password" id='passwordCheck'>
            </div>

            <div class='radio'>
                <input type="radio" id='male' value='male' v-model='sex'>
                <label for="male" :class='{picked: sex == "male" ? true : false}'>男</label>
                <input type="radio" id='female' value='female' v-model='sex'>
                <label for="female" :class='{picked: sex == "female" ? true : false}'>女</label>
                <div class='ti-shi'>性别确定后将不可更改！</div>
            </div>

            <div class="control">
                <router-link tag='button' to='/login'>返回登陆</router-link>
                <button type='button' @click='handSignup'>注册</button>
            </div>
            <div class='signup-foot'>
                <div class='wrapper-agreement-todo' @click='readAgreement'>
                    <span class='agreement-symbol-border'>{{duiHao}}</span>
                    &nbsp;我已阅读并同意<span>《用户注意事项》</span>
                </div>
            </div>
        </form>
        <div class='agreement-wrapper'>
            <div class='agreement-content'>
                <div>《用户注意事项》</br></div>
                1.lovelive目前仅用于学习与娱乐，不打算有商业用途</br>
                2.用户使用lovelive时,密码不要和平时使用密码相同；取些简单的密码就够用，比如：123</br>
                3.目前lovelive处于开发阶段，为了您的信息安全，不要填写真实的个人信息</br>
                4.lovelive是由前端小白，后端纯白的菜鸟工程师钟金安开发。您在使用时，系统可能崩溃，数据可能被盗、丢失，页面隐藏较多未知bug，要有好心理准备。</br>
            </div>
        </div>
        <alert v-show='mdState' @closeMd='closeMd' :message='message'></alert>
    </div>
</div>
</template>

<script>
    import alert from '../../components/alert.vue'
    import { signup } from '../../getData/getData.js'
    let regFormat = /[^a-zA-Z0-9`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    let formatCheckFun = ( account, password, passwordCheck ) => {
        let arr;
        if ( !account || account.length > 35 ) return '账号长度为1-35'
        arr =  account.match(regFormat);
        if ( arr ){
            return '账号中含有非法字符' + '"' + arr[0] + '"';
        }
        if ( !password || password.length > 35 ) return '密码长度为1-35'
        arr =  password.match(regFormat);
        if ( arr ){
            return '密码中含有非法字符' + '"' + arr[0] + '"';
        }
        if ( password != passwordCheck ) return '两次密码输入不一致'
        return false;
    }
    export default {
        data(){
            return {
                account: '',
                passwordCheck: '',
                password: '',
                sex: 'male',
                mdState: false,
                message: 'something from father',
                duiHao: ''
            }
        },
        components: { alert },
        methods:{ 
            readAgreement(){
                if(this.duiHao){
                    this.duiHao = ''
                }else{
                    this.duiHao = '✔'
                }
            },
            handSignup () {
                let passwordCheckFlag = formatCheckFun( this.account ,this.password, this.passwordCheck );
                if ( !passwordCheckFlag ){
                    if ( !this.duiHao ) {
                        this.message = '请阅读《用户注意事项》';
                        this.mdState = true
                        return
                    }
                    var user = {
                                user: {
                                    account: this.account, 
                                    password: this.password,
                                    sex: this.sex
                                }
                            };
                    signup(user).then(
                        ( val ) => { 
                            if (val.data == 'signupSuccess'){
                                this.message = '注册成功,3秒后自动跳转';
                                this.mdState = true;
                                setTimeout(()=>{this.$router.push( {path: '/login'} )},3000)
                            } else if (val.data == '该账户已被注册') {
                                this.message = val.data;
                                this.mdState = true;
                            }
                        }
                    )
                }else{
                    this.message = passwordCheckFlag;
                    this.mdState = true;
                }
            },
            closeMd (){
                this.mdState = false;
            }
        }
    }   
</script>

<style scoped>
/*单选框样式*/
#male, #female{
    display: none;
}

.radio{
    display: flex;
    padding: 0 3rem;
}

.radio .ti-shi{
    float: left;
    text-indent: 1rem;
    margin-top: 2rem;
    color: #faebd7;
}
.radio label{
    flex: 1;
    margin-top: 2rem;
    border: 1px solid #faebd7;

}
.picked{
    background: #faebd7;
}


h2{
    font-size: 4rem;
}
h4{
    font-size: 3.4rem;
}

.signup-wrapper{
    font-size: 3rem;
    min-height: 100%;
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
    position: relative;
    padding: 15px;
    left:0;
    right: 0;
    bottom: 0;
    font-size: 15px;
    color: #333;
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
    border-radius: 5px;
}
.control button:nth-of-type(1){
    flex: 1 1 50px;
}
.control button:nth-of-type(2){
    flex: 1 1 80px;
}

.agreement-symbol-border{
    display:inline-block;
    width: 12px;
    height: 12px;
    line-height: 12px;
    border: 1px solid #000;
}
.wrapper-agreement-todo span{
    color: #f62;
}

.agreement-content div{
    color: #f62;
    text-align: center;
}

.agreement-content{
    background: #eee;
    margin: 10px 20px 30px;
    border-radius: 5px;
    font-size: 14px;
}

</style>