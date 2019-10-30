<template>
  <div class="mod-count">
    <div class="title tab-title">
      <span>节点({{ countInfo.node.count }})</span>
    </div>
    <div class="tab-content">
      <ul>
        <li v-for="(item, index) of countInfo.node.typeList" :key="index">
          <label class="slider-desc">
            <span class="text-ellipsis">{{ item.type | type2Chinese }}</span>
            <span class="fr">{{ item.num }}</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="(item.num / countInfo.node.count) * 100"
            :show-text="false"
          ></el-progress>
        </li>
      </ul>
    </div>
    <div class="title tab-title">
      <span>关系({{ countInfo.edge.count }})</span>
    </div>
    <div class="tab-content">
      <ul>
        <li v-for="(item, index) of countInfo.edge.labelList" :key="index">
          <label class="slider-desc">
            <span class="text-ellipsis">{{
              item.type | relation2Chinese
            }}</span>
            <span class="fr">{{ item.num }}</span>
          </label>
          <el-progress
            class="custom-slider"
            :percentage="(item.num / countInfo.edge.count) * 100"
            :show-text="false"
          ></el-progress>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      countInfo: {
        node: {
          count: 0,
          typeList: [],
        },
        edge: {
          count: 0,
          labelList: [],
        },
      },
    }
  },
  computed: {},
  methods: {
    init() {
      let ns = this.getAllNodes()
      let edg = this.getAllEdges()
      let np = []
      let rp = []
      this.countInfo.node.count = ns.length
      this.countInfo.edge.count = edg.length
      for (let i in ns) {
        if (!this.disRepeat(np, ns[i].nodeType)) {
          np.push({ type: ns[i].nodeType, num: 1 })
        } else {
          np.map(item => {
            if (item.type === ns[i].nodeType) {
              item.num = item.num + 1
              return item
            }
          })
        }
      }
      for (let j in edg) {
        if (!this.disRepeat(rp, edg[j].relationType)) {
          rp.push({ type: edg[j].relationType, num: 1 })
        } else {
          rp.map(item => {
            if (item.type === edg[j].relationType) {
              item.num = item.num + 1
              return item
            }
          })
        }
      }
      this.countInfo.node.typeList = np
      this.countInfo.edge.labelList = rp
    },
    // 去重
    disRepeat(arr, a) {
      let b = false
      arr.map(item => {
        if (item.type === a) {
          b = true
        }
      })
      return b
    },
    // 获取页面上所有节点数据
    getAllNodes() {
      let datas = []
      if (this.global.nodes.getIds) {
        let ids = this.global.nodes.getIds()
        for (let i in ids) {
          datas.push(this.global.nodes.get(ids[i]))
        }
      }
      return datas
    },
    getAllEdges() {
      let datas = []
      if (this.global.edges.getIds) {
        let ids = this.global.edges.getIds()
        for (let i in ids) {
          datas.push(this.global.edges.get(ids[i]))
        }
      }
      return datas
    },
  },
  created() {},
  mounted() {
    this.init()
  },
}
</script>
<style lang="stylus" scoped>
.mod-count
  ul>li
    height 30px
    line-height 30px
.slider-desc
  display inline-block
  width 33.3%
  vertical-align middle
  padding-right 5px
  color #fff
.custom-slider
  display inline-block
  width 66.7%
>>>.el-progress-bar__inner
  background #C58E64
</style>
