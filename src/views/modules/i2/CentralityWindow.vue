<template>
  <div class="centrality">
    <p
      v-for="(item,index) of resultList"
      :key="index"
    ><label class="nodes">{{item.node.label}}</label>关系数量：{{item.count}}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      resultList: []
    }
  },
  computed: {},
  methods: {
    init () {
      let selectNodes = this.global.network.getSelectedNodes();
      let edges = this.global.edges;
      var ids = edges.getIds();
      let result = [];
      let edgs = [];
      for (let i in selectNodes) {
        var node = this.global.nodes.get(selectNodes[i]);
        result.push({
          node: node,
          count: ''
        })
      }
      for (let j in ids) {
        var edg = this.global.edges.get(ids[j]);
        edgs.push(edg)
      }
      for (let k in result) {
        let ct = 0;
        edgs.map(item => {
          if (result[k].node.id === item.from || result[k].node.id === item.to) {
            ct++
          }
        })
        result[k].count = ct;
      }
      result.sort(function (a, b) {
        return b.count - a.count
      })
      console.log(result)
      this.resultList = result;
    }
  },
  created () {
    this.init();
  },
  mounted () { }
}
</script>
<style lang="stylus" scoped>
.centrality
  padding 0 10px
  color #fff
  .nodes
    margin-right 10px
    width 100px
    display inline-block
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
