<template>
  <div>
    <el-button slot="trigger" class="el-button-io" type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>

    <!-- 新增对话框 -->
    <el-dialog
      class="showAll_dialog"
      title="新增"
      :visible.sync="visible"
      width="43%"
      :before-close="handleBeforeClose"
      @close="handleAfterClose"
    >

      <el-form ref="addFormRef" :model="addForm" :rules="rules" label-width="22%">
        <el-form-item label="姓名:" prop="userName">
          <el-input v-model="addForm.userName" placeholder="请输入" style="width: 70%" disabled />
        </el-form-item>
        <el-form-item label="学号:" prop="stuNo">
          <el-input v-model="addForm.stuNo" placeholder="请输入" style="width: 70%" disabled />
        </el-form-item>
        <el-form-item label="支部名称:" prop="partyBranchName">
          <el-select v-model="addForm.partyBranchName" placeholder="请选择" style="width: 70%" disabled @change="currStationChangeAdd">
            <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称:" prop="classGradeName">
          <el-select v-model="addForm.classGradeName" placeholder="请选择" style="width: 70%" disabled>
            <template v-for="item in classOptionsChooseOptions[addForm.partyBranchName]">
              <el-option v-if="item.value !== 0" :key="item.value" :label="item.label" :value="item.label" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="新增类型:" prop="category">
          <el-select v-model="addForm.category" placeholder="请选择" style="width: 70%" @change="handleSelectChange">
            <template v-for="item in addNewTypeOptions">
              <el-option v-if="item.value !== 0" :key="item.value" :label="item.label" :value="item.value" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="内容:" prop="contentList">
          <div v-for="(item,index) in addForm.contentList" :key="index">
            <el-input v-model="item.contentItem" placeholder="请输入" type="text" style="width: 70%" />
            <el-input v-model="item.score" placeholder="得分" type="number" class="wth_60 mr-left-5 mr-top-5" @input="handleScoreChange" />
            <el-button v-if="addForm.contentList.length === index + 1" type="primary" icon="el-icon-plus" circle class="el-button-io mr-left-5" size="mini" @click="addAddNewContent" />
            <el-button v-if="item.contentItem !== '' || item.score !== ''" type="primary" icon="el-icon-minus" circle class="el-button-delete-search mr-left-5" size="mini" @click="addDeleteContent(index)" />
          </div>
        </el-form-item>
        <el-form-item label="总分:" prop="score">
          <el-input v-model="addForm.score" style="width: 70%" disabled />
        </el-form-item>
        <el-form-item label="附件:" prop="fileName">
          <AddPayload ref="addpayload" @afterAddPayload="afterAddPayload" @afterRemovePayload="afterRemovePayload" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('addFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findUser } from '@/api/student'
import { currStationChangeAdd } from '@/utils/currStationChange'
import AddPayload from '@/components/BtnGroup/AddPayload.vue'
export default {
  components: {
    AddPayload
  },
  props: {
    infoList: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    var addBtnCheckRule = (rule, value, callback) => {
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
      addNewTypeOptions: window.$constant.addNewTypeOptionChoose,

      visible: false,

      // 新增表单
      addForm: {
        category: '',
        userName: '',
        stuNo: '',
        partyBranchName: '',
        classGradeName: '',
        contentList: [
          {
            contentItem: '',
            score: ''
          }
        ],
        score: null,
        updatedBy: '',
        fileName: '',
        filePath: '' // filePath暂时不用它
      },

      // 新增对话框的表单验证
      rules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        stuNo: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        classGradeName: [{ required: true, message: '请选择班级', trigger: 'change' }],
        partyBranchName: [{ required: true, message: '请选择支部', trigger: 'change' }],
        category: [{ required: true, message: '请选择新增类型', trigger: 'change' }],
        contentList: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { validator: addBtnCheckRule, trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入总分', trigger: 'blur' }
        ],
        fileName: [{ required: true, message: '请上传附件', trigger: 'blur' }]
      },

      queryInfo: {
        pageNum: 1,
        pageSize: 1,
        category: '',
        stuNo: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {},
  methods: {
    currStationChangeAdd,

    handleAdd() {
      this.renderAddForm()
      this.visible = true
    },

    async handleSelectChange() {
      const stuNumber = this.infoList.userName
      console.log(stuNumber)
      const categoryNum = this.addForm.category
      console.log(stuNumber, categoryNum)
      this.queryInfo.stuNo = stuNumber
      this.queryInfo.category = categoryNum
      const res = await findUser(this.queryInfo)
      console.log(res)
      if (res.rows.length !== 0) {
        this.$message.info('您已添加该发展能力类型，请直接前往编辑!')
        this.visible = false
      }
    },

    renderAddForm() {
      console.log(this.infoList)
      const { screenName, branch, classGrade, userName } = this.infoList
      this.addForm.userName = screenName
      this.addForm.partyBranchName = branch
      this.addForm.classGradeName = classGrade
      this.addForm.stuNo = userName
      console.log(this.addForm)
    },

    // 处理分数改变计算总分
    handleScoreChange() {
      let score = 0
      this.addForm.contentList.map(item => {
        const itemscore = item.score * 1
        score = score + itemscore
      })
      this.addForm.score = score
    },

    // 在对话框关闭前做处理
    handleBeforeClose(done) {
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields()
        this.$refs.addpayload.cleanFileList()
        this.addForm = {
          category: '',
          userName: '',
          stuNo: '',
          partyBranchName: '',
          classGradeName: '',
          contentList: [
            {
              contentItem: '',
              score: ''
            }
          ],
          score: null,
          updatedBy: '',
          fileName: '',
          filePath: ''
        }
      })

      console.log(this.addForm)
      done(true)
    },
    handleAfterClose() {
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields()
        this.$refs.addpayload.cleanFileList()
        this.addForm = {
          category: '',
          userName: '',
          stuNo: '',
          partyBranchName: '',
          classGradeName: '',
          contentList: [
            {
              contentItem: '',
              score: ''
            }
          ],
          score: null,
          updatedBy: '',
          fileName: '',
          filePath: ''
        }
      })
      // this.$nextTick(() => {
      //   this.$refs.addFormRef.resetFields()
      //   this.$refs.addpayload.cleanFileList()
      // })
    },
    async confirmAdd(formName) {
      this.addForm.updatedBy = this.name
      console.log(this.addForm)
      this.$refs[formName].validate(async(valid) => {
        console.log(valid)
        if (valid) {
          console.log(111)
          await this.$emit('confirmAdd', this.addForm)
          this.visible = false
        } else {
          this.$message.error('请填写必填项！')
          return false
        }
      })
    },
    // 新增对话框里内容模块的按钮组 - 加号
    addAddNewContent() {
      let err = ''
      this.$refs.addFormRef.validateField('contentList', errorMsg => {
        err = errorMsg
      })
      if (err !== '请输入完整') {
        this.addForm.contentList.push({ contentItem: '', score: '' })
      }
    },

    // 新增对话框里内容模块的按钮组 - 减号
    addDeleteContent(index) {
      if (this.addForm.contentList.length <= 1) {
        this.addForm.contentList = [{ value: '', score: '' }]
        this.handleScoreChange()
        const field = this.$refs.addFormRef.fields
        field.map(item => {
          if (item.prop === 'contentList') {
            item.clearValidate()
          }
        })
        return
      }
      this.addForm.contentList.splice(index, 1)
      this.handleScoreChange()
      const field = this.$refs.addFormRef.fields
      field.map(item => {
        if (item.prop === 'contentList') {
          item.clearValidate()
        }
      })
    },

    // 添加附件后的回调
    afterAddPayload(fileParams) {
      console.log(fileParams)
      const filepath = fileParams.data.filename.split('/')
      const filename = fileParams.data.fileOriginalName
      console.log(filepath[3])
      if (this.addForm.fileName.length === 0) {
        this.addForm.fileName = this.addForm.fileName + filepath[3] + ',' // 只取返回的fileName里面的最后一段文件名
        this.addForm.filePath = this.addForm.filePath + filename + ','
      } else {
        this.addForm.fileName = this.addForm.fileName + ',' + filepath[3] + ',' // 只取返回的fileName里面的最后一段文件名
        this.addForm.filePath = this.addForm.filePath + ',' + filename + ','
      }
      this.addForm.fileName = this.addForm.fileName.substring(0, this.addForm.fileName.length - 1)
      this.addForm.filePath = this.addForm.filePath.substring(0, this.addForm.filePath.length - 1)
      console.log(this.addForm.fileName)
      console.log(this.addForm.filePath)
      const field = this.$refs.addFormRef.fields
      field.map(item => {
        if (item.prop === 'fileName') {
          item.clearValidate()
        }
      })
    },

    // 移除附件后的回调  fileParams是删除某个文件后剩下文件组成的数组
    afterRemovePayload(fileParams) {
      console.log(fileParams)
      let filenameList = ''
      let originFilenameList = ''
      if (fileParams.length !== 0) {
        fileParams.map((item) => {
          filenameList = filenameList + item.response.filename.split('/')[3] + ','
          originFilenameList = originFilenameList + item.name + ','
        })
        console.log(filenameList)
        filenameList = filenameList.substring(0, filenameList.length - 1)
        originFilenameList = originFilenameList.substring(0, originFilenameList.length - 1)
        console.log(originFilenameList)
        this.addForm.fileName = filenameList
        this.addForm.filePath = originFilenameList
      } else {
        this.addForm.fileName = filenameList
        this.addForm.filePath = originFilenameList
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
