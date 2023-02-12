<template>
  <div class="page-content">
    <el-pagination
      layout="sizes, prev, pager, next, jumper, ->, total"
      :page-sizes="pageSizes"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50]
      }
    },
    total: {
      required: true,
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log({ page: this.currentPage, limit: val })
      this.currentPage = 1
      this.$emit('pagination')
    },
    handleCurrentChange(val) {
      // console.log({ page: val, limit: this.pageSize })
      this.$emit('pagination')
    }
  }
}
</script>

<style scoped>
/* .page-content{
  text-align: right;
  margin: 10px 10px 0 0;
} */
</style>
