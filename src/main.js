import Vue from 'vue'
import App from './App.vue'

import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

import Vuex from 'vuex';
Vue.use(Vuex);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

import iview from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iview);

import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';


import AdminBase from './page/admin/Base';
import User from './page/admin/User';
import Tweet from './page/admin/Tweet';

import './css/global.css';
const router = new VueRouter({
  routes :[
    {path:"/",component:Home,meta:{title:'首页|ftwitter'}},
    {path:"/login",component:Login,meta:{title:'登录|ftwitter'}},
    {path:"/signup",component:Signup,meta:{title:'注册|ftwitter'}},
    {path:"/admin",component:AdminBase,meta:{title:'后台|ftwitter'},
      children:[
        {path:'user',component:User,meta:{title:'用户管理|ftwitter'}},
        {path:'tweet',component:Tweet,meta:{title:'微博管理|ftwitter'}}
      ]
    },
  ]
})
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
