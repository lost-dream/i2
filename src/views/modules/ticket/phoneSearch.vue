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
                       @click="isQuery">查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger"
                       @click="resetForm('phoneForm')">重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="searchList"
           v-loading="flag"
           element-loading-text="拼命加载中"
           element-loading-background="rgba(0, 0, 0, 0)">>
        <el-table :data="phoneDataPage"
                  height="321"
                  @row-click='rowClick'
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
            <template slot-scope="scope">
              <span>{{scope.row.uploadTime | formatDate}}</span>
            </template>
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
                         @click="edit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="mini"
                         @click="addMore(scope.$index, scope.row)">追加
              </el-button>
              <el-button size="mini"
                         type="danger"
                         @click="Delete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page.currentPage"
                       :page-sizes="[5]"
                       :page-size="page.size"
                       :total="page.total"
                       layout="total, prev, pager, next, jumper"
        >
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
            <el-date-picker v-model="converseForm.time"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="converseForm.phone"
                      placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="通话时长">
            <el-input v-model="converseForm.callTime"
                      placeholder="通话时长"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="callQuery">查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="searchList">
        <el-table :data="converseData2"
                  height="250"
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="50">
          </el-table-column>
          <el-table-column prop="partyPhone"
                           label="对方号码"
                           align="center"
                           width="120">
          </el-table-column>
          <el-table-column prop="mode"
                           label="主被叫类型"
                           align="center"
                           width="100">
          </el-table-column>
          <el-table-column prop="timeChange"
                           align="center"
                           label="通话时间">
            <template slot-scope="scope">
              <span>{{scope.row.beginTime | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="datetime"
                           align="center"
                           label="通话时长">
          </el-table-column>
          <el-table-column prop="location"
                           align="center"
                           label="通信地点">
          </el-table-column>
          <el-table-column prop="baseLocation"
                           align="center"
                           label="基站地址">
          </el-table-column>
          <el-table-column prop="stationCode"
                           align="center"
                           label="基站号"
                           width="80">
          </el-table-column>
          <el-table-column prop="housingCode"
                           align="center"
                           label="小区号"
                           width="80">
          </el-table-column>
          <el-table-column prop="imei"
                           align="center"
                           label="IMEI">
          </el-table-column>
          <el-table-column prop="imsi"
                           align="center"
                           label="IMSI">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../../utils/dateFormat.js'

  export default {

    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm ');
      }
    },
    data() {
      return {
        flag: true,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        page: {
          currentPage: 1,
          size: 5,
          total: 10
        },
        phoneForm: {
          phone: '',
          name: ''
        },
        converseForm: {
          id: 0,
          phone: '',
          callTime: '',
          time: null
        },

        phoneData: [
          {
            name: '小谢',
            phone: '13111111111',
            uploadTime: '2019-7-21',
            caseName: '赚钱大事件',
            depict: '小谢发现海贼王ONE PRICE'
          }
        ],
        phoneData2: [
          {
            name: '小谢',
            phone: '13111111111',
            uploadTime: '2019-7-21',
            caseName: '赚钱大事件',
            depict: '小谢发现海贼王ONE PRICE'
          }
        ],
        converseData: [],
        converseData2: [],
      };
    },
    computed: {
      phoneDataPage() {
        let startKey = this.page.size * (this.page.currentPage - 1)
        let endKey = startKey + this.page.size
        console.log("startKey")
        console.log(startKey)
        console.log(endKey)
        console.log(this.phoneData2)
        let PageData = this.phoneData2.slice(startKey, endKey)
        console.log(PageData)
        console.log(this.phoneData2)
        console.log("phoneData2")
        // recordId
        this.converseForm.id = PageData[0].recordId
        return PageData;
      }
    },
    mounted() {
      this.onSubmit()
    },
    methods: {
      // 通话查询ID添加
      rowClick(row) {
        this.converseForm.id = row.recordId
        this.onSubmit1()
      },

      // 话单列表
      onSubmit() {
        var _this = this
        let obj = {
          name: this.phoneForm.name,
          phone: this.phoneForm.phone
        }
        console.log('获取话单!');
        this.$api.ticketQuery(obj).then(({data}) => {
          console.log(data);
          if (data.success) {
            let phoneDataArr = []
            let phoneDataInfo = {}
            data.result.tickBackList.forEach((item) => {
              phoneDataInfo = {
                name: item.ticketRelevanceDTO.phoneOwner,
                phone: item.ticketRelevanceDTO.phoneNumber,
                uploadTime: item.ticketDTO.createTime,
                caseName: item.ticketDTO.caseName,
                depict: item.ticketDTO.description,
                recordId: item.ticketRelevanceDTO.recordId,
                id: item.ticketRelevanceDTO.id,
              }
              phoneDataArr.push(phoneDataInfo)
            })
            console.log(phoneDataArr)
            console.log(phoneDataArr.length)
            _this.phoneData = phoneDataArr
            _this.isQuery()
            _this.onSubmit1()
            // _this.converseData = data.result.ticketDetailsDTOList
            // _this.converseData = data.result.ticketDetailsDTOList
            _this.$message({
              message: '获取话单成功!',
              type: 'success'
            })
          } else {
            this.$message({
              message: '获取话单失败!',
              type: 'error'
            })
          }
        })
      },

      // 查询
      isQuery() {
        var _name = this.phoneForm.name
        var _phone = this.phoneForm.phone
        var _phoneData = []
        this.page.currentPage = 1
        if (_name == '' && _phone == '') {
          _phoneData = this.phoneData
        }
        else if (_name != '' && _phone != '') {
          this.phoneData.forEach((item) => {
            item.name.indexOf(_name) >= 0 && item.phone == _phone && _phoneData.push(item)
          })
        }
        else {
          _name != '' && this.phoneData.forEach((item) => {
            item.name.indexOf(_name) >= 0 && _phoneData.push(item)
          })
          _phone != '' && this.phoneData.forEach((item) => {
            item.phone == _phone && _phoneData.push(item)
          })
        }
        console.log(_phoneData)
        console.log("shij")
        this.phoneData2 = _phoneData
        this.page.total = _phoneData.length
        this.flag = false
      },

      // 通话查询数据
      onSubmit1() {
        var _this = this
        // console.log(this.timeChange(this.converseForm.time));
        console.log(this.converseForm.time);
        /*      console.log(this.timeChange(this.converseForm.time))
              console.log(this.timeChange(this.converseForm.time)[1])
              console.log(this.timeChange(this.converseForm.time)[0])*/
        console.log(this.converseForm.phone);
        console.log(this.converseForm.callTime);
        console.log('submit!');
        let obj = {
          id: this.converseForm.id,
          /* duration: this.converseForm.callTime,
           // overTime: this.timeChange(this.converseForm.time)[1],
           overTime: this.converseForm.time[1],
           phone: this.converseForm.phone,
           time: this.converseForm.time[0]
           // time: this.timeChange(this.converseForm.time)[0]*/
        }
        this.$api.ticketCallQuery(obj).then(({data}) => {
          _this.converseData = data.result.ticketDetailsDTOList
          _this.callQuery()
        })
      },

      // 通话查询
      callQuery() {
        let data = this.converseData
        this.converseData2 = data
        let conData = this.converseForm
        /*let callFilter=(condition,data)=>{
          return data.filter( item => {
            return Object.keys( condition ).every( key => {
              return String( item[ key ] ).toLowerCase().includes(
                String( condition[ key ] ).trim().toLowerCase() )
            } )
          } )
        }*/
        let condition = {}
        console.log("通话查询")
        console.log(conData)
        console.log(conData.time == null)
        conData.time != null && (this.timeSizer())
        conData.phone != '' && (condition.partyPhone = conData.phone, this.converseData2 = this.$api.callFilter(condition, this.converseData2))
        conData.callTime != '' && (this.callTimeSizer())
        console.log(this.converseData)
        console.log(this.converseData2)
      },

      // 时长筛选
      callTimeSizer() {
        let data = this.converseData2
        let callTime = this.converseForm.callTime
        let dataArr = []
        data.forEach((item) => {
          this.timeToSec(callTime)<=this.timeToSec(item.datetime) && dataArr.push(item)
        })
        this.converseData2 = dataArr
      },

      // 时间转为毫秒
      timeToSec(time) {
        time.replace(/分钟/g, "分")
        time.replace(/小时/g, "时")
        let hourIn,minIn,secIn
        time.indexOf('时') == -1 ? hourIn = 0 : hourIn = time.indexOf('时')
        time.indexOf('分') == -1 ? minIn = 0 : minIn = time.indexOf('分')
        time.indexOf('秒') == -1 ? secIn = 0 : secIn = time.indexOf('秒')
        let hour = 0,min = 0,sec = 0
        hourIn == 0 && minIn == 0 && secIn == 0 && (min = time)
        hourIn != 0 && (hour = time.substring(0, hourIn))
        minIn != 0 && (min = time.substring(hourIn==0?0:hourIn+1, minIn))
        secIn != 0 && (sec = time.substring(minIn==0?0:minIn+1, secIn))
        var s = Number(hour * 3600) + Number(min * 60) + Number(sec)
        return s * 1000
      },

      // 时间筛选
      timeSizer() {
        let data = this.converseData2
        let time = this.converseForm.time
        let dataArr = []
        data.forEach((item) => {
          this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
        })
        this.converseData2 = dataArr
      },
      /**
       * 判断是否在时间段内
       * converseTime 要判断的时间 stime 开始时间 etime 结束时间
       */
      compareTime(changeTime, stime, etime) {
        changeTime = formatDate(new Date(changeTime), 'yyyy-MM-dd')
        stime = formatDate(new Date(stime), 'yyyy-MM-dd')
        etime = formatDate(new Date(etime), 'yyyy-MM-dd')

        // 转换时间格式，并转换为时间戳
        function tranDate(time) {
          return new Date(time.replace(/-/g, '/')).getTime();
        }

        // 开始时间
        let startTime = tranDate(stime);
        // 结束时间
        let endTime = tranDate(etime);
        let nowTime = tranDate(changeTime);
        console.log(startTime)
        console.log(endTime)
        console.log(nowTime)
        // 如果当前时间处于时间段内，返回true，否则返回false
        if (nowTime < startTime || nowTime > endTime) {
          return false;
        }
        return true;
      },

      // 时间格式
      timeChange(time) {
        var newTime = time.map(function (item) {
          var d = new Date(item);
          var newItem = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
          return newItem
        })
        return newTime
      },

      // 重置
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.phoneForm = {
          phone: '',
          name: ''
        }
        this.isQuery()
      },
      // 话单删除
      Delete(index, row) {
        var _this = this
        console.log(index);
        console.log(row);
        let obj = {
          phoneId: row.id
        }
        this.$api.ticketDelete(obj).then(({data}) => {
          _this.$message({
            message: '话单删除成功!',
            type: 'success'
          })
          _this.onSubmit()
          console.log(data);
        })
      },
      // 话单编辑
      edit(index, row) {
        console.log(index, row);
        this.$router.push(
          {
            name: 'newPhone',
            query: {
              phoneDataList: JSON.stringify(row),
              oper: '编辑话单'
            }
          }
        )

      },
      // 话单追加
      addMore(index, row) {
        console.log(index, row);
        this.$router.push(
          {
            name: 'newPhone',
            query: {
              phoneDataList: JSON.stringify(row),
              oper: '追加话单'
            }
          }
        )
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.currentPage = val
        console.log(this.page.currentPage);
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

  .searchList .el-table tbody tr:hover > td
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

  .converseSearch .el-range-editor .el-range-input
    background transparent
    color white

  .converseSearch .el-date-editor .el-range-separator
    color white
</style>
