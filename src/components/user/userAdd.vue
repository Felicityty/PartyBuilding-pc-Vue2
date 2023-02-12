<template>
  <div>
    <el-button type="primary" icon="el-icon-circle-plus-outline" class="el-button-io" :disabled="roleLimit" @click="handleAdd">新增</el-button>

    <el-dialog title="新增" :visible.sync="addFormVisible" width="35%" @close="handleClose">
      <el-form ref="addFormRef" :model="form" :rules="addRules" label-position="right" label-width="35%">
        <el-form-item label="姓名:" prop="screenName">
          <el-input v-model="form.screenName" placeholder="请输入姓名" style="width: 70%" />
        </el-form-item>
        <el-form-item label="学号/工号:" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入学号/工号" style="width: 70%" />
        </el-form-item>
        <el-form-item label="角色:" prop="role">
          <el-select v-model="form.role" placeholder="请选择" style="width: 70%" @change="currChange">
            <template v-for="item in roleOption">
              <el-option :key="item.value" :label="item.label" :value="item.value" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择" style="width: 70%">
            <template v-for="item in sexOptions">
              <el-option :key="item.value" :label="item.label" :value="item.value" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item v-show="stuShow" label="支部名称:" :prop="stuShow ? 'branch': 'branchReq'">
          <el-select v-model="form.branch" placeholder="请选择" style="width: 70%" @change="currStationUserEdit">
            <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="stuShow" label="班级名称:" :prop="stuShow ? 'classGrade': 'classGradeReq'">
          <el-select v-model="form.classGrade" placeholder="请选择" style="width: 70%">
            <template v-for="item in classOptionsChoose">
              <el-option :key="item.value" :label="item.label" :value="item.label" />
            </template>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" style="width: 70%" />
        </el-form-item> -->

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { currStationUserEdit } from '@/utils/currStationChange'
import { addUserList, addManageList } from '@/api/UserManage'
export default {
  props: {
    roleLimit: {
      type: Boolean,
      required: false,
      default: false
    },
    user: {
      type: String,
      default: 'first'
    }
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      roleOptions: window.$constant.roleOptions,
      roleStuOptions: window.$constant.roleStuOptions,
      sexOptions: window.$constant.sexOptions,
      loading: false,
      form: {},
      stuShow: false,
      addRules: {
        screenName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入学号/工号', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        branch: [{ required: true, message: '请选择支部名称', trigger: 'blur' }],
        branchReq: [{ required: false, message: '请选择支部名称', trigger: 'blur' }],
        classGrade: [{ required: true, message: '请选择班级名称', trigger: 'blur' }],
        classGradeReq: [{ required: false, message: '请选择班级名称', trigger: 'blur' }]
        // password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      addFormVisible: false
    }
  },
  computed: {
    classOptionsChoose() {
      return this.classOptionsChooseOptions[this.form.branch]
    },
    roleOption() {
      if (this.user === 'first') return this.roleOptions
      else return this.roleStuOptions
    }
  },
  methods: {
    currStationUserEdit,
    currChange(val) {
      console.log('currStationChange', val)
      if (val === 'STUDENT') {
        this.stuShow = true
      } else this.stuShow = false
    },
    // 关闭对话框回调
    handleClose() {
      this.stuShow = false
      this.form = {}
      this.$refs.addFormRef.resetFields()
    },
    // 确认新增回调
    handleConfirm() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return
        this.loading = true
        console.log(this.form)
        if (this.form.role === 'STUDENT') {
          addUserList(this.form).then((res) => {
            this.loading = false
            this.$message.success(res.msg)
            this.addFormVisible = false
            this.$emit('fetchAllData')
          })
        } else {
          addManageList(this.form).then((res) => {
            this.loading = false
            this.$message.success(res.msg)
            this.addFormVisible = false
            this.$emit('fetchAllData')
          })
        }
        this.$emit('fetchAllData')
      })
    },
    // 新增数据
    handleAdd() {
      this.addFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
