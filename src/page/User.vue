<template>
    <div>
       <Nav/> 
       <div class="user-banner">
           <div class="user-bg"></div>
           <div class="container">
               <el-row>
                   <el-col :span="12">
                       <div class="user-data">
                           <div>
                                <el-col :span="4" class="d1">
                                        <img :src="user_list.avatar" alt="">
                                </el-col>
                                <el-col :span="20" class="d2">
                                    <div class="username">{{user_list.username}}</div>
                                    <div class="desc">
                                        <span class="num">{{user_list.follow_count||'0'}} </span><span>关注</span>
                                        <span class="num">{{user_list.fan_count||'0'}} </span><span>粉丝</span>
                                        <span class="location">省市/直辖市 城市/地区</span>
                                    </div>
                                </el-col>
                                <el-col :span="24" class="d3">
                                    <span class="l-font active">微博</span>
                                    <span class="l-font">关注</span>
                                    <span class="l-font">粉丝</span>
                                </el-col>
                           </div>
                       </div>
                   </el-col>
               </el-row>
           </div>
       </div>
       <div class="content-wrap">
            <el-card v-for="(item,index) in tweet">
                <div class="col-tf-3 user-head">
                    <router-link :to="'user/' + item.$user.id">
                        <img :src="item.$user.avatar" alt="">
                    </router-link>
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
                    <div class="l3" v-if="item.content&&item.content.img">
                        <img :src="item.content&&item.content.img?item.content.img:''" alt="">
                    </div>
                    <div class="l4">
                        <span @click="show_comment(item.id)">
                            <!-- 评论icon -->
                            <!-- <Icon size="20" type="ios-chatboxes" color="#c4c4c4"/> -->
                            <Icon size="20" type="ios-chatboxes-outline" color="#969696"/>
                            <span class="val">203</span>
                        </span>
                        <span>
                            <!-- <Icon size="20" type="md-repeat" color="#969696" /> -->
                            <Icon type="ios-repeat" size="25" color="#969696" />
                            <span class="val">1k</span>
                        </span>
                        <!-- 点赞微博 -->
                        <span @click="toggle_like(item.id)" >
                            <Icon v-if="isLiked(item.id)" size="20" type="ios-heart" color="#4CB6C2"/>
                            <Icon v-else size="20" type="ios-heart-outline" color="#969696"/>
                            <span class="val">1万</span>
                        </span>
                    </div>
                   
                </div>
            </el-card>
       </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import api from '../lib/api';

    export default {
        components:{Nav},
        data(){
            return{
                user_list:{},
                tweet:{},
                liked_list:[],
            }
        },
        mounted() {
            let uid = this.$route.params.id;
            this.read(uid);
            this.count_followed(uid);
            this.count_fan(uid);
            this.read_tweet(uid);
        },
        methods:{
            read(id){
                api('user/read',{
                    where:{id}
                }).then(r=>{
                    this.user_list = r.data[0];
                })
            },
            read_tweet(id){
                api('tweet/read',{
                    where:{user_id:id},
                    with:[
                        {model:'user',relation:'has_one'},
                    ]
                }).then(r=>{
                    this.tweet = r.data
                })
            },
            isLiked(id){
                let liked_list = this.liked_list;
                if(liked_list.indexOf(id) == -1)
                    return false;
                return true;
            },
            //计算关注多少人
            count_followed(id){
                api('_bind__user_user/count',
                    {
                        where:{follower_id:id}
                    }
                ).then(r=>{
                    this.$set(this.user_list,'follow_count',r.data)
                })
                    
            },
            //计算粉丝数
            count_fan(id){
                api('_bind__user_user/count',{
                    where:{target_id:id}
                }).then(r=>{
                    this.$set(this.user_list,'fan_count',r.data);
                })
            }
        },
    }
</script>
<style scoped>
.user-banner{
    /* padding: 30px; */
    background: #F5F7F6;
}
.container {
    padding-top: 30px;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.user-data img{
    height: 89px;
    border-radius: 50%;
}
.user-data .d2 {
    padding-left: 30px;
}
.user-data .d2 .username ,
.user-data .d2 .desc .num{
    color: #000;
}
.user-data .d2 .username {
    font-size: 2rem;
    font-weight: 600;
}
.user-data .d2 .desc{
    margin-top: 10px;
}
.user-data .d2 .desc span{
    padding-right: 7px;
}
.user-data .d2 .desc .num{
    font-weight: 600;
    font-size: 1.1rem;
}
.user-data .d2 .desc  .location{
    padding-left: 10px;
}
.user-data .d3 {
    margin-top: 40px;
    margin-bottom: 10px;

}
.user-data .d3  >span {
    margin-right:  45px;
    padding: 10px 15px;
    font-weight: bold;
}
.user-data .d3  >span.active {
    border-bottom: 2px solid #4CB6C2;
}
</style>