<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="morePhoneForm"
      ref="morePhoneForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间" prop="time">
        <el-date-picker
          v-model="morePhoneForm.time"
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
        <el-button type="danger" @click="resetForm('morePhoneForm')"
          >重置
        </el-button>
      </el-form-item>
    </el-form>
    <div id="comPhone"></div>
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
      morePhoneForm: {
        time: '',
      },
      data: [
        {
          name: '15111111111',
          x: 300,
          y: 300,
        },
        {
          name: '15122222222',
          x: 550,
          y: 250,
        },
        {
          name: '15311111111',
          x: 800,
          y: 300,
        },
        {
          name: '15411111111',
          x: 550,
          y: 300,
        },
        {
          name: '15611111111',
          x: 550,
          y: 350,
        },
      ],
      links: [
        {
          source: '15111111111',
          target: '15122222222',
          label: {
            normal: {
              show: true,
              formatter: '12121',
            },
          },
        },
        {
          source: '15122222222',
          target: '15311111111',
        },
        {
          source: '15111111111',
          target: '15411111111',
        },
        {
          source: '15411111111',
          target: '15311111111',
        },
        {
          source: '15111111111',
          target: '15611111111',
        },
        {
          source: '15611111111',
          target: '15311111111',
        },
      ],

      morePhone: [],
      morePhone2: [],
      dataTest: [
        {
          list: [
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530051234',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '1353005123',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530053333',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530054455',
            },
          ],
          phone: '13511114444',
        },
        {
          list: [
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530052182',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '1353005222',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530053333',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530054455',
            },
          ],
          phone: '13511111111',
        },
        {
          list: [
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '1353005442',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '1353005222',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530053333',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530054455',
            },
          ],
          phone: '13511114344',
        },
        {
          list: [
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530053212',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '1353005222',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530053333',
            },
            {
              baseStationCode: '1DF1',
              otherPartyPhone: '13530054455',
            },
          ],
          phone: '13512214444',
        },
      ],
    }
  },
  mounted() {
    this.morePhone = JSON.parse(localStorage.getItem('morePhone'))
    this.comPhone()
  },
  methods: {
    onSubmit() {
      let data = this.morePhone
      this.morePhone2 = data
      console.log(data)
      let conData2 = this.morePhoneForm
      console.log('分析查询')
      // 内
      console.log(this.morePhone2)
      conData2.time != null && this.eachPhone(this.morePhone2)
      this.data = this.disposeData(data)
      this.links = this.disposeLinks(this.data)
      this.comPhone()
      console.log(this.data)
      console.log(this.links)
    },

    // 分别计算时间范围
    eachPhone(data) {
      let eachPhone = []
      data.forEach(item => {
        eachPhone.push(this.timeSizer(item))
      })
      this.morePhone2 = eachPhone
    },

    // 时间筛选
    timeSizer(data) {
      let time = this.morePhoneForm.time
      let phoneInfo = {}
      let dataArr = []
      data.list.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      phoneInfo.list = dataArr
      phoneInfo.phone = data.phone
      return phoneInfo
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

    // 处理数据
    disposeData(data) {
      let dataArr = []
      let phoneList = {}

      // 本人电话
      let self = []
      let selfx = 0

      data.forEach((item, index) => {
        let selfd = {}

        if ((index + 1) % 2 === 0) {
          selfx = 550 - 50 * (parseInt(index / 2) + 1)
        } else {
          selfx = 550 + 50 * (parseInt(index / 2) + 1)
        }

        /* (index + 1) % 2 === 0
          ? (selfx = 550 - 50 * (index + 1))
          : (selfx = 550 + 50 * (index + 1)) */
        selfd.type = 1
        selfd.name = item.phone
        selfd.y = 300
        selfd.x = selfx
        self.push(selfd)
      })

      // 对方电话
      let otherData = this.samePhone(data)
      let other = []
      let othery = 0

      otherData.forEach((item, index) => {
        let otherd = {}

        if ((index + 1) % 2 === 0) {
          othery = 300 - 10 * (parseInt(index / 2) + 1)
        } else {
          othery = 300 + 10 * (parseInt(index / 2) + 1)
        }
        /* index % 2 === 0
          ? (othery = 300 - 50 * (index + 1))
          : (othery = 300 + 50 * (index + 1)) */
        otherd.type = 2
        otherd.name = item.otherPartyPhone
        otherd.x = 550
        otherd.y = othery
        other.push(otherd)
      })

      phoneList.self = self
      phoneList.other = other
      dataArr.push(...self, ...other)
      return dataArr
    },

    // 处理连线
    disposeLinks(data) {
      let dataArr = []
      let start = data.filter(function(item) {
        return item.type === 1
      })
      let end = data.filter(function(item) {
        return item.type === 2
      })
      for (let i = 0; i < start.length; i++) {
        for (let j = 0; j < end.length; j++) {
          let links = {}
          links.source = start[i].name
          links.target = end[j].name
          dataArr.push(links)
        }
      }
      return dataArr
    },

    samePhone(data2) {
      // 提取相同电话

      let data = this.dataTest
      function repeat(arr1, arr2) {
        return arr1.filter(element1 =>
          arr2.some(
            element2 => element1.otherPartyPhone === element2.otherPartyPhone,
          ),
        )
      }
      let sameDate = []
      let temArr = data[0]
      for (let i = 1; i < data.length - 1; i++) {
        let arr1 = temArr.list
        let arr2 = data[i].list
        temArr.list = repeat(arr1, arr2)
        sameDate = repeat(arr1, arr2)
      }
      return sameDate
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
    comPhone() {
      var _this = this
      let myChart = echarts.init(document.getElementById('comPhone'))
      let option = {
        backgroundColor: 'transparent',
        series: [
          {
            name: '数据',
            type: 'graph',
            layout: 'none',
            roam: true,
            label: {
              show: true,
              fontWeight: 'bold',
              align: 'center',
            },
            links: _this.links,
            data: _this.data,
          },
        ],
      }
      myChart.setOption(option)
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
  #comPhone
    width 100%
    height 500px
    margin 0 auto

.tableMap
  position absolute
  left 60px
  z-index 100
  width 220px

>>> .el-dialog
  left 90%

#order >>> .el-dialog
  left 50%

>>> #map
  height 500px

>>> #BasemapToggle
  position absolute
  right 40px
  top 236px
  z-index 50

>>> #HomeButton
  left 81px
  position absolute
  top 318px
  z-index 50

>>> #LocateButton
  left 81px
  position absolute
  top 348px
  z-index 50

>>> .esriOverviewMap.ovwBL .ovwContainer
  left 60px
  bottom 60px

>>> .esriOverviewMap .ovwButton
  left 60px
  bottom 60px

>>> .esriSimpleSliderVertical .esriSimpleSliderIncrementButton:focus
  border none
  outline none

>>> .esriSimpleSliderVertical .esriSimpleSliderDecrementButton:focus
  border none
  outline none

>>> .BasemapToggle .basemapImageContainer:focus
  border none
  outline none

>>> #BasemapToggle:focus
  border none
  outline none

>>> #BasemapToggle .basemapContainer:focus
  border none
  outline none

>>> .BasemapToggle .toggleButton
  border none
  outline none

>>> .esriPopup .titleButton.maximize
  display none
</style>
