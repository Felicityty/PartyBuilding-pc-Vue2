<template>
  <div>
    <TopBar class-name="top-div-left-menu-organ">
      <!-- 左菜单 -->
      <template #btnLeft>
        <BulkImport :upload="upload" @handleData="fetchData" />
        <DownModule file-name="eb4c49ca-5fc0-45e7-b7ff-3b258afa7c4a.xlsx" original-filename="谈话考察模板.xlsx" />
        <BulkDelete :bulk-delete="bulkDelete" @handleSearch="fetchData" />
      </template>

      <!-- 右菜单 -->
      <template #btnRight>
        <el-input v-model="queryInfo.userName" placeholder="姓名" style="width: 200px; margin: 0 10px;" />
        <el-button type="primary" class="el-button-delete-search" @click="fetchData()">查询</el-button>
        <el-button type="primary" class="el-button-delete-search" @click="reset()">重置</el-button>
      </template>
    </TopBar>
    <div class="import-warning-tips">
      <svg-icon icon-class="gantan" />
      <span>批量导入仅支持 .xls/.xlsx 格式，大小不超过10M</span>
    </div>

    <!-- 思想素质列表区域 -->
    <el-table ref="table" v-loading="tableListLoading" :data="conList" stripe style="width: 100%" fit :row-key="(record) => record.ideologicalQualityId" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :reserve-selection="true" fixed="left" width="50" align="center" />
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (queryInfo.pageNum - 1) * queryInfo.pageSize }}
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级名称">
        <template slot-scope="scope">
          {{ scope.row.classGradeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支部名称">
        <template slot-scope="scope">
          {{ scope.row.partyBranchName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="得分" width="50">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作时间">
        <template slot-scope="scope">
          {{ scope.row.createdTime | dateFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人" width="100">
        <template slot-scope="scope">
          {{ scope.row.updatedBy }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="success" icon="el-icon-view" @click="handleShow(scope.row)">查看</el-button>
          <el-button type="primary" icon="el-icon-delete" class="el-button-delete-search" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 思想素质卡片区域 -->
    <Pagination
      v-show="total > 0"
      :page-sizes="[10,20,50]"
      :limit.sync="queryInfo.pageSize"
      :page.sync="queryInfo.pageNum"
      :total="total"
      @pagination="fetchData(option)"
    />

    <!-- 这里的change函数完全就是为了让子组件用$emit调用的 -->
    <EditDialog ref="editdialog" :edit-dialog-visible="editDialogVisible" :edit-form="editForm" @change="handleChange(0)" @fetchAllData="fetchData()" />
    <ShowDialog ref="showdialog" :show-dialog-visible="showDialogVisible" :show-form="showForm" @change="handleChange(1)" />

  </div>

</template>

<script>
import { getThoughtList, delThoughtList, exportThoughtList, importFile, downModule, bulkDelete } from '@/api/Thought.js'
// import EditDialog from '@/components/thought/ideology/ideologyEdit.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import { getAdaptionWidth } from '@/utils/adaptionColumn'
import Pagination from '@/components/layout/pagination'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import EditDialog from '@/components/thought/conversation/conversationEdit.vue'
import ShowDialog from '@/components/thought/conversation/conversationShow.vue'
import BulkDelete from '@/components/BtnGroup/BulkDelete.vue'
export default {
  components: {
    // EditDialog,
    BulkImport,
    TopBar,
    Pagination,
    DownModule,
    EditDialog,
    ShowDialog,
    BulkDelete
  },
  data() {
    return {
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        // 名字查询
        userName: '',
        haveTalk: 1
      },
      tableListLoading: false,
      conList: [],
      total: 0,
      editDialogVisible: false,
      editForm: {},
      showDialogVisible: false,
      showForm: {},
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 引入的函数也要这样注册一下
    getAdaptionWidth,
    downModule,
    bulkDelete,
    // 拿到数据
    fetchData(clearSelection = 0) {
      this.tableListLoading = true
      const { queryInfo } = this
      getThoughtList({ ...queryInfo }).then(res => {
        this.tableListLoading = false
        console.log(res)
        this.conList = res.rows
        this.total = res.total
      })
      if (clearSelection) {
        this.$nextTick(() => {
          this.$refs.table.clearSelection()
        })
      }
    },
    // 重置
    reset() {
      this.queryInfo = {
        pageNum: 1,
        pageSize: 10,
        startDate: '',
        endDate: '',
        userName: ''
      }
      this.fetchData()
    },
    // 上传
    upload(url) {
      importFile(url).then(() => {
        this.fetchData()
      })
    },
    // 导出
    handleExport() {
      exportThoughtList({ headers: 'ideologicalQualityId, userName, classGradeName, partyBranchName, submitDate, fileName, filePath, score, createdBy, updatedBy' }).then(res => {
        console.log(res)
      })
    },
    datePickerPrint() {
      if (this.datePicker === null) return
      this.queryInfo.startDate = this.datePicker[0]
      this.queryInfo.endDate = this.datePicker[1]
    },
    // 专门控制对话框开关
    handleChange(e) {
      if (e === 0) {
        this.editDialogVisible = !this.editDialogVisible
      } else if (e === 1) {
        this.showDialogVisible = !this.showDialogVisible
      }
    },
    // 编辑
    handleEdit(row) {
      this.handleChange(0)
      this.editForm = { ...row }
    },
    // 查看
    handleShow(row) {
      // this.$refs.showdialog.dialogVisible = true
      this.handleChange(1)
      this.showForm = { ...row }
    },
    // 删除
    handleDelete(row) {
      // console.log(row.ideologicalQualityId)
      this.$confirm(window.$constant.delete, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delThoughtList({
          Id: row.ideologicalQualityId
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg || '删除成功')
            this.$emit('fetchAllData')
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除!')
      })
    },
    // 批量删除
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
