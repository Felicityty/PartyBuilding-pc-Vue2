<template>
  <div>
    <!-- 列表区域 -->
    <el-table ref="table" v-loading="tableListLoading" :data="list" style="width: 100%" stripe :row-key="(record) => record.developAbilityId" fit @selection-change="handleSelectionChange">
      <el-table-column type="selection" :reserve-selection="true" fixed="left" width="50" align="center" />
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (queryInfo.pageNum - 1) * queryInfo.pageSize }}
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="left" label="姓名" width="120">
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
      <el-table-column align="center" label="内容" width="300">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.contentList" :key="index">{{ index + 1 }}.{{ item.contentItem }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总分" width="50">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近操作人" width="100">
        <template slot-scope="scope">
          {{ scope.row.updatedBy }}
        </template>
      </el-table-column>
      <el-table-column prop="prop" fixed="right" label="操作" align="center" width="350">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="success" icon="el-icon-view" @click="handleCheck(scope.row)">查看</el-button>
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
import { getInnoList, deleteInnoById, confirmEditInfo } from '@/api/inno'
import DetailDialog from '@/components/BtnGroup/CheckDetail.vue'
import EditDialog from '@/components/BtnGroup/EditDialog.vue'
import Pagination from '@/components/layout/pagination'
export default {
  components: {
    EditDialog,
    DetailDialog,
    Pagination
  },
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableListLoading: false,
      list: [],
      total: 0,
      multipleSelection: [],
      dialogVisible: false,
      detailDialogvisible: false,
      form: {},
      option: {}
    }
  },
  methods: {
    confirmEditInfo,
    // 这里在子组件里调用这的fetchData时，没有option，里面为空，请求这里面的参数又不能为空，所以只能将无value对象扔进去
    fetchData(option = {
      category: 2,
      classGradeName: '',
      partyBranchName: '',
      userName: ''
    }, clearSelection = 0) {
      this.tableListLoading = true
      const { queryInfo } = this
      this.option = option
      console.log(option)
      getInnoList({ ...this.option, ...queryInfo }).then((res) => {
        this.list = res.rows
        console.log(this.list)
        this.total = res.total
        this.tableListLoading = false
      })
      if (clearSelection) {
        this.$nextTick(() => {
          this.$refs.table.clearSelection()
        })
      }
    },

    // handleChange(params) {
    //   console.log(params)
    //   this.queryInfo.pageNum = params.page
    //   this.queryInfo.pageSize = params.limit
    //   this.fetchData()
    // },
    // 编辑数据
    handleEdit(row) {
      // this.dialogVisible = true
      this.handleChange()
      this.form = { ...row }
    },
    handleChange() {
      this.dialogVisible = !this.dialogVisible
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
        deleteInnoById({
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
