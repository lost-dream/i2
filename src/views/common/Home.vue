<template>
  <div class="mod-home">
    <ul id="nav">
      <li class="nav" @click="toUserCenter">
        <img src="../../assets/img/xiazai.png" alt />
        <p>个人中心</p>
      </li>
      <!--<li class="nav" @click="$router.push({ name: 'sys' })">-->
      <li
        class="nav"
        @click="
          goTo({
            id: '5fcc4fbcf47611e990fa0242ac150002',
            name: '后端',
            url: 'houduan',
            path: 'sys',
            type: '1',
          })
        "
      >
        <img src="../../assets/img/shezhi.png" alt />
        <p>设置</p>
      </li>
      <li class="nav" @click="logout">
        <img src="../../assets/img/tuichu.png" alt />
        <p>退出</p>
      </li>
    </ul>
    <div id="title">
      <h1>情报智能分析系统</h1>
      <img src="../../assets/img/titleDown.png" alt />
    </div>
    <div id="content">
      <ul class="content">
        <li
          v-for="(item, index) in menuListData"
          :key="index"
          @click="goTo(item)"
        >
          <!--<img :src="require('@/assets/img/' + path + '.png')" />-->
          <img :src="getImgUrl(item.path)" />
          <!--<img src="../../assets/img/i2.png" alt />-->
          <img src="../../assets/img/itemBg.png" alt />
          <p>{{ item.name }}</p>
        </li>
        <!--<li @click="goTo('i2')">
          <img src="../../assets/img/i2.png" alt />
          <img src="../../assets/img/itemBg.png" alt />
          <p>i2</p>
        </li>
        <li @click="goTo('ticket')">
          <img src="../../assets/img/phone.png" alt />
          <img src="../../assets/img/itemBg.png" alt />
          <p>话单分析</p>
        </li>
        <li @click="goTo('relation')">
          <img src="../../assets/img/relation.png" alt />
          <img src="../../assets/img/itemBg.png" alt />
          <p>关系分析</p>
        </li>
        <li @click="goTo('timespaceindex')">
          <img src="../../assets/img/timeSky.png" alt />
          <img src="../../assets/img/itemBg.png" alt />
          <p>时空分析</p>
        </li>
        <li @click="goTo('unioncase')">
          <img src="../../assets/img/sanjiao.png" alt />
          <img src="../../assets/img/itemBg.png" alt />
          <p>联案分析</p>
        </li>-->
      </ul>
    </div>
    <div id="module">
      <div id="lately">
        <div class="smallTitle">
          <h3>最近使用</h3>
        </div>
        <div>
          <ul class="content">
            <li v-for="(item, index) in latelyData" :key="index">
              <img :src="getImgUrl(item.path)" />
              <!--<img src="../../assets/img/i2.png" alt />-->
              <img src="../../assets/img/itemBg.png" alt />
              <p>{{ item.name }}</p>
            </li>
            <!--<li>
              <img src="../../assets/img/i2.png" alt />
              <img src="../../assets/img/itemBg.png" alt />
              <p>i2</p>
            </li>
            <li>
              <img src="../../assets/img/phone.png" alt />
              <img src="../../assets/img/itemBg.png" alt />
              <p>话单分析</p>
            </li>
            <li>
              <img src="../../assets/img/relation.png" alt />
              <img src="../../assets/img/itemBg.png" alt />
              <p>关系分析</p>
            </li>
            <li>
              <img src="../../assets/img/timeSky.png" alt />
              <img src="../../assets/img/itemBg.png" alt />
              <p>时空分析</p>
            </li>-->
          </ul>
        </div>
      </div>
      <div id="online">
        <div class="smallTitle">
          <h3>在线人数</h3>
        </div>
        <div>
          <ul class="content">
            <li>
              <img src="../../assets/img/person.png" alt />
              <p>在线用户数</p>
              <p>{{ statistics.count }}人</p>
            </li>
            <li>
              <img src="../../assets/img/fangwen.png" alt />
              <p>今日访问量</p>
              <p>{{ statistics.countFw }}次</p>
            </li>
            <li>
              <img src="../../assets/img/date.png" alt />
              <p>历史访问量</p>
              <p>{{ statistics.countZw }}万次</p>
            </li>
          </ul>
        </div>
      </div>
      <canvas id="can" width="262" height="262"></canvas>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getMenu } from '@/api/system'

