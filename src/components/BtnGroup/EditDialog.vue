<template>
  <el-dialog
    class="showAll_dialog"
    title="编辑"
    :visible.sync="visible"
    width="40%"
    :before-close="handleBeforeClose"
    @close="handleAfterClose"
  >
    <!-- 内容主体区域 -->
    <el-form ref="EditFormRef" :model="editList" :rules="EditRules" label-width="25%">
      <el-form-item label="姓名:" prop="userName">
        <el-input v-model="editList.userName" style="width: 60%" />
      </el-form-item>
      <el-form-item label="学号:" prop="userName">
        <el-input v-model="editList.stuNo" style="width: 60%" />
      </el-form-item>
      <el-form-item label="支部名称:" prop="partyBranchName">
        <el-select
          v-model="editList.partyBranchName"
          placeholder="请选择"
          style="width: 60%"
          @change="currStationChangeEdit"
        >
          <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称:" prop="classGradeName">
        <el-select v-model="editList.classGradeName" placeholder="班级名称" style="width: 60%">
          <template v-for="item in classOptionsChooseOptions[editList.partyBranchName]">
            <el-option :key="item.value" :label="item.label" :value="item.label" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="contentList">
        <div v-for="(item, index) in editList.contentList" :key="index">
          <el-input
            v-model="item.contentItem"
            placeholder="请输入"
            type="text"
            style="width: 60%"
            class="wth_250 mr-top-5"
          />
          <el-input v-model="item.score" placeholder="得分" type="number" class="wth_60 mr-left-5 mr-top-5" @input="handleScoreChange" />
          <el-button
            v-if="editList.contentList.length === index + 1"
            type="primary"
            icon="el-icon-plus"
            circle
            class="el-button-io mr-left-5"
            size="mini"
            @click="addeditFile"
          />
          <el-button
            v-if="item.contentItem !== '' || item.score !== ''"
            type="primary"
            icon="el-icon-minus"
            circle
            class="el-button-delete-search mr-left-5"
            size="mini"
            @click="deleteeditFile(index)"
          />
        </div>
      </el-form-item>
      <el-form-item label="总分:" prop="score">
        <el-input v-model="editList.score" style="width: 60%" />
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
      <el-button type="primary" :loading="loading" @click="handleConfirm('EditFormRef')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { currStationChangeEdit } from '@/utils/currStationChange'
