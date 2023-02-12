<template>
  <div>
    <el-card>
      <TopBar class-name="top-div-left-menu-organ">
        <!-- 左菜单 -->
        <template #btnLeft>
          <BulkImport :upload="importFile" @handleSearch="handleSearch" />
          <DownModule file-name="de6c4f22-03a3-4e6e-beca-48123064395b.xlsx" original-filename="班级管理模板.xlsx" />
          <BulkExport :export="exportExcel" file-name="班级管理.xlsx" :headers="headers" />
        </template>

        <!-- 右菜单 -->
        <template #btnRight>
          <el-input v-model="queryInfo.classGradeLeader" placeholder="班主任" style="margin-right: 2%; width: 32.3%" />
          <el-button type="primary" class="el-button-delete-search" @click="handleSearch">查询</el-button>
          <el-button type="primary" class="el-button-delete-search" @click="handleReset">重置</el-button>
        </template>
      </TopBar>

      <Classtable ref="classtable" @fetchAllData="handleSearch">
        <template #operator="obj">
          <el-button v-if="obj.row.status === 'ENABLED' ? true : false" type="danger" icon="el-icon-circle-close" @click="changeSecretaryStatus(obj.row)">禁用</el-button>
          <el-button v-if="obj.row.status === 'DISABLED' ? true : false" type="success" icon="el-icon-circle-check" @click="changeSecretaryStatus(obj.row)">启用</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(obj.row)">编辑</el-button>
        </template>
      </Classtable>
    </el-card>

    <!-- 编辑对话框 -->
    <Editdialog ref="editdialog" :visible.sync="editFormVisible" :form="editForm" @fetchAllData="handleSearch" />
  </div>
</template>

<script>
import Classtable from '@/components/class/table.vue'
import Editdialog from '@/components/class/editdialog.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport.vue'
import { operateClassList, importFile, downModule, exportExcel } from '@/api/class'
export default {
  components: {
    Classtable,
    Editdialog,
    TopBar,
    BulkImport,
    DownModule,
    BulkExport
  },
  data() {
    return {
      queryInfo: {},
      searchRules: {},
      editFormVisible: false,
      editForm: {},
      headers: 'classGradeId, classGradeName, classGradeLeader, status, createdBy, updatedBy'
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
    // 查询
    handleSearch() {
      this.$refs.classtable.fetchData(this.queryInfo)
    },
    // 重置
    handleReset() {
      this.queryInfo = {}
      this.handleSearch()
    },

    // 启用/禁用
    changeSecretaryStatus(row) {
      // const status = row.status
      row.status = row.status === 'ENABLED' ? 'DISABLED' : 'ENABLED'
      // status = status === 'ENABLED' ? 'DISABLED' : 'ENABLED'
      const { classGradeId, isDeleted, status } = row
      console.log({ classGradeId, isDeleted, status })
      operateClassList({ classGradeId, isDeleted, status }).then(res => {
        if (res.code === 200) {
          if (status === 'DISABLED') {
            this.$message.warning('禁用成功')
          } else {
            this.$message.success('启用成功')
          }
        }
        this.handleSearch()
      })
    },

    // 编辑数据
    handleEdit(row) {
      this.editFormVisible = true
      this.editForm = { ...row }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
