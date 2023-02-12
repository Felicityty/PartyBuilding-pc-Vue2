<template>
  <div>
    <!-- 活动列表区域 -->
    <el-table
      v-if="isTrue"
      ref="table"
      v-loading="tableListLoading"
      :data="userList"
      stripe
      style="width: 100%"
      fit
      :row-key="(record) => record.id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :reserve-selection="true" fixed="left" width="50" align="center" />
      <el-table-column fixed="left" label="序号" align="center" width="100">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (queryInfo.pageNum - 1) * queryInfo.pageSize }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" fixed="left">
        <template slot-scope="scope">
          {{ scope.row.screenName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.userRoleList[0] }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学号/工号">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号状态">
        <template slot-scope="scope">
          {{ scope.row.status === 'ENABLED' ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'ENABLED' ? true : false" type="danger" icon="el-icon-circle-close" :disabled="initBtn(scope.row)" @click="changeSecretaryStatus(scope.row)">禁用</el-button>
          <el-button v-if="scope.row.status === 'DISABLED' ? true : false" type="success" icon="el-icon-circle-check" :disabled="initBtn(scope.row)" @click="changeSecretaryStatus(scope.row)">启用</el-button>
          <el-button type="primary" icon="el-icon-edit" :disabled="initBtn(scope.row)" @click="handleEdit(scope.row)">编辑</el-button>
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

    <userEdit ref="userEditRef" :visible.sync="editFormVisible" :edit-form="editForm" :selectnum="selectnum" @fetchAllData="handleSearch" />

  </div>
</template>

<script>
import { getUserManageList, editUserList, editManageList } from '@/api/UserManage.js'
import Pagination from '@/components/layout/pagination'
import userEdit from '@/components/user/userEdit.vue'
export default {
  components: {
    Pagination,
    userEdit
  },
  props: {
    selectNum: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      roleOptions: window.$constant.roleOptions,
      roleStuOptions: window.$constant.roleStuOptions,
      tableListLoading: true,
      // 获取信息列表对象
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        // 总页数
        status: '',
        keyword: '',
        selectStu: 2
      },
      total: 0,
      option: {},
      userList: [],
      editFormVisible: false,
      editForm: {},
      multipleSelection: [],
      isTrue: true,
      selectnum: 0
    }
  },
  watch: {
    selectNum: {
      handler(newData) {
        this.queryInfo.selectStu = newData
        console.log('监听数据改变', this.queryInfo.selectStu)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.fetchData()
    this.selectnum = this.selectNum
  },
  methods: {
    initBtn(row) {
      if (this.$store.state.user.roles === 1 && row.userRoleList[0] !== '学生') {
        return true
      } else return false
    },
    fetchData(option = {}, clearSelection = 0) {
      this.tableListLoading = true
      console.log('selectNum', this.selectNum)
      this.queryInfo.selectStu = this.selectNum
      console.log('selectStu', this.queryInfo.selectStu)
      const { queryInfo } = this
      getUserManageList({ ...queryInfo, ...option }).then(res => {
        console.log('ooooooption', { ...queryInfo, ...option })
        // console.log(res)
        this.tableListLoading = false
        this.userList = res.rows
        this.total = res.total
      })
      if (clearSelection) {
        this.$nextTick(() => {
          this.$refs.table.clearSelection()
        })
      }
    },
    handleSearch() {
      this.fetchData()
    },
    // 编辑数据
    handleEdit(row) {
      console.log(row)
      this.editFormVisible = true
      let val = null
      if (this.selectNum === 2) {
        val = this.roleOptions.find(o => o.label === row.userRoleList[0])
      } else {
        val = this.roleStuOptions.find(o => o.label === row.userRoleList[0])
      }
      console.log(val)
      row.role = val.value
      this.editForm = { ...row }
      console.log('editForm', this.editForm)
    },
    // 启用/禁用
    changeSecretaryStatus(row) {
      let isEnable = 0
      if (row.status === 'ENABLED') {
        row.status = 'DISABLED'
        isEnable = 0
      } else {
        row.status = 'ENABLED'
        isEnable = 1
      }
      const { userName, status } = row
      if (this.$store.state.user.roles === 1) {
        editUserList({ userName, status }).then(res => {
          console.log('res', res)
          if (res.code === 200) {
            if (isEnable === 1) this.$message.success('启用成功')
            else this.$message.warning('禁用成功')
          }
          this.handleSearch()
        })
      } else if (this.$store.state.user.roles === 2) {
        editManageList({ userName, status }).then(res => {
          console.log('res', res)
          if (res.code === 200) {
            if (isEnable === 1) this.$message.success('启用成功')
            else this.$message.warning('禁用成功')
          }
          this.handleSearch()
        })
      }
    },
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
