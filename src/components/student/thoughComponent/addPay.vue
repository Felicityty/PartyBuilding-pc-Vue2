<template>
  <div>
    <el-upload
      ref="upload"
      class="upload"
      action="#"
      :multiple="false"
      :show-file-list="true"
      :file-list="fileList"
      accept=".pdf"
      :limit="fileLimit"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :http-request="uploadFile"
    >
      <!-- // TODO 传入.xls文件报错 -->
      <el-button
        ref="uploadBtn"
        slot="trigger"
        class="el-button-io"
        type="primary"
        size="small"
      >
        上传附件</el-button>
    </el-upload>
  </div>
</template>

<script>
import { uploadExcel } from '@/api/file'
// const NOOP = () => {}
export default {
  name: 'EPTImport',
  props: {
    fileName: {
      type: String,
      default: null
    },
    filePath: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      fileList: [],
      uploadFiles: [],
      fileLimit: 3
    }
  },
  watch: {
    fileName: {
      handler(newPath) {
        this.cleanFileList()
        this.compInit()
      },
      immediate: true
    }
  },
  methods: {
    compInit() {
      const files = this.fileName
      const filesname = this.filePath
      if (files !== null && filesname !== null && files !== '') {
        const list = files.split(',')
        const fileslist = filesname.split(',')
        for (let i = 0; i < list.length; i++) {
          this.fileList.push({
            name: fileslist[i],
            url: list[i]
          })
        }
      }
    },
    // 选择文件后保存文件数据
    handleChange(file, fileList) {
      this.uploadFiles = [file]
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
        // console.log(formData)
        const result = await uploadExcel('temp_import ', formData)
        console.log('res', result)
        this.$emit('afterAddPayload', result)
        return result.data
      } catch (err) {
        console.log(err)
      }
    },
    handleRemove(file, fileList) {
      // console.log(file)// 删除了的文件的文件名和文件path
      this.$emit('afterRemovePayload', fileList)
    },
    // 超出文件个数的回调
    handleExceed() {
      this.$message.warning('超出最大上传文件数量的限制！')
    },
    // 清除上传附件的fileList
    cleanFileList() {
      this.fileList = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
