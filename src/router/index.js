import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Todolist from '@/components/todolist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/todolist',
      name: 'Todolist',
      component: Todolist
    }
  ]
})
