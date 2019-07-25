/**
 * 全站路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'
// import http from '@/utils/httpRequest'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./_import_' + process.env.NODE_ENV)

// 全局路由
const globalRoutes = [
  {
    path: '/404',
    component: _import('common/404'),
    name: '404',
    meta: {
      title: '404未找到'
    }
  },
  {
    path: '/login',
    component: _import('common/Login'),
    name: 'login',
    meta: {
      title: '登录'
    }
  }
]
const mainRoutes = [
  {
    path: '/',
    component: _import('Layout'),
    name: 'layout',
    redirect: {
      name: 'home'
    },
    meta: {
      title: '主入口整体布局'
    },
    children: [
      {
        path: '/home',
        component: _import('common/Home'),
        name: 'home',
        meta: {
          title: '首页'
        }
      },
      {
        path: '/i2',
        component: _import('modules/i2/index'),
        name: 'i2',
        meta: {
          title: 'i2'
        }
      },
      {
        path: '/ticket',
        component: _import('modules/ticket/index'),
        name: 'ticket',
        meta: {
          title: 'ticket'
        },
        children: [
          {
            path: '/ticket/newPhone',
            component: _import('modules/ticket/newPhone'),
            name: 'newPhone',
            meta: {
              title: 'newPhone'
            }
          },
          {
            path: '/ticket/phoneSearch',
            component: _import('modules/ticket/phoneSearch'),
            name: 'phoneSearch',
            meta: {
              title: 'phoneSearch'
            }
          }
        ]
      }
    ]
  }
]

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [...globalRoutes, ...mainRoutes]
})
export default router
