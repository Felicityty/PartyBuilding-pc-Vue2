<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" class="el-card-tabs-padding" @tab-click="handleTabSwitch">
        <!-- 第一个tab - 个人信息 -->
        <el-tab-pane label="个人信息" name="first">
          <PersonInfo />
        </el-tab-pane>

        <!-- 第二个tab - 思想素质 -->
        <el-tab-pane label="思想素质" name="second">
          <Thought />
        </el-tab-pane>

        <!-- 第三个tab - 发展能力 -->
        <el-tab-pane label="发展能力" name="third">
          <Development />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import PersonInfo from '@/components/student/personInfo.vue'
import Thought from '@/components/student/thought.vue'
import Development from '@/components/student/development.vue'

export default {
  name: 'Student',
  components: {
    PersonInfo,
    Thought,
    Development
  },
  data() {
    return {
      activeName: 'first',
      // 学生思想素质列表

      stuList: []
    }
  },
  created() {
    this.constant.getOptions()
  },
  mounted() {
  },
  methods: {

    // 处理tab切换
    handleTabSwitch(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-tabs__item.is-active {
    color: rgba(255, 119, 44, 1);
  }

  ::v-deep .el-tabs__item:hover {
    color: rgba(255, 119, 44, 1);
  }

  ::v-deep .el-tabs__active-bar {
    background-color: rgba(255, 119, 44, 1);
  }
</style>
