<template>
  <div class="container">
    <div class="bg">
      <div style="color: #ffffff;margin-bottom: 20px;font-size: 18px">
        <span>{{ oper }}</span>
      </div>
      <el-form
        :model="ticketForm"
        :rules="rules"
        ref="ticketForm"
        label-width="100px"
        class="ticket"
      >
        <el-form-item class="color" label="电话号码" prop="phone">
          <el-input v-model="ticketForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="机主姓名" prop="name">
          <el-input v-model="ticketForm.name"></el-input>
        </el-form-item>
        <el-form-item label="案件名称" prop="case">
          <el-input v-model="ticketForm.case"></el-input>
        </el-form-item>
        <el-form-item label="案件描述" prop="depict">
          <el-input type="textarea" v-model="ticketForm.depict"></el-input>
        </el-form-item>
        <el-form-item label="上传话单" prop="uploadPhone">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadURL"
            :on-change="uploadChange"
            :limit="1"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件
            </el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              oper == '新建话单'
                ? submitForm('ticketForm')
                : oper == '编辑话单'
                ? ticketAlter('ticketForm')
                : ticketAddTo('ticketForm')
            "
            >保存
          </el-button>
          <el-button type="danger" @click="resetForm('ticketForm')"
            >重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'newTicket',
  metaInfo: {
    title: '新建话单',
  },
  inject: ['reload'],
  data() {
    return {
      uploadURL:
        process.env.VUE_APP_UPLOAD_REQUEST_URL +
        'ticket/statement/newly?accessToken=' +
        Cookies.get('ac_token') +
        '&roleStr=' +
        Cookies.get('roleStr'),
      ticketForm: {
        name: '',
        phone: '',
        case: '',
        depict: '',
        uploadPhone: '',
        flag: '',
        id: '',
        recordId: '',
      },
      oper: '新建话单',
      rules: {
        name: [
          { required: true, message: '请输入机主姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur',
          },
        ],
        phone: this.filter_rules({ required: true, type: 'mobile' }),
        case: this.filter_rules({
          required: true,
          min: 2,
          max: 10,
          type: 'caseName',
        }),
        // uploadPhone: [{ validator: uploadPhone, trigger: 'blur' }],
        uploadPhone:
          this.oper === '编辑话单'
            ? this.filter_rules({ required: false })
            : this.filter_rules({ required: true }),
      },
    }
  },
  mounted() {
    this.$route.query.phoneDataList !== undefined && this.getRoute()
  },
  methods: {
    // 获取路由
    getRoute() {
      let phoneData = JSON.parse(this.$route.query.phoneDataList)
      this.ticketForm.name = phoneData.name
      this.ticketForm.phone = phoneData.phone
      this.ticketForm.case = phoneData.caseName
      this.ticketForm.recordId = phoneData.recordId
      this.ticketForm.depict = phoneData.depict
      this.oper = this.$route.query.oper
      this.editoRrules()
    },

    // 调整验证规则
    editoRrules() {
      this.oper === '新建话单'
        ? (this.rules.uploadPhone = this.filter_rules({ required: true }))
        : (this.rules.uploadPhone = this.filter_rules({ required: false }))
    },
    // 新建
    submitForm(formName) {
      var _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            name: _this.ticketForm.name,
            phone: _this.ticketForm.phone,
            caseName: _this.ticketForm.case,
            desc: _this.ticketForm.depict,
            flag: _this.ticketForm.flag,
            id: _this.ticketForm.id,
            recordId: _this.ticketForm.recordId,
            // accessToken: this.$Cookies.get('ac_token'),
          }
          let obj2 = {
            statement: obj,
            file: this.ticketForm.uploadPhone,
          }
          this.$api.newly(obj2).then(({ data }) => {
            if (data.success) {
              _this.reload()
              _this.$message({
                message: '创建话单成功！!',
                type: 'success',
              })
            } else {
              _this.$message({
                message: '创建话单失败!',
                type: 'error',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑
    ticketAlter(formName) {
      var _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            name: _this.ticketForm.name,
            phone: _this.ticketForm.phone,
            caseName: _this.ticketForm.case,
            desc: _this.ticketForm.depict,
            flag: _this.ticketForm.flag,
            id: _this.ticketForm.id,
            recordId: _this.ticketForm.recordId,
            // accessToken: this.$Cookies.get('ac_token'),
          }
          let obj2 = {
            newlyStatementVo: obj,
            file: this.ticketForm.uploadPhone,
          }
          _this.$api.ticketAlter(obj2).then(({ data }) => {
            if (data.success) {
              _this.reload()
              _this.$message({
                message: '编辑话单成功！!',
                type: 'success',
              })
            } else {
              _this.$message({
                message: '编辑话单失败!',
                type: 'error',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 追加
    ticketAddTo(formName) {
      var _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            name: _this.ticketForm.name,
            phone: _this.ticketForm.phone,
            caseName: _this.ticketForm.case,
            desc: _this.ticketForm.depict,
            flag: _this.ticketForm.flag,
            id: _this.ticketForm.id,
            recordId: _this.ticketForm.recordId,
            // accessToken: this.$Cookies.get('ac_token'),
          }
          let obj2 = {
            newlyStatementVo: obj,
            file: this.ticketForm.uploadPhone,
          }
          _this.$api.ticketAddTo(obj2).then(({ data }) => {
            if (data.success) {
              _this.reload()
              _this.$message({
                message: '追加话单成功！!',
                type: 'success',
              })
            } else {
              _this.$message({
                message: '追加话单失败!',
                type: 'error',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    uploadChange(file, fileList) {
      this.ticketForm.uploadPhone = file.raw
    },
  },
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
