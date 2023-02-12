<template>
  <div>
    <el-dialog title="编辑" :visible.sync="editFormVisible" width="35%" @close="handleClose">
      <el-form ref="editFormRef" :model="editForm" :rules="editRules" label-width="35%">
        <el-form-item label="班级名称:" prop="classGradeName">
          <el-input v-model="editForm.classGradeName" style="width: 70%" />
        </el-form-item>
        <el-form-item label="班主任:" prop="classGradeLeader">
          <el-input v-model="editForm.classGradeLeader" style="width: 70%" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editClassList } from '@/api/class'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      statusGroup: window.$constant.statusGroup,
      rules: {},
      loading: false,
      editRules: {
        classGradeName: [{ required: true, message: '请填写班级', trigger: 'blur' }],
        classGradeLeader: [{ required: true, message: '请填写班主任', trigger: 'blur' }]
      }
    }
  },
  computed: {
    editFormVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    editForm: {
      get() {
        return this.form
      },
      set() {
        return
      }
    }
  },
  methods: {
    // 关闭对话框回调
    handleClose() {
      this.editForm = {}
      this.$refs.editFormRef.resetFields()
    },
    // 确认编辑回调
    handleConfirm() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return
        this.loading = true
        this.editForm.status = this.editForm.status === '启用' ? 'ENABLED' : 'DISABLED'
        editClassList(this.editForm).then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.editFormVisible = false
            this.$emit('fetchAllData')
          }
        })
      })
    }
  }
}
</script>
