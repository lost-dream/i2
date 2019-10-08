<template>
  <div class="timespaceinfo">
    <div class="seatInfoCoat1">
      <div class="seatInfoCoat2">
        <div class="seatInfoCoat3">
          <div class="seatInfo">
            <!--<div v-for="item in 100" :key="item">
                  {{item}}
                </div>-->
            <div
              v-if="tooltype == 'lg' || tooltype == 'wb'"
              class="journeyInfo clearfix"
            >
              <div class="infoItem" style="width: 100%;height: auto!important;">
                <span
                  style="font-size: 14px;text-align: initial;padding: 0 30px;height: auto;font-size: 18px;"
                  >{{
                    tooltype == 'lg' ? '旅馆名称' : '网吧名称'
                  }}：背包十年</span
                >
              </div>
            </div>
            <div v-else class="journeyInfo clearfix">
              <div class="infoItem" style="width: 20%">
                <span><img src="../../../assets/img/huoche.png" alt=""/></span>
                <span style="font-size: 14px">火车出行信息</span>
              </div>
              <div class="infoItem" style="width: 30%">
                <span style="font-size: 18px">成都东 to 广安南</span>
                <span class="el-icon-time">&nbsp;&nbsp;2015年6月25日11:41</span>
              </div>
              <div class="infoItem" style="width: 25%">
                <span class="icon-zdy-facheshikebiao">&nbsp;&nbsp;D5172次</span>
              </div>
              <div class="infoItem" style="width: 25%">
                <!--<span class="icon-zdy-yizi">&nbsp;&nbsp;05车11F</span>-->
              </div>
            </div>
            <div v-if="tooltype == 'lg'" class="seatDesc clearfix">
              <div class="infoItem2" style="width: 40%">
                <span style="font-size: 14px"
                  >&nbsp;&nbsp;2015年6月25日11:41</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="el-icon-place noOne"></span
                  >&nbsp;&nbsp;无住户</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="el-icon-place exist"></span
                  >&nbsp;&nbsp;已有住户</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="el-icon-place parties"></span
                  >&nbsp;&nbsp;当事人</span
                >
              </div>
            </div>
            <div v-else-if="tooltype == 'wb'" class="seatDesc clearfix">
              <div class="infoItem2" style="width: 40%">
                <span style="font-size: 14px"
                  >&nbsp;&nbsp;2015年6月25日11:41</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="icon-zdy-yizi noOne"></span
                  >&nbsp;&nbsp;无人</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="icon-zdy-yizi exist"></span
                  >&nbsp;&nbsp;有人</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="icon-zdy-yizi parties"></span
                  >&nbsp;&nbsp;当事人</span
                >
              </div>
            </div>
            <div v-else class="seatDesc clearfix">
              <div class="infoItem2" style="width: 40%">
                <span style="font-size: 14px">&nbsp;&nbsp;第5车厢</span>
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="icon-zdy-yizi noOne"></span
                  >&nbsp;&nbsp;无乘客</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="icon-zdy-yizi exist"></span
                  >&nbsp;&nbsp;固定乘客</span
                >
              </div>
              <div class="infoItem2" style="width: 20%">
                <span
                  ><span class="icon-zdy-yizi parties"></span
                  >&nbsp;&nbsp;当事人</span
                >
              </div>
            </div>
            <div class="seatLayout">
              <div v-if="tooltype == 'hc'" class="hc_seatLayout">
                <div class="columnName clearfix">
                  <div class="list">
                    <span></span>
                  </div>
                  <div class="list">
                    <span>A</span>
                  </div>
                  <div class="list">
                    <span>B</span>
                  </div>
                  <div class="list aisle">
                    <span> 过道</span>
                  </div>
                  <div class="list">
                    <span>C</span>
                  </div>
                  <div class="list">
                    <span>D</span>
                  </div>
                  <div class="list">
                    <span>F</span>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-for="(item, index) in 11"
                  :key="index"
                >
                  <div class="list">
                    <span>{{ item }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'A'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'A')"
                        :class="seatType(item, 'A')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'B'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'B')"
                        :class="seatType(item, 'B')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'C'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'C')"
                        :class="seatType(item, 'C')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'D'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'D')"
                        :class="seatType(item, 'D')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'F'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'F')"
                        :class="seatType(item, 'F')"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-else-if="tooltype == 'fj'" class="fj_seatLayout">
                <div class="columnName clearfix">
                  <div class="list">
                    <span></span>
                  </div>
                  <div class="list">
                    <span>A</span>
                  </div>
                  <div class="list">
                    <span>C</span>
                  </div>
                  <div class="list aisle">
                    <span> 过道</span>
                  </div>
                  <div class="list">
                    <span>D</span>
                  </div>
                  <div class="list">
                    <span>E</span>
                  </div>
                  <div class="list">
                    <span>F</span>
                  </div>
                  <div class="list">
                    <span>G</span>
                  </div>
                  <div class="list aisle">
                    <span> 过道</span>
                  </div>
                  <div class="list">
                    <span>H</span>
                  </div>
                  <div class="list">
                    <span>K</span>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-for="(item, index) in 11"
                  :key="index"
                >
                  <div class="list">
                    <span>{{ item }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'A'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'A')"
                        :class="seatType(item, 'A')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'B'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'B')"
                        :class="seatType(item, 'B')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'C'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'C')"
                        :class="seatType(item, 'C')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'D'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'D')"
                        :class="seatType(item, 'D')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'E'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'E')"
                        :class="seatType(item, 'E')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'G'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'G')"
                        :class="seatType(item, 'G')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle">
                    <span></span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'H'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'H')"
                        :class="seatType(item, 'H')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item + 'K'"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showInfo(item, 'K')"
                        :class="seatType(item, 'K')"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-else-if="tooltype == 'qc'" class="qc_seatLayout">
                <div class="columnName clearfix">
                  <div class="list">
                    <span></span>
                  </div>
                  <div class="list">
                    <span>A</span>
                  </div>
                  <div class="list">
                    <span>B</span>
                  </div>
                  <div class="list aisle">
                    <span> 过道</span>
                  </div>
                  <div class="list">
                    <span>C</span>
                  </div>
                  <div class="list">
                    <span>D</span>
                  </div>
                </div>
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-for="(item, index) in 11"
                  :key="index"
                >
                  <div class="list">
                    <span>{{ item }}</span>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="(item - 1) * 4 + 1"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showQcInfo((item - 1) * 4 + 1)"
                        :class="seatType(item, 'A')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="(item - 1) * 4 + 2"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showQcInfo((item - 1) * 4 + 2)"
                        :class="seatType(item, 'B')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list aisle" v-if="item !== 11">
                    <span></span>
                  </div>
                  <div class="list aisle" v-else>
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="(item - 1) * 4 + 3"
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="showQcInfo((item - 1) * 4 + 3)"
                        :class="seatType(item, ' ')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="
                        item !== 11 ? (item - 1) * 4 + 3 : (item - 1) * 4 + 4
                      "
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="
                          showQcInfo(
                            item !== 11
                              ? (item - 1) * 4 + 3
                              : (item - 1) * 4 + 4,
                          )
                        "
                        :class="seatType(item, 'C')"
                      ></span>
                    </el-tooltip>
                  </div>
                  <div class="list">
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="
                        item !== 11 ? (item - 1) * 4 + 4 : (item - 1) * 4 + 5
                      "
                      placement="top"
                    >
                      <span
                        class="icon-zdy-yizi"
                        @click="
                          showQcInfo(
                            item !== 11
                              ? (item - 1) * 4 + 4
                              : (item - 1) * 4 + 5,
                          )
                        "
                        :class="seatType(item, 'D')"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-else-if="tooltype == 'lg'" class="lg_seatLayout">
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-for="(item, index) in 5"
                  :key="index"
                >
                  <div class="list" style="height: 100px">
                    <span>{{ item }}F</span>
                  </div>
                  <div
                    class="list lgList"
                    v-for="(item2, index2) in 26"
                    :key="index2"
                  >
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item2 + ''"
                      placement="top"
                    >
                      <span
                        class="el-icon-place"
                        @click="showLgInfo(item, item2)"
                        :class="seatType(item, item2)"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-else-if="tooltype == 'wb'" class="wb_seatLayout">
                <div
                  class="seatList clearfix"
                  @click.stop
                  v-for="(item, index) in 5"
                  :key="index"
                >
                  <div class="list" style="height: 100px">
                    <span>{{ wbArea(item) }}&nbsp;区域</span>
                  </div>
                  <div
                    class="list lgList"
                    v-for="(item2, index2) in 26"
                    :key="index2"
                  >
                    <el-tooltip
                      popper-class="atooltip"
                      class="item"
                      effect="dark"
                      :content="item2 + (item - 1) * 26"
                      placement="top"
                    >
                      <span
                        class="el-icon-place"
                        @click="showWbInfo(item, item2 + (item - 1) * 26)"
                        :class="seatType(item, item2 + (item - 1) * 26)"
                      ></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="tooltype = 'fj'">飞机</el-button>
      <el-button type="primary" @click="tooltype = 'lg'">旅馆</el-button>
      <el-button type="primary" @click="tooltype = 'hc'">火车</el-button>
      <el-button type="primary" @click="tooltype = 'qc'">汽车</el-button>
      <el-button type="primary" @click="tooltype = 'wb'">网吧</el-button>
    </div>
    <div class="infoCard">
      <personal-info-card></personal-info-card>
    </div>
    <div id="passengerInfo" class="passengerInfo" v-show="passengerInfoShow">
      <div v-if="personCard.length > 1">
        <span
          @click="okCard = item"
          v-for="(item, index) in personCard.length"
          :key="index"
        >
          <span :class="{ okCard: okCard == item }" class="cardList"
            >旅客{{ item }}</span
          >
        </span>
      </div>
      <personal-info-card></personal-info-card>
    </div>
  </div>
