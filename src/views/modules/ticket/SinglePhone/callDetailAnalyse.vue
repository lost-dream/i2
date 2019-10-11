<template>
  <div class="container">
    <el-form :inline="true" :model="callForm" class="demo-form-inline">
      <el-form-item label="呼叫时间">
        <el-date-picker
          v-model="callForm.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div id="chart"></div>
    <div id="picture1"></div>
    <div id="picture2"></div>
    <div id="picture3"></div>
    <div id="picture4"></div>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'
import echarts from 'echarts'
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      callForm: {
        time: null,
      },
      callDetailData: [],
      callDetailData2: [],
      pictureData1: {},
      pictureData2: {},
      pictureData3: {},
      pictureData4: {},
    }
  },

  mounted() {
    this.callDetailData = JSON.parse(localStorage.getItem('phoneInfo'))
    // this.callDetailData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.onSubmit()
  },

  methods: {
    onSubmit() {
      let data = this.callDetailData
      this.callDetailData2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      console.log(this.callDetailData2)
      this.situation(this.callDetailData2)
      this.pictureData2 = this.dayCount(this.callDetailData2)
      this.pictureData3 = this.phoneCount(this.callDetailData2, '主叫')
      this.pictureData4 = this.phoneCount(this.callDetailData2, '被叫')
      console.log(55555555)
      console.log(this.pictureData3)
      this.picture1()
      this.picture2()
      this.picture3()
      this.picture4()
    },
    // 加载概况数据
    situation(data) {
      this.pictureData1 = {
        callNumber: data.length,
        duration: this.durationData(data),
        Lord: this.callLord(data),
        passive: this.callPassive(data),
      }
    },

    // 加载主叫TOP
    phoneCount(data, type) {
      let picturInfo = {}
      let data1 = {}
      let a = []
      let b = []
      let value1 = []
      data.forEach(ai => {
        if (ai.communicationMode === type) {
          let otherPartyPhone = ai.otherPartyPhone
          if (!data1[otherPartyPhone]) {
            value1.push({
              otherPartyPhone: otherPartyPhone,
              count: 1,
            })
            data1[otherPartyPhone] = ai
          } else {
            for (let j = 0; j < value1.length; j++) {
              let dj = value1[j]
              let aiBeg = ai.otherPartyPhone
              if (dj.otherPartyPhone === aiBeg) {
                dj.count++
                break
              }
            }
          }
        }
      })
      value1.forEach(item => {
        a.push(item.otherPartyPhone)
        b.push(item.count)
      })
      picturInfo.otherPartyPhone = a
      picturInfo.count = b
      return picturInfo
    },

    // 加载当日通话计数
    dayCount(data) {
      let picturInfo = {}
      let data1 = {}
      let a = []
      let b = []
      let value1 = []
      data.forEach(ai => {
        let beginTime = formatDate(new Date(ai.beginTime), 'yyyy-MM-dd')
        if (!data1[beginTime]) {
          value1.push({
            beginTime: beginTime,
            count: 1,
          })
          data1[beginTime] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            let aiBeg = formatDate(new Date(ai.beginTime), 'yyyy-MM-dd')
            if (dj.beginTime === aiBeg) {
              dj.count++
              break
            }
          }
        }
      })
      this.sortByKey(value1, 'beginTime', 'up')
      value1.forEach(item => {
        a.push(item.beginTime)
        b.push(item.count)
      })
      picturInfo.date = a
      picturInfo.count = b
      return picturInfo
    },

    // 时间排序
    sortByKey(array, key, updown) {
      return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        if (updown == 'up') {
          return x < y ? -1 : x > y ? 1 : 0
        }
        if (updown == 'down') {
          return x < y ? 1 : x > y ? -1 : 0
        }
      })
    },

    // 主叫
    callLord(data) {
      let total = 0
      data.forEach(item => {
        item.communicationMode === '主叫' && total++
      })
      return total
    },

    // 被叫
    callPassive(data) {
      let total = 0
      data.forEach(item => {
        item.communicationMode === '被叫' && total++
      })
      return total
    },

    // 累计时长
    durationData(data) {
      let s = 0
      data.forEach(item => {
        s = s + this.timeToSec(item.communicationTime)
      })
      return s
    },

    // 时间转为秒
    timeToSec(time) {
      time.replace(/分钟/g, '分')
      time.replace(/小时/g, '时')
      let hourIn, minIn, secIn
      time.indexOf('时') == -1 ? (hourIn = 0) : (hourIn = time.indexOf('时'))
      time.indexOf('分') == -1 ? (minIn = 0) : (minIn = time.indexOf('分'))
      time.indexOf('秒') == -1 ? (secIn = 0) : (secIn = time.indexOf('秒'))
      let hour = 0
      let min = 0
      let sec = 0
      hourIn == 0 && minIn == 0 && secIn == 0 && (sec = time)
      hourIn != 0 && (hour = time.substring(0, hourIn))
      minIn != 0 && (min = time.substring(hourIn == 0 ? 0 : hourIn + 1, minIn))
      secIn != 0 && (sec = time.substring(minIn == 0 ? 0 : minIn + 1, secIn))
      var s = Number(hour * 3600) + Number(min * 60) + Number(sec)
      return s
    },

    // 时间筛选
    timeSizer() {
      let data = this.callDetailData2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.callDetailData2 = dataArr
    },
    /**
     * 判断是否在时间段内
     * converseTime 要判断的时间 stime 开始时间 etime 结束时间
     */
    compareTime(changeTime, stime, etime) {
      changeTime = formatDate(new Date(changeTime), 'yyyy-MM-dd hh:mm:ss')
      stime = formatDate(new Date(stime), 'yyyy-MM-dd hh:mm:ss')
      etime = formatDate(new Date(etime), 'yyyy-MM-dd hh:mm:ss')

      // 转换时间格式，并转换为时间戳
      function tranDate(time) {
        return new Date(time.replace(/-/g, '/')).getTime()
      }

      // 开始时间
      let startTime = tranDate(stime)
      // 结束时间
      let endTime = tranDate(etime)
      let nowTime = tranDate(changeTime)
      // 如果当前时间处于时间段内，返回true，否则返回false
      if (nowTime < startTime || nowTime > endTime) {
        return false
      }
      return true
    },

    timeChange(time) {
      var newTime = time.map(function(item) {
        var d = new Date(item)
        var newItem =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1) +
          '-' +
          d.getDate() +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes() +
          ':' +
          d.getSeconds()
        return newItem
      })
      return newTime
    },
    picture1() {
      let myChart = echarts.init(document.getElementById('picture1'))
      let option = {
        title: {
          text: '通话概况',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['总通话次数', '累计时长(s)', '主叫占比', '被叫占比'],
          textStyle: {
            color: 'white',
          },
        },
        color: [
          'rgba(128,125,239,0.9)',
          'rgba(75,137,241,0.9)',
          'rgba(225,150,54,0.9)',
          'rgba(228,104,98,0.9)',
        ],
        series: [
          {
            name: '总通话次数',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['15%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold',
                },
                color: 'rgb(44, 239, 255)',
              },
            },
            data: [
              {
                value: this.pictureData1.callNumber,
                name: '总通话次数',
                itemStyle: { color: 'rgba(128,125,239,0.9)' },
              },
            ],
          },
          {
            name: '累计时长',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold',
                },
                color: 'rgb(44, 239, 255)',
              },
            },
            data: [
              {
                value: this.pictureData1.duration,
                name: '累计时长(s)',
                itemStyle: { color: 'rgba(75,137,241,0.9)' },
              },
            ],
          },
          {
            name: '主被叫',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['85%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold',
                },
                color: 'rgb(44, 239, 255)',
              },
            },
            data: [
              {
                value: this.pictureData1.Lord,
                name: '主叫占比',
                itemStyle: { color: 'rgba(225,150,54,0.9)' },
              },
              {
                value: this.pictureData1.passive,
                name: '被叫占比',
                itemStyle: { color: 'rgba(228,104,98,0.9)' },
              },
            ],
          },
        ],
      }

      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    picture2() {
      let myChart = echarts.init(document.getElementById('picture2'))
      let option = {
        title: {
          text: '单日通话次数Top10',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28,
          },
        },
        color: ['#F2F2F2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        toolbox: {
          show: true,
          right: 30,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2,
            },
          },
        },
        xAxis: [
          {
            name: '时间',
            nameTextStyle: { color: 'white' },
            type: 'category',
            data: this.pictureData2.date,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(44, 239, 255, 0.6)',
                width: '1',
              },
            },
          },
        ],
        yAxis: [
          {
            name: '通话次数',
            nameTextStyle: { color: 'white' },
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgb(44, 239, 255)',
                width: '1',
              },
            },
            axisTick: {
              lineStyle: { color: 'rgb(150,150,150)' },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(44, 239, 255,0.3)',
              },
            },
          },
        ],
        series: [
          {
            name: '通话次数',
            type: 'bar',
            barWidth: '20%',
            data: this.pictureData2.count,
          },
        ],
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: 'rgb(44, 239, 255)',
          },
        },
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    picture3() {
      let myChart = echarts.init(document.getElementById('picture3'))
      let option = {
        title: {
          text: '主叫TOP',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28,
          },
        },
        color: ['#F2F2F2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        toolbox: {
          show: true,
          right: 30,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2,
            },
          },
        },
        xAxis: [
          {
            name: '电话号码',
            nameTextStyle: { color: 'white' },
            type: 'category',
            data: this.pictureData3.otherPartyPhone,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(44, 239, 255, 0.6)',
                width: '1',
              },
            },
          },
        ],
        yAxis: [
          {
            name: '通话次数',
            nameTextStyle: { color: 'white' },
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgb(44, 239, 255)',
                width: '1',
              },
            },
            axisTick: {
              lineStyle: { color: 'rgb(150,150,150)' },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(44, 239, 255,0.3)',
              },
            },
          },
        ],
        series: [
          {
            name: '通话次数',
            type: 'bar',
            barWidth: '20%',
            data: this.pictureData3.count,
          },
        ],
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: 'rgb(44, 239, 255)',
          },
        },
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    picture4() {
      let myChart = echarts.init(document.getElementById('picture4'))
      let option = {
        title: {
          text: '被叫TOP',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28,
          },
        },
        color: ['#F2F2F2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        toolbox: {
          show: true,
          right: 30,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2,
            },
          },
        },
        xAxis: [
          {
            name: '电话号码',
            nameTextStyle: { color: 'white' },
            type: 'category',
            data: this.pictureData4.otherPartyPhone,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(44, 239, 255, 0.6)',
                width: '1',
              },
            },
          },
        ],
        yAxis: [
          {
            name: '通话次数',
            nameTextStyle: { color: 'white' },
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgb(44, 239, 255)',
                width: '1',
              },
            },
            axisTick: {
              lineStyle: { color: 'rgb(150,150,150)' },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(44, 239, 255,0.3)',
              },
            },
          },
        ],
        series: [
          {
            name: '通话次数',
            type: 'bar',
            barWidth: '20%',
            data: this.pictureData4.count,
          },
        ],
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: 'rgb(44, 239, 255)',
          },
        },
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1100px
  margin 0 auto
  padding 0px
  h2
    text-align center
    padding 30px
    font-size 18px
  #picture1
    width 100%
    height 500px
    margin 0 auto
  #picture2
    width 100%
    height 500px
    margin 0 auto
  #picture3
    width 100%
    height 500px
    margin 0 auto
  #picture4
    width 100%
    height 500px
    margin 0 auto
</style>
