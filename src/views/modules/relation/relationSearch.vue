<template>
  <div class="fly-container">
    <div class="poscenter">
      <div class="lg">关系分析</div>
      <el-input
        placeholder="请输入证件号"
        v-model="kws"
        class="input-with-select"
      >
        <el-select v-model="relationType" slot="prepend" placeholder="模型选择">
          <el-option
            v-for="(item, index) of relationTypeList"
            :label="item.name"
            :value="item.type"
            :key="index"
          ></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="submitHandle">
          <span>分析</span>
        </el-button>
      </el-input>
    </div>
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
      let query = {
        keyword: this.kws,
        relationType: [this.relationType],
      }
      this.$router.push({
        name: 'analyse',
        query: query,
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
>>>.el-input__inner
  color #fff
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
