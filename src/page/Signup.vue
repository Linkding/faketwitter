<template>
    <div>
        <Nav :isAuth="true" :pushDown="true"/>
       <div class="container">
            <div  class="col-tf-3">
            </div>
            <div  class="col-tf-16">
                <div class="login-area">
                    <div class="title">注册 Ftwitter</div>
                    <form>
                        <div>
                            <input type="text" placeholder="手机或者邮箱" v-model="current.unique">
                        </div>
                        <div>
                            <input type="text" placeholder="用户名" v-model="current.username">
                        </div>
                        <div>
                            <input type="password" placeholder="密码" v-model="current.password">
                        </div>
                        <div class="l3">
                            <!-- <button type="submit">注册</button> -->
                            <el-button
                                type="primary"
                                @click="submit"
                                v-loading.fullscreen.lock="fullscreenLoading">
                                注册
                            </el-button>
                        </div>
                    </form>
                </div>
                <div class="sub-area">
                    <div class="main">
                        <div>已有账号？<router-link to="/login">现在登录</router-link> </div>
                    </div>
                </div>
            </div>
            <div class="col-tf-5">
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import api from '../lib/api';
    export default {
        components:{ Nav,},
        data(){
            return{
                current:{},
                fullscreenLoading: false,
            }
        },
        methods:{
            submit(){
                let re_mail =/[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[a-zA-Z]/
                    ,re_tel = /1[34578][012356789]\d{8}|134[012345678]\d{7}/
                    ;

                if(re_mail.test(this.current.unique))
                    this.current.email = this.current.unique;
                if(re_tel.test(this.current.unique))
                    this.current.phone = this.current.unique;
                    
                //开始loading
                this.fullscreenLoading = true;

                api('user/create',this.current)
                    .then(r=>{
                        location.href = '/';
                        this.fullscreenLoading = false;
                    })
            }
        }

    }
</script>
<style scoped>
.login-area{
    padding-top: 30px;
}
.login-area,
.sub-area .main {
    padding-left: 100px;
}
.login-area,
.sub-area{
    border: 1px solid rgba(0, 0, 0, .08);
}
.login-area .title{
    font-size: 2rem;
    font-weight: 700;
}
.login-area form >*{
    padding: 10px 0;

}
.login-area .l3 >*{
    vertical-align: middle;
    padding-right: 20px;
}
.login-area form input,
.login-area form button{
    width: 320px;
}
.login-area form input {
    padding: 8px;
}
.login-area form input:focus{
    border-color: #4CB6C2;
}
.login-area form button{
    border-radius: 20px;
    padding: 8px 20px;
    background: #4CB6C2;
    color: #fff;
    
}
.login-area form input[type='checkbox']{
    width: 10px;
}
.sub-area{
    background: #f8f8f6;
    padding: 20px;
    border-top: 0;
}
.sub-area .main{}
</style>