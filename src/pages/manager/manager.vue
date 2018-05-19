<template>
    <div class='mg-all-wrapper'>
        <h2 class='admin-tittle'>
            <div class='go-home' @click='goHome'>主页</div>
            <span>admin</span>
            <div class='category'>动态监管</div>
        </h2>
        <div class='manager-wrapper square'>
            <my-scroll  :data='squareActive' 
                        :pulldown='true' 
                        @pulldown='refreshDongTai'
                        :pullup='true'
                        @scrollToEnd='getOldDongTai'>
                <div class='content'>
                    <div class="square-item mg-item" v-for='item in squareActive'>
                        <div class="square-item-userinfo-wrapper">
                            <img class='user-head-img' :src="item.whoPublish && item.whoPublish.avatarUrl"  @click='goUserDetailInfo(item.whoPublish && item.whoPublish._id)'  alt="用户头像">
                            <div class="square-item-username">{{item.whoPublish && item.whoPublish.userName}}</div>
                        </div>
                        <div class="square-contentText-wrapper">
                            <div class="square-contentText" >
                                {{item.content}}
                            </div>
                        </div>
                        <div class='mg-remove' @click='removeDongTai(item._id)'>删除</div>
                    </div>
                </div>
            </my-scroll>
        </div>
    </div>
</template>

<script>
    import myScroll from '../../components/scroll.vue'
    import { getSquareActive, deleteDongtai } from '../../getData/getData.js'
    import { mapGetters } from 'vuex'

    export default {
        data(){
            return{
                squareActive: {}, 
            }
        },
        computed:{
            ...mapGetters(['getOwnId', 'getOwnAccount'])
        },
        components: { myScroll },
        created(){
            var getOptions = {
                getType: 'INIT',
                getNum: 8
            }
            getSquareActive(getOptions).then( ( res ) => { 
                if(res.data.data){
                    this.squareActive = res.data.data
                }
            })
        },
        methods:{
            async removeDongTai(_id){
                let res = await deleteDongtai({_id: _id});
                if (res.data.status == 0){
                    alert('删除成功');
                    this.$router.go(0);
                }else{
                    alert(res.data.message);
                    this.$router.go(-1);
                }
            },
            goHome(){
                this.$router.push('/')
            },
            refreshDongTai(){
                var counterpart_time = this.squareActive[0].meta.updateAt
                var getOptions = {
                    getType: 'REFRESH',
                    getNum: 8,
                    counterpart_time: counterpart_time
                }
                getSquareActive(getOptions).then( ( res ) => { 
                    if(res.data.data){
                        this.squareActive = [...res.data.data, ...this.squareActive]
                    }
                })
            },
            getOldDongTai (){
                var counterpart_time = this.squareActive[this.squareActive.length - 1].meta.updateAt
                var getOptions = {
                    getType: 'GET_OLD',
                    getNum: 8,
                    counterpart_time: counterpart_time
                }
                getSquareActive(getOptions).then( ( res ) => { 
                    if(res.data.data){
                        this.squareActive = [...this.squareActive, ...res.data.data]
                    }
                })
            }
        }
    }

</script>

<style scoped>

.mg-all-wrapper{
    position: relative;
}

.admin-tittle{
    text-align: center;
    box-sizing: content-box;
    padding-top: 10px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    z-index: 100;
    background: rgba(245,245,245,1)
}
.go-home{
    position: absolute;
    top: 10px;
    left: 0;
    margin-left: 10px;
    font-size: 18px;
}
.category{
    position: absolute;
    right: 0;
    top: 10px;
    margin-right: 10px;
    font-size: 18px;
    color: rgba(20,20,20,.3)
}

.manager-wrapper{
    padding-top: 40px;
}

.mg-item{
    position: relative;
}

.mg-remove{
    position: absolute;
    bottom: 5px;
    right: 12px;
    width: 60px;
    height: 40px;
    background: #f40;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
}


</style>

