import BaseLayout from '../../layouts/BaseLayout.vue';
import Login from '../../views/Login/index.vue';


export default [
  {
    path: '/login',
    component: Login,
    meta: { title: '登录页面' },
  },{
    path: '/',
    redirect: '/workbench',
    component: BaseLayout,
    meta: { title: '工作空间' },
    children: [
      {
        path: '/workbench',
        component: () => import('../../views/workSpace/workbench/index.vue'),
        meta: { title: '工作台' },
      },
      {
        path: '/console',
        component: () => import('../../views/workSpace/console/index.vue'),
        meta: { title: '控制台' },
      }
    ]
  },{
    path: '/error',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: '/error/401',
        component: () => import('../../views/Error/401.vue'),
        meta: { title: '401' },
      },
      {
        path: '/error/403',
        component: () => import('../../views/Error/403.vue'),
        meta: { title: '403' },
      },
      {
        path: '/error/404',
        component: () => import('../../views/Error/404.vue'),
        meta: { title: '404' },
      },
      {
        path: '/error/500',
        component: () => import('../../views/Error/500.vue'),
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
        component: () => import('../../views/System/user/index.vue'),
        meta: { title: '用户管理' },
      },
      {
        path: '/system/role',
        component: () => import('../../views/System/role/index.vue'),
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
        component: () => import('../../views/Result/success.vue'),
        meta: { title: '成功页面' },
      },
      {
        path: '/result/failure',
        component: () => import('../../views/Result/failure.vue'),
        meta: { title: '失败页面' },
      },
    ]
  }
]