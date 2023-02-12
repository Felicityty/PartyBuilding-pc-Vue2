<template>
  <div>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" width="35%" @close="handleClose">
      <el-form ref="editFormRef" :model="form" :rules="editRules" label-position="right" label-width="35%">
        <el-form-item label="姓名:" prop="userName">
          <el-input v-model="form.userName" type="text" placeholder="请输入" style="width: 70%" />
        </el-form-item>
        <el-form-item label="支部名称:" prop="partyBranchName">
          <el-select v-model="form.partyBranchName" placeholder="请选择" style="width: 70%" @change="currStationChange">
            <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称:" prop="classGradeName">
          <el-select v-model="form.classGradeName" placeholder="请选择" style="width: 70%">
            <template v-for="item in classOptionsChoose">
              <el-option :key="item.value" :label="item.label" :value="item.label" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="学业素质分:" prop="score">
          <el-input v-model="form.score" type="text" placeholder="请输入" style="width: 70%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editAcademicList } from '@/api/academic'
import { currStationChange } from '@/utils/currStationChange'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editForm: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      loading: false,
      editRules: {
        userName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        partyBranchName: [{ required: true, message: '请选择支部', trigger: 'blur' }],
        classGradeName: [{ required: true, message: '请选择班级', trigger: 'blur' }],
        score: [{ required: true, message: '请填写学业素质分', trigger: 'blur' }] }
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
    form: {
      get() {
        return this.editForm
      },
      set() {
        return
      }
    },
    classOptionsChoose() {
      return this.classOptionsChooseOptions[this.form.partyBranchName]
    }
  },
  methods: {
    currStationChange,
    // 关闭对话框回调
    handleClose() {
      this.form = {}
      this.$refs.editFormRef.resetFields()
    },
    // 确认编辑回调
    handleConfirm() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return
        this.form.updatedBy = this.$store.state.user.name
        this.loading = true
        editAcademicList(this.form).then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$emit('fetchAllData')
            this.editFormVisible = false
          }
        })
      })
    }
  }
}
</script>
