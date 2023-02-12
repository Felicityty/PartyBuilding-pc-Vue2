<template>
  <el-dialog title="查看" :visible.sync="dialogVisible" width="35%" @close="handleClose()">
    <!-- 内容主体区域 -->
    <el-form label-width="35%" :model="form">
      <el-form-item label="姓名:">
        <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.userName }}</el-tag>
      </el-form-item>
      <el-form-item label="支部名称:" prop="partyBranchName">
        <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.partyBranchName }}</el-tag>
      </el-form-item>
      <el-form-item label="班级名称:" prop="classGradeName">
        <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.classGradeName }}</el-tag>
      </el-form-item>
      <!-- <el-form-item label="文件名:">
        <el-input v-model="form.fileName" disabled type="text" style="width: 70%" />
      </el-form-item> -->
      <el-form-item label="附件:">
        <!-- <el-button type="primary">上传附件</el-button> -->
        <template v-if="form.filePath">
          <div v-for="(item, index) in fileList" :key="index">
            <el-link type="primary" class="mr-top-5" @click="getFlies(item, index)">{{ item }}</el-link>
          </div>
        </template>
        <template v-else>
          <el-tag type="info" effect="plain" class="el-tag-detail">无</el-tag>
        </template>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getFile } from '@/api/file'
export default {
  props: {
    showDialogVisible: {
      type: Boolean,
      required: true
    },
    showForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // dialogVisible: false,
      // form: {}
    }
  },
  computed: {
    form: {
      get() {
        return this.showForm
      },
      set() {
        return
      }
    },
    dialogVisible: {
      get() {
        return this.showDialogVisible
      },
      set() {
        return this.$emit('change')
      }
    },
    fileList() {
      const str = this.form.filePath
      const listname = str.split(',')
      return listname
    }
  },
  methods: {
    // 关闭对话框回调
    handleClose() {
      this.form = {}
    },

    getFlies(filename, index) {
      const str = this.form.fileName
      const list = str.split(',')
      getFile('temp_import', list[index])
        .then(res => {
          const content = res
          const blob = new Blob([content])
          // const fileName = 'Excel文件名称' + '.xlsx'
          if ('download' in document.createElement('a')) {
            // 非IE下载
            const elink = document.createElement('a')
            elink.download = filename
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, filename)
          }
        })
    }
  }
}

</script>

<style>
</style>
