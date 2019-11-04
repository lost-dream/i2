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
              :data="department"
              :props="defaultProps"
              show-checkbox
              @check-change="handleCheckChange"
            >
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="cont-info">
            <p class="info-title">{{ info.recordTitle }}</p>
            <p class="content">{{ info.description }}</p>
          </div>
          <div class="modle-title">已选用户</div>
          <div class="selectedUser">
            <el-tag size="small" type="success">测试1</el-tag>
          </div>
          <div class="toshare">
            <span class="fly-btn" @click="toshare">确定共享</span>
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
      info: {
        recordTitle: '',
        description: '',
      },
      department: [
        // {
        //   label: '省公安厅',
        //   children: [
        //     { label: '市厅', children: [{ label: '李四' }] },
        //     { label: '张三' },
        //   ],
        // },
      ],
      defaultProps: {
        children: 'list',
        label: 'title',
      },
      count: 1,
    }
  },
  computed: {},
  methods: {
    init(activeInfo) {
      this.info = activeInfo
      this.visible = true
    },
    gitAllUser() {
      let params = {
        page: 1,
        size: 99999,
      }
      this.$api.getAllUser(params).then(({ data }) => {
        if (data && data.code === 200) {
          let arr = data.data
          this.department = this.buildDpt(arr)
          console.log(this.department)
        }
      })
    },
    buildDpt(arr) {
      let _arr = arr
      for (let i in _arr) {
        if (_arr[i].u != null) {
          _arr[i].list = _arr[i].list.concat(_arr[i].u)
        }
        if (this.hasChildren(_arr[i])) {
          this.buildDpt(_arr[i].list)
        }
      }
      return _arr
    },
    hasChildren(obj) {
      let b = false
      if (obj.list && obj.list.length > 0) {
        b = true
      }
      return b
    },
    // 表单提交
    toshare() {
      let params = {
        analyticalRecordsId: '5bbff27c39c04802a16c6bd68d88b250',
        targetUserName: 'admin',
        userName: JSON.parse(this.$Cookies.get('user_info')).username,
      }
      this.$api.shareAnalyticalRecords(params).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
            message: '分享成功！',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            },
          })
        }
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    beforeClose() {
      this.$emit('refreshDataList')
      this.visible = false
    },
  },
  created() {},
  mounted() {
    this.gitAllUser()
  },
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
.selectedUser
  min-height 100px
  border 1px solid #41767d
  margin 10px 20px
  border-radius 3px
.modle-title
  color #fff
  margin-left 20px
  margin-top 10px
>>>.el-tag
  margin 5px
.toshare
  text-align right
  margin 20px 10px
</style>