export default {
  inject: ['reload'],
  name: 'homePage',
  metaInfo: {
    title: '情报智能分析系统',
  },
  data() {
    return {
      menuListData: [],
      latelyData: [],
      roleStrLisr: [],
      statistics: {
        count: 0,
        countFw: 0,
        countZw: 0,
      },
    }
  },
  mounted() {
    console.log('测试删除console的插件是否生效')
    this.initPage()
    let _this = this
    _this.timer = setInterval(() => {
      _this.date = new Date().toLocaleString()
    })

    this.menuList()
    this.statisticsQuery()
    this.statisticsLogs()
  },
  methods: {
    // 获取菜单
    menuList() {
      let _this = this
      getMenu({
        module: 1,
        parentId: 0,
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          _this.menuListData = data.data[0].list.splice(0, 5)
          _this.menuListData.forEach(item => {
            let obj = {
              urlName: item.path,
              roleStr: item.url,
            }
            _this.roleStrLisr.push(obj)
          })
          _this.menuList2()
          console.log(_this.menuListData)
        }
      })
    },
    menuList2() {
      let _this = this
      getMenu({
        module: 2,
        parentId: 0,
        accessToken: Cookies.get('ac_token'),
      }).then(({ data }) => {
        console.log(33333)
        console.log(data)
        if (data && data.code === 200) {
          data.data[0].list.forEach(item => {
            let obj = {
              urlName: item.path,
              roleStr: item.url,
            }
            _this.roleStrLisr.push(obj)
          })
          Cookies.set('roleStrLisr', _this.roleStrLisr)
          console.log(2222)
          console.log(Cookies.get('roleStrLisr'))
        }
      })
    },
    // 跳转
    goTo(item) {
      let _this = this
      let obj = {
        userId: Cookies.get('userId'),
        accessToken: Cookies.get('ac_token'),
        id: item.id,
        pname: item.name,
        url: item.url,
      }
      item.type === '1' && (obj.type = '1')
      this.$api.statistics(obj).then(({ data }) => {
        if (data.msg === '成功') {
          // _this.$router.push({ name: url })
          // _this.$roleStr = item.url
          Cookies.set('roleStr', item.url)
          let routeData = _this.$router.resolve({
            name: item.path,
          })
          window.open(routeData.href, '_blank')
          _this.reload()
        } else if (data.message === '你没有权限!!!') {
          _this.$message({
            message: '你没有权限!!!!',
            type: 'error',
          })
        } else {
          _this.$message({
            message: '获取数据失败!',
            type: 'error',
          })
        }
      })
    },

    // 获取图片地址
    getImgUrl(path) {
      return require('@/assets/img/' + path + '.png')
    },

    // 最近使用
    statisticsQuery() {
      let _this = this
      let obj = {
        userId: Cookies.get('userId'),
        accessToken: Cookies.get('ac_token'),
      }
      this.$api.statisticsQuery(obj).then(({ data }) => {
        if (data.msg === '成功') {
          console.log(222)
          console.log(data)
          _this.latelyData = data.data
        } else {
          _this.$message({
            message: '获取数据失败!',
            type: 'error',
          })
        }
      })
    },

    // 在线人数
    statisticsLogs() {
      let _this = this
      let obj = {
        accessToken: Cookies.get('ac_token'),
      }
      this.$api.statisticsLogs(obj).then(({ data }) => {
        if (data.msg === '成功') {
          console.log(data)
          _this.statistics.count = data.data.count
          _this.statistics.countFw = data.data.countFw
          _this.statistics.countZw = (data.data.countZw / 10000).toFixed(2)
        } else {
          _this.$message({
            message: '获取数据失败!',
            type: 'error',
          })
        }
      })
    },

    logout() {
      Cookies.remove('ac_token')
      Cookies.remove('user_info')
      Cookies.remove('userId')
      this.$router.push({ name: 'login' })
    },
    initPage() {
      let canvas = document.getElementById('can')
      const _this = this
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        ctx.translate(131, 131)
        setInterval(() => {
          _this.initCanvas(ctx)
        }, 1000)
      }
    },
    toUserCenter() {
      // 确认登录状态，未登录跳转登录
      if (Cookies.get('ac_token')) {
        let routeData = this.$router.resolve({
          name: 'usercenter',
        })
        window.open(routeData.href, '_blank')
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    initCanvas(ctx) {
      this.clearCanvas(ctx)
      let time = new Date()
      let secondes = time.getSeconds()
      let minutes = time.getMinutes()
      let hours = time.getHours()
      hours = hours > 12 ? hours - 12 : hours
      let minute = minutes + secondes / 60
      let hour = hours + minutes / 60

      // draw Numbers
      ctx.font = '25px Arial'
      ctx.fillStyle = 'rgb(44,239,255)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (let i = 1; i < 13; i++) {
        let theta = ((Math.PI * 2) / 12) * i - Math.PI / 2
        var x = 150 * 0.8 * Math.cos(theta)
        var y = 150 * 0.8 * Math.sin(theta)
        ctx.fillText(i, x, y)
      }
      ctx.restore()

      // draw Hours
      ctx.save()
      ctx.rotate(((Math.PI * 2) / 12) * hour - Math.PI / 2)
      ctx.fillStyle = 'rgb(44,239,255)'
      ctx.beginPath()
      ctx.moveTo(-15, -5)
      ctx.lineTo(-15, 5)
      ctx.lineTo(55, 1)
      ctx.fill()
      ctx.restore()

      // draw Minutes
      ctx.save()
      ctx.rotate(((Math.PI * 2) / 60) * minute - Math.PI / 2)
      ctx.fillStyle = 'rgb(44,239,255)'
      ctx.beginPath()
      ctx.moveTo(-15, -4)
      ctx.lineTo(-15, 4)
      ctx.lineTo(95, 1)
      ctx.fill()
      ctx.restore()

      // draw seconds
      ctx.save()
      ctx.rotate(((Math.PI * 2) / 60) * secondes - Math.PI / 2)
      ctx.fillStyle = 'rgb(44,239,255)'
      ctx.beginPath()
      ctx.moveTo(-15, -2)
      ctx.lineTo(-15, 2)
      ctx.lineTo(105, 1)
      ctx.fill()
      ctx.restore()
    },
    clearCanvas(ctx) {
      ctx.clearRect(-150, -150, 300, 300)
    },
  },
}
</script>

