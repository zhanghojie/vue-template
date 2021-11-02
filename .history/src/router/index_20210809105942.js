import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [

  {
    path: '/',
    name: 'index',
    component: () => import('@/views/enterprise/index'),

  },
  /* {
    path: '/home',
    name: '首页',
    component: () => import('@/views/enterprise/index')
  }, */
  {
    path: '/apply',
    name: '申请',
    component: () => import('@/views/enterprise/apply')
  },
  {
    path: '/myview',
    name: '查看',
    component: () => import('@/views/enterprise/myview')
  },
  {
    path: '/message',
    name: '消息中心',
    component: () => import('@/views/enterprise/message')
  },
  {

    path: '/articleDetail',
    name: '文章详情',
    component: () => import('@/views/enterprise/articleDetail')
  },
  {
    path: '/explain',
    name: 'explain',
    component: () => import('@/views/enterprise/explain')
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    scrollBehavior: () => ({ y: 0 }),
    routes: router
  })

export default createRouter()
