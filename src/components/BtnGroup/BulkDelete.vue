<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-delete"
      class="el-button-delete-search"
      :disabled="roleLimit"
      @click="handleMultiDelete"
    >批量删除</el-button>
  </div>
</template>

<script>
const NOOP = () => {}

export default {
  props: {
    bulkDelete: {
      type: Function,
      default: NOOP
    },
    roleLimit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      multipleSelection: [],
      idList: [],
      usernameList: []
    }
  },
  mounted() {
    this.$bus.$on('multipleDelete', (multipleSelection) => {
      this.idList = []
      this.usernameList = []
      this.multipleSelection = multipleSelection
      // console.log('multipleSelection', this.multipleSelection)
      this.multipleSelection.map(item => {
        // console.log(Object.keys(item)[0])
        const idType = Object.keys(item)[0]
        const usernameType = Object.keys(item)[1]
        // console.log('usernameType', usernameType)
        switch (idType) {
          case 'activistId':
            this.idList.push(item.activistId)
            break
          case 'academicQualitiesId':
            this.idList.push(item.academicQualitiesId)
            break
          case 'code':
            this.idList.push(item.code)
            break
          case 'developObjectId':
            this.idList.push(item.developObjectId)
            break
          case 'developAbilityId':
            this.idList.push(item.developAbilityId)
            break
          case 'ideologicalQualityId':
            this.idList.push(item.ideologicalQualityId)
            break
        }
        if (this.idList.length === 0) {
          switch (usernameType) {
            case 'userName':
              this.usernameList.push(item.userName)
              break
          }
        }
      })
      // console.log(this.idList)
    })
  },
  methods: {
    // 批量删除
    handleMultiDelete() {
      this.$confirm(window.$constant.delete, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.usernameList.length === 0) {
          console.log('idList', this.idList)
          this.bulkDelete({
            idList: this.idList
          }).then(res => {
            if (res.code === 200) {
              this.idList = []
              this.$message.success(res.msg || '删除成功')
              this.$emit('handleSearch', 1)
              // this.fetchData()
            }
          })
        } else {
          console.log('usernameList', this.usernameList)
          this.bulkDelete({
            userNameList: this.usernameList
          }).then(res => {
            if (res.code === 200) {
              this.usernameList = []
              this.$message.success(res.msg || '删除成功')
              this.$emit('handleSearch', 1)
              // this.fetchData()
            }
          })
        }
      }).catch(() => {
        this.$message.info('已取消删除!')
      })
    }
  }
}
</script>

<style>

</style>
