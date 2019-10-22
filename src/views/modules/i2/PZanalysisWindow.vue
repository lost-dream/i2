<template>
  <div>
    <fly-dialog
      width="60%"
      title="碰撞对比分析"
      :show.sync="visible"
      @beforeCloseDialog="visible = false"
    >
      <div class="mode-cachedata">
        <el-form
          :model="dataForm"
          :rules="dataRule"
          ref="dataForm"
          label-width="80px"
        >
          <el-form-item label="姓名：">
            <el-tag type="success" size="mini">{{ dataForm.name }}</el-tag>
          </el-form-item>
          <el-form-item label="碰撞源：">
            <el-radio-group v-model="dataForm.collisionSources">
              <el-radio
                v-for="(item, index) of relationTypeList"
                :key="index"
                :label="item.type"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="操作：">
            <el-radio-group v-model="dataForm.handle">
              <el-radio label="intersection">交集</el-radio>
              <el-radio label="union">并集</el-radio>
              <el-radio label="differenceSet">差集</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form class="filter-form">
          <el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">碰撞</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="dataList"
          height="255"
          border
          v-loading="dataListLoading"
          v-if="dataList.length > 0"
        >
          <el-table-column
            v-for="(item, index) of thList"
            :key="index"
            :prop="item.prop"
            header-align="center"
            align="center"
            :label="item.label"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="lookInfo(scope.row.id)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-form
          :model="dataForm"
          :rules="dataRule"
          ref="dataForm"
          label-width="80px"
          v-if="resultFlag"
        >
          <el-form-item label="碰撞源：">
            <el-radio-group v-model="dataForm.collisionSources2">
              <el-radio
                v-for="(item, index) of relationTypeList"
                :key="index"
                :label="item.type"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="操作：">
            <el-radio-group v-model="dataForm.handle2">
              <el-radio label="intersection">交集</el-radio>
              <el-radio label="union">并集</el-radio>
              <el-radio label="differenceSet">差集</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-form class="filter-form" v-if="resultFlag">
          <el-form-item>
            <el-button
              type="primary"
              @click="dataFormSubmit('rFlag')"
              :disabled="dataList.length <= 0"
              >结果集碰撞</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </fly-dialog>
  </div>
</template>

<script>
import FlyDialog from '@/components/fly-dialog'
export default {
  components: {
    FlyDialog,
  },
  props: {},
  data() {
    return {
      visible: false,
      dataListLoading: false,
      relationTypeList: [
        {
          type: 'Fugitive',
          name: '在逃人员',
        },
        {
          type: 'ImportantControl',
          name: '重点人',
        },
        {
          type: 'Car',
          name: '车',
        },
        {
          type: 'RailwayReal',
          name: '铁路实名制 ',
        },
        {
          type: 'Case',
          name: '案件',
        },
      ],
      fugitiveTh: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'idNumber',
          label: '证件号',
        },
        {
          prop: 'nativePlace',
          label: '籍贯',
        },
      ],
      ImportantControlTh: [
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'idNumber',
          label: '证件号',
        },
        {
          prop: 'education',
          label: '学历',
        },
        {
          prop: 'currentAddress',
          label: '现居地',
        },
      ],
      CarTh: [
        {
          prop: 'carNumber',
          label: '车牌号',
        },
        {
          prop: 'model',
          label: '品牌',
        },
        {
          prop: 'color',
          label: '颜色',
        },
      ],
      RailwayRealTh: [
        {
          prop: 'idNumber',
          label: '证件号',
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'seatNumber',
          label: '座位号',
        },
        {
          prop: 'startStation',
          label: '始发站',
        },
        {
          prop: 'destination',
          label: '终点站',
        },
      ],
      CaseTh: [
        {
          prop: 'caseNo',
          label: '案件编号',
        },
        {
          prop: 'caseHandlingAgencies',
          label: '处理单位',
        },
        {
          prop: 'detail',
          label: '案件描述',
        },
      ],
      thList: [],
      dataList: [],
      resultFlag: false,
      dataForm: {
        idNumber: [],
        name: '',
        handle: 'intersection',
        collisionSources: '',
        collisionSources2: '',
        handle2: 'intersection',
      },
      dataRule: {},
    }
  },
  computed: {},
  methods: {
    init(node) {
      this.visible = true
      this.dataForm.name = node.label
      this.dataForm.idNumber = [node.keyword]
    },
    dataFormSubmit(rflag) {
      var kws = []
      if (rflag) {
        kws = this.dataList.map(item => {
          return item.idNumber || ''
        })
      }
      console.log(kws)
      let params = {
        idNumbersJson: this.dataForm.idNumber.concat(kws),
        collisionSources: !rflag
          ? this.dataForm.collisionSources
          : this.dataForm.collisionSources2,
        flag: !rflag ? this.dataForm.handle : this.dataForm.handle2,
      }
      this.$api.collideAnalyse(params).then(({ data }) => {
        if (data && data.code === 200) {
          console.log(data)
          if (data.result.length > 0) {
            this.buildTableArr(this.dataForm.collisionSources, data.result)
            this.resultFlag = true
            this.$message({
              message: '碰撞成功！',
              type: 'success',
              duration: 1500,
            })
          } else {
            this.$message({
              message: '没有查询到数据！',
              type: 'error',
              duration: 1500,
            })
          }
        }
      })
    },
    buildTableArr(type, list) {
      if (type === 'Fugitive') {
        this.thList = this.fugitiveTh
        this.dataList = list.map(item => {
          return {
            name: item.name,
            idNumber: item.idNumber,
            nativePlace: item.nativePlace,
          }
        })
      } else if (type === 'ImportantControl') {
        this.thList = this.ImportantControlTh
        this.dataList = list.map(item => {
          return {
            name: item.name,
            idNumber: item.idNumber,
            education: item.education,
            currentAddress: item.currentAddress,
          }
        })
      } else if (type === 'Car') {
        this.thList = this.CarTh
        this.dataList = list.map(item => {
          return {
            carNumber: item.carNumber,
            model: item.model,
            color: item.color,
          }
        })
      } else if (type === 'RailwayReal') {
        this.thList = this.RailwayRealTh
        this.dataList = list.map(item => {
          return {
            idNumber: item.idNumber,
            name: item.name,
            seatNumber: item.carriageNumber + item.seatNumber + '号',
            startStation: item.startStation,
            destination: item.destination,
          }
        })
      } else if (type === 'Case') {
        this.thList = this.CaseTh
        this.dataList = list.map(item => {
          return {
            caseNo: item.caseNo,
            caseHandlingAgencies: item.caseHandlingAgencies,
            detail: item.detail,
          }
        })
      } else {
      }
    },
    lookInfo() {},
  },
  created() {},
  mounted() {},
}
</script>
<style lang="stylus" scoped>
>>>.el-form-item
  margin-bottom 10px
>>>.el-checkbox
  color #fff
  font-weight 500
  font-size 14px
  cursor pointer
  -moz-user-select none
  -webkit-user-select none
  -ms-user-select none
  user-select none
  margin-right 30px
>>>.el-radio
  color #fff
  cursor pointer
  margin-right 30px
>>>.el-input__inner
  color #fff !important
>>>.el-form--inline .el-form-item
  display inline-block
  margin-right 10px
  vertical-align top
  width 150px
.mode-cachedata
  padding 10px
.filter-form
  padding-bottom 10px
.el-table__body
  tr.hover-row>td
    background-color transparent !important
</style>
