<template>
  <div class="modifyInfo">
    <div class="coat1">
      <div class="coat2">
        <div class="from">
          <el-form
            ref="form"
            :model="form"
            status-icon
            :rules="rules"
            :hide-required-asterisk="asterisk"
            label-width="300px"
            class="demo-ruleForm"
          >
            <el-form-item label="登陆账号" prop="user">
              <el-input v-model="username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="警号" prop="policeNumber">
              <el-input v-model="form.siren"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="form.card"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="Email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-form>
          <el-button class="sureBut" type="primary" @click="onSubmit('form')"
            >确定</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { getUserInfo, updateUserInfo } from '@/api/userCenter'

export default {
  name: 'modifyInfo',
  components: {},
  props: {},
  data() {
    return {
      asterisk: true, // 影响*号
      username: '',
      form: {},
      rules: {
        user: [{ required: true, message: '请输入登陆账号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        policeNumber: [
          { required: true, message: '请输入警号', trigger: 'blur' },
          { type: 'number', message: '警号必须为数字值' },
        ],
        idNumber: this.filter_rules({ required: true, type: 'idCard' }),
        phone: this.filter_rules({ required: true, type: 'mobile' }),
        Email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        /*
          TODO 校验规则有问题？？？
          TODO updateUserInfo接口频繁失效
        */
        if (valid) {
          // console.log('success submit!!')
          const userId = Cookie.get('userId')
          updateUserInfo(Object.assign(userId, this.form)).then(({ data }) => {
            if (data && data.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success',
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
  },
  created() {},
  mounted() {
    getUserInfo({
      accessToken: Cookie.get('ac_token'),
      id: Cookie.get('userId'),
    }).then(({ data }) => {
      if (data && data.code === 200) {
        this.username = data.data.username
        this.form.nickName = data.data.nickName
        this.form.card = data.data.card
        this.form.mobile = data.data.mobile
        this.form.email = data.data.email
        this.form.siren = data.data.siren
      } else {
        this.$message.error(data.msg)
      }
    })
  },
}
</script>

<style lang="stylus" scoped>
.organManage
    margin 0 auto
    position relative
.from
  width 600px
  height auto
  margin 0 auto
.from >>>
  .el-form-item__label
    background-color rgba(44, 239, 255, 0.4)
    color: #ffffff;
  .el-input__inner {
    border-radius: 0px;
    background-color: rgba(44, 239, 255, 0.2);
    border: 1px none #DCDFE6;
    color: #ffffff;
    margin-left: 1px;
  }
  .el-form-item {
     margin-bottom: 1px;
   }

  .el-form-item__error {
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
  .el-button {
    background-color: rgba(44, 239, 255, 0.3);
    border: 1px solid rgba(44, 239, 255, 0.3);
    color: #ffffff;
    padding: 9px 20px;
    margin-left: 1px;
  }
</style>
