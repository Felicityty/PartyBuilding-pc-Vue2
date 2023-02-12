import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  console.log('from', from)
  console.log('to', to)

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log('hasToken', hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles

      if (hasRoles !== '') {
        next()
      } else {
        try {
          store.dispatch('user/getInfo').then(() => {
            const roles = store.getters.roles
            store.dispatch('permission/generateRoute', roles).then((res) => {
              const accessRoutes = res
              router.addRoutes(accessRoutes)
              next({ ...to, replace: true })
            })
            // store.dispatch('option/getOptions').then(() => {
            // })
          })
        } catch (error) {
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 判断有无参数
      const { username: userName } = to.query
      if (userName) {
        console.log('userName', userName)
        store.dispatch('user/login', {
          userName
        }).then(() => {
          console.log('执行跳转111', to.path)
          next({ ...to, replace: true, query: {}})
        }).catch((error) => {
          console.log('执行跳转222', error)
          console.log(error)
          // 统一认证登录成功，但是，党建平台不存在该用户名
          const choice = confirm(error.msg)
          if (choice) {
            window.location.href = `${process.env.VUE_APP_BASE_API}/cas/logout`
          } else {
            window.location.href = `${process.env.VUE_APP_BASE_API}/cas/logout`
          }
        })
      } else {
        next()
        // next({ path: '/404', replace: true, query: {}})
      }
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      console.log(to.path)
      // next(`/login?redirect=${to.path}`)
      // console.log('无token则请求302跳转')
      // window.location.href = `${process.env.VUE_APP_BASE_API}/cas/casLogin`
      window.location.href = `${process.env.VUE_APP_BASE_API}/cas/logout`
    }
    NProgress.done()

    /* has no token*/

    // if (whiteList.indexOf(to.path) !== -1) {
    //   // in the free login whitelist, go directly
    //   next()
    // } else {
    //   // other pages that do not have permission to access are redirected to the login page.
    //   next(`/login?redirect=${to.path}`)
    //   NProgress.done()
    // }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
