import Vue from 'vue'
import Router from 'vue-router'

import home from '../pages/home/home'
import square from '../pages/home/child/square'
import actives from '../pages/home/child/actives'
import random from '../pages/home/child/random'

const friends = r => require.ensure([], () => r(require('../pages/friends/friends')), 'friends')
const search = r => require.ensure([], () => r(require('../pages/search/search')), 'search')
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
const signup = r => require.ensure([], () => r(require('../pages/signup/signup')), 'login')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: home,
      children:[
        {
          path: '',
          component: square
        },
        {
          path: '/actives',
          component: actives
        },
        {
          path: '/random',
          component: random
        }
      ]
    },

    // 好友页面路由
    {
      path: '/friends',
      component: friends
    },

    // 搜索页面路由
    {
      path: '/search',
      component: search
    },

    //登陆页面路由
    {
      path: '/login',
      component: login
    },

    //注册页面路由
    {
      path: '/signup',
      component: signup
    }
  ]
})
