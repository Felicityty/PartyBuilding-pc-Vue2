<template>
  <div>
    <!-- 组织协调列表区域 -->
    <el-table v-loading="tableListLoading" :data="coordinationList" stripe style="width: 100%" fit>
      <el-table-column align="center" label="姓名" width="120" fixed="left">
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
      <el-table-column align="center" label="组织协调内容" width="260">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.contentList" :key="index">
            {{ index+1 }}.{{ item.contentItem }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总分" width="50">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近操作人" width="100">
        <template slot-scope="scope">
          {{ scope.row.updatedBy }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="350" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="success" icon="el-icon-view" @click="handleCheck(scope.row)">查看</el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            class="el-button-delete-search"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <EditDialog
      ref="editdialog"
      :edit-dialog-visible="editDialogVisible"
      :form="form"
      @change="handleChange()"
      @fetchAllData="fetchData()"
    />

    <Checkdialog ref="checkdialog" :detail-dialogvisible.sync="checkFormVisible" :check-form="checkForm" />

  </div>
</template>

<script>
import { getSpecialityList, deleteSpecialityList } from '@/api/speciality.js'
import EditDialog from '@/components/BtnGroup/EditDialog.vue'
import Checkdialog from '@/components/BtnGroup/CheckDetail.vue'
export default {
  components: {
    EditDialog,
    Checkdialog
  },
  data() {
    return {
      tableListLoading: false,
      // 获取信息列表对象
      queryInfo: {
        pageNum: 1,
        pageSize: 1,
        category: 5,
        classGradeName: '',
        partyBranchName: '',
        userName: '',
        stuNo: ''
      },
      total: 0,
      // 活动列表
      coordinationList: [],
      form: {},
      editDialogVisible: false,
      checkFormVisible: false,
      checkForm: {},
      infoList: {},
      flag: 0
    }
  },
  methods: {
    fetchData(infoList) {
      this.tableListLoading = true
      if (this.flag === 0) {
        this.infoList = infoList
        this.queryInfo.stuNo = this.infoList.userName // 这里得到的是学号，之后会根据学号来查这个人的所有个人信息
        this.flag++
      }

      const {
        queryInfo
      } = this
      getSpecialityList({
        ...queryInfo
      }).then(res => {
        console.log(res)
        this.tableListLoading = false
        this.coordinationList = res.rows
        this.total = res.total
      })
    },
    // 编辑
    handleEdit(row) {
      this.handleChange()
      this.form = {
        ...row
      }
      console.log(this.form)
    },
    handleChange() {
      this.editDialogVisible = !this.editDialogVisible
    },
    // 查看数据
    handleCheck(row) {
      this.checkFormVisible = true
      this.checkForm = { ...row }
    },
    // 删除数据
    handleDelete(row) {
      this.$confirm(window.$constant.delete, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSpecialityList({
          Id: row.developAbilityId
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg || '删除成功')
            // this.$emit('fetchAllData')
            this.fetchData()
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除!')
      })
    }
  }
}
</script>

<style>
</style>
