<template>
  <div>
    <fly-dialog
      :title="'共享'"
      width="980px"
      :show.sync="visible"
      @beforeCloseDialog="beforeClose"
    >
      <div class="mod-form">
        <el-form :inline="true" :model="dataForm" ref="dataForm">
          <el-form-item>
            <el-input
              v-model="dataForm.keywords"
              placeholder="请输入关键字"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="searchDataList(dataForm.keywords)"
              size="small"
              type="success"
              >检索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="resultList clearfix">
            <ul>
              <li
                v-for="(item, index) of resultList"
                :key="index"
                :class="{ active: index === activeLi }"
                @click="resultLiClick(index, item.id)"
              >
                <dl class="clearfix">
                  <dt class="item-num fl">
                    <i class="num">{{ ++index }}</i>
                  </dt>
                  <dd class="fl">
                    <h3 class="title">[{{ item.recordTitle }}]分析结果</h3>
                    <p>
                      <span class="time">{{ item.createTime }}</span>
                    </p>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="cont-info">
            <div class="info-title">{{ activeInfo.recordTitle }}</div>
            <p class="content">{{ activeInfo.description }}</p>
            <div class="btn-box" v-if="resultList.length > 0">
              <span class="fly-btn" @click="share()">发起共享</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </fly-dialog>
    <!-- 发起共享 -->
    <share v-if="shareVisible" ref="shareData" @refreshDataList="init"></share>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import Share from './ShareWindow'
export default {
  components: {
    FlyDialog,
    Share,
  },
  data() {
    return {
      visible: false,
      shareVisible: false,
      resultDist: [], // 菜单列表，模糊查询时和这个列表查询
      resultList: [],
      activeInfo: {
        recordTitle: '',
        description: '',
      },
      activeLi: 0,
      currCacheNodes: [],
      dataForm: {
        label: '',
        title: '',
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init() {
      let obj = {
        pageNumber: 1,
        pageSize: 10,
        sort: '',
        order: 'desc',
        userName: JSON.parse(this.$Cookies.get('user_info')).username,
      }
      this.$api
        .listAllAnalyticalRecords(obj)
        .then(({ data }) => {
          this.resultList = data && data.code === 200 ? data.result : []
          this.resultDist = data && data.code === 200 ? data.result : []
          if (this.resultList.length > 0) {
            this.activeInfo = this.resultList[0]
            this.currCacheNodes = this.resultList[0].json
          } else {
            this.activeInfo = {
              recordTitle: '',
              description: '',
            }
          }
          this.activeLi = 0
        })
        .then(() => {
          this.visible = true
        })
    },
    // 列表点击
    resultLiClick(index, id) {
      this.activeLi = --index
      for (var i in this.resultList) {
        if (this.resultList[i].id === id) {
          this.activeInfo = this.resultList[i]
          break
        }
      }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.visible = false
        }
      })
    },
    // 发起共享
    share() {
      this.shareVisible = true
      this.visible = false
      this.$nextTick(() => {
        this.$refs.shareData.init(this.activeInfo)
      })
    },
    beforeClose() {
      this.visible = false
    },
    searchDataList(str) {
      const queryString = str ? str.trim() : undefined
      if (queryString && queryString !== '') {
        const searchList = []
        this.resultDist.map(item => {
          if (item.recordTitle.includes(queryString)) {
            searchList.push(item)
          }
        })
        console.log(searchList)
        this.resultList = searchList
      } else {
        this.init()
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
.mod-form
  padding 10px
  >>>.el-form-item
    margin-bottom 0
  >>>.el-input__inner
    color #fff
    background: transparent
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
.resultList
  li.active
    h3.title
      color #fa843d
    .time
      color #fa843d
    .num
      color #fe9b05
</style>
