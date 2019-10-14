<template>
  <div class="unioncaseCoat">
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
            <div slot="label">
              <img src="../../../assets/img/casedizhi.png" alt="" />
              <p>轨迹点</p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div slot="label">
              <img src="../../../assets/img/caseshezhi.png" alt="" />
              <p>设定条件</p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div slot="label">
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
      <div class="fun-sidebar">
        <sidebar type="tabpanel">
          <div class="rightPanel">
            <div class="buttonNav">
              <span style="color:white;margin-right:10px">设定条件</span>
              <div>
                <el-button type="primary">保存任务</el-button>
                <el-button type="success">暂存</el-button>
                <el-button type="warning">重置</el-button>
              </div>
            </div>
            <div class="task">
              <h4>任务名称</h4>
              <p style="margin:5px 0;">任务名称</p>
              <el-input v-model="taskName"></el-input>
            </div>
            <div class="condition">
              <h4>条件参数</h4>
              <div
                class="conditionItem"
                style="border:1px solid white;margin-top:30px;padding:30px 0 10px 0;border-radius:5px;padding-right: 10px;"
              >
                <p>活动时间段</p>
                <div class="inputStyle">
                  <p>起</p>
                  <el-date-picker
                    v-model="date1"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
                <div class="inputStyle">
                  <p>止</p>
                  <el-date-picker
                    v-model="date2"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
                <div class="inputStyle">
                  <p>范围</p>
                  <el-input
                    style="margin-left:10px;width:87%;"
                    v-model="range"
                  ></el-input>
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
                  <el-button type="primary">查人</el-button>
                  <el-button type="primary">查案</el-button>
                </div>
              </div>
              <p>出生时间段</p>
              <div class="inputStyle">
                <p>起</p>
                <el-date-picker
                  v-model="date3"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <div class="inputStyle">
                <p>止</p>
                <el-date-picker
                  v-model="date4"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
              <el-checkbox-group v-model="checkedBox" :min="1" :max="2">
                <el-checkbox
                  v-for="(item, index) in boxs"
                  :label="item.name"
                  :key="index"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
        </sidebar>
      </div>
      <flyDialog :show.sync="show" class="caseMap" :width="width">

      </flyDialog>
      <div
        style="position:absolute;z-index:30;left:160px;bottom:20px;width:500px;"
        class="mapTable"
      >
        <el-table
          :data="mapTableData"
          height="245px"
          :row-key="getRowKey"
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
              <button
                :data-index="scope.row.id"
                class="el-icon-delete-solid removeLayer"
              ></button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
