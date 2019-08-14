<template>
  <div class="userManage">
    <div class="coat1">
      <div class="coat2">
        <div class="from" v-show="see=='pass'">
          <el-form ref="form" :model="form" status-icon :rules="rules" class="demo-ruleForm">
            <el-form-item prop="oldPass">
              <el-input v-model="form.oldPass" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item prop="newPass">
              <el-input v-model="form.newPass" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input v-model="form.checkPass" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="sureBut" type="primary" @click="onSubmit('form')">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="from2" v-show="see=='depict'">
          <div class="depict">
            <span class="c_align">什么是超级问答认证？</span>
            <p>超级问答认证是用于校验用户合法身份的二次认证方式<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、每个用户均须设置自己的超级问答认证的问题和答案；<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、用户每次登录系统后，只有进行超级问答认证才能正常<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用系统功能；</p>
            <span class="c_align">答案由字母或数字组成的六位字符</span>
          </div>
          <el-form ref="form2" :model="form2" status-icon :rules="rules" class="demo-ruleForm">
            <el-form-item prop="question">
              <el-input v-model="form2.question" placeholder="请输入问题"></el-input>
            </el-form-item>
            <el-form-item prop="answer">
              <el-input v-model="form2.answer" placeholder="请输入答案"></el-input>
            </el-form-item>
          </el-form>
          <el-button class="sureBut" type="primary" @click="onSubmit('form2')">确定</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'userManage',
  components: {},
  props: {},
  data () {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (value !== '111') {
          callback(new Error('请输入正确密码'))
        } else {
          if (this.form.newPass !== '') {
            this.$refs.form.validateField('newPass')
          }
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateanswer = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入问题答案'))
      } else if (!/^[a-zA-Z0-9]{6,6}$/.test(value)) {
        callback(new Error('答案输入格式错误！!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      form2: {
        question: '',
        answer: ''
      },
      see: 'pass',
      rules: {
        oldPass: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        newPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        question: [
          { required: true, message: '请输入问题', trigger: 'blur' }
        ],
        answer: [
          { validator: validateanswer, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          formName === 'form' && (this.see = 'depict')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .userManage
    position relative

  .from, .from2 .el-form
    width 20%
    margin 30px auto

  .el-form-item
    text-align: center
  .depict
    width 50%
    margin 0 auto
    padding 5px 20px
    background-color rgba(44, 239, 255, 0.3)
    color #ffffff
  .depict .c_align
    display block
    text-align center

</style>
<style lang="stylus">
  .userManage .coat2 .el-form-item__label
    background-color rgba(44, 239, 255, 0.4)
    color: #ffffff;

  .userManage .coat2 .el-input__inner {
    border-radius: 0px;
    background-color: rgba(44, 239, 255, 0.2);
    border: 1px none #DCDFE6;
    color: #ffffff;
  }

  .userManage .coat2 .el-form-item {
    margin-bottom: 1px;
  }

  .userManage .coat2 .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    width: 100px;
    text-align: initial;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 25%;
    left: 105%;
  }

  .userManage .coat2 .el-button {
    background-color: rgba(44, 239, 255, 0.3);
    border: 1px solid rgba(44, 239, 255, 0.3);
    color: #ffffff;
    padding: 9px 20px;
  }

</style>
