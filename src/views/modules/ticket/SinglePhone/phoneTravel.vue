<template>
  <div class="container">
    <el-form :inline="true" :model="callForm" class="demo-form-inline">
      <el-form-item label="呼叫时间">
        <el-date-picker
          v-model="callForm.time"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div id="mapContainer">
      <div
        id="map"
        data-dojo-type="dijit/layout/ContentPane"
        data-dojo-props="region:'center'"
        style="padding:0"
      >
        <div id="HomeButton"></div>
        <div id="LocateButton"></div>
        <div id="BasemapToggle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../../../utils/dateFormat.js'
import { loadModules } from 'esri-loader'
export default {
  data() {
    return {
      map: null,
      againDrow: null,

      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      callForm: {
        time: '',
      },
      positionArray: [
        { x: 104.06667, y: 30.66667 },
        { x: 104.06667, y: 30.66769 },
        { x: 205.06667, y: 30.66769 },
        { x: 30.06667, y: 200.66769 },
      ],
      phoneInfo: [],
      phoneInfo2: [],
    }
  },
  mounted() {
    // this.phoneInfo = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.phoneInfo = JSON.parse(localStorage.getItem('phoneInfo'))
    this.mapDraw()
  },
  methods: {
    onSubmit() {
      let data = this.phoneInfo
      this.phoneInfo2 = data
      let conData = this.callForm
      console.log('分析查询')
      console.log(this.phoneInfo2)
      conData.time != null && this.timeSizer()
      console.log(555)
      console.log(this.phoneInfo2)
      console.log(555)
      this.positionArray = this.addPoint(this.phoneInfo2)
      console.log(111)
      console.log(this.positionArray)
      console.log(this.phoneInfo2)
      console.log(111)
      this.map !== null && this.map.graphics.clear()
      this.againDrow(this.positionArray)
    },

    // 添加经纬度坐标
    addPoint(data) {
      let arr = []
      data.forEach(item => {
        let point = {}
        point.x = item.jingdu
        point.y = item.weidu
        arr.push(point)
      })
      return arr
    },

    // 时间筛选
    timeSizer() {
      let data = this.phoneInfo2
      let time = this.callForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.phoneInfo2 = dataArr.sort(
        (a, b) =>
          new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime(),
      )
    },
    /**
     * 判断是否在时间段内
     * converseTime 要判断的时间 stime 开始时间 etime 结束时间
     */
    compareTime(changeTime, stime, etime) {
      changeTime = formatDate(new Date(changeTime), 'yyyy-MM-dd hh:mm:ss')
      stime = formatDate(new Date(stime), 'yyyy-MM-dd hh:mm:ss')
      etime = formatDate(new Date(etime), 'yyyy-MM-dd hh:mm:ss')

      // 转换时间格式，并转换为时间戳
      function tranDate(time) {
        return new Date(time.replace(/-/g, '/')).getTime()
      }

      // 开始时间
      let startTime = tranDate(stime)
      // 结束时间
      let endTime = tranDate(etime)
      let nowTime = tranDate(changeTime)
      // 如果当前时间处于时间段内，返回true，否则返回false
      if (nowTime < startTime || nowTime > endTime) {
        return false
      }
      return true
    },

    timeChange(time) {
      var newTime = time.map(function(item) {
        var d = new Date(item)
        var newItem =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1) +
          '-' +
          d.getDate() +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes() +
          ':' +
          d.getSeconds()
        return newItem
      })
      return newTime
    },
    mapDraw() {
      const options = {
        css: true,
        version: '3.29',
      }
      var _this = this
      loadModules(
        [
          'esri/basemaps',
          'esri/map',
          'esri/Color',
          'esri/dijit/Scalebar',
          'esri/layers/ArcGISTiledMapServiceLayer',
          'esri/dijit/HomeButton',
          'esri/dijit/LocateButton',
          'esri/dijit/BasemapToggle',
          'esri/dijit/OverviewMap',
          'dijit/registry',
          'esri/symbols/PictureMarkerSymbol',
          'esri/symbols/SimpleLineSymbol',
          'esri/geometry/Point',
          'esri/geometry/Polyline',
          'esri/graphic',
          'esri/geometry/webMercatorUtils',
          'esri/InfoTemplate',
          'esri/SpatialReference',
          'dojo/domReady',
        ],
        options,
      )
        .then(
          ([
            esriBasemaps,
            Map,
            Color,
            Scalebar,
            ArcGISTiledMapServiceLayer,
            HomeButton,
            LocateButton,
            BasemapToggle,
            OverviewMap,
            registry,
            PictureMarkerSymbol,
            SimpleLineSymbol,
            Point,
            Polyline,
            Graphic,
            webMercatorUtils,
            InfoTemplate,
            SpatialReference,
          ]) => {
            _this.domDestroy(registry)
            esriBasemaps.delorme = {
              baseMapLayers: [
                {
                  url:
                    'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',
                },
              ],
            }
            _this.map = new Map('map', {
              basemap: 'delorme',
              center: [104.06667, 30.66667],
              zoom: 15,
            })
            var toggle = new BasemapToggle(
              {
                map: _this.map,
                basemap: 'satellite',
              },
              'BasemapToggle',
            )
            toggle.startup()
            var home = new HomeButton(
              {
                map: _this.map,
              },
              'HomeButton',
            )
            home.startup()
            var geoLocate = new LocateButton(
              {
                map: _this.map,
              },
              'LocateButton',
            )
            geoLocate.startup()
            var overviewMapDijit = new OverviewMap({
              map: _this.map,
              expandFactor: 2,
              attachTo: 'bottom-left',
              visible: true,
            })
            overviewMapDijit.startup()
            // eslint-disable-next-line
            dojo.connect(_this.map, 'onLoad', graphicLoad)
            function graphicLoad() {
              console.log(
                webMercatorUtils.xyToLngLat(
                  13184586.725552682,
                  3951448.604221201,
                ),
              )
            }
            _this.againDrow = arr => {
              var newPoint
              var LineSymbol
              var picSymbol
              var picGraphic
              var infoTemplate

              LineSymbol = new SimpleLineSymbol()
              LineSymbol.setMarker({
                style: 'arrow',
                placement: 'end',
              })
              // LineSymbol.setColor(new Color([250, 150, 0, 1]))
              // LineSymbol.setColor(new Color([3, 84, 245, 1]))
              LineSymbol.setColor(new Color([247, 31, 7, 0.5]))
              LineSymbol.setWidth(3)
              let postLineData = arr.map(function(item, index) {
                newPoint = new Point(
                  item.x,
                  item.y,
                  new SpatialReference({ wkid: 4326 }),
                )
                picSymbol = new PictureMarkerSymbol(
                  require('../../../../assets/img/starttb.png'),
                  25,
                  25,
                )
                picSymbol.setOffset(0, 13)
                index == 0 && _this.map.centerAt(newPoint)
                picGraphic = new Graphic(newPoint, picSymbol)
                _this.map.graphics.add(picGraphic)
                return item
              })
              for (let i = 0; i < postLineData.length - 1; i++) {
                var polyline = Polyline([
                  [postLineData[i].x, postLineData[i].y],
                  [postLineData[i + 1].x, postLineData[i + 1].y],
                ])
                picGraphic = new Graphic(polyline, LineSymbol)
                infoTemplate = new InfoTemplate()
                infoTemplate.setTitle('手机轨迹')
                infoTemplate.setContent('轨迹分析')
                picGraphic.setInfoTemplate(infoTemplate)
                _this.map.graphics.add(picGraphic)
              }
            }
          },
        )
        .catch(err => {
          console.error(err)
        })
    },
    domDestroy(registry) {
      console.log(registry)
      if (registry.byId('HomeButton')) {
        registry.byId('HomeButton').destroy()
        $('#mapContainer').append('<div id="HomeButton"></div>')
      }
      if (registry.byId('LocateButton')) {
        registry.byId('LocateButton').destroy()
        $('#mapContainer').append('<div id="LocateButton"></div>')
      }
      if (registry.byId('BasemapToggle')) {
        registry.byId('BasemapToggle').destroy()
        $('#mapContainer').append('<div id="BasemapToggle"></div>')
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
.container
  width 1100px
  margin 0 auto
  padding 0px
  h2
    text-align center
    padding 30px
    font-size 18px
  #myMap
    width 100%
    height 500px
    margin 0 auto
.tableMap
  position absolute
  left 60px
  z-index 100
  width 220px
>>>.el-dialog
  left 90%
#order >>>.el-dialog
  left 50%
>>>#map
  height 500px
>>>#BasemapToggle
  position absolute
  right 40px
  top 236px
  z-index 50
>>>#HomeButton
  left 81px
  position absolute
  top 318px
  z-index 50
>>>#LocateButton
  left 81px
  position absolute
  top 348px
  z-index 50
>>>.esriOverviewMap.ovwBL .ovwContainer
  left 60px
  bottom 60px
>>>.esriOverviewMap .ovwButton
  left 60px
  bottom 60px
>>>.esriSimpleSliderVertical .esriSimpleSliderIncrementButton:focus
  border none
  outline none
>>>.esriSimpleSliderVertical .esriSimpleSliderDecrementButton:focus
  border none
  outline none
>>>.BasemapToggle .basemapImageContainer:focus
  border none
  outline none
>>>#BasemapToggle:focus
  border none
  outline none
>>>#BasemapToggle .basemapContainer:focus
  border none
  outline none
>>>.BasemapToggle .toggleButton
  border none
  outline none
>>>.esriPopup .titleButton.maximize
  display none
</style>
