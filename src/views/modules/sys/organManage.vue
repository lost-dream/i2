<template>
    <div class="organManage">
      <div class="coat1">
        <div class="coat2">
          <div class="operateMenu">
            <ul class="clearfix">
              <li @click="addDialog = true">添加</li>
              <li @click="editDialog = true">编辑</li>
              <li @click="importDialog = true">导入</li>
              <li @click="pitchOn2() && (deleteDialog = true)">删除</li>
              <li @click="flush()">刷新</li>
            </ul>
          </div>
          <div class="fgx"></div>
          <div class="organTable">
            <el-table
              :data="organData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="机构名称"
                width="225">
              </el-table-column>
              <el-table-column
                prop="code"
                label="机构编码"
                width="225">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                width="225">
              </el-table-column>
              <el-table-column
                prop="describe"
                label="描述">
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="创建时间"
                width="225">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'organManage',
  data () {
    return {
      organData: [
        {
          name: '四川省公安厅',
          code: 510000000000,
          status: '有效',
          describe: '客户讲几句话急急急',
          createDate: '2019-07-08 15:57:40'
        }, {
          name: '四川省公安厅',
          code: 510000000000,
          status: '有效',
          describe: '客户讲几句话急急急',
          createDate: '2019-07-08 15:57:40'
        }, {
          name: '四川省公安厅',
          code: 510000000000,
          status: '有效',
          describe: '客户讲几句话急急急',
          createDate: '2019-07-08 15:57:40'
        }, {
          name: '四川省公安厅',
          code: 510000000000,
          status: '有效',
          describe: '客户讲几句话急急急',
          createDate: '2019-07-08 15:57:40'
        }, {
          name: '四川省公安厅',
          code: 510000000000,
          status: '有效',
          describe: '客户讲几句话急急急',
          createDate: '2019-07-08 15:57:40'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .organManage
    margin 0 auto
    position relative
  .organManage .coat1
    width 1200px
    position relative
    top 0
    left 0
    right 0
    bottom 0
    margin 0 auto
    background-color rgba(44, 239, 255, 0.1)
    padding 20px
  .organManage .coat2
    width 1160px
    margin-top 18px
    margin-bottom 20px
    padding 20px 15px 20px 15px
    position relative
    top 0
    left 0
    right 0
    bottom 0
    margin 0 auto
    background-color rgba(44, 239, 255, 0.1)
  .organManage ul
    display inline-block
  .organManage ul li
    float left
    padding 8px 18px
    margin 0 3px
    color #ffffff
    background-color rgba(44, 239, 255, 0.3)
    border-radius: 2px;
  .operateMenu
    text-align center
    margin 0 auto
  .fgx
    width 95%
    margin 10px auto
    border-bottom 2px solid rgba(44, 239, 255, 0.4)
  .organTable >>>
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
  .organTable >>>
    .el-table td,
    .el-table th.is-leaf
      border: 1px solid #143d4b!important;
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before
      background-color transparent;
</style>
<style lang="stylus">

</style>
