<template>
  <div class="personalInfoCard">
    <div class="cardCoat1">
      <div class="cardCoat2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>人员信息</span>
            <el-button
              style="float: right; padding: 0"
              icon="el-icon-postcard"
              type="text"
            ></el-button>
          </div>
          <div class="cardImg">
            <img :src="avatar" alt="" />
          </div>
          <div class="cardInfo">
            <div class="list">
              <span>证件号码</span>&nbsp;&nbsp;
              <span>{{ IDNum }}</span>
            </div>
            <div class="list">
              <span>姓名</span>&nbsp;&nbsp;
              <span>{{ name }}</span>
            </div>
            <div class="list">
              <span>民族</span>&nbsp;&nbsp;
              <span>{{ nationality }}</span>
            </div>
            <div class="list">
              <span>性别</span>&nbsp;&nbsp;
              <span>{{ realSex }}</span>
            </div>
            <div class="list">
              <span>出生日期</span>&nbsp;&nbsp;
              <span>{{ birthday }}</span>
            </div>
            <div class="list">
              <span>联系电话</span>&nbsp;&nbsp;
              <span>{{ mobile }}</span>
            </div>
            <div class="list">
              <span>现居地</span>&nbsp;&nbsp;
              <span>{{ addr }}</span>
            </div>
          </div>
          <div class="timespaceBut" v-if="showButton">
            <el-button
              class="sureBut"
              size="mini"
              type="primary"
              @click="addToRelationAnalysis"
            >
              <span>添加到关系分析</span>
            </el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personalInfoCard',
  props: {
    avatar: {
      default: '',
      required: false,
      type: String,
    },
    IDNum: {
      default: '',
      required: false,
      type: [Number, String],
    },
    name: {
      default: '',
      required: false,
      type: String,
    },
    nationality: {
      default: '',
      required: false,
      type: String,
    },
    sex: {
      // 0 女 1 男
      default: '',
      required: false,
      type: [String, Number],
    },
    birthday: {
      default: '',
      required: false,
      type: String,
    },
    mobile: {
      default: '',
      required: false,
      type: [String, Number],
    },
    addr: {
      default: '',
      required: false,
      type: String,
    },
    showButton: {
      default: true,
      required: false,
      type: Boolean,
    },
  },
  computed: {
    realSex(value) {
      return value - 0 === 1 ? '女' : '男'
    },
  },
  methods: {
    addToRelationAnalysis() {
      this.$emit('addToRelationAnalysis')
    },
  },
}
</script>

<style lang="stylus" scoped>
.personalInfoCard
   margin 0 auto
   position relative
 .cardCoat1
   width 300px
   background-color rgba(44, 239, 255, 0.1)
   padding 10px
 .cardCoat2
   width 280px
   background-color rgba(44, 239, 255, 0.1)
   border solid 1px rgba(44, 239, 255, 0.2)
   >>>.el-card__header
     color #ffffff
     font-size 16px
     border-bottom none
     padding 18px 20px 0 20px
   .box-card
     width: 100%;
     height 100%
     background-color transparent
   .el-card
     border none
   .cardImg
     width 188px
     height 196px
     margin 0 auto
     border solid 1px rgba(44, 239, 255, 1)
   >>>.el-button
     color #ffffff!important
     font-size 14px
   .cardInfo
     .list
       margin 9px
       color #ffffff
       font-size 14px
 .timespaceBut
   .el-button--primary
     background-color rgba(70, 111, 50, 1)
     border-color: rgba(70, 111, 50, 1)
</style>
