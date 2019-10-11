<template>
  <fly-dialog
    :title="'管理'"
    width="980px"
    :show.sync="visible"
    @beforeCloseDialog="beforeClose"
  >
    <div class="mod-form">
      <el-form
        :inline="true"
        :model="dataForm"
        ref="dataForm"
      >
        <el-form-item>
          <el-input
            v-model="dataForm.keywords"
            placeholder="关键字"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="searchDataList()"
            size="small"
            type="success"
          >检索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :span="8">
        <div class="resultList clearfix">
          <ul>
            <li
              v-for="(item,index) of resultList"
              :key="index"
            >
              <dl class="clearfix">
                <dt class="item-num fl"><i class="num">{{++index}}</i></dt>
                <dd class="fl">
                  <h3 class="title">[{{item.recordTitle}}]分析结果</h3>
                  <p><span class="time">2019/10/10 11:50:35</span></p>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="cont-info">
          <div class="info-title">积分大狼狗卡帝国时代</div>
          <p class="content">阿里打击力度大沙发回来的机会 </p>
          <div class="btn-box">
            <span class="fly-btn btn-denger">删除</span>
            <span class="fly-btn">加载</span>
            <span class="fly-btn">重载</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </fly-dialog>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  components: {
    FlyDialog
  },
  props: {},
  data () {
    return {
      visible: false,
      resultList: [],
      dataForm: {
        label: '',
        title: ''
      },
      dataRule: {}
    }
  },
  computed: {
  },
  methods: {
    init () {

      let obj = {
        pageNumber: 1,
        pageSize: 10,
        sort: '',
        order: 'desc'
      }
      this.$api.listAllAnalyticalRecords(obj).then(({ data }) => {
        this.resultList = data && data.code === 200 ? data.result : [];
        console.log(data)
      }).then(() => {
        this.visible = true;
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.visible = false;
        }
      })
    },
    beforeClose () {
      this.$emit('refreshDataList')
      this.visible = false;
    }
  },
  created () { },
  mounted () { }
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
