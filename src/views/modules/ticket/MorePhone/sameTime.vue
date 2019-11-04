<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="sameTimeForm"
      ref="sameTimeForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间">
        <el-date-picker
          v-model="sameTimeForm.time"
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
        <el-button type="danger" @click="resetForm('sameTimeForm')"
          >重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="sameTime" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column
        prop="housingEstateCode"
        width="150"
        label="基站小区"
        align="center"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.baseStationCode }}/
            {{ scope.row.housingEstateCode }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        width="110"
        align="center"
        label="几个话单出现"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone.length }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="baseStationLocation"
        align="center"
        width="150"
        label="基站地址"
      >
      </el-table-column>
      <!--:width="item.width"-->
      <!--<template v-for="(item, index) in tableHead">-->
      <!--  <template v-for="(item, index) in tableHead">
        <el-table-column
          :prop="item.propName"
          :label="item.label"
          :key="index"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.masterNum[index] }}</span>
          </template>
        </el-table-column>
      </template>-->
      <template v-for="(item, index) in tableHead">
        <el-table-column
          :prop="item.propName"
          :label="item.label"
          :key="index"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.otherPartyPhone[index] !== undefined"
              >{{ scope.row.otherPartyPhone[index] }}&nbsp;&nbsp;
              {{ scope.row.beginTime | formatDate }}</span
            >
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'

