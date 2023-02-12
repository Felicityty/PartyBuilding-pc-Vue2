<template>
  <el-dialog title="编辑" :visible.sync="dialogVisible" width="35%" @close="handleClose()">
    <!-- 内容主体区域 -->
    <el-form ref="EditFormRef" :model="form" :rules="editRules" label-position="right" label-width="35%">
      <el-form-item label="姓名:" prop="userName">
        <el-input v-model="form.userName" style="width: 70%" />
      </el-form-item>
      <el-form-item label="支部名称:" prop="partyBranchName">
        <el-select v-model="form.partyBranchName" placeholder="支部名称" style="width: 70%" @change="currStationChange">
          <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称:" prop="classGradeName">
        <el-select v-model="form.classGradeName" placeholder="班级名称" style="width: 70%">
          <template v-for="item in classOptionsChooseOptions[form.partyBranchName]">
            <el-option :key="item.value" :label="item.label" :value="item.label" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="得分:" prop="score">
        <el-input v-model="form.score" style="width: 70%" />
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  editThoughtList
} from '@/api/Thought.js'
export default {
  props: {
    editDialogVisible: {
      type: Boolean,
      required: true
    },
    editForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      editRules: {
        userName: [{
          required: true,
          message: '请填写姓名',
          trigger: 'blur'
        }],
        partyBranchName: [{
          required: true,
          message: '请选择支部',
          trigger: 'blur'
        }],
        classGradeName: [{
          required: true,
          message: '请选择班级',
          trigger: 'blur'
        }],
        score: [{
          required: true,
          message: '请填写得分',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    form: {
      get() {
        return this.editForm
      },
      set() {
        return
      }
    },
    dialogVisible: {
      get() {
        return this.editDialogVisible
      },
      set() {
        return this.$emit('change')
      }
    }
  },
  methods: {
    // 关闭对话框 同时清空form的内容
    handleClose() {
      this.form = {}
    },
    // 选择其他支部后 班级自动变化
    currStationChange() {
      this.form.classGradeName = this.classOptionsChooseOptions[this.form.partyBranchName][1].label
    },
    // 确认编辑回调
    handleConfirm() {
      this.$refs.EditFormRef.validate((valid) => {
        if (!valid) return
        this.loading = true
        editThoughtList(this.form).then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success(res.msg)
            // 发送回去再fetch一下 重新再刷新一遍页面 并关闭对话框
            this.$emit('fetchAllData')
            this.$emit('change')
          }
        })
      })
    }
  }
}
</script>

<style>
</style>
