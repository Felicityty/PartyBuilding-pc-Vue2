<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <top-bar class-name="top-div-left-menu-organ">
        <!-- 左菜单 -->
        <template #btnLeft>
          <!-- 批量导入 -->
          <BulkImport :upload="upload" @handleSearch="handleSearch" />
          <!-- 下载模板 -->
          <DownModule file-name="9f060f0a-d190-487e-90e7-f5d34e4448d7.xlsx" original-filename="支部组织管理模板.xlsx" />
          <!-- 批量导出 -->
          <BulkExport :export="exportExcel" file-name="支部组织管理.xlsx" :headers="headers" />
        </template>

        <!-- 右菜单 -->
        <template #btnRight>
          <el-select
            v-model="queryInfo.partyBranchName"
            placeholder="全部支部"
            class="el-select-organ-branch"
          >
            <el-option
              v-for="item in branchOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-input
            v-model="queryInfo.partyBranchLeader"
            placeholder="支部书记"
            class="el-input-leader-name"
          />
          <el-button
            type="primary"
            class="el-button-delete-search"
            @click="handleSearch"
          >查询</el-button>
          <el-button
            type="primary"
            class="el-button-delete-search"
            @click="handleReset"
          >重置</el-button>
        </template>
      </top-bar>

      <!-- 导入文件提示 -->
      <div class="import-warning-tips">
        <svg-icon icon-class="gantan" />
        <span>批量导入仅支持 .xls/.xlsx 格式，大小不超过10M</span>
      </div>

      <!-- 表格区域 -->
      <organtable ref="organtable" />

    </el-card></div>
</template>

<script>
import Organtable from '@/components/organization/organtable.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport.vue'
import { upload, downModule, exportExcel } from '@/api/organ.js'

export default {
  components: {
    Organtable,
    BulkImport,
    DownModule,
    BulkExport,
    TopBar
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,

      // 查询参数
      queryInfo: {
        partyBranchName: '',
        partyBranchLeader: ''
      },

      // 分页器total
      total: 0,

      // 编辑对话框的控制
      editDialogVisible: false,

      // 支部组织管理导出表头
      headers: ' partyBranchId, partyBranchName, partyBranchLeader, status, createdBy, updatedBy'
    }
  },
  created() {
    this.constant.getOptions()
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    upload,
    downModule,
    exportExcel,

    handleSearch() {
      this.$refs.organtable.fetchData(this.queryInfo)
    },

    handleReset() {
      this.queryInfo = {
        partyBranchName: '',
        partyBranchLeader: ''
      }
      this.handleSearch()
    },

    // 专门控制对话框开关
    handleChange() {
      this.addDialogVisible = !this.addDialogVisible
      console.log(this.addDialogVisible)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
