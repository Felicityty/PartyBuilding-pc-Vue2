<template>
  <div class="login-container">
    <img :src="imgUrl.bkgImg" class="login-bkg">
    <div class="login-bkg-title">欢迎进入信息与电子工程学院党建平台</div>
    <img :src="imgUrl.bkgImgIllustration" alt class="login-bkg-ill">

    <div class="login-form-div">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">党建平台登录</h3>
        </div>

        <el-form-item prop="userName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="userName"
            v-model="loginForm.userName"
            placeholder="用户名"
            name="userName"
            type="text"
            tabindex="1"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <!-- <el-form-item prop="verfication">
          <span class="svg-container">
            <svg-icon icon-class="ic_login_scan" />
          </span>
          <el-input
            ref="verfication"
            v-model="loginForm.verfication"
            placeholder="请输入验证码"
            name="verfication"
            type="text"
            tabindex="1"
          />
        </el-form-item> -->

        <el-button
          :loading="loading"
          type="primary"
          class="el-form-submit-btn"
          @click.native.prevent="handleLogin"
        >登 录</el-button>
        <el-checkbox
          v-model="freeLoginCheck"
          class="free-login-check"
        >7天免登录</el-checkbox>
        <span class="forget-password">忘记密码?</span>
      </el-form>
    </div>

    <div class="technical-support">技术支持：数字媒体技术专业</div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
// import axios from 'axios'
// import { casLogin } from '@/api/user'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('提示：用户名不存在'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('提示：密码长度至少需要6位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      imgUrl: {
        bkgImg: require('@/assets/img/login_bg.jpg'),
        bkgImgIllustration: require('@/assets/img/pic_login_illustration.svg')
      },
      loginForm: {
        // userName: '1201020009',
        // password: '123456'
        // userName: '115055',
        userName: '222108855051',
        password: 'dj@2022'
        // userName: '',
        // password: ''
        // userName: '12345678',
        // password: '12345678'
      },
      loginRules: {
        userName: [
          {
            required: true,
            trigger: 'blur'
            // validator: validateUsername
          }
        ],
        // ,
        password: [
          {
            required: true,
            trigger: 'blur'
            // validator: validatePassword
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,

      freeLoginCheck: false
    }
  },
  // 注释点1
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  created() {
    // 302跳转
    // window.location.href = `${process.env.VUE_APP_BASE_API}:8003/cas/casLogin`
  },
  mounted() {
    // console.log('登录页面加载前')
    // // this.$store.dispatch('user/getInfo')

    // // 判断路由中是否存在用户信息
    // // const queryInfo = this.$router.query
    // console.log('this.$router', this.$router)
    // console.log('this.$router.query', this.$router.query)

    // console.log('this.$route', this.$route)
    // if(queryInfo)
    // 存在参数，判断参数的完整性以及校验格式（选做）
    // 验证通过后触发vuex中的登录操作，并存储token，并跳转至主页面
    // 不通过则重定向至登录页，去掉参数
    // 无参数正常跳转
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          // 之前下面这样写,会判断是否有redirect路径,就是记住进入到登录页面之前的页面,导致在管理员和普通用户两个账号间切换时总是404的情况,把redirect去掉,让每次登录后直接跳到该权限对应的首页就行,不要跳到redirect页面
          // this.$router.push({ path: this.redirect || '/' });
          this.$router.push('/')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
      this.$router.push('/')

      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store
      //       .dispatch('user/login', this.loginForm)
      //       .then(() => {
      //         // 之前下面这样写,会判断是否有redirect路径,就是记住进入到登录页面之前的页面,导致在管理员和普通用户两个账号间切换时总是404的情况,把redirect去掉,让每次登录后直接跳到该权限对应的首页就行,不要跳到redirect页面
      //         // this.$router.push({ path: this.redirect || '/' });
      //         this.$router.push('/')
      //         this.loading = false
      //       })
      //       .catch(() => {
      //         this.loading = false
      //       })
      //     this.$router.push('/')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
// 这部分的style样式没有加scoped，这部分样式就会作用于全局，从而去覆盖掉elementui的默认内部样式

/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #7d8185;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

// @media screen and (max-width: 60%) {
//   .login-bkg-title {
//     display: none;
//   }
// }

/* reset element-ui css */
.login-container {
  width: 100%;
  position: relative;
  min-height: 100%;
  overflow: hidden;

  .login-bkg {
    position: absolute;
    // transform: scale(0.8);
    width: 100%;
  }

  .login-bkg-title {
    position: absolute;
    font-size: 40px;
    font-weight: 600;
    color: #ffffff;
    left: 13%;
    top: 20%;
  }

  .login-bkg-ill {
    position: absolute;
    left: 15%;
    top: 30%;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000000; // 这里修改的是输入框的输入字体颜色
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  // 这里可以修改输入框的样式
  .el-form-item {
    border: 1px solid rgb(117, 114, 114, 0.2); // 输入框边框边框样式
    background-color: transparent; // 输入框背景颜色
    border-radius: 5px;
    color: #000000;
  }

  // 修改选择框颜色
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #f32823 !important;
    background-color: #f32823 !important;
  }
  .el-checkbox__inner:hover {
    border-color: #f32823 !important;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #f32823 !important;
  }
  // 修改选择label字体颜色
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #f32823 !important;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

// .el-input__inner::-webkit-input-placeholder {
//   color: #17a1e5;
//   font-size: 15px;
// }

// 改变input框背景颜色
// >>>.el-input__inner {
//   background-color: #ffffff !important;
//   border: 4px solid #1296db;
// }
.technical-support {
  position: absolute;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form-div {
    position: absolute;
    left: 60%;
    top: 20%;
    width: 440px;
    height: 500px;
    background-color: #ffffff;
    border-radius: 2%;

    .login-form {
      position: relative;
      width: 450px;
      max-width: 100%;
      padding: 60px 40px 40px;
      // margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #e3a7a1;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: #b72113;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .el-form-submit-btn {
      border-radius: 25px;
      width: 100%;
      height: 45px;
      margin-top: 40px;
      background-color: #b72113;
      border: 1px solid #b72113;
      box-shadow: 0px 10px 10px #d98b83;
    }

    .free-login-check {
      margin-top: 25px;
    }

    .forget-password {
      margin-left: 55%;
    }
  }
}
</style>
