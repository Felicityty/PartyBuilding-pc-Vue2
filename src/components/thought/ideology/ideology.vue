<template>
  <div>
    <TopBar class-name="top-div-menu-tow-long">
      <!-- 左菜单 -->
      <template #btnLeft>
        <!-- <el-button type="primary" class="el-button-io" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button> -->
        <!-- <BulkImport :upload="upload" @handleData="fetchData" />
        <DownModule :export="downModule" file-name="思想素质模板.xlsx" /> -->
        <!-- <el-button type="primary" @click="handleExport()">导出</el-button> -->
        <BulkExport :export="exportExcel" file-name="思想素质.xlsx" :headers="headers" />
        <BulkDelete :bulk-delete="bulkDelete" @handleSearch="fetchData" />
      </template>

      <!-- 右菜单 -->
      <template #btnRight>
        <el-date-picker
          v-model="datePicker"
          type="monthrange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="datePickerPrint"
        />
        <el-input v-model="queryInfo.userName" placeholder="姓名" style="width: 200px; margin: 0 10px;" />
        <el-button type="primary" class="el-button-delete-search" @click="fetchData()">查询</el-button>
        <el-button type="primary" class="el-button-delete-search" @click="reset()">重置</el-button>
      </template>
    </TopBar>

    <!-- 思想素质列表区域 -->
    <el-table ref="table" v-loading="tableListLoading" :data="thoughtList" stripe style="width: 100%" fit :row-key="(record) => record.ideologicalQualityId" @selection-change="handleSelectionChange">
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
      <el-table-column align="center" label="操作时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件名" width="200">
        <template slot-scope="scope">
          <div v-for="(item, index) in filePathList(scope.row.filePath)" :key="index">{{ item }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button> -->
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
      @pagination="fetchData"
    />

    <!-- 这里的change函数完全就是为了让子组件用$emit调用的 -->
    <EditDialog ref="editdialog" :edit-dialog-visible="editDialogVisible" :edit-form="editForm" @change="handleChange(0)" @fetchAllData="fetchData()" />
    <ShowDialog ref="showdialog" :show-dialog-visible="showDialogVisible" :show-form="showForm" @change="handleChange(1)" />

  </div>

</template>

<script>
import { getThoughtList, delThoughtList, importFile, downModule, exportExcel, bulkDelete } from '@/api/Thought.js'
import EditDialog from '@/components/thought/ideology/ideologyEdit.vue'
import ShowDialog from '@/components/thought/ideology/ideologyShow.vue'
import TopBar from '@/components/layout/topBar.vue'
// import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import { getAdaptionWidth } from '@/utils/adaptionColumn'
import Pagination from '@/components/layout/pagination'
// import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport.vue'
import BulkDelete from '@/components/BtnGroup/BulkDelete.vue'
export default {
  components: {
    EditDialog,
    ShowDialog,
    // BulkImport,
    TopBar,
    Pagination,
    // DownModule,
    BulkExport,
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
        startDate: '',
        endDate: '',
        haveTalk: 0
      },
      tableListLoading: false,
      thoughtList: [],
      total: 0,
      editDialogVisible: false,
      editForm: {},
      showDialogVisible: false,
      showForm: {},
      // 日期选择器
      pickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        },
        {
          text: '今年至今',
          onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            picker.$emit('pick', [start, end])
          }
        }
        ]
      },
      datePicker: [],
      multipleSelection: [],
      headers: 'ideologicalQualityId, userName, classGradeName, partyBranchName, submitDate, fileName, filePath, haveTalk, score, createdBy, updatedBy'
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
    // 引入的函数也要这样注册一下
    getAdaptionWidth,
    downModule,
    exportExcel,
    bulkDelete,

    // 拿到数据
    fetchData(clearSelection = 0) {
      this.tableListLoading = true
      const { queryInfo } = this
      getThoughtList({ ...queryInfo }).then(res => {
        // console.log(res)
        this.tableListLoading = false
        this.thoughtList = res.rows
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
      this.datePicker = []
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
    // // 导出
    // handleExport() {
    //   exportThoughtList({ headers: 'ideologicalQualityId, userName, classGradeName, partyBranchName, submitDate, fileName, filePath, score, createdBy, updatedBy' }).then(res => {
    //     console.log(res)
    //   })
    // },
    datePickerPrint() {
      console.log(this.datePicker)
      if (this.datePicker === null) {
        this.queryInfo.startDate = ''
        this.queryInfo.endDate = ''
        this.fetchData()
        return
      }
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
