<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="callForm"
      id="out-table"
      class="demo-form-inline"
    >
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
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <!--   <el-table :data="continueTable" border style="width: 100%">
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
    <el-table :data="continueData2" border style="width: 100%">
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
      <el-table-column prop="communicationMode" label="呼叫类型" align="center">
      </el-table-column>
      <el-table-column prop="beginTime" label="通话时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.beginTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="communicationTime" label="通话时长" align="center">
      </el-table-column>
      <el-table-column
        prop="baseStationLocation"
        label="基站地址"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'
export default {
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
      },
      continueTable: [
        {
          index: '',
          otherPartyPhone: '13111111111',
          communicationMode: '被叫',
          beginTime: '2016-07-23 00:01:02',
          communicationTime: '14',
          baseStationLocation: '成都',
        },
      ],

      continueData: [],
      continueData2: [],
    }
  },
  mounted() {
    // this.continueData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.continueData = JSON.parse(localStorage.getItem('phoneInfo'))
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      let data = this.continueData
      this.continueData2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      console.log(this.continueData2)
    },

    // 时间筛选
    timeSizer() {
      let data = this.continueData2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.continueData2 = dataArr
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

    exportExcel() {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../../../utils/Export2Excel')
        const tHeader = [
          '序号',
          '对方号码',
          '呼叫类型',
          '通话时间',
          '通话时长',
          '基站地址',
        ]
        const filterVal = [
          'index',
          'otherPartyPhone',
          'communicationMode',
          'beginTime',
          'communicationTime',
          'baseStationLocation',
        ]
        const list = this.continueTable
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
  .el-table tbody tr:hover>td
    background-color rgba(44, 239, 255, 0.4) !important
  .el-pagination__total
    color white
</style>
