<template>
  <div class="container">

    <el-form :inline="true"
             :model="callForm"
             ref="callForm"
             class="demo-form-inline">
      <el-form-item label="呼叫时间"
                    prop="startTime">
        <el-time-picker v-model="callForm.startTime"
                        placeholder="起始时间">
        </el-time-picker>
      </el-form-item>
      <el-form-item prop="endTime">
        <el-time-picker v-model="callForm.endTime"
                        placeholder="结束时间">
        </el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="addTime">添加</el-button>
      </el-form-item>
      <input-tag v-model="callForm.timeList"></input-tag>
      <el-form-item>
        <el-button type="primary"
                   @click="searchData">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger"
                   @click="resetForm('callForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="differentPeriod"
              border
              style="width: 100%">
      <el-table-column label="序号"
                       type="index"
                       width="100"
                       align="center"></el-table-column>
      <template v-for="(item,index) in tableData">
        <el-table-column :prop="item.propName"
                         :label="item.label"
                         :key="index"
                         align="center"
                         :width="item.width"></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      arr: [],
      callForm: {
        startTime: '',
        endTime: '',
        timeList: []
      },
      differentPeriod: [
        {
          otherPartyPhone: '',
          periorTimes: '',
          location: ''
        }
      ],
      tableData: [
        { propName: 'otherPartyPhone', label: '对方号码', fixed: true, width: '120' },
        { propName: 'periorTimes', label: '几个时段', fixed: true, width: '80' },
        { propName: 'location', label: '号码属地', fixed: true, width: '100' }
      ]
    };
  },
  methods: {
    searchData () {
      this.tableDataHandle();
    },
    addTime () {
      if (this.callForm.startTime && this.callForm.endTime) {
        let obj = { startTime: this.callForm.startTime.toString().slice(11, 24), endTime: this.callForm.endTime.toString().slice(11, 24) }
        this.arr.push(obj);
        this.callForm.timeList = this.arr.map(function (item) {
          return `${item.startTime}` + '至' + `${item.endTime}` + ','
        })
      } else {
        !this.callForm.startTime ? this.message('开始时间未选择', 'warning') : this.message('结束时间未选择', 'warning')
      }
    },
    message (message, type) {
      this.$message({
        message: `${message}`,
        type: `${type}`
      });
    },
    tableDataHandle () {
      this.tableDataReset();
      this.tableData = this.tableData.concat(this.arr.map(function (item, index) { return { propName: `perior+${item.index}`, label: `${item.startTime + '至' + item.endTime}`, width: '180' } }))
    },
    tableDataReset () {
      this.tableData = this.tableData.slice(0, 3);
    },
    arrReset () {
      this.arr = [];
      this.callForm.timeList = [];
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.tableDataReset();
      this.arrReset();
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
  color white !important
.el-table--border
  border 1px solid rgba(0, 0, 0, 0.3) !important
.el-table th, .el-table tr, .el-table--border td
  background-color transparent !important
  border 1px solid rgba(0, 0, 0, 0.3) !important
.el-table--border::after, .el-table--group::after
  width 0px !important
.el-table::before
  height 0px !important
.el-button--primary
  color #FFF !important
  background-color rgba(130, 200, 75, 0.5) !important
  border-color rgba(130, 200, 75, 0.5) !important
  border-radius 2px !important
.el-button--danger
  color #FFF !important
  background-color rgba(223, 108, 97, 0.5) !important
  border-color rgba(223, 108, 97, 0.5) !important
  border-radius 2px !important
.el-textarea__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color #fff !important
.el-table tbody tr:hover>td
  background-color rgba(44, 239, 255, 0.3) !important
</style>
