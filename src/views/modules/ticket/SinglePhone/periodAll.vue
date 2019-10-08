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
    <div id="chart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    this.picture();
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      callForm: {
        time: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.timeChange(this.callForm.time));
      console.log("submit!");
    },
    timeChange(time) {
      var newTime = time.map(function(item) {
        var d = new Date(item);
        var newItem =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes() +
          ":" +
          d.getSeconds();
        return newItem;
      });
      return newTime;
    },
    picture() {
      let myChart = echarts.init(document.getElementById("chart"));
      let option = {
        color: ["#F2F2F2"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          show: true,
          right: 30,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        xAxis: [
          {
            type: "category",
            data: [
              "00时",
              "01时",
              "02时",
              "03时",
              "04时",
              "05时",
              "06时",
              "07时",
              "08时",
              "09时",
              "10时",
              "11时",
              "12时",
              "13时",
              "14时",
              "15时",
              "16时",
              "17时",
              "18时",
              "19时",
              "20时",
              "21时",
              "22时",
              "23时"
            ],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "rgba(44, 239, 255, 0.6)",
                width: "1"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "rgb(44, 239, 255)",
                width: "1"
              }
            },
            axisTick: {
              lineStyle: { color: "rgb(150,150,150)" }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(44, 239, 255,0.3)"
              }
            }
          }
        ],
        series: [
          {
            name: "通话次数",
            type: "bar",
            barWidth: "60%",
            data: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24
            ]
          }
        ],
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: "rgb(44, 239, 255)"
          }
        }
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  width 900px
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
