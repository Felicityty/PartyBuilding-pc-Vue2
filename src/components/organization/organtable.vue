<template>
  <div>
    <!-- 顶部菜单条
    <el-row style="margin-bottom: 2%">
      <div class="right" style="text-align: right; margin-right: 2%">
        <slot name="btnRight" />
      </div>
    </el-row> -->

    <el-table v-loading="tableListLoading" :data="organList" style="width: 100%" stripe fit>
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (queryInfo.pageNum - 1) * queryInfo.pageSize }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支部名称">
        <template slot-scope="scope">
          {{ scope.row.partyBranchName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支部书记">
        <template slot-scope="scope">
          {{ scope.row.partyBranchLeader }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === "ENABLED" ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column prop="operate" align="center" label="操作" width="250">
        <template slot-scope="scope">
          <div>
            <el-button v-if="scope.row.status === 'ENABLED' ? true : false" type="danger" icon="el-icon-circle-close" @click="changeSecretaryStatus(scope.row)">禁用</el-button>
            <el-button v-if="scope.row.status === 'DISABLED' ? true : false" type="success" icon="el-icon-circle-check" @click="changeSecretaryStatus(scope.row)">启用</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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
    <EditDialog ref="editdialog" :dialogvisible="dialogVisible" :organform="form" @change="handleChange" @fetchData="fetchData" />
  </div>
</template>

<script>
import { getOrganList, changeStatus } from '@/api/organ'
import EditDialog from '@/components/organization/editDialog.vue'
import Pagination from '@/components/layout/pagination'
export default {
  components: {
    EditDialog,
    Pagination
  },
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tableListLoading: false,
      organList: [],
      total: 0,
      dialogVisible: false,
      form: {},
      option: {}
    }
  },
  mounted() {

  },
  methods: {
    fetchData(option = {}) {
      // option就是父组件用自定义事件传递过来的 输入框的queryInfo
      console.log({ ...option })
      this.tableListLoading = true
      this.option = option
      const { queryInfo } = this
      getOrganList({ ...option, ...queryInfo }).then((res) => {
        console.log(res)
        this.organList = res.rows
        this.total = res.total
        this.tableListLoading = false
      })
    },

    // 编辑数据
    handleEdit(row) {
      this.handleChange()
      this.form = { ...row }
      console.log(this.form)
      // this.form.confirmDate = new Date(this.form.confirmDate)
    },
    // 专门控制对话框开关
    handleChange() {
      this.dialogVisible = !this.dialogVisible
      console.log(this.dialogVisible)
    },

    // 启用/禁用组织支部书记状态
    changeSecretaryStatus(row) {
      console.log(row)
      const status = row.status
      const id = row.partyBranchId
      const data = { 'isDeleted': 0 }
      data.partyBranchId = id
      data.status = status === 'ENABLED' ? 'DISABLED' : 'ENABLED'
      console.log(data)
      return new Promise((resolve, reject) => {
        // this.$store.dispatch('organ/changeOrganStatus', data).then(response => {
        changeStatus(data).then(response => {
          console.log(response)
          if (status === 'ENABLED') {
            this.$message.warning('禁用成功')
          } else {
            this.$message.success('启用成功')
          }
          this.fetchData()
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}
</script>

<style>

</style>
