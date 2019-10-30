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
            <div @click="trackShow = true" slot="label">
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
                        :disabled="item.taskType !== 0"
                        style="margin-left:10px;width:87%;"
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
                      :class="{ activeType: taskInfo.type === 0 }"
                      >查人
                    </el-button>
                    <el-button
                      @click="taskInfo.type = 1"
                      type="primary"
                      :class="{ activeType: taskInfo.type === 1 }"
                      >查案
                    </el-button>
                  </div>
                </div>
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
          </sidebar>
        </div>
        <div class="dialog">
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
            <!--<div class="caseButton">-->
            <!--&lt;!&ndash;<el-button  @click="search" type="success"&ndash;&gt;-->
            <!--<el-button class="casePlace" type="success">查询</el-button>-->
            <!--<el-button @click="cancel" type="warning">取消</el-button>-->
            <!--</div>-->
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
        <div
          style="position:absolute;z-index:30;left:160px;bottom:20px;width:500px;"
          class="mapTable"
        >
          <el-table
            :data="mapTableData"
            height="245px"
            @current-change="handleCurrentChange"
            @row-click="rowClick"
            :row-key="getRowKey"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              width="100"
              align="center"
              label="编号"
            >
            </el-table-column>
            <el-table-column prop="longitude" align="center" label="经度">
            </el-table-column>
            <el-table-column prop="latitude" align="center" label="纬度">
            </el-table-column>
            <el-table-column prop="type" align="center" label="类型">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <button
                  :data-index="scope.row.id"
                  @click="delId = scope.row.id"
                  class="el-icon-delete-solid removeLayer"
                ></button>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="false">
            <el-input id="delId" v-model="delId"></el-input>
          </div>
        </div>
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

