<template>
  <div class="container">

    <el-form :inline="true"
             :model="callForm"
             id="out-table"
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
      <el-form-item>
        <el-button type="primary"
                   @click="exportExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="continueTable"
              border
              :cell-style="cellStyle"
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
      <el-table-column prop="sunD"
                       label="星期天"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="monD"
                       label="星期一"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="tuesD"
                       label="星期二"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="wesD"
                       label="星期三"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="thurD"
                       label="星期四"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="friD"
                       label="星期五"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="satD"
                       label="星期六"
                       align="center"
                       width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted () {
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
      continueTable: [
        {
          index: '',
          otherPartyPhone: '13111111111',
          sunD: '1',
          monD: '2',
          tuesD: '3',
          wesD: '4',
          thurD: '5',
          friD: '0',
          satD: '13'
        }
      ]
    };
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    exportExcel () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../../../utils/Export2Excel');
        const tHeader = ['序号', '对方号码', '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const filterVal = ['index', 'otherPartyPhone', 'sunD', 'monD', 'tuesD', 'wesD', 'thurD', 'friD', 'satD'];
        const list = this.continueTable;
        const data = this.formatJson(filterVal, list);
        exportJsonToExcel(tHeader, data, '列表excel');
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    timeChange (time) {
      var newTime = time.map(function (item) {
        var d = new Date(item);
        var newItem = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return newItem
      })
      return newTime
    },
    cellStyle (row) {
      if (row.columnIndex >= 2) {
        console.log(row)
      }
    }
  }
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
.el-table tbody tr:hover>td
  background-color rgba(44, 239, 255, 0.4) !important
.el-pagination__total
  color white
</style>
