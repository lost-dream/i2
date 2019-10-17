<template>
  <fly-dialog
    :title="'共享模型'"
    width="800px"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mod-form">
      <el-row>
        <el-col :span="8">
          <div class="org">
            <el-tree
              :props="props"
              :load="loadNode"
              lazy
              show-checkbox
              @check-change="handleCheckChange"
            >
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            地方垃圾贷款购房
          </div>
        </el-col>
      </el-row>
    </div>
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
      props: {
        label: 'name',
        children: 'zones',
      },
      count: 1,
    }
  },
  computed: {},
  methods: {
    init() {
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.visible = false
        }
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }])
      }
      if (node.level > 3) return resolve([])

      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else {
        hasChild = Math.random() > 0.5
      }

      setTimeout(() => {
        var data
        if (hasChild) {
          data = [
            {
              name: 'zone' + this.count++,
            },
            {
              name: 'zone' + this.count++,
            },
          ]
        } else {
          data = []
        }

        resolve(data)
      }, 500)
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
.mod-form
  padding 10px
  >>>.el-form-item
    margin-bottom 0
  >>>.el-input__inner
    color #fff !important
    width 130px
    height 32px
    line-height 32px
.resultList
  border-right 1px solid #41767d
  border-top 1px solid #41767d
  border-top-right-radius 3px
  padding-top 10px
  li
    padding 0 10px
    margin-bottom 10px
    cursor pointer
    &:hover
      opacity 0.8
  .item-num
    .num
      display inline-block
      background rgba(81, 169, 180, 0.54)
      color #fff
      width 42px
      height 42px
      text-align center
      line-height 42px
      margin-right 12px
  dd
    .title
      padding 0
      margin 0
      color #d2dddc
      font-size 14px
    p
      margin 0px
      color #bacdcb
.cont-info
  border 1px solid #41767d
  border-radius 3px
  margin 0 20px
  padding 10px
  .info-title
    text-align center
    color #fafafa
  .content
    color #fafafa
  .btn-box
    text-align right
</style>
