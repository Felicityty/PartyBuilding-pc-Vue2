<template>
  <div>
    <div class="import-warning-tips">
      <svg-icon icon-class="gantan" />
      <span>仅支持.xls、.xlsx格式,大小不超过10M</span>
    </div>

    <!-- 表格区域 -->
    <el-table v-loading="listLoading" :data="ClassList" stripe fit style="width: 100%">
      <el-table-column fixed="left" width="50" label="序号" align="center">
        <template slot-scope="scope">
          {{ (scope.$index + 1) + (pagination.pageNum - 1) * pagination.pageSize }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级名称">
        <template slot-scope="scope">
          {{ scope.row.classGradeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="班主任">
        <template slot-scope="scope">
          {{ scope.row.classGradeLeader }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === "ENABLED" ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column width="250" align="center" label="操作">
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
import { getClassList } from '@/api/class'
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
      ClassList: []
    }
  },
  methods: {
    fetchData(option = {}) {
      this.listLoading = true
      this.option = option
      getClassList({ ...this.option, ...this.pagination }).then((res) => {
        console.log('class', res)
        this.ClassList = res.rows
        this.total = res.total
        this.listLoading = false
      })
    }
  }
}
</script>
