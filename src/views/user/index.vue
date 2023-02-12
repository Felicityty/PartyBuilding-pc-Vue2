<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-tabs v-model="user">
        <el-tab-pane label="管理员" name="first">
          <TopBar class-name="top-div-left-menu-ide">
            <!-- 左菜单 -->
            <template #btnLeft>
              <userAdd ref="userAddRef" :visible.sync="addFormVisible" :user="user" :role-limit="initBtn" @fetchAllData="handleSearch" />
              <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" class="el-button-io" @click="handleAdd" :disabled="initBtn">新增</el-button> -->
              <BulkDelete :bulk-delete="bulkDelete" :role-limit="initBtn" @handleSearch="handleSearch" />
            </template>

            <!-- 右菜单 -->
            <template #btnRight>
              <el-input v-model="queryInfo.keyword" placeholder="姓名/工号/学号" class="el-input-name" />
              <el-button type="primary" class="el-button-delete-search" @click="handleSearch">查询</el-button>
              <el-button type="primary" class="el-button-delete-search" @click="handleReset">重置</el-button>
            </template>
          </TopBar>
          <div class="import-warning-tips">
            <svg-icon icon-class="gantan" />
            <span>批量导入仅支持 .xls/.xlsx 格式，大小不超过10M</span>
          </div>

          <userTable ref="userTableRef1" :select-num="2" />
        </el-tab-pane>

        <el-tab-pane label="学生" name="second">
          <TopBar class-name="top-div-left-menu-user">
            <!-- 左菜单 -->
            <template #btnLeft>
              <!-- <AddNew/> -->
              <userAdd ref="userAddRef" :visible.sync="addFormVisible" :user="user" @fetchAllData="handleSearch" />
              <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" class="el-button-io" @click="handleAdd">新增</el-button> -->
              <BulkImport :upload="bulkImport" @handleSearch="handleSearch" />
              <DownModule file-name="767abc86-757b-488a-88fc-622a3f876a34.xlsx" original-filename="用户管理模板.xlsx" />
              <BulkDelete :bulk-delete="bulkDelete" @handleSearch="handleSearch" />
            </template>

            <!-- 右菜单 -->
            <template #btnRight>
              <el-input v-model="queryInfo.keyword" placeholder="姓名/工号/学号" class="el-input-name" />
              <el-button type="primary" class="el-button-delete-search" @click="handleSearch">查询</el-button>
              <el-button type="primary" class="el-button-delete-search" @click="handleReset">重置</el-button>
            </template>
          </TopBar>
          <div class="import-warning-tips">
            <svg-icon icon-class="gantan" />
            <span>批量导入仅支持 .xls/.xlsx 格式，大小不超过10M</span>
          </div>

          <userTable ref="userTableRef2" :select-num="1" />
        </el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>

<script>
import { downModule, bulkImport, bulkDeleteSuper, bulkDeleteNormal } from '@/api/UserManage'
import TopBar from '@/components/layout/topBar.vue'
import userTable from '@/components/user/userTable.vue'
import userAdd from '@/components/user/userAdd.vue'
import BulkImport from '@/components/BtnGroup/BulkImport'
import DownModule from '@/components/BtnGroup/DownModule'
import BulkDelete from '@/components/BtnGroup/BulkDelete'
export default {
  components: {
    TopBar,
    userTable,
    userAdd,
    BulkImport,
    DownModule,
    BulkDelete
  },
  data() {
    return {
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        // 总页数
        status: '',
        keyword: ''
      },
      addFormVisible: false,
      user: 'first'
    }
  },
  computed: {
    bulkDelete() {
      if (this.$store.state.user.roles === 1) {
        return bulkDeleteNormal
      } else {
        return bulkDeleteSuper
      }
    },
    initBtn() {
      if (this.$store.state.user.roles === 1) {
        return true
      } else return false
    }
  },
  created() {
    this.constant.getOptions()
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    downModule,
    bulkImport,
    bulkDeleteSuper,
    bulkDeleteNormal,

    // 查询
    handleSearch(clearSelection) {
      this.$refs.userTableRef1.fetchData(this.queryInfo, clearSelection)
      this.$refs.userTableRef2.fetchData(this.queryInfo, clearSelection)
      console.log('fetch成功')
    },

    // 重置
    handleReset() {
      this.queryInfo = {}
      this.handleSearch()
    },

    // 新增数据
    handleAdd() {
      this.addFormVisible = true
    }
  }
}
</script>

<style scoped>
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  }

  .el-table {
    margin-top: 20px;
  }

  .el-pagination {
    margin-top: 30px;
  }

  .el-link {
    margin-right: 20px;
  }

  .el-input-name {
    width: 50%;
  }
</style>
