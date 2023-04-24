// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')
//           // 如果能获取到用户信息，就可以正常跳转
//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })

import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
// 只要发生页面跳转就需要前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) {
    // 有token的情况
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 获取用户信息
      if (Object.keys(store.state.user.userInfo).length <= 0) {
        store.dispatch('user/getUserInfo').then(() => {
          next()
        })
      } else {
        next()
      }

      NProgress.done()
    }
  } else {
    // 没token，过期的情况
    if (whiteList.includes(to.path)) {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