<style lang="stylus" scoped>
ul
  padding 0
  margin 0
h3
  margin 0
.mod-home
  line-height 1.5
  padding 30px 66px
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  &:before
    position fixed
    top 0
    left 0
    z-index -1
    width 100%
    height 100%
    content ''
    background url('~@/assets/img/homeBg.png') no-repeat center
    background-size cover
#nav
  float right
  display flex
  width 230px
  padding 0
  justify-content space-between
#nav li
  margin 0 10px
  display flex
  flex-direction column
  align-items center
#nav img
  height 35px
  width 35px
.nav p
  color white
#module
  display flex
  margin 0 40px
  justify-content space-between
#title
  display flex
  flex-direction column
  align-items center
  width 100%
  margin 0px auto
  position relative
#title img
  width 100%
#title h1
  font-size 60px
  color white
  position absolute
  top -100px
  background url('../../assets/img/titleBg.png') no-repeat
#content
  margin 80px 0
.content
  display flex
  width 100%
  height 341px
  justify-content space-around
  position relative
.content li
  display flex
  flex-direction column
  align-items center
  cursor pointer
.content li img:nth-of-type(1)
  height 150px
.content li img:nth-of-type(2)
  position absolute
  top 100px
.content li p
  font-size 40px
  margin 0
  margin-top 55px
  color white
  font-weight bold
#module .smallTitle
  font-weight bold
  color white
  font-size 24px
  text-indent 27px
#lately
  background url('../../assets/img/moduleBg.png') no-repeat
  background-size 644px 270px
  width 644px
  margin-right 45px
  height 270px
#lately .content
  display flex
  width 644px
  height 228px
  justify-content space-around
  position relative
#lately .content li
  display flex
  flex-direction column
  align-items center
#lately .content li img:nth-of-type(1)
  height 70px
#lately .content li img:nth-of-type(2)
  position absolute
  height 55px
  top 50px
#lately .content li p
  font-size 22px
  margin 0
  margin-top 36px
  color white
#online
  background url('../../assets/img/moduleBg.png') no-repeat
  background-size 533px 270px
  width 533px
  height 270px
  margin-right 45px
#online .content
  display flex
  width 533px
  height 228px
  justify-content space-around
  position relative
#online .content li
  display flex
  flex-direction column
  align-items center
#online .content li img:nth-of-type(1)
  height 70px
  position relative
  top 12px
#online .content li p:nth-of-type(1)
  font-size 22px
  margin 0
  margin-top 36px
  color white
#online .content li p:nth-of-type(2)
  font-size 22px
  margin 0
  color white
</style>
