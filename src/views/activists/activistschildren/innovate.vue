<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 查询与新增区域 -->
      <top-bar class-name="top-div-left-menu-five">
        <!-- 左菜单 -->
        <template #btnLeft>
          <!-- 新增 -->
          <AddNew category="2" @confirmAdd="confirmAdd" />
          <!-- 批量导入 -->
          <BulkImport category="2" @handleSearch="handleSearch" />
          <!-- 下载模板 -->
          <DownModule file-name="384def80-808d-45f7-b85d-92a1312af41a.xlsx" original-filename="发展能力-创新创业模板.xlsx" />
          <!-- 批量导出 -->
          <BulkExport file-name="发展能力-创新创业.xlsx" :headers="headers" category="2" />
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
            v-model="queryInfo.userName"
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

      <!-- 导入文件提示 -->
      <div class="import-warning-tips">
        <svg-icon icon-class="gantan" />
        <span>批量导入仅支持 .xls/.xlsx 格式，大小不超过10M</span>
      </div>

      <!-- 表格区域 -->
      <InnoTable ref="innotablelist" />
    </el-card>
  </div>
</template>

<script>
import InnoTable from '@/components/inno/innoTable.vue'
import TopBar from '@/components/layout/topBar.vue'
import BulkImport from '@/components/BtnGroup/BulkImport.vue'
import DownModule from '@/components/BtnGroup/DownModule.vue'
import AddNew from '@/components/BtnGroup/AddNew.vue'
import BulkExport from '@/components/BtnGroup/BulkExport'
import BulkDelete from '@/components/BtnGroup/BulkDelete'
import { addNewOne } from '@/api/inno'
import { bulkDelete } from '@/api/file'

export default {
  components: {
    InnoTable,
    TopBar,
    BulkImport,
    DownModule,
    BulkExport,
    BulkDelete,
    AddNew
  },
  data() {
    return {
      branchOptionsChoose: window.$constant.branchOptions,
      classOptionsChooseOptions: window.$constant.classOptions,

      // 搜索条件表单
      queryInfo: {
        category: 2,
        classGradeName: '',
        partyBranchName: '',
        userName: ''
      },

      // 分页器元素总数
      total: 0,

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
    addNewOne,
    bulkDelete,

    // 查询积极分子创新创业信息列表
    handleSearch(clearSelection) {
      this.$nextTick(() => {
        this.$refs.innotablelist.fetchData(this.queryInfo, clearSelection)
      })
    },

    // 重置搜索条件
    handleReset() {
      this.queryInfo = {
        category: 2,
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
        this.$message.success('新增成功')
        console.log(res)
      }).catch(error => {
        this.$message.error('新增失败')
        console.log(error)
      })
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
