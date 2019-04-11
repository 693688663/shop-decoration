
import Vue from 'vue'
import App from './App'//app
import router from './router'//路由
import Vuex from 'vuex'//vuex
import store from './vuex/store'//状态仓库
import VueWechatTitle from 'vue-wechat-title'//tltle
import './components/toast/toast.css';
import toast from './components/toast/toast';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
import qs from 'qs'
Vue.use(ElementUI)
Vue.use(toast);
Vue.use(VueWechatTitle)
Vue.use(Vuex)
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
