<template>
  <div class="container">
    <div class="bg">
      <el-form :model="ticketForm"
               :rules="rules"
               ref="ticketForm"
               label-width="100px"
               class="ticket">
        <el-form-item class="color"
                      label="电话号码"
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
        <el-form-item label="上传话单"
                      prop="uploadPhone">
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
                       type="primary"
                       @click="submitUpload">上传到服务器</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传Excel文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ticketForm')">保存</el-button>
          <el-button type="danger"
                     @click="resetForm('ticketForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        depict: '',
        uploadPhone: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入机主姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: this.filter_rules({ required: true, type: 'mobile' }),
        case: this.filter_rules({ required: true, min: 2, max: 10, type: 'caseName' }),
        uploadPhone: this.filter_rules({ required: false })
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ticketForm)
          this.$api.newly(
            {
              name: this.ticketForm.name,
              phone: this.ticketForm.phone,
              caseName: this.ticketForm.case,
              desc: this.ticketForm.depict

              /* flag: this.ticketForm.name,
              id: this.ticketForm.name,
              recordId: this.ticketForm.name,
              time: this.ticketForm.name,
              name: this.ticketForm.name */
            }
          ).then(({ data }) => {
            console.log('新建话单')
            console.log(data)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
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
<style lang="stylus" scoped>
.container
  width 1200px
  margin 0 auto
  padding 20px
  background-color rgba(44, 239, 255, 0.1)
.bg
  background-color rgba(44, 239, 255, 0.1)
  padding 40px
</style>
<style lang="stylus">
.ticket .el-form-item__label
  color white
.ticket .el-input__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color white
.ticket .el-textarea__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color white
.ticket .el-upload__tip
  color white
</style>
