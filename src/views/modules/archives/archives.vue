<template>
  <div class="archives">
    <div class="title"><span class="title_a">人员档案</span></div>
    <div class="coat1">
      <div class="coat2">
        <div class="archivesCoat1">
          <div class="archivesCoat2">
            <div class="IdentityInfo clearfix">
              <div class="img">
                <img :src="userInfo.pic" alt="" />
              </div>
              <div class="idInfo">
                <div>
                  <span>{{ userInfo.idNumber }}</span>
                </div>
                <div>
                  <span>姓名&nbsp;</span>
                  <span>{{ userInfo.name }}</span>
                </div>
                <div>
                  <span>民族&nbsp;</span>
                  <span>{{ userInfo.nation }}</span>
                </div>
                <div>
                  <span>性别&nbsp;</span>
                  <span>{{ userInfo.sex === '1' ? '男' : '女' }}</span>
                </div>
                <div>
                  <span>出生日期&nbsp;</span>
                  <span>{{ userInfo.birthday }}</span>
                </div>
                <div>
                  <span>联系电话&nbsp;</span>
                  <span>{{ userInfo.cellphone }}</span>
                </div>
                <div>
                  <span>现居地&nbsp;</span>
                  <span>{{ userInfo.currentAddress }}</span>
                </div>
              </div>
            </div>
            <!-- 旅店记录 -->
            <el-menu
              class="menu-list hotel"
              v-if="hotelList && hotelList.length > 0"
            >
              <label v-for="(item, index) in hotelShow" :key="index">
                <el-submenu :index="index + ''">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.name }}</span>
                    <div class="messageCoT">
                      <span>{{
                        hotelList.length > 10 ? 10 + '+' : hotelList.length
                      }}</span>
                    </div>
                  </template>

                  <div class="archives_table">
                    <el-table
                      :data="item.tabledata"
                      style="width: 100%"
                      size="small"
                      row-class-name="row"
                      cell-class-name="column"
                      tooltip-effect="dark"
                      :highlight-current-row="true"
                      fit
                    >
                      <el-table-column
                        v-for="(item2, index2) in showTableCN(item.tableCN)"
                        :key="index2"
                        :prop="item2.prop"
                        :width="item2.width"
                        :label="item2.label"
                      >
                      </el-table-column>
                      <el-table-column label="更多" align="center" width="100">
                        <template slot-scope="scope">
                          <i
                            @click="
                              handleClick(item.name, item.tableCN, scope.row)
                            "
                            class="el-icon-circle-plus"
                          ></i>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="paging">
                    <el-pagination
                      @current-change="hotelPageChange"
                      :current-page="item.paging.current"
                      :page-size="4"
                      layout="total, prev, pager, next, jumper"
                      :total="item.paging.total"
                    ></el-pagination>
                  </div>
                </el-submenu>
              </label>
            </el-menu>
            <!-- 车辆记录 -->
            <el-menu class="menu-list car" v-if="carList && carList.length > 0">
              <label v-for="(item, index) in carShow" :key="index">
                <el-submenu :index="index + ''">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.name }}</span>
                    <div class="messageCoT">
                      <span>{{
                        carList.length > 10 ? 10 + '+' : carList.length
                      }}</span>
                    </div>
                  </template>

                  <div class="archives_table">
                    <el-table
                      :data="item.tabledata"
                      style="width: 100%"
                      size="small"
                      row-class-name="row"
                      cell-class-name="column"
                      tooltip-effect="dark"
                      :highlight-current-row="true"
                      fit
                    >
                      <el-table-column
                        v-for="(item2, index2) in showTableCN(item.tableCN)"
                        :key="index2"
                        :prop="item2.prop"
                        :width="item2.width"
                        :label="item2.label"
                      >
                      </el-table-column>
                      <el-table-column label="更多" align="center" width="100">
                        <template slot-scope="scope">
                          <i
                            @click="
                              handleClick(item.name, item.tableCN, scope.row)
                            "
                            class="el-icon-circle-plus"
                          ></i>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="paging">
                    <el-pagination
                      @current-change="carPageChange"
                      :current-page="item.paging.current"
                      :page-size="4"
                      layout="total, prev, pager, next, jumper"
                      :total="item.paging.total"
                    ></el-pagination>
                  </div>
                </el-submenu>
              </label>
            </el-menu>
            <!-- 出行记录 -->
            <el-menu
              class="menu-list travelRecord"
              v-if="travelRecordList && travelRecordList.length > 0"
            >
              <label v-for="(item, index) in travelRecordShow" :key="index">
                <el-submenu :index="index + ''">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.name }}</span>
                    <div class="messageCoT">
                      <span>{{
                        travelRecordList.length > 10
                          ? 10 + '+'
                          : travelRecordList.length
                      }}</span>
                    </div>
                  </template>

                  <div class="archives_table">
                    <el-table
                      :data="item.tabledata"
                      style="width: 100%"
                      size="small"
                      row-class-name="row"
                      cell-class-name="column"
                      tooltip-effect="dark"
                      :highlight-current-row="true"
                      fit
                    >
                      <el-table-column
                        v-for="(item2, index2) in showTableCN(item.tableCN)"
                        :key="index2"
                        :prop="item2.prop"
                        :width="item2.width"
                        :label="item2.label"
                      >
                      </el-table-column>
                      <el-table-column label="更多" align="center" width="100">
                        <template slot-scope="scope">
                          <i
                            @click="
                              handleClick(item.name, item.tableCN, scope.row)
                            "
                            class="el-icon-circle-plus"
                          ></i>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="paging">
                    <el-pagination
                      @current-change="travelRecordPageChange"
                      :current-page="item.paging.current"
                      :page-size="4"
                      layout="total, prev, pager, next, jumper"
                      :total="item.paging.total"
                    ></el-pagination>
                  </div>
                </el-submenu>
              </label>
            </el-menu>
            <!-- 网吧记录 -->
            <el-menu
              class="menu-list inter"
              v-if="interList && interList.length > 0"
            >
              <label v-for="(item, index) in interShow" :key="index">
                <el-submenu :index="index + ''">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.name }}</span>
                    <div class="messageCoT">
                      <span>{{
                        interList.length > 10 ? 10 + '+' : interList.length
                      }}</span>
                    </div>
                  </template>

                  <div class="archives_table">
                    <el-table
                      :data="item.tabledata"
                      style="width: 100%"
                      size="small"
                      row-class-name="row"
                      cell-class-name="column"
                      tooltip-effect="dark"
                      :highlight-current-row="true"
                      fit
                    >
                      <el-table-column
                        v-for="(item2, index2) in showTableCN(item.tableCN)"
                        :key="index2"
                        :prop="item2.prop"
                        :width="item2.width"
                        :label="item2.label"
                      >
                      </el-table-column>
                      <el-table-column label="更多" align="center" width="100">
                        <template slot-scope="scope">
                          <i
                            @click="
                              handleClick(item.name, item.tableCN, scope.row)
                            "
                            class="el-icon-circle-plus"
                          ></i>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="paging">
                    <el-pagination
                      @current-change="interPageChange"
                      :current-page="item.paging.current"
                      :page-size="4"
                      layout="total, prev, pager, next, jumper"
                      :total="item.paging.total"
                    ></el-pagination>
                  </div>
                </el-submenu>
              </label>
            </el-menu>
            <!-- 案件记录 -->
            <el-menu
              class="menu-list case"
              v-if="caseList && caseList.length > 0"
            >
              <label v-for="(item, index) in caseShow" :key="index">
                <el-submenu :index="index + ''">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.name }}</span>
                    <div class="messageCoT">
                      <span>{{
                        caseList.length > 10 ? 10 + '+' : caseList.length
                      }}</span>
                    </div>
                  </template>

                  <div class="archives_table">
                    <el-table
                      :data="item.tabledata"
                      style="width: 100%"
                      size="small"
                      row-class-name="row"
                      cell-class-name="column"
                      tooltip-effect="dark"
                      :highlight-current-row="true"
                      fit
                    >
                      <el-table-column
                        v-for="(item2, index2) in showTableCN(item.tableCN)"
                        :key="index2"
                        :prop="item2.prop"
                        :width="item2.width"
                        :label="item2.label"
                      >
                      </el-table-column>
                      <el-table-column label="更多" align="center" width="100">
                        <template slot-scope="scope">
                          <i
                            @click="
                              handleClick(item.name, item.tableCN, scope.row)
                            "
                            class="el-icon-circle-plus"
                          ></i>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="paging">
                    <el-pagination
                      @current-change="casePageChange"
                      :current-page="item.paging.current"
                      :page-size="4"
                      layout="total, prev, pager, next, jumper"
                      :total="item.paging.total"
                    ></el-pagination>
                  </div>
                </el-submenu>
              </label>
            </el-menu>
          </div>
        </div>
        <div class="dialog">
          <fly-dialog :title="dialogInfo.title" :show.sync="showDialog">
            <div class="dialogInfoCoat">
              <div
                class="dialogInfo"
                v-for="(item3, index3) in dialogInfo.showList.tableCN"
                :key="index3"
              >
                <span>{{ item3.label }}</span>
                <span :alt="dialogInfo.showList.tableValue[item3.prop]">
                  {{ dialogInfo.showList.tableValue[item3.prop] }}
                </span>
              </div>
            </div>
            <div class="butCoat">
              <el-button class="canBut" @click="showDialog = false"
                >取 消</el-button
              >
            </div>
          </fly-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
