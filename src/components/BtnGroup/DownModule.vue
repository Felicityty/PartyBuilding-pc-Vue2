<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-download"
      class="el-button-io"
      @click="handleDownload"
    >下载模板</el-button>
  </div>
</template>

<script>
import { downExcel } from '@/api/file'
// const NOOP = () => {}
export default {
  props: {
    // 导出
    // export: {
    //   type: Function,
    //   default: NOOP
    // },
    fileName: {
      type: String,
      default: '0'
    },
    originalFilename: {
      type: String,
      default: 'excel文件'
    }
  },
  data() {
    return {
      filename: this.fileName
    }
  },
  methods: {
    // 下载模板
    handleDownload() {
      // if (this.category !== '0') {
      //   downModule(this.category).then(res => {
      //     this.handleExport(res)
      //   })
      // } else {
      //   this.export().then(res => {
      //     this.handleExport(res)
      //   })
      // }
      downExcel(this.filename, this.originalFilename).then(res => {
        this.handleExport(res)
      }).catch(error => {
        console.log(error)
        return new Error(error)
      })
    },
    handleExport(res) {
      // 处理返回的文件流
      const blob = new Blob([res])
      // const fileName = 'Excel文件名称' + '.xlsx'
      if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a')
        elink.download = this.originalFilename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, this.originalFilename)
      }
    }
  }
}
</script>

<style>

</style>
