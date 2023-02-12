<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <TopBar class-name="top-div-left-menu-five">
        <!-- 左菜单 -->
        <template #btnLeft>
          <AddNew category="1" @confirmAdd="confirmAdd" />
          <BulkImport category="1" @handleSearch="handleSearch" />
          <!-- <el-button type="primary" icon="el-icon-plus" class="el-button-io" @click="ImportFormVisible = true">批量导入</el-button> -->
          <!-- <el-button type="primary" icon="el-icon-download" class="el-button-io">下载模板</el-button> -->
          <DownModule file-name="3e77657a-28d0-43cd-b701-f5759a7b950c.xlsx" original-filename="发展能力-活动参与模板.xlsx" />
          <BulkExport file-name="发展能力-活动参与.xlsx" :headers="headers" category="1" />
          <BulkDelete :bulk-delete="bulkDelete" @handleSearch="handleSearch" />
        </template>

        <!-- 右菜单 -->
        <template #btnRight>
          <el-select v-model="queryInfo.partyBranchName" placeholder="全部支部" class="el-select-branch" @change="branchSelect()">
            <el-option
              v-for="item in branchOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-select v-model="queryInfo.classGradeName" placeholder="全部班级" class="el-select-class">
            <el-option
              v-for="item in classOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-input v-model="queryInfo.userName" placeholder="姓名" class="el-input-name" />
          <el-button type="primary" class="el-button-delete-search" @click="handleSearch">查询</el-button>
          <el-button type="primary" class="el-button-delete-search" @click="reset()">重置</el-button>
        </template>
      </TopBar>
      <div class="import-warning-tips">
        <svg-icon icon-class="gantan" />
        <span>批量导入仅支持 .xls/.xlsx 格式，大小不超过10M</span>
      </div>

      <activityTable ref="acitivityRef" />

    </el-card>

  </div>
</template>

<script>
import options from '@/common/index.js'
import TopBar from '@/components/layout/topBar.vue'
import AddNew from '@/components/BtnGroup/AddNew.vue'
import activityTable from '@/components/activity/activityTable.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport'
import BulkDelete from '@/components/BtnGroup/BulkDelete'
import { addNewOne } from '@/api/inno'
import { bulkDelete } from '@/api/file'

export default {
  components: {
    TopBar,
    AddNew,
    activityTable,
    BulkImport,
    DownModule,
    BulkExport,
    BulkDelete
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      tableListLoading: true,
      // 获取信息列表对象
      queryInfo: {
        category: 1,
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        classGradeName: '',
        partyBranchName: '',
        userName: ''
      },
      total: 0,
      options,
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
  methods: {
    addNewOne,
    bulkDelete,

    branchSelect() {
      this.queryInfo.classGradeName = ''
      console.log(this.queryInfo)
    },
    // 重置
    reset() {
      this.queryInfo = {
        category: 1,
        pageNum: 1,
        pageSize: 10,
        classGradeName: '',
        partyBranchName: '',
        userName: ''
      }
      this.handleSearch()
    },
    // 新增按钮的实现
    confirmAdd(form) {
      console.log(form)
      this.addNewOne(form).then(res => {
        this.handleSearch()
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    handleSearch(clearSelection) {
      this.$nextTick(() => {
        this.$refs.acitivityRef.fetchData(this.queryInfo, clearSelection)
      })
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

  .huanhang {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
