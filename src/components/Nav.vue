<template>
    <div>
        <div class="mask" v-if="show_editor">
            <div class="wrap-editor">
                <div class="header">
                    <div class="col-lg-10 title">有什么告诉大家</div>
                    <div class="col-lg-2 close right" @click="show_editor=false"></div>
                </div>
                <form @submit.prevent="submit">
                    <div>
                        <textarea :style="current.content.img?'border-bottom: 1px solid rgba(0, 0, 0, .1)':''" id="" cols="30" rows="10" v-model="current.content.text"></textarea>
                        <div class="img-area" v-if="show_img">
                            <span class="img-wrap">
                                <img :src="current.content.img" alt="">
                                <div class="close-img">x</div>
                            </span>
                        </div>
                    </div>
                    <div class="l3">
                        <div class="col-lg-6 icon">
                            <span class="upload-img">
                                <i class="el-icon-picture"></i>
                                <input type="file" id="uploader"  @change="upload_file($event)" multiple>
                            </span>
                            <span><i class="el-icon-message"></i></span>
                            <span><i class="el-icon-location"></i></span>
                        </div>
                        <div class="col-lg-6 right">
                            <button class="editor-btn" type="submit">发送</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div>
            <div v-if="!isAuth" class="nav-area" :style="{marginBottom:this.pushDown?'30px':'0'}">
                <div class="container">
                    <div  class="col-tf-4 logo">
                        FT
                    </div>
                    <div  class="col-tf-14 item">
                        <div  class="col-lg-6 nav-item">
                            <router-link to="/">
                                <span><i class="fa fa-home" aria-hidden="true"></i>首页</span>
                            </router-link>
                            <span><i class="fa fa-bell" aria-hidden="true"></i>通知</span>
                            <span><i class="fa fa-envelope" aria-hidden="true"></i>私信</span>
                        </div>
                        <div class="col-lg-6 search-area right">
                            <input type="search" placeholder="搜索 FT">
                            <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div class="col-tf-6 user-area">
                        <div class="col-lg-6 user right">
                            <div v-if="uinfo">
                                <i class="fa fa-user" aria-hidden="true"></i>
                                {{uinfo.username}}
                            </div>
                            <div v-else>
                                <router-link to="/login">登录</router-link>
                            </div>
                        </div>
                        <div class="col-lg-6 btn">
                            <button @click="show_editor=true">发推</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
               <div class="nav-area" :style="{marginBottom:this.pushDown?'30px':'0'}">
                <div class="container">
                    <div  class="col-tf-3 logo">
                    </div>
                    <div  class="col-tf-16 item">
                        <div  class="col-lg-6 nav-item">
                            <span><i class="fa fa-home" aria-hidden="true"></i>首页</span>
                            <span><i class="fa fa-bell" aria-hidden="true"></i>关于</span>
                        </div>
                    </div>
                    <div class="col-tf-5 user-area">
                    </div>
                </div>
            </div>  
            </div>
        </div>
    </div>
</template>
<script>
    import session from '../lib/session';
    import api from '../lib/api';
    export default {
        props:{
            pushDown:{
                default:false,
            },
            isAuth:{
               default:false, 
            }
        },
        data(){
            return{
                show_editor:false,
                uinfo:session.uinfo(),
                file:[],
                current:{
                    content:{},
                },
                show_img:false,
            }
        },
        methods:{
            upload_file(e){
                let file = e.target.files[0];
                let fd = new FormData();
                fd.append('file',file);
                fd.append('name',file.name);
                
                api('_file/create',fd)
                    .then(r=>{
                        let data = r.data;
                        this.current.content.img = 'http://' + data._base_url + '/' + data._key;
                        this.show_img = true;
                        console.log('this.current.content.img',this.current.content.img);
                        
                    })
            },
            submit(){
                if(!this.uinfo.id) return;
                this.current.user_id = this.uinfo.id;
                api('tweet/create',this.current)
                    .then(r=>{
                        this.current = {};
                        this.show_editor = false;                        
                    })
            },
            
        }
    }
</script>
<style scoped>
.close {
    cursor: pointer;
}
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, .2);
    z-index: 1;
}
.mask .wrap-editor{
    position: absolute;
    width: 520px;
    background: #fff;
    padding:10px 40px;
    top: 20%;
    left: 28%;
}
.mask .wrap-editor .header{
    margin: 15px 0;
}
.mask .wrap-editor .header >* {
    vertical-align: middle;
}
.mask .wrap-editor .header .title {
    font-size:1.5rem;
    font-weight: 600;
}
.mask .wrap-editor textarea,
.mask .img-area{
    border: 2px solid #7FC7BD;
}
.mask .wrap-editor textarea{
    height: 100px;
    width:100%;
    /* border-bottom: 1px solid rgba(0, 0, 0, .1); */
}
.mask .wrap-editor textarea:focus{
    outline: none;
}
.mask .wrap-editor .editor-btn{
    background: #4CB6C2;
    border-radius: 3px;
    color: #fff;
}
.mask .wrap-editor .l3 {
    margin-top: 10px;
}
.mask .wrap-editor .l3 .upload-img{
    position: relative;
}
.mask .wrap-editor .l3 .upload-img input{
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
.mask .wrap-editor .icon span{
    font-size: 1.5rem;
    padding: 0 10px;
    cursor: pointer;
}
.mask .img-area {
    background: #F5F7F6;
    padding: 10px 20px;
    margin-top: -5px;
    border-top: 0;
}
.mask .img-area img{
    height: 150px;
}
.mask .img-area .img-wrap{
    position: relative;
}
.mask .img-area .img-wrap .close-img{
    position: absolute;
    right: 10%;
    top: 5%;
    background: #454545;
    color: #fff;
    padding:0px 5px;
    border-radius: 50%;
}
.nav-area{
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    border-top: 1px solid rgba(0, 0, 0, .08);
    /* background: #F0F0F0; */
    margin-top: 0;
    padding: 8px;
}
.nav-area .container>* ,
.nav-area .item >*,
.nav-area .user-area>*
{
    vertical-align: middle;
}
.nav-area .logo{
    text-align: center;
}
.nav-area .nav-item span{
    padding:0 10px;
    font-size: 1.2rem;
    color: #454545;
    cursor: pointer;
}
.nav-area .nav-item span:hover{
    color: #4CB6C2;
}
.nav-area .nav-item .fa-home, 
.nav-area .nav-item .fa-bell, 
.nav-area .nav-item .fa-envelope
{
    margin: 0 5px;
}
.nav-area .search-area input,
.nav-area .search-area button{
    padding: 5px;
}
.nav-area .search-area input {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-right: 0;
}
.nav-area .search-area:hover input,
.nav-area .search-area:hover button
{
    border-color: #7FC7BD;
}
.nav-area .search-area button {
    border-left: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
.nav-area .user-area .user {
    font-size: 1.2rem;
}

.nav-area .user-area .btn{
    padding-left: 20px;
}
.nav-area .user-area .btn button{
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 5px 20px;
    background: #7FC7BD;
    color: #fff;
    border: 0;
}
</style>