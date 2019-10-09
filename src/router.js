import Vue from 'vue'
import Router from 'vue-router'

//引入页面
import Login from './views/Login'
import Index from './views/Index.vue'
import PostList from './views/PostList.vue'
import PostPublish from './views/PostPublish.vue'

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
      component: Index,
      meta:'文章管理',
      children: [{
          path: 'postList',
          component: PostList,
          meta:'文章列表'
        },
        {
          path: 'postPublish',
          component: PostPublish,
          meta:'发布文章'
        }
      ]
    }
  ]
})