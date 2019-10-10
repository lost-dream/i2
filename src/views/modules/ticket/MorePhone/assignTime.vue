<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="assignForm"
      ref="assignForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间" prop="time">
        <el-date-picker
          v-model="assignForm.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="event">
        <el-select v-model="assignForm.event" placeholder="选择分析项目">
          <el-option
            v-for="item in events"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="resetForm('assignForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="assign" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column
        prop="housingEstateCode"
        label="对方号码"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="phoneTimes"
        align="center"
        width="100"
        label="几个话单出现"
      >
      </el-table-column>
      <el-table-column
        prop="baseStationLocation"
        align="center"
        width="120"
        label="号码属地"
      >
      </el-table-column>
      <template v-for="(item, index) in tableHead">
        <el-table-column
          :prop="item.propName"
          :label="item.label"
          :key="index"
          align="center"
          :width="item.width"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {},
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
      assignForm: {
        time: '',
        event: '',
      },
      events: [
        {
          value: '1',
          label: '指定时间段内没有出现，其他时间段出现对方号码',
        },
        {
          value: '2',
          label: '指定时间段内出现，其他时间段内没有出现对方号码',
        },
      ],
      assign: [
        {
          baseStationLocation: '',
          phoneTimes: '',
          housingEstateCode: '',
        },
      ],
      tableHead: [
        {
          propName: 'phoneNum',
          label: '13111111111',
          fixed: true,
          width: '200',
        },
        {
          propName: 'phoneNum',
          label: '15111111111',
          fixed: true,
          width: '200',
        },
      ],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    baseStation() {},
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
  },
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
