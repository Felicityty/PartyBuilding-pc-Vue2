<template>
  <div>
    <div class="import-warning-tips">
      <svg-icon icon-class="gantan" />
      <span>仅支持.xls、.xlsx格式,大小不超过10M</span>
    </div>

    <!-- 表格区域 -->
    <el-table ref="table" v-loading="listLoading" :data="AcademicList" stripe fit style="width: 100%" :row-key="(record) => record.academicQualitiesId" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :reserve-selection="true" fixed="left" width="50" align="center" />
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (pagination.pageNum - 1) * pagination.pageSize }}
        </template>
      </el-table-column>
      <el-table-column width="100" fixed="left" align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级名称" width="300">
        <template slot-scope="scope">
          {{ scope.row.classGradeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支部名称" width="250">
        <template slot-scope="scope">
          {{ scope.row.partyBranchName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学业素质分" width="150">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作时间" width="250">
        <template slot-scope="scope">
          {{ scope.row.updatedTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人" width="150">
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
import { getAcademicList } from '@/api/academic'
import Pagination from '@/components/layout/pagination'
export default {
  components: {
    Pagination
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
      AcademicList: [],
      multipleSelection: []
    }
  },
  methods: {
    fetchData(option = {}, clearSelection = 0) {
      this.listLoading = true
      this.option = option
      getAcademicList({ ...this.option, ...this.pagination }).then((res) => {
        // console.log('academic', res)
        this.AcademicList = res.rows
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
