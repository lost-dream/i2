<template>
  <div class="taskManageCoat">
    <div class="coat1">
      <div class="coat2">
        <div class="taskManage">
          <div class="criteria">
            <div class="form">
              <el-form :model="criteria" status-icon class="demo-ruleForm">
                <el-form-item>
                  <el-input
                    v-model="criteria.taskName"
                    placeholder="任务名（输入)"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select
                    v-model="criteria.status"
                    popper-class="fromselect"
                    placeholder="请选择状态"
                  >
                    <el-option
                      v-for="item in statusList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button class="seekBut" type="primary" @click="isSeek()"
                    >搜索</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div class="button">
              <el-button class="addBut" type="primary" @click="addTask()"
                >添加分析任务</el-button
              >
            </div>
          </div>
          <div class="title">
            <span class="el-icon-s-operation" style="font-size: 20px"></span
            >&nbsp;
            <span>串并离线任务列表</span>
          </div>
          <div class="info">
            <div class="taskTable">
              <el-table :data="taskData" style="width: 100%">
                <el-table-column prop="name" label="任务名称">
                </el-table-column>
                <el-table-column prop="type" label="任务类型">
                  <template slot-scope="scope">
                    <span>{{ scope.row.type == 0 ? '查人' : '查案' }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="执行状态">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.status == 0
                        ? '未开始'
                        : scope.row.status == 1
                        ? '执行中'
                        : '完成'
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="endTime" label="完成时间">
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick(scope.row)"
                      v-if="scope.row.status == 0 || scope.row.status == 1"
                      type="text"
                      size="small"
                      >分析</el-button
                    >
                    <el-button
                      type="text"
                      @click="editorTask(scope.row)"
                      v-if="scope.row.status == 0 || scope.row.status == 1"
                      size="small"
                      >编辑</el-button
                    >
                    <el-button
                      type="text"
                      @click="show(scope.row)"
                      v-else
                      size="small"
                      >查看</el-button
                    >
                    <el-button
                      type="text"
                      @click="deleteTask(scope.row)"
                      size="small"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="position">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.page"
                :page-size="pagination.size"
                :page-sizes="[10, 15, 20]"
                layout="total,sizes,  prev, pager,next,jumper"
                :total="pagination.total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'taskManage',
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      statusList: [
        {
          value: '',
          label: '全部',
        },
        {
          value: '0',
          label: '未开始',
        },
        {
          value: '1',
          label: '执行中',
        },
        {
          value: '2',
          label: '完成',
        },
      ],
      criteria: {
        taskName: '',
        status: '',
      },
      taskData: [
        {
          name: '123',
          taskType: '查人',
          status: '未开始',
          endDate: '2019-09-05 20:00:39',
          createDate: '2019-07-08 15:57:40',
        },
        {
          name: '123',
          taskType: '查人',
          status: '进行中',
          endDate: '2019-09-05 20:00:39',
          createDate: '2019-07-08 15:57:40',
        },
        {
          name: '123',
          taskType: '查人',
          status: '已完成',
          endDate: '2019-09-05 20:00:39',
          createDate: '2019-07-08 15:57:40',
        },
      ],
      userId: Cookies.get('userId'),
    }
  },
  mounted() {
    this.isSeek()
  },
  methods: {
    // 搜索
    isSeek() {
      let _this = this
      let obj = {
        userId: this.userId,
        page: this.pagination.page,
        pageSize: this.pagination.size,
        name: this.criteria.taskName,
        status: this.criteria.status,
      }
      this.$api.queryTaskManagementList(obj).then(({ data }) => {
        if (data.msg === '成功') {
          _this.taskData = data.data.list
          _this.pagination.total = data.data.total
          _this.$message({
            message: '获取列表成功!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '获取列表失败!',
            type: 'error',
          })
        }
      })
    },

    addTask() {
      this.$router.push({ name: 'unioncase' })
    },
    // 分析
    handleClick(row) {
      let _this = this
      let obj = {
        id: row.id,
        userId: this.userId,
      }
      this.$api.analyze(obj).then(({ data }) => {
        if (data.msg === '成功') {
          _this.isSeek()
          _this.$message({
            message: '分析成功!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '分析失败!',
            type: 'error',
          })
        }
      })
    },

    // 查看
    show(row) {
      this.$router.push({
        name: 'unioncase',
        params: {
          id: row.id,
          flag: true,
        },
      })
    },

    // 编辑前数据获取
    editorTask(row) {
      let _this = this
      let obj = {
        id: row.id,
      }
      this.$api.queryCompile(obj).then(({ data }) => {
        if (data.msg === '成功') {
          _this.$message({
            message: '获取编辑信息成功!',
            type: 'success',
          })
          this.$router.push({
            name: 'unioncase',
            params: {
              editorDdata: data.data,
              isEditor: true,
            },
          })
        } else {
          this.$message({
            message: '获取编辑信息失败!',
            type: 'error',
          })
        }
      })
    },

    // 删除
    deleteTask(row) {
      let _this = this
      let obj = {
        id: row.id,
      }
      this.$api.deleteTask(obj).then(({ data }) => {
        if (data.msg === '成功') {
          _this.isSeek()
          _this.$message({
            message: '删除成功!',
            type: 'success',
          })
        } else {
          this.$message({
            message: '删除失败!',
            type: 'error',
          })
        }
      })
    },

    handleSizeChange(val) {
      this.pagination.size = val
      /* var newArr = this.idList.map(function (item) {
          return item
        }).join(',')
        this.test(this.page, this.size, this.nm, this.orderBy, this.type, this.state, newArr); */
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      /* var newArr = this.idList.map(function (item) {
          return item
        }).join(',')
        this.test(this.page, this.size, this.nm, this.orderBy, this.type, this.state, newArr); */
    },
  },
}
</script>

