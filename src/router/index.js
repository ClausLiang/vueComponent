import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Modal from '@/components/modal/Modal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    }
  ]
})
