<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-tf-4">
                <SideNav/>
            </div>
            <div class="col-tf-14">
                <el-row class="card">
                    <el-card>
                        <div class="col-tf-3 user-head">
                            <img src="https://xavatar.imedao.com/community/20153/1428029125170-1428029138036.jpg!180x180.png" alt="">
                        </div>
                        <div class="col-tf-21">
                            <div class="l1">
                                <span class="name">Stephen Curry</span>
                                <span class="count">@stephenCurry30</span>  
                                <span class="time">. 1天</span>  
                            </div>
                            <div class="l2">
                                hello world!
                            </div>
                            <div class="l3">
                                <img src="https://pbs.twimg.com/media/Dk116dPVAAEj93i.jpg" alt="">
                            </div>
                            <div class="l4">
                                <span>
                                    <Icon type="ios-chatboxes-outline" />
                                    <span class="val">203</span>
                                </span>
                                <span>
                                    <Icon type="ios-repeat" />
                                    <span class="val">1k</span>
                                </span>
                                <span>
                                    <Icon type="ios-heart-outline" />
                                    <span class="val">1万</span>
                                </span>
                                <span>
                                    <Icon type="ios-mail-outline" />
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
    export default {
        components:{Nav,SideNav},
        data(){
            return{
                tweet:{},
            }
        },
        methods:{
            read(){
                api('tweet/read')
                    .then(r=>{
                        this.tweet = r.data;
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
    padding-right: 2rem;
}

.card .l4>*:hover{
    color: #4CB6C2;
}
.card .l4 span >*{
    font-size: 1.5rem;
    font-weight: 500;
}
.card .l4 .val {
    padding-left: 1rem;
    font-size: .9rem;
}
</style>