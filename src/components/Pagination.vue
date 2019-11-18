<template>
  <!-- 二次封装 element-ui 分页器 -->
  <div class="pagination">
    <el-pagination
      v-if="show"
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="size"
      :current-page="curPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data: () => {
    return {
      page: null,
    }
  },
  props: {
    // 每页显示的条数
    size: {
      type: Number,
      default: 10,
    },
    // 总页数
    totalPage: {
      type: [Number, String],
    },
    // 当前展示第几页
    curPage: {
      type: [Number, String],
      default: 1,
    },
  },
  computed: {
    totalCount() {
      return this.size * this.totalPage
    },
    show() {
      return this.totalPage > 1
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.$emit('handleCurrentChange', this.page)
    },
  },
}
</script>

<style lang="stylus" scoped>
.pagination
  >>> .el-pagination
    text-align center
    &.is-background
      .el-pager
        li
          border-radius 2px
          border 1px solid #143d4b
          font-weight 400
          color #fff
          background-color rgba(44,239,255,0.3)
          &:not(.disabled).active
            border 1px solid rgba(218, 218, 218, 1)
      .btn-prev, .btn-next
        border-radius 2px
        background-color rgba(44, 239, 255, 0.2)
        font-weight 400
        color #fff
        &:disabled
          background-color rgba(44, 239, 255, 0.1) !important
</style>
