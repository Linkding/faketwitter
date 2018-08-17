import Vue from 'vue'
import App from './App.vue'
import './css/global.css';
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

import Home from './page/Home';

const router = new VueRouter({
  routes :[
    {path:"/",component:Home,meta:{title:'首页|faketwitter'}},
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
