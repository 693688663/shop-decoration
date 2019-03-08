
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import VueWechatTitle from 'vue-wechat-title'
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
