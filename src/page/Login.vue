<template>
    <div>
        <Nav :isAuth="true" :pushDown="true"/>
       <div class="container">
            <div  class="col-tf-3">
            </div>
            <div  class="col-tf-16">
                <div class="login-area">
                    <div class="title">登录 Ftwitter</div>
                    <form>
                        <div>
                            <input type="text" placeholder="手机、邮箱或者用户名">
                        </div>
                        <div>
                            <input type="password">
                        </div>
                        <div class="l3">
                            <button type="submit">登录</button>
                            <input type="checkbox" id="re"> 
                            <label for="re">记住我</label>
                            <span>忘记密码</span>
                        </div>
                    </form>
                </div>
                <div class="sub-area">
                    <div class="main">
                        <div>首次使用Ftwitter吗？<router-link to="/signup">现在注册</router-link></div>
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
    export default {
        components:{
            Nav,
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
.login-area form input {
    padding: 8px;
    width: 320px;
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