<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div class="sidbar-title">
      <img :src="imgUrl.titleImg" alt="" class="wth_25">
      <span>党建平台</span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="el-scrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import store from '@/store'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      imgUrl: {
        titleImg: require('@/assets/svg/homepage_titlePage.svg')
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      console.log('侧边栏拿到的数据', store.getters.fullRoute)

      // return this.$router.options.routes
      return store.getters.fullRoute
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss">
// 如果想要修改elementui组件的内部样式，需要在一个去掉scoped的style里面设置样式去覆盖默认样式，去掉scoped后，该样式会作用于全局，从而覆盖掉默认样式
// 这里是修改导航栏里的下拉小箭头的颜色
.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
  color: #ffffff;
}
</style>

<style lang="scss" scoped>
.sidbar-title {
  height: 50px;
  background-color: #232527;
  position: relative;

  img {
    position: absolute;
    top: 13px;
    left: 16px;
  }

  span {
    line-height: 50px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    position: absolute;
    left: 55px;
  }
}
.el-scrollbar {
  background-color: #B4413D;
}

</style>
