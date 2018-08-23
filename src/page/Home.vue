<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-tf-4">
                <SideNav/>
            </div>
            <div class="col-tf-14">
                <el-row class="card">
                    <el-card v-for="(item,index) in tweet">
                        <div class="col-tf-3 user-head">
                            <img :src="uinfo.avatar" alt="">
                        </div>
                        <div class="col-tf-21">
                            <div class="l1">
                                <span class="name">{{item.$user.username}}</span>
                                <span class="count">@stephenCurry30</span>  
                                <span class="time">. 1天</span>  
                            </div>
                            <div class="l2">
                                {{item.content.text}}
                            </div>
                            <div class="l3">
                                <img :src="item.content&&item.content.img?item.content.img:''" alt="">
                            </div>
                            <div class="l4">
                                <span>
                                    <!-- 评论 -->
                                    <Icon size="20" type="ios-chatboxes-outline" />
                                    <span class="val">203</span>
                                </span>
                                <span>
                                    <Icon size="20" type="ios-repeat" />
                                    <span class="val">1k</span>
                                </span>
                                <span>
                                    <Icon size="20" type="ios-heart-outline" />
                                    <span class="val">1万</span>
                                </span>
                                <span>
                                    <Icon size="20" type="ios-mail-outline" />
                                </span>
                            </div>
                        </div>
                    </el-card>
                </el-row>
            </div>
            <div class="col-tf-6"></div>
        </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import SideNav from '../components/SideNav';
    import api from '../lib/api';
    import session from '../lib/session';
    export default {
        components:{Nav,SideNav},
        data(){
            return{
                tweet:{},
                uinfo:session.uinfo(),
                with:[
                    {model:'user',relation:'has_one'},
                ]
            }
        },
        mounted() {
            this.read();
        },
        methods:{
            read(){
                api('tweet/read',{
                    with:this.with,
                })
                .then(r=>{
                    this.tweet = r.data;
                    console.log('this.tweet',this.tweet);
                    
                })
            }
        }
    }
</script>
<style scoped>
.user-head img{
    border-radius: 50%;
    width: 45px;
    height: 45px;
}
.card {
    line-height: 2rem;
    padding: 0 30px;
}
.card .l1 .name{
    font-size: 1.1rem;
    font-weight: 500;
}
.card .l1 .count,
.card .l1 .time{
    padding-left: 5px;
    font-weight: 400;
    font-size: 0.9rem;
}
.card .l3 img{
    height: 400px;
}
.card .l4 {
    font-size: 1.6rem;

}
.card .l4>*{
    padding: 10px 0;
    padding-right: 3rem;
}

.card .l4>*:hover{
    color: #4CB6C2;
}
.card .l4 span >*{
    font-size: 1.5rem;
}
.card .l4 .val {
    padding-left: 1rem;
    font-size: .9rem;
}
</style>