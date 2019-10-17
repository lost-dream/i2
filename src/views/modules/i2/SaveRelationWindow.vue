<template>
  <fly-dialog
    :title="'保存'"
    width="550px"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mode-add-update">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input
            v-model="dataForm.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="dataForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item label="自动保存">
          <el-switch v-model="dataForm.autoSave"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="ft"
      class="dialog-footer"
    >
      <el-button @click="visible=false">取消</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
      >确定</el-button>
    </span>
  </fly-dialog>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  components: {
    FlyDialog
  },
  props: {},
  data () {
    return {
      visible: false,
      datas: [],
      dataForm: {
        name: '',
        desc: '',
        autoSave: false
      },
      dataRule: {}
    }
  },
  computed: {
  },
  methods: {
    init (datas) {
      this.datas = datas;
      this.visible = true;
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        let obj = {
          json: JSON.stringify(this.datas),
          recordTitle: this.dataForm.name,
          description: this.dataForm.desc
        }
        if (valid) {
          this.$api.saveAnalyticalRecords(obj).then(({ data }) => {
            if (data && data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
            }
          })
          this.visible = false;
        }
      })
    },
    beforeClose () {
      this.$emit('refreshDataList')
      this.visible = false;
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="stylus" scoped>
>>>.el-textarea__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color #fff !important
>>>.el-switch.is-checked .el-switch__core
  border-color rgba(44, 239, 255, 0.3) !important
  background-color rgba(44, 239, 255, 0.4) !important
.mode-add-update
  padding 10px
  >>>.el-input__inner
    color #fff !important
</style>
