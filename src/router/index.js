/**
 * 全站路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 全局路由
const globalRoutes = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/common/404'),
    name: '404',
    meta: {
      title: '404未找到',
    },
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/common/Login'),
    name: 'login',
    meta: {
      title: '登录',
    },
  },
]
const mainRoutes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Layout'),
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
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/common/Home'),
        name: 'home',
        meta: {
          title: '首页',
          rolePath: 'Home',
        },
      },
      {
        path: '/i2',
        component: () =>
          import(/* webpackChunkName: "i2" */ '@/views/modules/i2/index'),
        name: 'i2',
        meta: {
          title: 'i2',
          rolePath: 'i2',
        },
      },
      {
        path: '/relation',
        component: () =>
          import(/* webpackChunkName: "relation" */ '@/views/modules/relation/index'),
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
            component: () =>
              import(/* webpackChunkName: "relationSearch" */ '@/views/modules/relation/relationSearch'),
            name: 'relationSearch',
            meta: { title: 'relationSearch', rolePath: 'relation' },
          },
          {
            path: '/analyse',
            component: () =>
              import(/* webpackChunkName: "analyse" */ '@/views/modules/relation/analyse'),
            name: 'analyse',
            meta: { title: 'analyse', rolePath: 'relation' },
          },
        ],
      },

      {
        path: '/ticket',
        component: () =>
          import(/* webpackChunkName: "ticket" */ '@/views/modules/ticket/index'),
        name: 'ticket',
        redirect: { name: 'newPhone' },
        meta: {
          title: 'ticket',
          rolePath: 'ticket',
        },
        children: [
          {
            path: '/ticket/newPhone',
            component: () =>
              import(/* webpackChunkName: "newPhone" */ '@/views/modules/ticket/newPhone'),
            name: 'newPhone',
            meta: {
              title: 'newPhone',
              rolePath: 'ticket',
            },
          },
          {
            path: '/ticket/phoneSearch',
            component: () =>
              import(/* webpackChunkName: "phoneSearch" */ '@/views/modules/ticket/phoneSearch'),
            name: 'phoneSearch',
            meta: {
              title: 'phoneSearch',
              rolePath: 'ticket',
            },
          },
          {
            path: '/ticket/singlePhone',
            component: () =>
              import(/* webpackChunkName: "singlePhone" */ '@/views/modules/ticket/singlePhone'),
            name: 'singlePhone',
            redirect: { name: 'soonLate' },
            meta: {
              title: 'singlePhone',
              rolePath: 'ticket',
            },
            children: [
              {
                path: '/ticket/singlePhone/soonLate',
                component: () =>
                  import(/* webpackChunkName: "soonLate" */ '@/views/modules/ticket/SinglePhone/soonLate'),
                name: 'soonLate',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/periodAll',
                component: () =>
                  import(/* webpackChunkName: "periodAll" */ '@/views/modules/ticket/SinglePhone/periodAll'),
                name: 'periodAll',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/continuePeriod',
                component: () =>
                  import(/* webpackChunkName: "continuePeriod" */ '@/views/modules/ticket/SinglePhone/continuePeriod'),
                name: 'continuePeriod',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/differentPeriod',
                component: () =>
                  import(/* webpackChunkName: "differentPeriod" */
                  '@/views/modules/ticket/SinglePhone/differentPeriod'),
                name: 'differentPeriod',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/callAnalyse',
                component: () =>
                  import(/* webpackChunkName: "callAnalyse" */ '@/views/modules/ticket/SinglePhone/callAnalyse'),
                name: 'callAnalyse',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/callDetailAnalyse',
                component: () =>
                  import(/* webpackChunkName: "callDetailAnalyse" */
                  '@/views/modules/ticket/SinglePhone/callDetailAnalyse'),
                name: 'callDetailAnalyse',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/phoneHomeLocation',
                component: () =>
                  import(/* webpackChunkName: "phoneHomeLocation" */
                  '@/views/modules/ticket/SinglePhone/phoneHomeLocation'),
                name: 'phoneHomeLocation',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/phoneTravel',
                component: () =>
                  import(/* webpackChunkName: "phoneTravel" */ '@/views/modules/ticket/SinglePhone/phoneTravel'),
                name: 'phoneTravel',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/mobileAnalyse',
                component: () =>
                  import(/* webpackChunkName: "mobileAnalyse" */ '@/views/modules/ticket/SinglePhone/mobileAnalyse'),
                name: 'mobileAnalyse',
                meta: {
                  title: 'singlePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/singlePhone/weekPhone',
                component: () =>
                  import(/* webpackChunkName: "weekPhone" */ '@/views/modules/ticket/SinglePhone/weekPhone'),
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
            component: () =>
              import(/* webpackChunkName: "morePhone" */ '@/views/modules/ticket/morePhone'),
            name: 'morePhone',
            redirect: { name: 'sameTime' },
            meta: {
              title: 'morePhone',
              rolePath: 'ticket',
            },
            children: [
              {
                path: '/ticket/morePhone/sameTime',
                component: () =>
                  import(/* webpackChunkName: "sameTime" */ '@/views/modules/ticket/MorePhone/sameTime'),
                name: 'sameTime',
                meta: {
                  title: 'morePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/morePhone/assignTime',
                component: () =>
                  import(/* webpackChunkName: "assignTime" */ '@/views/modules/ticket/MorePhone/assignTime'),
                name: 'assignTime',
                meta: {
                  title: 'morePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/morePhone/morePhoneTrail',
                component: () =>
                  import(/* webpackChunkName: "morePhoneTrail" */ '@/views/modules/ticket/MorePhone/morePhoneTrail'),
                name: 'morePhoneTrail',
                meta: {
                  title: 'morePhone',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/morePhone/commonPhone',
                component: () =>
                  import(/* webpackChunkName: "commonPhone" */ '@/views/modules/ticket/MorePhone/commonPhone'),
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
            component: () =>
              import(/* webpackChunkName: "allNetwork" */ '@/views/modules/ticket/allNetwork'),
            name: 'allNetwork',
            redirect: { name: 'allNetPhoneSearch' },
            meta: {
              title: 'allNetwork',
              rolePath: 'ticket',
            },
            children: [
              {
                path: '/ticket/allNetwork/allNetPhoneSearch',
                component: () =>
                  import(/* webpackChunkName: "allNetPhoneSearch" */ '@/views/modules/ticket/AllNetwork/phoneSearch'),
                name: 'allNetPhoneSearch',
                meta: {
                  title: 'allNetwork',
                  rolePath: 'ticket',
                },
              },
              {
                path: '/ticket/allNetwork/IMEISearch',
                component: () =>
                  import(/* webpackChunkName: "IMEISearch" */ '@/views/modules/ticket/AllNetwork/IMEISearch'),
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
        component: () =>
          import(/* webpackChunkName: "usercenter" */ '@/views/modules/usercenter/index'),
        name: 'usercenter',
        redirect: { name: 'personCenter' },
        meta: { title: 'usercenter', rolePath: 'usercenter' },
        children: [
          {
            path: '/personCenter',
            component: () =>
              import(/* webpackChunkName: "personCenter" */ '@/views/modules/usercenter/personCenter'),
            name: 'personCenter',
            meta: { title: 'personCenter', rolePath: 'usercenter' },
          },
          {
            path: '/modifyInfo',
            component: () =>
              import(/* webpackChunkName: "modifyInfo" */ '@/views/modules/usercenter/modifyInfo'),
            name: 'modifyInfo',
            meta: { title: 'modifyInfo', rolePath: 'usercenter' },
          },
          {
            path: '/accountManage',
            component: () =>
              import(/* webpackChunkName: "accountManage" */ '@/views/modules/usercenter/accountManage'),
            name: 'accountManage',
            meta: { title: 'accountManage', rolePath: 'usercenter' },
          },
        ],
      },
      {
        path: '/archives',
        component: () =>
          import(/* webpackChunkName: "archives" */ '@/views/modules/archives/archives'),
        name: 'archives',
        meta: { title: 'archives', rolePath: 'archives' },
      },
      {
        path: '/sys',
        component: () =>
          import(/* webpackChunkName: "sys" */ '@/views/modules/sys/index'),
        name: 'sys',
        redirect: { name: 'userManage' },
        meta: { title: 'sys', rolePath: 'sys' },
        children: [
          {
            path: '/userManage',
            component: () =>
              import(/* webpackChunkName: "userManage" */ '@/views/modules/sys/userManage'),
            name: 'userManage',
            meta: { title: 'userManage', rolePath: 'userManage' },
          },
          {
            path: '/menuManage',
            component: () =>
              import(/* webpackChunkName: "menuManage" */ '@/views/modules/sys/menuManage'),
            name: 'menuManage',
            meta: { title: 'menuManage', rolePath: 'menuManage' },
          },
          {
            path: '/roleManage',
            component: () =>
              import(/* webpackChunkName: "roleManage" */ '@/views/modules/sys/roleManage'),
            name: 'roleManage',
            meta: { title: 'roleManage', rolePath: 'roleManage' },
          },
          {
            path: '/organManage',
            component: () =>
              import(/* webpackChunkName: "organManage" */ '@/views/modules/sys/organManage'),
            name: 'organManage',
            meta: { title: 'organManage', rolePath: 'organManage' },
          },
        ],
      },
      {
        path: '/unioncase',
        component: () =>
          import(/* webpackChunkName: "unioncase" */ '@/views/modules/unioncase/index'),
        name: 'unioncase',
        meta: {
          title: 'unioncase',
          rolePath: 'unioncase',
        },
      },

      {
        path: '/unioncaseaaaaa',
        component: () =>
          import(/* webpackChunkName: "unioncaseaaaaa" */ '@/views/modules/unioncase/unioncase'),
        name: 'unioncaseaaaaa',
        meta: { title: 'unioncaseaaaaa', rolePath: 'unioncase' },
      },

      {
        path: '/taskManage',
        component: () =>
          import(/* webpackChunkName: "taskManage" */ '@/views/modules/unioncase/taskManage'),
        name: 'taskManage',
        meta: { title: 'taskManage', rolePath: 'unioncase' },
      },

      {
        path: '/taskAnalysisResults',
        component: () =>
          import(/* webpackChunkName: "taskAnalysisResults" */ '@/views/modules/unioncase/taskAnalysisResults'),
        name: 'taskAnalysisResults',
        meta: { title: 'taskAnalysisResults', rolePath: 'unioncase' },
      },
      {
        path: '/timespaceindex',
        component: () =>
          import(/* webpackChunkName: "timespaceindex" */ '@/views/modules/timespace/index'),
        name: 'timespaceindex',
        redirect: { name: 'timespace' },
        meta: { title: 'timespaceindex', rolePath: 'timespaceindex' },
        children: [
          {
            path: '/timespace',
            component: () =>
              import(/* webpackChunkName: "timespace" */ '@/views/modules/timespace/timespace'),
            name: 'timespace',
            meta: { title: 'timespace', rolePath: 'timespaceindex' },
          },
          {
            path: '/timespacelist',
            component: () =>
              import(/* webpackChunkName: "timespacelist" */ '@/views/modules/timespace/timespacelist'),
            name: 'timespacelist',
            meta: { title: 'timespacelist', rolePath: 'timespaceindex' },
          },
          {
            path: '/timespaceinfo',
            component: () =>
              import(/* webpackChunkName: "timespaceinfo" */ '@/views/modules/timespace/timespaceinfo'),
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