export default {
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss ')
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
      sameTimeForm: {
        time: '',
      },
      sameTime: [
        {
          baseStationLocation: '',
          phoneTimes: '',
          housingEstateCode: '',
        },
      ],
      tableHead: [
        { propName: 'phoneNum', label: '电话号码', fixed: true, width: '200' },
        { propName: 'phoneNum', label: '电话号码', fixed: true, width: '200' },
      ],

      morePhone: [],
      morePhone2: [],
    }
  },

  mounted() {
    // this.continueData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.morePhone = JSON.parse(localStorage.getItem('morePhone'))
    if (this.morePhone.length < 2) {
      this.$message('请选择至少两个话单！')
    } else {
      this.onSubmit()
    }
  },

  methods: {
    onSubmit() {
      let data = this.morePhone
      this.morePhone2 = data
      let conData = this.sameTimeForm
      console.log('分析查询')
      console.log(this.morePhone2)
      conData.time != null && this.eachPhone(this.morePhone2)
      console.log(this.morePhone2)
      /* this.morePhone2[0].list = [
        ...this.morePhone2[0].list,
        ...this.morePhone2[0].list,
      ] */
      this.morePhone2 = this.dataSort2(this.morePhone2)
      console.log(999999)
      console.log(this.morePhone2)
      this.tableHead = this.isHead(this.morePhone2)
      this.sameTime = this.morePhone2
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

    // // 表头生成
    // isHead(data) {
    //   let data1 = {}
    //   let value1 = []
    //   data1.propName = 'phoneNum'
    //   data1.label = '电话号码'
    //   data1.fixed = true
    //   data1.width = '200'
    //   let i = 0
    //   data.forEach(item => {
    //     item.masterList.length > i && (i = item.masterList.length)
    //     console.log(i)
    //   })
    //
    //   for (let j = 0; j < i; j++) {
    //     data1.label = data[0].masterList[j]
    //     value1.push(data1)
    //   }
    //
    //   return value1
    // },

    // 表头生成
    isHead(data) {
      let data1 = {}
      let value1 = []
      data1.propName = 'otherPartyPhone'
      data1.label = '电话号码'
      data1.fixed = true
      let i = 0
      data.forEach(item => {
        item.otherPartyPhone.length > i && (i = item.otherPartyPhone.length)
        console.log(i)
      })
      for (let j = 0; j < i; j++) {
        value1.push(data1)
      }

      return value1
    },

    /* isHead(data) {
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
    }, */

    // 时间筛选
    timeSizer(data) {
      let time = this.sameTimeForm.time
      let phoneInfo = {}
      let dataArr = []
      data.list.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      phoneInfo.list = dataArr
      phoneInfo.phone = data.phone
      return phoneInfo
    },

    // 数据重组 获取同时同基站数据
    dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai1 => {
        let phone = ai1.phone
        ai1.list.forEach(ai => {
          let otherPartyPhone = ai.otherPartyPhone
          let beginTime = ai.beginTime
          let baseStationLocation = ai.baseStationLocation
          let housingEstateCode = ai.housingEstateCode
          let baseStationCode = ai.baseStationCode
          if (!data1[baseStationLocation]) {
            value1.push({
              beginTime: beginTime,
              housingEstateCode: housingEstateCode,
              baseStationCode: baseStationCode,
              baseStationLocation: baseStationLocation,
              list: [
                {
                  phone: phone,
                  otherPartyPhone: otherPartyPhone,
                },
              ],
            })
            data1[baseStationLocation] = ai
          } else {
            for (let j = 0; j < value1.length; j++) {
              let dj = value1[j]
              if (
                this.compareTime2(dj.beginTime, beginTime) &&
                dj.baseStationLocation === baseStationLocation
              ) {
                dj.baseStationCode = baseStationCode
                dj.housingEstateCode = housingEstateCode
                dj.list.push({
                  phone: phone,
                  otherPartyPhone: otherPartyPhone,
                })
              }
            }
          }
        })
      })
      console.log(value1)
      return this.dataSort3(value1)
    },

    dataSort4(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai1 => {
        let phone = ai1.phone
        ai1.list.forEach(ai => {
          let otherPartyPhone = ai.otherPartyPhone
          let beginTime = ai.beginTime
          let housingEstateCode = ai.housingEstateCode
          let baseStationCode = ai.baseStationCode
          let baseStationLocation = ai.baseStationLocation
          if (!data1[housingEstateCode]) {
            value1.push({
              beginTime: beginTime,
              housingEstateCode: housingEstateCode,
              baseStationCode: baseStationCode,
              phoneTimes: 1,
              baseStationLocation: baseStationLocation,
              masterList: [phone],
              phoneNum: [otherPartyPhone],
              otherPartyPhoneList: [],
              masterNum: [1],
              masterPhone: phone,
            })
            data1[housingEstateCode] = ai
          } else {
            for (let j = 0; j < value1.length; j++) {
              let dj = value1[j]
              if (
                this.compareTime2(dj.beginTime, beginTime) &&
                dj.baseStationLocation === baseStationLocation &&
                dj.housingEstateCode === housingEstateCode
              ) {
                dj.masterList.indexOf(phone) === -1 && dj.masterList.push(phone)
                if (dj.masterPhone !== phone) {
                  dj.phoneNum.indexOf(otherPartyPhone) !== -1 &&
                    dj.otherPartyPhoneList.push(otherPartyPhone)
                } else {
                  dj.phoneNum.indexOf(otherPartyPhone) === -1 &&
                    dj.phoneNum.push(otherPartyPhone)
                }
              }
            }
          }
        })
      })
      console.log(value1)
      return value1
    },

    /* dataSort2(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai1 => {
        let phone = ai1.phone
        ai1.list.forEach(ai => {
          let otherPartyPhone = ai.otherPartyPhone
          let beginTime = ai.beginTime
          let housingEstateCode = ai.housingEstateCode
          let baseStationLocation = ai.baseStationLocation
          if (!data1[housingEstateCode]) {
            value1.push({
              beginTime: beginTime,
              housingEstateCode: housingEstateCode,
              phoneTimes: 1,
              baseStationLocation: baseStationLocation,
              masterList: [phone],
              phoneNum: [otherPartyPhone],
              masterNum: [1],
              masterPhone: phone,
            })
            data1[housingEstateCode] = ai
          } else {
            for (let j = 0; j < value1.length; j++) {
              let dj = value1[j]
              if (
                this.compareTime2(dj.beginTime, beginTime) &&
                dj.baseStationLocation === baseStationLocation &&
                dj.housingEstateCode === housingEstateCode
              ) {
                dj.phoneTimes++
                if (dj.masterList.indexOf(phone) === -1) {
                  dj.masterList.push(phone)
                  dj.masterNum.push(1)
                } else {
                  dj.masterNum[dj.masterList.indexOf(phone)]++
                }
                dj.phoneNum.push(otherPartyPhone)
                break
              }
            }
          }
        })
      })
      return value1
    }, */

    // 数据重组 筛选同时同基站列表数据
    dataSort3(arr) {
      var narr = []
      arr.forEach(item => {
        item.list.forEach(item2 => {
          narr.push({
            baseStationCode: item.baseStationCode,
            beginTime: item.beginTime,
            housingEstateCode: item.housingEstateCode,
            baseStationLocation: item.baseStationLocation,
            otherPartyPhone: item2.otherPartyPhone,
            phone: item2.phone,
          })
        })
      })

      /* let data1 = {}
      let value1 = []
      narr.forEach(ai => {
        let otherPartyPhone = ai.otherPartyPhone
        let beginTime = ai.beginTime
        let location = ai.location
        let housingEstateCode = ai.housingEstateCode
        let baseStationCode = ai.baseStationCode
        let phone = ai.phone
        if (!data1[housingEstateCode]) {
          value1.push({
            beginTime: beginTime,
            housingEstateCode: housingEstateCode,
            baseStationCode: baseStationCode,
            location: location,
            masterList: [phone],
            otherPartyPhone: otherPartyPhone,
            otherPartyPhoneList: [],
          })
          data1[housingEstateCode] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            if (
              dj.baseStationCode === baseStationCode &&
              dj.housingEstateCode === housingEstateCode
            ) {
              dj.masterList.indexOf(phone) === -1 && dj.masterList.push(phone)
              dj.otherPartyPhone.indexOf(otherPartyPhone) === -1 &&
                dj.otherPartyPhoneList.push(otherPartyPhone)
            }
          }
        }
      }) */

      // narr = narr
      //   .map(function(item, index, narr) {
      //     const i = narr.find(
      //       _item => item.baseStationLocation === _item.baseStationLocation,
      //     )
      //     if (i !== item) {
      //       i.otherPartyPhone.indexOf(item.otherPartyPhone) === -1 &&
      //         i.otherPartyPhone.push(item.otherPartyPhone)
      //       return undefined
      //     } else {
      //       i.otherPartyPhone = [i.otherPartyPhone]
      //       return i
      //     }
      //   })
      //   .filter(item => item !== undefined)

      narr = narr
        .map(function(item, index, narr) {
          const i = narr.find(
            _item => item.baseStationLocation === _item.baseStationLocation,
          )
          if (i !== item) {
            i.otherPartyPhone.indexOf(item.otherPartyPhone) === -1 &&
              i.otherPartyPhone.push(item.otherPartyPhone)
            i.phone.indexOf(item.phone) === -1 && i.phone.push(item.phone)
            return undefined
          } else {
            i.otherPartyPhone = [i.otherPartyPhone]
            i.phone = [i.phone]
            return i
          }
        })
        .filter(item => item !== undefined)
      console.log(111)
      console.log(narr)
      console.log(111)
      return narr
    },

    /*  dataSort3(data) {
      function repeat(arr1, arr2) {
        return arr1.filter(element1 =>
          arr2.some(
            element2 => element1.otherPartyPhone === element2.otherPartyPhone,
          ),
        )
      }
      console.log(5555)
      console.log(data)
      let sameDate = []
      let temArr = data[0]
      for (let i = 1; i < data.length - 1; i++) {
        let arr1 = temArr.list
        let arr2 = data[i].list
        temArr.list = repeat(arr1, arr2)
        sameDate = repeat(arr1, arr2)
      }
      return sameDate
    }, */

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

    /**
     *判断时间是否在5分钟有以类
     */
    compareTime2(changeTime, changeTime2) {
      changeTime = formatDate(new Date(changeTime), 'yyyy-MM-dd hh:mm:ss')
      changeTime2 = formatDate(new Date(changeTime2), 'yyyy-MM-dd hh:mm:ss')

      // 转换时间格式，并转换为时间戳
      function tranDate(time) {
        return new Date(time.replace(/-/g, '/')).getTime()
      }

      // 时间点
      let timeDot = tranDate(changeTime2)
      let nowTime = tranDate(changeTime)
      // 如果当前时间处于时间段内，返回true，否则返回false
      if (
        nowTime < timeDot - 1000 * 60 * 5 ||
        nowTime > timeDot + 1000 * 60 * 5
      ) {
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

.el-table tbody tr:hover > td
  background-color rgba(44, 239, 255, 0.4) !important

.el-pagination__total
  color white
</style>
