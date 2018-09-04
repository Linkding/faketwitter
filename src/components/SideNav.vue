<template>
    <div class="side-nav">
        <div class="user-area">
            <div class="user-icon">
                <img :src="uinfo.avatar" alt="">
            </div>
            <div class="username">{{uinfo.username||'-'}}</div>
            <div class="user-data">
                <div class="col-lg-6">
                    <div class="num">{{user.follow_count}}</div>
                    <div>关注</div>
                </div>
                <div class="col-lg-6">
                    <div class="num">{{user.fan_count}}</div>
                    <div>粉丝</div>
                </div>
            </div>
        </div>
        <div class="user-panel">
            <div class="p1">
                <div><span><Icon type="md-home" /></span>首页</div>
                <div><span><Icon type="md-chatboxes" /></span>讨论</div>
                <div><span><Icon type="md-options" /></span>持仓亏损</div>
                <div><span><Icon type="md-star" /></span>收藏</div>
            </div>
            <!-- <div class="p1">
                <div><span><i class="fa fa-home" aria-hidden="true"></i></span>首页</div>
                <div><span><i class="fa fa-comment" aria-hidden="true"></i></span>讨论</div>
                <div><span><i class="fa fa-list" aria-hidden="true"></i></span>持仓亏损</div>
                <div><span><i class="fa fa-star" aria-hidden="true"></i></span>收藏</div>
            </div>
            <div class="p1">
                <div><span><i class="fa fa-home" aria-hidden="true"></i></span>首页</div>
                <div><span><i class="fa fa-comment" aria-hidden="true"></i></span>讨论</div>
                <div><span><i class="fa fa-list" aria-hidden="true"></i></span>持仓亏损</div>
                <div><span><i class="fa fa-star" aria-hidden="true"></i></span>收藏</div>
            </div> -->
        </div>
    </div>
</template>
<script>
    import session from '../lib/session';
    import api from '../lib/api';
    export default {
        data(){
            return{
                uinfo:session.uinfo(),
                user:{},
            }
        },
        mounted() {
            this.count_followed('user',this.uinfo.id);
            this.count_fan('user',this.uinfo.id);
        },
        methods:{
            //计算关注多少人
            count_followed(arr,id){
                api('_bind__user_user/count',
                    {
                        where:{follower_id:id}
                    }
                ).then(r=>{
                    this.$set(this[arr],'follow_count',r.data);
                })
                    
            },
            //计算粉丝数
            count_fan(arr,id){
                api('_bind__user_user/count',{
                    where:{target_id:id}
                }).then(r=>{
                    this.$set(this[arr],'fan_count',r.data);
                    
                })
            }
        }
    }
</script>
<style scoped>
.user-area,
.user-panel
{
    border: 1px solid rgba(0, 0, 0, .09)
}
.user-panel {
    border-top: 0;
}
.user-icon img{
    border-radius: 50%;
    height: 48px;
    width: 48px;
}
.user-icon{
    margin-top: 19px;
}
.username{
    padding: 7px 0;
    font-size: 1.2rem;
}
.user-data{
    text-align: center;
    margin: 10px 0;
}
.user-data .num{
    font-weight: 600;
}
.user-data>*:first-child{
    border-right: 1px solid rgba(0, 0, 0, .08)
}
.user-icon,
.username {
    padding-left: 68px;
}
.user-panel{
    padding: 5px 12px;
}
.user-panel .p1 {
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    font-size: 1.1rem;
    padding: 10px;
    line-height: 2.3rem;
}
.user-panel .p1 span{
    padding-right: 5px;
}
</style>