<template>
  <div>
    <el-card>
      <TopBar class-name="top-div-left-menu-five">
        <!-- 左菜单 -->
        <template #btnLeft>
          <AddNew category="4" @confirmAdd="confirmAdd" />
          <BulkImport category="4" @handleSearch="handleSearch" />
          <DownModule file-name="cbd1a78f-2bd1-49bb-bbd2-e9481d8a439d.xlsx" original-filename="发展能力-个体特长模板.xlsx" />
          <!-- 批量导出 -->
          <BulkExport file-name="发展能力-个体特长.xlsx" :headers="headers" category="4" />
          <!-- 批量删除 -->
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

      <Specialitytable ref="specialitytable">
        <template #operator="obj">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(obj.row)">编辑</el-button>
          <el-button type="success" icon="el-icon-view" @click="handleCheck(obj.row)">查看</el-button>
          <el-button type="danger" icon="el-icon-delete" class="el-button-delete-search" @click="handleDelete(obj.row)">删除</el-button>
        </template>
      </Specialitytable>
    </el-card>

    <!-- 编辑 -->
    <Editdialog ref="editdialog" :edit-dialog-visible="editFormVisible" :form="editForm" @change="handleChange()" @fetchAllData="handleSearch()" />

    <!-- 查看 -->
    <Checkdialog ref="checkdialog" :detail-dialogvisible.sync="checkFormVisible" :check-form="checkForm" />
  </div>
</template>

<script>
import Specialitytable from '@/components/speciality/table.vue'
import AddNew from '@/components/BtnGroup/AddNew.vue'
import Editdialog from '@/components/BtnGroup/EditDialog.vue'
import Checkdialog from '@/components/BtnGroup/CheckDetail.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport'
import BulkDelete from '@/components/BtnGroup/BulkDelete'
import { addSpecialityList, deleteSpecialityList } from '@/api/speciality'
import { bulkDelete } from '@/api/file'

export default {
  components: {
    Specialitytable,
    AddNew,
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
      queryInfo: {
        category: 4,
        classGradeName: null
      },
      addFormVisible: false,
      editFormVisible: false,
      importFormVisible: false,
      dialogVisible: false,
      editForm: {},
      checkFormVisible: false,
      checkForm: {},
      headers: 'developAbilityId, userName, classGradeName, partyBranchName, contentJson, score, createdBy, createdTime, updatedBy, updatedTime'
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
    bulkDelete,

    handleSearch(clearSelection) {
      this.$refs.specialitytable.fetchData(this.queryInfo, clearSelection)
    },
    // 重置条件查询
    handleReset() {
      this.queryInfo = {
        category: 4,
        classGradeName: null
      }
      this.handleSearch()
    },
    // 新增
    confirmAdd(form) {
      console.log(form)
      addSpecialityList(form).then(res => {
        this.$message.success('新增成功')
        this.handleSearch()
      }).catch(error => {
        this.$message.error('新增失败')
        console.log(error)
      })
    },
    // 编辑数据
    handleEdit(row) {
      this.handleChange()
      this.editForm = { ...row }
    },
    handleChange() {
      this.editFormVisible = !this.editFormVisible
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
        deleteSpecialityList({
          Id: row.developAbilityId
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
