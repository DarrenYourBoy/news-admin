import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'


Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://127.0.0.1:3000"

Vue.config.productionTip = false


Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    //由于token为空时解析会报错 添加||'{}'  {}必须为字符串
    const token = JSON.parse(localStorage.getItem('user') || '{}').token
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')