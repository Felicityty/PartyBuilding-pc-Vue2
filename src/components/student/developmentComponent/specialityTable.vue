<template>
  <div>
    <!-- 表格区域 -->
    <el-table v-loading="listLoading" :data="SpecialityList" stripe class="width: 100%">
      <el-table-column width="120" fixed="left" align="center" label="姓名">
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
      <el-table-column align="center" label="个体特长内容" width="260">
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
      <el-table-column width="350" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="success" icon="el-icon-view" @click="handleCheck(scope.row)">查看</el-button>
            <el-button type="primary" icon="el-icon-delete" class="el-button-delete-search" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

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
import { getSpecialityList, editSpecialityList, deleteSpecialityList } from '@/api/speciality'
import DetailDialog from '@/components/BtnGroup/CheckDetail.vue'
import EditDialog from '@/components/BtnGroup/EditDialog.vue'
export default {
  components: {
    EditDialog,
    DetailDialog
  },
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 10) + '...'
      }
      return value
    }
  },
  data() {
    return {
      listLoading: true,
      queryInfo: {
        pageNum: 1,
        pageSize: 11,
        category: 4,
        classGradeName: '',
        partyBranchName: '',
        userName: '',
        stuNo: ''
      },
      total: 0,
      SpecialityList: [],
      dialogVisible: false,
      detailDialogvisible: false,
      form: {},
      infoList: {},
      flag: 0
    }
  },
  methods: {
    editSpecialityList,
    fetchData(infoList) {
      this.listLoading = true
      if (this.flag === 0) {
        this.infoList = infoList
        this.queryInfo.stuNo = this.infoList.userName // 这里得到的是学号，之后会根据学号来查这个人的所有个人信息
        this.flag++
      }

      getSpecialityList({ ...this.queryInfo }).then((res) => {
        console.log('speciality', res)
        this.SpecialityList = res.rows
        this.total = res.total
        this.listLoading = false
      })
    },
    // 详细信息
    handleCheck(row) {
      this.detailDialogvisible = true
      this.form = { ...row }
    },
    // 编辑
    handleEdit(row) {
      this.handleChange()
      this.form = {
        ...row
      }
      console.log(this.form)
    },
    handleChange() {
      this.dialogVisible = !this.dialogVisible
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
