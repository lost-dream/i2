<template>
  <fly-dialog
    title="提示：多条数据请用空格、换行符或顿号隔开"
    :show.sync="show"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
    >
      <el-input
        v-model="dataForm.kw"
        type="textarea"
        rows="6"
        placeholder="请输入身份证号码、车牌号码、手机号码等"
      ></el-input>
    </el-form>
    <span
      slot="ft"
      class="dialog-footer"
    >
      <el-button @click="show=false">取消</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
      >确定</el-button>
    </span>
  </fly-dialog>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import { addNodes } from './js/addNodes.js'
export default {
  components: {
    FlyDialog
  },
  props: {},
  data () {
    return {
      show: false,
      workbench: null,
      dataForm: {
        kw: ''
      },
      dataRule: {}
    }
  },
  computed: {

  },
  methods: {
    init (workbench) {
      this.workbench = workbench
      this.show = true
    },
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.workbench.addNodes(this.dataForm.kw)
        }
      })
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="stylus" scoped></style>
