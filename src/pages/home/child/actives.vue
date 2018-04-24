<template>
    <div class='actives-wrapper'>
        <h2>Love Live</h2>
         <ul class='actives-content-wrapper'>
            <li class='need-flex actives-2-wrapper'>
                <div class='flex2 svg-wrapper'>
                    <div class="svg-close-wrapper mans">
                        <svg viewBox="0 0 1024 1024"><path d="M911.131 115.125c-4.447-1.422-9.328-1.438-13.858 0h-204.274c-12.195 0-22.079 9.885-22.079 22.079s9.884 22.079 22.079 22.079h156.559l-226.252 226.253c-56.169-57.835-134.749-93.785-221.741-93.785-170.708 0-309.098 138.388-309.098 309.098 0 170.708 138.388 309.098 309.098 309.098s309.098-138.388 309.098-309.098c0-67.779-21.831-130.45-58.826-181.401l235.547-235.547v174.623c0 12.193 9.884 22.079 22.079 22.079 12.193 0 22.079-9.885 22.079-22.079v-243.402h-20.409zM666.503 600.85c0 146.322-118.619 264.942-264.942 264.942s-264.942-118.619-264.942-264.942 118.619-264.942 264.942-264.942c146.322 0 264.942 118.619 264.942 264.942z" p-id="1641" fill="#1296db"></path></svg>
                    </div>
                </div>
                <ul class='flex8 persons-inner-wrapper need-10-padding'>
                    <li v-for='(item, index) in mans' class='need-relative'>
                        <div class='padding-box'>
                            <div :class="{ 'avatar-item-wrapper': true, 'need-border': !item.avatarUrl}">
                                <img :src="item.avatarUrl" alt="#" v-if='item.avatarUrl' class='inherit-h-w'>
                                <svg v-else viewBox="0 0 1024 1024" class='inherit-h-w'><path d="M977.455 558.545h-418.91v418.91c0 25.693-20.829 46.545-46.545 46.545s-46.545-20.852-46.545-46.545v-418.91H46.545C20.852 558.545 0 537.693 0 512c0-25.716 20.852-46.545 46.545-46.545h418.91V46.545C465.455 20.83 486.284 0 512 0s46.545 20.83 46.545 46.545v418.91h418.91c25.716 0 46.545 20.829 46.545 46.545 0 25.693-20.83 46.545-46.545 46.545z" fill="#707070" p-id="1115"></path></svg>
                            </div>
                        </div>
                        <div class='num'>{{index + 1}}</div>
                    </li>
                </ul>
            </li>
            <li class='need-flex actives-2-wrapper'>
                <div class='flex2 svg-wrapper'>
                    <div class="svg-close-wrapper">
                        <svg viewBox="0 0 1024 1024"><path d="M627.2 115.2c-153.6 0-281.6 128-281.6 281.6 0 70.4 25.6 134.4 64 179.2 0 0 0 0 0 0L281.6 704 160 582.4c-12.8-12.8-25.6-12.8-38.4 0-12.8 12.8-12.8 25.6 0 38.4l121.6 121.6-121.6 121.6c-12.8 12.8-12.8 25.6 0 38.4 6.4 6.4 12.8 6.4 19.2 6.4s12.8 0 19.2-6.4l121.6-121.6L403.2 896c6.4 6.4 12.8 6.4 19.2 6.4 6.4 0 12.8 0 19.2-6.4 12.8-12.8 12.8-25.6 0-38.4L320 742.4l121.6-121.6c0 0 0 0 0 0 51.2 38.4 108.8 64 179.2 64 153.6 0 281.6-128 281.6-281.6C908.8 243.2 780.8 115.2 627.2 115.2zM627.2 627.2c-128 0-230.4-102.4-230.4-230.4 0-128 102.4-230.4 230.4-230.4s230.4 102.4 230.4 230.4C857.6 524.8 748.8 627.2 627.2 627.2z" p-id="2298" fill="#d4237a"></path></svg>                     
                    </div>
                </div>
                <ul class='flex8'>
                    <div class='avatar-row-womans need-10-padding'>
                        <li v-for='(item, index) in womansFontFive' class='need-relative'>
                            <div class='padding-box'>
                                <div :class="{ 'avatar-item-wrapper': true, 'need-border': !item.avatarUrl}">
                                    <img :src="item.avatarUrl" alt="#" v-if='item.avatarUrl' class='inherit-h-w'>
                                    <svg v-else viewBox="0 0 1024 1024" class='inherit-h-w'><path d="M977.455 558.545h-418.91v418.91c0 25.693-20.829 46.545-46.545 46.545s-46.545-20.852-46.545-46.545v-418.91H46.545C20.852 558.545 0 537.693 0 512c0-25.716 20.852-46.545 46.545-46.545h418.91V46.545C465.455 20.83 486.284 0 512 0s46.545 20.83 46.545 46.545v418.91h418.91c25.716 0 46.545 20.829 46.545 46.545 0 25.693-20.83 46.545-46.545 46.545z" fill="#707070" p-id="1115"></path></svg>
                                </div>
                            </div>
                            <div class='num'>{{index + 1}}</div>
                        </li>
                    </div>
                    <div class='avatar-row-womans need-10-padding'>
                        <li v-for='(item, index) in womansAfterFive' class='need-relative'>
                            <div class='padding-box'>
                                <div :class="{ 'avatar-item-wrapper': true, 'need-border': !item.avatarUrl}">
                                    <img :src="item.avatarUrl" alt="#" v-if='item.avatarUrl' class='inherit-h-w'>
                                    <svg v-else viewBox="0 0 1024 1024" class='inherit-h-w'><path d="M977.455 558.545h-418.91v418.91c0 25.693-20.829 46.545-46.545 46.545s-46.545-20.852-46.545-46.545v-418.91H46.545C20.852 558.545 0 537.693 0 512c0-25.716 20.852-46.545 46.545-46.545h418.91V46.545C465.455 20.83 486.284 0 512 0s46.545 20.83 46.545 46.545v418.91h418.91c25.716 0 46.545 20.829 46.545 46.545 0 25.693-20.83 46.545-46.545 46.545z" fill="#707070" p-id="1115"></path></svg>
                                </div>
                            </div>
                            <div class='num'>{{index + 6}}</div>
                        </li>
                    </div>
                </ul>
            </li>
            <li class='need-flex'>
                <div class="flex2 need-relative">
                    <div class='adviser-text'>adviser</div>
                </div>
                <div class='flex8 actives-adviser-list-wrapper'>
                    <div class="actives-adviser-wrapper" v-for='(item, index) in advisers'>
                        <div class='padding-box'>
                            <div :class="{ 'avatar-item-wrapper': true, 'need-border': !item.avatarUrl}">
                                <img :src="item.avatarUrl" v-if='item.avatarUrl' class='inherit-h-w' alt="用户头像">
                                <svg v-else viewBox="0 0 1024 1024" class='inherit-h-w'><path d="M977.455 558.545h-418.91v418.91c0 25.693-20.829 46.545-46.545 46.545s-46.545-20.852-46.545-46.545v-418.91H46.545C20.852 558.545 0 537.693 0 512c0-25.716 20.852-46.545 46.545-46.545h418.91V46.545C465.455 20.83 486.284 0 512 0s46.545 20.83 46.545 46.545v418.91h418.91c25.716 0 46.545 20.829 46.545 46.545 0 25.693-20.83 46.545-46.545 46.545z" fill="#707070" p-id="1115"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class='join-btn-wrapper'>
                <div class="join-btn">进入活动</div>
            </li>
         </ul>
    </div>
