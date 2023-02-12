<template>
  <div>
    <!-- <div style="visibility: hidden;"> -->
    <el-upload
      ref="upload"
      class="upload"
      action="#"
      :multiple="false"
      :show-file-list="false"
      :file-list="fileList"
      accept=".excl,.xls,.xlsx"
      :limit="1"
      :on-change="handleChange"
      :http-request="importFile"
    >
      <!-- // TODO 传入.xls文件报错 -->
      <el-button ref="uploadBtn" slot="trigger" class="el-button-io" type="primary" icon="el-icon-plus">批量导入</el-button>
    </el-upload>
    <!-- <el-dialog
      class="tip"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    > -->
    <!-- <template slot="title">
        <svg-icon class="tip-icon" :icon-class="icons[type]" />
        <span class="tip-title">{{ results[type] }}</span>
      </template> -->
    <!-- <p class="tip-content">{{ tip }}</p>
      <p v-if="type === 'warning'" class="tip-content" style="color: #CB272D;">{{ warningTip }}</p> -->
    <!-- <p class="text-align-center font-size-20">导入失败 请尝试重新导入</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="againImport">重新导入</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { uploadExcel, importFile } from '@/api/file'
const NOOP = () => {}
export default {
  name: 'EPTImport',

  props: {
    upload: {
      type: Function,
      default: NOOP
    },
    category: {
      type: String,
      default: '0',
      required: false
    }
  },

  data() {
    return {
      fileList: [],
      uploadFiles: [],
      dialogVisible: false,
      type: 'success', // 导入结果
      tip: '', // 导入提示
      warningTip: '失败了', // 导入失败提示
      icons: {
        loading: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error'
      },
      results: {
        loading: '正在导入',
        success: '导入成功',
        warning: '导入异常',
        error: '导入失败'
      }
    }
  },

  mounted() {

  },

  methods: {
    // 选择文件后保存文件数据
    handleChange(file, fileList) {
      this.uploadFiles = [file]
      console.log(this.uploadFiles)
    },
    // 文件上传
    async uploadFile() {
      try {
        console.log('uploadFile')
        const formData = new FormData()
        if (!this.uploadFiles[0]?.raw) {
          throw new Error('请选择文件')
        }
        formData.append('file', this.uploadFiles[0]?.raw)
        console.log(formData)
        const result = await uploadExcel('temp_import', formData)
        console.log('res', result)
        return result.data.filename
      } catch (err) {
        console.log(err)
      }
    },
    // 积极分子 - 导入功能
    async importFile() {
      console.log('importFile')
      if (this.category !== '0') {
        try {
          const result = await importFile(this.category, { url: await this.uploadFile() })
          console.log('result', result)
          console.log(Object.values(result.data)[0])
          if (Object.values(result.data)[0] !== 'insert succeed') {
            this.$message.error(Object.values(result.data)[0])
            this.$refs.upload.clearFiles()
          } else {
            this.$message.success('导入成功')
            this.$emit('handleSearch')
            this.fileList = []
            this.$refs.upload.clearFiles()
          }
        } catch (error) {
          this.$message.error('导入失败，请尝试重新导入！')
          console.log(error)
          this.$refs.upload.clearFiles()
        }
      } else {
        try {
          const result = await this.upload({
            url: await this.uploadFile()
          })
          // if(result.data.2)
          // console.log(result.data)
          console.log('result', result)
          console.log(Object.values(result.data)[0])
          if (Object.values(result.data)[0] !== 'insert succeed') {
            this.$message.error(Object.values(result.data)[0])
            this.$refs.upload.clearFiles()
          } else {
            this.$message.success('导入成功')
            this.$emit('handleSearch')
            this.fileList = []
            this.$refs.upload.clearFiles()
          }
        } catch (error) {
          const err = error + ''
          if (err !== "TypeError: Cannot read properties of undefined (reading 'data')") {
            this.$message.error('导入失败，请尝试重新导入！')
          } else {
            this.$message.success('导入成功')
          }
          console.log('error:', error + '')
          this.$refs.upload.clearFiles()
        }
      }
    }
    // importFile() {
    //   console.log('importFile')
    //   this.upload({ url: this.uploadFile().then(res => {
    //     return res
    //   }).catch(error => {
    //     throw new Error(error)
    //   }) }).then(res => {
    //     console.log('result', res)
    //     this.$message.success('导入成功')
    //     this.$emit('handleSearch')
    //   }).catch(error => {
    //     console.log(error)
    //     this.dialogVisible = true
    //     this.$message.error('导入失败')
    //   })
    // },
    // 重新导入
    // againImport() {
    //   this.dialogVisible = false
    //   this.importFile()
    // }
    // handleClose(done) {
    //   this.$confirm(window.$constant.close, '警告', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(_ => {
    //     // this.$emit('handleSearch')
    //     done()
    //   }).catch(_ => {})
    // }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  ::v-deep .el-dialog__body {
    padding-top: 0px;
  }
  &-icon {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
  &-title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    margin-left: 10px;
    text-align: center;
    vertical-align: super;
    color: #1D2129;
  }
  &-content {
    margin-left: 50px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    text-align: justify;
    color: #4E5969;
  }
}
</style>
