<template>
  <div class="el-tab-first-div">
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>姓名：</span><el-tag class="user-info-tag">{{ infoList.screenName === null ? '暂无' : infoList.screenName }}</el-tag></el-col>
      <el-col :span="10"><span>学号：</span><el-tag class="user-info-tag">{{ infoList.userName === null ? '暂无' : infoList.userName }}</el-tag></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>年级：</span><el-tag class="user-info-tag">{{ infoList.grade === null ? '暂无' : infoList.grade }}</el-tag></el-col>
      <el-col :span="10"><span>专业：</span><el-tag class="user-info-tag">{{ infoList.major === null ? '暂无' : infoList.major }}</el-tag></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>支部：</span><el-tag class="user-info-tag">{{ infoList.branch === null ? '暂无' : infoList.branch }}</el-tag></el-col>
      <el-col :span="10"><span>班级：</span><el-tag class="user-info-tag">{{ infoList.classGrade === null ? '暂无' : infoList.classGrade }}</el-tag></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>确定积极分子时间：</span><el-tag class="user-info-tag">{{ stuScore.confirmDate === null ? '暂无' : stuScore.confirmDate }}</el-tag></el-col>
      <el-col :span="10"><span>党校结业时间：</span><el-tag class="user-info-tag">{{ stuScore.completeDate === null ? '暂无' : stuScore.completeDate }}</el-tag></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>学业素质分：</span><el-tag class="user-info-tag">{{ stuScore.academicQualityScore === null ? '暂未添加' : stuScore.academicQualityScore }}</el-tag></el-col>
      <el-col :span="10"><span>谈话观察分：</span><el-tag class="user-info-tag">{{ stuScore.ideologicalQualityScore === null ? '暂未添加' : stuScore.ideologicalQualityScore }}</el-tag></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>活动参与分：</span><el-tag class="user-info-tag">{{ stuScore.activityScore === null ? '暂未添加' : stuScore.activityScore }}</el-tag></el-col>
      <el-col :span="10"><span>创新创业分：</span><el-tag class="user-info-tag">{{ stuScore.innovateScore === null ? '暂未添加' : stuScore.innovateScore }}</el-tag></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>个人荣誉分：</span><el-tag class="user-info-tag">{{ stuScore.honourScore === null ? '暂未添加' : stuScore.honourScore }}</el-tag></el-col>
      <el-col :span="10"><span>文体特长分：</span><el-tag class="user-info-tag">{{ stuScore.specialityScore === null ? '暂未添加' : stuScore.specialityScore }}</el-tag></el-col>
    </el-row>
    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span>组织协调分：</span><el-tag class="user-info-tag">{{ stuScore.organizeScore === null ? '暂未添加' : stuScore.organizeScore }}</el-tag></el-col>
    </el-row>

    <el-row :gutter="10" class="el-row-info">
      <el-col :span="10"><span class="el-row-total-count">总分：</span><el-tag type="warning" class="user-info-tag-total">{{ totalScore === null ? '暂无' : totalScore }}</el-tag></el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
export default {
  data() {
    return {
      infoList: {},
      stuScore: {}
    }
  },
  computed: {
    totalScore() {
      let total = 0
      for (const [key, value] of Object.entries(this.stuScore)) {
        console.log(key, value)
        // console.log(Number.isFinite(value))
        if (Number.isFinite(value) === true) {
          total = total + value
        }
      }
      return total
    }
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    // 获取用户信息
    fecthData() {
      getInfo().then(response => {
        const { data } = response
        this.infoList = data
        this.stuScore = data.stuScore || {}
        console.log(this.stuScore)
      }).catch(error => {
        return new Error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
