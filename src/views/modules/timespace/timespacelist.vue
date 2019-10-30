<template>
  <div class="timespacelist">
    <div class="dir">
      <div class="list" @click="search">
        <span class="__icon el-icon-circle-check"></span>
        <span>全部</span>
      </div>
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="list"
        @click="filterList(item.title)"
      >
        <span :class="['__icon', item.icon]"></span>
        <span>{{ item.title }}</span>
      </div>
      <div class="list" @click="search">
        <span class="__icon el-icon-search"></span>
        <span>查询</span>
      </div>
    </div>
    <div class="tsimp">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            popper-class="datePicker"
            type="date"
            placeholder="选择开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate">
          <el-date-picker
            popper-class="datePicker"
            v-model="form.endDate"
            type="date"
            placeholder="选择结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="infoCoat1">
      <div class="infoCoat2">
        <div class="infoList">
          <el-timeline :reverse="false">
            <el-timeline-item
              placement="top"
              v-for="(item, index) in dataList"
              :key="index"
            >
              <div class="listCoat1">
                <div class="listCoat2">
                  <div>
                    <!-- 左侧图标部分 -->
                    <div class="infoItem" style="width: 17%">
                      <span
                        class="icon-zdy-feiji"
                        :style="iconStyle"
                        v-if="item.typeCode === '飞机'"
                      ></span>
                      <span
                        class="icon-zdy-huoche"
                        :style="iconStyle"
                        v-else-if="item.typeCode === '火车'"
                      ></span>
                      <span
                        class="icon-zdy-daba"
                        :style="iconStyle"
                        v-else-if="item.typeCode === '汽车'"
                      ></span>
                      <span
                        class="icon-zdy-fangzidichan"
                        :style="iconStyle"
                        v-else-if="item.typeCode === '旅馆'"
                      ></span>
                      <span
                        class="icon-zdy-qitaleixianshiqi"
                        :style="iconStyle"
                        v-else-if="item.typeCode === '网吧'"
                      ></span>
                      <span style="font-size: 14px"
                        >&nbsp;{{ item.typeCode }}出行信息</span
                      >
                    </div>
                    <!-- 第二排信息 飞机 && 火车 && 汽车 -->
                    <div
                      class="infoItem"
                      style="width: 32%"
                      v-if="
                        item.typeCode !== '旅馆' && item.typeCode !== '网吧'
                      "
                    >
                      <span style="font-size: 18px">
                        {{ item.startSstation }} - {{ item.destination }}
                      </span>
                      <span class="el-icon-time">
                        &nbsp;{{ item.startTime }}
                      </span>
                    </div>
                    <!-- 第二排信息 网吧 && 旅馆 -->
                    <div class="infoItem" style="width: 32%" v-else>
                      <span style="font-size: 18px">{{ item.name }}</span>
                      <span class="el-icon-time"
                        >&nbsp;{{ item.startTime }}</span
                      >
                    </div>
                    <!-- 第三排信息 飞机 && 火车 && 汽车 -->
                    <div
                      class="infoItem"
                      style="width: 23%"
                      v-if="
                        item.typeCode !== '旅馆' && item.typeCode !== '网吧'
                      "
                    >
                      <span class="icon-zdy-facheshikebiao"
                        >班次：&nbsp;{{ item.toolNumber }}</span
                      >
                    </div>
                    <!-- 第三排信息 网吧 && 旅馆 -->
                    <div class="infoItem" style="width: 23%" v-else>
                      <span class="icon-zdy-facheshikebiao"
                        >&nbsp;{{ item.addr || item.address }}</span
                      >
                    </div>
                    <!-- 第四排信息 飞机 **仓**座 -->
                    <div
                      class="infoItem"
                      style="width: 23%"
                      v-if="item.typeCode === '飞机'"
                    >
                      <span class="icon-zdy-yizi"
                        >&nbsp;{{ item.cabinPlace }}仓{{
                          item.seatNumber
                        }}</span
                      >
                    </div>
                    <!-- 第四排信息 火车 **车**座 -->
                    <div
                      class="infoItem"
                      style="width: 23%"
                      v-else-if="item.typeCode === '火车'"
                    >
                      <span class="icon-zdy-yizi"
                        >&nbsp;{{ item.cabinPlace }}车{{
                          item.seatNumber
                        }}</span
                      >
                    </div>
                    <!-- 第四排信息 大巴 **座 -->
                    <div
                      class="infoItem"
                      style="width: 23%"
                      v-else-if="item.typeCode === '汽车'"
                    >
                      <span class="icon-zdy-yizi"
                        >&nbsp;{{ item.seatNumber }}座</span
                      >
                    </div>
                    <!-- 第四排信息 大巴 **座 -->
                    <div
                      class="infoItem"
                      style="width: 23%"
                      v-else-if="item.typeCode === '汽车'"
                    >
                      <span class="icon-zdy-yizi"
                        >&nbsp;{{ item.seatNumber }}座</span
                      >
                    </div>
                    <!-- 第四排信息 宾馆 **房 -->
                    <div
                      class="infoItem"
                      style="width: 23%"
                      v-else-if="item.typeCode === '旅馆'"
                    >
                      <span class="icon-zdy-yizi"
                        >&nbsp;{{ item.roomNo }}房</span
                      >
                    </div>
                    <!-- 第四排信息 网吧 **座 -->
                    <div
                      class="infoItem"
                      style="width: 23%"
                      v-else-if="item.typeCode === '网吧'"
                    >
                      <span class="icon-zdy-yizi"
                        >&nbsp;{{ item.computerNo }}号机</span
                      >
                    </div>
                    <div class="infoItem" style="width: 5%">
                      <span
                        @click="gotoInfo(item)"
                        class="el-icon-d-arrow-right"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <el-pagination
        @current-change="changePage"
        :current-page="page"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalSize"
      ></el-pagination>
    </div>
    <div class="infoCard">
      <personal-info-card
        :IDNum="userData && userData.idNnumber"
        :name="userData && userData.name"
        :nationality="userData && userData.nation"
        :sex="userData && userData.sex"
        :birthday="userData && userData.birthday"
        :mobile="userData && userData.cellphone"
        :addr="userData && userData.currentAddress"
        @addToRelationAnalysis="addToRelationAnalysis"
      />
    </div>
  </div>
