<template>
  <div>
    <div class="import-warning-tips">
      <svg-icon icon-class="gantan" />
      <span>仅支持.xls、.xlsx格式,大小不超过10M</span>
    </div>

    <!-- 表格区域 -->
    <el-table ref="table" v-loading="listLoading" :data="SpecialityList" stripe class="width: 100%" fit :row-key="(record) => record.developAbilityId" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :reserve-selection="true" fixed="left" width="50" align="center" />
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (pagination.pageNum - 1) * pagination.pageSize }}
        </template>
      </el-table-column>
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
      <el-table-column align="center" label="内容" width="300">
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
      <el-table-column align="center" label="操作人" width="100">
        <template slot-scope="scope">
          {{ scope.row.updatedBy }}
        </template>
      </el-table-column>
      <el-table-column width="350" fixed="right" align="center" label="操作">
        <template #default="scope">
          <slot name="operator" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      v-show="total > 0"
      :page-sizes="[10,20,50]"
      :limit.sync="pagination.pageSize"
      :page.sync="pagination.pageNum"
      :total="total"
      @pagination="fetchData(option)"
    />
  </div>
</template>

<script>
import { getSpecialityList } from '@/api/speciality'
import Pagination from '@/components/layout/pagination'
export default {
  components: {
    Pagination
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
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      option: {},
      SpecialityList: [],
      multipleSelection: []
    }
  },
  methods: {
    fetchData(option = {}, clearSelection = 0) {
      this.listLoading = true
      this.option = option
      getSpecialityList({ ...this.option, ...this.pagination }).then((res) => {
        // console.log('speciality', res)
        this.SpecialityList = res.rows
        this.total = res.total
        this.listLoading = false
      })
      if (clearSelection) {
        this.$nextTick(() => {
          this.$refs.table.clearSelection()
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

<style lang="scss" scoped>
</style>
