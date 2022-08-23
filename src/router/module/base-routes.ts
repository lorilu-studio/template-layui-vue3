import BaseLayout from '../../layouts/BaseLayout.vue';
import Login from '../../views/login/index.vue';


export default [
  {
    path: '/login',
    component: Login,
    meta: { title: '登录页面' },
  },
  {
    path: '/',
    redirect: '/workSpace'
  },
  {
    path: '/workspace',
    redirect: '/workspace/workbench',
    component: BaseLayout,
    meta: { title: '工作空间' },
    children: [
      {
        path: '/workspace/workbench',
        component: () => import('../../views/workSpace/workbench/index.vue'),
        meta: { title: '工作台' },
      },
      {
        path: '/workspace/console',
        component: () => import('../../views/workSpace/console/index.vue'),
        meta: { title: '控制台' },
      },
      {
        path: '/workspace/analysis',
        component: () => import('../../views/workSpace/analysis/index.vue'),
        meta: { title: '分析页' },
      }
    ]
  },{
    path: '/error',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: '/error/401',
        component: () => import('../../views/error/401.vue'),
        meta: { title: '401' },
      },
      {
        path: '/error/403',
        component: () => import('../../views/error/403.vue'),
        meta: { title: '403' },
      },
      {
        path: '/error/404',
        component: () => import('../../views/error/404.vue'),
        meta: { title: '404' },
      },
      {
        path: '/error/500',
        component: () => import('../../views/error/500.vue'),
        meta: { title: '500' },
      }
    ]
  },{
    path: '/system',
    component: BaseLayout,
    meta: { title: '系统管理' },
    children: [
      {
        path: '/system/user',
        component: () => import('../../views/system/user/index.vue'),
        meta: { title: '用户管理' },
      },
      {
        path: '/system/role',
        component: () => import('../../views/system/role/index.vue'),
        meta: { title: '角色管理' },
      }
    ]
  },{
    path: '/result',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: '/result/success',
        component: () => import('../../views/result/success.vue'),
        meta: { title: '成功页面' },
      },
      {
        path: '/result/failure',
        component: () => import('../../views/result/failure.vue'),
        meta: { title: '失败页面' },
      },
    ]
  },{
    path: '/list',
    component: BaseLayout,
    meta: { title: '列表页面' },
    children: [
      {
        path: '/table/base',
        component: () => import('../../views/table/base.vue'),
        meta: { title: '查询列表' },
      },
      {
        path: '/table/card',
        component: () => import('../../views/table/card.vue'),
        meta: { title: '卡片列表' },
      }
    ]
  },{
    path: '/form',
    component: BaseLayout,
    meta: { title: '表单页面' },
    children: [
      {
        path: '/form/base',
        component: () => import('../../views/form/base.vue'),
        meta: { title: '基础表单' },
      },      
      {
        path: '/form/step',
        component: () => import('../../views/form/step.vue'),
        meta: { title: '分步表单' },
      },
    ]
  },{
    path: '/directive',
    component: BaseLayout,
    meta: { title: '内置指令' },
    children: [
      {
        path: '/directive/permission',
        component: () => import('../../views/directive/permission.vue'),
        meta: { title: '权限指令' },
      },
    ]
  }
]