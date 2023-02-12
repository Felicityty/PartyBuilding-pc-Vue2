<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-upload2"
      class="el-button-io"
      @click="handleMultiExport"
    >批量导出</el-button>
  </div>
</template>

<script>
import { exportExcel } from '@/api/file'
const NOOP = () => {}

export default {
  props: {
    export: {
      type: Function,
      default: NOOP
    },
    fileName: {
      type: String,
      default: 'Excel文件'
    },
    headers: {
      type: String,
      require: true,
      default: ''
    },
    category: {
      type: String,
      default: '0',
      required: false
    }
  },
  data() {
    return {
      multipleSelection: [],
      filename: this.fileName,
      headersName: this.headers
    }
  },
  mounted() {
    // this.$bus.$on('multipleExport', (multipleSelection) => {
    //   this.multipleSelection = multipleSelection
    //   console.log(this.multipleSelection)
    // })
  },
  methods: {
    // 批量导出
    handleMultiExport() {
      if (this.category !== '0') {
        exportExcel(this.headersName, this.category).then(res => {
          this.handleExport(res)
        })
      } else {
        this.export(this.headersName).then(res => {
          this.handleExport(res)
        })
      }
    },
    handleExport(res) {
      console.log(this.filename)
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      })
      const linkNode = document.createElement('a')

      linkNode.download = this.filename // a标签的download属性规定下载文件的名称
      linkNode.style.display = 'none'
      linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
      document.body.appendChild(linkNode)
      linkNode.click() // 模拟在按钮上的一次鼠标单击

      URL.revokeObjectURL(linkNode.href) // 释放URL 对象
      document.body.removeChild(linkNode)
    }
  }
}
</script>

<style>

</style>
