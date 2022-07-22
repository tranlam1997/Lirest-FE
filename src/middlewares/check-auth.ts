import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const checkAuth = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userInfo.accessToken) {
      next({
        path: '/login',
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
}

export const checkGuest = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (to.matched.some(record => record.meta.requiresGuest)) {
    if (userInfo.accessToken) {
      next({
        path: '/users',
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
}
