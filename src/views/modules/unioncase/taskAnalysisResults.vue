<template>
  <div class="taskAnalysisResultsCoat">
    <div class="taskAnalysisResults">
      <div class="analyzeInfo">
        <div v-if="taskInfo.type === 0">
          <div class="infoTop">
            <span style="color: #ffffff;line-height: 30px"
              >共{{ pagination.total }}条记录</span
            >
            <div
              style="float: right;
          padding: 5px 18px;
          margin: 0 3px;
          color: #fff;
          background-color: rgba(44,239,255,0.3);
          border-radius: 2px;"
              @click="exportData()"
            >
              导出
            </div>
          </div>
          <div class="fgx"></div>
          <div class="infoList">
            <div class="list" v-for="(item, index) in infoData" :key="index">
              <div class="content">
                <p>
                  <span>证件号码:</span>&nbsp;<span>{{ item.card }}</span>
                </p>
                <p>
                  <span>出现次数:</span>&nbsp;<span>{{ item.coun }}</span>
                </p>
                <p>
                  <span>编号:</span>&nbsp;<span>{{ item.code }}</span>
                </p>
              </div>
              <div class="fgx"></div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="infoTop">
            <span style="color: #ffffff;line-height: 30px"
              >当前选择区域共{{ pagination.total }}条记录</span
            >
            <div
              style="float: right;
          padding: 5px 18px;
          margin: 0 3px;
          color: #fff;
          background-color: rgba(44,239,255,0.3);
          border-radius: 2px;"
              @click="exportData()"
            >
              导出
            </div>
          </div>
          <div class="fgx"></div>
          <div class="infoList">
            <div class="list" v-for="(item, index) in infoData" :key="index">
              <div class="content">
                <p>
                  <span>案件:</span>&nbsp;<span>{{ item.caseNo }}</span>
                </p>
                <p>
                  <span>案件名称:</span>&nbsp;<span>{{ item.name }}</span>
                </p>
                <p>
                  <span>报案时间:</span>&nbsp;<span>{{ item.reportTime }}</span>
                </p>
              </div>
              <div class="fgx"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="position">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page"
          :pager-count="pagination.pagerCount"
          :page-size="pagination.size"
          layout="prev,pager,next,jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="conditionalPara">
      <div class="rightPanel">
        <div class="">
          <h4>条件参数</h4>
        </div>
        <div class="task">
          <h4>任务名称</h4>
          <div style="line-height: 30px;padding: 10px;">
            <span>任务名称：{{ taskInfo.taskName }}</span
            ><br />
            <span>方式：{{ taskInfo.type === 0 ? '查人' : '查案' }}</span>
          </div>
        </div>
        <div class="condition">
          <h4>条件参数</h4>
          <div v-for="(item, index) in taskInfo.conditions" :key="index">
            <div
              v-if="index === taskInfoSshow"
              class="conditionItem"
              style="border:1px solid white;margin-top:30px;padding:30px 0 10px 0;border-radius:5px;padding-right: 10px;"
            >
              <p>活动时间段</p>
              <div class="inputStyle">
                <p>起</p>
                <el-date-picker
                  v-model="item.date1"
                  :disabled="true"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <div class="inputStyle">
                <p>止</p>
                <el-date-picker
                  v-model="item.date2"
                  :disabled="true"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <div class="inputStyle">
                <p>范围</p>
                <el-input
                  style="margin-left:10px;width:87%;"
                  :disabled="true"
                  v-model="item.range"
                ></el-input>
              </div>
            </div>
            <div
              v-else
              @click="taskInfoSshow = index"
              style="border:1px solid white;padding:5px 10px;border-radius:5px;margin-top: 10px"
            >
              条件参数{{ index + 1 }}
            </div>
          </div>
        </div>
        <div class="resource" v-show="taskInfo.type === 0">
          <div
            style="display:flex;align-items:center;border-bottom:1px dashed white;margin-top:30px"
          >
            <h4 style="margin-right:20px;border:none;margin-top:0">资源参数</h4>
          </div>
          <p>出生时间段</p>
          <div class="inputStyle">
            <p>起</p>
            <el-date-picker
              v-model="taskInfo.date3"
              :disabled="true"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="inputStyle">
            <p>止</p>
            <el-date-picker
              v-model="taskInfo.date4"
              :disabled="true"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <el-checkbox-group
            v-model="taskInfo.checkedBox"
            :disabled="true"
            :min="1"
            :max="2"
          >
            <el-checkbox
              v-for="(item, index) in boxs"
              :label="item.label"
              :key="index"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskAnalysisResults',
  props: ['id'],
  data() {
    return {
      pagination: {
        page: 1,
        size: 5,
        pagerCount: 5,
        total: 100,
      },
      taskInfoSshow: 0,
      taskInfo: {
        caseNo: '',
        createId: '',
        createName: '',
        pointLatitude: '',
        pointLongitude: '',
        taskType: 0,
        taskName: '',
        conditions: [
          {
            date1: '',
            date2: '',
            range: 0,
          },
        ],
        date3: '',
        date4: '',
        type: 0,
        taskId: 0,
        taskTarget: '',
        checkedBox: [1],
      },
      boxs: [
        { name: '旅馆', label: 1 },
        { name: '网吧', label: 2 },
      ],
      infoData: [],
      infoData2: [
        {
          a: 'A1324679846546464654',
          b: '青羊工业园偷盗',
          c: '2019-07-07  14：30：00',
        },
        {
          a: 'A1324679846546464654',
          b: '青羊工业园偷盗',
          c: '2019-07-07  14：30：00',
        },
        {
          a: 'A1324679846546464654',
          b: '青羊工业园偷盗',
          c: '2019-07-07  14：30：00',
        },
      ],
    }
  },
  mounted() {
    this.showData()
  },
  methods: {
    showData() {
      let _this = this
      let obj = {
        id: this.id,
        page: this.pagination.page,
        pageSize: this.pagination.size,
      }
      this.$api.analyzeTaskResult(obj).then(({ data }) => {
        if (data.msg === '成功') {
          console.log(data)
          _this.infoData = data.data.pageInfo.list
          _this.pagination.total = data.data.pageInfo.total
          _this.pagination.pageNum = data.data.pageInfo.pageNum
          let taskInfo = data.data.list
          let data2 = []
          let obj = {}
          taskInfo.forEach(item => {
            obj = {
              date3: item.birthdayBegin,
              date4: item.birthdayEnd,
              caseNo: item.caseNo,
              createId: item.createId,
              createName: item.createName,
              taskName: item.name,
              pointLatitude: item.pointLatitude,
              pointLongitude: item.pointLongitude,
              taskId: item.taskId,
              taskTarget: item.taskTarget,
              taskType: item.taskType,
              type: item.type,
              checkedBox:
                item.typeBgWb === 0 ? [1, 2] : item.typeBgWb === 1 ? [1] : [2],
            }
            let obj2 = {
              date1: item.activeTimeBegin,
              date2: item.activeTimeEnd,
              range: item.radius,
            }
            data2.push(obj2)
          })
          obj.conditions = data2
          _this.taskInfo = obj
          console.log(obj)
          _this.$message({
            message: '获取详情列表成功!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '获取详情列表失败!',
            type: 'error',
          })
        }
      })
    },
    // 导出
    exportData() {},
    handleSizeChange(val) {
      this.pagination.size = val
      /* var newArr = this.idList.map(function (item) {
          return item
        }).join(',')
        this.test(this.page, this.size, this.nm, this.orderBy, this.type, this.state, newArr); */
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.showData()
      /* var newArr = this.idList.map(function (item) {
           return item
         }).join(',')
         this.test(this.page, this.size, this.nm, this.orderBy, this.type, this.state, newArr); */
    },
  },
}
</script>

