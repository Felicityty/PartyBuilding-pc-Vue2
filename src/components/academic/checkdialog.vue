<template>
  <div>
    <el-dialog title="查看" :visible.sync="checkFormVisible" width="35%" @close="handleClose">
      <el-form ref="checkFormRef" :model="form" label-position="right" label-width="35%">
        <el-form-item label="姓名:">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.userName }}</el-tag>
        </el-form-item>
        <el-form-item label="支部名称:" prop="partyBranchName">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.partyBranchName }}</el-tag>
        </el-form-item>
        <el-form-item label="班级名称:" prop="classGradeName">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.classGradeName }}</el-tag>
        </el-form-item>
        <el-form-item label="学业素质分:" prop="score">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.score }}</el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    checkForm: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  computed: {
    checkFormVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    form: {
      get() {
        return this.checkForm
      },
      set() {
        return
      }
    }
  },
  methods: {
    handleClose() {
      this.form = {}
    }
  }
}
</script>
