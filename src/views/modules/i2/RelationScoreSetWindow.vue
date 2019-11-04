<template>
  <fly-dialog
    :title="'亲密度分析--权值选择'"
    width="750px"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mode-add-update">
      <div
        class="line-block"
        v-for="(item, index) of relationTypeList"
        :key="index"
      >
        <label>
          {{ item.name }}
          <el-slider
            :max="20"
            v-model="item.value"
            @change="handleChange"
          ></el-slider>
          <span class="num">{{ item.value }}</span>
        </label>
      </div>
    </div>
    <span slot="ft" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </fly-dialog>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
// import { renderNodes } from './js/renderNodes'
import { Node } from './js/entity/Node'
export default {
  components: {
    FlyDialog,
  },
  props: {},
  data() {
    return {
      visible: false,
      node: [],
      relationTypeList: [],
      value1: 0,
      dataForm: {
        checkList: [],
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(node) {
      this.node = node
      this.$api
        .closenessAnalyse({ keyword1: node.keyword })
        .then(({ data }) => {
          if (data && data.code === 200) {
            this.relationTypeList = data.result
          }
        })
        .then(() => {
          this.visible = true
        })
    },
    getRelationScore(kw) {},
    // 表单提交
    dataFormSubmit() {},
    /**
     * 保存或者修改关系
     */
    saveOrUpdateGx() {
      console.log(this.edge)
    },
    handleChange(val) {
      console.log(val)
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
>>>.el-checkbox
  color #fff
  font-weight 500
  font-size 14px
  cursor pointer
  -moz-user-select none
  -webkit-user-select none
  -ms-user-select none
  user-select none
  margin-right 30px
.mode-add-update
  padding 10px
  padding-left 34px
  >>>.el-input__inner
    color #fff !important
.line-block
  position relative
  display inline-block
  width 150px
  margin-right 55px
  color #fff
  .num
    position absolute
    right -28px
    bottom 8px
</style>
