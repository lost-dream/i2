<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="callForm"
      ref="callForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间" prop="time">
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
      <el-form-item prop="callTimes">
        <el-input
          v-model="callForm.callTimes"
          placeholder="通话频次"
        ></el-input>
      </el-form-item>
      <el-form-item prop="communicationTime">
        <el-input
          v-model="callForm.communicationTime"
          placeholder="通话时长"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="resetForm('callForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="callAnalyse" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column
        prop="otherPartyPhone"
        label="对方号码"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="callTimes"
        label="通话频次"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="communicationTime"
        label="通话时长"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column label="详情" align="center" width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="check(scope.$index, scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <flyDialog :show.sync="show" :width="width">
      <el-table :data="analyseTable" border style="width: 100%">
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
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="communicationMode"
          label="呼叫类型"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="通话时间"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="communicationTime"
          label="通话时长"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="baseStationLocation"
          label="基站地址"
          align="center"
          width="100"
        >
        </el-table-column>
      </el-table>
    </flyDialog>
  </div>
</template>

<script>
import flyDialog from "../../../../components/fly-dialog";
export default {
  components: {
    flyDialog
  },
  mounted() {},
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
        time: "",
        communicationTime: "",
        callTimes: ""
      },
      callAnalyse: [
        {
          communicationTime: ""
        }
      ],
      show: false,
      width: "1200px",
      analyseTable: [
        {
          index: "",
          otherPartyPhone: "13111111111",
          communicationMode: "被叫",
          beginTime: "2016-07-23 00:01:02",
          communicationTime: "14",
          baseStationLocation: "成都"
        }
      ]
    };
  },
  methods: {
    onSubmit() {},
    baseStation() {},
    check() {
      this.show = true;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  width 1100px
  margin 0 auto
  padding 0px
</style>
<style lang="stylus">
.container
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
 .el-table__body, .el-table__footer, .el-table__header
   width 100% !important
 .el-range-editor .el-range-input
   background transparent !important
   color white !important
 .el-date-editor .el-range-separator
   color white !important
</style>
