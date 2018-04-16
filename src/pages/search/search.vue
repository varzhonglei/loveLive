<template>
    <div>
        <nav-component></nav-component>
        <slider></slider>
        <div class='search-wrap'>
            <div class="search-input-wrap">
                <el-input placeholder="请输入用户账号 或 昵称" v-model="searchKey" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click='handSearchUser'></el-button>
                </el-input>
            </div>
            <div class="search-result">
                <ul>
                    <li v-for="item in searchResults" class='friends-item-wrapper' @click='openUserInfo(item._id)'>
                        <div class='avatar-wrapper'>
                            <img :src="item.avatarUrl" alt="用户头像">
                        </div>
                        <div class='name-and-msg-wrapper'>
                            <div class='userName-wrapper'>{{item.userName}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class='no-result' v-show='searchKey != "" && searchResults.length == 0 '>无结果</div>
        </div>
    </div>
</template>

<script>
    import navComponent from '../../components/header.vue'
    import slider from '../../components/slider/slider.vue'
    import { searchUser } from '../../getData/getData.js'
    export default { 
        data(){
            return{
                searchKey: '',
                searchResults: []
            }
        },
        components: { navComponent, slider },
        methods: {
            async handSearchUser(){
                let res = await searchUser( this.searchKey );
                console.log(res.data.searchResults)
                this.searchResults = res.data.searchResults;
            },
            openUserInfo(_id){
                this.$router.push('/userDetailInfo/' + _id)
            }
        }
    }
</script>

<style scoped>
    .search-wrap{
        margin-top: 55px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .search-input-wrap{
        padding: 10px 0;
        margin: 0 auto;
        width: 80%;
    }

    .no-result{
        width: 100%;
        padding: 20px;
        font-size: 4.5rem;
        color: #eee;
        text-align: center;
    }

</style>