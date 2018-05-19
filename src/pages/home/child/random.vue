<template>
    <div class='random-wapper'>
        <div class="random-title" v-if='this.randomTitle < 0.25'>
            根据<span>菜的抠角</span>的<span>月老算法</span>计算
            <br/>您的<span>有缘人</span>如下
        </div>
        <div class="random-title" v-else-if='this.randomTitle < 0.5'>
            你造么，在<span>平行世界</span>里
            <br/><span>下雨天</span>
            <br/>你们两个一起等候回家的<span>末班车</span>
        </div>
        <div class="random-title" v-else-if='this.randomTitle < 0.75'>
            在<span>平行宇宙</span>中
            <br/>转过<span>街角</span>
            <br/>匆匆驰来一人撞掉了你怀你的<span>书</span>
        </div>
        <div class="random-title" v-else-if='this.randomTitle == 1'>
            和异性交流怎么就这么<span>难</span>
            <br/>要不试试同性间的<span>火花</span>
            <br/>这可是<span>缘分彩蛋</span>中的
            <br/><span class='ssr'>ssr</span>
        </div>
        <div class="random-title" v-else>您<span>的好朋友</span><br/>又给你物色了<span>相亲对象</span></div>
        <div class='random-content' @click='openDetail()'>
            <div class='user-head-img-wrap'>
                <img :src="theUserInfo.avatarUrl" alt="用户头像">
            </div>
            <div class='user-name-wrap'>{{theUserInfo.userName}}</div>
        </div>
    </div>
</template>

<script>
    import { getUsersByRandom } from '../../../getData/getData.js'
    export default{
        data(){
            return{
                randomTitle: 0,
                theUserInfo: {}
            }
        },
        created(){
            this.randomTitle = Math.random();
            this.init()
        },
        methods:{
            async init(){
                let res = await getUsersByRandom()
                if ( res.data.type ) return console.log("server_err", res.data.type)
                if ( res.data.srr ) this.randomTitle = 1;
                this.theUserInfo = res.data.data;
            },
            openDetail(){
                if ( this.theUserInfo._id ) this.$router.push('/userDetailInfo/' + this.theUserInfo._id)
            }
        }
    }
</script>

<style scoped>
.random-wapper{
    padding: 5px 12px;
    height: 100%;
}
.random-title{
    padding: 5px 12px;
    background: #f3f3f3;
    border-radius: 5px;
    text-align: center;
}
.random-title span{
    color: #24a1aa;
}

.random-content{
    width: 60%;
    margin: 10px auto;
    background: #f1f2f3;
    border-radius: 5px;
    padding: 10px;
}

.user-head-img-wrap{
    position: relative;
    height: 0;
    box-sizing: content-box;
    width: 100%;
    padding-top: 100%;
}
.user-head-img-wrap img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.user-name-wrap{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.ssr{
    font-size: 5rem;
    color: #f40 !important;
}

</style>