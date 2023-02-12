<template>
  <div>
    <!-- 详细信息对话框 -->
    <el-dialog
      title="详细信息"
      :visible.sync="visible"
      width="40%"
      class="showAll_dialog"
      @close="handleClose"
    >
      <el-form ref="detailFormRef" :model="form" :rules="rules" label-width="25%">
        <el-form-item label="姓名:">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.userName }}</el-tag>
        </el-form-item>
        <el-form-item label="学号:">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.stuNo }}</el-tag>
        </el-form-item>
        <el-form-item label="支部名称:" prop="partyBranchName">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.partyBranchName }}</el-tag>
        </el-form-item>
        <el-form-item label="班级名称:" prop="classGradeName">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.classGradeName }}</el-tag>
        </el-form-item>
        <el-form-item label="内容:">
          <div v-for="(item,index) in form.contentList" :key="index" style="display: flex;">
            <el-tag type="info" effect="plain" class="el-tag-detail-content mr-top-5">{{ item.contentItem }}</el-tag>
            <el-tag type="info" effect="plain" class="el-tag-detail-score mr-top-5">{{ item.score }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="总分:">
          <el-tag type="info" effect="plain" class="el-tag-detail">{{ form.score }}</el-tag>
        </el-form-item>
        <el-form-item label="附件:" prop="file">
          <template v-if="form.filePath">
            <div v-for="(item, index) in fileList" :key="index">
              <el-link type="primary" class="mr-top-5" @click="getFlies(item, index)">{{ item }}</el-link>
            </div>
          </template>
          <template v-else>
            <el-tag type="info" effect="plain" class="el-tag-detail">无</el-tag>
          </template>
        </el-form-item>
        <!-- <el-form-item label="操作记录:" /> -->
        <!-- <el-table :data="list" stripe border>
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="content" label="操作后内容"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="people" label="操作人"></el-table-column>
        </el-table> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFile } from '@/api/file'
export default {
  props: {
    detailDialogvisible: {
      type: Boolean,
      required: true
    },
    checkForm: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      rules: {}
    }
  },
  computed: {
    form: {
      get() {
        return this.checkForm
      },
      set() {
        return
      }
    },
    visible: {
      get() {
        return this.detailDialogvisible
      },
      set(val) {
        this.$emit('update:detailDialogvisible', val)
      }
    },
    fileList() {
      const str = this.form.filePath
      const listname = str.split(',')
      return listname
    }
  },
  methods: {
    handleClose() {
      this.form = {}
    },

    getFlies(filename, index) {
      const str = this.form.fileName
      const list = str.split(',')
      getFile('attachments', list[index])
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

<style lang="scss" scoped>

</style>
