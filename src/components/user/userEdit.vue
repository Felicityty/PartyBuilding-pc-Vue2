<template>
  <div>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" width="35%" @close="handleClose">
      <el-form ref="editFormRef" :model="form" :rules="editRules" label-position="right" label-width="35%">
        <el-form-item label="姓名:" prop="screenName">
          <el-input v-model="form.screenName" placeholder="请输入姓名" style="width: 70%" disabled />
        </el-form-item>
        <el-form-item label="学号/工号:" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入学号/工号" style="width: 70%" disabled />
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
        <el-form-item v-if="stuShow" label="支部名称:" :prop="stuShow ? 'branch': 'branchReq'">
          <el-select v-model="form.branch" placeholder="请选择" style="width: 70%" @change="currStationUserEdit">
            <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="stuShow" label="班级名称:" :prop="stuShow ? 'classGrade': 'classGradeReq'">
          <el-select v-model="form.classGrade" placeholder="请选择" style="width: 70%">
            <template v-for="item in classOptionsChoose">
              <el-option :key="item.value" :label="item.label" :value="item.label" />
            </template>
          </el-select>
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
import { editManageList, editUserList } from '@/api/UserManage'
import { currStationUserEdit } from '@/utils/currStationChange'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editForm: {
      type: Object,
      default: null
    },
    selectnum: {
      type: Number,
      default: 2
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
      stuShow: false,
      editRules: {
        screenName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入学号/工号', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        branch: [{ required: true, message: '请选择支部名称', trigger: 'blur' }],
        branchReq: [{ required: false, message: '请选择支部名称', trigger: 'blur' }],
        classGrade: [{ required: true, message: '请选择班级名称', trigger: 'blur' }],
        classGradeReq: [{ required: false, message: '请选择班级名称', trigger: 'blur' }]
        // password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
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
    form: {
      get() {
        return this.editForm
      },
      set() {
        return
      }
    },
    classOptionsChoose() {
      return this.classOptionsChooseOptions[this.form.branch]
    },
    roleOption() {
      if (this.selectnum === 1) return this.roleStuOptions
      else return this.roleOptions
    }
  },
  watch: {
    form: {
      handler(newPath) {
        console.log(this.stuShow)
        if (this.form.role === 'STUDENT') {
          this.stuShow = true
        } else this.stuShow = false
      },
      immediate: true
    }
  },
  methods: {
    currStationUserEdit,
    // 关闭对话框回调
    handleClose() {
      this.form = {}
      this.$refs.editFormRef.resetFields()
    },
    currChange(val) {
      console.log('currStationChange', val)
      if (val === 'STUDENT') {
        this.stuShow = true
      } else this.stuShow = false
    },
    // 确认编辑回调
    handleConfirm() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return
        this.loading = true
        // this.form.role = this.form.userRoleList[0]
        console.log('editform', this.form)
        if (this.form.role === 'STUDENT') {
          editUserList(this.form).then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$emit('fetchAllData')
              this.editFormVisible = false
            }
          })
        } else {
          editManageList(this.form).then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$emit('fetchAllData')
              this.editFormVisible = false
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