</template>

<script>
import personalInfoCard from '@/views/common/personalInfoCard'
export default {
  name: 'timespaceinfo',
  components: {
    personalInfoCard,
  },
  data() {
    return {
      passengerInfoShow: false,
      tooltype: 'lg',
      okCard: 1,
      personCard: [],
      partiesInfo: {},
    }
  },
  computed: {
    seatType(x, y) {
      return (x, y) => {
        let noOne = false
        let exist = false
        let parties = true
        return {
          noOne: noOne,
          exist: exist,
          parties: parties,
        }
      }
    },
    wbArea(x) {
      return x => {
        let a = [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
        ]
        return a[x - 1]
      }
    },
  },
  mounted() {
    this.$route.params.form !== undefined && this.receiveRouter()
    document.addEventListener('click', this.handleDocumentClick)
  },
  methods: {
    // 获取路由参数
    receiveRouter() {
      this.partiesInfo = JSON.parse(
        JSON.stringify(this.$route.params.partiesInfo),
      )
    },
    // 显示座位乘客信息 x,y为座位信息
    showInfo(x, y) {
      this.personCard = [1]
      this.passengerInfoShow = true
    },
    // 显示汽车座位乘客信息 x为座位信息
    showQcInfo(x) {
      this.personCard = [1]
      this.passengerInfoShow = true
    },
    // 显示旅馆房间人员信息 x,y为房间坐标
    showLgInfo(x, y) {
      this.personCard = [1, 2, 3]
      this.passengerInfoShow = true
    },
    // 显示网吧人员信息 x,y为位置坐标
    showWbInfo(x, y) {
      this.personCard = [1]
      this.passengerInfoShow = true
    },
    // 点击空白地方隐藏乘客信息
    handleDocumentClick(e) {
      if (this.passengerInfoShow) {
        let $passengerInfo = document.getElementById('passengerInfo')
        if (!$passengerInfo.contains(e.target)) {
          this.passengerInfoShow = false
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.timespaceinfo
    position relative
  .seatInfoCoat1,
  .seatInfoCoat2
    padding 10px
    background-color rgba(44, 239, 255, 0.1)
  .seatInfoCoat1
    width 840px
    position relative
    left 189px
  .seatInfoCoat2
    width 820px
    border 1px solid rgba(44, 239, 255, 0.2)
  .seatInfoCoat3
    width 800px
    height auto
    overflow hidden
  .seatInfo
      width: 820px;
      min-height: 100px;
      background-color rgba(44, 239, 255, 0.2)
      overflow-y  scroll
    .noOne
      display inline!important
      color #333333!important
    .exist
      display inline!important
      color #ffffff!important
    .parties
      display inline!important
      color #e22929!important
      font-weight 900
    .journeyInfo
        width 100%
      .infoItem
        float left
        display inline-block
        height 90px
        padding 10px 0
        border-bottom 1px solid #143d4b
      .infoItem span
        display inline-block
        width 100%
        text-align center
        color #ffffff
        font-size 16px
        line-height: 30px;
      .infoItem:nth-child(2) span
        text-align initial
        line-height: 38px;
      .infoItem:nth-child(3),
      .infoItem:nth-child(4)
        span
          line-height: 113px;

    .seatDesc
        width 100%
        height 40px
      .infoItem2
        float left
        display inline-block
        height 40px
        padding 10px 0
        border-bottom 1px solid #143d4b
      .infoItem2:nth-child(1)
        padding 10px 20px
      .infoItem2 span
        display inline-block
        width 100%
        text-align center
        color #ffffff
        font-size 16px
        line-height: 20px;
      .infoItem2:nth-child(1) span
        text-align initial
  .seatInfoCoat3 .seatInfo .seatLayout
    .columnName
      width 100%
      height 40px
    .list
      float left
      display inline-block
      width 14%
      height 50px
      padding 10px 0
      text-align center
      border-bottom 1px solid #143d4b
    .list span
      color #ffffff
      font-size 18px
    .hc_seatLayout .list
         width 14%
    .hc_seatLayout .aisle
         width 16%
    .fj_seatLayout .list
         width 9%
    .qc_seatLayout .list
         width 16%
    .lg_seatLayout .list,
    .wb_seatLayout .list
         width 7%
    .wb_seatLayout .list:nth-child(27n+1) span
         font-size 14px
    .qc_seatLayout .aisle
         width 20%
  .passengerInfo
      position absolute
      left 1060px
      top 120px
    .cardList
      display inline-block
      margin 0px 10px 10px 0
      padding 5px 10px
      background-color rgba(44, 239, 255, 0.2)
      color #ffffff
    .okCard
      background-color rgba(44, 239, 255, 0.4)
</style>
<style lang="stylus">
.atooltip[x-placement^=top] .popper__arrow
  border-top-color #59bec6!important
.atooltip[x-placement^=top] .popper__arrow:after
  border-top-color #59bec6!important
.atooltip
  background: #59bec6 !important;
</style>
