<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log('this.$route.query', this.$route.query)
    const { username: userName } = this.$route.query

    if (userName) {
      console.log('userName--2', userName)

      // 从query获取参数自动登录
      this.$store
        .dispatch('user/login', {
          userName
        })
        .then(() => {
          this.$router.replace({
            path: '/',
            query: {}
          })
        })
        .catch(() => {
          this.$router.push({
            path: '/404',
            query: {}
          })
        })
    }
  }
}
</script>
