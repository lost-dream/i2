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
      title: '404未找到',
    },
  },
  {
    path: '/login',
    component: _import('common/Login'),
    name: 'login',
    meta: {
      title: '登录',
    },
  },
]
const mainRoutes = [
  {
    path: '/',
    component: _import('Layout'),
    name: 'layout',
    redirect: {
      name: 'home',
    },
    meta: {
      title: '主入口整体布局',
    },
    children: [
      {
        path: '/home',
        component: _import('common/Home'),
        name: 'home',
        meta: {
          title: '首页',
          rolePath: 'Home',
        },
      },
      {
        path: '/i2',
        component: _import('modules/i2/index'),
        name: 'i2',
        meta: {
          title: 'i2',
          rolePath: 'i2',
        },
      },
      {
        path: '/relation',
        component: _import('modules/relation/index'),
        name: 'relation',
        meta: {
          title: 'relation',
          rolePath: 'relation',
        },
        redirect: {
          name: 'relationSearch',
        },
        children: [
          {
            path: '/relationSearch',
            component: _import('modules/relation/relationSearch'),
            name: 'relationSearch',
            meta: { title: 'relationSearch', rolePath: 'relation' },
          },
          {
            path: '/analyse',
            component: _import('modules/relation/analyse'),
            name: 'analyse',
            meta: { title: 'analyse', rolePath: 'relation' },
          },
        ],
      },

      {
        path: '/ticket',
        component: _import('modules/ticket/index'),
        name: 'ticket',
        redirect: { name: 'newPhone' },
        meta: {
          title: 'ticket',
          rolePath: 'ticket',
        },
        children: [
          {
            path: '/ticket/newPhone',
            component: _import('modules/ticket/newPhone'),
            name: 'newPhone',
            meta: {
              title: 'newPhone',
            },
          },
          {
            path: '/ticket/phoneSearch',
            component: _import('modules/ticket/phoneSearch'),
            name: 'phoneSearch',
            meta: {
              title: 'phoneSearch',
              rolePath: 'ticket',
            },
          },
          {
            path: '/ticket/singlePhone',
            component: _import('modules/ticket/singlePhone'),
            name: 'singlePhone',
            redirect: { name: 'soonLate' },
            meta: {
              title: 'singlePhone',
              rolePath: 'ticket',
            },
            children: [
              {
                path: '/ticket/singlePhone/soonLate',
                component: _import('modules/ticket/SinglePhone/soonLate'),
                name: 'soonLate',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/periodAll',
                component: _import('modules/ticket/SinglePhone/periodAll'),
                name: 'periodAll',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/continuePeriod',
                component: _import('modules/ticket/SinglePhone/continuePeriod'),
                name: 'continuePeriod',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/differentPeriod',
                component: _import(
                  'modules/ticket/SinglePhone/differentPeriod',
                ),
                name: 'differentPeriod',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/callAnalyse',
                component: _import('modules/ticket/SinglePhone/callAnalyse'),
                name: 'callAnalyse',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/callDetailAnalyse',
                component: _import(
                  'modules/ticket/SinglePhone/callDetailAnalyse',
                ),
                name: 'callDetailAnalyse',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/phoneHomeLocation',
                component: _import(
                  'modules/ticket/SinglePhone/phoneHomeLocation',
                ),
                name: 'phoneHomeLocation',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/phoneTravel',
                component: _import('modules/ticket/SinglePhone/phoneTravel'),
                name: 'phoneTravel',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/mobileAnalyse',
                component: _import('modules/ticket/SinglePhone/mobileAnalyse'),
                name: 'mobileAnalyse',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/weekPhone',
                component: _import('modules/ticket/SinglePhone/weekPhone'),
                name: 'weekPhone',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
            ],
          },
          {
            path: '/ticket/morePhone',
            component: _import('modules/ticket/morePhone'),
            name: 'morePhone',
            redirect: { name: 'sameTime' },
            meta: {
              title: 'morePhone',
              rolePath: 'ticket',
            },
            children: [
              {
                path: '/ticket/morePhone/sameTime',
                component: _import('modules/ticket/MorePhone/sameTime'),
                name: 'sameTime',
                meta: {
                  title: 'morePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/morePhone/assignTime',
                component: _import('modules/ticket/MorePhone/assignTime'),
                name: 'assignTime',
                meta: {
                  title: 'morePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/morePhone/morePhoneTrail',
                component: _import('modules/ticket/MorePhone/morePhoneTrail'),
                name: 'morePhoneTrail',
                meta: {
                  title: 'morePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/morePhone/commonPhone',
                component: _import('modules/ticket/MorePhone/commonPhone'),
                name: 'commonPhone',
                meta: {
                  title: 'morePhone',
                  rolePath: 'ticket',
                },
              },
            ],
          },
          {
            path: '/ticket/allNetwork',
            component: _import('modules/ticket/allNetwork'),
            name: 'allNetwork',
            redirect: { name: 'allNetPhoneSearch' },
            meta: {
              title: 'allNetwork',
              rolePath: 'ticket',
            },
            children: [
              {
                path: '/ticket/allNetwork/allNetPhoneSearch',
                component: _import('modules/ticket/AllNetwork/phoneSearch'),
                name: 'allNetPhoneSearch',
                meta: {
                  title: 'allNetwork',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/allNetwork/IMEISearch',
                component: _import('modules/ticket/AllNetwork/IMEISearch'),
                name: 'IMEISearch',
                meta: {
                  title: 'allNetwork',
                  rolePath: 'ticket',
                },
              },
            ],
          },
        ],
      },
      {
        path: '/usercenter',
        component: _import('modules/usercenter/index'),
        name: 'usercenter',
        redirect: { name: 'personCenter' },
        meta: { title: 'usercenter', rolePath: 'usercenter' },
        children: [
          {
            path: '/personCenter',
            component: _import('modules/usercenter/personCenter'),
            name: 'personCenter',
            meta: { title: 'personCenter', rolePath: 'usercenter' },
          },
          {
            path: '/modifyInfo',
            component: _import('modules/usercenter/modifyInfo'),
            name: 'modifyInfo',
            meta: { title: 'modifyInfo', rolePath: 'usercenter' },
          },
          {
            path: '/accountManage',
            component: _import('modules/usercenter/accountManage'),
            name: 'accountManage',
            meta: { title: 'accountManage', rolePath: 'usercenter' },
          },
        ],
      },
      {
        path: '/archives',
        component: _import('modules/archives/archives'),
        name: 'archives',
        meta: { title: 'archives', rolePath: 'archives' },
      },
      {
        path: '/sys',
        component: _import('modules/sys/index'),
        name: 'sys',
        redirect: { name: 'userManage' },
        meta: { title: 'sys', rolePath: 'sys' },
        children: [
          {
            path: '/userManage',
            component: _import('modules/sys/userManage'),
            name: 'userManage',
            meta: { title: 'userManage', rolePath: 'userManage' },
          },
          {
            path: '/menuManage',
            component: _import('modules/sys/menuManage'),
            name: 'menuManage',
            meta: { title: 'menuManage', rolePath: 'menuManage' },
          },
          {
            path: '/roleManage',
            component: _import('modules/sys/roleManage'),
            name: 'roleManage',
            meta: { title: 'roleManage', rolePath: 'roleManage' },
          },
          {
            path: '/organManage',
            component: _import('modules/sys/organManage'),
            name: 'organManage',
            meta: { title: 'organManage', rolePath: 'organManage' },
          },
        ],
      },
      {
        path: '/unioncase',
        component: _import('modules/unioncase/index'),
        name: 'unioncase',
        meta: {
          title: 'unioncase',
          rolePath: 'unioncase',
        },
      },

      {
        path: '/unioncaseaaaaa',
        component: _import('modules/unioncase/unioncase'),
        name: 'unioncaseaaaaa',
        meta: { title: 'unioncaseaaaaa', rolePath: 'unioncase' },
      },

      {
        path: '/taskManage',
        component: _import('modules/unioncase/taskManage'),
        name: 'taskManage',
        meta: { title: 'taskManage', rolePath: 'unioncase' },
      },

      {
        path: '/taskAnalysisResults',
        component: _import('modules/unioncase/taskAnalysisResults'),
        name: 'taskAnalysisResults',
        meta: { title: 'taskAnalysisResults', rolePath: 'unioncase' },
      },
      {
        path: '/timespaceindex',
        component: _import('modules/timespace/index'),
        name: 'timespaceindex',
        redirect: { name: 'timespace' },
        meta: { title: 'timespaceindex', rolePath: 'timespaceindex' },
        children: [
          {
            path: '/timespace',
            component: _import('modules/timespace/timespace'),
            name: 'timespace',
            meta: { title: 'timespace', rolePath: 'timespaceindex' },
          },
          {
            path: '/timespacelist',
            component: _import('modules/timespace/timespacelist'),
            name: 'timespacelist',
            meta: { title: 'timespacelist', rolePath: 'timespaceindex' },
          },
          {
            path: '/timespaceinfo',
            component: _import('modules/timespace/timespaceinfo'),
            name: 'timespaceinfo',
            meta: { title: 'timespaceinfo', rolePath: 'timespaceindex' },
          },
        ],
      },
    ],
  },
]

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: [...globalRoutes, ...mainRoutes],
})
export default router
