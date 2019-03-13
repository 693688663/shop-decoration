import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import preview from '@/components/preview'

Vue.use(Router)

export default new Router({
   routes: [
      {
         path: '/',
         name: 'index',
         component: index,
         meta: {
            title: '店铺装修',
            keepAlive: true
         }
       

      },
      {
         path: '/preview',
         name: 'preview',
         component: preview,
         meta:{
            title: '店铺预览',
            keepAlive: false
          },
      },

   ]
})
