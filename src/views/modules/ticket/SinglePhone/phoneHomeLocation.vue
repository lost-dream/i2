<template>
  <div class="container">
    <el-form :inline="true"
             :model="callForm"
             class="demo-form-inline">
      <el-form-item label="呼叫时间">
        <el-date-picker v-model="callForm.time"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tableMap">
      <el-table :data="mapData"
                style="width: 100%"
                height="250"
                :default-sort="{prop: 'value', order: 'descending'}">
        <el-table-column prop="index"
                         type="index"
                         label="top排行"
                         width="60"
                         align="center">
        </el-table-column>
        <el-table-column label="全国通话频率排名"
                         align="center">
          <el-table-column prop="name"
                           label="地区"
                           width="50"
                           align="center">
          </el-table-column>
          <el-table-column prop="value"
                           label="通话次数"
                           width="70"
                           align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <flyDialog :show.sync='show'
               :width='width'
               :modal='modal'>
      <el-table :data="clickTable"
                style="width: 100%"
                :default-sort="{prop: 'value', order: 'descending'}">
        <el-table-column prop="name"
                         label="城市"
                         width="50"
                         align="center">
        </el-table-column>
        <el-table-column prop="value"
                         label="通话次数"
                         width="80"
                         align="center">
        </el-table-column>
        <el-table-column label="操作"
                         width="50"
                         align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="text"
                       size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </flyDialog>
    <div id="myMap"
         ref="myMap"
         style="width: 1100px; height: 600px;"></div>
    <div id="order">
      <flyDialog :show.sync='show1'
                 :width='width1'>
        <el-table :data="detailTable"
                  border
                  style="width: 100%">
          <el-table-column label="序号"
                           type="index"
                           align="center"
                           prop="index"
                           width="50">
          </el-table-column>
          <el-table-column prop="otherPartyPhone"
                           label="对方号码"
                           align="center"
                           width="100">
          </el-table-column>
          <el-table-column prop="communicationMode"
                           label="呼叫类型"
                           align="center"
                           width="100">
          </el-table-column>
          <el-table-column prop="beginTime"
                           label="通话时间"
                           align="center"
                           width="100">
          </el-table-column>
          <el-table-column prop="communicationTime"
                           label="通话时长"
                           align="center"
                           width="100">
          </el-table-column>
          <el-table-column prop="baseStationCode"
                           label="基站信息"
                           align="center"
                           width="100">
          </el-table-column>
          <el-table-column prop="baseStationLocation"
                           label="基站地址"
                           align="center"
                           width="100">
          </el-table-column>
        </el-table>
      </flyDialog>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import flyDialog from '../../../../components/fly-dialog'
require('echarts/map/js/china.js')
export default {
  components: {
    flyDialog
  },
  mounted () {
    this.map();
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      callForm: {
        time: ''
      },
      show: false,
      width: '300px',
      show1: false,
      width1: '1100px',
      modal: false,
      mapData: [
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
        { name: '澳门', value: Math.round(Math.random() * 500) }],
      clickTable: [],
      detailTable: [
        {
          index: '',
          otherPartyPhone: '13111111111',
          communicationMode: '被叫',
          beginTime: '2016-07-23 00:01:02',
          communicationTime: '14',
          baseStationCode: '121E',
          baseStationLocation: '成都'
        }
      ]
    };
  },
  methods: {
    onSubmit () {
      console.log(this.timeChange(this.callForm.time))
      console.log('submit!');
    },
    timeChange (time) {
      var newTime = time.map(function (item) {
        var d = new Date(item);
        var newItem = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return newItem
      })
      return newTime
    },
    map () {
      let _this = this;
      let myChart = echarts.init(document.getElementById('myMap'));
      let option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          type: 'continuous',
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          textStyle: {
            color: 'white'
          }
        },
        series: [{
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            show: true,
            fontWeight: 'bold',
            align: 'center'
          },
          data: this.mapData
        }]
      };
      myChart.setOption(option);
      myChart.on('click', function (param) {
        _this.clickTable = []
        _this.clickTable.push(param.data)
        _this.show = true
      })
      window.addEventListener('resize', function () { myChart.resize() })
    },
    handleClick (row) {
      console.log(row);
      this.show1 = true
    }
  }
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
.tableMap
  position absolute
  left 60px
  z-index 100
  width 220px
>>>.el-dialog
  left 90%
#order >>>.el-dialog
  left 50%
</style>