export default {
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
        checkedBox: [],
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
          },
        ],
        date3: '',
        date4: '',
        type: 0,
        taskId: 0,
        taskTarget: '',
        checkedBox: [1, 2],
      },
      boxs: [{ name: '旅馆', label: 1 }, { name: '网吧', label: 2 }],

      caseData: [],
      showInfo: this.$route.params.id,
      pointType: 1,
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.isInfo = this.$route.params.flag
    this.mapDraw()
  },
  methods: {
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
            var map = new Map('map', {
              basemap: 'delorme',
              // basemap: 'streets',
              center: [104.06667, 30.66667],
              infoWindow: infoWindow,
              zoom: 15,
              logo: false,
            })
            map.on('Load', function() {
              console.log('地图加载完毕')
              map.infoWindow.resize(250, 200)

              // 创建客户端图层
              var graphicsLayer = new GraphicsLayer()
              // 将客户端图层添加到地图中
              map.addLayer(graphicsLayer)

              // 定义点符号
              var pSymbol = new PictureMarkerSymbol(
                require('../../../assets/img/tubiao.png'),
                20,
                25,
              )
              // 定义面符号
              // var fill = SimpleFillSymbol()
              var id = 0
              // 声明一个类型和图形
              var point
              // var circle
              var graphic
              // on(dom.byId('casePlace'), 'click', function() {
              // query('#casePlace').bind('click', function() {
              // query('#casePlace').on('click', function() {
              //   // query('#casePlace').click(function() {
              //   // on($('#casePlace'), 'click', function() {
              //   // _this.pointType = 2
              //   _this.search()
              //   console.log(5555555555)
              //   addPoint(104.069696, 30.677559, '案发地点')
              //   // dom.byId('point')
              //   // drawTool.activate(Draw['POINT'])
              //   // drawEndEvent()
              // })
              on(dom.byId('casePlace'), 'click', function() {
                _this.search()
                _this.caseData.forEach(item => {
                  addPoint(
                    item.longitude,
                    item.latitude,
                    '案发地点',
                    item.caseNo,
                  )
                })
              })

              on(dom.byId('affirmLabel'), 'click', function() {
                _this.affirmLabel()
                _this.okTrack.forEach(item => {
                  addPoint(item.longitude, item.latitude, '轨迹点', '')
                })
              })
              $('#range').bind('input propertychange', function(event) {
                let range = $('#range').val()
                isNaN(range) && (range = 0)
                range === '' && (range = 0)
                _this.taskInfo.conditions.forEach(item => {
                  map.graphics.remove(_this.graphicItemS[item.graphicId])
                  bufferData(
                    item.pointLongitude,
                    item.pointLatitude,
                    range,
                    item.graphicId,
                  )
                })
              })
              $('#delId').bind('input propertychange', function(event) {
                console.log('成功')
              })
              $('.removeLayer').bind('click', function(event) {
                console.log('成功')
              })

              // 删除图形
              // query('.casePlace').on('click', function(e) {
              //   console.log(12122)
              //   console.log(e)
              //   console.log(121212)
              // })

              var drawTool = new Draw(map)
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
                drawTool.activate(Draw['CIRCLE'])
              })
              on(dom.byId('point'), 'click', function() {
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
                    id,
                  }
                  id++
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
                    id,
                  }
                  id++
                  _this.mapTableData.push(newObj1)
                  symbol = drawTool.markerSymbol
                } else {
                  symbol = drawTool.fillSymbol
                }

                // 解除物件的启动状态
                drawTool.deactivate()
                let graphicItem = new Graphic(evt.geometry, symbol)
                console.log(555555)
                console.log(_this.graphicItemS)
                // _this.graphicItemS.push(graphicItem)
                _this.graphicItemS[id - 1] = graphicItem
                console.log(_this.graphicItemS)
                map.graphics.add(graphicItem)

                // 删除图形
                setTimeout(
                  () => {
                    // off()click操作中的累积效果
                    $('.removeLayer')
                      .off('click')
                      .on('click', e => {
                        let i = Number(e.target.dataset.index)
                        map.graphics.remove(_this.graphicItemS[i])
                        let fnIndex = _this.mapTableData.findIndex(fn)

                        console.log(3333333)
                        console.log(_this.graphicItemS)
                        _this.mapTableData.splice(fnIndex, 1)
                        _this.graphicItemS.splice(fnIndex, 1)
                        _this.taskInfo.conditions.forEach((item, index) => {
                          item.graphicId === fnIndex &&
                          _this.taskInfo.conditions.length > 1
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
                        })

                        _this.taskInfo.conditions = _this.taskInfo.conditions.map(
                          item => {
                            item.graphicId >= fnIndex && item.graphicId--
                            return item
                          },
                        )
                        _this.mapTableData = _this.mapTableData.map(
                          (item, index) => {
                            index >= fnIndex && item.id--
                            return item
                          },
                        )
                        id--
                        function fn(num, numIndex, nums) {
                          return num.id === i
                        }
                      })
                  },
                  500,
                  evt,
                  map,
                  graphicItem,
                )
              }

              function addPoint(x, y, type, caseNo) {
                // 104.069696,
                // 30.677559,
                // x = 104.071112
                // y = 30.672724
                point = new Point(x, y, new SpatialReference({ wkid: 4326 }))
                let newObj1 = {
                  caseNo: caseNo,
                  range: 0,
                  longitude: x,
                  latitude: y,
                  type: type,
                  id,
                }
                id++
                _this.mapTableData.push(newObj1)
                graphic = new Graphic(point, pSymbol)
                _this.graphicItemS[id - 1] = graphic
                map.graphics.add(graphic)
              }

              function bufferData(x, y, radius, graphicId) {
                console.log(graphicId)
                var points = [
                  new Point(x, y, new SpatialReference({ wkid: 4326 })),
                ]
                let newObj1 = {
                  range: radius,
                  longitude: x,
                  latitude: y,
                  type: '描圆',
                  id: graphicId,
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
                  console.log(666)
                  console.log(_this.graphicItemS)
                  array.forEach(features, function(geometry) {
                    var graphic = new Graphic(geometry, symbol)
                    _this.graphicItemS.splice(graphicId, 1, graphic)
                    map.graphics.add(graphic)
                  })
                  console.log(_this.graphicItemS)
                })
              }
            })
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
    // 当前行改变
    handleCurrentChange(val) {
      console.log(val)
    },

    // 点击行
    rowClick(row, column, event) {
      console.log(11111)
      console.log(row)
      if (this.addCriteria) {
        let obj = {
          graphicId: row.id,
          pointLatitude: row.latitude,
          pointLongitude: row.longitude,
          date1: '',
          date2: '',
          range: row.range,
        }
        row.caseNo === undefined ? (obj.caseNo = '') : (obj.caseNo = row.caseNo)
        row.type === '描圆' ? (obj.taskType = 0) : (obj.taskType = 1)
        if (
          this.taskInfo.conditions[0].pointLatitude !== '' &&
          this.taskInfo.conditions[0].pointLongitude !== ''
        ) {
          this.taskInfo.conditions.push(obj)
        } else {
          // this.taskInfo.conditions[0] = obj
          this.taskInfo.conditions[0].pointLatitude = row.latitude
          this.taskInfo.conditions[0].pointLongitude = row.longitude
          this.taskInfo.conditions[0].graphicId = row.id
          this.taskInfo.conditions[0].range = row.range
          console.log(this.taskInfo)

          row.type === '描圆'
            ? (this.taskInfo.conditions[0].taskType = 0)
            : (this.taskInfo.conditions[0].taskType = 1)
        }
      } else {
        this.taskInfo.conditions[0].pointLatitude = row.latitude
        this.taskInfo.conditions[0].pointLongitude = row.longitude
        this.taskInfo.conditions[0].graphicId = row.id
        this.taskInfo.conditions[0].range = row.range
        row.caseNo === undefined
          ? (this.taskInfo.conditions[0].caseNo = '')
          : (this.taskInfo.conditions[0].caseNo = row.caseNo)
        console.log(this.taskInfo)

        row.type === '描圆'
          ? (this.taskInfo.conditions[0].taskType = 0)
          : (this.taskInfo.conditions[0].taskType = 1)

        console.log(column)
        console.log(event)
      }
    },

    search() {
      var _this = this
      let obj = []
      this.inputList.forEach(item => {
        obj.push(item.caseNum)
      })
      console.log(22222)
      console.log(obj)
      this.$api.queryTCase(obj).then(({ data }) => {
        _this.caseData = data.data.data
        console.log(data)
        console.log(data.data.data)
        console.log(_this.caseData)
        this.show = false
        console.log(2222)
        console.log(_this.mapTableData)
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
          activeTimeBegin: item.date1,
          activeTimeEnd: item.date2,
          birthdayBegin: this.taskInfo.date3,
          birthdayEnd: this.taskInfo.date4,
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
        data.push(obj)
      })

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

>>> .el-tabs__item
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

.mapTable .el-table
  background-color #0d353f !important

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
