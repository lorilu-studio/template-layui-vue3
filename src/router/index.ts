import { createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import routes from './module/base-routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

NProgress.configure({ showSpinner: false })

/**
 * Router 前置拦截
 * 
 * 1.验证 token 存在, 并且有效, 否则 -> login.vue
 * 2.验证 permission 存在, 否则 -> 403.vue
 * 3.验证 router 是否存在, 否则 -> 404.vue
 * 
 * @param to 目标
 * @param from 来至 
 */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 待完成
  NProgress.start();
  next();
})

router.afterEach(() => {
  NProgress.done();
})

export default router