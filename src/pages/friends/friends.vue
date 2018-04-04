<template>
    <div>
        <nav-component></nav-component>
        <slider></slider>
        <div class='content-wrap'>
            <div class='title-list' @click="toggleList('friends')">
                <span>friends</span> 
                <div class='title-list-wrapper-svg'>
                    <svg :class='{titleSvgOpen: !isShowFriends }' viewBox="0 0 1024 1024"  width="3rem" height="3rem"><path d="M512 736 128 320 896 320Z" p-id="2933" data-spm-anchor-id="a313x.7781069.0.i3" class="" fill="#1296db"></path></svg>
                </div>
            </div>
            <ul v-show='isShowFriends'>
                <li v-for="item in friends" class='friends-item-wrapper' @click='openChat(item._id)'>
                    <div class='avatar-wrapper'><img :src="item.avatarUrl" alt=""></div>
                    <div class='name-and-msg-wrapper'>
                        <div class='userName-wrapper'>{{item.userName}}</div>
                        <div class='msg-recent-wrapper'>我给你眨眼，只因为我爱你</div>
                    </div>
                </li>
            </ul>
            <div class='title-list' @click="toggleList('metPersons')">
                <span>metYou</span> 
                <div class='title-list-wrapper-svg'>
                    <svg :class='{titleSvgOpen: !isShowMetPersons }' viewBox="0 0 1024 1024"  width="3rem" height="3rem"><path d="M512 736 128 320 896 320Z" p-id="2933" data-spm-anchor-id="a313x.7781069.0.i3" class="" fill="#1296db"></path></svg>
                </div>
            </div>
             <ul v-show='isShowMetPersons'>
                <li v-for="item in metPersons" class='friends-item-wrapper'>
                    <div class='avatar-wrapper'><img src="http://p6fs5mtoh.bkt.clouddn.com/image/jpg/male.jpg" alt=""></div>
                    <div class='name-and-msg-wrapper'>
                        <div class='userName-wrapper'>黑豹子</div>
                        <div class='msg-recent-wrapper'>我给你眨眼，你很帅</div>
                    </div>
                </li>
             </ul>

            <div class='title-list' @click="toggleList('blackList')">
                <span>black</span> 
                <div class='title-list-wrapper-svg'>
                    <svg :class='{titleSvgOpen: !isShowBlackList }' viewBox="0 0 1024 1024"  width="3rem" height="3rem"><path d="M512 736 128 320 896 320Z" p-id="2933" data-spm-anchor-id="a313x.7781069.0.i3" class="" fill="#1296db"></path></svg>
                </div>
            </div>
            <ul v-show='isShowBlackList'>
                <li v-for="item in blackList" class='friends-item-wrapper'>
                    <div class='avatar-wrapper'><img src="http://p6fs5mtoh.bkt.clouddn.com/image/jpg/male.jpg" alt=""></div>
                    <div class='name-and-msg-wrapper'>
                        <div class='userName-wrapper'>黑豹子</div>
                    </div>
                </li>
             </ul>
        </div>
    </div>
</template>

<script>
    import navComponent from '../../components/header.vue'
    import slider from '../../components/slider/slider.vue'
    import { getRelationList } from '../../getData/getData.js'

    export default { 
        data(){
            return {
                friends: [
                    { avatarUrl: '', userName: '', _id: '' },
                    { avatarUrl: '', userName: '', _id: '' },
                    { avatarUrl: '', userName: '', _id: '' },
                    { avatarUrl: '', userName: '', _id: '' }
                ],
                metPersons: [                    
                    { avatarUrl: '', userName: '', _id: '' },
                    { avatarUrl: '', userName: '', _id: '' },
                    { avatarUrl: '', userName: '', _id: '' },
                    { avatarUrl: '', userName: '', _id: '' }],
                blackList: [{ }, { },{ }, { }],
                isShowFriends: true,
                isShowMetPersons: true,
                isShowBlackList: false
            }
        },
        created(){
            getRelationList().then(( val ) => {
                var data = val.data.data;
                this.friends = data.friends;
            })
        },
        methods:{
            toggleList(type){
                if( type === 'friends' ){
                    this.isShowFriends = !this.isShowFriends
                }else if( type === 'metPersons' ){
                    this.isShowMetPersons = !this.isShowMetPersons
                }else if ( type === 'blackList'){
                    this.isShowBlackList = !this.isShowBlackList
                }
            },
            openChat( other_id ){
                this.$router.push('/chat/' + other_id)
            }
        },
        components: { navComponent, slider }
    }


</script>

<style scoped>
    .content-wrap{
        margin-top: 55px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    .friends-item-wrapper{
       border: 0.5px solid rgb(248,248,240);
    }

    .content-wrap ul li{
        padding-left: 1rem;
    }

    .avatar-wrapper, .name-and-msg-wrapper{
        display: inline-block;
    }
    .name-and-msg-wrapper, .avatar-wrapper{
        height: 5rem;
    }
    .name-and-msg-wrapper{
        vertical-align: top;
    }

    .userName-wrapper, .msg-recent-wrapper{
        height: 2.5rem;
        line-height: 2.5rem;
    }
    .msg-recent-wrapper{
        font-size: 2.6rem;
        color: rgb(200, 200, 200)
    }

    .avatar-wrapper{
        width: 5rem;
        height: 5rem;       
    }

    .avatar-wrapper img{
        width: 100%;
        height: 100%;
    }

    .title-list{
        background: rgb(248, 248, 248);
        height: 4rem;
        line-height: 4rem;
        margin-bottom: 1px;
    }

    .title-list-wrapper-svg{
        float: left;
        height: 4rem;
        width: 4rem;
        padding: 0.5rem 0;
        margin-right: 1rem;
    }

    .title-list-wrapper-svg svg{
        transition: all .08s ease-in 0s;
    }

    .titleSvgOpen{
        transform: rotate(-0.25turn);
    }

</style>