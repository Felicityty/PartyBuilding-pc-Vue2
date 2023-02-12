<template>
  <div>
    <!-- 列表区域 -->
    <el-table ref="table" v-loading="tableListLoading" style="width: 100%" :data="activistList" stripe :row-key="(record) => record.activistId" fit @selection-change="handleSelectionChange">
      <el-table-column type="selection" :reserve-selection="true" fixed="left" width="50" align="center" />
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (queryInfo.pageNum - 1) * queryInfo.pageSize }}
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="left" label="姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.activistName }}
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
      <el-table-column align="center" label="党校结业时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.completeDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人" width="200">
        <template slot-scope="scope">
          {{ scope.row.updatedBy }}
        </template>
      </el-table-column>
      <el-table-column prop="operate" fixed="right" align="center" label="操作" width="250">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" icon="el-icon-delete" class="el-button-delete-search" @click="handleDelete(scope.row)">删除</el-button>
          </div>
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
      @pagination="fetchData"
    />

    <!-- <el-dialog
      title="编辑积极分子"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handleClose"
    >
      <el-form ref="editFormRef" :model="form" :rules="rules" label-width="38%">
        <el-form-item label="姓名" prop="activistName">
          <el-input v-model="form.activistName" style="width: 70%" />
        </el-form-item>
        <el-form-item label="支部名称" prop="partyBranchName">
          <el-select v-model="form.partyBranchName" placeholder="支部名称" style="width: 70%">
            <el-option
              v-for="item in branchOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="classGradeName">
          <el-input v-model="form.classGradeName" style="width: 70%" />
        </el-form-item>
        <el-form-item label="结业时间" prop="completeDate">
          <el-date-picker
            v-model="form.completeDate"
            type="date"
            placeholder="选择日期"
            style="width: 70%"
            value-format="yyyy-MM-dd hh:mm:ss"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog> -->

    <EditDialogGra ref="editdialog" :dialogvisible="dialogVisible" :graform="form" @change="handleChange" @fetchData="fetchData" />

  </div>

</template>

<script>
import { getActivistList, deleteActivistById } from '@/api/activist'
import EditDialogGra from '@/components/activists/editDialogGra.vue'
import Pagination from '@/components/layout/pagination'
export default {
  components: {
    EditDialogGra,
    Pagination
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableListLoading: false,
      activistList: [],
      total: 0,
      multipleSelection: [],
      dialogVisible: false,
      form: {}
      // rules: {},
      // loading: false
    }
  },
  methods: {
    fetchData(option = {}, clearSelection = 0) {
      this.tableListLoading = true
      const { queryInfo } = this
      getActivistList({ ...option, ...queryInfo, courseCompletion: 1 }).then((res) => {
        this.activistList = res.rows
        this.total = res.total
        this.tableListLoading = false
      })
      if (clearSelection) {
        this.$nextTick(() => {
          this.$refs.table.clearSelection()
        })
      }
    },
    // 专门控制对话框开关
    handleChange() {
      this.dialogVisible = !this.dialogVisible
      console.log(this.dialogVisible)
    },
    // 编辑数据
    handleEdit(row) {
      // this.dialogVisible = true
      this.handleChange()
      this.form = { ...row }
      console.log(this.form.completeDate)
      this.form.completeDate = new Date(this.form.completeDate)
      console.log(this.form)
    },
    // 删除数据
    handleDelete(row) {
      this.$confirm(window.$constant.delete, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteActivistById({
          Id: row.activistId
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg || '删除成功!')
            this.$emit('fetchAllData')
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
