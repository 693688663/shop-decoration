import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
// import mk7 from '@/components/mokuai/mk7'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
   //  {
   //    path: '/',
   //    name: 'mk7',
   //    component: mk7
   //  }
  ]
})
