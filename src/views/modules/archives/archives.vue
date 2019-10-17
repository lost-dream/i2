<template>
  <div class="archives">
    <div class="title"><span class="title_a">人员档案</span></div>
    <div class="coat1">
      <div class="coat2">
        <div class="archivesCoat1">
          <div class="archivesCoat2">
            <div class="IdentityInfo clearfix">
              <div class="img">
                <img src="" alt="" />
              </div>
              <div class="idInfo">
                <div><span>360721196306101779</span></div>
                <div><span>姓名</span>&nbsp;<span></span>白可可</div>
                <div><span>民族</span>&nbsp;<span>汉族</span></div>
                <div><span>性别</span>&nbsp;<span>男</span></div>
                <div>
                  <span>出生日期</span>&nbsp;<span>1969年03月11日</span>
                </div>
                <div><span>联系电话</span>&nbsp;<span>13466464462</span></div>
                <div>
                  <span>现居地</span>&nbsp;<span
                    >四川省成都市青羊区清江东路锦绣花苑5栋2单元1120室</span
                  >
                </div>
              </div>
            </div>
            <div class="archivesType">
              <div class="person_archives">
                <div class="archives_title">&nbsp;人</div>
                <div class="listType">
                  <div class="list">
                    <el-menu
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                    >
                      <label
                        v-for="(item, index) in personArchives"
                        :key="index"
                      >
                        <el-submenu :index="item.menuId">
                          <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{ item.name }}</span>
                            <div class="messageCoT">
                              <span>{{
                                item.tabledara.length > 10
                                  ? 10 + '+'
                                  : item.tabledara.length
                              }}</span>
                            </div>
                            <div @click.stop style="float: right;">
                              <i
                                class="el-icon-setting"
                                @click="item.isUnfold = !item.isUnfold"
                                style="float: right;margin-right: 20px;font-size: 16px;line-height: 56px"
                              ></i>
                            </div>
                          </template>
                          <div
                            class="toolbar"
                            :class="{ unfold: item.isUnfold }"
                          >
                            <div class="from">
                              <el-form
                                :inline="true"
                                :model="formInline"
                                class="demo-form-inline"
                              >
                                <el-form-item>
                                  <el-input
                                    size="mini"
                                    v-model="formInline.seek"
                                    placeholder="请输入搜索内容"
                                  ></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button
                                    class="okBut"
                                    size="mini"
                                    type="primary"
                                    @click="onSubmit"
                                    >查询</el-button
                                  >
                                </el-form-item>
                              </el-form>
                            </div>
                            <el-button
                              class="toolBut"
                              size="mini"
                              type="primary"
                              @click="exportToExcel(item)"
                              >导出Excel</el-button
                            >
                            <el-button
                              class="toolBut"
                              size="mini"
                              type="primary"
                              @click="flush"
                              >刷新</el-button
                            >
                          </div>
                          <div class="archives_table">
                            <el-table
                              :data="item.tabledara"
                              style="width: 100%"
                              size="small"
                              row-class-name="row"
                              cell-class-name="column"
                              tooltip-effect="dark"
                              :highlight-current-row="true"
                              fit
                            >
                              <el-table-column
                                v-for="(item2, index2) in showTableCN(
                                  item.tableCN,
                                )"
                                :key="index2"
                                :prop="item2.prop"
                                :width="item2.width"
                                :label="item2.label"
                              >
                              </el-table-column>
                              <el-table-column
                                label="更多"
                                align="center"
                                width="100"
                              >
                                <template slot-scope="scope">
                                  <i
                                    @click="
                                      handleClick(
                                        item.name,
                                        item.tableCN,
                                        scope.row,
                                      )
                                    "
                                    class="el-icon-circle-plus"
                                  ></i>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                          <div class="paging">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page="item.paging.currentPage"
                              :page-size="10"
                              layout="total, prev, pager, next, jumper"
                              :total="100"
                            >
                            </el-pagination>
                          </div>
                        </el-submenu>
                      </label>
                    </el-menu>
                  </div>
                </div>
              </div>
              <div class="car_archives">
                <div class="archives_title">&nbsp;车</div>
                <div class="listType">
                  <div class="list">
                    <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                    >
                      <label v-for="(item, index) in carArchives" :key="index">
                        <el-submenu :index="item.menuId">
                          <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{ item.name }}</span>
                            <div class="messageCoT">
                              <span>{{
                                item.tabledara.length > 10
                                  ? 10 + '+'
                                  : item.tabledara.length
                              }}</span>
                            </div>
                            <div @click.stop style="float: right;">
                              <i
                                class="el-icon-setting"
                                @click="item.isUnfold = !item.isUnfold"
                                style="float: right;margin-right: 20px;font-size: 16px;line-height: 56px"
                              ></i>
                            </div>
                          </template>
                          <div
                            class="toolbar"
                            :class="{ unfold: item.isUnfold }"
                          >
                            <div class="from">
                              <el-form
                                :inline="true"
                                :model="formInline"
                                class="demo-form-inline"
                              >
                                <el-form-item>
                                  <el-input
                                    size="mini"
                                    v-model="formInline.seek"
                                    placeholder="请输入搜索内容"
                                  ></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button
                                    class="okBut"
                                    size="mini"
                                    type="primary"
                                    @click="onSubmit"
                                    >查询</el-button
                                  >
                                </el-form-item>
                              </el-form>
                            </div>
                            <el-button
                              class="toolBut"
                              size="mini"
                              type="primary"
                              @click="exportToExcel(item)"
                              >导出Excel</el-button
                            >
                            <el-button
                              class="toolBut"
                              size="mini"
                              type="primary"
                              @click="flush"
                              >刷新</el-button
                            >
                          </div>
                          <div class="archives_table">
                            <el-table
                              :data="item.tabledara"
                              style="width: 100%"
                              size="small"
                              row-class-name="row"
                              cell-class-name="column"
                              tooltip-effect="dark"
                              :highlight-current-row="true"
                              fit
                            >
                              <el-table-column
                                v-for="(item2, index2) in showTableCN(
                                  item.tableCN,
                                )"
                                :key="index2"
                                :prop="item2.prop"
                                :width="item2.width"
                                :label="item2.label"
                              >
                              </el-table-column>
                              <el-table-column
                                fixed="right"
                                label="更多"
                                align="center"
                                width="100"
                              >
                                <template slot-scope="scope">
                                  <i
                                    @click="handleClick(scope.row)"
                                    class="el-icon-circle-plus"
                                  ></i>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                          <div class="paging">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page="item.paging.currentPage"
                              :page-size="10"
                              layout="total, prev, pager, next, jumper"
                              :total="100"
                            >
                            </el-pagination>
                          </div>
                        </el-submenu>
                      </label>
                    </el-menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog">
          <!--更多-->
          <fly-dialog :title="dialogInfo.title" :show.sync="showDialog">
            <div class="dialogInfoCoat">
              <div
                class="dialogInfo"
                v-for="(item3, index3) in dialogInfo.showList.tableCN"
                :key="index3"
              >
                <span>{{ item3.label }}</span>
                <span>{{ dialogInfo.showList.tableValue[item3.prop] }}</span>
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
// import { export_json_to_excel } from '@/assets/js/Export2Excel'
import { exportJsonToExcel } from '../../../assets/js/Export2Excel'
export default {
  components: {
    FlyDialog,
  },
  props: {},
  data() {
    return {
      isClick: 1,
      personArchives: [
        {
          name: '吸毒人员',
          menuId: '1-1',
          tableCN: [
            { label: '证件号码', width: '145', prop: 'idNumber' },
            { label: '姓名', width: '', prop: 'name' },
            { label: '性别', width: '', prop: 'sex' },
            { label: '民族', width: '', prop: 'nation' },
            { label: '出生日期', width: '', prop: 'birthdate' },
            { label: '简要案情', width: '', prop: 'briefCase' },
            { label: '文化程序', width: '', prop: 'literacyLevels' },
            { label: '原序号', width: '', prop: 'originalSerial' },
          ],
          tabledara: [
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
          ],
          isUnfold: false,
          paging: {
            currentPage: 1,
          },
        },
        {
          name: '看守所',
          menuId: '1-2',
          tableCN: [
            { label: '证件号码', width: '145', prop: 'idNumber' },
            { label: '姓名', width: '', prop: 'name' },
            { label: '性别', width: '', prop: 'sex' },
            { label: '民族', width: '', prop: 'nation' },
            { label: '出生日期', width: '', prop: 'birthdate' },
            { label: '简要案情', width: '', prop: 'briefCase' },
            { label: '文化程序', width: '', prop: 'literacyLevels' },
            { label: '原序号', width: '', prop: 'originalSerial' },
          ],
          tabledara: [
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
          ],
          isUnfold: false,
          paging: {
            currentPage: 1,
          },
        },
        {
          name: '机动车',
          menuId: '1-3',
          tableCN: [
            { label: '证件号码', width: '145', prop: 'idNumber' },
            { label: '姓名', width: '', prop: 'name' },
            { label: '性别', width: '', prop: 'sex' },
            { label: '民族', width: '', prop: 'nation' },
            { label: '出生日期', width: '', prop: 'birthdate' },
            { label: '简要案情', width: '', prop: 'briefCase' },
            { label: '文化程序', width: '', prop: 'literacyLevels' },
            { label: '原序号', width: '', prop: 'originalSerial' },
          ],
          tabledara: [
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
          ],
          isUnfold: false,
          paging: {
            currentPage: 1,
          },
        },
        {
          name: '驾驶证',
          menuId: '1-4',
          tableCN: [
            { label: '证件号码', width: '145', prop: 'idNumber' },
            { label: '姓名', width: '', prop: 'name' },
            { label: '性别', width: '', prop: 'sex' },
            { label: '民族', width: '', prop: 'nation' },
            { label: '出生日期', width: '', prop: 'birthdate' },
            { label: '简要案情', width: '', prop: 'briefCase' },
            { label: '文化程序', width: '', prop: 'literacyLevels' },
            { label: '原序号', width: '', prop: 'originalSerial' },
          ],
          tabledara: [
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
          ],
          isUnfold: false,
          paging: {
            currentPage: 1,
          },
        },
        {
          name: '吸毒人员登记',
          menuId: '1-5',
          tableCN: [
            { label: '证件号码', width: '145', prop: 'idNumber' },
            { label: '姓名', width: '', prop: 'name' },
            { label: '性别', width: '', prop: 'sex' },
            { label: '民族', width: '', prop: 'nation' },
            { label: '出生日期', width: '', prop: 'birthdate' },
            { label: '简要案情', width: '', prop: 'briefCase' },
            { label: '文化程序', width: '', prop: 'literacyLevels' },
            { label: '原序号', width: '', prop: 'originalSerial' },
          ],
          tabledara: [
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
          ],
          isUnfold: false,
          paging: {
            currentPage: 1,
          },
        },
        {
          name: '常住人口',
          menuId: '1-6',
          tableCN: [
            { label: '证件号码', width: '145', prop: 'idNumber' },
            { label: '姓名', width: '', prop: 'name' },
            { label: '性别', width: '', prop: 'sex' },
            { label: '民族', width: '', prop: 'nation' },
            { label: '出生日期', width: '', prop: 'birthdate' },
            { label: '简要案情', width: '', prop: 'briefCase' },
            { label: '文化程序', width: '', prop: 'literacyLevels' },
            { label: '原序号', width: '', prop: 'originalSerial' },
          ],
          tabledara: [
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
          ],
          isUnfold: false,
          paging: {
            currentPage: 1,
          },
        },
      ],
      carArchives: [
        {
          name: '机动车',
          menuId: '2-1',
          tableCN: [
            { label: '证件号码', width: '145', prop: 'idNumber' },
            { label: '姓名', width: '', prop: 'name' },
            { label: '性别', width: '', prop: 'sex' },
            { label: '民族', width: '', prop: 'nation' },
            { label: '出生日期', width: '', prop: 'birthdate' },
            { label: '简要案情', width: '', prop: 'briefCase' },
            { label: '文化程序', width: '', prop: 'literacyLevels' },
            { label: '原序号', width: '', prop: 'originalSerial' },
          ],
          tabledara: [
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
            {
              idNumber: 360721196306101779,
              name: '白景哲',
              sex: '男',
              nation: '民族',
              birthdate: '1963-06-10',
              briefCase: '证件类型',
              literacyLevels: '本科',
              originalSerial: 2759133524,
            },
          ],
          isUnfold: false,
          paging: {
            currentPage: 1,
          },
        },
      ],
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
        let showTable = JSON.parse(JSON.stringify(val)).slice(0, 4)
        return showTable
      }
    },
  },
  methods: {
    // 刷新路由选择不变
    /* refCli () {
      let a = this.$route.name
      a === 'timespace' ? (this.showCard = false) : (this.showCard = true)
    } */
    onSubmit() {
      console.log(22222222)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 刷新
    flush() {
      console.log('刷新')
    },
    // 导出Excel
    exportToExcel(Archives) {
      console.log(Archives)
      require.ensure([], () => {
        const tHeader = []
        const filterVal = []
        Archives.tableCN.forEach(val => {
          tHeader.push(val.label)
          filterVal.push(val.prop)
        })
        const list = Archives.tabledara
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, Archives.name + '表')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 打开弹窗
    handleClick(name, tableCN, row) {
      this.dialogInfo.title = JSON.parse(JSON.stringify(name))
      this.dialogInfo.showList.tableCN = JSON.parse(JSON.stringify(tableCN))
      this.dialogInfo.showList.tableValue = JSON.parse(JSON.stringify(row))
      this.showDialog = true
    },
  },
  created() {},
  mounted() {
    // this.refCli()
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
     letter-spacing: 0px;
     color: #ffffff;

   .or-spacer-vertical
     float right
     margin 5px 0 0 5px
     .mask
       overflow hidden
       width 6px
       height 50px

       &:after
         content ''
         display block
         margin-left -10px
         width 10px
         height 100%
         border-radius 12px / 80px
         box-shadow 0 0 2px #2cefff
   .archivesCoat1
         width 1130px
         max-height 785px
         overflow hidden
   .archivesCoat2
         width 1150px
         max-height 785px
         overflow-y  scroll
   .IdentityInfo
        background-color rgba(44, 239, 255, 0.2)
        color #ffffff
     .IdentityInfo>.img,
     .IdentityInfo>.idInfo
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
   .archivesType
     .person_archives,
     .car_archives
        margin-top 2px
     .archives_title
       height 40px
       margin 2px auto
       padding 0 15px
       font-size 16px
       line-height 40px
       color #ffffff
       background-color rgba(44, 239, 255, 0.4)
     .listType .list .messageCoT
       display inline-block
       width 20px
       height 20px
       font-size 12px
       text-align center
       border-radius: 50%;
       background-color #a96500
     .listType .list .messageCoT span
       display block
       line-height  20px
     .listType .list .toolbar
       display none
       padding 10px
     .listType .list .toolbar .el-button {
       background-color: rgba(44, 239, 255, 0.3);
       border: 1px solid rgba(44, 239, 255, 0.3);
       color: #ffffff;
       margin-left: 1px;
     }
     .listType .list .toolbar .toolBut {
       float right
       margin 10px 2px
     }
     .listType .list .unfold
       display block
     .listType .list .toolbar .from
       display inline-block
     .listType .list .toolbar .from>>>
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
          border-radius: 0px;
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
     .listType .list >>>.el-submenu__title
       color #ffffff
       border-bottom 1px solid #0d3644
     .listType .list  >>>.el-submenu__title:hover,
     .listType .list  >>>.el-submenu .el-menu-item:hover
       background-color rgba(44, 239, 255, 0.4)
     .listType .list  >>>.el-menu
       border-right: none 1px;
       background-color rgba(44, 239, 255, 0.2)
     .listType .list  >>>.el-submenu .el-menu-item
       border-bottom 1px solid #0d3644
       background-color #187d8e
       color: #ffffff;
     .listType .list  >>>.el-submenu .el-menu--inline
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
     .dialogInfo span:nth-child(1)
       margin-right 3px
       background-color rgba(44, 239, 255, 0.2)
</style>
<style lang="stylus"></style>
