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
        <template slot-scope="scope">
          <span>{{ phoneTimes(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="location" align="center" label="号码属地">
      </el-table-column>
      <template v-for="(item, index) in tableHead">
        <el-table-column
          :label="item.label"
          :key="index"
          align="center"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.masterNum[index] }}</span>
          </template>
        </el-table-column>
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

  computed: {
    phoneTimes() {
      return function(row) {
        let a = 0
        row.masterNum.forEach(item => {
          item > 0 && a++
        })
        return a
      }
    },
  },

  mounted() {
    // this.continueData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.morePhone = JSON.parse(localStorage.getItem('morePhone'))
    if (this.morePhone.length < 2) {
      this.$message('请选择至少两个话单！')
    } else {
      this.onSubmit(this.morePhone)
    }
  },
  methods: {
    onSubmit() {
      if (this.morePhone === null) return
      let data = this.morePhone
      this.morePhone2 = data
      let conData2 = this.assignForm
      console.log(data)
      console.log('分析查询')
      // 内
      console.log(this.morePhone2)
      conData2.time != null && this.eachPhone(this.morePhone2)
      console.log('morePhone2')
      console.log(this.morePhone2)
      // 外
      this.morePhone3 = this.eachPhone2(this.morePhone2)
      this.morePhone2 = this.dataSort2(this.morePhone2)
      console.log('morePhone2')
      console.log(this.morePhone2)
      console.log('morePhone3')
      console.log(this.morePhone3)
      this.morePhone3 = this.dataSort2(this.morePhone3)
      console.log('morePhone3')
      console.log(this.morePhone3)
      conData2.event === '1'
        ? (this.assign2 = this.dataSort3(this.morePhone3, this.morePhone2))
        : (this.assign2 = this.dataSort3(this.morePhone2, this.morePhone3))
      this.tableHead = this.isHead(this.morePhone2)
      console.log(this.tableHead)
      console.log(this.morePhone2)
    },

    // 分别计算时间范围
    eachPhone(data) {
      let eachPhone = []
      data.forEach(item => {
        eachPhone.push(this.timeSizer(item))
      })
      this.morePhone2 = eachPhone
    },
    eachPhone2(data) {
      let eachPhone = []
      // data.forEach(item => {
      eachPhone = this.noSizer(data)
      // })
      return eachPhone
    },

    // 取不在时间段里的数据
    noSizer(data) {
      let eachPhone = []
      this.morePhone.forEach((item, index) => {
        let phoneInfo = {}
        phoneInfo.list = item.list.filter(
          e => data[index].list.indexOf(e) === -1,
        )
        phoneInfo.phone = item.phone
        eachPhone.push(phoneInfo)
      })
      return eachPhone
    },

    // 表头生成
    /* isHead(data) {
      let data1 = {}
      let value1 = []
      data1.propName = 'phoneNum'
      data1.label = '电话号码'
      data1.fixed = true
      data1.width = '200'
      let i = 0
      data.forEach(item => {
        item.masterList.length > i && (i = item.masterList.length)
        console.log(i)
      })

      for (let j = 0; j < i; j++) {
        data1.label = data[0].masterList[j]
        value1.push(data1)
      }

      return value1
    }, */
    isHead(data) {
      let value1 = []
      console.log(data)

      data[0].masterList.forEach(item => {
        let data1 = {}
        data1.propName = 'phoneNum'
        data1.fixed = true
        data1.width = '200'
        data1.label = item
        value1.push(data1)
      })
      return value1
    },

    // 时间筛选
    timeSizer(data) {
      let time = this.assignForm.time
      let phoneInfo = {}
      let dataArr = []
      data.list.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      phoneInfo.list = dataArr
      phoneInfo.phone = data.phone
      return phoneInfo
    },
    /* timeSizer() {
      let data = this.morePhone2
      let time = this.assignForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.morePhone2 = dataArr
    }, */

    // 数据重组
    dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai1 => {
        let phone = ai1.phone
        ai1.list.forEach(ai => {
          let location = ai.location
          let otherPartyPhone = ai.otherPartyPhone
          if (!data1[otherPartyPhone]) {
            let masterList = []
            let masterNum = []
            data.forEach((item, index) => {
              masterList[index] = item.phone
              masterNum[index] = 0
            })
            masterNum[masterList.indexOf(phone)]++
            value1.push({
              otherPartyPhone: otherPartyPhone,
              phoneTimes: 0,
              location: location,
              masterList: masterList,
              phoneNum: [otherPartyPhone],
              masterNum: masterNum,
              masterPhone: phone,
            })
            data1[otherPartyPhone] = ai
          } else {
            for (let j = 0; j < value1.length; j++) {
              let dj = value1[j]
              if (dj.otherPartyPhone === otherPartyPhone) {
                dj.phoneNum.push(otherPartyPhone)
                dj.masterNum[dj.masterList.indexOf(phone)]++
                let a = 0
                dj.masterNum.forEach(item => {
                  item > 0 && a++
                })
                dj.phoneTimes = a
              }
            }
          }
        })
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
  //background-color rgba(44, 239, 255, 0.3) !important
  //border 1px solid rgba(44, 239, 255, 0.4) !important
  //color white
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
