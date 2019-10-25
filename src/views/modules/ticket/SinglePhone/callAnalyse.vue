<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="callForm"
      ref="callForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间" prop="time">
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
      <el-form-item prop="callTimes">
        <el-input
          v-model="callForm.callTimes"
          placeholder="通话频次"
        ></el-input>
      </el-form-item>
      <el-form-item prop="communicationTime">
        <el-input
          v-model="callForm.communicationTime"
          placeholder="通话时长"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="resetForm('callForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="callAnalyseData2" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="otherPartyPhone" label="对方号码" align="center">
      </el-table-column>
      <el-table-column prop="callTimes" label="通话频次" align="center">
      </el-table-column>
      <el-table-column prop="communicationTime" label="通话时长" align="center">
      </el-table-column>
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="check(scope.$index, scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <flyDialog :show.sync="show" :width="width">
      <!--<el-table :data="analyseTable" border style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          prop="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="otherPartyPhone"
          label="对方号码"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="communicationMode"
          label="呼叫类型"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="通话时间"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="communicationTime"
          label="通话时长"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="baseStationLocation"
          label="基站地址"
          align="center"
          width="100"
        >
        </el-table-column>
      </el-table>-->
      <el-table :data="analyseTable" border style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          prop="index"
          width="50"
        >
        </el-table-column>
        <el-table-column prop="otherPartyPhone" label="对方号码" align="center">
        </el-table-column>
        <el-table-column
          prop="communicationMode"
          label="呼叫类型"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="beginTime" label="通话时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.beginTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="communicationTime"
          label="通话时长"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="baseStationLocation"
          label="基站地址"
          align="center"
        >
        </el-table-column>
      </el-table>
    </flyDialog>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'
import flyDialog from '../../../../components/fly-dialog'
export default {
  components: {
    flyDialog,
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
      callForm: {
        time: '',
        communicationTime: 0,
        callTimes: '',
      },
      callAnalyse: [
        {
          communicationTime: '',
        },
      ],
      show: false,
      width: '1200px',
      analyseTable: [
        {
          index: '',
          otherPartyPhone: '13111111111',
          communicationMode: '被叫',
          beginTime: '2016-07-23 00:01:02',
          communicationTime: '14',
          baseStationLocation: '成都',
        },
      ],
      callAnalyseData: [],
      callAnalyseData2: [],
    }
  },
  mounted() {
    this.callAnalyseData = JSON.parse(localStorage.getItem('phoneInfo'))
    // this.soonLateData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.onSubmit()
  },
  methods: {
    // 查询
    onSubmit() {
      let a = ['38秒', '1分52秒', '40秒']
      let b = ''
      a.forEach(item => {
        b = this.timeTotal(b, item)
      })
      console.log(333333333)
      console.log(b)

      let data = this.callAnalyseData
      this.callAnalyseData2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      console.log(this.callAnalyseData2)
      this.callAnalyseData2 = this.dataSort2(this.callAnalyseData2)
      conData.callTimes != null && this.callTimesCount()
      conData.communicationTime != null && this.callTimeSizer()
      // console.log(this.callAnalyseData2)
    },

    // 通话频次计算
    callTimesCount() {
      let data = this.callAnalyseData2
      let callTimes = this.callForm.callTimes
      let dataArr = []
      data.forEach(item => {
        callTimes <= item.callTimes && dataArr.push(item)
      })
      this.callAnalyseData2 = dataArr
    },

    // 数据重组
    dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai => {
        let otherPartyPhone = ai.otherPartyPhone
        if (!data1[otherPartyPhone]) {
          value1.push({
            otherPartyPhone: otherPartyPhone,
            callTimes: 1,
            communicationTime: ai.communicationTime,
            info: [ai],
          })
          data1[otherPartyPhone] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            let otherPartyPhone = ai.otherPartyPhone
            if (dj.otherPartyPhone === otherPartyPhone) {
              dj.callTimes++
              dj.info.push(ai)
              dj.communicationTime = this.timeTotal(
                ai.communicationTime,
                dj.communicationTime,
              )
              break
            }
          }
        }
      })
      return value1
    },

    // 总时长
    timeTotal(a, b) {
      a = this.timeToSec(a)
      b = this.timeToSec(b)
      return this.formatDuring(a + b)
    },

    // 毫秒转换时分秒
    formatDuring(mss) {
      /* var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = parseInt((mss % (1000 * 60)) / 1000)
      // let str =
      //   hours > 0
      //     ? hours + ' 小时 '
      //     : 0 + minutes > 0
      //     ? minutes + ' 分钟 '
      //     : 0 + seconds > 0
      //     ? seconds + ' 秒 '
      //     : '0 秒 '
      // return str
      return hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒 ' */
      var time = parseInt(mss) + '秒'
      if (parseInt(mss) > 60) {
        var second = parseInt(mss) % 60
        var min = parseInt(mss / 60)
        time = min + '分' + second + '秒'
        if (min > 60) {
          min = parseInt(mss / 60) % 60
          var hour = parseInt(parseInt(mss / 60) / 60)
          time = hour + '小时' + min + '分钟' + second + '秒'
        }
      }
      return time
    },

    // 时长筛选
    callTimeSizer() {
      let data = this.callAnalyseData2
      let callTime = this.callForm.communicationTime
      let dataArr = []
      data.forEach(item => {
        callTime === '' && (callTime = 0)
        this.timeToSec(callTime) <= this.timeToSec(item.communicationTime) &&
          dataArr.push(item)
      })
      this.callAnalyseData2 = dataArr
    },

    // 时间转为毫秒
    timeToSec(times) {
      let str = times.toString().replace(/分钟/g, '分')
      let time = str.toString().replace(/小时/g, '时')
      let hourIn, minIn, secIn
      !time.includes('时') ? (hourIn = 0) : (hourIn = time.indexOf('时'))
      !time.includes('分') ? (minIn = 0) : (minIn = time.indexOf('分'))
      !time.includes('秒') ? (secIn = 0) : (secIn = time.indexOf('秒'))
      let hour = 0
      let min = 0
      let sec = 0
      hourIn === 0 && minIn === 0 && secIn === 0 && (sec = time)
      hourIn !== 0 && (hour = time.substring(0, hourIn))
      minIn !== 0 &&
        (min = time.substring(hourIn === 0 ? 0 : hourIn + 1, minIn))
      secIn !== 0 && (sec = time.substring(minIn === 0 ? 0 : minIn + 1, secIn))
      var s = Number(hour * 3600) + Number(min * 60) + Number(sec)
      return s * 1000
    },

    // 时间筛选
    timeSizer() {
      let data = this.callAnalyseData2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.callAnalyseData2 = dataArr
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

    baseStation() {},
    check(a, b) {
      console.log(a)
      console.log(b)
      this.analyseTable = b.info
      this.show = true
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1100px
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
 .el-table__body, .el-table__footer, .el-table__header
   width 100% !important
 .el-range-editor .el-range-input
   background transparent !important
   color white !important
 .el-date-editor .el-range-separator
   color white !important
</style>
