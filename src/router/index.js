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
          },
          {
            path: '/ticket/singlePhone',
            component: _import('modules/ticket/singlePhone'),
            name: 'singlePhone',
            meta: {
              title: 'singlePhone'
            },
            children: [
              {
                path: '/ticket/singlePhone/soonLate',
                component: _import('modules/ticket/SinglePhone/soonLate'),
                name: 'soonLate',
                meta: {
                  title: 'soonLate'
                }
              },
              {
                path: '/ticket/singlePhone/periodAll',
                component: _import('modules/ticket/SinglePhone/periodAll'),
                name: 'periodAll',
                meta: {
                  title: 'periodAll'
                }
              },
              {
                path: '/ticket/singlePhone/continuePeriod',
                component: _import('modules/ticket/SinglePhone/continuePeriod'),
                name: 'continuePeriod',
                meta: {
                  title: 'continuePeriod'
                }
              },
              {
                path: '/ticket/singlePhone/differentPeriod',
                component: _import(
                  'modules/ticket/SinglePhone/differentPeriod'
                ),
                name: 'differentPeriod',
                meta: {
                  title: 'differentPeriod'
                }
              },
              {
                path: '/ticket/singlePhone/callAnalyse',
                component: _import('modules/ticket/SinglePhone/callAnalyse'),
                name: 'callAnalyse',
                meta: {
                  title: 'callAnalyse'
                }
              },
              {
                path: '/ticket/singlePhone/callDetailAnalyse',
                component: _import(
                  'modules/ticket/SinglePhone/callDetailAnalyse'
                ),
                name: 'callDetailAnalyse',
                meta: {
                  title: 'callDetailAnalyse'
                }
              },
              {
                path: '/ticket/singlePhone/phoneHomeLocation',
                component: _import(
                  'modules/ticket/SinglePhone/phoneHomeLocation'
                ),
                name: 'phoneHomeLocation',
                meta: {
                  title: 'phoneHomeLocation'
                }
              },
              {
                path: '/ticket/singlePhone/phoneTravel',
                component: _import('modules/ticket/SinglePhone/phoneTravel'),
                name: 'phoneTravel',
                meta: {
                  title: 'phoneTravel'
                }
              }
            ]
          }
        ]
      },
      {
        path: '/usercenter',
        component: _import('modules/usercenter/index'),
        name: 'usercenter',
        redirect: { name: 'personCenter' },
        meta: { title: 'usercenter' },
        children: [
          {
            path: '/personCenter',
            component: _import('modules/usercenter/personCenter'),
            name: 'personCenter',
            meta: { title: 'personCenter' }
          },
          {
            path: '/modifyInfo',
            component: _import('modules/usercenter/modifyInfo'),
            name: 'modifyInfo',
            meta: { title: 'modifyInfo' }
          },
          {
            path: '/accountManage',
            component: _import('modules/usercenter/accountManage'),
            name: 'accountManage',
            meta: { title: 'accountManage' }
          }
        ]
      },
      {
        path: '/sys',
        component: _import('modules/sys/index'),
        name: 'sys',
        redirect: { name: 'userManage' },
        meta: { title: 'sys' },
        children: [
          {
            path: '/userManage',
            component: _import('modules/sys/userManage'),
            name: 'userManage',
            meta: { title: 'userManage' }
          },
          {
            path: '/menuManage',
            component: _import('modules/sys/menuManage'),
            name: 'menuManage',
            meta: { title: 'menuManage' }
          },
          {
            path: '/roleManage',
            component: _import('modules/sys/roleManage'),
            name: 'roleManage',
            meta: { title: 'roleManage' }
          },
          {
            path: '/organManage',
            component: _import('modules/sys/organManage'),
            name: 'organManage',
            meta: { title: 'organManage' }
          }
        ]
      },,
      {
        path: '/timespace',
        component: _import('modules/timespace/index'),
        name: 'timespace',
        redirect: { name: 'timespace' },
        meta: { title: 'timespace' },
        children: [
          {
            path: '/timespace',
            component: _import('modules/timespace/timespace'),
            name: 'timespace',
            meta: { title: 'timespace' }
          },
          {
            path: '/timespacelist',
            component: _import('modules/timespace/timespacelist'),
            name: 'timespacelist',
            meta: { title: 'timespacelist' }
          },
          {
            path: '/timespaceinfo',
            component: _import('modules/timespace/timespaceinfo'),
            name: 'timespaceinfo',
            meta: { title: 'timespaceinfo' }
          }
        ]
      },
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
