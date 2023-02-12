<template>
  <div>
    <!-- 顶部菜单条 -->
    <!-- <el-row :gutter="22" style="margin-bottom: 1%">
      <el-col :span="10" style="text-align:left">
        <div class="top-div-left-menu">
          <slot name="left-menu" />
        </div>
      </el-col>

      <el-col :span="14" style="text-align:right">
        <slot name="right-menu" />
      </el-col>
    </el-row> -->

    <div v-if="$slots.btnLeft || $slots.btnRight" style="display:flex; justify-content: space-between; margin-bottom: 1%">
      <div :class="className">
        <slot name="btnLeft" />
      </div>
      <div class="right" style="text-align:right">
        <slot name="btnRight" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
