<template>
  <div>
    <el-dialog
      title="编辑组织"
      :visible.sync="visible"
      width="30%"
      @close="handleClose"
    >
      <el-form ref="editFormRef" :model="form" :rules="rules" label-width="38%">
        <el-form-item label="支部名称:" prop="partyBranchName">
          <el-select v-model="form.partyBranchName" placeholder="支部名称" style="width: 70%">
            <el-option
              v-for="item in branchOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支部书记:" prop="partyBranchLeader">
          <el-input v-model="form.partyBranchLeader" style="width: 70%" />
        </el-form-item>
        <!-- <el-form-item label="状态:" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="item in statusGroup" :key="item.value" :value="item.value" :label="item.label" @change="radioChange" />
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm('editFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { confirmEdit } from '@/api/organ'
export default {
  props: {
    dialogvisible: {
      type: Boolean,
      required: true
    },
    organform: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 将common里面的常用的语句挂载到全局，在main.js里引入，然后，就可以通过window拿到common里面的数据
      branchOptionsChoose: window.$constant.branchOptions,
      rules: {
        partyBranchName: [{ required: true, message: '请选择支部名称', trigger: 'change' }],
        partyBranchLeader: [{ required: true, message: '请输入支部书记姓名', trigger: 'blur' }]
      },
      loading: false
    }
  },
  computed: {
    form: {
      get() {
        return this.organform
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
    // 关闭对话框回调
    handleClose() {
      this.form = {}
      this.$refs.editFormRef.resetFields()
    },
    // 确认编辑回调
    handleConfirm(formName) {
      // this.loading = true
      // editActivistInfoById(this.form).then((res) => {
      //   this.loading = false
      //   if (res.code === 200) {
      //     this.$message.success(res.msg)
      //     this.$emit('change')
      //     this.$emit('fetchData')
      //   }
      // })

      this.loading = true
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await confirmEdit(this.form).then((res) => {
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
    },
    radioChange() {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
