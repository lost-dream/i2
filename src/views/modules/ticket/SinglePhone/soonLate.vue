<template>
  <div class="container">

    <el-form :inline="true"
             :model="callForm"
             class="demo-form-inline">
      <el-form-item label="呼叫时间">
        <el-time-picker v-model="callForm.startTime"
                        placeholder="起始时间">
        </el-time-picker>
        <el-time-picker arrow-control
                        v-model="callForm.endTime"
                        placeholder="结束时间">
        </el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="baseStation">基站查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="soonLate"
              border
              style="width: 100%">
      <el-table-column label="序号"
                       type="index"
                       align="center"
                       width="50">
      </el-table-column>
      <el-table-column prop="date"
                       label="日期"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="soonTime"
                       align="center"
                       label="最早时间">
      </el-table-column>
      <el-table-column prop="soonPhone"
                       align="center"
                       width="120"
                       label="最早对方号码">
      </el-table-column>
      <el-table-column prop="soonLocation"
                       align="center"
                       label="最早归属地">
      </el-table-column>
      <el-table-column prop="soonBaseStation"
                       align="center"
                       label="最早基站">
      </el-table-column>
      <el-table-column prop="lateTime"
                       align="center"
                       label="最晚时间">
      </el-table-column>
      <el-table-column prop="latePhone"
                       align="center"
                       width="120"
                       label="最晚对方号码">
      </el-table-column>
      <el-table-column prop="lateLocation"
                       align="center"
                       label="最晚归属地">
      </el-table-column>
      <el-table-column prop="lateBaseStation"
                       align="center"
                       label="最晚基站">
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
      callForm: {
        startTime: '',
        endTime: ''
      },
      soonLate: [
        {
          date: '2019-07-21',
          soonTime: '03:11:11',
          soonPhone: '13111111111',
          soonLocation: '成都',
          soonBaseStation: '成都青羊',
          lateTime: '12:11:11',
          latePhone: '15111111111',
          lateLocation: '自贡',
          lateBaseStation: '自贡郊区'
        }
      ]
    };
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    baseStation () {

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
