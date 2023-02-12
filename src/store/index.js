import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,
  // 对permission里面的动态路由数据持久化存储
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        permission: val.permission
      }
    }
  })]
})

export default store
