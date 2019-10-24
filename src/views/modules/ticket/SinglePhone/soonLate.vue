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
    <div v-show="queryType">
      <el-table :data="soonLateData2" border style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="50">
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="日期"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="soonTime" align="center" label="最早时间">
          <template slot-scope="scope">
            <span>{{ scope.row.min.beginTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="min.otherPartyPhone"
          align="center"
          width="120"
          label="最早对方号码"
        >
        </el-table-column>
        <el-table-column prop="min.location" align="center" label="最早归属地">
        </el-table-column>
        <!--    <el-table-column
          prop="min.baseStationLocation"
          align="center"
          label="最早基站"
        >
        </el-table-column>-->
        <el-table-column prop="min.lateTime" align="center" label="最晚时间">
          <template slot-scope="scope">
            <span>{{ scope.row.max.beginTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="min.otherPartyPhone"
          align="center"
          width="120"
          label="最晚对方号码"
        >
        </el-table-column>
        <el-table-column prop="min.location" align="center" label="最晚归属地">
        </el-table-column>
        <!--      <el-table-column
          prop="min.baseStationLocation"
          align="center"
          label="最晚基站"
        >
        </el-table-column>-->
      </el-table>
    </div>
    <div v-show="queryType2">
      <el-table :data="soonLateData3" border style="width: 100%">
        <el-table-column prop="minCount" label="最早基站次数" align="center">
        </el-table-column>
        <el-table-column prop="min" label="最早基站小区号" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.min.baseStationCode }}/
              {{ scope.row.min.housingEstateCode }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="min.location"
          align="center"
          label="最晚基站位置"
        >
        </el-table-column>
        <el-table-column prop="maxCount" align="center" label="最晚基站次数">
        </el-table-column>
        <el-table-column align="center" label="最晚基站小区号">
          <template slot-scope="scope">
            <span>
              {{ scope.row.max.baseStationCode }}/
              {{ scope.row.max.housingEstateCode }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="max.location"
          align="center"
          label="最晚基站位置"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'

export default {
  inject: ['reload'],
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'hh:mm:ss ')
    },
  },
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
      queryType: false,
      queryType2: false,
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
      soonLateData3: [],
    }
  },
  mounted() {
    this.soonLateData = JSON.parse(localStorage.getItem('phoneInfo'))
    // this.soonLateData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.onSubmit()
  },
  methods: {
    // 查询
    onSubmit() {
      let data = this.soonLateData
      this.soonLateData2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null &&
        (this.soonLateData2 = this.timeSizer(this.soonLateData2))
      console.log(this.soonLateData2)
      this.soonLateData2 = this.dataSort(this.soonLateData2)
      this.queryType2 = false
      this.queryType = true
      console.log(this.soonLateData2)
    },

    // 数据重组
    dataSort(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai => {
        let beginTime = formatDate(new Date(ai.beginTime), 'yyyy-MM-dd')
        if (!data1[beginTime]) {
          value1.push({
            beginTime: beginTime,
            max: ai,
            min: ai,
          })
          data1[beginTime] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            let aiBeg = formatDate(new Date(ai.beginTime), 'yyyy-MM-dd')
            if (dj.beginTime === aiBeg) {
              console.log(dj.beginTime)
              console.log(aiBeg)
              this.timestamp(ai.beginTime) > this.timestamp(dj.max.beginTime) &&
                (dj.max = ai)
              this.timestamp(ai.beginTime) < this.timestamp(dj.min.beginTime) &&
                (dj.min = ai)
            }
          }
        }
      })
      return value1
    },

    // 数据重组
    dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai => {
        let beginTime = formatDate(new Date(ai.beginTime), 'yyyy-MM-dd')
        if (!data1[beginTime]) {
          value1.push({
            beginTime: beginTime,
            max: ai,
            maxCount: 1,
            min: ai,
            minCount: 1,
          })
          data1[beginTime] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            let aiBeg = formatDate(new Date(ai.beginTime), 'yyyy-MM-dd')
            if (dj.beginTime === aiBeg) {
              console.log(dj.beginTime)
              console.log(aiBeg)
              if (
                this.timestamp(ai.beginTime) > this.timestamp(dj.max.beginTime)
              ) {
                dj.max = ai
              }
              // else if (
              //   // this.timestamp(ai.beginTime) ===
              //   // this.timestamp(dj.max.beginTime)
              //   ai.stationCode === ai.stationCode
              // ) {
              //   dj.maxCount++
              // }

              if (
                this.timestamp(ai.beginTime) < this.timestamp(dj.min.beginTime)
              ) {
                dj.min = ai
              } else if (
                this.timestamp(ai.beginTime) ===
                this.timestamp(dj.min.beginTime)
              ) {
                dj.minCount++
              }
            }
          }
        }
      })
      return value1
    },

    // 转换时间戳
    timestamp(time) {
      time = formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss')

      // 转换时间格式，并转换为时间戳
      function tranDate(time) {
        return new Date(time.replace(/-/g, '/')).getTime()
      }

      return tranDate(time)
    },

    // 时间筛选
    timeSizer(data) {
      // let data = this.soonLateData2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      // this.soonLateData2 = dataArr
      return dataArr
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

    baseStation() {
      let data = this.soonLateData
      this.soonLateData3 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null &&
        (this.soonLateData3 = this.timeSizer(this.soonLateData3))
      console.log(this.soonLateData3)
      this.soonLateData3 = this.dataSort2(this.soonLateData3)
      this.queryType = false
      this.queryType2 = true
      console.log(this.soonLateData3)
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
  .el-table tbody tr:hover > td
    background-color rgba(44, 239, 255, 0.4) !important
  .el-pagination__total
    color white
</style>
