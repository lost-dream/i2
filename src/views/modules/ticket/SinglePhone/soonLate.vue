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
      <el-form-item>
        <el-button type="primary" @click="baseStation">基站查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="soonLate" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="date" label="日期" align="center" width="100">
      </el-table-column>
      <el-table-column prop="soonTime" align="center" label="最早时间">
      </el-table-column>
      <el-table-column
        prop="soonPhone"
        align="center"
        width="120"
        label="最早对方号码"
      >
      </el-table-column>
      <el-table-column prop="soonLocation" align="center" label="最早归属地">
      </el-table-column>
      <el-table-column prop="soonBaseStation" align="center" label="最早基站">
      </el-table-column>
      <el-table-column prop="lateTime" align="center" label="最晚时间">
      </el-table-column>
      <el-table-column
        prop="latePhone"
        align="center"
        width="120"
        label="最晚对方号码"
      >
      </el-table-column>
      <el-table-column prop="lateLocation" align="center" label="最晚归属地">
      </el-table-column>
      <el-table-column prop="lateBaseStation" align="center" label="最晚基站">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'

export default {
  mounted() {},
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
      soonLate: [
        {
          date: '2019-07-21',
          soonTime: '03:11:11',
          soonPhone: '13111111111',
          soonLocation: '成都',
          soonBaseStation: '成都青羊',
          lateTime: '12:11:11',
          latePhone: '15111111111',
          lateLocation: '自贡',
          lateBaseStation: '自贡郊区',
        },
      ],
      soonLateData: [],
      soonLateData2: [],
      soonLateShowList: [],
    }
  },
  mounted() {
    this.soonLateData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    console.log(666666666)
    console.log(this.soonLateData)
  },
  methods: {
    // 查询
    onSubmit() {
      let data = this.soonLateData
      this.soonLateData2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      console.log(this.soonLateData2)
      soonLateData2.forEach(
        (item = {
          // item.beginTime
        }),
      )
    },

    // 时间筛选
    timeSizer() {
      let data = this.soonLateData2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.soonLateData2 = dataArr
    },
    /**
     * 判断是否在时间段内
     * converseTime 要判断的时间 stime 开始时间 etime 结束时间
     */
    compareTime(changeTime, stime, etime) {
      changeTime = formatDate(new Date(changeTime), 'yyyy-MM-dd')
      stime = formatDate(new Date(stime), 'yyyy-MM-dd')
      etime = formatDate(new Date(etime), 'yyyy-MM-dd')

      // 转换时间格式，并转换为时间戳
      function tranDate(time) {
        return new Date(time.replace(/-/g, '/')).getTime()
      }

      // 开始时间
      let startTime = tranDate(stime)
      // 结束时间
      let endTime = tranDate(etime)
      let nowTime = tranDate(changeTime)
      console.log(startTime)
      console.log(endTime)
      console.log(nowTime)
      // 如果当前时间处于时间段内，返回true，否则返回false
      if (nowTime < startTime || nowTime > endTime) {
        return false
      }
      return true
    },

    baseStation() {},

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
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1000px
  margin 0 auto
  padding 0px
</style>
<style lang="stylus">
.container
  .el-input__inner
    background-color rgba(44, 239, 255, 0.3) !important
    border 1px solid rgba(44, 239, 255, 0.4) !important
    color white
  .el-form-item__label
    color white !important
  .el-table
    background-color rgba(44, 239, 255, 0.3) !important
    color white !important
  .el-table th, .el-table tr
    background-color transparent !important
  .el-table thead
    color white !important
  .el-table tbody tr:hover>td
    background-color rgba(44, 239, 255, 0.4) !important
  .el-pagination__total
    color white
</style>
