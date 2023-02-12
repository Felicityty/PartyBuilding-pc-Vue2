<template>
  <section class="third-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Thirdmain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
