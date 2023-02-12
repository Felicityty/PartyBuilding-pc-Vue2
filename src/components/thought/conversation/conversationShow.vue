<template>
  <el-dialog title="查看" :visible.sync="dialogVisible" width="35%" @close="handleClose()">
    <!-- 内容主体区域 -->
    <el-form label-width="40%" :model="form">
      <el-form-item label="姓名:">
        <el-input v-model="form.userName" disabled type="text" style="width: 70%" />
      </el-form-item>
      <el-form-item label="支部名称:">
        <el-input v-model="form.partyBranchName" disabled type="text" style="width: 70%" />
      </el-form-item>
      <el-form-item label="班级名称:">
        <el-input v-model="form.classGradeName" disabled type="text" style="width: 70%" />
      </el-form-item>
      <el-form-item label="得分:">
        <el-input v-model="form.score" disabled type="text" style="width: 70%" />
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialogVisible: {
      type: Boolean,
      required: true
    },
    showForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    form: {
      get() {
        return this.showForm
      },
      set() {
        return
      }
    },
    dialogVisible: {
      get() {
        return this.showDialogVisible
      },
      set() {
        return this.$emit('change')
      }
    }
  },
  methods: {
    // 关闭对话框回调
    handleClose() {
      this.form = {}
    }
  }
}

</script>

<style>
</style>
