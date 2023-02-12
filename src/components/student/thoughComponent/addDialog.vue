<template>
  <el-dialog title="上传思想汇报" :visible.sync="visible" class="showAll_dialog" width="40%" @close="handleAfterClose" @open="handleOpen">
    <!-- 内容主体区域 -->
    <el-form ref="AddFormRef" label-width="30%" :model="queryInfo" :rules="rules" label-position="right">
      <el-form-item label="姓名:" prop="userName">
        <el-input v-model="queryInfo.userName" placeholder="请输入" type="text" style="width: 70%" />
      </el-form-item>
      <el-form-item label="支部名称:" prop="partyBranchName">
        <el-select v-model="queryInfo.partyBranchName" placeholder="请选择" style="width: 70%" @change="currStationChangeUserAdd">
          <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称:" prop="classGradeName">
        <el-select v-model="queryInfo.classGradeName" placeholder="请选择" style="width: 70%">
          <template v-for="item in classOptionsChooseOptions[queryInfo.partyBranchName]">
            <el-option :key="item.value" :label="item.label" :value="item.label" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="附件" prop="fileNa">
        <AddPayload ref="addpayload" @afterAddPayload="afterAddPayload" @afterRemovePayload="afterRemovePayload" />
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="confirmAdd()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getInfo } from '@/api/user'
import { getThoughtList } from '@/api/student'
import { addThoughtList, editThoughtList } from '@/api/student.js'
import { currStationChangeUserAdd } from '@/utils/currStationChange'
import AddPayload from '@/components/student/thoughComponent/addPay.vue'
export default {
  components: {
    AddPayload
  },
  props: {
    addDialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      rules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        classGradeName: [{ required: true, message: '请选择班级', trigger: 'change' }],
        partyBranchName: [{ required: true, message: '请选择支部', trigger: 'change' }],
        fileNa: [{ required: true, message: '请上传附件', trigger: 'blur' }]
      },
      exist: 0,
      loading: false,
      page: {
        pageNum: 0,
        pageSize: 0,
        stuNo: ''
      },
      queryInfo: {
        userName: '',
        stuNo: '',
        haveTalk: 0,
        partyBranchName: '',
        classGradeName: '',
        fileNa: '',
        filePa: '',
        fileName: '',
        filePath: ''
      },
      fileName: '',
      filePath: ''
    }
  },
  computed: {
    visible: {
      get() {
        return this.addDialogVisible
      },
      set(val) {
        this.$emit('update:addDialogVisible', val)
      }
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    currStationChangeUserAdd,

    async get() {
      try {
        const { data } = await getInfo()
        this.queryInfo.stuNo = data.userName
        this.page.stuNo = data.userName
        this.queryInfo.userName = data.screenName
        this.queryInfo.partyBranchName = data.branch
        this.queryInfo.classGradeName = data.classGrade
      } catch (error) {
        return new Error(error)
      }
      getThoughtList({ ...this.page }).then(res => {
        const row = res.rows
        if (res.total) {
          this.exist = 1
          this.queryInfo.haveTalk = row[0].haveTalk
          this.queryInfo.fileName = row[0].fileName
          this.queryInfo.filePath = row[0].filePath
          this.queryInfo.ideologicalQualityId = row[0].ideologicalQualityId
        }
      }).catch(error => {
        return new Error(error)
      })
    },
    handleOpen() {
      this.exist = 0
      this.get()
    },
    handleAfterClose() {
      this.$nextTick(() => {
        this.$refs.AddFormRef.resetFields()
        this.$refs.addpayload.cleanFileList()
        this.queryInfo = {
          userName: '',
          stuNo: '',
          haveTalk: 0,
          partyBranchName: '',
          classGradeName: '',
          fileNa: '',
          filePa: '',
          fileName: '',
          filePath: ''
        }
      })
    },
    confirmAdd() {
      this.$refs.AddFormRef.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.exist === 0) {
            this.queryInfo.fileName = this.queryInfo.fileNa
            this.queryInfo.filePath = this.queryInfo.filePa
            this.queryInfo.submitDate = new Date().format('yyyy-MM-dd HH:mm:ss')
            addThoughtList(this.queryInfo).then((res) => {
              this.loading = false
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$emit('fetchAllData')
                this.visible = false
              }
            })
          } else {
            this.queryInfo.fileName = this.queryInfo.fileName + ',' + this.queryInfo.fileNa
            this.queryInfo.filePath = this.queryInfo.filePath + ',' + this.queryInfo.filePa
            this.queryInfo.submitDate = new Date().format('yyyy-MM-dd HH:mm:ss')
            editThoughtList(this.queryInfo).then((res) => {
              this.loading = false
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.$emit('fetchAllData')
                this.visible = false
              }
            })
          }
        } else {
          this.$message.error('请填写必填项！')
          return false
        }
      })
    },

    // 添加附件后的回调
    afterAddPayload(fileParams) {
      const filepath = fileParams.data.filename.split('/')
      const filename = fileParams.data.fileOriginalName
      if (this.queryInfo.fileNa.length === 0) {
        this.queryInfo.fileNa = this.queryInfo.fileNa + filepath[3] + ','
        this.queryInfo.filePa = this.queryInfo.filePa + filename + ','
      } else {
        this.queryInfo.fileNa = this.queryInfo.fileNa + ',' + filepath[3] + ','
        this.queryInfo.filePa = this.queryInfo.filePa + ',' + filename + ','
      }
      this.queryInfo.fileNa = this.queryInfo.fileNa.substring(0, this.queryInfo.fileNa.length - 1)
      this.queryInfo.filePa = this.queryInfo.filePa.substring(0, this.queryInfo.filePa.length - 1)
      const field = this.$refs.AddFormRef.fields
      field.map(item => {
        if (item.prop === 'fileNa') {
          item.clearValidate()
        }
      })
    },

    // 移除附件后的回调  fileParams是删除某个文件后剩下文件组成的数组
    afterRemovePayload(fileParams) {
      let filenameList = ''
      let originFilenameList = ''
      if (fileParams.length !== 0) {
        fileParams.map((item) => {
          filenameList = filenameList + item.response.filename.split('/')[3] + ','
          originFilenameList = originFilenameList + item.response.fileOriginalName + ','
        })
        filenameList = filenameList.substring(0, filenameList.length - 1)
        originFilenameList = originFilenameList.substring(0, originFilenameList.length - 1)
        this.queryInfo.fileNa = filenameList
        this.queryInfo.filePa = originFilenameList
      } else {
        this.queryInfo.fileNa = filenameList
        this.queryInfo.filePa = originFilenameList
      }
    }
  }
}
</script>

<style>
</style>
