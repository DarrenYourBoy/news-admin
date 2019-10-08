import Vue from 'vue'
import Router from 'vue-router'

//引入页面
import Login from './views/Login'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Index
    }
  ]
})