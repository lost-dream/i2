<template>
  <div class="container">
    <div class="search-box">
      <el-form :inline="true" :model="phoneSearchForm" class="demo-form-inline">
        <el-form-item label="电话号码">
          <el-input v-model="phoneSearchForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="phoneSearch" border style="width: 100%">
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column
        prop="phoneOwner"
        label="机主姓名"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="phoneNumber" align="center" label="机主电话号码">
      </el-table-column>
      <el-table-column prop="phoneNumber" align="center" label="机主证件号码">
      </el-table-column>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="detail(scope.row)"
            >查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <flyDialog :show.sync="show" :width="width">
      <el-table :data="detailTable" border style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          prop="index"
          width="50"
        >
        </el-table-column>
        <el-table-column prop="manName" label="机主姓名" align="center">
          <template>
            <span>{{ this.masterInfo.phoneOwner }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNum" label="电话号码" align="center">
          <template>
            <span>{{ this.masterInfo.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="datetime" label="通话时长" align="center">
        </el-table-column>
        <el-table-column prop="beginTime" label="通话时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.beginTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="归属地" align="center">
        </el-table-column>
        <el-table-column prop="imei" label="基站信息" align="center">
        </el-table-column>
      </el-table>
    </flyDialog>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'
import flyDialog from '../../../../components/fly-dialog'

export default {
  components: {
    flyDialog,
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
  data() {
    return {
      show: false,
      width: '1200px',
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
      phoneSearchForm: {
        phoneNum: '',
      },
      phoneSearch: [
        {
          manName: '',
          manPhone: '',
          manCardNum: '',
        },
      ],
      masterInfo: {},
      detailTable: {
        manName: '',
        phoneNum: '',
        phoneTime: '',
        beginTime: '',
        baseLocation: '',
        IMEI: '',
      },

      allPhoneInfo: [],
    }
  },
  mounted() {
    // this.continueData = JSON.parse(sessionStorage.getItem('phoneInfo'))
    // this.imeisInfo = JSON.parse(localStorage.getItem('imeisInfo'))
    // this.dataSort2()
    this.onSubmit()
  },

  methods: {
    onSubmit() {
      let obj = {
        phone: this.phoneSearchForm.phoneNum,
      }
      this.$api.ticketNoteQuery(obj).then(({ data }) => {
        console.log(data)
        this.phoneSearch = data.result.o
      })
      console.log('submit!')
    },

    // 数据重组
    dataSort2() {
      this.phoneSearch = this.allPhoneInfo
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

    detail(data) {
      this.masterInfo.phoneOwner = data.phoneOwner
      this.masterInfo.phoneNumber = data.phoneNumber
      this.detailTable = data.mapsPhoneDetail
      console.log(data)
      this.show = true
    },
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1000px
  margin 0 auto
  padding 0
.search-box
  padding: 10px 0 10px 20px
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

.el-table tbody tr:hover > td
  background-color rgba(44, 239, 255, 0.4) !important

.el-pagination__total
  color white
</style>
