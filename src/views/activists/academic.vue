<template>
  <div>
    <el-card>
      <TopBar class-name="top-div-left-menu-five">
        <!-- 左菜单 -->
        <template #btnLeft>
          <el-button type="primary" class="el-button-io" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
          <BulkImport :upload="importFile" @handleSearch="handleSearch" />
          <DownModule file-name="b3502793-995f-4b82-b3ee-516e1d77dc95.xlsx" original-filename="学业素质模板.xlsx" />
          <BulkExport :export="exportExcel" file-name="学业素质.xlsx" :headers="headers" />
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
          <el-input v-model="queryInfo.userName" placeholder="姓名" class="el-input-name" />
          <el-button type="primary" class="el-button-delete-search" @click="handleSearch">查询</el-button>
          <el-button type="primary" class="el-button-delete-search" @click="handleReset">重置</el-button>
        </template>
      </TopBar>

      <Academictable ref="academictable" @fetchAllData="handleSearch">
        <template #operator="obj">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(obj.row)">编辑</el-button>
          <el-button type="success" icon="el-icon-view" @click="handleCheck(obj.row)">查看</el-button>
          <el-button type="primary" icon="el-icon-delete" class="el-button-delete-search" @click="handleDelete(obj.row)">删除</el-button>
        </template>
      </Academictable>

    </el-card>

    <!-- 新增 -->
    <Adddialog ref="adddialog" :visible.sync="addFormVisible" @fetchAllData="handleSearch" />

    <!-- 编辑对话框 -->
    <Editdialog ref="editdialog" :visible.sync="editFormVisible" :edit-form="editForm" @fetchAllData="handleSearch" />

    <!-- 查看 -->
    <Checkdialog ref="checkdialog" :visible.sync="checkFormVisible" :check-form="checkForm" />
  </div>
</template>

<script>
import Academictable from '@/components/academic/table.vue'
import Adddialog from '@/components/academic/adddialog.vue'
import Editdialog from '@/components/academic/editdialog.vue'
import Checkdialog from '@/components/academic/checkdialog.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport.vue'
import BulkDelete from '@/components/BtnGroup/BulkDelete.vue'
import { deleteAcademicList, importFile, downModule, exportExcel, bulkDelete } from '@/api/academic'
export default {
  components: {
    Academictable,
    Adddialog,
    Editdialog,
    Checkdialog,
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
      editForm: {},
      checkFormVisible: false,
      checkForm: {},
      headers: 'academicQualitiesId, userName, classGradeName, partyBranchName, score, createdBy, updatedBy'
    }
  },
  computed: {
    classOptionsChoose() {
      return this.classOptionsChooseOptions[this.queryInfo.partyBranchName]
    }
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
      this.$refs.academictable.fetchData(this.queryInfo, clearSelection)
    },

    // 重置
    handleReset() {
      this.queryInfo = {}
      this.handleSearch()
    },

    // 新增数据
    handleAdd() {
      this.addFormVisible = true
    },

    // 编辑数据
    handleEdit(row) {
      this.editFormVisible = true
      this.editForm = { ...row }
    },

    // 查看数据
    handleCheck(row) {
      this.checkFormVisible = true
      this.checkForm = { ...row }
    },

    // 删除数据
    handleDelete(row) {
      // console.log(row)
      this.$confirm(window.$constant.delete, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAcademicList({
          Id: row.academicQualitiesId
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
