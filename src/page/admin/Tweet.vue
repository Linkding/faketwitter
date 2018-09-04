<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-lg-3">
                <AdminNav/>
            </div>
            <div class="col-lg-9">
                 <div class="wrapper">
                        <h2>微博列表</h2>
                        <!-- <SearchBar :model="model" :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form" class="btn"><span class="btn" v-if="show_form">收起</span><span v-else>创建微博</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>用户名</label>
                                <DropDown 
                                    :list="user" 
                                    :showInput="true" 
                                    :displayKey="'username'"
                                    :Width="'200'"
                                    :onSelect="set_user_id"
                                    ref="edit_tweet"
                                />
                            </div>
                            <div class="input-control">
                                <label>正文</label>
                                <textarea v-model="current.content.text"></textarea>
                            </div>
                            <div class="input-control">
                                <label>微博图片</label>
                                <input type="file" @change="upload_file($event)">
                            </div>
                            <div class="input-control">
                                <button class="btn" type="submit">提交</button>
                                <button @click="cancel()" class="btn" type="button">取消</button>
                            </div>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>微博id</th>
                                    <th>用户名</th>
                                    <th>微博正文</th>
                                    <th>微博图片</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                        <td>{{row.id}}</td>
                                        <td>{{row.$user&&row.$user.username||'-'}}</td>
                                        <td>{{row.content&&row.content.text||'-'}}</td>
                                        <td><img :src="row.content&&row.content.img?row.content.img:''" alt="" class="img"></td>
                                        <td>
                                            <button @click="update(row)">编辑</button>
                                            <button @click="remove(row.id)">删除</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AdminPage from '../../mixin/AdminPage';
    import api from '../../lib/api';
    import session from '../../lib/session';
    
    export default {
        mixins:[AdminPage],
        created() {
            this.model = 'tweet'
        },
        data(){
            return{
                with:[
                    {model:'user',relation:'has_one'},
                ],
                current:{
                    content:{},
                },
            }
        },
        mounted() {
            this.read_by_model('user')
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
                    })
            },
            set_user_id(row){
                this.current.user_id = row.id;
            },

        }
    }
</script>
<style scoped>
.input-control {
    display: block;
    margin: 15px 0;
}
.input-control button,
button:hover {
  background: #7FC7BD;
  color: #fff;
}
.input-control button {
  margin: 0px 10px;
}
tbody .img {
    height: 100px;
}
</style>