<template>
  <fly-dialog
    :title="'修改关系'"
    width="350px"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mode-add-update">
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        label-width="80px"
      >
        <el-input v-model="dataForm.label" clearable></el-input>
      </el-form>
    </div>
    <span slot="ft" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </fly-dialog>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  components: {
    FlyDialog,
  },
  props: {},
  data() {
    return {
      visible: false,
      edge: [],
      dataForm: {
        label: '',
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(edge) {
      this.dataForm.label = edge.label
      this.visible = true
      this.edge = edge
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          let label = this.dataForm.label
          let eg = this.global.edges.get(this.edge.id)
          eg.label = label
          this.global.edges.update(eg)

          this.visible = false
        }
      })
    },
    /**
     * 保存或者修改关系
     */
    saveOrUpdateGx() {
      console.log(this.edge)
    },

    beforeClose() {
      this.$emit('refreshDataList')
      this.visible = false
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped>
.mode-add-update
  padding 10px
  >>>.el-input__inner
    color #fff
    background transparent
</style>