import Sidebar from '@/views/common/Sidebar'
import SidemenuItem from '@/views/common/SidemenuItem'
import flyDialog from '@/components/fly-dialog'
export default {
  components: {
    Sidebar,
    SidemenuItem,
    flyDialog,
  },
  props: {},
  data() {
    return {
      activeName: 'Second',
      show: false,
      width: '400px',
      inputList: [{ caseNum: '' }],
      mapTableData: [],
      graphicItemS: [],
      taskName: '',
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      range: '',
      checkedBox: ['旅馆', '网吧'],
      boxs: [{ name: '旅馆' }, { name: '网吧' }],
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.mapDraw()
  },
  methods: {
    mapDraw() {
      var _this = this
      const options = {
        // css: 'http://localhost:8080/arcgis_js_api/library/3.29/3.29/esri/css/esri.css',
        // url: 'http://localhost:8080/arcgis_js_api/library/3.29/3.29/init.js'
        css: 'https://js.arcgis.com/3.29/esri/css/esri.css',
        url: 'https://js.arcgis.com/3.29/init.js',
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
          'dojo/domReady',
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
          ]) => {
            esriBasemaps.delorme = {
              baseMapLayers: [
                {
                  url:
                    'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',
                },
              ],
            }
            var infoWindow = new InfoWindow({}, domConstruct.create('div'))
            infoWindow.startup()
            var map = new Map('map', {
              basemap: 'delorme',
              center: [104.06667, 30.66667],
              infoWindow: infoWindow,
              zoom: 15,
              logo: false,
            })
            map.on('Load', function() {
              console.log('地图加载完毕')
              map.infoWindow.resize(250, 200)
            })
            var drawTool = new Draw(map)
            drawTool.markerSymbol = new SimpleMarkerSymbol()
            drawTool.fillSymbol = new SimpleFillSymbol()
            on(dom.byId('circle'), 'click', function() {
              drawTool.activate(Draw['CIRCLE'])
            })
            on(dom.byId('point'), 'click', function() {
              drawTool.activate(Draw['POINT'])
            })
            var id = 0
            drawTool.on('draw-complete', drawEndEvent)
            function drawEndEvent(evt) {
              console.log(evt)
              if (evt.target._geometryType === 'circle') {
                var length =
                  geometryEngine.geodesicLength(evt.geometry, 'meters') /
                  Math.PI // 长度公式
                _this.range = length / 2
                var a = evt.geometry.cache._extent
                var newX = (a.xmin + a.xmax) / 2
                var newY = (a.ymax + a.ymin) / 2
                var center = webMercatorUtils.xyToLngLat(newX, newY)
                var newObj = {
                  longitude: center[0].toFixed(6),
                  latitude: center[1].toFixed(6),
                  type: '描圆',
                  id,
                }
                id++
                _this.mapTableData.push(newObj)
              }
              if (evt.geometry.type === 'point') {
                var a1 = evt.geometry
                var newX1 = a1.x
                var newY1 = a1.y
                var center1 = webMercatorUtils.xyToLngLat(newX1, newY1)
                var newObj1 = {
                  longitude: center1[0].toFixed(6),
                  latitude: center1[1].toFixed(6),
                  type: '描点',
                  id,
                }
                id++
                _this.mapTableData.push(newObj1)
                var symbol
                symbol = drawTool.markerSymbol
              } else {
                symbol = drawTool.fillSymbol
              }
              drawTool.deactivate()
              let graphicItem = new Graphic(evt.geometry, symbol)
              _this.graphicItemS.push(graphicItem)
              map.graphics.add(graphicItem)
              setTimeout(
                () => {
                  $('.removeLayer')
                    .off('click')
                    .on('click', e => {
                      let id = Number(e.target.dataset.index)
                      map.graphics.remove(_this.graphicItemS[id])
                      _this.mapTableData.splice(
                        _this.mapTableData.findIndex(fn),
                        1,
                      )
                      function fn(num, numIndex, nums) {
                        console.log(nums, num, id)
                        return num.id === id
                      }
                      console.log(evt.geometry, map)
                    })
                },
                500,
                evt,
                map,
                graphicItem,
              )
            }
          },
        )
        .catch(err => {
          console.log(err.message)
        })
    },
    addCase() {
      this.show = true
    },
    addCaseNum() {
      this.inputList.push({ caseNum: '' })
    },
    delectCase(index) {
      this.inputList.splice(index, 1)
    },

    ss() {
      alert(1)
      this.show = false
      alert(22222)
      var _this = this
      console.log(11111111)
      console.log(this.inputList)
      // let obj = {
      //   caseNoArr: this.inputList,
      // }
      let obj = ['18280502222']
      this.$api.queryTCase(obj).then(({ data }) => {
        _this.$message({
          message: '添加案件编号!',
          type: 'success',
        })
        _this.onSubmit()
        console.log(data)
      })
    },
    cancel() {
      this.show = false
    },
    getRowKey(row) {
      console.log(row)
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
>>>.el-tabs__header
  background rgba(44, 239, 255, 0) !important
  border none !important
>>>.el-tabs__item.is-active
  background rgba(44, 239, 255, 0) !important
>>>.el-tabs__item
  border none !important
.title
  display flex
  justify-content center
  &>h1
    margin 0
    color white
    font-size 33px
.el-tabs p
  margin 0
  transform translate(-14px, -14px)
.menubar>.sidebar
  left 0
.fun-sidebar >.sidebar
  right 0
  bottom 0
  width 295px
.fun-sidebar .sidebar-inner
  width 320px
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
.rightPanel .buttonNav>div
  display flex
  align-items center
>>>.fun-sidebar .sidebar-inner
  width 295px
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
