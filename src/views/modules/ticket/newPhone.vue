<template>
  <div class="container">
    <el-form :model="ticketForm"
             :rules="rules"
             ref="ticketForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="电话号码"
                    prop="phone">
        <el-input v-model="ticketForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="机主姓名"
                    prop="name">
        <el-input v-model="ticketForm.name"></el-input>
      </el-form-item>
      <el-form-item label="案件名称"
                    prop="case">
        <el-input v-model="ticketForm.case"></el-input>
      </el-form-item>
      <el-form-item label="案件描述"
                    prop="depict">
        <el-input type="textarea"
                  v-model="ticketForm.depict"></el-input>
      </el-form-item>
      <el-form-item label="上传文件单">
        <el-upload class="upload-demo"
                   ref="upload"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :before-upload="beforeUpload"
                   :limit="1"
                   :on-exceed="handleExceed"
                   :auto-upload="false">
          <el-button slot="trigger"
                     size="small"
                     type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;"
                     size="small"
                     type="success"
                     @click="submitUpload">上传到服务器</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传Excel文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      ticketForm: {
        name: '',
        phone: '',
        case: '',
        depict: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入机主姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: this.filter_rules({ required: true, type: 'mobile' }),
        case: this.filter_rules({ required: true, min: 2, max: 10, type: 'caseName' })

      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    beforeUpload (file) {
      const isText = file.type === 'application/vnd.ms-excel'
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      return (isText | isTextComputer)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
    }
  }
}
</script>
<style>
.container {
  width: 800px;
  margin: 0 auto;
  padding: 60px;
}
</style>
