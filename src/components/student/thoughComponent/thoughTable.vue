<template>
  <div>
    <!-- 列表区域 -->
    <el-table v-loading="tableListLoading" :data="stuList" style="width: 100%" stripe>
      <el-table-column width="120" fixed="left" align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.classGradeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支部名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.partyBranchName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.submitDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件名" width="250">
        <template slot-scope="scope">
          <div v-for="(item, index) in filePathList(scope.row.filePath)" :key="index">{{ index + 1 }}.{{ item }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="prop" fixed="right" label="操作" width="350px">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="success" icon="el-icon-view" @click="handleCheck(scope.row)">查看</el-button>
            <el-button type="primary" icon="el-icon-delete" class="el-button-delete-search" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <EditDialog
      ref="editdialog"
      :edit-dialog-visible="dialogVisible"
      :form="form"
      @change="handleChange()"
      @fetchAllData="fetchData()"
    />

    <!-- 详细信息对话框 -->
    <DetailDialog ref="detailDialog" :detail-dialogvisible.sync="detailDialogvisible" :check-form="form" />
  </div>
</template>

<script>
import { getThoughtList, delThoughtList } from '@/api/student'
import { getInfo } from '@/api/user'
import EditDialog from '@/components/student/thoughComponent/editDialog.vue'
import DetailDialog from '@/components/student/thoughComponent/detailDialog.vue'

export default {
  components: {
    EditDialog,
    DetailDialog
  },
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        userName: '',
        stuNo: ''
      },
      tableListLoading: false,
      stuList: [],
      total: 0,
      dialogVisible: false,
      detailDialogvisible: false,
      form: {},
      infoList: {}
    }
  },
  computed: {
    filePathList() {
      return function(filePath) {
        if (filePath) {
          return filePath.split(',')
        }
        return ['无']
      }
    }
  },
  methods: {
    // 获取思想素质模块数据
    async fetchData() {
      this.tableListLoading = true
      try {
        const { data } = await getInfo()
        this.infoList = data
        console.log(this.infoList)
        this.queryInfo.stuNo = this.infoList.userName // 这里得到的是学号，之后会根据学号来查这个人的所有个人信息
      } catch (error) {
        return new Error(error)
      }
      const { queryInfo } = this
      getThoughtList({ ...queryInfo }).then(res => {
        this.tableListLoading = false
        console.log(res)
        this.stuList = res.rows
        this.total = res.total
      }).catch(error => {
        return new Error(error)
      })
    },
    // 编辑数据
    handleEdit(row) {
      this.handleChange()
      this.form = { ...row }
      console.log('form', this.form)
      this.form.confirmDate = new Date(this.form.confirmDate)
      console.log(this.form)
    },
    // 专门控制编辑对话框开关
    handleChange() {
      this.dialogVisible = !this.dialogVisible
      console.log(this.dialogVisible)
    },
    // 详细信息
    handleCheck(row) {
      this.detailDialogvisible = true
      this.form = { ...row }
    },
    // 删除数据
    handleDelete(row) {
      this.$confirm(window.$constant.delete, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delThoughtList({
          Id: row.ideologicalQualityId
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg || '删除成功!')
            this.$emit('fetchAllData')
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除!')
      })
    }
  }
}
</script>
