<template>
    <div class="timespaceinfo">
      <div class="seatInfoCoat1">
          <div class="seatInfoCoat2">
            <div class="seatInfoCoat3">
              <div class="seatInfo">
                <!--<div v-for="item in 100" :key="item">
                  {{item}}
                </div>-->
                <div class="journeyInfo clearfix">
                  <div class="infoItem" style="width: 20%">
                    <span><img src="../../../assets/img/huoche.png" alt=""></span>
                    <span style="font-size: 14px">火车出行信息</span>
                  </div>
                  <div class="infoItem" style="width: 30%">
                    <span style="font-size: 18px">成都东  to  广安南</span>
                    <span class="el-icon-time">&nbsp;&nbsp;2015年6月25日11:41</span>
                  </div>
                  <div class="infoItem" style="width: 25%">
                    <span class="el-icon-time">&nbsp;&nbsp;D5172次</span>
                  </div>
                  <div class="infoItem" style="width: 25%">
                    <span class="el-icon-time">&nbsp;&nbsp;05车11F</span>
                  </div>
                </div>
                <div class="seatDesc clearfix">
                  <div class="infoItem2" style="width: 40%">
                    <span style="font-size: 14px">&nbsp;&nbsp;第5车厢</span>
                  </div>
                  <div class="infoItem2" style="width: 20%">
                    <span><span class="el-icon-time noOne"></span>&nbsp;&nbsp;无乘客</span>
                  </div>
                  <div class="infoItem2" style="width: 20%">
                    <span><span class="el-icon-time exist"></span>&nbsp;&nbsp;固定乘客</span>
                  </div>
                  <div class="infoItem2" style="width: 20%">
                    <span><span class="el-icon-time parties"></span>&nbsp;&nbsp;当事人</span>
                  </div>
                </div>
                <div class="seatLayout">
                  <div class="hc_seatLayout">
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
                      <div class="list">
                        <span> 过道</span>
                      </div>
                      <div class="list">
                        <span>C</span>
                      </div>
                      <div class="list">
                        <span>D</span>
                      </div>
                      <div class="list">
                        <span>E</span>
                      </div>
                    </div>
                    <div class="seatList clearfix" @click.stop v-for="(item, index) in 18" :key="index">
                      <div class="list">
                        <span>{{item}}</span>
                      </div>
                      <div class="list">
                        <span class="el-icon-time" @click="showInfo(item,'A')" :class="seatType(item,'A')"></span>
                      </div>
                      <div class="list">
                        <span class="el-icon-time" @click="showInfo(item,'B')" :class="seatType(item,'B')"></span>
                      </div>
                      <div class="list">
                        <span></span>
                      </div>
                      <div class="list">
                        <span class="el-icon-time" @click="showInfo(item,'C')" :class="seatType(item,'C')"></span>
                      </div>
                      <div class="list">
                        <span class="el-icon-time" @click="showInfo(item,'D')" :class="seatType(item,'D')"></span>
                      </div>
                      <div class="list">
                        <span class="el-icon-time" @click="showInfo(item,'E')" :class="seatType(item,'E')"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      <div class="infoCard">
        <personal-info-card></personal-info-card>
      </div>
      <div id="passengerInfo" class="passengerInfo" v-show="passengerInfoShow">
          <personal-info-card></personal-info-card>
        </div>
    </div>
</template>

<script>
import personalInfoCard from '@/views/common/personalInfoCard'
export default {
  name: 'timespaceinfo',
  components: {
    personalInfoCard
  },
  data () {
    return {
      passengerInfoShow: false,
      partiesInfo: {}
    }
  },
  computed: {
    seatType (x, y) {
      return (x, y) => {
        let noOne = false
        let exist = false
        let parties = true
        return {
          noOne: noOne,
          exist: exist,
          parties: parties
        }
      }
    }
  },
  mounted () {
    this.receiveRouter()
    document.addEventListener('click', this.handleDocumentClick);
  },
  methods: {
    // 获取路由参数
    receiveRouter () {
      this.partiesInfo = JSON.parse(JSON.stringify(this.$route.params.partiesInfo))
    },
    // 显示座位乘客信息 x,y为座位信息
    showInfo (x, y) {
      this.passengerInfoShow = true
    },
    // 点击空白地方隐藏乘客信息
    handleDocumentClick (e) {
      if (this.passengerInfoShow) {
        let $passengerInfo = document.getElementById('passengerInfo');
        if (!$passengerInfo.contains(e.target)) {
          this.passengerInfoShow = false;
        }
      }
    }
  }
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
      width 680px
      height 830px
      position relative
      left 189px
    .seatInfoCoat2
      width 660px
      height 810px
      border 1px solid rgba(44, 239, 255, 0.2)
    .seatInfoCoat3
      width 640px
      height 790px
      overflow hidden
    .seatInfo
        width: 660px;
        height: 790px;
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
      .journeyInfo
          width 100%
          height 90px
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
      .hc_seatLayout
         .columnName
           width 100%
           height 40px
         .list
           float left
           display inline-block
           width 14%
           height 40px
           padding 10px 0
           text-align center
           border-bottom 1px solid #143d4b
         .list:nth-child(4n)
           width 16%
         .list span
           color #ffffff
           font-size 18px
    .passengerInfo
      position absolute
      left 905px
      top 120px
</style>
