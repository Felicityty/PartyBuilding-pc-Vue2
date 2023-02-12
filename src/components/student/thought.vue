<template>
  <div>
    <el-button type="primary" icon="el-icon-upload2" class="el-button-io" @click="addDialogVisible = true">思想汇报</el-button>

    <!-- 提示区域 -->
    <div class="import-warning-tips">
      <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>ic_page_prompt</title>
        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="2_内页" transform="translate(-260.000000, -137.000000)" fill="#E14E4E" fill-rule="nonzero">
            <g id="编组-17" transform="translate(260.000000, 133.000000)">
              <g id="ic_page_prompt" transform="translate(0.000000, 4.000000)">
                <path id="形状" d="M6.97175083,0.014486755 C3.10197641,0.014486755 0.014486755,3.10197641 0.014486755,6.97175083 C0.014486755,10.8415252 3.10197641,13.9290149 6.97175083,13.9290149 C10.8415252,13.9290149 13.9290149,10.8415252 13.9290149,6.97175083 C13.9290149,3.10197641 10.8415252,0.014486755 6.97175083,0.014486755 Z M6.44298427,3.62349959 C6.58785182,3.47863204 6.71098924,3.38265728 6.94458816,3.38265728 C7.20534975,3.362738 7.44619205,3.48587541 7.5421668,3.67058154 C7.65262831,3.80096233 7.71419702,4.09069743 7.68703435,4.2609168 C7.68703435,4.3098096 7.65262831,4.6321399 7.63814156,4.72087127 L7.44619205,7.16188949 C7.44619205,7.40273179 7.39729925,7.64357409 7.3013245,7.82828022 C7.25243171,7.97314776 7.109375,8.06912252 6.91561465,8.06912252 C6.7707471,8.06912252 6.6276904,7.97314776 6.5787976,7.82828022 C6.48282285,7.58743791 6.43393005,7.39548841 6.43393005,7.16188949 L6.30354925,4.76976407 C6.25465646,4.33697227 6.25465646,4.48183982 6.25465646,4.24099752 C6.2564673,4.00920944 6.3053601,3.81544909 6.44298427,3.62349959 L6.44298427,3.62349959 Z M7.50051738,10.367084 C7.35564983,10.5119516 7.16370033,10.5590335 7.01883278,10.5590335 C6.82688328,10.5590335 6.63312293,10.5101407 6.49006623,10.367084 C6.34519868,10.2222165 6.24922392,10.030267 6.24922392,9.79666805 C6.24922392,9.60471854 6.29811672,9.4109582 6.44117343,9.26790149 C6.58604098,9.12303394 6.77799048,9.02705919 6.96993998,9.02705919 C7.16188949,9.02705919 7.35564983,9.12303394 7.49870654,9.26790149 C7.64357409,9.41276904 7.69065604,9.60471854 7.69065604,9.79666805 C7.68703435,10.030267 7.63814156,10.2222165 7.50051738,10.367084 Z" />
              </g>
            </g>
          </g>
        </g>
      </svg>
      <span>批量导入仅支持 pdf 格式，大小不超过10M</span>
    </div>

    <!-- 列表区域 -->
    <ThoughTable ref="thoughtable" @fetchAllData="handleGet" />

    <!-- 上传文件对话框 -->
    <AddDialog :add-dialog-visible.sync="addDialogVisible" @fetchAllData="handleGet" />
  </div>
</template>

<script>
import ThoughTable from '@/components/student/thoughComponent/thoughTable.vue'
import AddDialog from '@/components/student/thoughComponent/addDialog.vue'

export default {
  components: {
    ThoughTable,
    AddDialog
  },
  data() {
    return {
      addDialogVisible: false
    }
  },
  mounted() {
    this.handleGet()
  },
  methods: {
    // 获取思想素质模块数据
    handleGet() {
      this.$refs.thoughtable.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
