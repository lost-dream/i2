<template>
<div class="personalInfoCard">
  <div class="cardCoat1">
    <div class="cardCoat2">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>人员信息</span>
          <el-button style="float: right; padding: 0" icon="el-icon-postcard" type="text"></el-button>
        </div>
        <div class="cardImg">
          <img src="" alt="">
        </div>
        <div class="cardInfo">
          <div class="list">
            <span>证件号码</span>&nbsp;&nbsp;
            <span>510184199912095586</span>
          </div>
          <div class="list">
            <span>姓名</span>&nbsp;&nbsp;
            <span>丁小锐</span>
          </div>
          <div class="list">
            <span>民族</span>&nbsp;&nbsp;
            <span>汉族</span>
          </div>
          <div class="list">
            <span>性别</span>&nbsp;&nbsp;
            <span>女</span>
          </div>
          <div class="list">
            <span>出生日期</span>&nbsp;&nbsp;
            <span>1999年12月09日</span>
          </div>
          <div class="list">
            <span>联系电话</span>&nbsp;&nbsp;
            <span>15208177654</span>
          </div>
          <div class="list">
            <span>现居地</span>&nbsp;&nbsp;
            <span>四川省成都市青羊区清江东路锦绣花苑5栋2单元1120室</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'personalInfoCard'
}
</script>

<style lang="stylus" scoped>
 .personalInfoCard
    margin 0 auto
    position relative
  .cardCoat1
    width 300px
    height 620px
    position relative
    top 0
    left 0
    right 0
    bottom 0
    margin 0 auto
    background-color rgba(44, 239, 255, 0.1)
    padding 10px
  .cardCoat2
      width 280px
      height 600px
      position relative
      top 0
      left 0
      right 0
      bottom 0
      margin 0 auto
      background-color rgba(44, 239, 255, 0.1)
      border solid 1px rgba(44, 239, 255, 0.2)
    >>>.el-card__header
      color #ffffff
      font-size 16px
      border-bottom none
      padding 18px 20px 0 20px
    .box-card {
      width: 100%;
      height 100%
      background-color transparent
    }
    .el-card
      border none
    .cardImg
      width 188px
      height 196px
      margin 0 auto
      border solid 1px rgba(44, 239, 255, 1)
    >>>.el-button
      color #ffffff!important
      font-size 20px
    .cardInfo
      .list
        margin 9px
        color #ffffff
        font-size 14px
</style>
