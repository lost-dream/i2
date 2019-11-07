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
    <div class="tableMap">
      <el-table
        :data="mapTabaData"
        height="370"
        :default-sort="{ prop: 'value', order: 'descending' }"
      >
        <el-table-column
          prop="index"
          type="index"
          width="60"
          label="top10"
          align="center"
        >
        </el-table-column>
        <el-table-column label="全国通话频率排名" align="center">
          <el-table-column prop="name" label="地区" align="center">
          </el-table-column>
          <el-table-column
            prop="value"
            label="通话次数"
            width=""
            align="center"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="clickCoat" v-show="show">
      <div class="clickTable">
        <el-table
          :data="clickTable"
          style="width: 100%"
          :default-sort="{ prop: 'value', order: 'descending' }"
        >
          <el-table-column prop="name" label="城市" align="center">
          </el-table-column>
          <el-table-column prop="value" label="通话次数" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--
    <flyDialog :show.sync="show" :width="width" :modal="modal" :flag="true">
      <el-table
        :data="clickTable"
        style="width: 100%"
        :default-sort="{ prop: 'value', order: 'descending' }"
      >
        <el-table-column prop="name" label="城市" align="center">
        </el-table-column>
        <el-table-column prop="value" label="通话次数" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </flyDialog>-->
    <div id="myMap" ref="myMap" style="width: 1100px; height: 600px;"></div>
    <div id="order">
      <flyDialog :show.sync="show1" :width="width1" :flag="true">
        <el-table :data="detailTable" border style="width: 100%">
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
          >
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
            prop="baseStationCode"
            label="基站信息"
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
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */

import echarts from 'echarts'
import flyDialog from '../../../../components/fly-dialog'
import { formatDate } from '../../../../utils/dateFormat.js'
import { GP, GT, GC } from '../../../../utils/provincesData.js'
require('echarts/map/js/china.js')
export default {
  components: {
    flyDialog,
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss ')
    },
  },
  data() {
    return {
      myChart: null,
      option: {},

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
      show: false,
      width: '320px',
      show1: false,
      width1: '1100px',
      modal: false,
      /* mapData: [
        { name: '北京', value: Math.round(Math.random() * 500) },
        { name: '天津', value: Math.round(Math.random() * 500) },
        { name: '上海', value: Math.round(Math.random() * 500) },
        { name: '重庆', value: Math.round(Math.random() * 500) },
        { name: '河北', value: Math.round(Math.random() * 500) },
        { name: '河南', value: Math.round(Math.random() * 500) },
        { name: '云南', value: Math.round(Math.random() * 500) },
        { name: '辽宁', value: Math.round(Math.random() * 500) },
        { name: '黑龙江', value: Math.round(Math.random() * 500) },
        { name: '湖南', value: Math.round(Math.random() * 500) },
        { name: '安徽', value: Math.round(Math.random() * 500) },
        { name: '山东', value: Math.round(Math.random() * 500) },
        { name: '新疆', value: Math.round(Math.random() * 500) },
        { name: '江苏', value: Math.round(Math.random() * 500) },
        { name: '浙江', value: Math.round(Math.random() * 500) },
        { name: '江西', value: Math.round(Math.random() * 500) },
        { name: '湖北', value: Math.round(Math.random() * 500) },
        { name: '广西', value: Math.round(Math.random() * 500) },
        { name: '甘肃', value: Math.round(Math.random() * 500) },
        { name: '山西', value: Math.round(Math.random() * 500) },
        { name: '内蒙古', value: Math.round(Math.random() * 500) },
        { name: '陕西', value: Math.round(Math.random() * 500) },
        { name: '吉林', value: Math.round(Math.random() * 500) },
        { name: '福建', value: Math.round(Math.random() * 500) },
        { name: '贵州', value: Math.round(Math.random() * 500) },
        { name: '广东', value: Math.round(Math.random() * 500) },
        { name: '青海', value: Math.round(Math.random() * 500) },
        { name: '西藏', value: Math.round(Math.random() * 500) },
        { name: '四川', value: Math.round(Math.random() * 500) },
        { name: '宁夏', value: Math.round(Math.random() * 500) },
        { name: '海南', value: Math.round(Math.random() * 500) },
        { name: '台湾', value: Math.round(Math.random() * 500) },
        { name: '香港', value: Math.round(Math.random() * 500) },
        { name: '澳门', value: Math.round(Math.random() * 500) },
      ], */
      origMapData: [
        { name: '北京', value: 0 },
        { name: '天津', value: 0 },
        { name: '上海', value: 0 },
        { name: '重庆', value: 0 },
        { name: '河北', value: 0 },
        { name: '河南', value: 0 },
        { name: '云南', value: 0 },
        { name: '辽宁', value: 0 },
        { name: '黑龙江', value: 0 },
        { name: '湖南', value: 0 },
        { name: '安徽', value: 0 },
        { name: '山东', value: 0 },
        { name: '新疆', value: 0 },
        { name: '江苏', value: 0 },
        { name: '浙江', value: 0 },
        { name: '江西', value: 0 },
        { name: '湖北', value: 0 },
        { name: '广西', value: 0 },
        { name: '甘肃', value: 0 },
        { name: '山西', value: 0 },
        { name: '内蒙古', value: 0 },
        { name: '陕西', value: 0 },
        { name: '吉林', value: 0 },
        { name: '福建', value: 0 },
        { name: '贵州', value: 0 },
        { name: '广东', value: 0 },
        { name: '青海', value: 0 },
        { name: '西藏', value: 0 },
        { name: '四川', value: 0 },
        { name: '宁夏', value: 0 },
        { name: '海南', value: 0 },
        { name: '台湾', value: 0 },
        { name: '香港', value: 0 },
        { name: '澳门', value: 0 },
        { name: '南海诸岛', value: 0 },
      ],
      mapTabaData: [],
      mapData: [],
      clickTable: [],
      detailTable: [
        {
          otherPartyPhone: '13111111111',
          communicationMode: '被叫',
          beginTime: '2016-07-23 00:01:02',
          communicationTime: '14',
          baseStationCode: '121E',
          baseStationLocation: '成都',
        },
      ],
      mapDataInfo: [],
      mapDataInfo2: [],
    }
  },
  computed: {
    mapDataTop() {
      let arr = this.mapData
      return arr.filter(item => item.value > 0)
    },
  },
  mounted() {
    this.mapDataInfo = JSON.parse(localStorage.getItem('phoneInfo'))
    this.map()
  },
  methods: {
    onSubmit() {
      let data = this.mapDataInfo
      this.mapDataInfo2 = data
      let conData = this.callForm
      console.log('分析查询')
      conData.time != null && this.timeSizer()
      this.mapTabaData = this.dataSort(this.mapDataInfo2)
      this.mapDataInfo2 = this.dataSort2(this.mapDataInfo2)
      this.mapData = this.mapData2(this.mapDataInfo2)
      this.mapData.sort((a, b) => b.value - a.value)
      if (!(this.mapData[0].value === 0)) {
        this.option.visualMap.max = Math.ceil(this.mapData[0].value / 5) * 5
        this.option.visualMap.range[1] =
          Math.ceil(this.mapData[0].value / 5) * 5
        this.option.series[0].data = this.mapData
        this.myChart.setOption(this.option)
      }
    },

    // 显示地图数据
    mapData2(data) {
      let arr = JSON.parse(JSON.stringify(this.origMapData)).map(item => {
        data.map(item2 => {
          if (item.name === item2.provinces) {
            item.value = item2.count
            item.info = item2.info
          }
        })
        return item
      })
      return arr
    },

    // 数据重组
    dataSort(data) {
      let data1 = {}
      let value1 = []
      data.forEach(ai => {
        let location = ai.location
        if (!data1[location]) {
          value1.push({
            name: location,
            value: 1,
            info: [ai],
          })
          data1[location] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            if (dj.name === location) {
              dj.info.push(ai)
              dj.value++
              break
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
        let location = this.isProvinces(ai.location)
        if (!data1[location]) {
          value1.push({
            provinces: location,
            count: 1,
            info: [ai],
          })
          data1[location] = ai
        } else {
          for (let j = 0; j < value1.length; j++) {
            let dj = value1[j]
            if (dj.provinces === location) {
              dj.info.push(ai)
              dj.count++
              break
            }
          }
        }
      })
      return value1
    },

    // 计算通话省份
    isProvinces(data) {
      let gp = GP
      let gt = GT
      let gc = GC
      let location = ''
      for (let i = 0; i <= gt.length - 1; i++) {
        if (gt[i].indexOf(data) > -1) {
          location = gp[i]
          break
        }
        for (let j = 0; j < gc[i].length - 1; j++) {
          if (gc[i][j].indexOf(data) > -1) {
            location = gp[i]
            break
          }
        }
      }
      return location
    },

    // 时间筛选
    timeSizer() {
      let data = this.mapDataInfo2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.mapDataInfo2 = dataArr
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
    // Math.ceil(_this.mapData[0].value / 5) * 5
    map() {
      let _this = this
      _this.myChart = echarts.init(document.getElementById('myMap'))
      _this.option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          type: 'continuous',
          min: 0,
          max: 200,
          range: [1, 200],
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          inRange: {
            color: ['#efbf58', 'red'],
          },
          outOfRange: {
            color: ['#c2c2c2'],
          },
          dimension: 0,
          // splitList: [{ start: 0, end: 0, color: 'red' }],
          textStyle: {
            color: 'white',
          },
        },
        series: [
          {
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
              show: true,
              fontWeight: 'bold',
              align: 'center',
            },
            data: this.mapData,
          },
        ],
      }
      _this.myChart.setOption(_this.option)
      _this.myChart.on('click', function(param) {
        console.log(param)
        _this.clickTable = []
        _this.clickTable.push(param.data)
        _this.show = true
      })
      window.addEventListener('resize', function() {
        _this.myChart.resize()
      })
    },
    handleClick(row) {
      this.detailTable = row.info
      this.show = false
      this.show1 = true
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
  #myMap
    width 100%
    height 500px
    margin 0 auto
  .clickCoat
    position: absolute;
    left: 101%;
    top: 55%;
    width: 300px;
    padding 10px
    background-color: rgba(44,239,255,0.1)
  .clickTable
    border solid 1px #ffffff
    padding 10px
  >>> .el-table td
    border none
.tableMap
  position absolute
  left 60px
  z-index 100
  width 220px
>>>.el-dialog
  left 90%
#order >>>.el-dialog
  left 50%

.container ::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
  }

.container::-webkit-scrollbar-button {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-webkit-scrollbar-corner {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-webkit-scrollbar-resizer {
    background-color: rgba(0, 0, 0, 0);
  }

.container ::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
  }

  /*o内核*/
.container .-o-scrollbar {
    -moz-appearance: none !important;
    background: rgba(0, 255, 0, 0) !important;
  }

.container::-o-scrollbar-button {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-o-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-o-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-o-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-o-scrollbar-corner {
    background-color: rgba(0, 0, 0, 0);
  }

.container::-o-scrollbar-resizer {
    background-color: rgba(0, 0, 0, 0);
  }

  /*IE10,IE11,IE12*/
.container {
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: initial;
  }
</style>
