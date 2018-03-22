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
            <img src="../../images/bar.jpg">
            <div class='imgStyle'></div>
            <div class='changeUserImg'>更换头像</div>
        </div>

        <div class='baseInfo'>
            <h2>基础资料</h2>
            <ul>
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "sex"}'>   
                    <label>性别</label>
                    <div class='itemContent' @click='checkItem("sex")'>{{baseUserInfo.sex}}</div>
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
                <li v-bind:class='{itemWrap:true, checked: itemState.editing === "xingZuo"}'>   
                    <label>星座</label>
                    <div class='itemContent' @click='checkItem("xingZuo")'>{{baseUserInfo.xingZuo}}</div>
                    <input class='itemInp' type="text" v-model='baseUserInfo.xingZuo' v-focus='itemState.editing === "xingZuo"' @blur='leaveItem'>
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
    import { fixInforReq } from '../../getData/getData.js'

    export default {
        data() {
            return {
                baseUserInfo: {
                    sex: '男',
                    age: '18',
                    height: '178',
                    weight: '40kg',
                    education: '本科',
                    xingZuo: '天蝎',
                    job: '程序员',
                    city: '成都'
                },
                itemState: {
                    editing: ''
                },
                mdState: false,
                message: 'something from father'
            }
        },
        components: { alert },
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
                    }else {
                        this.message = '修改失败';
                    }
                    this.mdState = true;
                })
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
    margin-left: -2.5rem;
    width: 6.5em;
    height: 3rem;
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
    width: 75%;
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
.userImgWrap img{
    width: 100%;
    height: 31rem;
}
.userImgWrap .imgStyle{
    position: absolute;
    bottom: 0;
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
}


/*返回按钮样式*/
.backBtnWrap{
    position: absolute;
    top: 0;
    padding: 1rem;
    z-index: 100;
}
.backBtnWrap2{
    padding: 2px;
}
.backBtnWrap2::after{
    content: '';
    display: block;
    clear: both;
}
.backBtnWrap svg{
    float: left;
    width: 2rem;
    height: 2rem;
}
.backBtnWrap .backText{
    float: left;
    height: 2rem;
    line-height: 2rem;
    font-size: 3.4rem;
    display: inline-block;
}
    
</style>