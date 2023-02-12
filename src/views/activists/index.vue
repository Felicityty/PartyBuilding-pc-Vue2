<template>
  <div>
    <!-- 顶部搜索内容 -->
    <el-card>
      <top-bar class-name="top-div-left-menu">
        <!-- 左菜单 -->
        <template #btnLeft>
          <!-- 批量导入 -->
          <!-- 关于积极分子库这里 积极分子情况 和 党校结业情况 两部分导入excel的问题，积极分子情况里的都是未结业的所以，想往这里导入的时候党校结业情况那需要填写 未结业 ， 而党校结业情况里的都是已结业的，所以导入时党校结业情况那填已结业就会把表导入到党校结业情况那，党校结业情况这个字段就是迎来区分导入到这两个部分中的哪一个部分的 -->
          <BulkImport :upload="upload" @handleSearch="handleSearch" />
          <!-- 下载模板 -->
          <DownModule file-name="8b52ffd9-4edc-4417-bb13-1c772ed786b8.xlsx" original-filename="积极分子库模板.xlsx" />
          <!-- 批量导出 -->
          <BulkExport :export="exportExcel" file-name="积极分子库.xlsx" :headers="headers" />
          <!-- 批量删除 -->
          <BulkDelete :bulk-delete="bulkDelete" @handleSearch="handleSearch" />
        </template>

        <!-- 右菜单 -->
        <template #btnRight>
          <el-select
            v-model="queryInfo.partyBranchName"
            placeholder="全部支部"
            class="el-select-branch"
          >
            <el-option
              v-for="item in branchOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>

          <el-select
            v-model="queryInfo.classGradeName"
            placeholder="全部班级"
            class="el-select-class"
          >
            <el-option
              v-for="item in classOptionsChoose"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-input
            v-model="queryInfo.activistName"
            placeholder="姓名"
            class="el-input-name"
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

      <div class="middle-div">
        <div class="import-warning-tips">
          <svg-icon icon-class="gantan" />
          <span>批量导入仅支持 .xls/.xlsx 格式，大小不超过10M</span>
        </div>

        <el-switch
          v-model="nowCard"
          :active-value="1"
          :inactive-value="0"
          active-text="党校结业情况"
          inactive-text="积极分子情况"
          class="elcard-switch"
          @change="switchCard"
        />
      </div>

      <!-- 积极分子情况的卡片视图区域 -->
      <template v-if="!nowCard">
        <Activist ref="activist" @fetchAllData="handleSearch" />
      </template>
      <!-- 党校结业情况的卡片视图区域 -->
      <template v-else>
        <Graduation ref="graduation" @fetchAllData="handleSearch" />
      </template>
    </el-card>
  </div>
</template>

<script>
import Activist from '@/components/activists/activist.vue'
import Graduation from '@/components/activists/graduation.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import BulkExport from '@/components/BtnGroup/BulkExport.vue'
import BulkDelete from '@/components/BtnGroup/BulkDelete.vue'
import { upload, downModule, exportExcel, bulkDelete } from '@/api/activist.js'

export default {
  components: {
    Activist,
    Graduation,
    TopBar,
    BulkImport,
    DownModule,
    BulkExport,
    BulkDelete
  },
  data() {
    return {
      // 将common里面的常用的语句挂载到全局，在main.js里引入，然后，就可以通过window拿到common里面的数据
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,
      // 积极分子情况卡片部分
      queryInfo: {
        activistName: '',
        classGradeName: '',
        partyBranchName: ''
      },
      total: 0,
      nowCard: 0,
      // 导出Excel文件的头部
      headers: 'activistId, activistName, classGradeName, partyBranchName, confirmDate, courseCompletion, completeDate, createdBy, updatedBy'
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
    upload,
    downModule,
    exportExcel,
    bulkDelete,

    handleSearch(clearSelection) {
      // 触发子组件里的fetchData方法时将当前页面的queryInfo传递过去
      if (!this.nowCard) this.$refs.activist.fetchData(this.queryInfo, clearSelection)
      else this.$refs.graduation.fetchData(this.queryInfo, clearSelection)
    },
    handleReset() {
      this.queryInfo = {
        activistName: '',
        classGradeName: '',
        partyBranchName: ''
      }
      this.handleSearch()
    },
    // 监听开关控制两个卡片的切换
    switchCard(e) {
      // 切换后查询，切换switch保留搜索框里的内容
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    // 批量删除
    handleMultiDelete() {

    }
  }
}
</script>

<style lang="scss" scoped>
.elcard-switch {
  // margin-top: 15px;
  margin-bottom: 10px;
  width: 250px;
}
.middle-div {
  display: flex;
  justify-content: space-between;

  .import-warning-tips {
    width: 350px;
    margin-top: 0 !important;
  }
}
</style>
