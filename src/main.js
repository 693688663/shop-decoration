
import Vue from 'vue'
import App from './App'//app
import router from './router'//路由
import Vuex from 'vuex'//vuex
import store from './vuex/store'//状态仓库
import VueWechatTitle from 'vue-wechat-title'//tltle
import './components/toast/toast.css';
import toast from './components/toast/toast';
Vue.use(toast);
Vue.use(VueWechatTitle)
Vue.use(Vuex)

Vue.config.productionTip = false
new Vue({
   el: '#app',
   router,
   store,
   components: { App },
   template: '<App/>'
})