<style lang="stylus" scoped>
.taskManageCoat
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

.taskManage .criteria
    display flex
    justify-content space-between
  .el-form-item
    /*width 180px*/
    display inline-block
    margin-right 8px
  .addBut
    margin 20px 14px
    padding: 9px 15px;
  .seekBut
    color: #ffffff;
    margin 20px 14px
    padding: 9px 15px;
    background-color: rgba(70, 125, 68, 1);
    border: 1px solid rgba(70, 125, 68, 1);
  >>>.el-input__inner {
    border-radius: 0px;
    background-color: rgba(44, 239, 255, 0.2);
    border: 1px none #DCDFE6;
    color: #ffffff;
  }
.taskManage .title
  border-top 1px solid
  border-left 1px solid
  border-right 1px solid
  border-color rgba(44, 239, 255, 0.2)
  width 100%
  height 45px
  padding 10px
  font-size: 18px;
  color #ffffff
.taskManage .info
  border 1px solid
  border-color rgba(44, 239, 255, 0.2)
  width 100%
  min-height 45px
.taskManage .info .taskTable
  width 98%
  margin 25px auto
.taskManage .info .taskTable >>>
   .el-table th,
   .el-table tr
     background-color rgba(44, 239, 255, 0.2)!important
   .el-table,
   .el-table__expanded-cell
     background-color rgba(44, 239, 255, 0)!important
     color #ffffff
   .el-table--enable-row-hover .el-table__body tr:hover>td
     background-color rgba(44, 239, 255, 0.2)!important
   .el-table thead
     color #ffffff
   .el-table td,
   .el-table th.is-leaf
     text-align center
     border: 1px solid #143d4b!important;
   .el-table--border::after,
   .el-table--group::after,
   .el-table::before
     background-color transparent;
</style>
<style lang="stylus">

/*翻页*/
.position {
  margin: 20px auto;
  text-align: center;
}

.position .el-pagination__total,
.position .el-pager li {
  color: white !important;
  border: 1px solid transparent;
  padding: 5px;
  border-radius: 3px;
  line-height: 18px!important;
  background-color: rgba(255, 255, 255, 0.2);
}
.position .el-pagination .btn-next,
.position .el-pagination .btn-prev {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border: 1px solid transparent;
  border-radius: 3px;
}
.position .el-pagination__jump {
  color: white !important;
}
.position .el-pagination .el-select .el-input .el-input__inner {
  background-color: rgba(255, 255, 255, 0.2)!important;
  border: 1px solid transparent!important;
  border-radius: 3px;
  color: white !important;
}
.modelList .position .el-input__inner{
  background-color: rgba(255, 255, 255, 0.2)!important;
  border: 1px solid transparent!important;
  border-radius: 3px;
}
.position .el-pager li {
  background-color: rgba(255, 255, 255, 0.2)!important;
  border: 1px solid transparent!important;
  border-radius: 3px;
  margin: 0 5px;
}
.position .el-pager li.active {
  background: rgb(209,107,77) !important;
  color: #ffffff!important;
}
.el-pagination__editor {
  margin: none !important;
}
</style>
