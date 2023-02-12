<template>
  <el-dialog title="excel导出字段选择" :visible.sync="visible" width="70%" :before-close="handleClose">
    <el-checkbox-group v-model="checkedItems" @change="handleCheckedChange">
      <div v-for="(item, index) in keywords" :key="index" class="check-box">
        <span v-if="item.title" class="item-title card-title-width-icon">{{ item.title }}</span>
        <el-checkbox
          v-for="(it, id) in item.data"
          :key="id"
          :label="it.key"
          :disabled="isRequire(it.key)"
          style="width: 150px; margin-bottom: 10px;"
        >{{ it.value }}</el-checkbox>
      </div>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">取消</el-button>
      <el-button plain @click="handleCheckAllChange(allChecked)">{{ allChecked ? '取消全选' : '全选' }}</el-button>
      <el-button type="primary" @click="confirm">确认导出</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style>
</style>
