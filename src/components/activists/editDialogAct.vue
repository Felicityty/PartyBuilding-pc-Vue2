<template>
  <div>
    <el-dialog
      title="编辑积极分子"
      :visible.sync="visible"
      width="35%"
      @close="handleClose"
    >
      <el-form ref="editFormRef" :model="form" :rules="rules" label-width="38%">
        <el-form-item label="姓名" prop="activistName">
          <el-input v-model="form.activistName" style="width: 70%" />
        </el-form-item>
        <el-form-item label="支部名称" prop="partyBranchName">
          <el-select v-model="form.partyBranchName" placeholder="支部名称" style="width: 70%" @change="currStationChange">
            <el-option
              v-for="item in branchOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="classGradeName">
          <el-select v-model="form.classGradeName" placeholder="班级名称" style="width: 70%">
            <template v-for="item in classOptionsChooseOptions[form.partyBranchName]">
              <el-option :key="item.value" :label="item.label" :value="item.label" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="确定积极分子时间" prop="confirmDate">
          <el-date-picker
            v-model="form.confirmDate"
            type="date"
            placeholder="选择日期"
            style="width: 70%"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm('editFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editActivistInfoById } from '@/api/activist'
import { currStationChange } from '@/utils/currStationChange'
export default {
  props: {
    dialogvisible: {
      type: Boolean,
      required: true
    },
    actform: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 将common里面的常用的语句挂载到全局，在main.js里引入，然后，就可以通过window拿到common里面的数据
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      rules: {
        activistName: [{ required: true, message: '请输入积极分子姓名', trigger: 'blur' }],
        partyBranchName: [{ required: true, message: '请选择支部', trigger: 'change' }],
        classGradeName: [{ required: true, message: '请选择班级', trigger: 'change' }],
        confirmDate: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  computed: {
    form: {
      get() {
        return this.actform
      },
      set() {
        return
      }
    },
    visible: {
      get() {
        return this.dialogvisible
      },
      set() {
        return this.$emit('change')
      }
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
    handleConfirm(formName) {
      this.loading = true
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await editActivistInfoById(this.form).then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$emit('change')
              this.$emit('fetchData')
            }
          })
        } else {
          this.$message.error('请填写必填项！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
