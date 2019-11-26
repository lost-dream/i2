<template>
  <fly-dialog
    :title="'添加关系'"
    width="350px"
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
        <el-input
          v-model="dataForm.relation"
          placeholder="请输入关系！"
          clearable
        ></el-input>
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
      callback: null,
      dataForm: {
        relation: '',
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(edge, callback) {
      this.visible = true
      this.edge = edge
      this.callback = callback
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          if (this.edge.label !== '') {
            // 删除原本的连线，重新构建关系
            if (this.edge.label.includes(this.dataForm.relation)) {
              let arr = this.edge.label.split('/')
              let resArr = []
              arr.forEach(value => {
                if (value.includes(this.dataForm.relation)) {
                  if (value.includes('(')) {
                    const num = parseInt(value.split('(')[1])
                    resArr.push({
                      label: value.split('(')[0],
                      count: num + 1,
                    })
                  } else {
                    resArr.push({
                      label: value.includes('(') ? value.split('(')[0] : value,
                      count: value.includes('(')
                        ? parseInt(value.split('(')[1])
                        : 2,
                    })
                  }
                } else {
                  resArr.push({
                    label: value.includes('(') ? value.split('(')[0] : value,
                    count: value.includes('(')
                      ? parseInt(value.split('(')[1])
                      : 1,
                  })
                }
              })

              let label = ''
              resArr.forEach(value => {
                label += `${value.label}${
                  value.count > 1 ? `(${value.count})/` : '/'
                }`
              })
              label = label.slice(0, -1)
              this.global.edges.remove([this.edge.id])
              this.edge.label = label
            } else {
              const label = this.edge.label + '/' + this.dataForm.relation
              this.global.edges.remove([this.edge.id])
              this.edge.label = label
            }
          } else {
            this.edge.label = this.dataForm.relation
          }
          this.global.edges.add(this.edge)
          this.global.network.redraw()
          this.callback(this.edge)
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
</style>
