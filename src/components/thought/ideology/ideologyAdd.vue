<template>
  <el-dialog title="新增" :visible.sync="addDialogVisible" width="25%">
    <!-- 内容主体区域 -->
    <el-form ref="AddFormRef" label-width="35%" :model="addList" :rules="AddRules" label-position="right">
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="addList.name" placeholder="请输入" type="text" style="width: 70%" />
      </el-form-item>
      <el-form-item label="支部名称:" prop="branch">
        <el-select v-model="addList.branch" placeholder="请选择" style="width: 70%" @change="branchSelect()">
          <el-option v-for="item in options.branchOptionsChoose" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称:" prop="class">
        <el-select v-model="addList.class" placeholder="请选择" style="width: 70%" @change="classSelect()">
          <template v-for="item in options.classOptionsChoose[addList.branch]">
            <el-option :key="item.value" :label="item.label" :value="item.value" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="文件名:" prop="filename">
        <el-input v-model="addList.filename" placeholder="请输入" type="text" style="width: 70%" />
      </el-form-item>
      <el-form-item label="附件" prop="file">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3" :file-list="addList.files">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addListConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
</script>

<style>
</style>
