<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu flex-item-center">
      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <!-- 超级管理员功能转移按钮 -->
      <div v-if="roles === 2" class="flex-item-center mr-right-30 switch" @click="handleSwicth">
        <img :src="imgUrl.switch" alt="转移超管权限" class="wth_20 mr-right-7">
        <div>转移超管权限</div>
      </div>
      <!-- 头像 -->
      <div class="flex-item-center mr-right-30 username">
        <img v-if="roles === 1 || roles === 2" :src="imgUrl.admini" class="wth_20">
        <img v-else :src="imgUrl.user" class="wth_17">
        <div class="mr-left-5">{{ name }}</div>
      </div>
      <!-- 退出 -->
      <div class="flex-item-center mr-right-30 logout" @click="logout">
        <img :src="imgUrl.exits" class="wth_20">
        <div class="mr-left-5">退出登录</div>
      </div>
    </div>

    <el-dialog
      title="转移超管权限"
      :visible.sync="dialogVisible"
      width="35%"
      :modal-append-to-body="false"
      @close="handleClosed"
    >
      <el-form ref="form" :model="form" :rules="switchRules" label-width="150px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" style="width: 70%" />
        </el-form-item>
        <el-alert
          title="请输入对方的用户名 请谨慎操作"
          type="warning"
          show-icon
          center
          :closable="false"
          class="switch-super-alert"
        />
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSwitch">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { transmitSuper } from '@/api/UserManage'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      imgUrl: {
        switch: require('@/assets/svg/super_admin_switch_fun.svg'),
        admini: require('@/assets/svg/ic_titlebar_administrators.svg'),
        user: require('@/assets/svg/ic_titlebar_common_user.svg'),
        exits: require('@/assets/svg/ic_titlebar_signout.svg')
      },
      dialogVisible: false,
      form: {
        userName: ''
      },
      switchRules: {
        userName: [
          {
            required: true,
            message: '请输入对方用户名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'roles'
    ])
  },
  methods: {
    transmitSuper,

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // },
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push(`/`)
    },
    handleSwicth() {
      this.dialogVisible = true
    },
    handleClosed() {
      this.$refs.form.resetFields()
    },
    confirmSwitch() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          try {
            console.log(this.form)
            await this.transmitSuper(this.form)
            this.$message.success('转移权限成功！')
            this.dialogVisible = false
            this.logout()
          } catch (error) {
            this.$message.error('转移权限失败！')
            console.log(error)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #232527;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .logout {
      cursor: pointer;
      color: #ffffff;
    }

    .username {
      cursor: pointer;
      color: #ffffff;
    }

    .switch {
      cursor: pointer;
      color: #ffffff;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .switch-super-alert {
    width: 90%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
