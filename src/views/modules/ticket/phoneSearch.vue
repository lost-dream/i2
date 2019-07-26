<template>
  <div class="container">
    <div class="bg">
      <div class="title">
        <h3>话单查询</h3>
      </div>
      <div class="phoneSearch">
        <el-form :inline="true"
                 :model="phoneForm"
                 ref="phoneForm"
                 class="phoneSearch">
          <el-form-item label="机主姓名">
            <el-input v-model="phoneForm.name"
                      placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="phoneForm.phone"
                      placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger"
                       @click="resetForm('phoneForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="searchList">
        <el-table :data="phoneData"
                  height="250"
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           width="50"
                           align="center"
                           label="序号">
          </el-table-column>
          <el-table-column prop="name"
                           align="center"
                           label="机主姓名"
                           width="100">
          </el-table-column>
          <el-table-column prop="phone"
                           align="center"
                           label="电话号码"
                           width="150">
          </el-table-column>
          <el-table-column prop="uploadTime"
                           align="center"
                           width="100"
                           label="上传时间">
          </el-table-column>
          <el-table-column prop="caseName"
                           align="center"
                           width="100"
                           label="案件名称">
          </el-table-column>
          <el-table-column prop="depict"
                           align="center"
                           label="描述">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="edit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini"
                         @click="addMore(scope.$index, scope.row)">追加</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="Delete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[5]"
                       :page-size="5"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="400">
        </el-pagination>
      </div>
      <div class="title1">
        <h3>通话查询</h3>
      </div>
      <div class="converseSearch">
        <el-form :inline="true"
                 :model="converseForm"
                 ref="converseForm"
                 class="converseSearch">
          <el-form-item>
            <el-time-picker placeholder="起始时间"
                            v-model="converseForm.startTime">
            </el-time-picker>
            <el-time-picker placeholder="结束时间"
                            v-model="converseForm.endTime">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="converseForm.phone"
                      placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="通话时长">
            <el-input v-model="converseForm.callTime"
                      placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit1">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="searchList">
        <el-table :data="converseData"
                  height="250"
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="50">
          </el-table-column>
          <el-table-column prop="otherPartyPhone"
                           label="对方号码"
                           align="center"
                           width="120">
          </el-table-column>
          <el-table-column prop="communicationMode"
                           label="主被叫类型"
                           align="center"
                           width="100">
          </el-table-column>
          <el-table-column prop="beginTime"
                           align="center"
                           label="通话时间">
          </el-table-column>
          <el-table-column prop="communicationTime"
                           align="center"
                           label="通话时长">
          </el-table-column>
          <el-table-column prop="location"
                           align="center"
                           label="通信地点">
          </el-table-column>
          <el-table-column prop="baseStationLocation"
                           align="center"
                           label="基站地址">
          </el-table-column>
          <el-table-column prop="baseStationCode"
                           align="center"
                           label="基站号"
                           width="80">
          </el-table-column>
          <el-table-column prop="housingEstateCode"
                           align="center"
                           label="小区号"
                           width="80">
          </el-table-column>
          <el-table-column prop="IMEI"
                           align="center"
                           label="IMEI">
          </el-table-column>
          <el-table-column prop="IMSI"
                           align="center"
                           label="IMSI">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      phoneForm: {
        phone: '',
        name: ''
      },
      converseForm: {
        phone: '',
        callTime: ''
      },
      currentPage: 1,
      phoneData: [
        {
          name: '小谢',
          phone: '13111111111',
          uploadTime: '2019-7-21',
          caseName: '赚钱大事件',
          depict: '小谢发现海贼王ONE PRICE'
        }
      ],
      converseData: [
        {
          otherPartyPhone: '13111111111',
          communicationMode: '主叫',
          beginTime: '2019-07-12 16:42:12',
          communicationTime: '1时2分54秒',
          location: '成都',
          baseStationLocation: '成都青羊区',
          baseStationCode: '73C5',
          housingEstateCode: '528E',
          IMEI: '868276009004130',
          IMSI: '460028865883591'
        }]
    };
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    onSubmit1 () {
      console.log('submit!');
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    Delete (index, row) {
      console.log(index, row);
    },
    edit (index, row) {
      console.log(index, row);
    },
    addMore (index, row) {
      console.log(index, row);
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
  width 1200px
  margin 0 auto
  padding 20px
  background-color rgba(44, 239, 255, 0.1)
.bg
  background-color rgba(44, 239, 255, 0.1)
  padding 40px
.container .title
  position absolute
  top -10px
  font-size 24px
  color white
.container .title1
  font-size 24px
  color white
</style>
<style lang="stylus">
.phoneSearch .el-form-item__label
  color white
.phoneSearch .el-input__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color white
.phoneSearch .el-textarea__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color white
.searchList .el-table
  background-color rgba(44, 239, 255, 0.3) !important
  color white
.searchList .el-table--border
  border 1px solid rgba(0, 0, 0, 0.3)
.searchList .el-table th, .el-table tr, .el-table--border td
  background-color transparent !important
  border 1px solid rgba(0, 0, 0, 0.3) !important
.searchList .el-table--border::after, .el-table--group::after
  width 0px
.searchList .el-table::before
  height 0px
.searchList .el-table thead
  color white
.searchList .el-table tbody tr:hover>td
  background-color rgba(44, 239, 255, 0.4)
.searchList .el-pagination__total
  color white
.searchList .el-input__inner
  background-color rgba(44, 239, 255, 0.3)
  color white
.searchList .el-dialog, .el-pager li
  background-color rgba(44, 239, 255, 0.3) !important
.searchList .el-pager li.active
  color white
.searchList .el-pagination .btn-next, .el-pagination .btn-prev
  background-color rgba(44, 239, 255, 0.3) !important
.searchList .el-pagination__jump
  color white
.converseSearch .el-form-item__label
  color white
.converseSearch .el-input__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color white
.converseSearch .el-textarea__inner
  background-color rgba(44, 239, 255, 0.3) !important
  border 1px solid rgba(44, 239, 255, 0.4) !important
  color white
</style>
