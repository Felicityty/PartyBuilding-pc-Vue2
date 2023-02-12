<template>
  <el-dialog title="编辑" :visible.sync="visible" class="showAll_dialog" width="40%" :before-close="handleClose">
    <!-- 内容主体区域 -->
    <el-form ref="EditFormRef" :model="editList" :rules="EditRules" label-position="right" label-width="30%">
      <el-form-item label="姓名:" prop="userName">
        <el-input v-model="editList.userName" style="width: 70%" />
      </el-form-item>
      <el-form-item label="支部名称:" prop="partyBranchName">
        <el-select v-model="editList.partyBranchName" placeholder="请选择" style="width: 70%" @change="currStationChangeEdit">
          <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称:" prop="classGradeName">
        <el-select v-model="editList.classGradeName" placeholder="班级名称" style="width: 70%">
          <template v-for="item in classOptionsChooseOptions[editList.partyBranchName]">
            <el-option :key="item.value" :label="item.label" :value="item.label" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="附件:" prop="fileName">
        <AddPayload
          ref="addPayload"
          :file-name="editList.fileName"
          :file-path="editList.filePath"
          @afterAddPayload="afterAddPayload"
          @afterRemovePayload="afterRemovePayload"
        />
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="handleConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { currStationChangeEdit } from '@/utils/currStationChange'
import { editThoughtList } from '@/api/student.js'
import AddPayload from '@/components/student/thoughComponent/addPay.vue'
export default {
  components: {
    AddPayload
  },
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true
    },
    editDialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      editList: {},
      loading: false,
      EditRules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        partyBranchName: [{ required: true, message: '请选择支部', trigger: 'blur' }],
        classGradeName: [{ required: true, message: '请选择班级', trigger: 'blur' }],
        // filePath: [
        //   { required: true, message: '请输入文件名', trigger: 'blur' }
        // ],
        fileName: [{ required: true, message: '请上传附件', trigger: 'blur' }]
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.editDialogVisible
      },
      set() {
        return this.$emit('change')
      }
    }
  },
  watch: {
    form: {
      handler(newData) {
        this.editList = newData
        this.$forceUpdate()
        console.log('监听数据改变', this.editList)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    currStationChangeEdit,
    // 关闭对话框 同时清空editList的内容
    handleClose(done) {
      this.editList = {}
      done()
    },
    // 确认编辑回调
    handleConfirm() {
      this.$refs.EditFormRef.validate((valid) => {
        if (!valid) return
        this.loading = true
        console.log('找这个人editList', this.editList)
        editThoughtList(this.editList).then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$emit('fetchAllData')
            this.$emit('change')
          }
        })
      })
    },
    // 添加附件后的回调
    afterAddPayload(fileParams) {
      console.log(fileParams)
      const filepath = fileParams.data.filename.split('/')
      const filename = fileParams.data.fileOriginalName
      if (this.editList.fileName === '') {
        this.editList.fileName = null
        this.editList.filePath = null
      }
      if (this.editList.fileName === null) {
        this.editList.fileName = filepath[3] + ','
        this.editList.filePath = filename + ','
      } else {
        this.editList.fileName += ',' + filepath[3] + ',' // 只取返回的fileName里面的最后一段文件名
        this.editList.filePath += ',' + filename + ','
      }
      this.editList.fileName = this.editList.fileName.substring(0, this.editList.fileName.length - 1)
      this.editList.filePath = this.editList.filePath.substring(0, this.editList.filePath.length - 1)
    },

    // 移除附件后的回调
    afterRemovePayload(fileParams) {
      console.log('fileParams', fileParams)
      let filenameList = ''
      let originFilenameList = ''
      if (fileParams !== null) {
        fileParams.map((item) => {
          console.log(item)
          filenameList = filenameList + item.url + ','
          originFilenameList = originFilenameList + item.name + ','
        })
        filenameList = filenameList.substring(0, filenameList.length - 1)
        originFilenameList = originFilenameList.substring(0, originFilenameList.length - 1)
        this.editList.fileName = filenameList
        this.editList.filePath = originFilenameList
      }
      this.editList.fileName = filenameList
      this.editList.filePath = originFilenameList
    }
  }
}
</script>

<style></style>