import { editList } from '@/api/file.js'
import AddPayload from '@/components/BtnGroup/AddPayload.vue'
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
    var checkContent = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('内容不能为空'))
      }
      for (let i = 0; i < value.length; i++) {
        if (!value[i].contentItem || !value[i].score) {
          return callback(new Error('请输入完整'))
        }
      }
      callback()
    }
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      editList: {},
      EditRules: {
        userName: [{
          required: true,
          message: '请输入姓名',
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
        contentList: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        },
        {
          validator: checkContent,
          trigger: 'blur'
        }
        ],
        score: [{
          required: true,
          message: '请输入总分',
          trigger: 'blur'
        }],
        fileName: [{
          required: true,
          message: '请上传附件',
          trigger: 'blur'
        }]
      },
      loading: false
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

    // 处理分数改变计算总分
    handleScoreChange() {
      let score = 0
      this.editList.contentList.map(item => {
        const itemscore = item.score * 1
        score = score + itemscore
      })
      this.editList.score = score
    },

    // 在对话框关闭前做处理
    handleBeforeClose(done) {
      this.$nextTick(() => {
        this.$refs.EditFormRef.resetFields()
        // this.$refs.addPayload.cleanFileList()
        this.editList = {
          category: this.category - 0,
          userName: '',
          partyBranchName: '',
          classGradeName: '',
          contentList: [{
            contentItem: '',
            score: ''
          }],
          score: null,
          fileName: '',
          filePath: ''
        }
      })
      console.log(this.editList)
      done(true)
    },
    handleAfterClose() {
      this.$nextTick(() => {
        this.$refs.EditFormRef.resetFields()
        // this.$refs.addPayload.cleanFileList()
        this.editList = {
          category: this.category - 0,
          userName: '',
          partyBranchName: '',
          classGradeName: '',
          contentList: [{
            contentItem: '',
            score: ''
          }],
          score: null,
          fileName: '',
          filePath: ''
        }
      })
    },
    // 确认编辑回调
    handleConfirm(ref) {
      this.$refs[ref].validate(async(valid) => {
        console.log(valid)
        if (valid) {
          this.loading = true
          // console.log(this.editList)
          editList(this.editList).then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.$message.success(res.msg)
              // 发送回去再fetch一下 重新再刷新一遍页面 并关闭对话框
              this.$emit('fetchAllData')
              this.$emit('change')
            }
          })
        } else {
          this.$message.error('请填写必填项！')
          return false
        }
      })
    },
    addeditFile() {
      let err = ''
      this.$refs.EditFormRef.validateField('contentList', errorMsg => {
        err = errorMsg
      })
      if (err !== '请输入完整') {
        this.editList.contentList.push({
          contentItem: '',
          score: ''
        })
      }
    },
    deleteeditFile(index) {
      if (this.editList.contentList.length <= 1) {
        this.editList.contentList = [{
          content: '',
          score: ''
        }]
        this.handleScoreChange()
        const field = this.$refs.EditFormRef.fields
        field.map(item => {
          if (item.prop === 'contentList') {
            item.clearValidate()
          }
        })
        return
      }
      this.editList.contentList.splice(index, 1)
      this.handleScoreChange()
      const field = this.$refs.EditFormRef.fields
      field.map(item => {
        if (item.prop === 'contentList') {
          item.clearValidate()
        }
      })
    },
    // 添加附件后的回调
    afterAddPayload(fileParams) {
      console.log(fileParams)
      // console.log('fileName', this.editList.fileName)
      // console.log('filePath', this.editList.filePath)
      const filepath = fileParams.data.filename.split('/')
      const filename = fileParams.data.fileOriginalName
      console.log(filepath[3])
      if (this.editList.fileName === '') {
        this.editList.fileName = null
        this.editList.filePath = null
      }
      if (this.editList.fileName === null) {
        this.editList.fileName = filepath[3] + ','
        this.editList.filePath = filename + ','
        // console.log('fileName0', this.editList.fileName)
        // console.log('filePath0', this.editList.filePath)
      } else {
        this.editList.fileName += ',' + filepath[3] + ',' // 只取返回的fileName里面的最后一段文件名
        this.editList.filePath += ',' + filename + ','
        // console.log('fileName1', this.editList.fileName)
        // console.log('filePath1', this.editList.filePath)
      }
      this.editList.fileName = this.editList.fileName.substring(0, this.editList.fileName.length - 1)
      this.editList.filePath = this.editList.filePath.substring(0, this.editList.filePath.length - 1)
      // console.log(this.editList.fileName)
      // console.log(this.editList.filePath)
      const field = this.$refs.EditFormRef.fields
      field.map(item => {
        if (item.prop === 'fileName') {
          item.clearValidate()
        }
      })
    },

    // 移除附件后的回调
    afterRemovePayload(fileParams) {
      // console.log('fileParams', fileParams)
      let filenameList = ''
      let originFilenameList = ''
      if (fileParams !== null) {
        fileParams.map((item) => {
          // console.log(item)
          filenameList = filenameList + item.url + ','
          originFilenameList = originFilenameList + item.name + ','
        })
        // console.log('filenameList', filenameList)
        filenameList = filenameList.substring(0, filenameList.length - 1)
        originFilenameList = originFilenameList.substring(0, originFilenameList.length - 1)
        // console.log(originFilenameList)
        this.editList.fileName = filenameList
        this.editList.filePath = originFilenameList
      }
      this.editList.fileName = filenameList
      this.editList.filePath = originFilenameList
      // console.log('fileName', this.editList.fileName)
      // console.log('filePath', this.editList.filePath)
    }
  }
}
</script>

<style></style>
