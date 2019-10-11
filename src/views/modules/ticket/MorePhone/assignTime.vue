<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="assignForm"
      ref="assignForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间" prop="time">
        <el-date-picker
          v-model="assignForm.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="event">
        <el-select v-model="assignForm.event" placeholder="选择分析项目">
          <el-option
            v-for="item in events"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="resetForm('assignForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="assign2" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="otherPartyPhone" label="对方号码" align="center">
      </el-table-column>
      <el-table-column prop="phoneTimes" align="center" label="几个话单出现">
      </el-table-column>
      <el-table-column prop="location" align="center" label="号码属地">
      </el-table-column>
      <template v-for="(item, index) in tableHead">
        <el-table-column
          :prop="item.propName"
          :label="item.label"
          :key="index"
          align="center"
          :width="item.width"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'
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
      assignForm: {
        time: '',
        event: '1',
      },
      events: [
        {
          value: '1',
          label: '指定时间段内没有出现，其他时间段出现对方号码',
        },
        {
          value: '2',
          label: '指定时间段内出现，其他时间段内没有出现对方号码',
        },
      ],
      assign: [
        {
          baseStationLocation: '',
          phoneTimes: '',
          housingEstateCode: '',
        },
      ],
      tableHead: [
        {
          propName: 'phoneNum',
          label: '13111111111',
          fixed: true,
          width: '200',
        },
        {
          propName: 'phoneNum',
          label: '15111111111',
          fixed: true,
          width: '200',
        },
      ],

      assign2: [],
      morePhone: [],
      morePhone2: [],
      morePhone3: [],
    }
  },

  mounted() {
    // this.continueData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.morePhone = JSON.parse(localStorage.getItem('morePhone')).list
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      let data = this.morePhone
      this.morePhone2 = data
      let conData2 = this.assignForm
      console.log(data)
      console.log('分析查询')
      // 内
      conData2.time != null && this.timeSizer()
      // 外
      this.morePhone3 = this.noSizer(this.morePhone2)
      console.log(this.morePhone3)
      console.log(this.morePhone2)
      this.morePhone2 = this.dataSort2(this.morePhone2)
      this.morePhone3 = this.dataSort2(this.morePhone3)
      console.log(this.morePhone3)
      console.log(this.morePhone2)
      console.log(conData2.event === '1')
      conData2.event === '1'
        ? (this.assign2 = this.dataSort3(this.morePhone3, this.morePhone2))
        : (this.assign2 = this.dataSort3(this.morePhone2, this.morePhone3))
      /* this.tableHead = this.isHead(this.morePhone2)
      this.sameTime = this.morePhone2
      console.log(this.tableHead)
      console.log(this.morePhone2) */
    },

    // 取不在时间段里的数据
    noSizer(data) {
      let data2 = this.morePhone
      let value1 = []
      value1 = data2.filter(e => data.indexOf(e) === -1)
      return value1
    },

    // 表头生成
    isHead(data) {
      let data1 = {}
      let value1 = []
      data1.propName = 'phoneNum'
      data1.label = '电话号码'
      data1.fixed = true
      data1.width = '200'
      let i = 0
      data.forEach(item => {
        item.phoneNum.length > i && (i = item.phoneNum.length)
      })
      for (let j = 0; j < i; j++) {
        value1.push(data1)
      }
      return value1
    },

    // 时间筛选
    timeSizer() {
      let data = this.morePhone2
      let time = this.assignForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.morePhone2 = dataArr
    },

    // 数据重组
    dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai => {
        let location = ai.location
        let otherPartyPhone = ai.otherPartyPhone
        if (!data1[otherPartyPhone]) {
          value1.push({
            otherPartyPhone: otherPartyPhone,
            phoneTimes: 1,
            location: location,
          })
          data1[otherPartyPhone] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            if (dj.otherPartyPhone === otherPartyPhone) {
              dj.phoneTimes++
              break
            }
          }
        }
      })
      return value1
    },

    // 数据重组
    dataSort3(data1, data2) {
      let value1 = data1.filter(e => data2.indexOf(e) === -1)
      return value1
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
  width 1000px
  margin 0 auto
  padding 0px
</style>
<style lang="stylus">
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