<style lang="stylus" scoped>
.taskAnalysisResultsCoat
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden z-index -1
  width 100%
  height 100%
  content ''
  background url('~@/assets/img/i2bg.png') no-repeat center
  background-size cover

.taskAnalysisResults
  display: inline-block;
  vertical-align: top
  margin-left 160px;
  background-color: rgba(25, 97, 97, 0.9);
  width 30%

.taskAnalysisResults .fgx
  width 95%
  margin 10px auto
  border-bottom 2px solid rgba(44, 239, 255, 0.4)

.taskAnalysisResults .infoTop
  padding 20px
  font-size: 14px;

.taskAnalysisResults .infoList .fgx
  width 100%

.taskAnalysisResults .infoList .list
  margin 0 auto
  padding 0 20px
  color #ffffff

.taskAnalysisResults .position
  margin 0 auto !important
  padding 20px 0px !important
.conditionalPara
  display: inline-block;
  float right
  vertical-align: top
  width 295px
.rightPanel
  background-color: rgba(44,239,255,0.5);
  padding 20px
  font-size 14px
  color white
.rightPanel .buttonNav
  display flex
  align-items center
.rightPanel .buttonNav>div
  display flex
  align-items center
>>>.fun-sidebar .sidebar-inner
  width 295px
  height 100%
.buttonNav .el-button
  padding 5px
.resourceBtn .el-button
  padding 5px
.conditionItem p
  margin-left 10px
>>>.el-date-editor.el-input
  margin-left 10px
>>>.el-checkbox-group
  display flex
  justify-content center
  align-items center
  height 50px
>>>h4
  margin 0
  margin-top 20px
  padding-bottom 10px
  border-bottom 1px dashed white
.inputStyle
  display flex
.inputStyle p
  margin-right 20px
  width 30px
  flex 0 0 auto
</style>
<style lang="stylus"></style>