import { archivesDetailApi } from '@/api/archives'

export default {
  name: 'archives',
  metaInfo: {
    title: '人员档案'
  },
  components: {
    FlyDialog,
  },
  props: {},
  data() {
    return {
      keyword: this.$route.query.keyword,
      curPage: 1, // 当前分页
      totalPage: 1, // 总页数
      userInfo: {},
      carList: [], // 所有的汽车信息
      carShow: [], // 显示的汽车信息（每次四个）
      travelRecordList: [], // 所有的出行记录信息
      travelRecordShow: [], // 显示的出行记录信息（每次四个）
      hotelList: [], // 所有的住宿信息
      hotelShow: [], // 显示的住宿信息（每次四个）
      interList: [], // 所有的网吧信息
      interShow: [], // 显示的网吧信息（每次四个）
      caseList: [], // 所有的案件信息
      caseShow: [], // 显示的案件信息（每次四个）
      showDialog: false,
      formInline: {
        seek: '',
      },
      dialogInfo: {
        title: '',
        showList: {
          tableCN: [],
          tableValue: [],
        },
      },
    }
  },
  computed: {
    // 截取前8列
    showTableCN(val) {
      return val => {
        return JSON.parse(JSON.stringify(val)).slice(0, 6)
      }
    },
  },
  methods: {
    /*
      渲染需要显示的数据，一页四个，显示第几页
      type: car || hotel || travelRecord || inter || case
    */
    renderData(type, page = 1) {
      const mapList = {
        carList: '车辆记录',
        travelRecordList: '出行记录',
        hotelList: '住宿记录',
        interList: '网吧记录',
        caseList: '案件记录',
      }
      switch (type) {
        case 'hotel':
          this.hotelShow = [
            {
              name: mapList['hotelList'],
              tableCN: [
                { label: '姓名', width: '', prop: 'name' },
                { label: '身份证号', width: '', prop: 'id_number' },
                { label: '旅店名称', width: '', prop: 'hotelName' },
                { label: '旅店地址', width: '', prop: 'hotelAddress' },
                { label: '入住时间', width: '', prop: 'check_in' },
                { label: '退房时间', width: '', prop: 'check_out' },
                { label: '消费金额', width: '', prop: 'amount' },
                { label: '房价', width: '', prop: 'room_price' },
                { label: '旅店ID', width: '', prop: 'hotel_id' },
                { label: '房间号', width: '', prop: 'room_no' },
                { label: '房间类型', width: '', prop: 'room_type' },
              ],
              tabledata: this.hotelList.slice(4 * (page - 1), page * 4),
              paging: {
                current: page,
                total: Math.ceil(this.hotelList.length),
              },
            },
          ]
          break
        case 'car':
          this.carShow = [
            {
              name: mapList['carList'],
              tableCN: [
                { label: '姓名', width: '', prop: 'name' },
                { label: '身份证号', width: '', prop: 'owner' },
                { label: '车牌号码', width: '', prop: 'carNumber' },
                { label: '登记地址', width: '', prop: 'address' },
                { label: '颜色', width: '', prop: 'color' },
                { label: '汽车品牌', width: '', prop: 'model' },
                { label: '注册时间', width: '', prop: 'registryTime' },
                { label: '发放时间', width: '', prop: 'issuanceTime' },
                { label: '车架号', width: '', prop: 'vin' },
                { label: '发动机号', width: '', prop: 'engineNo' },
                { label: '是否涉案', width: '', prop: 'isCaseInvolved' },
              ],
              tabledata: this.carList.slice(4 * (page - 1), page * 4),
              paging: {
                current: page,
                total: Math.ceil(this.carList.length),
              },
            },
          ]
          break
        case 'travelRecord':
          this.travelRecordShow = [
            {
              name: mapList['travelRecordList'],
              tableCN: [
                { label: '姓名', width: '', prop: 'name' },
                { label: '身份证号', width: '', prop: 'idNumber' },
                { label: '出行工具', width: '', prop: 'typeCode' },
                { label: '出发时间', width: '', prop: 'startTime' },
                { label: '始发地', width: '', prop: 'startStation' },
                { label: '目的地', width: '', prop: 'destination' },
                { label: '航班/车次', width: '', prop: 'toolNumber' },
                { label: '车牌号', width: '', prop: 'carNo' },
                { label: '舱位', width: '', prop: 'class' },
                { label: '车厢号', width: '', prop: 'carriageNumber' },
                { label: '座位号', width: '', prop: 'seatNumber' },
              ],
              tabledata: this.travelRecordList.slice(4 * (page - 1), page * 4),
              paging: {
                current: page,
                total: Math.ceil(this.travelRecordList.length),
              },
            },
          ]
          break
        case 'inter':
          this.interShow = [
            {
              name: mapList['interList'],
              tableCN: [
                { label: '姓名', width: '', prop: 'name' },
                { label: '身份证号', width: '', prop: 'id_number' },
                { label: '网吧名称', width: '', prop: 'interName' },
                { label: '网吧地址', width: '', prop: 'interAddr' },
                { label: '开始时间', width: '', prop: 'check_in' },
                { label: '结束时间', width: '', prop: 'check_out' },
                { label: '消费金额', width: '', prop: 'amount' },
                { label: '网吧ID', width: '', prop: 'internet_cafe_id' },
                { label: '机号', width: '', prop: 'computer_no' },
              ],
              tabledata: this.interList.slice(4 * (page - 1), page * 4),
              paging: {
                current: page,
                total: Math.ceil(this.interList.length),
              },
            },
          ]
          break
        case 'case':
          this.caseShow = [
            {
              name: mapList['caseList'],
              tableCN: [
                { label: '姓名', width: '', prop: 'name' },
                { label: '证件号码', width: '', prop: 'person_id' },
                { label: '案件名称', width: '', prop: 'caseName' },
                { label: '案发时间', width: '', prop: 'caseTime' },
                { label: '案件角色', width: '', prop: 'role' },
                { label: '案件经过', width: '', prop: 'detail' },
                { label: '案件编号', width: '', prop: 'caseNo' },
              ],
              tabledata: this.caseList.slice(4 * (page - 1), page * 4),
              paging: {
                current: page,
                total: Math.ceil(this.caseList.length),
              },
            },
          ]
          break
      }
    },
    hotelPageChange(page) {
      this.renderData('hotel', page)
    },
    carPageChange(page) {
      this.renderData('car', page)
    },
    travelRecordPageChange(page) {
      this.renderData('travelRecord', page)
    },
    interPageChange(page) {
      this.renderData('inter', page)
    },
    casePageChange(page) {
      this.renderData('case', page)
    },
    handleClick(name, tableCN, row) {
      this.dialogInfo.title = JSON.parse(JSON.stringify(name))
      this.dialogInfo.showList.tableCN = JSON.parse(JSON.stringify(tableCN))
      this.dialogInfo.showList.tableValue = JSON.parse(JSON.stringify(row))
      this.showDialog = true
    },
  },
  created() {
    archivesDetailApi({
      keyword: this.keyword,
    }).then(({ data }) => {
      let {
        result: {
          carList,
          travelRecordList,
          hotelList,
          interList,
          caseList,
          person,
        },
      } = data
      this.userInfo = person
      if (carList) {
        carList.map(value => {
          value['name'] = person.name
          // 是否涉案车辆
          value['isCaseInvolved'] =
            value['isCaseInvolved'] === '1' ? '是' : '否'
        })
        this.carList = carList
      }
      if (travelRecordList) {
        travelRecordList.map(value => {
          value['name'] = person.name
        })
        this.travelRecordList = travelRecordList
      }
      if (hotelList) {
        hotelList.map(value => {
          value['name'] = person.name
        })
        this.hotelList = hotelList
      }

      if (interList) {
        interList.map(value => {
          value['name'] = person.name
        })
        this.interList = interList
      }
      if (caseList) {
        caseList.map(value => {
          value['name'] = person.name
        })
        this.caseList = caseList
      }

      this.renderData('hotel')
      this.renderData('car')
      this.renderData('travelRecord')
      this.renderData('inter')
      this.renderData('case')
    })
  },
}
</script>
<style lang="stylus" scoped>
.archives
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  z-index -1
  width 100%
  height 100%
  content ''
  background url('~@/assets/img/i2bg.png') no-repeat center
  background-size cover
  .title
    width 100%
    height 50px
    background: rgba(44, 239, 255, 0.5)
    text-align center
    .title_a
      z-index 2
      opacity 1
      font-family: HYk2gj;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 55px;
      letter-spacing: 0;
      color: #ffffff;
  .archivesCoat1
    width 100%
    max-height calc(100vh - 100px)
    overflow hidden
  .archivesCoat2
    width calc(100% + 20px)
    max-height calc(100vh - 100px)
    overflow-y  scroll
    .IdentityInfo
      background-color rgba(44, 239, 255, 0.2)
      color #ffffff
      >.img,
      >.idInfo
        display inline-block
        height 280px
        margin 10px
        float left
      .img
        width 200px
        border solid 1px rgba(44, 239, 255, 1)
      .idInfo
        height 300px
        margin-left 30px
        font-size 16px
        line-height 40px
    .menu-list
      margin-top 1px
    .messageCoT
      display inline-block
      width 20px
      height 20px
      font-size 12px
      text-align center
      border-radius: 50%;
      background-color #a96500
    .messageCoT span
      display block
      line-height  20px
    .toolbar
      display none
      padding 10px
    .toolbar .el-button {
      background-color: rgba(44, 239, 255, 0.3);
      border: 1px solid rgba(44, 239, 255, 0.3);
      color: #ffffff;
      margin-left: 1px;
    }
    .toolbar .toolBut {
      float right
      margin 10px 2px
    }
    .unfold
      display block
    .toolbar .from
      display inline-block
    .toolbar .from>>>
      .okBut
        background-color: rgba(70, 125, 68, 1)
        border: 1px solid rgba(70, 125, 68, 1)
      .el-form
        width 370px
        height auto
      .el-dialog .el-dialog__body .body-content
        background-color rgba(44, 239, 255, 0.2)
        .el-form-item__label
          background-color rgba(44, 239, 255, 0.4)
          color: #ffffff;
        .el-input__inner {
          border-radius: 0;
          background-color: rgba(44, 239, 255, 0.2);
          border: 1px none #DCDFE6;
          color: #ffffff;
          margin-left: 1px;
        }
        .el-form-item {
          margin 0 auto
          margin-bottom: 1px;
          width 170px!important
        }
    >>>.el-submenu__title
         color #ffffff
      >>>.el-submenu__title:hover,
      >>>.el-submenu .el-menu-item:hover
         background-color rgba(44, 239, 255, 0.4)
      >>>.el-menu
         border-right: none 1px;
         background-color rgba(44, 239, 255, 0.2)
      >>>.el-submenu .el-menu-item
         border-bottom 1px solid #0d3644
         background-color #187d8e
         color: #ffffff;
      >>>.el-submenu .el-menu--inline
         background-color rgba(44, 239, 255, 0)
      .archives_table >>>
        .el-table th,
        .el-table tr
           background-color rgba(44, 239, 255, 0.1)!important
        .el-table,
        .el-table__expanded-cell
           background-color rgba(44, 239, 255, 0)!important
           color #ffffff
        .el-table--enable-row-hover .el-table__body tr:hover>td
           background-color rgba(44, 239, 255, 0.2)!important
        .el-table thead
           color #ffffff
      .archives_table
         width 98%
         margin 5px auto
      .archives_table >>>
        .el-table td,
        .el-table th.is-leaf
           border: 1px solid #143d4b!important;
        .el-table--border::after,
        .el-table--group::after,
        .el-table::before
           background-color transparent
        .el-table__body tr.current-row>td,
        tr.hover-row>td
           background-color rgba(44, 239, 255, 0.2)
      .paging
         float right
         margin 5px
      .paging>>>
        .el-pager li.btn-quicknext,
        .el-pager li.btn-quickprev,
        .el-pagination__total,
        .el-pagination__jump,
        .el-input__inner,
        .el-pagination
           color #ffffff
        .el-input__inner
           border 1px solid rgba(44, 239, 255, 0)
           background-color rgba(44, 239, 255, 0.2)
        .el-pagination .btn-next, .el-pagination .btn-prev
           background-color rgba(44, 239, 255, 0.2)!important
           color #ffffff
        .el-pagination button:disabled
           background-color rgba(44, 239, 255, 0.2)
  .dialog
    >>>.el-dialog
       width 800px!important
    .dialogInfoCoat
       margin 20px 10px
    .dialogInfo
       width 49%
       display inline-block
    .dialogInfo span
       display inline-block
       width 49%
       height 40px
       margin 5px 0
       padding 0 10px
       line-height 40px
       background-color rgba(44, 239, 255, 0.1)
       color #ffffff
       overflow:hidden
       text-overflow:ellipsis
       white-space:nowrap
    .dialogInfo span:nth-child(1)
       margin-right 3px
       background-color rgba(44, 239, 255, 0.2)
</style>
<style lang="stylus"></style>
