<template>
  <div class="relation-mode relation-bg">
    <div class="header">
      <img src="@/assets/img/relation.png" alt="" />
      <span>关系分析</span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      kws: '',
      relationType: '',
      relationTypeList: [],
    }
  },
  computed: {},
  methods: {
    init() {
      this.$api.getAllRelationType().then(({ data }) => {
        if (data && data.code === 200) {
          this.relationTypeList = data.result.map(item => {
            return {
              type: item.type,
              name: item.name,
            }
          })
        }
      })
    },
    submitHandle() {
      let params = {
        keyword: this.kws,
        param: this.relationType,
      }
      this.$api.nodeDigRelation(params).then(({ data }) => {
        if (data && data.code === 200) {
          console.log(data)
          this.$router.push({
            path: '/analyse',
            params: { id: '1' },
          })
        }
      })
    },
  },
  created() {
    this.init()
  },
  mounted() {},
}
</script>
<style lang="stylus" scoped>
>>>.el-select .el-input
  width 130px
  color #fff
>>>.el-input-group__append, >>>.el-input-group__prepend
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.3)
>>>.el-input-group__append
  color #04dafc
.relation-mode.relation-bg
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  &:before
    position fixed
    top 0
    left 0
    z-index -1
    width 100%
    height 100%
    content ''
    background url('~@/assets/img/i2bg.png') no-repeat center
    background-size cover
.header
  height 60px
  border-bottom 1px solid #404553
  background-color rgba(0, 136, 150, 0.5)
  margin-bottom 20px
  display: flex
  justify-content: center
  align-items center
  img
    width auto
    height 37px
    margin-right: 15px
  span
    position: static;
    font-weight bold
    color: #fff;
    font-size: 24px;


.lg
  text-align center
  color #39ccdf
  font-size 24px
  margin-bottom 26px
  letter-spacing 16px
.poscenter
  width 610px
  margin-left auto
  margin-right auto
  position relative
  top 28%
  margin-top -60px
</style>