</template>

<script>
import personalInfoCard from '@/views/common/personalInfoCard'
import { searchList } from '@/api/timespace'
import compare from '@/utils/sort'
import Cookies from 'js-cookie'

export default {
  name: 'timespacelist',
  components: {
    personalInfoCard,
  },
  data() {
    return {
      // 导航列表
      navList: [
        {
          title: '飞机',
          value: 'air',
          icon: 'icon-zdy-feiji',
        },
        {
          title: '火车',
          value: 'train',
          icon: 'icon-zdy-huoche',
        },
        {
          title: '汽车',
          value: 'bus',
          icon: 'icon-zdy-daba',
        },
        {
          title: '旅馆',
          value: 'hotel',
          icon: 'icon-zdy-fangzidichan',
        },
        {
          title: '网吧',
          value: 'web',
          icon: 'icon-zdy-qitaleixianshiqi',
        },
      ],
      form: {
        startDate: Cookies.get('shikong_list_params')
          ? JSON.parse(Cookies.get('shikong_list_params')).startDate
          : '',
        endDate: Cookies.get('shikong_list_params')
          ? JSON.parse(Cookies.get('shikong_list_params')).endDate
          : '',
        idNumber: Cookies.get('shikong_list_params')
          ? JSON.parse(Cookies.get('shikong_list_params')).idNumber
          : '',
      },
      rules: {
        idNumber: this.filter_rules({ required: true, type: 'idCard' }),
        startDate: [
          { required: false, message: '请选择开始日期', trigger: 'blur' },
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'blur' },
        ],
      },
      userData: null,
      totalData: null,
      dataList: [], // 需要渲染的列表数据
      iconStyle: {
        // icon样式
        fontSize: '40px',
        overflow: 'inherit',
      },
      page: 1,
      pageSize: 10,
      totalSize: 1,
    }
  },
  created() {
    document.onkeydown = () => {
      if (window.event.keyCode === 13) {
        this.onSubmit('form')
      }
    }
  },
  mounted() {
    this.$route.query.form !== undefined && this.receiveRouter()
    document.addEventListener('click', this.handleDocumentClick)

    this.getList()
  },
  methods: {
    receiveRouter() {
      this.form = JSON.parse(JSON.stringify(this.$route.query.form))
    },
    filterList(type) {
      this.page = 1
      this.totalSize = 1
      const [oldList, newList] = [this.totalData, []]
      oldList.map(value => {
        if (value.typeCode === type) {
          newList.push(value)
        }
      })
      // this.totalData = newList
      this.dataList = newList.slice(0, this.pageSize)
    },
    search() {
      this.getList()
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getTimespaceList()
        }
      })
    },
    getTimespaceList() {
      this.$api.spacequery(this.from).then(({ data }) => {})
    },
    gotoInfo(item) {
      Cookies.set('shikong_list_params', this.form)

      Cookies.set('shikong_data', item)

      const maps = {
        fj: '飞机',
        qc: '汽车',
        hc: '火车',
        lg: '旅馆',
        wb: '网吧',
      }

      for (const key in maps) {
        if (maps[key] === item.typeCode) {
          this.$router.push({
            name: 'timespaceinfo',
            query: {
              type: key,
            },
          })
        }
      }
    },
    changePage(page) {
      this.dataList = this.totalData.slice(
        this.pageSize * (page - 1),
        page * this.pageSize,
      )
    },
    addToRelationAnalysis() {
      console.log(`this.userData=======${JSON.stringify(this.userData)}`)
    },
    getList(
      beginTime = this.form.startDate,
      endTime = this.form.endDate,
      identityNumber = this.form.idNumber,
    ) {
      searchList({
        beginTime,
        endTime,
        identityNumber,
      }).then(({ data }) => {
        if (data && parseInt(data.code) === 200) {
          const originResult = data.result
          /* 处理个人信息 */
          this.userData = originResult.crewEntity[0]

          /* 出路出行信息 */
          // 网吧和宾馆数没有typecode字段，需要手动加上
          originResult.bg.map(value => {
            value.typeCode = '旅馆'
          })
          originResult.wb.map(value => {
            value.typeCode = '网吧'
          })
          // 合并原始数据到同一层级
          let result = [
            ...originResult.fj, // 飞机
            ...originResult.hc, // 火车
            ...originResult.qc, // 汽车
            ...originResult.bg, // 宾馆
            ...originResult.wb, // 网吧
          ]

          result.map(value => {
            if (value.checkIn) {
              value.timestamp = new Date(value.checkIn).getTime()
            }
            if (value.startTime) {
              value.timestamp = new Date(value.startTime).getTime()
            }
            if (value.checkIn && !value.startTime) {
              value.startTime = value.checkIn
            }
          })

          result = result.sort(compare('timestamp'))

          this.totalData = result
          this.totalSize = result.length
          this.dataList = this.totalData.slice(0, this.pageSize)
        } else {
          this.$message.error(data.message)
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.timespacelist
      width 100%
      position absolute
      top 50px
      bottom 0
      display flex
      flex-direction column
   .tsimp
       width 606px
       margin 0 auto
       padding-top 23px
     .el-form-item
        margin 0 1px
     >>>.el-form-item__error
        top 50px!important
        left 0!important
   .infoCoat1
       width 1200px
       flex 1
       margin 0 auto
       margin-top 30px
       margin-bottom 30px
       overflow hidden
   .infoCoat2
       width 1220px
       height 100%
       margin 0 auto
       overflow-y  scroll
       /*padding 100px*/
   .infoList
       width 865px
       max-height 860px
       margin 0 auto
       margin-top 55px
     >>>.el-timeline-item__tail
       border-left 1px solid rgba(44, 239, 255, 1)
     >>>.el-timeline-item__node
       background-color rgba(44, 239, 255, 1)
     >>>.el-timeline-item
       padding  0
     >>>.el-timeline-item__timestamp
         position relative
         top 0.5px
         left -110px
         color #ffffff
         font-size 14px
     >>>.el-timeline-item__timestamp.is-top
         margin 0
         padding 0
     >>>.el-timeline-item__content
         position relative
         top -65px
         left -20px
       .listCoat1
         width 740px
         height 110px
         position relative
         top 0
         left 0
         right 0
         bottom 0
         margin 0 auto
         background-color rgba(44, 239, 255, 0.1)
         padding 10px
       .listCoat2
             width 720px
             height 90px
             position relative
             top 0
             left 0
             right 0
             bottom 0
             margin 0 auto
             background-color rgba(44, 239, 255, 0.1)
             border solid 1px rgba(44, 239, 255, 0.2)
           .infoItem
               float left
               display inline-block
               height 90px
               padding 20px 0
             span
               display inline-block
               width 100%
               text-align center
               color #ffffff
               font-size 16px
               line-height: 30px;
               overflow hidden
               text-overflow ellipsis
               white-space nowrap
           .infoItem:nth-child(2) span
               text-align initial
               line-height: 26px;
           .infoItem:nth-child(3),
           .infoItem:nth-child(4)
             span
               line-height: 113px;

.dir
  width: 100%;
  height: 60px;
  border-bottom:1px solid rgba(44, 239, 255, 0.4)
  background rgba(44, 239, 255, 0.3)
  text-align center
  span
    width: auto
  .list
    overflow hidden
    padding 10px 20px 0 0

    position relative
    &:after
        content ''
        position absolute
        right 0
        top 0
        transform translateX(10px)
        width 10px
        height 100%
        border-radius 12px / 80px
        box-shadow 0 0 2px #2cefff
  .list,
  .list span
    display inline-block
    width 100px
    text-align center
    color #ffffff
    font-size 14px
    line-height: 20px
</style>
