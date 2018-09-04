<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-tf-4">
                <SideNav/>
            </div>
            <div class="col-tf-14">
                <el-row class="card">
                    <el-card v-for="(item,index) in timeline">
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
                            <div class="l5" v-if="comment_visible&&on_click_comment_tweet_id == item.id">
                                <!-- 评论编辑框 -->
                                <div class="comment-editor">
                                    <div class="col-tf-3">
                                        <img :src="uinfo.avatar" alt="">
                                    </div>
                                    <div class="col-tf-21">
                                        <div class="r1">
                                            <span>
                                                <textarea  id="" cols="30" rows="10" v-model="comment.content"></textarea>
                                            </span>
                                        </div>
                                        <div class="r2">
                                            <div class="col-lg-6 icon-group">
                                                <span><Icon size="15" type="md-images" /></span>
                                                <span><Icon size="15" type="ios-link" /></span>
                                                <span><Icon size="15" type="md-images" /></span>
                                                <span class="">
                                                    <input type="checkbox">同时转发
                                                </span>
                                            </div>
                                            <div class="col-lg-6 right btn-group">
                                                <button class="btn-cancel">取消</button>
                                                <button class="btn-sub" @click="sub_comment(item.id)">提交</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 评论区 -->
                                <div class="comment-list" v-if="comment_visible&&on_click_comment_tweet_id == item.id">
                                    <div class="l1">
                                        <div class="col-lg-6">全部评论</div>
                                        <div class="col-lg-6 right">
                                            <span>最近</span>
                                            <span>最早</span>
                                            <span>最赞</span>
                                        </div>
                                    </div>
                                    <!-- 评论列表 -->
                                    <div class="l2">
                                        <div v-for="c in comment_list" class="comment-card">
                                            <div class="col-tf-3">
                                                <img :src="c.$user.avatar" alt="">
                                            </div>
                                            <div class="col-tf-21">
                                                <div>
                                                    <div class="col-lg-6 name">{{c.$user.username}}</div>
                                                    <div class="col-lg-6 right">1分钟</div>
                                                </div>
                                                <!-- 引述回复的评论 -->
                                                <div class="reply_to l-font" v-if="c.$comment">
                                                    <span>@{{c.$comment&&c.$comment.user_id}}:</span>
                                                    <span>{{c.$comment&&c.$comment.content}}</span>
                                                </div>
                                                <div class="l-font">{{c.content}}</div>
                                                <div class="icon-group">
                                                    <!-- 回复评论 -->
                                                    <span @click="show_reply_comment(c.id)">
                                                        <Icon size="15" type="ios-chatboxes-outline" />
                                                        <span class="s-font">回复</span>
                                                    </span>
                                                    <!-- 点赞评论 -->
                                                    <span>
                                                        <Icon size="15" type="ios-thumbs-up-outline" />
                                                        <span class="s-font">点赞</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <!-- 回复评论表单框 -->
                                            <div class="reply_comment" v-if="reply_comment_visible&&c.id == on_click_comment_id">
                                                <div class="col-tf-3">
                                                    <img :src="uinfo.avatar" alt="">
                                                </div>
                                                <div class="col-tf-21">
                                                    <div class="r1">
                                                        <span>
                                                            <textarea  id="" cols="30" rows="10" v-model="reply_comment.content"></textarea>
                                                        </span>
                                                    </div>
                                                    <div class="r2">
                                                        <div class="col-lg-6 icon-group">
                                                            <span><Icon size="15" type="md-images" /></span>
                                                            <span><Icon size="15" type="ios-link" /></span>
                                                            <span><Icon size="15" type="md-images" /></span>
                                                            <span class="">
                                                                <input type="checkbox">同时转发
                                                            </span>
                                                        </div>
                                                        <div class="col-lg-6 right btn-group">
                                                            <button class="btn-cancel">取消</button>
                                                            <button class="btn-sub" @click="sub_reply_comment()">提交</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-row>
            </div>
            <div class="col-tf-6 r-wrap">
                <div class="l1">
                    <div class="col-lg-6 l-font">用户推荐</div>
                    <div class="col-lg-6 m-font right">换一批</div>
                </div>
                <el-card v-for="it in explore_user">
                    <div class="col-tf-4 user-head" >
                        <img :src="it.avatar" alt="">
                    </div>
                    <div class="col-tf-16">
                        <div class="username">{{it.username}}</div>
                    </div>
                    <div class="col-tf-4">
                        <button v-if="it.focused" class="btn">取消关注</button>
                        <button v-else class="btn">+</button>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import SideNav from '../components/SideNav';
    import api from '../lib/api';
    import session from '../lib/session';
    import util from '../lib/util';
    export default {
        components:{Nav,SideNav},
        data(){
            return{
                current:{},//获取当前用户的所有信息
                timeline:{},//微博列表
                uinfo:session.uinfo(),
                with:[
                    {model:'user',relation:'has_one'},
                ],
                comment:{},//评论
                reply_comment:{},//回复评论
                comment_list:[],
                on_click_comment_tweet_id:'',//点击评论的微博id
                on_click_comment_id:'',//点击回复的评论的id
                comment_visible:false,
                reply_comment_visible:false,
                liked_list:[],//点赞list
                followed_list:[],//关注者list
                all_user:[],//所有用户
                explore_user:[],//除本地用户外的用户
            }
        },
        mounted() {
            this.read();
            this.read_liked(this.uinfo.id);
            this.read_followed();
            this.read_all_user();
            this.read_explore_user();
        },
        methods:{
            read(){
                api('user/read',{
                    where:{id:this.uinfo.id}    
                }).then(r=>{
                    this.current = r.data[0];
                })
            },
            read_all_user(){
                api('user/read').then(r=>{
                    this.all_user = r.data;
                })
            },
            read_explore_user(){
                api('user/read',{
                    where:[
                        ['id','!=',this.uinfo.id]
                    ],
                    limit:8
                }).then(r=>{
                    this.explore_user = r.data;
                })
            },
            read_followed(){
                return api('user/find',{
                    id:this.uinfo.id,
                    with:[
                        {
                            model:'user',
                            relation:'belongs_to_many',
                        }
                    ],
                }).then(r=>{
                    this.followed_list = r.data.$user || [];
                }).then(()=>{
                    this.read_timeline();
                    // this.read_comment();
                })
            },
            read_timeline(){
                //本人微博也加入到时间线中
                this.followed_list.push(this.current)
                api('tweet/read',{
                    where:[
                        ['user_id','in',util.pluck(this.followed_list,'id')]
                    ],
                    with:[
                        {model:'user',relation:'has_one'},
                    ]
                }).then(r=>{
                    this.timeline = r.data;

                })
            },
            isLiked(id){
                let liked_list = this.liked_list;
                if(liked_list.indexOf(id) == -1)
                    return false;
                return true;
            },
            sub_comment(tweet_id){
                this.comment.user_id = this.uinfo.id;
                this.comment.tweet_id = tweet_id;
                api('comment/create',this.comment)
                    .then(r=>{
                        this.comment ={};
                        this.read_comment(tweet_id);
                    })
            },
            sub_reply_comment(){
                this.reply_comment.user_id = this.uinfo.id;
                this.reply_comment.tweet_id = this.on_click_comment_tweet_id;
                this.reply_comment.reply_id = this.on_click_comment_id;
                api('comment/create',this.reply_comment)
                    .then(r=>{
                        // let l_id = r.data.id;
                        // let r_id = r.data.reply_id;
                        // this.glue_reply_comment(l_id,r_id);
                        this.reply_comment_visible = false;
                        this.read_comment(this.on_click_comment_tweet_id);
                    })
            },
            glue_reply_comment(l_id,r_id){
                api('comment/bind',{
                            model:'comment',
                            glue:{
                                [l_id]:r_id, 
                            }
                        })
            },
            read_comment(tweet_id){
                this.on_click_comment_tweet_id = tweet_id;
                api('comment/read',{
                    where:{
                        tweet_id,
                    },
                    with:[
                        {model:'user',relation:'has_one'},
                        {model:'comment',relation:'has_one',foreign_key:'reply_id'},
                        
                        // [
                        //     {model:'user',relation:'has_one'},
                        //     {model:'comment',relation:'belongs_to_many'},
                        // ],
                        
                    ]
                }).then(r=>{
                    this.comment_list = r.data;
                })
            },
            show_comment(id){
                if(!this.comment_visible)
                    this.read_comment(id)
                this.comment_visible = !this.comment_visible;
            },
            show_reply_comment(id){
                if(!this.reply_comment_visible)
                    this.on_click_comment_id = id;
                this.reply_comment_visible = !this.reply_comment_visible;                
            },
            toggle_like(tweet_id){
                api('_bind__tweet_user/read',{
                    where:{
                        and:{tweet_id:tweet_id,user_id:this.uinfo.id}
                    }
                }).then(r=>{
                    if(r.data){
                        api('user/unbind',{
                            model:'tweet',
                            glue:{
                                [this.uinfo.id]:tweet_id,
                            }
                        }).then(r=>{
                            // let ind = this.liked_list.indexOf(tweet_id);
                            // this.liked_list.splice(ind,0);
                            // console.log('this.liked_list',this.liked_list);
                            this.read_liked(this.uinfo.id);
                        });
                    }else{
                        api('user/bind',{
                            model:'tweet',
                            glue:{
                                [this.uinfo.id]:tweet_id,
                            }
                        }).then(r=>{
                            // this.liked_list.push(tweet_id);
                            this.read_liked(this.uinfo.id);
                        })
                    }
                })
            },
            read_liked(uid){
                this.liked_list = [];
                api('_bind__tweet_user/read',{where:{user_id:uid},only:['tweet_id']})
                    .then(r=>{
                        r.data.filter((like)=>{
                            this.liked_list.push(like.tweet_id)
                        })
                        console.log('this.liked_list',this.liked_list);
                })
            },
           
        }
    }
