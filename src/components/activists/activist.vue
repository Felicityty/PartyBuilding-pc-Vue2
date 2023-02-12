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
          <!-- {{ scope.row.partyBranchName | enumDataDict(1) }} -->
          {{ scope.row.partyBranchName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="确定积极分子时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.confirmDate }}
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
      @pagination="fetchData(option)"
    />

    <EditDialogAct ref="editdialog" :dialogvisible="dialogVisible" :actform="form" @change="handleChange" @fetchData="fetchData" />
  </div>
</template>

<script>
import { getActivistList, deleteActivistById } from '@/api/activist'
import EditDialogAct from '@/components/activists/editDialogAct.vue'
import Pagination from '@/components/layout/pagination'

export default {
  components: {
    EditDialogAct,
    Pagination
  },
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableListLoading: false,
      activistList: [],
      total: 0,
      multipleSelection: [],
      dialogVisible: false,
      form: {},
      option: {}
    }
  },
  methods: {
    fetchData(option = {}, clearSelection = 0) {
      // option就是父组件用自定义事件传递过来的
      console.log({ ...option })
      this.tableListLoading = true
      this.option = option
      const { queryInfo } = this
      getActivistList({ ...option, ...queryInfo, courseCompletion: 0 }).then((res) => {
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
    // 编辑数据
    handleEdit(row) {
      this.handleChange()
      this.form = { ...row }
      this.form.confirmDate = new Date(this.form.confirmDate)
      console.log(this.form)
    },
    // 专门控制对话框开关
    handleChange() {
      this.dialogVisible = !this.dialogVisible
      console.log(this.dialogVisible)
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
