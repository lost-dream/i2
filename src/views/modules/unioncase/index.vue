<template>
  <div class="mod-ticket ticket-bg">
    <nav class="navbar-fixed-top">
      <div class="header-container">
        <div class="title">
          <img
            style="width: 40px;height: 40px;margin-top: 5px;margin-right:5px;"
            src="../../../assets/img/caseLogo.png"
            alt="logo"
          />
          <h1>联案分析</h1>
        </div>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane>
            <div @click="addCase" slot="label">
              <img src="../../../assets/img/casexinzeng.png" alt="" />
              <p>添加案件</p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div id="circle" slot="label">
              <img src="../../../assets/img/caseguanxitu.png" alt="" />
              <p>添加描圆</p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div id="point" slot="label">
              <img src="../../../assets/img/caseguanxitu.png" alt="" />
              <p>添加描点</p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div
              @click="
                isInfo = false
                trackShow = true
              "
              slot="label"
            >
              <img src="../../../assets/img/casedizhi.png" alt="" />
              <p>轨迹点</p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div @click="setTerm()" slot="label">
              <img src="../../../assets/img/caseshezhi.png" alt="" />
              <p>设定条件</p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div @click="toManage()" slot="label">
              <img src="../../../assets/img/caseManagement.png" alt="" />
              <p>任务管理</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </nav>
    <div class="box">
      <div class="menubar">
        <sidebar>
          <sidemenu-item></sidemenu-item>
        </sidebar>
      </div>
      <div
        class="taskAnalysisResults"
        style="position: absolute;width: 100%;top: 121px;z-index: 100;"
        v-if="isInfo"
      >
        <task-analysis-results :id="showInfo"></task-analysis-results>
      </div>
      <div v-else>
        <div class="fun-sidebar">
          <sidebar type="tabpanel">
            <div class="rightPanel">
              <div class="buttonNav">
                <span style="color:white;margin-right:10px">设定条件</span>
                <div>
                  <el-button @click="taskSave()" type="primary"
                    >保存任务
                  </el-button>
                  <!-- <el-button @click="taskStaging()" type="success"
                    >暂存</el-button
                  >-->
                  <el-button @click="taskReset()" type="warning"
                    >重置
                  </el-button>
                </div>
              </div>
              <div class="task">
                <h4>任务名称</h4>
                <p style="margin:5px 0;">任务名称</p>
                <el-input v-model="taskInfo.taskName"></el-input>
              </div>
              <div class="condition">
                <h4>条件参数</h4>
                <div v-for="(item, index) in taskInfo.conditions" :key="index">
                  <div
                    v-if="index === taskInfoSshow"
                    class="conditionItem"
                    style="border:1px solid white;margin-top:30px;padding:30px 0 10px 0;border-radius:5px;padding-right: 10px;"
                  >
                    <!--<div-->
                    <!--v-if="-->
                    <!--item.graphicId === taskInfoSshow || taskInfoSshow === 0-->
                    <!--"-->
                    <!--class="conditionItem"-->
                    <!--style="border:1px solid white;margin-top:30px;padding:30px 0 10px 0;border-radius:5px;padding-right: 10px;"-->
                    <!--&gt;-->
                    <div style="padding: 0 10px">
                      <span>经度：{{ item.pointLongitude }}</span
                      ><br />
                      <span>纬度：{{ item.pointLatitude }}</span>
                    </div>
                    <p>活动时间段</p>
                    <div class="inputStyle">
                      <p>起</p>
                      <el-date-picker
                        v-model="item.date1"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </div>
                    <div class="inputStyle">
                      <p>止</p>
                      <el-date-picker
                        v-model="item.date2"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </div>
                    <div class="inputStyle">
                      <p>范围</p>
                      <el-input
                        id="range"
                        @change="rangeChange"
                        :disabled="item.taskType !== 0"
                        style="margin-left:10px;width:87%;"
                        v-model="item.range"
                      ></el-input>
                    </div>
                  </div>
                  <div
                    v-else
                    @click="isTaskInfoSshow(item)"
                    style="border:1px solid white;padding:5px 10px;border-radius:5px;margin-top: 10px"
                  >
                    条件参数{{ index + 1 }}
                  </div>
                </div>
              </div>
              <div class="resource">
                <div
                  style="display:flex;align-items:center;border-bottom:1px dashed white;margin-top:30px"
                >
                  <h4 style="margin-right:20px;border:none;margin-top:0">
                    资源参数
                  </h4>
                  <div class="resourceBtn">
                    <el-button
                      @click="taskInfo.type = 0"
                      type="primary"
                      :class="{ activeType: taskInfo.type === 1 }"
                      >查人
                    </el-button>
                    <el-button
                      @click="taskInfo.type = 1"
                      type="primary"
                      :class="{ activeType: taskInfo.type === 0 }"
                      >查案
                    </el-button>
                  </div>
                </div>
                <div v-if="taskInfo.type === 0">
                  <p>出生时间段</p>
                  <div class="inputStyle">
                    <p>起</p>
                    <el-date-picker
                      v-model="taskInfo.date3"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                  <div class="inputStyle">
                    <p>止</p>
                    <el-date-picker
                      v-model="taskInfo.date4"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                  <el-checkbox-group
                    v-model="taskInfo.checkedBox"
                    :min="1"
                    :max="2"
                  >
                    <el-checkbox
                      v-for="(item, index) in boxs"
                      :label="item.label"
                      :key="index"
                      >{{ item.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </sidebar>
        </div>
      </div>
      <div
        style="position:absolute;z-index:30;left:160px;bottom:20px;width:500px;"
        class="mapTable"
        v-show="!isInfo"
      >
        <el-table
          :data="mapTableData"
          height="245px"
          ref="singleTable"
          highlight-current-row
          @row-click="rowClick"
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column type="index" width="100" align="center" label="编号">
          </el-table-column>
          <el-table-column prop="longitude" align="center" label="经度">
          </el-table-column>
          <el-table-column prop="latitude" align="center" label="纬度">
          </el-table-column>
          <el-table-column prop="type" align="center" label="类型">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <button @click.stop="del(scope.row)"></button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dialog" v-show="!isInfo">
        <flyDialog :show.sync="show" class="caseMap" :width="width">
          <el-button type="success" @click="addCaseNum"
            >添加案件编号
          </el-button>
          <div v-for="(item, index) in inputList" :key="index">
            <el-input style="margin:10px;" v-model="item.caseNum">
              <el-button
                slot="append"
                :disabled="inputList.length == 1 ? true : false"
                @click="delectCase(index)"
                icon="el-icon-close"
              ></el-button>
            </el-input>
          </div>
          <div slot="ft">
            <div class="caseButton">
              <!--<el-button  @click="search" type="success"-->
              <el-button id="casePlace" class="casePlace" type="success"
                >查询</el-button
              >
              <el-button @click="cancel" type="warning">取消</el-button>
            </div>
          </div>
        </flyDialog>
        <flyDialog
          :show.sync="trackShow"
          title="人员轨迹条件"
          class="caseMap"
          :width="width2"
        >
          <div class="form">
            <el-form
              :model="trackForm"
              label-width="0px"
              :rules="trackRule"
              ref="trackForm"
            >
              <el-form-item prop="nameId">
                <el-input
                  v-model="trackForm.nameId"
                  rows="6"
                  placeholder="请输入身份证号码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="trackDate">
                <el-date-picker
                  v-model="trackForm.startDate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
                <el-date-picker
                  v-model="trackForm.endDate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="checkedBox">
                <el-checkbox-group
                  v-model="trackForm.checkedBox"
                  :min="1"
                  :max="2"
                >
                  <el-checkbox
                    v-for="(item, index) in boxs"
                    :label="item.label"
                    :key="index"
                    >{{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>

          <div class="caseButton">
            <el-button @click="trackSearch('trackForm')" type="success"
              >查询
            </el-button>
            <el-button @click="trackClear" type="warning">清空</el-button>
          </div>
        </flyDialog>
        <flyDialog
          :show.sync="trackShow2"
          title="选择地图点位"
          class="caseMap"
          :width="width2"
        >
          <div class="form">
            <el-table
              :data="trackList"
              height="245px"
              :row-key="getRowKey"
              @selection-change="handleSelectionChange"
              style="width: 100%"
            >
              <el-table-column
                width="100"
                align="center"
                prop="name"
                label="机构名称"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                width="200"
                label="所在区域"
              >
              </el-table-column>
              <el-table-column align="center" label="地图位置">
                <template slot-scope="scope">
                  <span>{{
                    (scope.row.longitude === '' ||
                      scope.row.longitude === undefined ||
                      scope.row.longitude === null) &&
                    (scope.row.longitude === '' ||
                      scope.row.longitude === undefined ||
                      scope.row.longitude === null)
                      ? '无'
                      : '有'
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="55"></el-table-column>
            </el-table>
          </div>
          <div slot="ft">
            <div class="caseButton">
              <el-button id="affirmLabel" type="success">确认标注 </el-button>
              <el-button @click="trackClear" type="warning">清空</el-button>
            </div>
          </div>
        </flyDialog>
      </div>
      <div class="content">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import taskAnalysisResults from './taskAnalysisResults.vue'
import { loadModules } from 'esri-loader'
import Sidebar from '@/views/common/Sidebar'
import SidemenuItem from '@/views/common/SidemenuItem'
import flyDialog from '@/components/fly-dialog'
import Cookies from 'js-cookie'
import { formatDate } from '../../../utils/dateFormat.js'

export default {
  name: 'unioncaseIndex',
  metaInfo: {
    title: '联案分析',
  },
  components: {
    Sidebar,
    SidemenuItem,
    flyDialog,
    taskAnalysisResults,
  },
  props: {},
  data() {
    // var trackDate = (rule, value, callback) => {
    //   if (this.trackForm.startDate === '' || this.trackForm.endDate === '') {
    //     callback(new Error('请输入始末时间'))
    //   }
    //   callback()
    // }
    return {
      mapLodad: null,
      map: null,
      graphicsLayer: null,
      pSymbol: null,
      id: 0,
      isEditor: false,
      editorDdata: [],
      isCenter: null,
      rangeChangeMap: null,

      activeName: 'Second',
      show: false,
      trackShow: false,
      trackShow2: false,
      isInfo: false,
      addCriteria: false,
      width: '400px',
      width2: 'auto',
      delId: '',
      inputList: [{ caseNum: '' }],
      trackForm: {
        nameId: '',
        startDate: '',
        endDate: '',
        value1: '',
        checkedBox: [1, 2],
      },
      taskInfoSshow: 0,
      trackRule: {
        nameId: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        // trackDate: [{ validator: trackDate, trigger: 'blur' }],
      },
      trackList: [
        {
          organName: '未来旅馆',
          area: '成都市青羊区中坝',
          geographic_position: '有',
        },
        {
          organName: '未来旅馆',
          area: '成都市青羊区中坝',
          geographic_position: '有',
        },
        {
          organName: '未来旅馆',
          area: '成都市青羊区中坝',
          geographic_position: '有',
        },
        {
          organName: '未来旅馆',
          area: '成都市青羊区中坝',
          geographic_position: '有',
        },
        {
          organName: '未来旅馆',
          area: '成都市青羊区中坝',
          geographic_position: '有',
        },
        {
          organName: '未来旅馆',
          area: '成都市青羊区中坝',
          geographic_position: '有',
        },
      ],
      mapTableData: [],
      graphicItemS: [],
      okTrack: [],
      taskInfo: {
        createId: Cookies.get('userId'),
        createName: Cookies.get('user_info').username,
        taskName: '',
        conditions: [
          {
            caseNo: '',
            graphicId: null,
            pointLatitude: '',
            pointLongitude: '',
            date1: '',
            date2: '',
            range: '',
            taskType: 0,
            ttaskDetail1Id: '',
          },
        ],
        date3: '',
        date4: '',
        type: 0,
        taskId: 0,
        taskTarget: '',
        checkedBox: [1, 2],
      },
      boxs: [
        { name: '旅馆', label: 1 },
        { name: '网吧', label: 2 },
      ],

      caseData: [],
      showInfo: this.$route.params.id,
      pointType: 1,
    }
  },
  computed: {},
  created() {},
  mounted() {
    if (this.$route.params.isEditor) {
      this.isEditor = this.$route.params.isEditor
      this.editorDdata = this.$route.params.editorDdata
      console.log(112212)
      console.log(this.isEditor)
      console.log(this.editorDdata)
    }
    this.isInfo = this.$route.params.flag
    this.mapDraw()
    this.$route.query.kw1 !== undefined && this.routeData()
  },
  methods: {
    // 接收合并数据
    routeData() {
      let obj = {
        caseNum: this.$route.query.kw1,
      }
      this.inputList[0] = obj
      obj = {
        caseNum: this.$route.query.kw2,
      }
      this.inputList.push(obj)
      console.log(this.inputList)
      this.show = true
    },
    del(row) {
      let _this = this
      console.log(666633333)
      _this.map.graphics.remove(_this.graphicItemS[row.id])
      let fnIndex = row.id
      console.log(3333333)
      console.log(_this.graphicItemS[row.id])
      _this.mapTableData.splice(fnIndex, 1)
      _this.graphicItemS.splice(fnIndex, 1)
      console.log(_this.taskInfo.conditions)
      _this.taskInfo.conditions.forEach((item, index) => {
        console.log(item.graphicId === fnIndex)
        console.log(_this.taskInfo.conditions.length > 1)
        item.graphicId === fnIndex && _this.taskInfo.conditions.length > 1
          ? _this.taskInfo.conditions.splice(index, 1)
          : (_this.taskInfo.conditions[0] = {
              graphicId: null,
              pointLatitude: '',
              pointLongitude: '',
              date1: '',
              date2: '',
              range: 0,
              taskType: null,
            })
        console.log(_this.taskInfo.conditions[0])
      })
      console.log(_this.taskInfo.conditions)

      _this.taskInfo.conditions = _this.taskInfo.conditions.map(item => {
        item.graphicId >= fnIndex && item.graphicId--
        return item
      })
      _this.mapTableData = _this.mapTableData.map((item, index) => {
        index >= fnIndex && item.id--
        return item
      })
      _this.id--
    },
    mapDraw() {
      var _this = this
      const options = {
        // css: 'http://localhost:8080/arcgis_js_api/library/3.29/3.29/esri/css/esri.css',
        // url: 'http://localhost:8080/arcgis_js_api/library/3.29/3.29/init.js'
        // css: 'https://js.arcgis.com/3.29/esri/css/esri.css',
        // url: 'https://js.arcgis.com/3.29/init.js',

        css: 'https://js.arcgis.com/3.30/esri/css/esri.css',
        url: 'https://js.arcgis.com/3.30/',
      }
      loadModules(
        [
          'esri/basemaps',
          'esri/map',
          'esri/dijit/Scalebar',
          'esri/layers/ArcGISTiledMapServiceLayer',
          'esri/dijit/HomeButton',
          'esri/dijit/LocateButton',
          'esri/dijit/BasemapToggle',
          'esri/dijit/OverviewMap',
          'dijit/registry',
          'esri/symbols/PictureMarkerSymbol',
          'esri/geometry/Point',
          'esri/graphic',
          'esri/geometry/webMercatorUtils',
          'esri/InfoTemplate',
          'esri/SpatialReference',
          'esri/dijit/InfoWindow',
          'dojo/dom-construct',
          'dojo/dom',
          'dojo/on',
          'esri/toolbars/draw',
          'esri/symbols/SimpleMarkerSymbol',
          'esri/symbols/SimpleFillSymbol',
          'esri/geometry/geometryEngine',
          'esri/geometry/Extent',
          'esri/geometry/Geometry',

          'esri/tasks/BufferParameters',
          'esri/tasks/GeometryService',
          'esri/layers/GraphicsLayer',
          'esri/geometry/Circle',
          'dojo/dom-attr',
          'dojo/query',
          'esri/Color',
          'dojo/_base/array',
          'esri/config',
          'esri/symbols/SimpleLineSymbol',
        ],
        options,
      )
        .then(
          ([
            esriBasemaps,
            Map,
            Scalebar,
            ArcGISTiledMapServiceLayer,
            HomeButton,
            LocateButton,
            BasemapToggle,
            OverviewMap,
            registry,
            PictureMarkerSymbol,
            Point,
            Graphic,
            webMercatorUtils,
            InfoTemplate,
            SpatialReference,
            InfoWindow,
            domConstruct,
            dom,
            on,
            Draw,
            SimpleMarkerSymbol,
            SimpleFillSymbol,
            geometryEngine,
            Extent,
            Geometry,

            BufferParameters,
            GeometryService,
            GraphicsLayer,
            Circle,
            domAttr,
            query,
            Color,
            array,
            esriConfig,
            SimpleLineSymbol,
          ]) => {
            var geometryService = new GeometryService(
              'https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
            )
            esriBasemaps.delorme = {
              baseMapLayers: [
                {
                  url:
                    'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',
                },
              ],
            }

            esriConfig.defaults.io.proxyUrl = '/proxy/'
            esriConfig.defaults.io.alwaysUseProxy = false
            var infoWindow = new InfoWindow({}, domConstruct.create('div'))
            infoWindow.startup()

            _this.map = new Map('map', {
              basemap: 'delorme',
              // basemap: 'streets',
              center: [104.06667, 30.66667],
              infoWindow: infoWindow,
              zoom: 15,
              logo: false,
            })
            _this.map.centerAt()
            console.log('map')
            console.log(_this.map)
            var mapLodad = function() {
              console.log('地图加载完毕')
              _this.map.infoWindow.resize(250, 200)

              // 创建客户端图层
              _this.graphicsLayer = new GraphicsLayer()
              // 将客户端图层添加到地图中
              _this.map.addLayer(_this.graphicsLayer)

              // 定义点符号
              _this.pSymbol = new PictureMarkerSymbol(
                require('../../../assets/img/tubiao.png'),
                20,
                25,
              )
              var point
              var graphic

              if (_this.isEditor) {
                _this.editorDdata.forEach(item => {
                  if (item.taskType == 1) {
                    addPoint(
                      item.pointLongitude,
                      item.pointLatitude,
                      '描点',
                      '',
                      item.activeTimeBegin,
                      item.activeTimeEnd,
                      item.ttaskDetail1Id,
                    )
                  } else if (item.taskType == 0) {
                    bufferData(
                      item.pointLongitude,
                      item.pointLatitude,
                      item.radius,
                      _this.id,
                      item.activeTimeBegin,
                      item.activeTimeEnd,
                      item.ttaskDetail1Id,
                    )
                    _this.id++
                  }
                })
                _this.addCriteria = true
                _this.mapTableData.forEach(item => {
                  _this.rowClick(item)
                })
                _this.taskInfo.taskName = _this.editorDdata[0].name
                _this.taskInfo.date3 = _this.editorDdata[0].birthdayBegin
                _this.taskInfo.date4 = _this.editorDdata[0].birthdayEnd
                _this.taskInfo.type = _this.editorDdata[0].type
                _this.taskInfo.taskId = _this.editorDdata[0].taskId
                _this.taskInfo.taskTarget = _this.editorDdata[0].taskTarget
                _this.editorDdata[0].typeBgWb === 0
                  ? (_this.taskInfo.checkedBox = [1, 2])
                  : (_this.taskInfo.checkedBox[0] =
                      _this.editorDdata[0].typeBgWb)
              }

              on(dom.byId('casePlace'), 'click', () => {
                let obj = []
                _this.inputList.forEach(item => {
                  obj.push(item.caseNum)
                })
                _this.$api.queryTCase(obj).then(({ data }) => {
                  _this.caseData = data.data.data
                  if (_this.caseData.length < 1) {
                    _this.$message({
                      message: '未查询到坐标信息！',
                      type: 'warning',
                    })
                  }
                  _this.show = false
                  _this.caseData.forEach(item => {
                    addPoint(
                      item.longitude,
                      item.latitude,
                      '案发地点',
                      item.caseNo,
                      '',
                      '',
                      '',
                    )
                  })
                })
              })

              on(dom.byId('affirmLabel'), 'click', function() {
                _this.affirmLabel()
                _this.okTrack.forEach(item => {
                  addPoint(
                    item.longitude,
                    item.latitude,
                    '轨迹点',
                    '',
                    '',
                    '',
                    '',
                  )
                })
              })
              _this.rangeChangeMap = function(range) {
                console.log(5555)
                isNaN(range) && (range = 0)
                range === '' && (range = 0)
                _this.taskInfo.conditions.forEach(item => {
                  _this.map.graphics.remove(_this.graphicItemS[item.graphicId])
                  bufferData(
                    item.pointLongitude,
                    item.pointLatitude,
                    range,
                    item.graphicId,
                    '',
                    '',
                    '',
                  )
                })
              }

              // $('#range').bind('input propertychange', function(event) {
              //   let range = $('#range').val()
              //   console.log(5555)
              //   isNaN(range) && (range = 0)
              //   range === '' && (range = 0)
              //   _this.taskInfo.conditions.forEach(item => {
              //     _this.map.graphics.remove(_this.graphicItemS[item.graphicId])
              //     bufferData(
              //       item.pointLongitude,
              //       item.pointLatitude,
              //       range,
              //       item.graphicId,
              //       '',
              //       '',
              //       '',
              //     )
              //   })
              // })

              var drawTool = new Draw(_this.map)
              // 绘制点
              drawTool.markerSymbol = new PictureMarkerSymbol(
                require('../../../assets/img/tubiao.png'),
                20,
                25,
              )
              // 绘制几何
              drawTool.fillSymbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol('solid', new Color([197, 97, 20]), 0.5),
                new Color([197, 97, 20, 0.5]),
              )

              on(dom.byId('circle'), 'click', function() {
                _this.isInfo = false
                drawTool.activate(Draw['CIRCLE'])
              })
              on(dom.byId('point'), 'click', function() {
                _this.isInfo = false
                _this.pointType = 1
                drawTool.activate(Draw['POINT'])
              })

              drawTool.on('draw-complete', drawEndEvent)

              function drawEndEvent(evt) {
                if (evt.target._geometryType === 'circle') {
                  var length =
                    geometryEngine.geodesicLength(evt.geometry, 'meters') /
                    Math.PI // 长度公式
                  var a = evt.geometry.cache._extent
                  var newX = (a.xmin + a.xmax) / 2
                  var newY = (a.ymax + a.ymin) / 2
                  var center = webMercatorUtils.xyToLngLat(newX, newY)
                  var newObj = {
                    range: length / 2,
                    longitude: center[0].toFixed(6),
                    latitude: center[1].toFixed(6),
                    type: '描圆',
                    date1: '',
                    date2: '',
                    id: _this.id,
                    ttaskDetail1Id: '',
                  }
                  _this.id++
                  _this.mapTableData.push(newObj)
                }
                var symbol
                // 添加图形
                if (evt.geometry.type === 'point') {
                  var a1 = evt.geometry
                  var newX1 = a1.x
                  var newY1 = a1.y
                  var center1 = webMercatorUtils.xyToLngLat(newX1, newY1)
                  var newObj1 = {
                    range: 0,
                    longitude: center1[0].toFixed(6),
                    latitude: center1[1].toFixed(6),
                    type: '描点',
                    date1: '',
                    date2: '',
                    ttaskDetail1Id: '',
                    id: _this.id,
                  }
                  _this.id++
                  _this.mapTableData.push(newObj1)
                  symbol = drawTool.markerSymbol
                } else {
                  symbol = drawTool.fillSymbol
                }

                // 解除物件的启动状态
                drawTool.deactivate()
                let graphicItem = new Graphic(evt.geometry, symbol)
                _this.graphicItemS[_this.id - 1] = graphicItem
                _this.map.graphics.add(graphicItem)
              }

              function addPoint(
                x,
                y,
                type,
                caseNo,
                date1,
                date2,
                ttaskDetail1Id,
              ) {
                point = new Point(x, y, new SpatialReference({ wkid: 4326 }))
                let newObj1 = {
                  caseNo: caseNo,
                  range: 0,
                  longitude: x,
                  latitude: y,
                  date1: date1,
                  date2: date2,
                  type: type,
                  id: _this.id,
                  ttaskDetail1Id: ttaskDetail1Id,
                }
                _this.id++
                _this.mapTableData.push(newObj1)
                graphic = new Graphic(point, _this.pSymbol)
                _this.graphicItemS[_this.id - 1] = graphic
                _this.map.graphics.add(graphic)
                _this.map.centerAt(point)
              }

              function bufferData(
                x,
                y,
                radius,
                graphicId,
                date1,
                date2,
                ttaskDetail1Id,
              ) {
                var points = [
                  new Point(x, y, new SpatialReference({ wkid: 4326 })),
                ]
                let newObj1 = {
                  range: radius,
                  longitude: x,
                  latitude: y,
                  type: '描圆',
                  date1: date1,
                  date2: date2,
                  id: graphicId,
                  ttaskDetail1Id: ttaskDetail1Id,
                }
                _this.mapTableData.splice(graphicId, 1, newObj1)

                // for (var i = 0; i < points.length; i++) {
                //   map.graphics.add(new Graphic(points[i], symbol))
                // }

                var pointParams = new BufferParameters()
                pointParams.geometries = points
                pointParams.distances = [radius * 0.001]
                pointParams.unit = GeometryService.UNIT_KILOMETER
                pointParams.bufferSpatialReference = new SpatialReference({
                  wkid: 3857,
                })
                pointParams.outSpatialReference = new SpatialReference({
                  wkid: 102100,
                })

                geometryService.buffer(pointParams, function(features) {
                  var symbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                      'solid',
                      new Color([197, 97, 20]),
                      0.5,
                    ),
                    new Color([197, 97, 20, 0.5]),
                  )
                  array.forEach(features, function(geometry) {
                    var graphic = new Graphic(geometry, symbol)
                    _this.graphicItemS.splice(graphicId, 1, graphic)
                    _this.map.graphics.add(graphic)
                  })
                })
              }
            }
            _this.map.on('Load', mapLodad)
            _this.isCenter = function(x, y) {
              let mapPoint = new Point(
                x,
                y,
                new SpatialReference({ wkid: 4326 }),
              )
              _this.map.centerAt(mapPoint)
            }
          },
        )
        .catch(err => {
          console.log(err.message)
        })
    },

    addCase() {
      this.isInfo = false
      this.show = true
    },
    addCaseNum() {
      this.inputList.push({ caseNum: '' })
    },
    delectCase(index) {
      this.inputList.splice(index, 1)
    },

    isTaskInfoSshow(item) {
      console.log(item)
      this.isCenter(item.pointLongitude, item.pointLatitude)
      this.taskInfoSshow = item.graphicId
    },

    // 当前行改变
    handleCurrentChange(val) {
      console.log(6666999)
      console.log(val)
      if (val) {
        this.$refs.singleTable.setCurrentRow(val)
        this.taskInfoSshow = val.id
      }
      this.isCenter(val.longitude, val.latitude)
    },

    // 点击行
    rowClick(row, column, event) {
      console.log(222)
      console.log(row)
      if (this.addCriteria) {
        let obj = {
          graphicId: row.id,
          pointLatitude: row.latitude,
          pointLongitude: row.longitude,
          date1: row.date1,
          date2: row.date2,
          ttaskDetail1Id: row.ttaskDetail1Id,
          range: row.range,
        }
        row.caseNo === undefined ? (obj.caseNo = '') : (obj.caseNo = row.caseNo)
        row.type === '描圆' ? (obj.taskType = 0) : (obj.taskType = 1)
        if (
          this.taskInfo.conditions[0].pointLatitude !== '' &&
          this.taskInfo.conditions[0].pointLongitude !== ''
        ) {
          !this.taskInfo.conditions.some(item => {
            if (item.graphicId == row.id) {
              return true
            }
          }) && this.taskInfo.conditions.push(obj)
        } else {
          // this.taskInfo.conditions[0] = obj
          this.taskInfo.conditions[0].pointLatitude = row.latitude
          this.taskInfo.conditions[0].pointLongitude = row.longitude
          this.taskInfo.conditions[0].date1 = row.date1
          this.taskInfo.conditions[0].date2 = row.date2
          this.taskInfo.conditions[0].ttaskDetail1Id = row.ttaskDetail1Id
          this.taskInfo.conditions[0].graphicId = row.id
          this.taskInfo.conditions[0].range = row.range

          row.type === '描圆'
            ? (this.taskInfo.conditions[0].taskType = 0)
            : (this.taskInfo.conditions[0].taskType = 1)
        }
      } else {
        this.taskInfo.conditions[0].pointLatitude = row.latitude
        this.taskInfo.conditions[0].pointLongitude = row.longitude
        this.taskInfo.conditions[0].graphicId = row.id
        this.taskInfo.conditions[0].date1 = row.date1
        this.taskInfo.conditions[0].ttaskDetail1Id = row.ttaskDetail1Id
        this.taskInfo.conditions[0].date2 = row.date2
        this.taskInfo.conditions[0].range = row.range
        row.caseNo === undefined
          ? (this.taskInfo.conditions[0].caseNo = '')
          : (this.taskInfo.conditions[0].caseNo = row.caseNo)
        console.log(this.taskInfo)

        row.type === '描圆'
          ? (this.taskInfo.conditions[0].taskType = 0)
          : (this.taskInfo.conditions[0].taskType = 1)
      }
    },

    rangeChange(range) {
      this.rangeChangeMap(range)
    },

    search() {
      var _this = this
      let obj = []
      this.inputList.forEach(item => {
        obj.push(item.caseNum)
      })
      this.$api.queryTCase(obj).then(({ data }) => {
        _this.caseData = data.data.data
        if (_this.caseData.length > 0) {
          this.$message({
            message: '未查询到坐标信息！',
            type: 'warning',
          })
        }
        this.show = false
      })
    },

    // 跳转任务管理
    toManage() {
      this.$router.push({
        name: 'taskManage',
      })
    },

    cancel() {
      this.show = false
    },
    // 轨迹点搜索
    trackSearch(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var _this = this
          console.log(this.trackForm.checkedBox.length)
          let obj = {
            idNumber: this.trackForm.nameId,
            activeTimeBegin: this.trackForm.startDate,
            activeTimeEnd: this.trackForm.endDate,
            typeBgWb:
              this.trackForm.checkedBox.length === 1
                ? this.trackForm.checkedBox[0]
                : 0,
          }
          this.$api.tracing(obj).then(({ data }) => {
            console.log(data)
            _this.trackShow = false
            _this.trackList = data.data
            _this.trackShow2 = true
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 保存任务
    taskSave() {
      let _this = this
      console.log(this.taskInfo)
      let data = []
      this.taskInfo.conditions.forEach(item => {
        let obj = {
          // activeTimeBegin: item.date1,
          // activeTimeEnd: item.date2,
          // birthdayBegin: this.taskInfo.date3,
          // birthdayEnd: this.taskInfo.date4,
          activeTimeBegin:
            formatDate(new Date(item.date1), 'yyyy-MM-dd') + ' ' + '00:00:00',
          activeTimeEnd:
            formatDate(new Date(item.date2), 'yyyy-MM-dd') + ' ' + '23:59:59',
          birthdayBegin:
            this.taskInfo.date3 == ''
              ? ''
              : formatDate(new Date(this.taskInfo.date3), 'yyyy-MM-dd'),
          birthdayEnd:
            this.taskInfo.date4 == ''
              ? ''
              : formatDate(new Date(this.taskInfo.date4), 'yyyy-MM-dd'),
          caseNo: item.caseNo,
          createId: this.taskInfo.createId,
          createName: this.taskInfo.createName,
          name: this.taskInfo.taskName,
          pointLatitude: item.pointLatitude,
          pointLongitude: item.pointLongitude,
          radius: item.range,
          taskId: this.taskInfo.taskId,
          taskTarget: this.taskInfo.taskTarget,
          taskType: item.taskType,
          type: this.taskInfo.type,
          typeBgWb:
            this.taskInfo.checkedBox.length === 1
              ? this.taskInfo.checkedBox[0]
              : 0,
        }
        if (_this.isEditor) {
          obj.updateId = Cookies.get('userId')
          obj.ttaskDetail1Id = item.ttaskDetail1Id
        }
        data.push(obj)
      })
      if (_this.isEditor) {
        this.$api.saveCompile(data).then(({ data }) => {
          if (data.msg === '成功') {
            console.log(data)
            _this.$message({
              message: '任务编辑成功!',
              type: 'success',
            })
          } else {
            this.$message({
              message: '任务编辑失败!',
              type: 'error',
            })
          }
        })
      } else {
        this.$api.seriesParallel(data).then(({ data }) => {
          if (data.msg === '成功') {
            console.log(data)
            _this.$message({
              message: '任务保存成功!',
              type: 'success',
            })
          } else {
            this.$message({
              message: '任务保存失败!',
              type: 'error',
            })
          }
        })
      }
    },

    // 暂存任务
    taskStaging() {},

    // 重置任务
    taskReset() {
      let taskInfo = {
        caseNo: '',
        createId: '',
        createName: '',
        taskName: '',
        conditions: [
          {
            graphicId: null,
            pointLatitude: '',
            pointLongitude: '',
            date1: '',
            date2: '',
            range: 0,
            taskType: null,
          },
        ],
        date3: '',
        date4: '',
        type: 0,
        taskId: 0,
        taskTarget: '',
        checkedBox: [1, 2],
      }
      this.taskInfo = taskInfo
    },

    // 添加条件
    setTerm() {
      this.isInfo = false
      this.addCriteria = !this.addCriteria
      // let obj = {
      //   date1: '',
      //   date2: '',
      //   range: 0,
      // }
      // this.taskInfo.conditions.push(obj)
    },

    // 清空轨迹点信息
    trackClear() {},

    // 确认标注
    affirmLabel() {
      this.trackShow2 = false
    },
    getRowKey(row) {
      console.log(row)
    },
    handleSelectionChange(selection) {
      this.okTrack = selection
    },
  },
}
</script>
<style lang="stylus" scoped>
.mod-ticket.ticket-bg
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  &:before
    position fixed
    top 0
    left 0
    z-index -1
    width 100%
    height 100%
    content ''
    background url('~@/assets/img/i2bg.png') no-repeat center
    background-size cover

.header-container .title
  background rgba(44, 239, 255, 0.5)

.el-tabs--border-card
  display flex
  justify-content center
  background rgba(44, 239, 255, 0.3)
  border 2px solid rgba(44, 239, 255, 0.3)
  border-left none
  border-right none
  height 72px
  align-items center

>>> .el-tabs__header
  background rgba(44, 239, 255, 0) !important
  border none !important

>>> .el-tabs__item.is-active
  background rgba(44, 239, 255, 0) !important
  color orange!important

>>> .el-tabs__item:hover
  color orange!important

>>> .el-tabs__item
  color #ffffff!important
  border none !important

.title
  display flex
  justify-content center
  & > h1
    margin 0
    color white
    font-size 33px

.el-tabs p
  margin 0
  transform translate(-14px, -14px)

.menubar > .sidebar
  position absolute !important
  left 0

.fun-sidebar > .sidebar
  position absolute !important
  right 0
  bottom 0
  width 295px

.fun-sidebar .sidebar-inner
  width 320px
  height 100% !important

.box
  display flex

.content
  position relative
  margin-left 160px
  flex 0 1 auto

.el-form-item__label
  color white

a
  color #909399

a:focus, a:hover
  color #e58627

#map
  width 1225px
  height 850px

.caseMap .el-input-group
  width 90%

.caseButton
  display flex
  justify-content center

.rightPanel
  padding 20px
  font-size 14px
  color white

.rightPanel .buttonNav
  display flex
  align-items center

.rightPanel .buttonNav > div
  display flex
  align-items center

>>> .fun-sidebar .sidebar-inner
  width 295px
  height 100%

.buttonNav .el-button
  padding 5px

.resourceBtn .activeType
  background: rgba(99, 206, 202, 0.6) !important

.conditionItem p
  margin-left 10px

>>> .el-date-editor.el-input
  margin-left 10px

>>> .el-checkbox
  color #ffffff

>>> .el-checkbox-group
  display flex
  justify-content center
  align-items center
  height 50px

>>> h4
  margin 0
  margin-top 30px
  padding-bottom 10px
  border-bottom 1px dashed white

.inputStyle
  display flex

.inputStyle p
  margin-right 20px
  width 30px
  flex 0 0 auto

.mod-ticket >>>
  .el-table .current-row
    background-color rgba(44, 239, 255, 0.3) !important

  .el-table--border
    border 1px solid rgba(0, 0, 0, 0.3)

  .el-table th, .el-table tr, .el-table--border td
    background-color rgba(44, 239, 255, 0.4) !important
    border 1px solid rgba(0, 0, 0, 0.3) !important

  .el-table--border::after, .el-table--group::after
    width 0px

  .el-table::before
    height 0px

  .el-table thead
    color white

  .el-table td, .el-table th.is-leaf
    border 1px solid #0d353f

  .el-table tbody tr:hover > td
    background-color rgba(44, 239, 255, 0.4)

.mapTable .el-table
  background-color #0d353f !important
  color white

.mapTable >>>
  .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row>td,
  .el-table__body tr.hover-row.current-row>td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row>td
    background: rgba(44,239,255,0.5)


>>> .el-input__inner
  background-color rgba(44, 239, 255, 0.3)!important
  border: solid 1px #2cefff;
  color white
</style>
<style lang="stylus">
.mod-ticket .box
  .dialog .form
    padding 10px 20px

.mod-ticket .dialog .el-form
  margin 0 auto

.mod-ticket .dialog .el-form-item
  margin 20px auto

.mod-ticket .dialog .el-form-item__error
  top 40px
  left 0px

.mod-ticket .dialog .el-dialog
  background: rgba(8, 52, 56, 0.6) !important

.mod-ticket .el-dialog .el-dialog__body .body-content .fly-dialog-body
  padding 20px 0

.mod-ticket .dialog .el-date-editor.el-input
  margin-left 0px
  display: inline-block;
  width: 49%;

.mod-ticket .el-date-picker__header-label
  color #606266 !important

.mod-ticket .dialog .el-date-editor.el-input:nth-child(2)
  margin-left 2%

/*隐藏进度条*/
.dialog .el-table__body-wrapper::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.dialog .el-table__body-wrapper::-webkit-scrollbar-button {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-webkit-scrollbar-corner {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-webkit-scrollbar-resizer {
  background-color: rgba(0, 0, 0, 0);
}

/*o内核*/
.dialog .el-table__body-wrapper .-o-scrollbar {
  width: 0px;
  height: 0px;
  -moz-appearance: none !important;
  background: rgba(0, 255, 0, 0) !important;
}

.dialog .el-table__body-wrapper::-o-scrollbar-button {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-o-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-o-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-o-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-o-scrollbar-corner {
  background-color: rgba(0, 0, 0, 0);
}

.dialog .el-table__body-wrapper::-o-scrollbar-resizer {
  background-color: rgba(0, 0, 0, 0);
}

/*IE10,IE11,IE12*/
.dialog .el-table__body-wrapper {
  -ms-scroll-chaining: chained;
  -ms-overflow-style: none;
  -ms-content-zooming: zoom;
  -ms-scroll-rails: none;
  -ms-content-zoom-limit-min: 100%;
  -ms-content-zoom-limit-max: 500%;
  -ms-scroll-snap-type: proximity;
  -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
  -ms-overflow-style: none;
  overflow: auto;
}
</style>
