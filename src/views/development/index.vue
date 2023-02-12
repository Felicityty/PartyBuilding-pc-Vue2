<template>
  <div>
    <el-card>
      <TopBar class-name="top-div-left-menu">
        <!-- 左菜单 -->
        <template #btnLeft>
          <BulkImport :upload="importFile" @handleSearch="handleSearch" />
          <DownModule file-name="832bc198-148f-42c0-a08b-e510e02a0cf4.xlsx" original-filename="发展对象模板.xlsx" />
          <BulkExport :export="exportExcel" file-name="发展对象.xlsx" :headers="headers" />
          <BulkDelete :bulk-delete="bulkDelete" @handleSearch="handleSearch" />
        </template>

        <!-- 右菜单 -->
        <template #btnRight>
          <el-select v-model="queryInfo.partyBranchName" placeholder="全部支部" class="el-select-branch">
            <el-option v-for="item in branchOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
          <el-select v-model="queryInfo.classGradeName" placeholder="全部班级" class="el-select-class">
            <el-option v-for="item in classOptionsChoose" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
          <el-input v-model="queryInfo.developObjectName" placeholder="姓名" class="el-input-name" />
          <el-button type="primary" class="el-button-delete-search" @click="handleSearch">查询</el-button>
          <el-button type="primary" class="el-button-delete-search" @click="handleReset">重置</el-button>
        </template>
      </TopBar>

      <Developtable ref="developtable" @fetchAllData="handleSearch">
        <template #operator="obj">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(obj.row)">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" class="el-button-delete-search" @click="handleDelete(obj.row)">删除</el-button>
        </template>
      </Developtable>
    </el-card>

    <!-- 编辑对话框 -->
    <Editdialog ref="editdialog" :visible.sync="editFormVisible" :edit-form="editForm" @fetchAllData="handleSearch" />
  </div>
</template>

<script>
import Developtable from '@/components/development/table.vue'
import Editdialog from '@/components/development/editdialog.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport.vue'
import BulkDelete from '@/components/BtnGroup/BulkDelete.vue'
import { deleteDevelopList, importFile, downModule, exportExcel, bulkDelete } from '@/api/development'
export default {
  components: {
    Developtable,
    Editdialog,
    TopBar,
    BulkImport,
    DownModule,
    BulkExport,
    BulkDelete
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      queryInfo: {},
      addFormVisible: false,
      editFormVisible: false,
      importFormVisible: false,
      editForm: {},
      headers: 'developObjectId, developObjectName, classGradeName, partyBranchName, confirmDate, createdBy, updatedBy'
    }
  },
  computed: {
    classOptionsChoose() {
      return this.classOptionsChooseOptions[this.queryInfo.partyBranchName]
    }
  },
  created() {
    this.constant.getOptions()
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    importFile,
    downModule,
    exportExcel,
    bulkDelete,

    // 查询
    handleSearch(clearSelection) {
      this.$refs.developtable.fetchData(this.queryInfo, clearSelection)
    },

    // 重置
    handleReset() {
      this.queryInfo = {}
      this.handleSearch()
    },

    // 编辑数据
    handleEdit(row) {
      this.editFormVisible = true
      this.editForm = { ...row }
    },

    // 删除数据
    handleDelete(row) {
      console.log(row)
      this.$confirm(window.$constant.delete, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDevelopList({
          Id: row.developObjectId
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg || '删除成功')
            this.handleSearch()
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
