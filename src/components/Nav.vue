<template>
    <div class="nav-area">
        <div class="container">
            <div  class="col-lg-2 logo">
                FT
            </div>
            <div  class="col-lg-6 item">
                <div  class="col-lg-6 nav-item">
                    <span><i class="fa fa-home" aria-hidden="true"></i>首页</span>
                    <span><i class="fa fa-bell" aria-hidden="true"></i>通知</span>
                    <span><i class="fa fa-envelope" aria-hidden="true"></i>私信</span>
                </div>
                <div class="col-lg-6 search-area right">
                    <input type="search" placeholder="搜索 FT">
                    <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                </div>
            </div>
            <div class="col-lg-4 user-area">
                <div class="col-lg-6 user right">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    Linkding
                </div>
                <div class="col-lg-6 btn">
                    <button>发推</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    }
</script>
<style scoped>
.nav-area{
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    border-top: 1px solid rgba(0, 0, 0, .08);
    /* background: #F0F0F0; */
    margin-top: 0;
    padding: 5px;
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
    padding: 8px;
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
}
</style>