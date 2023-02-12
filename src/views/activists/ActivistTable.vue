<template>
  <div class="activist-table">
    <!-- 按钮菜单 -->
    <div v-if="$slots.btnLeft || $slots.btnRight" style="padding:5px 10px; display:flex; justify-content: flex-end">
      <div class="left" style="display:flex; margin-right: auto">
        <slot name="btnLeft" />
      </div>
      <div class="right" style="display:flex">
        <slot name="btnRight" />
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      ref="tableInstance"
      v-loading="loading"
      :data="tableData"
      style="width:100%"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @row-click="handleRowClick"
    ><slot /></el-table>

    <!-- 换页 -->
    <el-pagination
      :total="tableCount"
      :page-size="pageData.limit"
      :current-page.sync="pageData.page"
      flex="justify:center"
      style="margin: 1%"
      hide-on-single-page
      @current-change="handlePageChange"
    />

  </div>
</template>

<script>
export default {
  name: 'ActivistTable',
  props: {
    // 接口(请求数据)
    // fetchData: {
    //   require: true,
    //   type: Function
    // },

    // 分页参数
    pageData: {
      type: Object,
      default: function() {
        return {
          limit: 10,
          page: 1
        }
      }
    },

    // 查询参数
    queryInfo: {
      type: Object,
      default: function() {
        return {}
      }
    },

    /**
     * 导出配置
     * api: 接口(导出)
     * noPage: 导出时是否不分页
     */
    exportConfig: {
      type: Object,
      default: function() {
        return {
          export: null,
          noPage: false
        }
      }
    }
  },
  data() {
    return {
      loading: false, // loading状态
      tableCount: 10, // row数量
      tableData: [] // row数据
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    /**
     * 获取数据
     */
    getData() {
      this.tableData = []
      this.loading = true
      this.fetchData(this.pageData.page)
        .then((res) => {
          this.loading = false
          this.tableData = res.data.list || []
          this.tableCount = res.data.total || 0
          this.$emit('load-finish', res)
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },

    /**
     * 重新加载 Data
     */
    reload() {
      this.getData()
    },

    /**
     * 查询数据
     */
    query() {
      console.log(this.queryInfo)
    },

    /**
     * 下载
     */
    download() {
      this.exportConfig.export(this.exportConfig.noPage)
        .then((res) => {
          console.log('insert download coding here')
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // 换页
    handlePageChange(page) {
      this.pageData.page = page
      this.getData()
    },

    // 单选框
    handleCurrentChange(row, oldrow) {
      this.$emit('currentChange', row, oldrow)
    },

    // 多选框
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },

    // 行点击
    handleRowClick(row, event, column) {
      this.$emit('rowClick', row, event, column)
    },

    // 排序
    handleSortChange({ column, prop, order }) {
      this.$emit('sortChange', column, prop, order)
    }
  }
}
</script>

<style>

</style>
