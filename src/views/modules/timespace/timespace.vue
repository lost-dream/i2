<template>
  <div class="timespace clearfix">
    <div class="tsimg">
      <img src="../../../assets/img/qiuxing.png" alt="" />
    </div>
    <div class="tsimp">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
          <el-date-picker
            popper-class="datePicker"
            v-model="form.startDate"
            type="date"
            placeholder="选择开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate">
          <el-date-picker
            popper-class="datePicker"
            v-model="form.endDate"
            type="date"
            placeholder="选择结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="timespaceBut">
        <el-button class="sureBut" type="primary" @click="onSubmit('form')"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { searchList } from '@/api/timespace'
export default {
  name: 'timespace',
  data() {
    return {
      form: {
        idNumber: '',
        startDate: '',
        endDate: '',
      },
      rules: {
        idNumber: this.filter_rules({ required: true, type: 'idCard' }),
        startDate: [
          { required: true, message: '请选择开始日期', trigger: 'blur' },
        ],
        endDate: [
          { required: true, message: '请选择结束日期', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    testapi() {
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // searchList({
          // }).then(({res})=> {
          //   if(res && res.code !== 0) {
          //     this.gotoList()
          //   }
          // })
          this.gotoList()
        }
      })
    },
    // 跳转页面
    gotoList() {
      this.$router.push({
        name: 'timespacelist',
        params: {
          form: this.form,
        },
      })
    },
  },
  mounted() {
    this.testapi()
  },
}
</script>

<style lang="stylus" scoped>
.timespace
    width 415px
    margin 0 auto
    position relative
    top 30%
  .tsimg,
  .tsimp
    float left
  .tsimg
    margin-right 32px
  .tsimg,
  .tsimg img
    width 183px
  .tsimp
    width 200px
    .timespaceBut
      .el-button--primary
        background-color rgba(70, 111, 50, 1)
        border-color: rgba(70, 111, 50, 1)
</style>
<style lang="stylus">
.tsimp
  .el-form-item__label
    background-color rgba(44, 239, 255, 0.4)
    color: #ffffff;

  .el-input__inner {
    border-radius: 0px;
    background-color: rgba(44, 239, 255, 0.2);
    border: 1px none #DCDFE6;
    color: #ffffff;
  }

  .el-form-item {
    display inline-block
    width 200px
    height 60px
    background-color: rgba(44, 239, 255, 0.1)
    margin-bottom: 1px;
  }

  .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    width: 140px;
    text-align: initial;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 25%;
    left: 105%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner
    width 176px
  .el-form-item__content
    margin 10px
    height 42px
    border 1px solid rgba(44, 239, 255, 1)
.datePicker
    background-color #187b87!important
    color #ffffff!important
    border 1px solid #2cefff!important
  .el-date-picker__header-label,
  .el-date-table th
    color #ffffff!important
</style>
