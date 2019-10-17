<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="morePhoneForm"
      ref="morePhoneForm"
      class="demo-form-inline"
    >
      <el-form-item label="呼叫时间" prop="time">
        <el-date-picker
          v-model="morePhoneForm.time"
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
      <el-form-item>
        <el-button type="danger" @click="resetForm('morePhoneForm')"
          >重置</el-button
        >
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
      morePhoneForm: {
        time: '',
      },
      positionArray: [
        { x: 104.06667, y: 30.66667 },
        { x: 104.06667, y: 30.66769 },
      ],

      morePhone: [],
      morePhone2: [],
    }
  },

  mounted() {
    // this.phoneInfo = JSON.parse(sessionStorage.getItem('phoneInfo'))
    this.morePhone = JSON.parse(localStorage.getItem('morePhone')).list
    // this.mapDraw()
  },

  methods: {
    onSubmit() {
      let data = this.morePhone
      this.morePhone2 = data
      let conData = this.morePhoneForm
      console.log('分析查询')
      console.log(this.positionArray)
      conData.time != null && this.timeSizer()
      console.log('分析查询')
      this.positionArray = this.addPoint(this.morePhone2)
      console.log('分析查询')
      this.mapDraw()
      console.log(this.positionArray)
      console.log(this.morePhone2)
    },

    // 添加经纬度坐标
    addPoint(data) {
      let arr = []
      let point = {}
      data.forEach(item => {
        point.x = item.jingdu
        point.y = item.weidu
        arr.push(point)
      })
      return arr
    },

    // 时间筛选
    timeSizer() {
      let data = this.morePhone2
      let time = this.morePhoneForm.time
      let dataArr = []
      data.forEach(item => {
        this.compareTime(item.beginTime, time[0], time[1]) && dataArr.push(item)
      })
      this.morePhone2 = dataArr
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
      var map
      var _this = this
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
            map = new Map('map', {
              basemap: 'delorme',
              center: [104.06667, 30.66667],
              zoom: 15,
            })
            var toggle = new BasemapToggle(
              {
                map: map,
                basemap: 'satellite',
              },
              'BasemapToggle',
            )
            toggle.startup()
            var home = new HomeButton(
              {
                map: map,
              },
              'HomeButton',
            )
            home.startup()
            var geoLocate = new LocateButton(
              {
                map: map,
              },
              'LocateButton',
            )
            geoLocate.startup()
            var overviewMapDijit = new OverviewMap({
              map: map,
              expandFactor: 2,
              attachTo: 'bottom-left',
              visible: true,
            })
            overviewMapDijit.startup()
            dojo.connect(map, 'onLoad', graphicLoad)
            function graphicLoad() {
              console.log(
                webMercatorUtils.xyToLngLat(
                  13184586.725552682,
                  3951448.604221201,
                ),
              )
              var newPoint
              var picSymbol
              var picGraphic
              var infoTemplate
              _this.positionArray.map(function(item) {
                newPoint = new Point(
                  item.x,
                  item.y,
                  new SpatialReference({ wkid: 4326 }),
                )
                picSymbol = new PictureMarkerSymbol(
                  require('../../../../assets/img/tubiao.png'),
                  20,
                  25,
                )
                picGraphic = new Graphic(newPoint, picSymbol)
                infoTemplate = new InfoTemplate()
                infoTemplate.setTitle('手机轨迹')
                infoTemplate.setContent('轨迹分析')
                picGraphic.setInfoTemplate(infoTemplate)
                map.graphics.add(picGraphic)
              })
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
