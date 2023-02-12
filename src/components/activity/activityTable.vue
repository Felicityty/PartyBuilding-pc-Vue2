<template>
  <div>
    <!-- 活动列表区域 -->
    <el-table ref="table" v-loading="tableListLoading" :data="activityList" stripe style="width: 100%" fit :row-key="(record) => record.developAbilityId" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :reserve-selection="true" fixed="left" width="50" align="center" />
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (queryInfo.pageNum - 1) * queryInfo.pageSize }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="100" fixed="left">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级名称" width="300">
        <template slot-scope="scope">
          {{ scope.row.classGradeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支部名称" width="250">
        <template slot-scope="scope">
          {{ scope.row.partyBranchName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容" width="300">
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

    <!-- 分页 -->
    <Pagination
      v-show="total > 0"
      :page-sizes="[10,20,50]"
      :limit.sync="queryInfo.pageSize"
      :page.sync="queryInfo.pageNum"
      :total="total"
      @pagination="fetchData(option)"
    />

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
import Pagination from '@/components/layout/pagination'
import Checkdialog from '@/components/BtnGroup/CheckDetail.vue'
export default {
  components: {
    EditDialog,
    Pagination,
    Checkdialog
  },
  data() {
    return {
      tableListLoading: true,
      // 获取信息列表对象
      queryInfo: {
        category: 1,
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      total: 0,
      option: {},
      // 活动列表
      activityList: [],
      form: {},
      editDialogVisible: false,
      checkFormVisible: false,
      checkForm: {},
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(option = {}, clearSelection = 0) {
      this.tableListLoading = true
      const {
        queryInfo
      } = this
      this.option = option
      getSpecialityList({
        ...this.option,
        ...queryInfo
      }).then(res => {
        // console.log(res)
        this.tableListLoading = false
        this.activityList = res.rows
        this.total = res.total
      })
      if (clearSelection) {
        this.$nextTick(() => {
          this.$refs.table.clearSelection()
        })
      }
    },
    // 编辑
    handleEdit(row) {
      this.form = {
        ...row
      }
      this.handleChange()
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
    },
    // 批量删除/批量导出
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
      this.$bus.$emit('multipleDelete', this.multipleSelection)
      // this.$bus.$emit('multipleExport', this.multipleSelection)
    }
  }
}
</script>

<style>
</style>
