<template>
    <div>
        <Nav :pushDown="true"/>
        <div class="container">
            <div class="col-lg-3">
                <AdminNav/>
            </div>
            <div class="col-lg-9">
                 <div class="wrapper">
                        <h2>用户列表</h2>
                        <!-- <SearchBar :model="model" :isSearch="false" :onSubmit="search" :searchable="searchable"/> -->
                        <div class="tool-bar">
                            <button @click="show_form= !show_form" class="btn"><span class="btn" v-if="show_form">收起</span><span v-else>创建用户</span></button>
                        </div>
                        <form v-if="show_form" @submit="cou($event)">
                            <div class="input-control">
                                <label>用户名</label>
                                <input type="text" v-model="current.username">
                            </div>
                            <div class="input-control">
                                <label>密码</label>
                                <input type="password" v-model="current.password">
                            </div>
                            <div class="input-control">
                                <label>邮箱</label>
                                <input type="text" v-model="current.email">
                            </div>
                            <div class="input-control">
                                <label>电话</label>
                                <input type="text" v-model="current.phone">
                            </div>
                            <div class="input-control">
                                <label>地址</label>
                                <input type="text" v-model="current.location">
                            </div>
                             <div class="input-control">
                                <label>头像</label>
                                <input type="text" v-model="current.avatar">
                            </div>
                            <div class="input-control">
                                <button class="btn" type="submit">提交</button>
                                <button @click="cancel()" class="btn" type="button">取消</button>
                            </div>
                        </form>
                        <div class="table">
                            <table>
                                <thead>
                                    <th>用户id</th>
                                    <th>用户头像</th>
                                    <th>用户名</th>
                                    <th>密码</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>地址</th>
                                    <th>操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(row,index) in list" :key="index">
                                    <td>{{row.id}}</td>
                                    <td><img :src="row.avatar?row.avatar:''" alt="" class="avatar"></td>
                                    <td>{{row.username}}</td>
                                    <td>{{row.password}}</td>
                                    <td>{{row.email}}</td>
                                    <td>{{row.phone}}</td>
                                    <td>{{row.location}}</td>
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
    export default {
        mixins:[AdminPage],
        data(){
            return{
                model:'user',
            }
        },
    }
</script>
<style scoped>
.input-control {
    display: block;
    margin: 15px 0;
}
.input-control button,
button:hover {
  background: #0b5a81;
  color: #fff;
}
.input-control button {
  margin: 0px 10px;
}
.avatar {
    height: 100px;
}
</style>