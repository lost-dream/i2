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
        time: '',
      },
      periodAllData: [],
      periodAllData2: [],
    }
  },
  mounted() {
    // this.periodAllData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.periodAllData = JSON.parse(localStorage.getItem('phoneInfo'))
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      if (this.periodAllData === null) return
      let data = this.periodAllData
      this.periodAllData2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      console.log(this.periodAllData2)
      this.periodAllData2 = this.dateList(this.periodAllData2)
      this.picture()
      console.log(this.periodAllData2)
    },

    // 提取时间列表
    dateList(data) {
      let arr = []
      for (var i = 0; i < 24; i++) {
        arr.push(0)
      }
      console.log(arr)
      data.forEach(item => {
        let hours = formatDate(new Date(item.beginTime), 'h')
        arr[hours]++
        console.log(hours)
      })
      console.log(arr)
      return arr
    },

    // 时间筛选
    timeSizer() {
      let data = this.periodAllData2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.periodAllData2 = dataArr
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
    picture() {
      let myChart = echarts.init(document.getElementById('chart'))
      let option = {
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
            type: 'category',
            data: [
              '00时',
              '01时',
              '02时',
              '03时',
              '04时',
              '05时',
              '06时',
              '07时',
              '08时',
              '09时',
              '10时',
              '11时',
              '12时',
              '13时',
              '14时',
              '15时',
              '16时',
              '17时',
              '18时',
              '19时',
              '20时',
              '21时',
              '22时',
              '23时',
            ],
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
            barWidth: '60%',
            data: this.periodAllData2,
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
  width 900px
  margin 0 auto
  padding 0px
  h2
    text-align center
    padding 30px
    font-size 18px
  #chart
    width 100%
    height 500px
    margin 0 auto
</style>
