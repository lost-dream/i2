<template>
  <div class="container">
    <el-form :inline="true"
             :model="morePhoneForm"
             ref="morePhoneForm"
             class="demo-form-inline">
      <el-form-item label="呼叫时间"
                    prop="time">
        <el-date-picker v-model="morePhoneForm.time"
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
      <el-form-item>
        <el-button type="danger"
                   @click="resetForm('morePhoneForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div id="comPhone"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.comPhone();
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
      morePhoneForm: {
        time: ''
      },
      data: [{
        name: '15111111111',
        x: 300,
        y: 300
      }, {
        name: '15122222222',
        x: 550,
        y: 250
      }, {
        name: '15311111111',
        x: 800,
        y: 300
      },
      {
        name: '15411111111',
        x: 550,
        y: 300
      },
      {
        name: '15611111111',
        x: 550,
        y: 350
      }],
      links: [{
        source: '15111111111',
        target: '15122222222',
        label: {
          normal: {
            show: true,
            formatter: '12121'
          }
        }
      }, {
        source: '15122222222',
        target: '15311111111'
      }, {
        source: '15111111111',
        target: '15411111111'
      }, {
        source: '15411111111',
        target: '15311111111'
      }, {
        source: '15111111111',
        target: '15611111111'
      }, {
        source: '15611111111',
        target: '15311111111'
      }]
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    comPhone () {
      var _this = this;
      let myChart = echarts.init(document.getElementById('comPhone'));
      let option = {
        backgroundColor: 'transparent',
        series: [{
          name: '数据',
          type: 'graph',
          layout: 'none',
          roam: true,
          label: {
            show: true,
            fontWeight: 'bold',
            align: 'center'
          },
          links: _this.links,
          data: _this.data
        }]
      };
      myChart.setOption(option);
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
  #comPhone
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
>>>#map
  height 500px
>>>#BasemapToggle
  position absolute
  right 40px
  top 236px
  z-index 50
>>>#HomeButton
  left 81px
  position absolute
  top 318px
  z-index 50
>>>#LocateButton
  left 81px
  position absolute
  top 348px
  z-index 50
>>>.esriOverviewMap.ovwBL .ovwContainer
  left 60px
  bottom 60px
>>>.esriOverviewMap .ovwButton
  left 60px
  bottom 60px
>>>.esriSimpleSliderVertical .esriSimpleSliderIncrementButton:focus
  border none
  outline none
>>>.esriSimpleSliderVertical .esriSimpleSliderDecrementButton:focus
  border none
  outline none
>>>.BasemapToggle .basemapImageContainer:focus
  border none
  outline none
>>>#BasemapToggle:focus
  border none
  outline none
>>>#BasemapToggle .basemapContainer:focus
  border none
  outline none
>>>.BasemapToggle .toggleButton
  border none
  outline none
>>>.esriPopup .titleButton.maximize
  display none
</style>
