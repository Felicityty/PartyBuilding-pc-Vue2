<template>
  <div>
    <AddNew :info-list="infoList" @confirmAdd="confirmAdd" />
    <div />
    <div>
      <div>
        <el-tag type="" class="user-develop-tag">活动参与</el-tag>
        <!-- 活动参与table -->
        <ActivityTable ref="activitytable" />
      </div>

      <div class="temp-placeholder" />

      <div>
        <el-tag type="" class="user-develop-tag">创新创业</el-tag>
        <!-- 创新创业table -->
        <InnoTable ref="innotable" />
      </div>

      <div class="temp-placeholder" />

      <div>
        <el-tag type="" class="user-develop-tag">个人荣誉</el-tag>
        <!-- 个人荣誉table -->
        <HonorTable ref="honortable" />
      </div>

      <div class="temp-placeholder" />

      <div>
        <el-tag type="" class="user-develop-tag">个体特长</el-tag>
        <!-- 个体特长table -->
        <SpecialityTable ref="specialitytable" />
      </div>

      <div class="temp-placeholder" />

      <div>
        <el-tag type="" class="user-develop-tag">组织协调</el-tag>
        <!-- 组织协调table -->
        <CoordinationTable ref="coordinationtable" />
      </div>

    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import { addNewOne } from '@/api/student'
import AddNew from '@/components/student/developmentComponent/AddNew.vue'
import ActivityTable from '@/components/student/developmentComponent/activityTable.vue'
import InnoTable from '@/components/student/developmentComponent/innoTable.vue'
import HonorTable from '@/components/student/developmentComponent/honorTable.vue'
import SpecialityTable from '@/components/student/developmentComponent/specialityTable.vue'
import CoordinationTable from '@/components/student/developmentComponent/coordinationTable.vue'

export default {
  components: {
    AddNew,
    ActivityTable,
    InnoTable,
    HonorTable,
    SpecialityTable,
    CoordinationTable
  },
  data() {
    return {
      infoList: {}
    }
  },
  mounted() {
    this.handleGet()
  },
  methods: {
    addNewOne,
    async handleGet() {
      try {
        const { data } = await getInfo()
        this.infoList = data
        console.log(this.infoList)
        // this.queryInfo.stuNo = this.infoList.userName // 这里得到的是学号，之后会根据学号来查这个人的所有个人信息
      } catch (error) {
        return new Error(error)
      }

      this.$nextTick(() => {
        this.$refs.activitytable.fetchData(this.infoList)
        this.$refs.innotable.fetchData(this.infoList)
        this.$refs.honortable.fetchData(this.infoList)
        this.$refs.specialitytable.fetchData(this.infoList)
        this.$refs.coordinationtable.fetchData(this.infoList)
      })
    },

    confirmAdd(form) {
      console.log(form)
      this.addNewOne(form).then(res => {
        this.handleGet()
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

<style>

</style>