</template>

<script>
    export default{
        data(){ 
            return{
                mans: [{ avatarUrl: 'http:\/\/p6fs5mtoh.bkt.clouddn.com/image/jpg/male.jpg' },{ avatarUrl: 'http:\/\/p6fs5mtoh.bkt.clouddn.com/image/jpg/male.jpg' },{},{},{}],
                womans: [{ avatarUrl: 'http:\/\/p6fs5mtoh.bkt.clouddn.com/image/jpg/female.jpg' },{},{},{},{},{},{},{},{},{}],
                advisers: [{ avatarUrl: 'http:\/\/p6fs5mtoh.bkt.clouddn.com/image/jpg/female.jpg' },{}]
            }
        },
        computed:{
            womansFontFive(){
                return this.womans.slice(0,5)
            },
            womansAfterFive(){
                return this.womans.slice(5)
            }
        }
    }
</script>

<style scoped>
.actives-wrapper{
    padding: 0 10px;
}

.actives-content-wrapper{
    padding: 10px 10px;
}

.actives-wrapper h2{
    text-align: center;
    color: #f40;
}
.need-flex{
    display: flex;
}
.flex2{
    flex: 2;
}

.flex8{
    flex: 8;
}
.svg-wrapper{
    position: relative;
}
.svg-close-wrapper{
    padding-top: 100%; 
    width: 100%; 
    position: relative; 
    top: 50%;
    transform: translateY(-50%);
}
.svg-close-wrapper.mans{
    padding-top: 50%;
}
.svg-wrapper svg{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%,-50%);
}
.svg-close-wrapper.mans svg{
    height: 100%;
    transform: translate(-50%,-50%);
}

.inherit-h-w{
    width: 100%;
    height: 100%;
}
.need-relative{
    position: relative;
}
.num{
    margin: 3px auto;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 10px;
    color: #fff;
    background: #CC89BD;
    border-radius: 50%;
}

.persons-inner-wrapper{
    display: flex;

}
.need-10-padding{
    padding-bottom: 10px;
}
.persons-inner-wrapper li{
    flex: 1;
}
.actives-2-wrapper{

}

.avatar-row-womans{
    display: flex;
    width: 100%;
}
.avatar-row-womans li{
    flex: 1;
    padding: 2px;
}


.padding-box{
    position: relative;
    padding-top: 90%;
    width: 90%;
    margin: 0 auto;
}
.avatar-item-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5%;
}
.need-border{
    border: 1px dashed rgba(200, 200, 200, .8);
}

.avatar-item-wrapper svg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    opacity: .4;
}

.actives-adviser-list-wrapper{
    padding: 10px 0;
}

.actives-adviser-wrapper{
    width: 20%;
    display: inline-block;
}
.adviser-text{
    position: absolute;
    top: 50%;
    left: 50%;
    color: #59B3AA;
    transform: translate(-50%, -50%);
    text-align: center;
}

.join-btn-wrapper{
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: auto;
    text-align: center;
    border-radius: 5px;
    background: #59B3AA;
    color: #fefefe;
}



</style>

