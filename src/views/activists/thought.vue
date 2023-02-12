<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- tabs切换 -->
      <el-tabs v-model="thoughtName">
        <el-tab-pane label="思想汇报" name="first">

          <!-- 列表区域 -->
          <Ideology ref="ideology" @fetchAllData="handleSearch(0)" />

        </el-tab-pane>

        <!-- 谈话考察 -->

        <el-tab-pane label="谈话考察" name="second">
          <!-- 列表区域 -->
          <Conversation ref="conversation" @fetchAllData="handleSearch(1)" />

        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import Ideology from '@/components/thought/ideology/ideology.vue'
import Conversation from '@/components/thought/conversation/conversation.vue'
export default {
  components: {
    Ideology,
    Conversation
  },
  data() {
    return {
      thoughtName: 'first'
    }
  },
  created() {
    this.constant.getOptions()
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleSearch(id, clearSelection) {
      // 通过ref直接去调用子组件的函数
      if (!id) {
        this.$refs.ideology.fetchData(this.queryInfo, clearSelection)
        console.log(11)
      } else {
        this.$refs.conversation.fetchData(this.queryInfo, clearSelection)
        console.log(22)
      }
    }
  }
}
</script>

<style>
</style>
