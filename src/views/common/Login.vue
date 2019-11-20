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
        <transition name="slide" mode="out-in">
          <!-- 登录 -->
          <div class="fly-panel" v-if="!setSecondaryPassword" key="login">
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
                    <template slot="prepend">
                      管理员账号
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    autocomplete="off"
                  >
                    <template slot="prepend">
                      密码
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="submitForm"
                    >立即登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- 设置二级密码 -->
          <div class="fly-panel" v-else key="setSecondaryPassword">
            <div class="fly-title">
              <h3 class="fly-this" v-if="!login2ndQuestion">设置二级密码</h3>
              <h3 class="fly-this" v-else>验证安全密码</h3>
              <div id="darkbannerwrap"></div>
            </div>
            <div class="fly-form">
              <el-form
                :model="secondaryPWDModel"
                @keyup.enter.native="
                  login2ndQuestion ? check2ndPWD() : set2ndPWD()
                "
                status-icon
                ref="loginForm"
              >
                <el-form-item>
                  <div>
                    <strong class="errtip">Tips：</strong>
                    <span>{{ secondaryPWDModel.tips }}</span>
                  </div>
                </el-form-item>
                <el-form-item prop="username">
                  <el-input
                    v-if="!login2ndQuestion"
                    v-model="secondaryPWDModel.secondaryWt"
                  >
                    <template slot="prepend">
                      请设置二级密码问题
                    </template>
                  </el-input>
                  <el-input v-else :disabled="true" v-model="login2ndQuestion">
                    <template slot="prepend">
                      问题
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="secondaryPWDModel.secondaryPassword"
                    autocomplete="off"
                  >
                    <template slot="prepend">
                      答案
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    v-if="!login2ndQuestion"
                    type="success"
                    @click="set2ndPWD"
                  >
                    <span>设置二级密码</span>
                  </el-button>
                  <el-button v-else type="success" @click="check2ndPWD">
                    <span>安全登录</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { login, setSecondaryPassword, verificat2ndPWD } from '@/api/login'

export default {
  name: 'login',
  metaInfo: {
    title: '登录/注册'
  },
  data() {
    return {
      setSecondaryPassword: false, // 是否展示设置二级密码控件
      loginForm: {
        tips: '',
        username: '',
        password: '',
      },
      rulesPass: {
        userId: '',
        ac_token: '',
      },
      rules: {
        username: [
          { required: true, message: '登录账户不能为空！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' },
        ],
      },
      login2ndQuestion: null, // 二级密码问题
      secondaryPWDModel: {
        tips: '请设置安全问题和安全密码',
        secondaryWt: '',
        secondaryPassword: '',
      },
      userInfo: {},
    }
  },
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        let { username, password } = this.loginForm
        if (valid) {
          login({ username, password }).then(({ data }) => {
            if (data && data.code === 200) {
              // Cookies.set('userId', data.result.user.id)
              // Cookies.set('ac_token', data.result.accessToken)
              this.rulesPass.userId = data.result.user.id
              this.rulesPass.ac_token = data.result.accessToken
              this.userInfo = data.result.user
              this.setSecondaryPassword = !this.setSecondaryPassword
              if (data.result.secondary === 1) {
                // 已设置过二级密码,登录成功
                this.login2ndQuestion = data.result.user.secondaryWt
                this.secondaryPWDModel.secondaryWt =
                  data.result.user.secondaryWt
                this.secondaryPWDModel.tips = '请输入二级密码答案进行合法性验证'
              }
            } else {
              // Cookies.remove('userId')
              // Cookies.remove('ac_token')
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    set2ndPWD() {
      let _this = this
      const { secondaryWt, secondaryPassword } = this.secondaryPWDModel
      // const [id, accessToken] = [Cookies.get('userId'), Cookies.get('ac_token')]
      const [id, accessToken] = [this.rulesPass.userId, this.rulesPass.ac_token]
      setSecondaryPassword({
        id,
        accessToken,
        secondaryWt,
        secondaryPassword,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          Cookies.set('userId', _this.rulesPass.userId)
          Cookies.set('ac_token', _this.rulesPass.ac_token)
          this.doLogin(data.data)
        } else {
          // Cookies.remove('userId')
          // Cookies.remove('ac_token')
          this.$message.error(data.message)
        }
      })
    },
    check2ndPWD() {
      let _this = this
      verificat2ndPWD({
        // id: Cookies.get('userId'),
        id: this.rulesPass.userId,
        twoPassword: this.secondaryPWDModel.secondaryPassword,
        // accessToken: Cookies.get('ac_token'),
        accessToken: this.rulesPass.ac_token,
      }).then(({ data }) => {
        if (data && data.code === 200) {
          const userInfo = this.userInfo
          Cookies.set('userId', _this.rulesPass.userId)
          Cookies.set('ac_token', _this.rulesPass.ac_token)
          this.doLogin(userInfo)
        } else {
          // Cookies.remove('userId')
          // Cookies.remove('ac_token')
          this.$message.error(data.message)
        }
      })
    },
    doLogin(userData) {
      Cookies.set('user_info', {
        nickName: userData.nickName,
        username: userData.username,
      })
      this.$router.push({ name: 'home' })
    },
  },
  created() {
    // Cookies.set('userId', '1c928572a3414478895ef893dfee12fc')
    // Cookies.set('ac_token', 'd6ddcd9b39a841ddbfbd2f85eee4164e')
    // Cookies.set('user_info', {
    //   username: 'test3',
    //   nickName: '虎虎',
    // })
  },
}
</script>

<style lang="stylus" scoped>
.slide-enter-active
  transition all .3s ease
.slide-leave-active
  transition all 0.3s ease
// .slide-enter
//   transform translateX(420px)
// .slide-leave-to
//   scale 1.5
//   transform translateX(-420px)
.slide-enter, .slide-leave-to
  opacity 0

>>> .el-input-group__prepend
  width 120px
  height 50px
  color #303133
  text-align center
  border-radius 2px
>>> .el-input__inner
  color #5c6168 !important
  height 50px
  border-radius 2px
  background-color rgb(255, 255, 255) !important
  border 1px solid rgb(192, 215, 213) !important
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
.fly-layout
  width 100%
  height 100%
  display flex
  flex-direction column
  .fly-header
    margin-bottom 0
  .fly-container
    flex 1
    display flex
    justify-content center
    align-items center
  .fly-panel
    max-width 420px
    max-height 420px
    border-radius 4px
    background-color #fff
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.05)
    padding 40px
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
