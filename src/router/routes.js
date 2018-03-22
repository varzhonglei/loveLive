import home from '../pages/home/home'
import square from '../pages/home/child/square'
import actives from '../pages/home/child/actives'
import random from '../pages/home/child/random'

const friends = r => require.ensure([], () => r(require('../pages/friends/friends')), 'friends')
const search = r => require.ensure([], () => r(require('../pages/search/search')), 'search')
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
const signup = r => require.ensure([], () => r(require('../pages/signup/signup')), 'login')
const fixInfo = r => require.ensure([], () => r(require('../pages/fixInfo/fixInfo')), 'fixInfo')

var routes = [
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

    //完善资料页面路由
    {
      path: '/fixInfo',
      component: fixInfo
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
      name: 'login',
      path: '/login',
      component: login
    },

    //注册页面路由
    {
      path: '/signup',
      component: signup
    }
  ]

  export default routes