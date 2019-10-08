<template>
  <div class="container">
    <div class="bg">
      <div style="color: #ffffff;margin-bottom: 20px;font-size: 18px"><span>{{oper}}</span></div>
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
                     action="http://192.168.1.186:8087/ticket/statement/importEmp"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-upload="beforeUpload"
                     :on-error="uploadError"
                     :on-success="uploadSuccess"
                     :limit="1"
                     :on-exceed="handleExceed"
                     :auto-upload="false">
            <el-button slot="trigger"
                       size="small"
                       type="primary">选取文件
            </el-button>
            <el-button style="margin-left: 10px;"
                       size="small"
                       type="primary"
                       @click="submitUpload">上传到服务器
            </el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传Excel文件
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitUpload;oper=='新建话单'? submitForm('ticketForm'):(oper=='编辑话单'?ticketAlter('ticketForm'):ticketAddTo('ticketForm'))">保存
          </el-button>
          <el-button type="danger"
                     @click="resetForm('ticketForm')">重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        ticketForm: {
          name: '',
          phone: '',
          case: '',
          depict: '',
          uploadPhone: '',
          flag: '',
          id: '',
          recordId: '',
          time: '',
          name: ''
        },
        oper: '新建话单',
        rules: {
          name: [
            {required: true, message: '请输入机主姓名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          phone: this.filter_rules({required: true, type: 'mobile'}),
          case: this.filter_rules({required: true, min: 2, max: 10, type: 'caseName'}),
          uploadPhone: this.filter_rules({required: true})
        }
      };
    },
    mounted() {
      this.$route.query.phoneDataList != undefined && this.getRoute()
    },
    methods: {
      // 获取路由
      getRoute(){
        let phoneData = JSON.parse(this.$route.query.phoneDataList)
        this.ticketForm.name = phoneData.name
        this.ticketForm.phone = phoneData.phone
        this.ticketForm.case = phoneData.caseName
        this.ticketForm.recordId = phoneData.recordId
        this.ticketForm.depict = phoneData.depict
        this.oper = this.$route.query.oper
      },
      submitForm(formName) {
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              name: this.ticketForm.name,
              phone: this.ticketForm.phone,
              caseName: this.ticketForm.case,
              desc: this.ticketForm.depict,
              flag: this.ticketForm.flag,
              id: this.ticketForm.id,
              recordId: this.ticketForm.recordId,
              time: this.ticketForm.time,
              name: this.ticketForm.name
            }
            this.$api.newly(obj).then(({data}) => {
              if (data.success) {
                _this.reload()
                _this.$message({
                  message: '创建话单成功！!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '创建话单失败!',
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 新建
      submitForm(formName) {
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              name: this.ticketForm.name,
              phone: this.ticketForm.phone,
              caseName: this.ticketForm.case,
              desc: this.ticketForm.depict,
              flag: this.ticketForm.flag,
              id: this.ticketForm.id,
              recordId: this.ticketForm.recordId,
              time: this.ticketForm.time,
              name: this.ticketForm.name
            }
            this.$api.newly(obj).then(({data}) => {
              if (data.success) {
                _this.reload()
                _this.$message({
                  message: '创建话单成功！!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '创建话单失败!',
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 编辑
      ticketAlter(formName) {
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              name: this.ticketForm.name,
              phone: this.ticketForm.phone,
              caseName: this.ticketForm.case,
              desc: this.ticketForm.depict,
              flag: this.ticketForm.flag,
              id: this.ticketForm.id,
              recordId: this.ticketForm.recordId,
              time: this.ticketForm.time,
              name: this.ticketForm.name
            }
            this.$api.ticketAlter(obj).then(({data}) => {
              if (data.success) {
                _this.reload()
                _this.$message({
                  message: '编辑话单成功！!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '编辑话单失败!',
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 追加
      ticketAddTo(formName) {
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              name: this.ticketForm.name,
              phone: this.ticketForm.phone,
              caseName: this.ticketForm.case,
              desc: this.ticketForm.depict,
              flag: this.ticketForm.flag,
              id: this.ticketForm.id,
              recordId: this.ticketForm.recordId,
              time: this.ticketForm.time,
              name: this.ticketForm.name
            }
            this.$api.ticketAddTo(obj).then(({data}) => {
              if (data.success) {
                _this.reload()
                _this.$message({
                  message: '追加话单成功！!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '追加话单失败!',
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeUpload(file) {
        const isText = file.type === 'application/vnd.ms-excel'
        const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        return (isText | isTextComputer)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
      },
      uploadError(err, file, fileList) {
        console.log("上传失败")
        this.$message({
          message: '文件上传失败!',
          type: 'error'
        })
      },
      uploadSuccess(response, file, fileList) {
        this.ticketForm.uploadPhone = response.result
        this.ticketForm.time = response.timestamp
        this.ticketForm.recordId = file.uid
        this.$message({
          message: '文件上传成功!',
          type: 'success'
        })
      },
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
