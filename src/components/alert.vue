<template>
    <div>
        <div class="md-modal">
            <p>{{message}}</p>
            <button class="md-close" @click='closeMd'>关闭</button>
        </div>
        <div class="md-mask"></div>
    </div>
</template>

<script>
    export default{
        props:{
            message:{
                type: String,
                default: 'something happen'
            }
        },
        methods:{
            closeMd(){
                this.$emit('closeMd')
            }
        }
    }
</script>

<style scoped>
.md-mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(120,120,120,0.5);
    animation-name: loadMask;
    animation-duration: 0.3s;
    animation-timing-function: linear;
    /* Firefox: */
    -moz-animation-name: loadMask;
    -moz-animation-duration: 0.3s;
    -moz-animation-timing-function: linear;
    /* Safari 和 Chrome: */
    -webkit-animation-name: loadMask;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-timing-function: linear;
}

.md-modal p{
    padding: 3rem 2rem;
    font-size: 3.4rem;
    text-align: center;
}

.md-close{
    border-top: 1px solid #aaa;
    width: 100%;
    height: 3.4rem;
    line-height: 3.4rem;
    background: #fff;
    border-radius: 0 0 0.5rem 0.5rem;
}

.md-modal {
	position: fixed;
	top: 35%;
	left: 50%;
	width: 70%;
    margin-left: -35%;
	height: auto;
	z-index: 2000;
    background: #fff;
    border-radius: 0.5rem;
	transform: scale(1);
    animation-name: loadMd;
    animation-duration: 0.3s;
    animation-timing-function: linear;
    box-sizing: content-box;
}
 
@keyframes loadMask
{
from {     
	opacity: 0.4;    
    }
to {	 
	opacity: 1; 
    }
}
@keyframes loadMd
{
from {     
	transform: scale(0) ;  
	opacity: 0;    
    }
to {	
	transform: scale(1);    
	opacity: 1; 
    }
}
</style>