</script>
<style scoped>
.active{
    background: red;
}
.user-head img,
.card .l5 .comment-editor img,
.card .comment-list .l2 img{
    border-radius: 50%;
}
.user-head img{
    width: 45px;
    height: 45px;
}
.card .l5 .comment-editor img,
.card .comment-list .l2 img{
    height: 30px;
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
.card .l5 .comment-editor ,
.card .comment-list .l2 .comment-card .reply_comment{
    background: #F5F7F6;
    padding: 20px 20px;
}
.card .l5 .comment-editor .r1 >*{
    padding-right:10px;
}
.card .l5 .comment-editor textarea,
.card .comment-list .l2 .comment-card .reply_comment textarea{
    height: 40px;
    width: 424px;
    outline: none;
    border: 1px solid rgba(0, 0, 0, .09)
}
.card .l5 .comment-editor .r2 .icon-group >*,
.card .comment-list .l2 .comment-card .reply_comment .r2 .icon-group>*{
    padding-right: 10px;
}
.card .l5 .comment-editor .r2 .icon-group [type="checkbox"],
.card .comment-list .l2 .comment-card .reply_comment .r2 .icon-group [type="checkbox"]{
    margin-top: 6px;
}
.card .l5 .comment-editor .r2 .btn-group button,
.card .comment-list .l2 .comment-card .reply_comment .r2  .btn-group button{
    padding: 3px 10px;
}
.card .l5 .comment-editor .r2 .btn-cancel,
.card .comment-list .l2 .comment-card .reply_comment .r2 .btn-cancel{
    border: 0;
    background: 0;
}
.card .l5 .comment-editor .r2 .btn-sub,
.card .comment-list .l2 .comment-card .reply_comment .r2 .btn-sub{
    background: #4CB6C2;
    color: #fff;
    border-radius: 5px;
}
.card .l5  .comment-list .l1 {
    padding: 10px 0 ;
    border-bottom: 1px solid rgba(0, 0, 0, .09);
}
.card .l5  .comment-list .l2 .comment-card{
    border-bottom: 1px solid rgba(0, 0, 0, .09);
    padding: 9px 0;
}
.card .l5  .comment-list .l2 .comment-card .name{
    font-size: 1.1rem;
    font-weight: 700;
}
.card .l5  .comment-list .l2 .comment-card .icon-group>*{
    padding-right: 18px;
}
.card .l5  .comment-list .l2 .comment-card .s-font{
    font-size: 0.9rem;
    padding-left: 5px;
}
.card .l5  .comment-list .l2 .reply_to {
    background: #F0F0F0;
    padding: 8px;
    /* font-size: 1.1rem; */
}
.card .l5  .comment-list .l2 .reply_to >* {
    padding-right: 1rem; 
}
.r-wrap .l1 {
    padding: 8px;
}
.r-wrap .username {
    padding-left: 15px;
    font-weight: bold;
}
</style>