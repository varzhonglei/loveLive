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
            <div class='img-padding-wrapper'>
                <img :src="baseUserInfo.avatarUrl">
            </div>
            <div class='imgStyle'></div>
            <div>
                <div class='changeUserImg'>
                    <span>更换头像</span>
                    <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                </div>
            </div>
        </div>

        <div class='baseInfo'>
            <h2>基础资料</h2>
            <ul>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "userName"}'>   
                    <label>昵称</label>
                    <div class='itemContent' @click='checkItem("userName")'>{{baseUserInfo.userName}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.userName' v-focus='itemState.editing === "userName"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true}'>   
                    <label>性别</label>
                    <div class='itemContent'>{{baseUserInfo.sex}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.sex' v-focus='itemState.editing === "sex"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "age"}'>   
                    <label>年龄</label>
                    <div class='itemContent' @click='checkItem("age")'>{{baseUserInfo.age}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.age' v-focus='itemState.editing === "age"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "height"}'>   
                    <label>身高</label>
                    <div class='itemContent' @click='checkItem("height")'>{{baseUserInfo.height}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.height' v-focus='itemState.editing === "height"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "weight"}'>   
                    <label>体重</label>
                    <div class='itemContent' @click='checkItem("weight")'>{{baseUserInfo.weight}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.weight' v-focus='itemState.editing === "weight"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "education"}'>   
                    <label>学历</label>
                    <div class='itemContent' @click='checkItem("education")'>{{baseUserInfo.education}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.education' v-focus='itemState.editing === "education"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "constellation"}'>   
                    <label>星座</label>
                    <div class='itemContent' @click='checkItem("constellation")'>{{baseUserInfo.constellation}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.constellation' v-focus='itemState.editing === "constellation"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "job"}'>   
                    <label>工作</label>
                    <div class='itemContent' @click='checkItem("job")'>{{baseUserInfo.job}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.job' v-focus='itemState.editing === "job"' @blur='leaveItem'>
                </li>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "city"}'>   
                    <label>城市</label>
                    <div class='itemContent' @click='checkItem("city")'>{{baseUserInfo.city}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.city' v-focus='itemState.editing === "city"' @blur='leaveItem'>
                </li>
            </ul>
        </div>

        <div class='activeInfo'>
            <h2>活动展示资料</h2>
             未完待续
        </div>

        <div class='submitWrap'>
            <button class='submitBtn' @click='submitInfo'>保 存</button>
        </div>
        
        <alert v-show='mdState' @closeMd='closeMd' :message='message'></alert>
    </div>
</template>

<script>
    import alert from '../../components/alert.vue'
    import { fixInforReq, updateAvatar_getToken, updateAvatar_saveUrl } from '../../getData/getData.js'
    import * as qiniu from 'qiniu-js'
    export default {
        data() {
            return {
                baseUserInfo: {
                    sex: '',
                    age: '18',
                    height: '178',
                    weight: '65kg',
                    education: '本科',
                    constellation: '天蝎',
                    job: 'FE',
                    city: '香港',
                    userName: '以上性息获取中',
                    avatarUrl: ''
                },
                itemState: {
                    editing: ''
                },
                mdState: false,
                message: 'something from father'
            }
        },
        components: { alert },
        created(){
            let userInfo = this.$store.state.userInfo;
            this.baseUserInfo = Object.assign({}, this.baseUserInfo, userInfo);
        },
        methods: {
            checkItem(item) {
                this.itemState.editing = item
            },
            leaveItem(){
                this.itemState.editing = '';
            },
            back() {
                this.$router.go(-1)
            },
            closeMd(){
                this.mdState = false;
            },
            submitInfo(){
                fixInforReq({baseUserInfo: this.baseUserInfo}).then((val)=>{
                    if(val.data == 'success'){
                        this.message = '修改成功';
                        this.$store.commit('FIX_USER_INFO', this.baseUserInfo);
                    }else {
                        this.message = '修改失败';
                    }
                    this.mdState = true;
                })
            },
            async uploadAvatar(){
                //上传头像
                let input = document.querySelector('.profileinfopanel-upload')
                try{
                    let res = await updateAvatar_getToken();
                    if ( !res.data ) { throw new Error('上传凭证获取失败') }
                    var uploadToken = res.data;
                    var key = `${this.$store.state.userInfo._id}_avatar.png`;
                    var config = {
                        //useCdnDomain: true,是否使用cdn加速
                        region: qiniu.region.z0
                    };
                    var putExtra = {
                        fname: "",
                        params: {},
                        mimeType: ["image/png", "image/jpeg", "image/gif"]
                    };
                    var observer = {
                        next(res){
                            console.log(res)
                        },
                        error:(err) => {
                            this.mdState = true;
                            this.message = '上传失败';
                            throw new Error(err)
                        }, 
                        complete: async (res) => {
                            let response = await updateAvatar_saveUrl(res);
                            console.log(response)
                            if ( response.data.status == 0 ){
                                this.baseUserInfo.avatarUrl = 'http://p6fs5mtoh.bkt.clouddn.com/' +res.key + '?' +Math.ceil(Math.random()*10000);
                                this.$store.commit('FIX_USER_INFO', this.baseUserInfo);
                            }else{
                                throw new Error('500, 保存链接失败')
                            }
                        }
                    };
                    var observable = qiniu.upload(input.files[0], key, uploadToken, putExtra, config)
                    var subscription = observable.subscribe(observer) // 上传开始
                }catch (error) {
                    this.mdState = true;
                    this.message = '上传失败';
                    throw new Error(error);
                }
            }
        },
        directives:{
            focus:{
                update(el, binding){
                    if(binding.value){
                        el.focus()
                    }
                }
            }
        }
    }

</script>

<style scoped>
/*保存按钮样式*/
.submitWrap{
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%);
    width: 6.5em;
    height: 4rem;
}
.submitBtn{
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    background: #2196f3; 
    font-size: 3rem;  
}


/*每条信息样式*/
.itemWrap{
    height: 4rem;
}
.itemWrap label{
    width: 24%;
    display: inline-block;
    font-size: 3rem;
    text-indent: 1rem;
}
.itemContent{
    display: inline-block;
    font-size: 3rem;
    width: 72%;
    padding: 0.5rem;
}
.itemInp{
    display: none;
    border: 1px solid #aaa;
    width: 71%;
    font-size: 3.4rem;
    padding: 0.5rem 3rem 0.5rem 0.5rem;
}
.checked .itemInp{
    display: inline-block;
}
.checked .itemContent{
    display: none;
}
h2{
    font-size: 3.4rem;
    font-weight: 700;
    text-indent: 1rem;
}



/*用户头像样式*/
.userImgWrap{
    position: relative;
    left: 0;
    right: 0;
}

.img-padding-wrapper{
    position: relative;
    width: 100%;
    padding-top: 100%;
    height: 0;
}

.userImgWrap img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.userImgWrap .imgStyle{
    position: absolute;
    bottom: -1px;
    border-width: 5rem 50vw 5rem 50vw;
    border-color: transparent #fff #fff transparent;
    border-style: solid;
}
.userImgWrap .changeUserImg{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.8rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    z-index: 101;
    font-size: 3.4rem;
    background: rgba(200,200,240,0.5);
    border-radius: 10px;
}

.profileinfopanel-upload{
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}


    
</style>