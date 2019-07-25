<template>
  <div class="container">
    <div id="chart">

    </div>

  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    let myChart = echarts.init(document.getElementById('chart'));
    let option = {
      color: ['#F2F2F2'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '通话次数',
          type: 'bar',
          barWidth: '60%',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
        }
      ],
      emphasis: {
        itemStyle: {
          // 高亮时点的颜色。
          color: 'red'
        }
      }
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () { myChart.resize() })
  },
  data () {
    return {
    };
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.container
  width 1000px
  margin 0 auto
  padding 0px
  h2
    text-align center
    padding 30px
    font-size 18px
  #chart
    width 100%
    height 500px
    margin 0 auto
</style>
