<template>
  <div>
    <!-- 列表区域 -->
    <el-table v-loading="tableListLoading" :data="list" style="width: 100%" stripe :row-key="(record) => record.developAbilityId" fit>
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
      <el-table-column align="center" label="创新创业内容" width="260">
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
export default {
  components: {
    EditDialog,
    DetailDialog
  },
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        category: 2,
        classGradeName: '',
        partyBranchName: '',
        userName: '',
        stuNo: ''
      },
      tableListLoading: false,
      list: [],
      total: 0,
      multipleSelection: [],
      dialogVisible: false,
      detailDialogvisible: false,
      form: {},
      infoList: {},
      flag: 0
    }
  },
  methods: {
    confirmEditInfo,
    fetchData(infoList) {
      this.tableListLoading = true
      if (this.flag === 0) {
        this.infoList = infoList
        this.queryInfo.stuNo = this.infoList.userName // 这里得到的是学号，之后会根据学号来查这个人的所有个人信息
        this.flag++
      }

      const { queryInfo } = this
      // console.log(queryInfo)
      getInnoList({ ...queryInfo }).then((res) => {
        this.list = res.rows
        // console.log(this.list)
        this.total = res.total
        this.tableListLoading = false
      })
    },

    // getStuInfo() {
    //   getInfo().then(response => {
    //     const { data } = response
    //     this.infoList = data
    //     console.log(this.infoList)
    //     this.queryInfo.stuNo = this.infoList.userName // 这里得到的是学号，之后会根据学号来查这个人的所有个人信息
    //   }).catch(error => {
    //     return new Error(error)
    //   })
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
