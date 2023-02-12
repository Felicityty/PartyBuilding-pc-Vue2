// import { getToken } from '@/utils/auth'
import { getRouter } from '@/api/user'
import router from '@/router'
import routerMap from '@/router/routerMap'

const getDefaultState = () => {
  return {
    rules: '',
    addRoute: [], // 动态路由
    fullRoute: [] // 动态路由 + 静态路由
  }
}

const state = getDefaultState()

// 将动态路由的字符串形式转换为 .vue 形式
function _import(str) { // views文件夹下的Home组件，传入的格式为 'Home'
  return function(resolve) {
    require([`@/views/${str}.vue`], resolve)
  }
}

// 处理路由 递归 遍历数结构 中序遍历
const generateRoutes = (route) => {
  return route.map((item) => {
    if (item.children) {
      item.children = generateRoutes(item.children)
    }

    // 在树中遍历的时候，遍历到Layout的时候加载Layout组件，不是Layout则变换并加载对应组件
    // 会map出一个新的数组，和之前的数组分开，新的数组和旧的数组的区别就是所有的component属性后面的key从字符串变成了 vue组件，这下就可以动态组件就也可以用了
    item.component = routerMap[item.component] || _import(item.component)
    return item
  })
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ROUTES: (state, addRoute) => {
    state.addRoute = addRoute
    state.fullRoute = [...addRoute, ...router.options.routes]
  }
}

const actions = {
  async generateRoute({ commit }, roles) {
    let tokenType = null
    let rol = null
    if (roles === 0) {
      tokenType = 'editor-token'
      rol = 0
    } else {
      tokenType = 'admin-token'
      rol = 1
    }
    let res = await getRouter({ role: rol })
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve) => {
      res = JSON.parse(res.data)
      const asyncRoutesDynamic = [...generateRoutes(res[tokenType]), { path: '*', redirect: '/404', hidden: true }] // 映射component
      commit('SET_ROUTES', asyncRoutesDynamic)
      resolve(asyncRoutesDynamic)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
