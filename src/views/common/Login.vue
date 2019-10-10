<template>
  <div class="login-bg">
    <div class="fly-layout">
      <div class="fly-header header">
        <div class="fly-container">
          <a href="/" class="logo">
            <img src="../../assets/img/logo.png" alt="" />
          </a>
          <span>情报智能分析系统</span>
        </div>
      </div>
      <div class="fly-container">
        <div class="fly-panel fly-panel-login">
          <div class="fly-title">
            <h3 class="fly-this">管理员登录</h3>
            <div id="darkbannerwrap"></div>
          </div>
          <div class="fly-form">
            <el-form
              :model="loginForm"
              :rules="rules"
              @keyup.enter.native="submitForm()"
              status-icon
              ref="loginForm"
            >
              <el-form-item>
                <div>
                  <strong class="errtip">Tips：</strong>{{ loginForm.tips }}
                </div>
              </el-form-item>
              <el-form-item prop="username">
                <el-input v-model="loginForm.username">
                  <template slot="prepend"
                    >管理员账号</template
                  >
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  autocomplete="off"
                >
                  <template slot="prepend"
                    >密码</template
                  >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitForm()"
                  >立即登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        tips: '',
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '登录账户不能为空！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        let { username, password } = this.loginForm
        if (valid) {
          this.$api
            .login({
              username,
              password,
            })
            .then(({ data }) => {
              this.loginForm.tips = data.msg
              if (data && data.code === 200) {
                // 成功
                Cookies.set('ac_token', data.result)
                this.$router.push({
                  name: 'home',
                })
              }
            })
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
>>> .el-input-group__prepend
  width 120px
  height 50px
  color #303133
  text-align center
  border-radius 2px
>>> .el-input__inner
  height 50px
  border-radius 2px
>>> .el-input.is-active .el-input__inner, >>>.el-input__inner:focus
  border-color #DCDFE6
  outline 0
>>> .el-button
  width 100%
  height 50px
.login-bg
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  &:before
    position fixed
    top 0
    left 0
    z-index -1
    width 100%
    height 100%
    content ''
    background url('~@/assets/img/loginbg.png') no-repeat center
    background-size cover
.fly-panel
  margin-bottom 15px
  border-radius 2px
  background-color #fff
  box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.05)
  padding 40px
.fly-panel-login
  max-width 420px
  min-height 420px
  margin 120px auto 0 auto
  margin-left auto
  margin-right auto
  border-radius 4px !important
  box-sizing border-box
  .fly-title
    position relative
    margin 10px 0 0 -58px
    left 0
    height 55px
    white-space nowrap
    font-size 0
    background #189F92
    h3
      display inline-block
      vertical-align middle
      font-size 16px !important
      font-weight 700
      position relative
      left 40px
      padding 0 15px
      text-align center
      color #fff
  #darkbannerwrap
    background url('~@/assets/img/aiwrap.png') no-repeat center
    width 18px
    height 10px
    position relative
.fly-form
  padding 20px 0
</style>
