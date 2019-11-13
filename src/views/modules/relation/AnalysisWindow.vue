<template>
  <fly-dialog
    :title="'关系挖掘'"
    width="600px"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mode-add-update">
      <p class="info_item">
        <label class="kws">{{ dataForm.label }}</label
        >{{ dataForm.keyword }}
        <span class="da" @click="archivesHandle">查看档案</span>
      </p>
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
      >
        <el-form-item label="关系类型">
          <el-checkbox-group v-model="dataForm.checkList">
            <el-checkbox
              v-for="(item, index) of relationTypeList"
              :label="item.type"
              :key="index"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
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
import { relationAnalysisExpand } from '@/api/relation'

export default {
  components: {
    FlyDialog,
  },
  props: ['originNodes', 'originEdges'],
  data() {
    return {
      visible: false,
      curNode: [],
      nodes: [],
      edges: [],
      relationTypeList: [],
      dataForm: {
        checkList: [],
        label: '',
        keyword: '',
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(curNode, nodes, edges) {
      this.curNode = curNode
      this.dataForm.label = curNode.label
      this.dataForm.keyword = curNode.keyword
      this.nodes = nodes
      this.edges = edges
      this.$api
        .getAllRelationType()
        .then(({ data }) => {
          if (data && data.code === 200) {
            this.relationTypeList = data.result.map(item => {
              return {
                type: item.type,
                name: item.name,
              }
            })
          }
        })
        .then(() => {
          this.visible = true
        })
    },
    // 表单提交
    dataFormSubmit() {
      console.log(this.edges)
      let oriNodes = this.nodes._data
      let oriEdges = this.edges._data
      let [reqNodes, reqEdges] = [[], []]
      for (let key in oriNodes) {
        reqNodes.push(oriNodes[key])
      }
      for (let key in oriEdges) {
        reqEdges.push(oriEdges[key])
      }

      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const curId2Str = this.curNode.id.toString()
          let symbol = curId2Str.length < 7 ? '0' + curId2Str : curId2Str
          symbol = symbol.replace(/88/g, '-')
          const no = symbol.split('-')[1]
          let level = symbol.split('-')[2]
          level++

          relationAnalysisExpand({
            keyword: this.curNode.keyword,
            relationType: !(this.dataForm.checkList instanceof Array)
              ? [this.dataForm.checkList]
              : this.dataForm.checkList,
            nodes: reqNodes,
            edges: reqEdges,
            no,
            level,
            nodeId: this.curNode.id,
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.visible = false
              let { nodes, edges } = data.result
              this.nodes.clear()
              this.edges.clear()
              this.nodes.add(nodes)
              this.edges.add(edges)
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    // 档案
    archivesHandle() {
      let routeData = this.$router.resolve({
        name: 'archives',
        query: { keyword: this.curNode.keyword },
      })
      window.open(routeData.href, '_blank')
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
  >>>.el-input__inner
    color #fff !important
.info_item
  color #fff
  .kws
    width 80px
    display inline-block
    text-align center
  .da
    margin-left 20px
    color #06b1c7
    cursor pointer
    &:hover
      opacity 0.8

>>>.el-form-item__label
  color #fff
</style>
