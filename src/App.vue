<template> 
    <!--设置高度只为了让子元素能继承满屏高度-->
    <router-view style='height:100%'></router-view>
</template>

<script>
  import { getUserInfo } from './getData/getData'
  import { mapMutations } from 'vuex'

  export default {
        created(){
            const loginCheck = (to, from, next) => {
                if(this.$store.state.isLogin) {
                    next()
                }else if(to.path == '/login' || to.path == '/signup'){
                    next()
                }
                else{
                    this.$router.push({path: '/login'})
                }
            }
            // this.$router.beforeEach(loginCheck);
            // 前端开发是暂时不开启该功能, 路由守卫，是否有登陆信息

            getUserInfo().then( (res) => {
                var val = res.data;
                if ( val === 'noSession' ){
                    this.$router.push({path: '/login'})
                }else{
                    this.$store.commit('SET_USER_INFO', val);
                }
            } )
        },
        methods: {
            ...mapMutations(['SET_USER_INFO'])
        }
  }
</script>

<style lang='scss'>
body, div, span, header, footer, nav, section, aside, article,
  ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea,
  button, input, select, figure, figcaption, {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    color: #333;
    font-weight: normal;
    font-family: "Microsoft Yahei";
    box-sizing: border-box;
    -webkit-tap-highlight-color:transparent;
    -webkit-font-smoothing: antialiased;
    &:hover{
        outline: none;
    }
} 
body{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

@media only screen and (max-width: 1080px), only screen and (max-device-width:1080px) {
    html,body {
    font-size:16.875px;
    }
 }
 @media only screen and (max-width: 960px), only screen and (max-device-width:960px) {
    html,body {
    font-size:15px;
    }
 }
 @media only screen and (max-width: 800px), only screen and (max-device-width:800px) {
    html,body {
    font-size:12.5px;
    }
 }
 @media only screen and (max-width: 720px), only screen and (max-device-width:720px) {
    html,body {
    font-size:11.25px;
    }
 }
 @media only screen and (max-width: 640px), only screen and (max-device-width:640px) {
    html,body {
    font-size:10px;
    }
 }
 @media only screen and (max-width: 600px), only screen and (max-device-width:600px) {
    html,body {
    font-size:9.375px;
    }
 }
 @media only screen and (max-width: 540px), only screen and (max-device-width:540px) {
    html,body {
    font-size:8.4375px;
    }
 }
 @media only screen and (max-width: 480px), only screen and (max-device-width:480px) {
    html,body {
    font-size:7.5px;
    }
 }
 @media only screen and (max-width: 414px), only screen and (max-device-width:414px) {
    html,body {
    font-size:6.46875px;
    }
 }
 @media only screen and (max-width: 400px), only screen and (max-device-width:400px) {
    html,body {
    font-size:6.25px;
    }
 }
 @media only screen and (max-width: 375px), only screen and (max-device-width:375px) {
    html,body {
    font-size:5.859375px;
    }
 }
 @media only screen and (max-width: 360px), only screen and (max-device-width:360px) {
    html,body {
    font-size:5.625px;
    }
 }

    @media only screen and (max-width: 320px), only screen and (max-device-width:320px) {
        html,body {
        font-size:5px;
        }
    }

    @media only screen and (max-width: 240px), only screen and (max-device-width:240px) {
        html,body {
        font-size:3.75px;
        }
    }
</style>