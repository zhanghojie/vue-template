import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index'),
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/home/detail.vue')
  },
  {
    path: '/issueList',
    name: 'issueList',
    component: () => import('@/views/issue/index')
  },
  {
    path: '/addIssue',
    name: 'addIssue',
    component: () => import('@/views/issue/addIssue.vue')
  },
  {
    path: '/workflow',
    name: 'workflow',
    component: () => import('@/views/issue/workflow.vue')
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    scrollBehavior: () => ({ y: 0 }),
    routes: router
  })

export default createRouter()
