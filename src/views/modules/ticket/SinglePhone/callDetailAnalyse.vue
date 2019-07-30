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
    <div id="chart">

    </div>
    <div id="picture1"></div>
    <div id="picture2"></div>
    <div id="picture3"></div>
    <div id="picture4"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.picture1();
    this.picture2();
    this.picture3();
    this.picture4();
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
      }
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
    picture1 () {
      let myChart = echarts.init(document.getElementById('picture1'));
      let option = {
        title: {
          text: '通话概况',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['总通话次数', '累计时长(s)', '主叫占比', '被叫占比'],
          textStyle: {
            color: 'white'
          }
        },
        color: ['rgba(128,125,239,0.9)', 'rgba(75,137,241,0.9)', 'rgba(225,150,54,0.9)', 'rgba(228,104,98,0.9)'],
        series: [
          {
            name: '总通话次数',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['15%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                },
                color: 'rgb(44, 239, 255)'
              }
            },
            data: [
              { value: '114', name: '总通话次数', itemStyle: { color: 'rgba(128,125,239,0.9)' } }
            ]
          },
          {
            name: '累计时长',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                },
                color: 'rgb(44, 239, 255)'
              }
            },
            data: [
              { value: '114', name: '累计时长(s)', itemStyle: { color: 'rgba(75,137,241,0.9)' } }
            ]
          },
          {
            name: '主被叫',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['85%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                },
                color: 'rgb(44, 239, 255)'
              }
            },
            data: [
              { value: 335, name: '主叫占比', itemStyle: { color: 'rgba(225,150,54,0.9)' } },
              { value: 310, name: '被叫占比', itemStyle: { color: 'rgba(228,104,98,0.9)' } }
            ]
          }

        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () { myChart.resize() })
    },
    picture2 () {
      let myChart = echarts.init(document.getElementById('picture2'));
      let option = {
        title: {
          text: '单日通话次数Top10',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28
          }
        },
        color: ['#F2F2F2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          right: 30,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2
            }
          }
        },
        xAxis: [
          {
            name: '时间',
            nameTextStyle: { color: 'white' },
            type: 'category',
            data: ['2019-07-21', '2019-07-22', '2019-07-23', '2019-07-24'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(44, 239, 255, 0.6)',
                width: '1'
              }
            }
          }
        ],
        yAxis: [
          {
            name: '通话次数',
            nameTextStyle: { color: 'white' },
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgb(44, 239, 255)',
                width: '1'
              }
            },
            axisTick: {
              lineStyle: { color: 'rgb(150,150,150)' }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(44, 239, 255,0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '通话次数',
            type: 'bar',
            barWidth: '60%',
            data: [1, 2, 3, 4]
          }
        ],
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: 'rgb(44, 239, 255)'
          }
        }
      };
      myChart.setOption(option);
      window.addEventListener('resize', function () { myChart.resize() })
    },
    picture3 () {
      let myChart = echarts.init(document.getElementById('picture3'));
      let option = {
        title: {
          text: '主叫TOP',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28
          }
        },
        color: ['#F2F2F2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          right: 30,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2
            }
          }
        },
        xAxis: [
          {
            name: '电话号码',
            nameTextStyle: { color: 'white' },
            type: 'category',
            data: ['13111111111', '15111111111', '18111111111', '16111111111'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(44, 239, 255, 0.6)',
                width: '1'
              }
            }
          }
        ],
        yAxis: [
          {
            name: '通话次数',
            nameTextStyle: { color: 'white' },
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgb(44, 239, 255)',
                width: '1'
              }
            },
            axisTick: {
              lineStyle: { color: 'rgb(150,150,150)' }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(44, 239, 255,0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '通话次数',
            type: 'bar',
            barWidth: '60%',
            data: [1, 2, 3, 4]
          }
        ],
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: 'rgb(44, 239, 255)'
          }
        }
      };
      myChart.setOption(option);
      window.addEventListener('resize', function () { myChart.resize() })
    },
    picture4 () {
      let myChart = echarts.init(document.getElementById('picture4'));
      let option = {
        title: {
          text: '被叫TOP',
          textAlign: 'center',
          left: 580,
          textStyle: {
            color: 'white',
            fontSize: 28
          }
        },
        color: ['#F2F2F2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          right: 30,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2
            }
          }
        },
        xAxis: [
          {
            name: '电话号码',
            nameTextStyle: { color: 'white' },
            type: 'category',
            data: ['13111111111', '15111111111', '18111111111', '16111111111'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(44, 239, 255, 0.6)',
                width: '1'
              }
            }
          }
        ],
        yAxis: [
          {
            name: '通话次数',
            nameTextStyle: { color: 'white' },
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgb(44, 239, 255)',
                width: '1'
              }
            },
            axisTick: {
              lineStyle: { color: 'rgb(150,150,150)' }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(44, 239, 255,0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '通话次数',
            type: 'bar',
            barWidth: '60%',
            data: [1, 2, 3, 4]
          }
        ],
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: 'rgb(44, 239, 255)'
          }
        }
      };
      myChart.setOption(option);
      window.addEventListener('resize', function () { myChart.resize() })
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
  #picture1
    width 100%
    height 500px
    margin 0 auto
  #picture2
    width 100%
    height 500px
    margin 0 auto
  #picture3
    width 100%
    height 500px
    margin 0 auto
  #picture4
    width 100%
    height 500px
    margin 0 auto
</style>
