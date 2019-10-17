<template>
  <fly-dialog
    title="提示：多条数据请用空格、换行符或顿号隔开"
    :show.sync="visible"
     @beforeCloseDialog="visible = false"
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
import { renderNodes } from './js/renderNodes'
export default {
  components: {
    FlyDialog
  },
  props: {},
  data () {
    return {
      visible: false,
      dataForm: {
        kw: ''
      },
      dataRule: {}
    }
  },
  computed: {
  },
  methods: {
    bc () {
      alert(1)
    },
    init () {
      this.visible = true;
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        let { kw } = this.dataForm;
        let kws = [];
        kws.push(kw);
        if (valid) {
          // addNodes(this, this.dataForm.kw);
          this.$api.queryNodeOrAdd(kws).then(({ data }) => {
            if (data && data.code === 200) {
              let ns = [];
              let ns1 = data.result.nodes;
              if (ns1 && ns1.length > 0) {
                ns = ns.concat(ns1);
              }
              ns.map(function (e) {
                e.isRoot = true;
              })
              // 渲染节点
              renderNodes(this, ns);
              this.visible = false;
            } else {
              console.log(data.message)
            }
          })
        }
      });
    }

  },
  created () { },
  mounted () { }
}
</script>
<style lang="stylus" scoped></style>
