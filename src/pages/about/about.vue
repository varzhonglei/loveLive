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
        <div class='agreement-wrapper'>
            <div class='agreement-content'>
                <div>《关于LoveLive》</br></div>
                1.lovelive目前仅用于学习与娱乐，不打算有商业用途</br>
                2.用户使用lovelive时,密码不要和平时使用密码相同；取些简单的密码就够用，比如：123</br>
                3.目前lovelive处于开发阶段，为了您的信息安全，不要填写真实的个人信息</br>
                4.lovelive是由前端小白，后端纯白的菜鸟工程师钟金安开发。您在使用时，系统可能崩溃，数据可能被盗、丢失，页面隐藏较多未知bug，要有好心理准备。</br>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods:{
            back() {
                this.$router.go(-1)
            },
        }
    }

</script>

<style scoped>
.agreement-wrapper{
    margin-top: 60px;
}

.agreement-content{
    background: #eee;
    margin: 10px 20px 30px;
    border-radius: 5px;
    font-size: 14px;
}
</style>