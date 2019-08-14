<template>
  <div class="container">

    <el-form :inline="true"
             :model="phoneSearchForm"
             class="demo-form-inline">
      <el-form-item label="IMEI">
        <el-input v-model="IMEI"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="phoneSearch"
              border
              style="width: 100%">
      <el-table-column label="序号"
                       type="index"
                       align="center"
                       width="50">
      </el-table-column>
      <el-table-column prop="manName"
                       label="机主姓名"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="manPhone"
                       align="center"
                       label="机主电话号码">
      </el-table-column>
      <el-table-column prop="manCardNum"
                       align="center"
                       width="120"
                       label="机主证件号码">
      </el-table-column>
      <el-table-column align="center"
                       label="操作">
        <template>
          <el-button type="primary"
                     @click="detail">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <flyDialog :show.sync='show'
               :width='width'>
      <el-table :data="detailTable"
                border
                style="width: 100%">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         prop="index"
                         width="50">
        </el-table-column>
        <el-table-column prop="manName"
                         label="机主姓名"
                         align="center"
                         width="100">
        </el-table-column>
        <el-table-column prop="phoneNum"
                         label="电话号码"
                         align="center"
                         width="100">
        </el-table-column>
        <el-table-column prop="phoneTime"
                         label="通话时长"
                         align="center"
                         width="100">
        </el-table-column>
        <el-table-column prop="beginTime"
                         label="通话时间"
                         align="center"
                         width="100">
        </el-table-column>
        <el-table-column prop="baseLocation"
                         label="归属地"
                         align="center"
                         width="100">
        </el-table-column>
        <el-table-column prop="IMEI"
                         label="基站信息"
                         align="center"
                         width="100">
        </el-table-column>
      </el-table>
    </flyDialog>
  </div>
</template>

<script>
import flyDialog from '../../../../components/fly-dialog'
export default {
  components: {
    flyDialog
  },
  mounted () {
  },
  data () {
    return {
      phoneNum: '',
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
      phoneSearchForm: {
        IMEI: ''
      },
      phoneSearch: [
        {
          manName: '',
          manPhone: '',
          manCardNum: ''
        }
      ],
      show: false,
      width: '1200px'
    };
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    baseStation () {

    },
    timeChange (time) {
      var newTime = time.map(function (item) {
        var d = new Date(item);
        var newItem = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return newItem
      })
      return newTime
    },
    detail () {
      this.show = true;
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
